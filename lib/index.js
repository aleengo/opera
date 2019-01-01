'use strict'

const qs = require('querystring');
const request = require('./request');

/**
 * Opera Function constructor
 */

 // PRIVATE VARIABLES
const BASE_URL = 'https://openexchangerates.org/api/';
const CURRENCIES = 'currencies.json';
const LATEST = 'latest.json';

class Opera {

  constructor(appID, proxy) {
    
    if(!appID) {
      throw new Error('\'appID\' must be specified');
    }

    if(appID && typeof appID !== 'string') {
      throw new Error(`Expected appID to be a \`string\` but got a ${typeof appID}`);
    }

    if(proxy && typeof proxy !== 'string') {
      throw new Error(`Expected proxy to be a \`string\` but got a ${typeof proxy}`);
    }

    this._appID = appID;
    this._proxy = proxy;
  }

  get appID() {
    return this._appID;
  }

  /**
   * 
   * @param {Object} params 
   */
  latest(params) {
    return _request(LATEST, params);
  }

  /**
   * 
   * @param {Object} params 
   */
  currencies(params) {
    return _request(CURRENCIES, params);
  }

  _request(path, params) {
        
    let query_params = {
      'app_id': this._appID
    };
  
    if(params && typeof params == 'object' && Object.keys(params).length > 0) {
      query_params = Object.assign(query_params, params);
    }
    
    const _url = `${BASE_URL}${path}?${qs.stringify(query_params)}`;
  
    return new Promise( (resolve, reject) => {
      request({ url: _url,proxy: this._proxy })
        .on('complete', (res) => resolve(res))
        .on('fail', (err) => reject(err));
    });
  }

}

module.exports = Opera;