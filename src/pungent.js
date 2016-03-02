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
      fn.call(fn, ...args) :
      (...rest) => accumulator.call(fn, ...args, ...rest);
  }
}

// Take a function with multiple parameters and return a function with fewer
// parameters. This is "partial application".
export function partial(fn, ...partialArgs) {
  return (...remainingArgs) => {
    return fn.call(fn, ...partialArgs, ...remainingArgs);
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

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

// export default function compose(...funcs) {
//   return (...args) => {
//     if (funcs.length === 0) {
//       return args[0]
//     }

//     const last = funcs[funcs.length - 1]
//     const rest = funcs.slice(0, -1)

//     return rest.reduceRight((composed, f) => f(composed), last(...args))
//   }
// }

// Same as compose except run functions from left to right.
export function pipe(...funcArgs) {
  const funcs = Array.from(funcArgs);

  return compose(...funcs.reverse());
}

// Apply a function all all values in a list.
export function map(transform, [x, ...xs]) {
  return !x ?
    [] :
    [transform(x), ...map(transform, xs)];
}

export function filter(compare, items) {
  const filtered = [];

  items.forEach((item) => {
    if (compare(item)) {
      filtered.push(item);
    }
  });

  return filtered;
}

export function reduce(combine, base, items) {
  let accumulator = base;

  items.forEach((item) => {
    accumulator = combine(accumulator, item);
  });

  return accumulator;
}

export function memoize(fn) {
  const cache = {};

  return (...args) => {
    const argStr = JSON.stringify(args);

    cache[argStr] = cache[argStr] || fn.call(fn, ...args);

    return cache[argStr];
  };
}
