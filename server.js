#!/usr/bin/env node
require('dotenv').config()
var prerender = require('./lib')
const PORT = process.env.PORT || 3000

const settings = {
  port: PORT
}

// Do not include chrome settings when running locally on Windows OS, development mode
if (process.env.NODE_ENV === 'production') {
  settings.chromeLocation = process.env.GOOGLE_CHROME_BIN
  settings.chromeFlags = ['--no-sandbox', '--headless', '--disable-gpu', '--remote-debugging-port=9222', '--hide-scrollbars']
}

var server = prerender(settings)

server.use(prerender.sendPrerenderHeader())
// server.use(prerender.blockResources())
server.use(prerender.removeScriptTags())
server.use(prerender.httpHeaders())

server.start()
