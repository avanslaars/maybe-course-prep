
// When the button isn't found, addEventListener results in a TypeError
// Uncaught TypeError: Cannot read property 'addEventListener' of null
// const btn = document.querySelector('#btns')

// const btn = document.querySelector('#btn')
// btn.addEventListener('click', () => {
//   // const title = document.querySelector('#pageHead') // null
//   const title = document.querySelector('#pageHeading') // gets the DOM node

//   // With the wrong selector, attempting to get value results in:
//   // Uncaught TypeError: Cannot read property 'value' of null
//   // const newVal = document.querySelector('#newTitles').value
//   const newVal = document.querySelector('#newTitle').value
//   title.innerHTML = newVal
// })

const safeDom = selector => crocks.safe(Boolean, document.querySelector(selector))

// This all works with the proper selectors
// changing this selector to an invalid option - nothing happens, no error
// const btn = safeDom('#btn')
//   .map(el => el.addEventListener('click', () => {
//     // changing selector - no errors
//     const newVal = safeDom('#newTitle')
//       .map(el => {
//         const newTitle = el.value
//         // Change selector - no errors
//         safeDom('#pageHeading')
//           .map(el => {
//             el.innerHTML = newTitle
//           })
//       })
//   }))

// We can simplify this code by creating a curried function that can handle our update
const updateTitle = (inputNode) => (titleNode) => {
  titleNode.innerHTML = inputNode.value
}

// Then we use safeDom to add the event listener
// Then inside, we'll lift the curried function into a Maybe context
// Then we can pass in our Maybe Nodes
// const btn = safeDom('#btn')
//   .map(el => el.addEventListener('click', () => {
//     crocks.liftA2(updateTitle, safeDom('#newTitle'), safeDom('#pageHeading'))
// }))

// We can shorten this even more by creating a curried function with 3
// inputs and using liftA3

// const safeDom = selector => crocks.safe(Boolean, document.querySelector(selector))
const clickAndUpdate = (btnNode) =>  (inputNode) => (titleNode) => {
  btnNode.addEventListener('click', () => {
    titleNode.innerHTML = inputNode.value
  })
}

crocks.liftA3(clickAndUpdate, safeDom('#btn'), safeDom('#newTitle'), safeDom('#pageHeading'))



