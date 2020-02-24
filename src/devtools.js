// This script is called when the user opens the Chrome devtools on a page
// and it persists until the devtools panel is closed
// here we intiailize any panels and sidebar panes

import { broadcastMessage, listenForMessagesFromTab } from '@/lib/message-passing';

let panel;
let panelShown = false;
let sidebar;

const inspectedTabId = chrome.devtools.inspectedWindow.tabId;
const chromeTheme = chrome.devtools.panels.themeName === 'dark' ? 'dark' : 'light';

// create a long-lived communication channel between this page and the
// main extension "background"
// const port = chrome.runtime.connect({
//   name: `devtoolsbg-${inspectedTabId}`,
// });
// port.onMessage.addListener((payload) => {
// });


function createPanel() {
  chrome.devtools.panels.create('myext', 'icons/128.png', `devtools-panel.html?theme=${chromeTheme}`, (_panel) => {
    panel = _panel;
    panel.onShown.addListener(() => {
      broadcastMessage({
        action: 'devtools_panel_shown',
        tabId: inspectedTabId,
      });
      panelShown = true;
    });
    panel.onHidden.addListener(() => {
      broadcastMessage({
        action: 'devtools_panel_hidden',
        tabId: inspectedTabId,
      });
      panelShown = false;
    });
  });
}

// Side bar shows up in the elements tab
// see https://developer.chrome.com/extensions/devtools#devtools-ui
function createSidebar() {
  chrome.devtools.panels.elements.createSidebarPane('My Extension', (_sidebar) => {
    sidebar = _sidebar;
    // sidebar initialization code here
    sidebar.setObject({ some_data: 'Some data to show' });

    // you can also show a full page
    // sidebar.setPage('devtools-sidebar.html'); // you would need to make a new page

    // or evaluate an expression within the page being inspected and display the result
    // sidebar.setExpression();
  });
}

// send message to background script to check if we should show devtools panel for this
// for example, if we have detected something on the page
broadcastMessage({
  action: 'check_devtools_enabled',
  tabId: inspectedTabId,
}, (enabled) => {
  if (enabled && !panel) createPanel();
  if (!sidebar) createSidebar();
});

// also listen for messages from our injected script, so that if devtools was already open
// but panel has not yet been initialized, we can initialize it
listenForMessagesFromTab(inspectedTabId, (payload, sender, reply) => {
  console.log('👂 devtools page heard runtime message from inspected tab');
  console.log(payload);
  if (!panel) createPanel();
});
