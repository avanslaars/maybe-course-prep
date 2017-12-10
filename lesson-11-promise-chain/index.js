const prop = require('crocks/Maybe/prop')

// Maybe when dealing with an API...

// Some data with an optional field...
// If it's present, get it and transform it some way
// Otherwise, we just return nothing...

// Function that returns data to act as the service... returns a Maybe

// Consuming code that calls the service & continues transformations...
// Maybe 2 of these, to demo different ways to consume the data
const getUser = (id) => {
  // fetch by id to endpoint
  // - maybe use 2 id values to get results with and without the property
  // Get response
  // `.then(res => res.json())`
  // `.then` with property extraction...
  // refactor to return a Maybe
}

// Consume the function that does the get
// Handle the resp in `.then`
// Use `map` to transform and `option` to extract
// Show a 2nd consumer that gets the same data and does a different transformation

