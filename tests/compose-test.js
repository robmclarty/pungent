'use strict';

const chai = require('chai');
const expect = chai.expect;
const { compose } = require('../src/pungent');

describe('Compose', () => {
  it('should work', () => {
    const add1 = x => x + 1;
    const mult2 = x => x * 2;
    const square = x => x * x;
    const negate = x => -x;
    const f = compose(negate, square, mult2, add1);

    expect(f).to.be.a('function');
    expect(f(2)).to.equal(-36);
  });
});
