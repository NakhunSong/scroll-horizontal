(function() {
  const array = Array.from({ length: 20 }).map((e, index) => index + 1)
  array.forEach((e) => {
    const $item = document.createElement('div')
    const $itemWrapper = document.createElement('div')
    const $wrapperInner = document.querySelector('.wrapper_inner')
    $item.innerText = `item ${e}`
    $item.setAttribute('class', 'item')
    $itemWrapper.setAttribute('class', 'item_wrapper')
    $itemWrapper.append($item)
    $wrapperInner.append($itemWrapper)
    $itemWrapper.onmousedown = function(event) {
      console.log('mouse down!')

      let shiftX = event.clientX - $wrapperInner.getBoundingClientRect().left

      function moveAt(pageX) {
        $wrapperInner.style.transform = `translateX(${pageX - shiftX + 'px'})`
      }
      
      function onMouseMove(e) {
        moveAt(e.pageX)
      }

      moveAt(event.pageX)

      $itemWrapper.addEventListener('mousemove', onMouseMove)
      $itemWrapper.onmouseout = function() {
        console.log('mouse out!')
        $itemWrapper.removeEventListener('mousemove', onMouseMove)
        $itemWrapper.onmouseout = null
        $itemWrapper.onmouseup = null
      }
      $itemWrapper.onmouseup = function() {
        console.log('mouse up!')
        $itemWrapper.removeEventListener('mousemove', onMouseMove)
        $itemWrapper.onmouseup = null
        $itemWrapper.onmouseout = null
      }
    }
    $wrapperInner.ondragstart = function() {
      return false
    }
  })
}())