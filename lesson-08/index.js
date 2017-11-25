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

// propPath handles the property not being present, but doesn't check type
// const result = propPath(['a', 'b', 'value'], input)
//   .chain(safe(isNumber)) // if it's a Just string, this will result in a Nothing, chained to unnest
//   .map(dbl) // Skipped for Nothing,
//   .option(5)

const safeResult = compose(
  option(5),
  map(dbl),
  chain(safe(isNumber)),
  propPath(['a', 'b', 'value'])
)

const result = safeResult(input)

console.log(result) // 2
