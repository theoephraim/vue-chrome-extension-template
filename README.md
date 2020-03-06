# Vue Chrome Extension Template

A nice starter kit for building Chrome extensions using vue with
- wepack, vue, pug, less
- automatic lint+fix on save
- live reloading enabled via [webpack-extension-reloader](https://github.com/rubenspgcavalcante/webpack-extension-reloader)
- helpers for dealing with intra-extension messaging
- helpers for some other chrome APIs

This does not have an example of every chrome extension feature, but it does cover most common features.


## Developing locally

(after forking/copying the repo and running `npm install`)

run `npm run dev`

- go to `chrome://extensions`
- enable "developer mode"
- click "Load unpacked" and select the `dist` folder of this project

Live reloading will mostly handle things for you, but if you change the manifest, env vars, or webpack config, you will need to stop and restart `npm run dev`.

Also some specific errors may require going back to `chrome://extensions` and re-loading the plugin.

**Happy hacking!**


## Building for production

run `npm run build`


## Configuration

Configuration is stored in config/env.js and exposed in `process.env` via `webpack.DefinePlugin`. Defaults are loaded first and then overrides depending on the env being built for.

Optionally, you can create a `config/local.js` file (not checked into git) with overrides to be loaded only during local development.
