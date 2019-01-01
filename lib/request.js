'use strict';

const EventEmitter = require('events');
const request = require('request');

const { checkStatusCodeAndContentType } = require('./utils/util');


/**
 * Class Request, responsible for making 
 * request to openexchangesrates server
 */
class Request extends EventEmitter {
  
  constructor(opts) {
    super();
    this._url = opts.url;
    
    const defaultOptions = opts.proxy ? { proxy : opts.proxy } : {};
    this._request = request.defaults(defaultOptions);
  }

  make() {
    this._request.get(this._url)
      .on('response', (res) => {
        // res = Instance of http.IncomingMessage
        checkStatusCodeAndContentType(res);
      
        res.setEncoding('utf8');

        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {

          try {
            const result =  {
                headers: res.headers, 
                body: JSON.parse(data)
              };

            this.emit('complete', result);
          } catch (e) {
            this.emit('fail', e);
        }
    });
  });
  }

}

module.exports = function __request(options) {
  const _request = new Request(options);
  _request.make();
  return _request;
}
