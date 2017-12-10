// Applicatives with the `ap` method

const Maybe = require('crocks/Maybe')
const safe = require('crocks/Maybe/safe')
const curry = require('crocks/helpers/curry')
const isNumber = require('crocks/predicates/isNumber')
const liftA2 = require('crocks/helpers/liftA2')

// const dbl = n => n * 2

// const safeNum = safe(isNumber, 5)

// safeNum.map(dbl) /*?$.inspect()*/ // Just 10

// const maybeDbl = Maybe.of(dbl)

// maybeDbl.ap(safeNum) /*?$.inspect()*/ // Just 10

// So, what's the point?
// Well, what about a function with an arrity of two?

// const add = (a, b) => a + b

safeNum = safe(isNumber, 5)
safeNum2 = safe(isNumber, 3)

// We can't just do this:

// add(safeNum, safeNum2) // add is looking for numbers, not Maybes

// That's ok, we have `map`, right?

// Well...

// To pass multiple arguments, we need to do weird stuff with map...

// First, we need to curry the function:

// Manually curried `add`
const add = a => b => a + b

/*
 * Mapping will unwrap the value and apply the function to it
 * The result will be a partially applied function that is now wrapped in a Maybe
 * To apply a second value with `map`, we'd unwrap the function and then apply it
 * with `map`. This will unfold the inner value, apply the function to it and return
 * the wrapped result, which will again be wrapped when returned from the outter `map`
 */
safeNum.map(n => add(n))
  .map(fn => safeNum2.map(fn)) /*?$.inspect()*/ // Just Just 8

// And we could replace on with `chain` to avoid nested Maybes
// But it's still a little weird to work with
safeNum.map(add)
  .chain(fn => safeNum2.map(fn)) /*?$.inspect()*/ // Just 8

// Explain `ap`
// Another method supplied by the Maybe type is `ap`
// ap is a function that can apply the function contents of one functor to the value contents of another.

// Let's look at a slightly simpler example
// Simplified example...
const inc = n => n + 1
safeNum.map(inc) /*?$.inspect()*/ // Just 6

const safeInc = Maybe.of(inc)
safeInc.ap(safeNum) /*?$.inspect()*/ // Just 6

// So let's wrap our add function in a Maybe and see how we can use this new
// found knowledge to handle multiple arguments...
safeAdd = Maybe.of(add)


// Now we can use `map` and `ap` together

safeNum.map(add)
  // Now, we can replace `chain` w/ `map` with `ap`
  // This: .chain(fn => safeNum2.map(fn)) /*?$.inspect()*/ // Just 8
  // becomes...
  .ap(safeNum2) /*?$.inspect()*/ // Just 8

// We could also start with the function and use `ap` twice
safeAdd
  .ap(safeNum)
  .ap(safeNum2) /*?$.inspect()*/ // Just 8

// There is also a utility function that can be used to lift the function
// into a Maybe context

liftA2(add, safeNum, safeNum2) /*?$.inspect()*/ // Just 8
