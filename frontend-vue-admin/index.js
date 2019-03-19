/* Services */
import AdminService from './services/admin.service.js';
import CrawlerService from './services/crawler.service.js';
import VidService from './services/vid.service.js';

/* Routes */
const router = new VueRouter({
  routes: [
    { path: '/', component: httpVueLoader('./pages/admin.page.vue') }
  ]
});

/* Create */
new Vue({
  router,
  el: '#app'
})

/* Assign global services */
Object.defineProperty(Vue.prototype, '_adminService', { value: new AdminService() });
Object.defineProperty(Vue.prototype, '_crawlerService', { value: new CrawlerService() });
Object.defineProperty(Vue.prototype, '_vidService', { value: new VidService() });