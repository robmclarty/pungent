'use strict';

const chai = require('chai');
const expect = chai.expect;
const { partial } = require('../src/pungent');

describe('Partial', () => {
  it('should work', () => {
    const addStuff = (w, x, y, z) => {
      return w + x + y + z;
    };
    const addSomeStuff = partial(addStuff, 1, 2);
    const addMoreStuff = partial(addSomeStuff, 3);
    const total = addMoreStuff(4);

    expect(addSomeStuff).to.be.a('function');
    expect(addMoreStuff).to.be.a('function');
    expect(total).to.equal(10);
  });
});
