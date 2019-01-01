'use strict';

const expect = require('chai').expect;
const assert = require('chai').assert;

const Opera = require('../lib/');

const fakeAppId = '2564dughfdjkhfsjgfusgcfsj';

describe('Opera', () => {
  
  it('Should throw an Error if appID is not specified', () => {
    expect( () => new Opera()).to.throw(Error);
  });

  it('Should throw an Error if appID is specified but it is not a string', () => {
    expect( () => new Opera({}) ).to.throw(Error);
  });

  it('Should be instance of Opera', () => {
    let opera = new Opera(fakeAppId);
    expect(opera).to.be.an.instanceof(Opera);
  });

  it('Should have a property named appID', () => {
    let opera = new Opera(fakeAppId);
    expect(opera).to.have.property('appID');
  });

  it('Should return an object with opera methods', () => {
    let opera = new Opera(fakeAppId);
    assert.equal(typeof opera, 'object', 'opera is not an object');
    assert(typeof opera.latest === 'function', 'opera.latest is not a function');
    assert(typeof opera.currencies === 'function', 'opera.currencies is not a function');
  });
});

