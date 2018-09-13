'use strict';

const Opera = require('./lib/opera');

const appId = 'd1ff258466994304854884d3600a75aa'
const opera = Opera(appId);

opera.latest()
  .then( res => console.log(res))
  .catch(err => console.log(err));

module.exports = require('./lib/opera');