// This is the background script
// accessible in other components via chrome.runtime.getBackgroundPage()

// const tabs = {};
// window.tabs = tabs;

let counter = 0;

// Install handler
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed!');

  // create context menu - if more than one, they will collapse into children of a parent menu item
  chrome.contextMenus.create({
    id: 'myext-some-unique-key',
    title: 'Context menu title',
    type: 'normal',
    contexts: ['selection'],
  });

  // can save things to chrome storage and access across extension components
  // NOTE - requires "storage" permission in manifest
  // chrome.storage.sync.set({ foo: 'bar' }, function() {

  // });


  // browserAction is for an action icon that is for all pages
  // alternatively you can use a pageAction if it should only show up on some pages
  chrome.browserAction.setBadgeText({ text: 'OFF' });
  // chrome.browserAction.setBadgeBackgroundColor({ color: '#FF0000' });

  // one way to add rules to selectively activate/deactivate the extension
  // see https://developer.chrome.com/extensions/user_interface#rules
});

// // Listener for creating a bookmark
// chrome.bookmarks.onCreated.addListener(() => {
//   // do something
// });


chrome.runtime.onMessage.addListener((payload, sender, reply) => {
  console.log('👂 background heard runtime message');
  console.log(sender);
  console.log(payload);

  reply({ counter: counter++ });

  // chrome.alarms.create({delayInMinutes: 5})
  // chrome.tabs.executeScript({file: 'logic.js'});
  // chrome.tabs.executeScript({code: 'document.body.style.backgroundColor="orange"'});

  // chrome.runtime.Port.disconnect(); // manually close a port?

  // enable popup if not enabled already
  // tabs[sender.tab.id].enabled = true;
  // chrome.browserAction.setIcon({
  //   tabId: sender.tab.id,
  //   path: {
  //     // 16: 'icons/16.png',
  //     // 48: 'icons/48.png',
  //     128: '/icons/128-enabled.png',
  //   },
  // });
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

// command handler (keyboard shortcuts) - see command definition in manifest
chrome.commands.onCommand.addListener((command) => {
  console.log(`Command invoked: ${command}`);
});

// omnibox handler - must include omnibox in manifest
chrome.omnibox.onInputEntered.addListener((text) => {
  // Encode user input for special characters , / ? : @ & = + $ #
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
