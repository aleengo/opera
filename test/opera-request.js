const expect = require('chai').expect;
const assert = require('chai').assert;

const OperaRequest = require('../lib/opera-request');

const baseUrl = 'https://openexchangerates.org/api/';

describe('OperaRequest', () => {

  it('Should be a function', (done) => {
    assert.equal(typeof OperaRequest, 'function', 'OperaRequest is not a Function');
    done();
  });
});