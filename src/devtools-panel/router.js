/* eslint-disable object-property-newline */
import Vue from 'vue';
import Router from 'vue-router';

import LogsViewer from './subpanels/logs-viewer/index.vue';
import ABIPlayground from './subpanels/abi-playground.vue';
import GraphExplorer from './subpanels/graph-explorer.vue';
import SaltWatcher from './subpanels/salt-watcher.vue';

Vue.use(Router);

const router = new Router({
  mode: 'hash',
  // scrollBehavior(to, from, savedPosition) {
  //   return savedPosition || { x: 0, y: 0 };
  // },
  routes: [
    { path: '', name: 'home', redirect: { name: 'page1' } },
    { path: '/page1', name: 'page1', component: LogsViewer },
    { path: '/page2', name: 'page2', component: LogsViewer },
  ],
});

export default router;
