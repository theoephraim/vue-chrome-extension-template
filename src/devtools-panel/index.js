import Vue from 'vue';
import '@/lib/vue-setup';

import root from './root';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: (h) => h(root),

});
