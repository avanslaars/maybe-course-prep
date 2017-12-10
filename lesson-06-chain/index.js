// chain, chain, chain...
const Maybe = require('crocks/Maybe')
const prop = require('crocks/Maybe/prop')

// Fake API call that resolves to a Maybe
// Maybe the "right" thing to do is here is have the data come back
// slightly more complex and use the maybe to extract a value
// Doesn't change the point of the example, but maybe makes it a bit more realistic?
const getData = () => new Promise((resolve, reject) => {
  const result = {
    status: 200,
    data: {
      name: "Maybe API response"
    }
  }
  // ... code that does the API call and resolves with the `data`
  resolve(prop('data', result))
})

// When the call resolves, I get a Maybe and use `map to call prop on the result
getData()
  .then(res => res.map(prop('name')))
  .then(console.log) // Just Just "Maybe API response"

getData()
  .then(res => res.chain(prop('name'))) // chain flattens the nested Maybe
  .then(console.log) // Just "Maybe API response"

