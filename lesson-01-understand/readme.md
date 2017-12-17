# Lesson 1 - Maybe basics

## The Problem

Passing null or undefined to a function can result in unexpected results and errors

```js
const inc = n => n + 1
const good = inc(2) // 3

const bad = inc(undefined) // NaN
```

## Maybe makes code safer

### The Maybe type

Maybe can be one of two underlying types, a `Just` which holds a value, or a `Nothing`, which represents no value.

This might sound a little silly at first, but we'll see how it's used shortly

#### Crocks

We'll use the Crocks library for these examples, but there are other implementations in JS and other languages, such as Elm support the same types.

### Creating a Maybe

We can directly create either of the underlying types:

```js
const Maybe = require('crocks/Maybe')

const justAValue = Maybe.Just(2)
console.log(justAValue) // Just 2 is printed to the console

const noValue = Maybe.Nothing() // Nothing
```



