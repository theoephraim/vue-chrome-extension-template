/* eslint-disable object-property-newline */
import Vue from 'vue';
import Router from 'vue-router';

import Tab1 from './tabs/tab1';
import Tab2 from './tabs/tab2';

Vue.use(Router);

const router = new Router({
  mode: 'hash',
  // scrollBehavior(to, from, savedPosition) {
  //   return savedPosition || { x: 0, y: 0 };
  // },
  routes: [
    { path: '', name: 'home', redirect: { name: 'tab1' } },
    { path: '/tab1', name: 'tab1', component: Tab1 },
    { path: '/tab2', name: 'tab2', component: Tab2 },
  ],
});

export default router;
