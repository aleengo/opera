'use strict';

module.exports = Request;

const https = require('https');
const EventEmitter = require('events');
const URL = require('url').URL;

const _extends = require('./utils/_extends');

function Request(options) {
  EventEmitter.call(this);
}
// Prototype Inheritance
_extends(Request, EventEmitter);

Request.prototype.get = function request(options) {

  let _url = undefined;

  if(typeof options == 'string') {
    _url = new URL(options);
  } else {
    _url = new URL(options.url);
  }

  let _options = {
    method: 'GET',
    hostname: _url.hostname,
    path: `${_url.pathname}${_url.search}`,
    port: 443
  };

  const req = https.request(_options, (res) => this.emit('complete', res));
  req.on('error', (err) => this.emit('mistake', err));
  req.end();

  return this;
}
