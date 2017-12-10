// Understanding the Maybe type...

const Maybe = require('crocks/Maybe')

/**
 * What is the problem?
 * Operations can be unsafe when not accounting for
 * null, undefined and invalid types for an operation
 */

/**
 * Start with the inc function with a value of 1 and
 * the result being logged out
 */

const inc = n => (console.log('running inc with', n), n + 1)
const dbl = n => (console.log('running dbl with', n), n * 2)
// const value = 1

// const result = inc(value)
// console.log(result) // 2

/*
 * Now change the value to `undefined` to show the
 * NaN result
 */
// const value = undefined

// const result = inc(value)
// console.log(result) // NaN


/*
 * We can make our code safer with the Maybe type...
 * Maybe is a Sum type, or a Union type
 * Essentially, it can be one of 2 underlying types
 * In the case of the Maybe, it will be a Just, holding a value
 * or a Nothing, which represents... well, nothing :)
 */

/*
 * Let's see how to create a Maybe...
 */

// Import Maybe from crocks...
// const Maybe = require('crocks/Maybe)

// Create a Just that holds a value
// const justAValue = Maybe.Just(2)
// console.log(justAValue) // Just 2 is printed to the console

// Create a Nothing
// const noValue = Maybe.Nothing() // Nothing

// const safeNum = Maybe.Just(2)
// console.log(safeNum) // Just 2
// console.log(safeNum.inspect()) // Just 2

// const result = safeNum.map(inc)
// console.log(result) // Just 3

/*
 * We can create a Just or a Nothing, but the point is to make values
 * safe... if we know ahead of time that we will have a Nothing, this
 * isn't really doing much for us
 *
 * Let's create a function that will give us back the appropriate Maybe
 */

const getMaybe = val =>
  (val === null || val === undefined) ? Maybe.Nothing() : Maybe.Just(val)

// const safeNum = getMaybe(2)
// console.log(result) // Just 2

// const safeNum = getMaybe(undefined)
// console.log(result) // Nothing

/*
 * Now that we have a reasonable way to wrap a value in a Maybe, how do we use it?
 *
 * We can't just pass our Maybe into a function that expects a number
 * So how do we apply a function to our value? We use `map`
 */

// const safeNum = getMaybe(2)
// const result = dbl(safeNum)
// console.log(result) // NaN

// const result = safeNum.map(dbl)
// console.log(result) // Just 4

/*
 * Now, what happens if we do this with a value that makes our Maybe
 * a Nothing?
 *
 * Let's add a console.log to our `dbl` function so we can see it run
 * Re-run the result with the actual value to show it working...
 * Then change the number to undefined, run then code again and show that
 * it's resulting in a Nothing and the function was never invoked
 */

const safeNum = getMaybe(undefined)

const result = safeNum.map(dbl)
console.log(result) // Nothing & fn never runs

// const safeNum = Maybe.Nothing()
// console.log(safeNum) // Nothing

// const result = safeNum.map(inc)
// console.log(result) // Nothing

/**
 * Instead of resulting in a NaN, the function just wasn't executed
 */




