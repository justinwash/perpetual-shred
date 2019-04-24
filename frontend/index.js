/* Services */
import AuthenticationService from './services/authentication.service.js';
import VidService from './services/vid.service.js';
import YoutubeService from './services/youtube.service.js';
import FavService from './services/fav.service.js';
import ToastService from './services/toast.service.js';

import Store from './services/store.service.js';

/* Routes */
const router = new VueRouter({
  routes: [
    { path: '/', component: httpVueLoader('pages/player.page.vue') },
    { path: '/vid/:id', component: httpVueLoader('pages/player.page.vue') },
    { path: '/login', component: httpVueLoader('pages/login.page.vue') },
    { path: '/account', component: httpVueLoader('pages/account.page.vue') },
    { path: '*', component: httpVueLoader('pages/404.vue') }
  ]
});

/* Create */
window.PS = new Vue({
  router,
  el: '#perpetual-shred',
  components: {
    'navigation': httpVueLoader('components/shared/main-nav.component.vue')
  }
})

/* Assign global services */
Object.defineProperty(Vue.prototype, '_authenticationService', { value: new AuthenticationService() });
Object.defineProperty(Vue.prototype, '_vidService', { value: new VidService() });
Object.defineProperty(Vue.prototype, '_youtubeService', { value: new YoutubeService() });
Object.defineProperty(Vue.prototype, '_favService', { value: new FavService() });
Object.defineProperty(Vue.prototype, '_toastService', { value: new ToastService() });
Object.defineProperty(Vue.prototype, '_store', { value: new Store() });