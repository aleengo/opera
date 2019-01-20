[![Build Status](https://travis-ci.com/aleengo/opera.svg?branch=master)](https://travis-ci.com/aleengo/opera)

[![Coverage Status](https://coveralls.io/repos/github/aleengo/opera/badge.svg)](https://coveralls.io/github/aleengo/opera)

# OPERA
Another Unofficial OPenEchangesRAtes wrapper

# Installation
`opera` is available on [npm][opera_npm_website]

```npm install --save @aleengo/opera```

# Documentation

Opera supports two functionnalities :

- [latest(params)](#latest(params))
- [currencies(params)](#currencies(params))
- [Proxy](#Proxy)

## latest(params)
Get the latest exchange rates (JSON) available from the Open Exchange Rates API.

Returns a promise

```javascript
    const Opera = require('@aleengo/opera');
    
    let appID = '4554hshdhjsu';
    const opera = new Opera(appID);
    opera.latest()
        .then(res => res.body)
        .then(data => console.log(data.rates))
        .catch(e => console.log(e));
```

### Params

| params   | type   | optional  | description|
|----------|--------|-----------|------------|
| base     | string | yes       | Change base currency (3-letter code, default: USD)|
| symbols  | string | yes       | Limit results to specific currencies (comma-separated liste of 3-letter codes)|
|show_alternative| boolean | yes | Extend returned values with alternative, black market and digital currency rates |

> **Note:** Changing the `base` currency is available for all clients of paid plans. Other parameters are availbale for all plans, including free.

## currencies(params)
Get a JSON list of all currency, and their full names, available from the Open Exchange Rates API.
This list will always mirror the currencies available in the latest rates (given as their 3-letter codes).

Returns a promise

```javascript
    const Opera = require('@aleengo/opera');
    
    let appID = '4554hshdhjsu';
    const opera = new Opera(appID);
    opera.currencies()
        .then(res => console.log(res.body))
        .catch(e => console.log(e));
```
### 
| params   | type   | optional  | description|
|----------|--------|-----------|------------|
| show_alternative  | boolean | yes | Extend returned values with alternative, black market and digital currency rates|
|show_inactive| boolean | yes | Include historical/inactive currencies|


## Proxy
If you are behind a proxy, you can specified an extra parameter to Opera object.

Specify a string as the extra parameter

```javascript
    const Opera = require('@aleengo/opera');
    
    const appID = '4554hshdhjsu';
    const proxy = 'http://username:pass@proxy_host:proxy_port'

    const opera = new Opera(appID, proxy);
    opera.latest()
        .then(res => res.body )
        .then(data => console.log(data.rates))
        .catch(e => console.log(e));
```
# Contributing
All contributions are welcome.

# License
GNU GPLv3 &copy; aleengo.


[opera_npm_website]: https://www.npmjs.com/package/@aleengo/opera
