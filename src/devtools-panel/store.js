/* eslint-disable no-param-reassign, prefer-destructuring */
import _ from 'lodash';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

window.addEventListener('message', (e) => {
  console.log('store window listener heard', { e });
});

const store = new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    connect() {
      console.log('connect!');
      const data = {
        messageFromBackend: 'connect',
      };
      console.log({ data });
      // port.postMessage('test-test');
      console.log('worked?');

      chrome.runtime.sendMessage({ connect: true }, (response) => {
        console.log({ response });
      });
    },
  },
});

export default store;
