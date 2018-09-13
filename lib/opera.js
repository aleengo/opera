'use strict'

// exports the Function constructor
module.exports = Opera;

const URL = require('url').URL;
const qs = require('querystring');

const Request = require('./request');
const request = new Request();

/**
 * Opera Function constructor
 */

 // PRIVATE VARIABLES
 const baseUrl = 'https://openexchangesrates.org/api/';
 let apiKey = undefined;

function Opera(appId) {
  
  if( !(this instanceof Opera)) {
    return new Opera(appId);
  }

  if(!appId) {
    throw new Error('\'appId\' must be specified');
  }

  if(appId && typeof appId == 'string') {
    apiKey = appId;
  } 

  if(appId && typeof appId == 'object') {
    const key = Object.keys(appId)[0];
    apiKey = appId[key];
  }
}

// appId property
Object.defineProperty(Opera.prototype, 'appId', 
  {
    configurable: false,
    enumerable: false,
    writable: false,
    value: apiKey
  }
);

/**
 * 
 */
Opera.prototype.latest = function latest(params) {
  const onComplete = function onComplete(res, resolve) {
      checkStatusCodeAndContentType(res);
      res.setEncoding('utf8');

      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          resolve(parsedData);
        } catch (e) {
          request.emit('fail', e);
        }
      });
    
  };
  return this._request({path: 'latest.json', params}, onComplete);
};

Opera.prototype.currencies = function currencies(params) {
  
};

/**
 * 
 * @param {*} url 
 * @param {*} onComplete callback 
 */
Opera.prototype._request = function _request(options, onComplete) {

  let _params = options.params || {};

  const url = _buildUrl({
    path: options.path,
    params: _params
  });

  return new Promise( (resolve, reject) => {
    request.get(url)
      .on('complete', function(res) {
        return onComplete(res, resolve);
      })
      .on('fail', (err) => reject(err));
  });
}

function checkStatusCodeAndContentType(res) {
  if(res.statusCode !== 200) {
    request.emit('fail', new Error(`Request failed.\n Status code: ${res.statusCode}`));
  } else if(!/^application\/json/.test(res.headers['content-type'])) {
    request.emit('fail', new Error('Invalid Content-Type.\n' +
            `Expected application/json but received ${res.headers['content-type']}`));
  }
}
/**
 * 
 * @param {*} params 
 */
function _buildUrl(params) {

  let keys = Object.keys(params);
  const path = params[keys[0]];

  let qp = {
    'app_id': apiKey
  };

  if(keys.length === 2) {
    Object.assign(qp, params[keys[1]]);
  }

  return  new URL(`${baseUrl}${path}?${qs.stringify(qp)}`);
}