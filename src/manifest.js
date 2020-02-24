/*
  This is the source for our "manifest.json" file
  But we transform it from js so we can include comments and eventually build it dynamically

  WARNING - auto reload doesn't work with this, so you must restart webpack after you make changes
*/

module.exports = {
  manifest_version: 2, // required
  name: 'Vue Chrome Extension Example', // Title in chrome store and extensions settings UI
  version: '0.0.1',
  description: 'An example chrome extension built with vue',
  homepage_url: 'https://myextension.com',
  icons: {
    128: 'icons/128-enabled.png',
  },
  permissions: [
    '<all_urls>',
    '*://*/*',
    'activeTab', // required to inject scripts in current tab
    'tabs',
    'cookies',
    'background',
    'contextMenus', // for context menu - make sure ti include a size 16 icon for this
    'unlimitedStorage',
    'storage',
    'notifications',
    'identity',
    'identity.email',
  ],

  // background script - used to manage events and initialize other parts of the extensions
  // see https://developer.chrome.com/extensions/background_pages
  background: {
    scripts: ['js/background.js'],
    persistent: false,
  },

  // A "browser action" is the icon that appears to the right of the toolbar
  // see https://developer.chrome.com/extensions/browserAction
  browser_action: {
    default_title: 'Action icon hover title', // tooltip text when hovering over the icon
    default_popup: 'popup.html', // content of "popup" that appears when you click the icon
  },

  // extension options page
  options_page: "options.html",

  // omnibox - this lets you hook into the omnnibox (url bar) by typing this string first
  // see background script for handler
  omnibox: {
    keyword: "myext", // this should be short to trigger your extension to take over
  },

  // inject scripts into pages being browsed
  content_scripts: [
    {
      js: ['js/inject.js'],
      run_at: 'document_start', // "document_idle" preferred, but would not guarantee running first
      matches: ['<all_urls>'],
      // all_frames: true,  // otherwise just injected into main/topmost frame
    },
  ],

  // keyboard shortcuts - see background script for handler
  commands: {
    'example-command-name': {
      suggested_key: {
        default: "Ctrl+Shift+Right",
        mac: "Command+Shift+Right"
      },
      description: "Your command description"
    },
  },

  // chrome overrides - replaces default chrome page - key can be newtab|bookmarks|history
  // NOTE - an extension can only override one of these at a time!
  chrome_url_overrides : {
    newtab: "newtab.html",
  },

  // Extend chrome devtools
  // this page is not shown, it initializes other devtools components (panels, sidebars, etc)
  devtools_page: 'devtools.html', // it must be an html page for some reason

  content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'",
  web_accessible_resources: [
    'devtoolspanel.html',
  ],

};
