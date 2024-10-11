import { useAuthStore } from '@/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();

    // console.log("isAuthenticated => ", authStore.isAuthenticated);

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
