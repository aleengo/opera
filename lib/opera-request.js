'use strict';

module.exports = function operaRequest(options) {
  const _req = new OperaRequest(options);
  _req._makeRequest();
  return _req;
}

const request = require('request');
const EventEmitter = require('events');

const _inheritsProto = require('./utils/_extends');

/**
 * Class OperRequest, responsible for making 
 * request to oxr api server
 * 
 * @param {*} options 
 */
function OperaRequest(options) {
  EventEmitter.call(this);

  this.url = options.url;
  const _default = options.proxy ? { proxy: options.proxy } : {};
  this._request = request.defaults(_default);
  
}
// Prototype Inheritance
_inheritsProto(OperaRequest, EventEmitter);

OperaRequest.prototype._makeRequest = function _makeRequest() {
  this._request
    .get(this.url)
    .on('response', (res) => {
      // res = Instance of http.IncomingMessage
      checkStatusCodeAndContentType(res);
      res.setEncoding('utf8');

      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {

        try {
        this.emit('complete', {
          headers: res.headers, 
          body: JSON.parse(data)
          });
        } catch (e) {
          this.emit('mistake', e);
        }
    });
  });
}

/**
 * Check if statusCode === 200 and 
 * the content-type is application/json
 * 
 * @param {*} res Instance of http.IncomingMessage
 */
function checkStatusCodeAndContentType(res) {
  const status = res.statusCode;
  const contentType = res.headers['content-type'];

  if(status !== 200) {
    request.emit('mistake', new Error(`Request failed.\n Status code: ${status}`));
  } else if(!/^application\/json/.test(contentType)) {
    request.emit('mistake', new Error('Invalid Content-Type.\n' +
              `Expected application/json but received ${contentType}`));
  }
}

