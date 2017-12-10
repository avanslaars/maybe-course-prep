// alt and coalesce
const identity = require('crocks/combinators/identity')
const Maybe = require('crocks/Maybe')
const prop = require('crocks/Maybe/prop')
const {compose, join, split, toLower} = require('ramda')
const safe = require('crocks/Maybe/safe')
const isEmpty = require('crocks/predicates/isEmpty')
const isString = require('crocks/predicates/isString')
const and = require('crocks/logic/and')
const not = require('crocks/logic/not')

const isNonEmptyString = and(not(isEmpty), isString)
const createSlug = compose(join('-'), split(' '), toLower)
const defaultPagename = "page not found"
const page = {
  name: "This is a sample page"
}


const getPageName = (obj) => {
  return prop('name', obj)
    .chain(safe(isNonEmptyString))
}

// const slug = getPageName(page)
//   .map(createSlug)
//   .option('page-not-found') // This requires that we know how to supply the default slug

// We get the supplied default when an object doesn't have page
// const slug = getPageName({})
//   .map(createSlug)
//   .option('page-not-found') // This requires that we know how to supply the default slug

// We could supply an alternate value prior to transformations
// Now, if we change the way slugs are created, we don't need to
// update a hrad-coded string :)
// const slug = getPageName({})
//   .alt(Maybe.of(defaultPagename))
//   .map(createSlug)
//   .option('This will never show')

// Now we can get the value from a function
// The left fn can't rely on args, because there won't be any to pass from a Nothing
// The right function will receieve the unwrapped value
const getDefaultPageName = () => {
  const defaultPageName = "Default Supplied by a function"
  return defaultPageName
}

// const slug = getPageName({})
//   .coalesce(
//     getDefaultPageName, // use a function to get the value
//     identity // leave the value untouched
//   )
//   .map(createSlug)
//   .option('This will never show')

// If the "left" was in a known state (pre-transformed), part way
// through the transformation We could move part of that process
// into the "right" function and it would be like mapping it
// So let's say there is another step to make a full URL
// And, now we have a function that will return a pre-transformed
// default slug... we can make createSlug fn the "right" fn and
// call the default function for the "left"
const getDefaultPageSlug = () => {
  return 'page-not-found'
}

const slug = getPageName(page)
  .coalesce(
    getDefaultPageSlug, // use a function to get the pre-transformed value
    createSlug // convert the value to a slug
  )
  .map(slug => `http://localhost/pages/${slug}`)
  .option('http://localhost')

console.log(slug) /*?*/
