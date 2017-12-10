const Maybe = crocks.Maybe
const prop = crocks.prop

const getUserAddress = (id) => {
  return fetch(`http://localhost:3000/${id}`)
    .then(res => res.json())
    .then(prop('address'))
    .catch(console.error)
}

// Just displaying the whole address...
getUserAddress(1)
  .then(m => {
    const val = m.option('No address on file')
    document.getElementById('app').innerHTML = `<h1>${val}</h1>`
  })

// with some processing
// getUserAddress(1)
//   .then(m => m.map(str => str.toUpperCase()))
//   .then(m => {
//     const val = m.option('No address on file')
//     document.getElementById('app').innerHTML = `<h1>${val}</h1>`
//   })
