<template>
  <div>
    <button class="flex items-center rounded-b-xl space-x-4 px-8 py-5 sticky top-0 z-10 bg-bluemary w-full">
      <button type="button" @click="handleBack" class="bg-white w-10 h-10 rounded-lg flex items-center justify-center">
        <img src="/icon/back.png" class="w-5 h-5" />
      </button>
      <div class="font-inter text-white font-semibold text-2xl">
        Inventory Log Form
      </div>
    </button>
    <div class="bg-white rounded-t-lg py-5 px-7 mb-20">
      <form @submit.prevent="handleSubmit">

        <div class="mt-5">
          <label class="text-[#7C7C7C] ml-1 font-inter font-medium"
            >Location ID</label
          >
          <input
            type="text"
            v-model="form.location_id"
            class="border border-[#F1F1F1] bg-[#F1F1F1] rounded-md block w-full p-3 focus:outline-none"
            placeholder="Location ID"
          />
        </div>
        
        <Select label="Deskripsi" v-model:value="form.description" :is-barcode="true" search-label="Cari item/sku" :options="products" placeholder="Deskripsi" />
        <p v-if="errors.description" class="font-inter text-xs text-red-500 mt-0.5">{{ errors.description }}</p>

        <InputBarcode label="Barcode" v-model:value="form.barcode"/>
        <p v-if="errors.barcode" class="font-inter text-xs text-red-500 mt-0.5">{{ errors.barcode }}</p>

        <!-- <div class="mt-5">
          <label class="text-[#7C7C7C] ml-1 font-inter font-medium"
            >Batch</label
          >
          <input
            type="text"
            v-model="form.batch"
            class="border border-[#F1F1F1] bg-[#F1F1F1] rounded-md block w-full p-3 focus:outline-none"
            placeholder="Batch"
          />
          <p v-if="errors.batch" class="font-inter text-xs text-red-500 mt-0.5">{{ errors.batch }}</p>
        </div> -->

        <div class="mt-5">
          <label class="text-[#7C7C7C] ml-1 font-inter font-medium"
            >Expired</label
          >
          <input
            type="date"
            v-model="form.expired"
            placeholder="dd/mm/yyyy"
            class="border border-[#F1F1F1] bg-[#F1F1F1] rounded-md block w-full p-3 focus:outline-none"
          />
        </div>
        <p v-if="errors.expired" class="font-inter text-xs text-red-500 mt-0.5">{{ errors.expired }}</p>

        <InputQty v-model:quantity="form.qty" label="Qty" />
        <p v-if="errors.qty" class="font-inter text-xs text-red-500 mt-0.5">{{ errors.qty }}</p>

        <Select label="Condition" v-model:value="form.condition" search-label="Cari condition" :options="conditions" placeholder="Condition" />
        <p v-if="errors.condition" class="font-inter text-xs text-red-500 mt-0.5">{{ errors.condition }}</p>

        <Select label="UOM" v-model:value="form.uom" search-label="Cari uom" :options="uoms" placeholder="UOM" />
        <p v-if="errors.uom" class="font-inter text-xs text-red-500 mt-0.5">{{ errors.uom }}</p>

        <InputQty v-model:quantity="form.uom_qty" label="UOM Qty" />
        <p v-if="errors.uom_qty" class="font-inter text-xs text-red-500 mt-0.5">{{ errors.uom_qty }}</p>

        <div class="mt-5">
          <label class="text-[#7C7C7C] ml-1 font-inter font-medium"
            >Total Qty</label
          >
          <input
            type="text"
            :value="form.qty * form.uom_qty"
            class="border border-[#F1F1F1] bg-[#F1F1F1] rounded-md block w-full p-3 focus:outline-none"
            placeholder="UOM"
            readonly
          />
        </div>

        <div class="grid grid-cols-2 gap-5 mt-10 bg-white">
          <button type="submit" :disabled="loading" class="bg-white border border-bluemary w-full py-3 rounded-lg disabled:opacity-25">
            <span v-if="loading" class="font-inter text-white font-semibold">Loading...</span>
            <span v-else class="font-inter text-bluemary font-semibold">Save</span>
          </button>
          <button type="submit" @click="handleFinish" :disabled="loading" class="bg-bluemary border border-bluemary w-full py-3 rounded-lg disabled:opacity-25">
              <span v-if="loading" class="font-inter text-white font-semibold">Loading...</span>
              <span v-else class="font-inter text-white font-semibold">Finish</span>
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
const router = useRouter();

const uoms = [
  { label: 'BAG-BAG', value: 'BAG' },
  { label: 'BAL-BAL', value: 'BAL' },
  { label: 'BOX-BOX', value: 'BOX' },
  { label: 'BTL-BOTOL', value: 'BOTOL' },
  { label: 'CAN-CAN', value: 'CAN' },
  { label: 'CTN-CARTON', value: 'CARTON' },
  { label: 'CUP-CUP', value: 'CUP' },
  { label: 'HGR-HANGER', value: 'HANGER' },
  { label: 'INNER-Inner Box', value: 'Inner Box' },
  { label: 'JAR-JAR', value: 'JAR' },
  { label: 'JRG-JIRIGEN', value: 'JIRIGEN' },
  { label: 'LSN-LUSIN', value: 'LUSIN' },
  { label: 'PAC-PACK', value: 'PACK' },
  { label: 'PAK-PACK', value: 'PACK' },
  { label: 'PALLET-PALLET', value: 'PALLET' },
  { label: 'PCH-POUCH', value: 'POUCH' },
  { label: 'PCS-PCS', value: 'PCS' },
  { label: 'PKT-PAKET', value: 'PAKET' },
  { label: 'RCG-RENCENG', value: 'RENCENG' },
  { label: 'SAK-SAK', value: 'SAK' },
  { label: 'SCH-SACHET', value: 'SACHET' },
  { label: 'SCT-SACHET', value: 'SACHET' },
  { label: 'STR-STRIP', value: 'STRIP' },
  { label: 'ZAK-ZAK', value: 'ZAK' },
  { label: 'BND-BUNDLE', value: 'BUNDLE' }
];

const conditions = [
  { label: 'GOOD', value: 'good' },
  { label: 'DAMAGE', value: 'damage' },
  { label: 'QR', value: 'qr' }
];

const products = ref([]);
const toastRef = ref(null);
const user = useSupabaseUser();

const form = ref({
  location_id: '',
  description: '',
  barcode: '',
  // batch: '',
  expired: null,
  qty: null,
  condition: '',
  uom: '',
  uom_qty: null,
  total_qty: null,
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

    const formattedDate = formatDate(form.value.expired);
    form.value.expired = formattedDate;

    await validationSchema.validate(form.value, { abortEarly: false });


    const prevData = JSON.parse(localStorage.getItem('formData'));
    form.value.total_qty = form.value.qty * form.value.uom_qty;
    const payload = {...form.value, ...prevData}


    // console.log('Form submitted:', payload);

    const {data, error} = await supabase.from('stocks').insert(payload);
    if(error){
      console.log(error);
      alert('Gagal menyimpan data. terjadi kesalahan');
      return;
    }
    // router.afterEach(() => {
    //   window.scrollTo(0, 0);
    // });
    if (process.client) {
      // Scroll ke atas saat halaman berubah
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (toastRef.value) {
      toastRef.value.showToast('Data berhasil disimpan!', 3000);
      form.value.location_id = ''
      form.value.description = ''
      form.value.barcode = ''
      // form.value.batch = ''
      form.value.expired = ''
      form.value.qty = ''
      form.value.condition = ''
      form.value.uom = ''
      form.value.uom_qty = ''
      form.value.total_qty = ''
    }
  } catch (validationError) {
    validationError.inner.forEach(err => {
      errors.value[err.path] = err.message;
    });
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);

  const day = date.toLocaleDateString('en-GB', { day: '2-digit' });
  const month = date.toLocaleDateString('en-GB', { month: '2-digit' });
  const year = date.toLocaleDateString('en-GB', { year: '2-digit' });

  return `${day}/${month}/${year}`;
};

const handleFinish = async () => {

  loading.value = true;
  try {
    errors.value = {};

    const formattedDate = formatDate(form.value.expired);
    form.value.expired = formattedDate;
    
    await validationSchema.validate(form.value, { abortEarly: false });


    const prevData = JSON.parse(localStorage.getItem('formData'));
    form.value.total_qty = form.value.qty * form.value.uom_qty;
    const payload = {...form.value, ...prevData}


    // console.log('Form submitted:', payload);

    const {data, error} = await supabase.from('stocks').insert(payload);
    if(error){
      console.log(error);
      alert('Gagal menyimpan data. terjadi kesalahan');
      return;
    }
    
    if (toastRef.value) {
      toastRef.value.showToast('Data berhasil disimpan!', 3000);
      form.value.location_id = ''
      form.value.description = ''
      form.value.barcode = ''
      // form.value.batch = ''
      form.value.expired = ''
      form.value.qty = ''
      form.value.condition = ''
      form.value.uom = ''
      form.value.uom_qty = ''
      form.value.total_qty = ''
    }
    localStorage.clear();
    navigateTo('/main');
  } catch (validationError) {
    validationError.inner.forEach(err => {
      errors.value[err.path] = err.message;
    });
  } finally {
    loading.value = false;
  }
};
const handleBack = () => {
  localStorage.clear();
  navigateTo('/main');
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