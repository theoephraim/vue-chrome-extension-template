/* eslint-disable no-underscore-dangle */

import _ from 'lodash';


export function broadcastMessage(payload, callback) {
  const fullPayload = {
    _msgSource: process.env.EXTENSION_MESSAGE_ID,
    ..._.isString(payload) ? { message: payload } : payload,
  };
  if (callback) {
    chrome.runtime.sendMessage(fullPayload, (response) => {
      console.log('< response from extension', response);
      callback(response);
    });
  } else {
    chrome.runtime.sendMessage(fullPayload);
  }
}

export function listenForMessages(messageHandler) {
  chrome.runtime.onMessage.addListener((payload, sender, reply) => {
    // ignore messages that are not from our extension
    if (payload._msgSource !== process.env.EXTENSION_MESSAGE_ID) return;

    messageHandler(payload, sender, reply);
  });
}
export function listenForMessagesFromTab(tabId, messageHandler) {
  chrome.runtime.onMessage.addListener((payload, sender, reply) => {
    // ignore messages that are not from our extension
    if (payload._msgSource !== process.env.EXTENSION_MESSAGE_ID) return;
    if (_.get(sender, 'tab.id') !== tabId) return;

    messageHandler(payload, sender, reply);
  });
}
