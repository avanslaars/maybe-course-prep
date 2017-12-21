// Create the `safe` utility function

const Maybe = require('crocks/Maybe')

const inc = n => n + 1
const dbl = n => n * 2
const toUpper = s => s.toUpperCase()

/*
 * Start with existing safeNum fn in place
 * talk about making it more flexible...
 * Maybe we need a string example too
 */
const safeNum = val =>
  typeof val === 'number' ? Maybe.Just(val) : Maybe.Nothing()

// const input = safeNum(3)
// const result = input.map(x => console.log('running inc') || inc(x))

// console.log(result)

/**
 * Add a simple string sample
 * toUpper util will result in an error if called with a number
 * because it uses String.prototype.toUpperCase()
 * safeString function, checks for string
 * use it to map over toUpper util
 */

const safeString = val =>
  typeof val === 'string' ? Maybe.Just(val) : Maybe.Nothing()

// const inputS = safeString(10)
// const resultS = inputS.map(toUpper) /*?*/

/**
 * Instead of building entire functions that have to repeat this
 * pattern, let's build a reusable function...
 *
 * Extract the conditionals out into predicate functions
 */

const isNumber = val => typeof val === 'number'
const isString = val => typeof val === 'string'

/**
 * Create the `safe` function...
 */

const safe = (pred, val) =>
  pred(val) ? Maybe.Just(val) : Maybe.Nothing()

/**
 * Duplicate the previous results with the new `safe` fn
 */

const inputS = safe(isString, 10)
const resultS = inputS.map(toUpper) /*?*/

const input = safe(isNumber, 3)
const result = input.map(inc) /*?*/

/**
 * At this point, we can pull in `safe` and the predicates we used from crocks
 */

// const safe = require('crocks/Maybe/safe')
// const isNumber = require('crocks/predicates/isNumber')
// const isString = require('crocks/predicates/isString')

/**
 * And show that this version of `safe` is curried
 */

const maybeNumber = safe(isNumber) // pass the pred, get a fn back...

// Use that function with multiple values...
// const safeNum = maybeNumber(5)
// const safeNum2 = maybeNumber(7)

// ... and get multiple results
// const result = safeNum.map(dbl)
// const result2 = safeNum2.map(dbl)

// console.log(result) // Just 10
// console.log(result2) // Just 14



