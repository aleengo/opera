'use strict';

const Opera = require('./lib/opera');

const appId = ''
const proxy = '';

const opera = Opera({appId, proxy});

opera.currencies()
  .then( res => console.log(res))
  .catch(err => console.log(err));

module.exports = require('./lib/opera');