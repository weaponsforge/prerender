#!/usr/bin/env node
var prerender = require('./lib')
const PORT = process.env.PORT || 3000

var server = prerender({
  chromeLocation: process.env.GOOGLE_CHROME_BIN,
  chromeFlags: ['--no-sandbox', '--headless', '--disable-gpu', '--remote-debugging-port=9222', '--hide-scrollbars'],
  port: PORT,
})

server.use(prerender.sendPrerenderHeader())
// server.use(prerender.blockResources())
server.use(prerender.removeScriptTags())
server.use(prerender.httpHeaders())

server.start()
