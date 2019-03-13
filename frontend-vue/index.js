/* Routing */
const router = new VueRouter({
  routes: [
    { path: '/', component: httpVueLoader('/pages/player.page.vue') }
  ]
})

/* Create */
new Vue({
  router,
  el: '#app',
  components: {
  }
})