// This is the background script
// accessible in other components via chrome.runtime.getBackgroundPage()

import { broadcastMessage, listenForMessages } from '@/lib/message-passing';
import { setSettings, getSetting } from '@/lib/storage-helpers';

import './manifest'; // this is only to get the linter to run on it

const tabs = {};
// window.tabs = tabs;

const counter = 0;

// Install handler
chrome.runtime.onInstalled.addListener(async () => {
  console.log('Extension installed!');

  // create context menu - if more than one, they will collapse into children of a parent menu item
  chrome.contextMenus.create({
    id: 'myext-some-unique-key',
    title: 'Context menu title',
    type: 'normal',
    contexts: ['selection'],
  });

  await setSettings({
    setting1: 'Initial value setting 1',
    setting2: 'Initial value setting 2',
  });


  // browserAction is for an action icon that is for all pages
  // alternatively you can use a pageAction if it should only show up on some pages

  // chrome.browserAction.setBadgeBackgroundColor({ color: '#FF0000' });


  // one way to add rules to selectively activate/deactivate the extension
  // see https://developer.chrome.com/extensions/user_interface#rules
});

// // Listener for creating a bookmark
// chrome.bookmarks.onCreated.addListener(() => {
//   // do something
// });


let pongCount = 0;
listenForMessages((payload, sender, reply) => { // eslint-disable-line consistent-return
  console.log('👂 background heard runtime message');
  console.log(sender);
  console.log(payload);

  // just an example - we will record click locations coming from tabs
  if (sender.tab) {
    if (payload.action === 'click') {
      tabs[sender.tab.id] = tabs[sender.tab.id] || {};
      tabs[sender.tab.id].clicks = tabs[sender.tab.id].clicks || [];
      tabs[sender.tab.id].clicks.push(payload.clickLocation);

      // enable the "browser action" icon (right of the URL bar)
      chrome.browserAction.setIcon({
        tabId: sender.tab.id,
        path: {
          128: '/icons/128-enabled.png',
        },
      });
      chrome.browserAction.setBadgeText({
        tabId: sender.tab.id,
        text: 'ON',
      });
    }
  }

  // devtools "page" checking whether to show our panel
  // we will reply yes if the user has clicked the page yet - which we have been tracking
  if (payload.action === 'check_devtools_enabled') {
    if (tabs[payload.tabId]) {
      return reply(true);
    }
    return reply(false);
  }

  if (payload.ping) {
    return reply({ pong: ++pongCount });
  }
});

// last minute cleanup
chrome.runtime.onSuspend.addListener(() => {
  // do not rely on this for persisitng data
  console.log('Unloading extension');
  chrome.browserAction.setBadgeText({ text: '' });
});

chrome.extension.onConnect.addListener((port) => {
  console.log(`Background port connected - ${port.name}`);
  // const [, tabId] = port.name.split('-');

  // tabs[tabId] = tabs[tabId] || {};
  // tabs[tabId].ports = tabs[tabId].ports || [];
  // tabs[tabId].ports.push(port);

  // port.onMessage.addListener((payload) => {
  //   console.log('port mesage', payload);
  //   if (payload.action === 'check-connection') {
  //     if (tabs[tabId].enabled) port.postMessage({ action: 'connected' });
  //     else port.postMessage({ action: 'disconnected' });
  //   }
  // });
});

// command handler (keyboard shortcuts) - see `commands` definition in manifest
chrome.commands.onCommand.addListener((command) => {
  alert(`command invoked! - ${command}`); // eslint-disable-line no-alert
});

// omnibox handler - see `omnibox` definition in manifest
chrome.omnibox.onInputEntered.addListener((text) => {
  const newURL = `https://www.google.com/search?q=${encodeURIComponent(text)}`;
  chrome.tabs.create({ url: newURL });
});

// trigger this from the background console to test sending a message
window.sendTestMessage = () => {
  console.log(chrome.tabs);

  // chrome.tabs.query({ active: true }, (tabs) => {
  //   chrome.tabs.sendMessage(tabs[0].id, {
  //     source: 'myextension',
  //     message: 'background says hi!',
  //   }, (response) => {
  //     console.log(response);
  //   });
  // });
};
