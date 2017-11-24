const Maybe = require('crocks/Maybe')

const inc = n => n + 1
const dbl = n => n * 2

/*
 * Start with existing getMaybe fn in place and show
 * that it still leads to unintended results if passed a string
 * and the string is applied to a fn that expects a number
 */

const getMaybe = val =>
  (val === null || val === undefined) ? Maybe.Nothing() : Maybe.Just(val)

// const safeNum = getMaybe("Uh oh")
// const result = safeNum.map(dbl)
// console.log(result) // Just NaN

/**
 * We could start updating our getMaybe function, but it would
 * be easier to create a general purpose function that's a little more
 * flexible. Let's create a `safe` function
 *
 * `safe` will take a predicate function and a value, if the predicate
 * evaluates to true, we wrap the value in a Just, otherwise we return
 * a Nothing
 */

// const safe = (pred, val) => pred(val) ? Maybe.Just(val) : Maybe.Nothing()
// const isNumber = n => typeof n === 'number' && !isNaN(n)

// const safeNum = safe(isNumber, 5)
// const result = safeNum.map(dbl)
// console.log(result) // Just 10

// const safeNum = safe(isNumber, "Test")
// const result = safeNum.map(dbl)
// console.log(result) // Nothing

/**
 * At this point, we can pull in `safe` and the predicates we used from crocks
 */

const safe = require('crocks/Maybe/safe')
const isNumber = require('crocks/predicates/isNumber')

// const safeNum = safe(isNumber, 5)
// const result = safeNum.map(dbl)
// console.log(result) // Just 10

// const safeNum = safe(isNumber, "Test")
// const result = safeNum.map(dbl)
// console.log(result) // Nothing

/**
 * And show that this version of `safe` is curried
 */

const maybeNumber = safe(isNumber) // pass the pred, get a fn back...

// Use that function with multiple values...
const safeNum = maybeNumber(5)
const safeNum2 = maybeNumber(7)

// ... and get multiple results
const result = safeNum.map(dbl)
const result2 = safeNum2.map(dbl)

console.log(result) // Just 10
console.log(result2) // Just 14



