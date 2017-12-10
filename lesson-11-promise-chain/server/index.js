// const prop = require('crocks/Maybe/prop')
const express = require('express')
const app = express()

const results = {
  "1": {
    name: 'With an address',
    address: '123 E. Elm St, Anywhere NJ 08011'
  },
  "2": {
    name: 'Nope'
  }
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.get('/:id', (req, res) => res.send(results[req.params.id]))

app.listen(3000, () => console.log('Example app listening on port 3000!'))

// Maybe when dealing with an API...

// Some data with an optional field...
// If it's present, get it and transform it some way
// Otherwise, we just return nothing...

// Function that returns data to act as the service... returns a Maybe
// So the components would be:
// - The server side code that resolves with an object
// -- Not going to be able to serialize the Maybe
// - The client service function that makes the ajax call, parses the json & resolves with a Maybe
// - Two client consumer blocks that use the Promise<Maybe> in two different ways

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

