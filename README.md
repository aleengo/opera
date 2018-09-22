# OPERA
Another Unofficial OPenEchangesRAtes wrapper

# Installation
`opera` is available on [npm][npm_website]

```npm install opera --save```

# Documentation
Opera supports two functionnalities :

## opera.latest(params)
Get the latest exchange rates (JSON) available from the Open Exchange Rates API.

Returns promise

```javascript
    const Opera = require('Opera');
    
    let appId = '4554hshdhjsu';
    const opera = Opera({appId: appId});
    opera.latest()
        .then( res => res.body )
        .then( json => console.log(json.rates) )
        .catch( err => console.log(err) );
```

### Params

| params   | type   | optional  | description|
|----------|--------|-----------|------------|
| base     | string | yes       | Change base currency (3-letter code, default: USD)|
| symbols  | string | yes       | Limit results to specific currencies (comma-separated liste of 3-letter codes)|
|show_alternative| boolean | yes | Extend returned values with alternative, black market and digital currency rates |

> **Note:** Changing the `base` currency is available for all clients of paid plans. Other parameters are availbale for all plans, including free.

## opera.currencies(params)
Get a JSON list of all currency, and their full names, available from the Open Exchange Rates API.
This list will always mirror the currencies available in the latest rates (given as their 3-letter codes).

Returns Promise

```javascript
    const Opera = require('Opera');
    
    let appId = '4554hshdhjsu';
    const opera = Opera({appId: appId});
    opera.currencies()
        .then( res => res.body )
        .then( currencies => console.log(currencies) )
        .catch( err => console.log(err) );
```
### 
| params   | type   | optional  | description|
|----------|--------|-----------|------------|
| show_alternative  | string | yes | Extend returned values with alternative, black market and digital currency rates|
|show_inactive| boolean | yes | Include historical/inactive currencies|


# Contributing
All contributions are welcome.

# License
GNU GPLv3 &copy; aleengo.


[npm_website]: https://www.npmjs.com/
