(function() {
  const array = Array.from({ length: 20 }).map((e, index) => index + 1)
  array.forEach((e) => {
    const $item = document.createElement('span')
    const $itemWrapper = document.createElement('div')
    const $wrapperInner = document.querySelector('.wrapper_inner')
    $item.innerText = `item ${e}`
    $item.setAttribute('class', 'item')
    $itemWrapper.setAttribute('class', 'item_wrapper')
    $itemWrapper.append($item)
    $wrapperInner.append($itemWrapper)
    $wrapperInner.onmousedown = function(event) {
      console.log('mouse down!')
      let shiftX = event.clientX - $wrapperInner.getBoundingClientRect().left

      function moveAt(pageX) {
        $wrapperInner.style.transform = `translateX(${pageX - shiftX + 'px'})`
      }
      
      function onMouseMove(event) {
        moveAt(event.pageX)
      }

      moveAt(event.pageX)

      document.addEventListener('mousemove', onMouseMove)
      $wrapperInner.onmouseup = function() {
        console.log('mouse up!')
        document.removeEventListener('mousemove', onMouseMove)
        $wrapperInner.onmouseup = null
      }
    }
    $wrapperInner.ondragstart = function() {
      return false
    }
  })
}())