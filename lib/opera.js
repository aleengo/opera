'use strict'

// exports the Function constructor
module.exports = Opera;

const qs = require('querystring');

const operaRequest = require('./opera-request');

/**
 * Opera Function constructor
 */

 // PRIVATE VARIABLES
const baseUrl = 'https://openexchangerates.org/api/';
let apiKey = undefined;
let proxy = undefined

function Opera(options) {
  
  if( !(this instanceof Opera)) {
    return new Opera(options);
  }

  if(!options.appId) {
    throw new Error('\'appId\' must be specified');
  }

  apiKey = options.appId;
  proxy = options.proxy;
}

// appId property
Object.defineProperty(Opera.prototype, 'appId', 
  {
    configurable: false,
    enumerable: false,
    get: function () {
      return apiKey;
    }
  }
);

/**
 * 
 */
Opera.prototype.latest = function latest(params) {
  return _request('latest.json', params);
};

Opera.prototype.currencies = function currencies(params) {
  return _request('currencies.json', params);
};

/**
 * 
 * @param {*} url 
 * @param {*} onComplete callback 
 */

function _request(path, params) {

  let qp = params || {};
  const url = _buildUrl(path, qp);

  const options = {
    url: url,
    proxy: proxy
  };

  return new Promise( (resolve, reject) => {
    operaRequest(options)
      .on('complete', (res) => resolve(res))
      .on('mistake', (err) => reject(err));
  });
}



/**
 * Returns a url as a string 
 * 
 * @param {*} params params use to buld an URL
 */
function _buildUrl(path, params) {

  let qp = {
    'app_id': apiKey
  };

  if(params && typeof params == 'object' && Object.keys(params).length > 0) {
    Object.assign(qp, params); 
  }
  
  return `${baseUrl}${path}?${qs.stringify(qp)}`;
}