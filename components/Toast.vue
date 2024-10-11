<template>
    <transition
      name="fade"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <div
        v-if="visible"
        class="fixed top-10 left-0 right-0 lg:max-w-sm w-full z-50 px-5"
      >
        <div class="w-full bg-white rounded-lg">
            <div class="bg-green-500 bg-opacity-10 border-green-500 border shadow-sm rounded-lg px-5 flex py-3 items-center justify-between">
                <p class="text-green-500 font-inter">{{ message }}</p>
                <button @click="closeToast" class="text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const visible = ref(false);
  const message = ref('');
  let timer = null;
  
  const showToast = (msg, duration = 3000) => {
    message.value = msg;
    visible.value = true;
    startTimer(duration);
  };
  
  const closeToast = () => {
    visible.value = false;
    clearTimer();
  };
  
  const startTimer = (duration) => {
    clearTimer();
    timer = setTimeout(() => {
      closeToast();
    }, duration);
  };
  
  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };
  
  const beforeEnter = (el) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
  };
  
  const enter = (el, done) => {
    el.offsetHeight; // trigger reflow
    el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    el.style.opacity = 1;
    el.style.transform = 'translateY(0)';
    done();
  };
  
  const leave = (el, done) => {
    el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    done();
  };
  
  defineExpose({ showToast });
  </script>
  
  <style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s, transform 0.3s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }
  </style>
  