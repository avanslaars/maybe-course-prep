// safeLift

const isNumber = require('crocks/predicates/isNumber')
const safe = require('crocks/Maybe/safe')
const safeLift = require('crocks/Maybe/safeLift')

const inc = n => n + 1

/*
 * We can run our value through a Maybe and use a `map` to apply our function...
 */

// const safeNum = safe(isNumber, 2)
// const result = safeNum.map(inc)
// console.log(result) // Just 3

/*
 * Or, we can "lift" the function into a Maybe context...
 */

const safeInc = safeLift(isNumber, inc)
// console.log(safeInc) // Function

// const result = safeInc(2)
// console.log(result) // Just 3

const result = safeInc(undefined)
console.log(result) // Nothing

// And of course, we can get the value back out with `option`
console.log(result.option(1)) // 1
