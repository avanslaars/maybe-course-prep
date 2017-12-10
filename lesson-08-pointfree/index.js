// Using point-free utilities
const chain = require('crocks/pointfree/chain')
const compose = require('crocks/helpers/compose')
const isNumber = require('crocks/predicates/isNumber')
const map = require('crocks/pointfree/map')
const option = require('crocks/pointfree/option')
const propPath = require('crocks/Maybe/propPath')
const safe = require('crocks/Maybe/safe')

// Try to use `prop`, `map`, `chain`
const dbl = n => n * 2
const input = {
  a: {
    b: {
      value: 1
    }
  }
}

const input2 = {
  a: {
    b: {
      value: "oops"
    }
  }
}

const input3 = {
  a: {
    b: {
      c: "oops"
    }
  }
}

// Let's start with the goal... getting the double of `input.a.b.value`

// Use propPath to get the `value` property...
// const result = propPath(['a', 'b', 'value'], input)

// This will return a Nothing if no value, but will return a Just String
// if `value` holds a string...

// use safe to verify the type & chain to flatten
// const result = propPath(['a', 'b', 'value'], input)
//   .chain(safe(isNumber))

// Now we can safely map our `dbl` function
// const result = propPath(['a', 'b', 'value'], input)
//   .chain(safe(isNumber))
//   .map(dbl)

// Finally, we want to extract the value, using 5 as the default

// const result = propPath(['a', 'b', 'value'], input)
//   .chain(safe(isNumber)) // if it's a Just string, this will result in a Nothing, chained to unnest
//   .map(dbl) // Skipped for Nothing,
//   .option(5)

// Now, if we want to do the same for input2 & input3...
// We could wrap that whole thing in a function

// const safeResult = obj =>
//   propPath(['a', 'b', 'value'], obj)
//     .chain(safe(isNumber)) // if it's a Just string, this will result in a Nothing, chained to unnest
//     .map(dbl) // Skipped for Nothing,
//     .option(5)

// Or, we could create a composition made up of point-free utilities

const safeResult = compose(
  option(5),
  map(dbl),
  chain(safe(isNumber)),
  propPath(['a', 'b', 'value'])
)

const result = safeResult(input)

console.log(result) // 2
