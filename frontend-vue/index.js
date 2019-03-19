/* Services */
import AuthenticationService from './services/authentication.service.js';

/* Routes */
const router = new VueRouter({
  routes: [
    { path: '/', component: httpVueLoader('./pages/player.page.vue') },
    { path: '/login', component: httpVueLoader('./pages/login.page.vue') },
    { path: '/admin', component: httpVueLoader('./pages/admin.page.vue') },
  ]
});

/* Create */
new Vue({
  router,
  el: '#app'
})

/* Assign global services */
Object.defineProperty(Vue.prototype, '_authenticationService', { value: new AuthenticationService() });