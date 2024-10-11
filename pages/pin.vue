<template>
    <div>
        <button class="flex items-center space-x-4 mx-8 py-5">
            <div class="bg-white w-10 h-10 rounded-lg flex items-center justify-center">
                <img src="/icon/back.png" class="w-5 h-5">
            </div>
            <div class="font-inter text-white font-semibold text-2xl">Back</div>
        </button>
        <div class="bg-white rounded-t-lg h-screen py-10">
            <img src="/icon/icon_pwd.png" class="w-12 h-12 mx-auto" alt="">
            <div class="text-center font-inter text-xl mt-5 text-primary">Buka dengan PIN</div>
            <div class="flex items-center justify-center space-x-8 mx-auto mt-8">
                <div v-for="(item, index) in Array(4)" :key="index" :class="pin.length > index ? 'bg-blue-500' : 'bg-gray-300'" class="w-5 h-5 rounded-full bg-[#EFEFEF]"/>
            </div>
            <div class="underline font-inter text-primary text-sm mt-5 text-center">Lupa PIN Anda</div>
            <div v-if="errorMessage" class="text-red-500 text-xs font-inter mt-0.5 text-center">{{ errorMessage }}</div>
            <div class="grid grid-cols-3 gap-3 px-5 flex-wrap mt-10">
                <div v-for="(item, index) in numbers" :key="index" @click="handleInput(item)" class="w-full h-20 bg-[#EFEFEF] text-primary font-inter text-4xl flex items-center justify-center font-semibold rounded-lg">
                    <span>{{item}}</span>
                </div>
                <div/>
                <div @click="handleInput(0)" class="w-full h-20 bg-[#EFEFEF] text-primary text-4xl flex items-center justify-center font-inter font-semibold rounded-lg">
                    <span>0</span>
                </div>
                <div @click="handleDelete" class="w-full h-20 bg-[#EFEFEF] text-[#AE0000] flex items-center justify-center rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
                        <path fill-rule="evenodd" d="M2.515 10.674a1.875 1.875 0 0 0 0 2.652L8.89 19.7c.352.351.829.549 1.326.549H19.5a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-9.284c-.497 0-.974.198-1.326.55l-6.375 6.374ZM12.53 9.22a.75.75 0 1 0-1.06 1.06L13.19 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L15.31 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
definePageMeta({
  middleware: 'auth',
  layout: 'auth',
});

import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const supabase = useSupabaseClient();
const numbers = ref([1,2,3,4,5,6,7,8,9])
const pin = ref([]);
const errorMessage = ref(undefined);
const router = useRouter();

const isHasEmail = computed(() => {
  if (process.client) {
    return localStorage.getItem('userEmail');
  }
  return null;
});

onMounted(() => {
    if(!isHasEmail.value){
        return router.push('/');
    }
})

const handleInput = (number) => {
  if (pin.value.length < 4) {
    pin.value.push(number);
  }
};

const handleDelete = () => {
  pin.value.pop();
};

const onSubmit = async (pinValue) => {
    const email = localStorage.getItem('userEmail');
    const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: pinValue,
    });
    if (error) {
        errorMessage.value = 'PIN anda salah. Silahkan coba lagi.'
        pin.value = [];
        return;
    }
    errorMessage.value = undefined;
    authStore.login();
    localStorage.removeItem('userEmail')
    navigateTo('/home');
}

const isPinComplete = computed(() => pin.value.length === 4);

watch(isPinComplete, async (complete) => {
    if(complete){
        const pinValue = pin.value.join('');
        onSubmit(pinValue)
    }
});
</script>