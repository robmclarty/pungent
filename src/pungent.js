'use strict';

// Take a function with multiple parameters as input and return a function with
// exactly one parameter (i.e., one that has a arity of 1).
//
// Maintain the context in case we're currying an instance's method and
// that method needs to use `this` to refer to its object.
//
// If we have all the arguments we need, simply return the result of
// actually calling the original function fn. Otherwise, return a new function
// that will call accumulator with whatever arguments still remain.
export function curry(fn) {
  return function accumulator(...args) {
    return args.length >= fn.length ?
      fn.call(this, ...args) :
      (...rest) => accumulator.call(this, ...args, ...rest);
  };
}

// Take a function with multiple parameters and return a function with fewer
// parameters. This is "partial application".
export function partial(fn, ...partialArgs) {
  return (...remainingArgs) => {
    return fn.call(this, ...partialArgs, ...remainingArgs);
  };
}

// Take a series of functions and return the result of passing the result of
// the right-most function to the next right-most function until all the
// functions have been called, then return the final value.
export function compose(...funcs) {
  return (initial) => {
    return funcs.reduceRight(
      (result, fn) => fn(result),
      initial
    );
  }
}

// Same as compose except run functions from left to right.
export function pipe(...funcArgs) {
  const funcs = Array.from(funcArgs);

  return compose(...funcs.reverse());
}

// Apply a function all all values in a list.
export function map(fn, [x, ...xs]) {
  return !x ?
    [] :
    [fn(x), ...map(fn, xs)];
}

export function filter(fn, items) {
  const filtered = [];

  items.forEach((item) => {
    if (fn(item)) {
      filtered.push(item);
    }
  });

  return filtered;
}

export function reduce() {

}
