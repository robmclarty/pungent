'use strict';

const chai = require('chai');
const expect = chai.expect;
const { curry } = require('../src/pungent');

describe('Curry', () => {
  it('should execute the function when there is only one argument', () => {
    const singleArg = function (x) {
      return x;
    };
    const expected = 5;
    const result = singleArg(expected);

    expect(result).to.equal(expected);
  });

  it('should return a function waiting for the remaining arguments when it only receives partial arguments', () => {
    const add = function (x, y) {
      return x + y;
    };
    const curriedAdd = curry(add);
    const add10 = curriedAdd(10);
    const eighteen = add10(8);

    expect(add10).to.be.a('function');
    expect(eighteen).to.equal(18);
  });

  it('should wait for more arguments when not all of them are given', () => {
    const sumFour = curry(function (w, x, y, z) {
      return w + x + y + z;
    });
    const f1 = sumFour(10);
    const f2 = sumFour(1)(2, 3);
    const f3 = sumFour(1, 2, 7);
    const z = f2(4);
    const y = f3(4);
    const x = sumFour(1, 2, 3, 4);
    const x2 = sumFour(1)(2)(3)(4);

    expect(f1).to.be.a('function');
    expect(f2).to.be.a('function');
    expect(f3).to.be.a('function');
    expect(x).to.equal(10);
    expect(x2).to.equal(x);
    expect(y).to.equal(14);
    expect(z).to.equal(10);
  });

  it('should retain reference to a method\'s object', () => {
    const obj = {
      someData: 10,
      someMethod: function (w, x, y) {
        return w + x + y + this.someData;
      }
    };
    obj.curriedMethod = curry(obj.someMethod);
    const partial = obj.curriedMethod(2, 3);
    const result = partial(5);

    expect(partial).to.be.a('function');
    expect(result).to.equal(20);
  });
});
