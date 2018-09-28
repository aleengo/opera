'use strict';

const expect = require('chai').expect;
const assert = require('chai').assert;

const Opera = require('../lib/opera');

const fakeAppId = '2564dughfdjkhfsjgfusgcfsj';

describe('Opera instanciation', () => {
  
  it('Should throw a TypeError if appId is undefined', (done) => {
    expect( () => new Opera()).to.throw(TypeError);
    done();
  });

  it('Should throw an Error if appId is not specified', (done) => {
    expect( () => new Opera({}) ).to.throw(Error, '\'appId\' must be specified');
    done();
  });

  it('Should be instance of Opera', (done) => {
    let opera = Opera({appId: fakeAppId});
    expect(opera).to.be.an.instanceof(Opera);
    done();
  });

  it('Should have a property named appId', (done) => {
    let opera = Opera({appId: fakeAppId});
    expect(opera).to.have.property('appId');
    done();
  });

  it('Should return an object with opera methods', (done) => {
    let opera = new Opera({appId: fakeAppId});
    assert.equal(typeof opera, 'object', 'opera is not an object');
    assert(typeof opera.latest === 'function', 'opera.latest is not a function');
    assert(typeof opera.currencies === 'function', 'opera.currencies is not a function');
    done();
  });
});

