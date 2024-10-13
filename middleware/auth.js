import { useAuthStore } from '@/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();

    // console.log("isAuthenticated => ", authStore.isAuthenticated);

    if (process.client) {
      const formData = localStorage.getItem('formData');

      if (!formData && to.path === '/home') {
        return navigateTo('/main');
      }
    }

    if (process.client) {
      const formData = localStorage.getItem('formData');

      if (formData && to.path === '/main') {
        return navigateTo('/home');
      }
    }

    if (to.path === "/main" && !authStore.isAuthenticated) {
      // return navigateTo("/");
      if(process.client){
        return window.location.href = '/';
      }
    }

    if (to.path === "/home" && !authStore.isAuthenticated) {
      // return navigateTo("/");
      if(process.client){
        return window.location.href = '/';
      }
    }

    if (to.path === "/account" && !authStore.isAuthenticated) {
      if (process.client) {
        return (window.location.href = '/');
      }
    }
  
    if (authStore.isAuthenticated && (to.path === "/" || to.path === "/pin")) {
      // return navigateTo("/home");
      if(process.client){
        return window.location.href = '/home';
      }
    }
});
