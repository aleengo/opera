'use strict';

module.exports = Request;

const https = require('https');
const EventEmitter = require('events');

const _extends = require('./utils/_extends');

function Request(options) {
  EventEmitter.call(this);
}
// Prototype Inheritance
_extends(Request, EventEmitter);

Request.prototype.get = function request(url) {

  console.log(url);
  let _options = {
    method: 'GET',
    hostname: url.hostname,
    path: `${url.pathname}${url.search}`,
    port: 443
  };

  const req = https.request(_options, (res) => this.emit('complete', res));
  req.on('error', (err) => this.emit('fail', err));
  req.end();
  
  // emits onComplete
  return this;
}

//addEventListener('complete', onComplete);
//addEventListener('success', onSuccess);
//addEventListener('fail', onFailed);

/*function request(options) {
  const req = new Request(options);
  req.get(options);
}*/

/**
 * 
 * @param {*} resp Server response 
 */
function onComplete(resp) {
  if(resp.statusCode === 200) {
    this.emit('success', resp);
  } else {
    this.emit('fail', resp.err)
  }
}

function onSuccess(response) {
}
