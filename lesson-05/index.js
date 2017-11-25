const propPath = require('crocks/Maybe/propPath')

const input = {
  a: {
    b: {
      c: {
        name: "A - B - C"
      },
      d: {
        name: "A - B - D"
      }
    }
  }
}

const input2 = {
  a: {
    b: {
      d: {
        name: "A - B - D"
      }
    }
  }
}

// const name = input.a.b.c.name
// console.log(name) // "A - B - C"

// Without a `c` prop, path to `c` will yield undefined
// const name = input2.a.b.c
// console.log(name) // undefined

// Or worse, trying to access a property on undefined will result in an error
// const name = input2.a.b.c.name
// console.log(name) // TypeError: Cannot read property 'name' of undefined

// const safeName = propPath(['a', 'b', 'c', 'name'], input)
// console.log(safeName) // Just "A - B - C"

// Same thing with input2
const safeName = propPath(['a', 'b', 'c', 'name'], input2)
console.log(safeName) // Nothing

// Then, we can get the value out with `option`

const nameValue = safeName.option('') // "A - B - C" for input, '' for input2

