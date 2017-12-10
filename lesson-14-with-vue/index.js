const dbl = n => n * 2

// This works, but only if a number is entered
// It's actually a string, but it will be coerced to a number
// If you enter a string, the result will be NaN
// const update =  function (evt) {
//   this.result = dbl(this.num)
//   this.num = ''
// }

// "safer" version - cast to a number and check for isNaN
// const update =  function (evt) {
//   const numVal = Number(this.num)
//   if(isNaN(numVal)) {
//     this.result = 'entered value must be a number'
//   } else {
//     this.result = dbl(this.num)
//   }
//   this.num = ''
// }

const update =  function (evt) {
  // console.log(typeof this.num) // string
  // This is coming from a text input, so the type is a string
  // Casting to a number will give a number that will pass the predicate
  // or it'll result in NaN, which will result in false for the predicate
  const numVal = Number(this.num)
  this.result = crocks.safe(crocks.isNumber, numVal)
    .map(dbl)
    .option('entered value must be a number')

  this.num = ''
}

const app = new Vue({
  el: '#app',
  data: {
    result: '',
    num: ''
  },
  methods: {
    update: update
  }
})
