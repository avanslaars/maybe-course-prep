// alt and coalesce
const prop = require('crocks/Maybe')
const safe = require('crocks/Maybe/safe')
/*
 * Create a function that returns a Maybe (fake API call perhaps)
 * That function is only concerned with data...
 * Data can be either displayed in UI or used to create a URL slug
 * The default for the url slug (404 page or something) can be pulled
 * from a variable, so we want to make sure it's in the proper format
 * so we'll still transform it the same way...
 *
 * The coalesce version of this can use a function to get the default value
 */
const page = {
  name: "This is a sample page"
}

const getPageName = (obj) => {
  return prop('name', page)
    .chain(safe(v => Boolean(v) && typeof v === 'string'))
}

const slug = getPageName(page)
  .map(str => )
