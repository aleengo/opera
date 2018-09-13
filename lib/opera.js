'use strict'

// exports the Function constructor
module.exports = Opera;

const qs = require('querystring');

const Request = require('./request');
const request = new Request(); // EventEmitter Request

/**
 * Opera Function constructor
 */

 // PRIVATE VARIABLES
 const baseUrl = 'https://openexchangerates.org/api/';
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
  const options = {
    path: 'latest.json', 
    params
  };
  return this._request(options);
};

Opera.prototype.currencies = function currencies(params) {
  const options = {
    path: 'currencies.json',
    params
  };
  return this._request(options);
};

/**
 * 
 * @param {*} url 
 * @param {*} onComplete callback 
 */
Opera.prototype._request = function _request(options) {

  let _params = options.params || {};

  const url = _buildUrl({
    path: options.path,
    params: _params
  });

  return new Promise( (resolve, reject) => {
    request.get(url)
      .on('complete', (res) => {
          checkStatusCodeAndContentType(res);
          res.setEncoding('utf8');

          let data = '';
          res.on('data', (chunk) => data += chunk);
          res.on('end', () => {
            try {
              resolve({
                  headers: res.headers, 
                  data: JSON.parse(data)
                });
            } catch (e) {
              request.emit('mistake', e);
            }
          });
      })
      .on('mistake', (err) => reject(err));
  });
}

/**
 * Check if statusCode === 200 and 
 * the content-type is application/json
 * 
 * @param {*} res 
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
  return  `${baseUrl}${path}?${qs.stringify(qp)}`;
}