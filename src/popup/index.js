import Vue from 'vue';
import '@/lib/vue-setup';

import root from './popup-page';

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: (h) => h(root),
});
