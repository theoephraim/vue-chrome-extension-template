import Vue from 'vue';
import '@/lib/vue-setup';

import root from './newtab-page';

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: (h) => h(root),
});
