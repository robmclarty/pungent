'use strict';

const chai = require('chai');
const expect = chai.expect;
const { reduce } = require('../src/pungent');

describe('Reduce', () => {
  it('should sum an array of numbers', () => {
    const sequence = [1, 2, 3, 4, 5];
    const add = (a, b) => a + b;
    const sum = numbers => reduce(add, 0, numbers);

    expect(sum(sequence)).to.equal(15);
  });

  it('should get the total length of all arrays', () => {
    const sequence1 = [1, 2, 3, 4, 5];
    const sequence2 = [6, 7, 8];
    const sequence3 = [9, 10, 11, 12];
    const allSequences = [sequence1, sequence2, sequence3];
    const addLength = (prevTotal, anArray) => prevTotal + anArray.length;
    const totalLength = arrays => reduce(addLength, 0, arrays);

    expect(totalLength(allSequences)).to.equal(12);
  });
});
