<template>
  <div>
    <button
      class="flex items-center rounded-b-xl space-x-4 px-8 py-5 sticky top-0 z-10 bg-bluemary w-full"
    >
      <div class="font-inter text-white font-semibold text-2xl">
        Inventory Log Form
      </div>
    </button>
    <div class="bg-white rounded-t-lg h-screen py-5 px-7 relative">
      <button @click="handleLogout" class="border border-red-700 bg-red-700 py-3 rounded-lg absolute w-4/5 mx-auto bottom-32 left-0 right-0">
        <span class="font-inter text-white font-semibold">Log Out</span>
      </button>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  middleware: 'auth',
});

const authStore = useAuthStore();
const supabase = useSupabaseClient();
const router = useRouter();

const handleLogout = async () => {
    supabase.auth.signOut();
    authStore.logout();
    router.push('/');
}
</script>