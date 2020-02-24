/* eslint-disable no-param-reassign, prefer-destructuring */
import _ from 'lodash';
import Vue from 'vue';
import Vuex from 'vuex';

import { broadcastMessage, listenForMessagesFromTab } from '@/lib/message-passing';

Vue.use(Vuex);

window.addEventListener('message', (e) => {
  console.log('store window listener heard', { e });
});

const store = new Vuex.Store({
  state: {
    inspectedTabId: chrome.devtools.inspectedWindow.tabId,
    messages: [],
  },
  getters: {
    lastMessage: (state) => state.messages[state.messages.length - 1],
    numMessages: (state) => state.messages.length,
  },
  mutations: {
    ADD_MESSAGE(state, payload) {
      console.log('add message mutation');
      state.messages.push(payload);
    },
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
    logMessage(ctx, payload) {
      console.log('log message action');
      ctx.commit('ADD_MESSAGE', payload);
    },
  },
});


listenForMessagesFromTab(chrome.devtools.inspectedWindow.tabId, (payload, sender, reply) => {
  console.log('👂 devtools panel store heard runtime message');
  console.log(payload);
  store.dispatch('logMessage', payload);
});

export default store;
