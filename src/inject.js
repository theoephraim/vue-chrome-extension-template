/* eslint-disable no-param-reassign, no-underscore-dangle, prefer-destructuring */

// This script is injected into every page (can be configured in manifest)
// it is responsible for injecting more scripts and handling communication back to the extension

const _ = require('lodash');


// handle messages via window
window.addEventListener('message', (e) => {
  console.log(`👂 window message from ${e.source === window ? 'window' : e.source}`);
  console.log(e.data, e);
});

// handle messages from chrome runtime
chrome.runtime.onMessage.addListener((payload, sender, reply) => {
  console.log(`👂 chrome runtime message from ${sender.tab ? 'tab' : sender}`);
  console.log(payload);
  if (payload.ping) reply({ pong: true });
});

// send an initial loaded message
chrome.runtime.sendMessage({
  source: 'myextension',
  message: 'injected',
}, (response) => {
  console.log('< response from extension', response);
});

let counter = 1;
setInterval(() => {
  chrome.runtime.sendMessage({
    source: 'myextension',
    counter: counter++,
  }, (response) => {
    console.log('< response from extension', response);
  });
}, 10000);

// This is the code that actually gets injected into our page
// and has access to the window / web3 global
function injectedScript(win) {
  console.log('injected');
  console.log(win);
  function emitW3dtAction(action, details) {
    const data = {
      w3dt_action: action,
      ...typeof details === 'string' ? { message: details } : details,
    };
    win.postMessage(data, '*');
    // maybe should just post directly to chrome.runtime?
    // requires app id to send from browser (passing via window skips this?)
    // chrome.runtime.sendMessage(data);
  }
  window.emitW3dtAction = emitW3dtAction;
}


// a script to install the script directly rather than loading from another file
// necessary sometimes if you need to intercept activity on the page before other things load
function installScript(fn) {
  console.log('inject.js - installScript()');
  const source = `;(${fn.toString()})(window)`;

  const script = document.createElement('script');
  script.textContent = source;
  document.documentElement.appendChild(script);
  script.parentNode.removeChild(script);
}

if (document instanceof HTMLDocument) {
  // injecting the script directly ensures it is executed first
  installScript(injectedScript);

  // you can also inject a js file as a script tag, but will not execute first
  // const script = document.createElement('script');
  // script.setAttribute('type', 'text/javascript');
  // script.setAttribute('src', chrome.extension.getURL('js/web3patch.js'));
  // document.body.appendChild(script);
}
