// Unwrapping values from a Maybe

const isNumber = require('crocks/predicates/isNumber')
const safe = require('crocks/Maybe/safe')

const inc = n => n + 1
const dbl = n => n * 2

// Starting point
const dblInc = function(n) {
  const doubled = dbl(n)
  return inc(doubled)
}

// Works just fine with a number
// const result = dblInc(5)
// console.log(result) // 11

// Breaks with undefined or a string
// const result = dblInc(undefined)
// const result = dblInc("oops")
// console.log(result) // NaN

/*
 * We can make this safer with the Maybe, so we'll import Maybe, safe and isNumber
 * from crocks
 *
 * Then inside the function, we'll use maybe to add some safety around the operation
 *
 * But, now we don't get a number back. Any code that consumes this function is going
 * to expect a number. So let's extract the value from the Maybe...
 *
 * If there is a Just value, we want to get that out.
 * If there is a Nothing, we'll supply a default value, this way
 * we get a number either way
 */

// const safeDblInc = function(n) {
//   const safeNum = safe(isNumber, n)
//     .map(dbl)
//     .map(inc)
//   return safeNum.option(0)
// }

// const result = safeDblInc(5)
// console.log(result) // 11 - No Just

// const result = safeDblInc(undefined)
// console.log(result) // 0 - No nothing

/*
 * We can refactor this to an arrow function
 */

const safeDblInc = n => safe(isNumber, n)
    .map(dbl)
    .map(inc)
    .option(0)

const result = safeDblInc(5)
console.log(result) // 11 - No Just

// const result = safeDblInc(undefined)
// console.log(result) // 0 - No nothing
