// This script is called when the user opens the Chrome devtools on a page
// and it persists until the devtools panel is closed
// here we intiailize any panels and sidebar panes

let panelEnabled = false;
let mainPanel;

const inspectedTabId = chrome.devtools.inspectedWindow.tabId;

const darkModeEnabled = chrome.devtools.panels.themeName === 'dark';

// create a long-lived communication channel between this page and the
// main extension "background"
// const port = chrome.runtime.connect({
//   name: `devtoolsbg-${inspectedTabId}`,
// });
// port.onMessage.addListener((payload) => {
// });


function createPanel() {
  panelEnabled = true;
  chrome.devtools.panels.create('myext', 'icons/128.png', 'devtools-panel.html', (panel) => {
    mainPanel = panel;
    // panel.onShown.addListener(() => {
    //   chrome.runtime.sendMessage('web3-panel-shown');
    //   panelShown = true;
    //   // if (panelLoaded) executePendingAction();
    // });
    // panel.onHidden.addListener(() => {
    //   chrome.runtime.sendMessage('web3-panel-hidden');
    //   panelShown = false;
    // });
  });
}

chrome.runtime.onMessage.addListener((payload) => {
  console.log('devtools-background.js - chrome.runtime.onMessage.addListener((payload) => {})');
  console.log('devtools bg msg', payload);
  if (payload.connect) {
    console.log('post window msg from devtools-background.js');
    const data = { type: 'FROM_BACK', text: 'Hello from the backend!' };
    chrome.runtime.sendMessage(data);
    window.postMessage(data, '*');
    return 'told em!';
  }
  if (!payload.w3dt_action) return;
  if (!panelEnabled) createPanel();
});

// do an initial check when devtools are first opened on this tab
chrome.runtime.sendMessage({
  w3dt_action: 'check-enabled', tabId: chrome.devtools.inspectedWindow.tabId,
}, (enabled) => {
  console.log('devtools-background.js - chrome.runtime.sendMessage(w3dt_action: check-enaled tab id:', chrome.devtools.inspectedWindow.tabId);
  if (enabled) createPanel();
});
