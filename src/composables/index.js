const isDisabled = (myObject) => {
  let disabled = false
  Object.entries(myObject).forEach(([key, value]) => {
    if (value == '') {
      disabled = true
      return 0
    }
  })
  return disabled
}

const disabled = isDisabled({
  title: '',
  image: 'fasfsdfs',
})

console.log(disabled)
