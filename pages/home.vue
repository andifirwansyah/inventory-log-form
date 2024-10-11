<template>
  <div>
    <button class="flex items-center rounded-b-xl space-x-4 px-8 py-5 sticky top-0 z-10 bg-bluemary w-full">
      <!-- <div class="bg-white w-10 h-10 rounded-lg flex items-center justify-center">
        <img src="/icon/back.png" class="w-5 h-5" />
      </div> -->
      <div class="font-inter text-white font-semibold text-2xl">
        Inventory Log Form
      </div>
    </button>
    <div class="bg-white rounded-t-lg h-screen py-5 px-7 mb-44">
      <form @submit.prevent="handleSubmit">
        <Select label="Zona" v-model:value="form.zone" :options="zones" search-label="Cari zona" placeholder="Pilih Zona" />
        <p v-if="errors.zone" class="font-inter text-xs text-red-500 mt-0.5">{{ errors.zone }}</p>

        <div class="mt-5">
          <label class="text-[#7C7C7C] ml-1 font-inter font-medium">Level</label>
          <div class="grid grid-cols-3 gap-4 mt-0.5">
            <button type="button" v-for="(item, index) in levels" :key="index" @click="form.level = item" :class="form.level === item ? 'bg-bluemary' : 'bg-[#7C7C7C]'" class="w-full h-14 rounded-lg flex items-center justify-center">
              <span class="text-white font-inter font-medium">{{item}}</span>
            </button>
          </div>
        </div>
        <p v-if="errors.level" class="font-inter text-xs text-red-500 mt-0.5">{{ errors.level }}</p>

        <Select label="Deskripsi" v-model:value="form.description" search-label="Cari item/sku" :options="products" placeholder="Deskripsi" />
        <p v-if="errors.description" class="font-inter text-xs text-red-500 mt-0.5">{{ errors.description }}</p>

        <div class="mt-5">
          <label class="text-[#7C7C7C] ml-1 font-inter font-medium"
            >Expired</label
          >
          <!-- <div class="border border-[#F1F1F1] bg-[#F1F1F1] rounded-md block w-full p-2"> -->
              <input
                type="date"
                v-model="form.expired"
                class="border border-[#F1F1F1] bg-[#F1F1F1] rounded-md block w-full p-3 focus:outline-none"
              />
          <!-- </div> -->
        </div>
        <p v-if="errors.expired" class="font-inter text-xs text-red-500 mt-0.5">{{ errors.expired }}</p>

        <InputBarcode label="Barcode" v-model:value="form.barcode"/>
        <p v-if="errors.barcode" class="font-inter text-xs text-red-500 mt-0.5">{{ errors.barcode }}</p>

        <InputQty v-model:quantity="form.qty" />
        <p v-if="errors.qty" class="font-inter text-xs text-red-500 mt-0.5">{{ errors.qty }}</p>

        <div class="mt-5">
          <label class="text-[#7C7C7C] ml-1 font-inter font-medium"
            >UOM</label
          >
          <input
            type="text"
            v-model="form.uom"
            class="border border-[#F1F1F1] bg-[#F1F1F1] rounded-md block w-full p-3 focus:outline-none"
            placeholder="UOM"
          />
        </div>
        <p v-if="errors.uom" class="font-inter text-xs text-red-500 mt-0.5">{{ errors.uom }}</p>

        <div class="grid grid-cols-2 gap-5 mt-10 bg-white">
          <button :disabled="loading" type="button" @click="handleCancel" class="bg-white border border-bluemary w-full py-3 rounded-lg disabled:opacity-25">
              <span class="font-inter text-bluemary font-semibold">Cancel</span>
          </button>
          <button type="submit" :disabled="loading" class="bg-bluemary border border-bluemary w-full py-3 rounded-lg disabled:opacity-25">
              <span v-if="loading" class="font-inter text-white font-semibold">Loading...</span>
              <span v-else class="font-inter text-white font-semibold">Save</span>
          </button>
        </div>
      </form>
      <Toast ref="toastRef" />
      
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  middleware: 'auth',
});
import { validationSchema } from '~/validation/validationSchema';

const supabase = useSupabaseClient();
const zones = ref([
  {
    label: "Zona 1",
    value: 1,
  },
  {
    label: "Zona 2",
    value: 2,
  },
  {
    label: "Zona 3",
    value: 3,
  },
  {
    label: "Zona 4",
    value: 4,
  },
]);
const products = ref([]);
const toastRef = ref(null);
const user = useSupabaseUser();

const form = ref({
  zone: '',
  level: null,
  description: '',
  expired: null,
  barcode: '',
  qty: null,
  uom: '',
  username: user?.value?.email
});

const errors = ref({});
const loading = ref(false);
const levels = ref(['Level 1', 'Level 2', 'Level 3'])

const fetchProducts = async () => {
  const {data, error} = await supabase.from('master_products').select('*');
  if(!error){
    products.value = data.map(v => ({
      label: v.sku + '-' + v.name,
      value: v.name,
    }));
  }
}

const handleSubmit = async () => {
  loading.value = true;
  try {
    errors.value = {};
    
    await validationSchema.validate(form.value, { abortEarly: false });
    
    // console.log('Form submitted:', form.value);

    const {data, error} = await supabase.from('stocks').insert(form.value);
    if(error){
      console.log(error);
      alert('Gagal menyimpan data. terjadi kesalahan');
      return;
    }
    if (toastRef.value) {
      toastRef.value.showToast('Data berhasil disimpan!', 3000);
      form.value.zone = null
      form.value.level = null
      form.value.description = null
      form.value.expired = null
      form.value.barcode = null
      form.value.qty = null
      form.value.uom = null
    }
  } catch (validationError) {
    validationError.inner.forEach(err => {
      errors.value[err.path] = err.message;
    });
  } finally {
    loading.value = false;
  }
};

const handleCancel = () => {
  form.value.zone = null
  form.value.level = null
  form.value.description = null
  form.value.expired = null
  form.value.barcode = null
  form.value.qty = null
  form.value.uom = null
};

onMounted(() => {
  fetchProducts();
})

</script>
<style scoped>
.custom-date-input {
  min-width: 100%;
  height: 3em; /* Adjust the height as necessary */
}

/* Tambahkan padding agar terlihat lebih rapi */
.custom-date-input::-webkit-datetime-edit {
  padding-left: 10px; /* Sesuaikan sesuai kebutuhan */
}
input[type='date'], input[type='time'] {
    -webkit-appearance: none;
    isplay:block;
    -moz-appearance: textfield;
    min-height: 3em;
}
</style>