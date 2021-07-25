function debounce(callback, wait = 250) {
  let lastCall
  return function() {
    const $this = this
    clearTimeout(lastCall)
    lastCall = setTimeout(() => callback.apply($this, arguments), wait)
  }
}