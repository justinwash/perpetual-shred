import AdminGuardService from './services/adminguard.service.js';

const adminGuard = new AdminGuardService();

/* Routing */
const router = new VueRouter({
  routes: [
    { path: '/', component: httpVueLoader('./pages/player.page.vue') },
    { path: '/login', component: httpVueLoader('./pages/login.page.vue') },
    {
      path: '/admin', component: httpVueLoader('./pages/admin.page.vue'), beforeEnter: (to, from, next) => {
        adminGuard.canActivate() ? next() : next('/login')
      }
    },
  ]
});

/* Create */
new Vue({
  router,
  el: '#app'
})