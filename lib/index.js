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
      throw new Error(`\`appID\` must be specified`);
    }

    if(appID && typeof appID !== 'string') {
      throw new Error(`Expected \`appID\` to be a \`string\` but got \`${typeof appID}\``);
    }

    if(proxy && typeof proxy !== 'string') {
      throw new Error(`Expected \`proxy\` to be a \`string\` but got \`${typeof proxy}\``);
    }

    this._appID = appID;
    this._proxy = proxy;
  }

  get appID() {
    return this._appID;
  }

  /**
   * Get the latest exchanges rates available
   * from OpenExchangeRates API
   * 
   * @param {Object} params parameters object
   * @return {Promise}
   */
  latest(params) {
    return this._request(LATEST, params);
  }

  /**
   * Get a JSON list of all currency, and their full names, 
   * available from the Open Exchange Rates API
   * 
   * @param {Object} params parameters object
   * @return {Promise}
   */
  currencies(params) {
    return this._request(CURRENCIES, params);
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
        .on('complete', (result) => resolve(result))
        .on('fail', (e) => reject(e));
    });
  }

}

module.exports = Opera;