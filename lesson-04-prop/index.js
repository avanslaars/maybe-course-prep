// Using Maybe to safely access properties of an object

const prop = require('crocks/Maybe/prop')

const inc = n => n + 1

// TODO: Work on an example where we work with multiple `Maybe`s to calc next page or something

// Object that represents querystring of a url
// const qs = {page:2,pageSize:10,total:203}

// const page = qs.page
// console.log(page) // 2

// const page = qs['page']
// console.log(page) // 2

// Object comes through without `page` for some reason
// const qs = {pageSize:10,total:203}
// const page = qs['page']
// console.log(page) // undefined

// Attempting to increment with undefined...

// const nextPage = inc(page)
// console.log(nextPage) // NaN

// const qs = {pageSize:10,total:203}
// const page = prop('page', qs)
// console.log(page) // Nothing

// const nextPage = page.map(inc).option(1)
// console.log(nextPage) // 1

// And again with a value

const qs = {pageSize: 10, total: 203}
const page = prop('page', qs)
console.log(page) // Nothing

const nextPage = page.map(inc).option(1)
console.log(nextPage) // 1


