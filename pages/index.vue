<template>
    <div class="px-5">
        <div class="text-[2.875rem] leading-[3.063rem] font-inter text-white pt-10 font-bold ml-5">Selamat <br>Datang!</div>
        <div class="w-full bg-white rounded-lg mt-10 pb-10 py-3">
            <div class="w-14 h-1.5 rounded-full bg-bluemary bg-opacity-15 mx-auto" />
            <div class="font-inter text-primary text-center font-bold text-2xl mt-4">Log In</div>
            <div class="px-5">
                <div class="font-inter text-[primary] font-semibold mt-10">Log In untuk melanjutkan</div>
                <div class="mt-5">
                    <label class="block text-[#7C7C7C] text-sm mb-1 ml-8" for="email">
                        Email
                    </label>
                    <div class="w-full flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7 mr-1">
                            <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
                        </svg>
                        <input v-model="email" class="appearance-none bg-[#F1F1F1] rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="email" type="text" placeholder="Ketik disini">
                    </div>
                </div>
                <span v-if="errorMessage" class="text-red-500 text-xs font-inter mt-0.5">{{ errorMessage }}</span>
                <button @click="handleSubmit" class="bg-bluemary h-12 w-full rounded-lg mt-10 shadow disabled:bg-opacity-25" :disabled="loading">
                    <span v-if="loading" class="text-xl text-white font-inter font-semibold">Loading..</span>
                    <span v-else class="text-xl text-white font-inter font-semibold">Log In</span>
                </button>
            </div>
        </div>
        <div class="text-[#EFEFEF] font-inter text-center mt-12 text-sm font-light">Hubungi Team IT apabila ada masalah <br>dengan akun anda</div>
        <div class="text-[#EFEFEF] font-inter text-center text-opacity-20 mt-5 text-xs font-light">version 3.0.0</div>
    </div>
  </template>
<script setup>
definePageMeta({
  middleware: 'auth',
  layout: 'auth',
});

const supabase = useSupabaseClient();
const email = ref('');
const loading = ref(false);
const errorMessage = ref(undefined);

const handleSubmit = async () => {
    loading.value = true;
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email.value)
        .single();

    if (error || !data) {
        errorMessage.value = 'Email tidak terdaftar. Silakan daftar terlebih dahulu.';
        loading.value = false;
        return;
    }
    setTimeout(() => {
        loading.value = false;
        localStorage.setItem('userEmail', email.value);
        // window.location.href = '/pin';
        navigateTo('/pin');
    }, 1000);
};
</script>