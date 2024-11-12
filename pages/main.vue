<template>
    <div>
        <button class="flex items-center rounded-b-xl space-x-4 px-8 py-5 sticky top-0 z-10 bg-bluemary w-full">
            <div class="font-inter text-white font-semibold text-2xl">
                Inventory Log Form
            </div>
        </button>
        <div class="bg-white rounded-t-lg py-5 px-7 mb-32">
            <form @submit.prevent="handleSubmit">
                <Select label="Team Count" v-model:value="form.team_count" :options="teams" search-label="Cari team" placeholder="Pilih Team Count" />
                <p v-if="errors.team_count" class="font-inter text-xs text-red-500 mt-0.5">{{ errors.team_count }}</p>
                <Select label="Warehouse" v-model:value="form.warehouse" :options="warehouses" search-label="Cari warehouse" placeholder="Pilih Warehouse" />
                <p v-if="errors.warehouse" class="font-inter text-xs text-red-500 mt-0.5">{{ errors.warehouse }}</p>
                <Select label="Zone/Level" v-model:value="form.level" :options="levels" search-label="Cari zone/level" placeholder="Pilih Zone/Level" />
                <p v-if="errors.level" class="font-inter text-xs text-red-500 mt-0.5">{{ errors.level }}</p>

                <button type="submit" :disabled="loading" class="bg-bluemary border border-bluemary w-full py-3 rounded-lg disabled:opacity-25 mt-10">
                    <span v-if="loading" class="font-inter text-white font-semibold">Loading...</span>
                    <span v-else class="font-inter text-white font-semibold">Selanjutnya</span>
                </button>
            </form>
        </div>
    </div>
</template>
<script setup>
import * as Yup from 'yup';
definePageMeta({
  middleware: 'auth',
});

const teams = ref([
  { label: 'Team A', value: 'Team A' },
  { label: 'Team B', value: 'Team B' },
  { label: 'Team C', value: 'Team C' },
  { label: 'Team D', value: 'Team D' },
  { label: 'Team E', value: 'Team E' },
  { label: 'Team F', value: 'Team F' },
  { label: 'Team G', value: 'Team G' },
  { label: 'Team H', value: 'Team H' },
  { label: 'Team I', value: 'Team I' },
  { label: 'Team J', value: 'Team J' },
  { label: 'Team K', value: 'Team K' },
  { label: 'Team L', value: 'Team L' },
  { label: 'Team M', value: 'Team M' },
  { label: 'Team N', value: 'Team N' },
  { label: 'Team O', value: 'Team O' },
]);

const warehouses = [
  { label: 'Warehouse A - General Trade', value: 'General Trade' },
  { label: 'Warehouse B - Modern Trade', value: 'Modern Trade' },
  { label: 'Warehouse C - Bioaqua', value: 'Bioaqua' },
  { label: 'Warehouse D - Hanasui', value: 'Hanasui' },
];

const levels = [
  { label: 'ALL', value: 'all' },
  { label: 'Level A', value: 'A' },
  { label: 'Level B', value: 'B' },
  { label: 'Level C', value: 'C' },
  { label: 'Level D', value: 'D' },
  { label: 'Cabinet', value: 'cabinet' },
];

const form = ref({
  team_count: '',
  warehouse: '',
  level: '',
});

const errors = ref({});
const loading = ref(false);

const validationSchema = Yup.object({
  team_count: Yup.string().required('Team count is required'),
  warehouse: Yup.string().required('Warehouse is required'),
  level: Yup.string().required('Level is required'),
});

const handleSubmit = async () => {
  loading.value = true;
  try {
    errors.value = {};
    
    await validationSchema.validate(form.value, { abortEarly: false });
    
    // console.log('Form submitted:', form.value);
    localStorage.setItem('formData', JSON.stringify(form.value));
    navigateTo('/home');

  } catch (validationError) {
    validationError.inner.forEach(err => {
      errors.value[err.path] = err.message;
    });
  } finally {
    loading.value = false;
  }
};

</script>