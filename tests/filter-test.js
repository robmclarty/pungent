'use strict';

const chai = require('chai');
const expect = chai.expect;
const { filter } = require('../src/pungent');

describe('Filter', () => {
  it('should work', () => {
    const isOdd = x => x % 2 !== 0;
    const numbers = [1, 2, 3, 4, 5];
    const oddNumbers = filter(isOdd, numbers);

    expect(oddNumbers).to.be.an('array');
    expect(oddNumbers).to.eql([1, 3, 5]);
  });
});
