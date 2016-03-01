'use strict';

const chai = require('chai');
const expect = chai.expect;
const { map } = require('../src/pungent');

describe('Map', () => {
  it('should work', () => {
    const add1 = x => x + 1;
    const values = [1, 2, 3, 4, 5];
    const modifiedValues = map(add1, values);

    expect(modifiedValues).to.be.an('array');
    expect(modifiedValues).to.eql([2, 3, 4, 5, 6]);
  });
});
