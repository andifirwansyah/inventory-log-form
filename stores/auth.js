import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    login() {
      this.isAuthenticated = true;
      Cookies.set('isAuthenticated', 'true');
    },
    logout() {
      this.isAuthenticated = false;
      Cookies.remove('isAuthenticated');
    },
    checkAuth() {
      this.isAuthenticated = Cookies.get('isAuthenticated') === 'true';
    },
  },
});