<template>
    <div class="mx-auto lg:max-w-sm w-full min-h-screen bg-white">
        <slot />
        <div class="w-full h-[6.5rem] bg-white"></div>
        <div class="h-[4.5rem] bg-bluemary fixed z-10 bottom-0 lg:max-w-sm w-full rounded-t-xl mt-20">
          <div class="px-10 h-full grid grid-cols-2 ">
            <div v-for="(link, index) in links" :key="index" class="h-full flex items-center justify-center">
              <NuxtLink :to="link.path">
                <div class="flex flex-col items-center">
                  <img :src="isActive === index ? link.active_icon : link.inactive_icon" class="w-7 h-7">
                  <div :class="isActive === index ? 'text-white' : 'text-[#335986]'" class="font-inter text-xs mt-1">{{link.label}}</div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
    </div>
</template>
<script setup>
useHead({
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
    }
  ]
})

const links = ref([
  {label: 'Home', active_icon: '/icon/tab/home-active.png', inactive_icon: '/icon/tab/home-inactive.png', path: '/home'},
  // {label: 'History', active_icon: '/icon/tab/history-active.png', inactive_icon: '/icon/tab/history-inactive.png', path: '/home'},
  {label: 'Akun', active_icon: '/icon/tab/akun-active.png', inactive_icon: '/icon/tab/akun-inactive.png', path: '/account'},
])

const route = useRoute();

const isActive = computed(() => {
  const activeIndex = links.value.findIndex(link => 
    route.path === link.path || route.path.startsWith(`${link.path}/`)
  );
  return activeIndex !== -1 ? activeIndex : 0;
});


</script>