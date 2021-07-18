const $wrapperInner = document.querySelector('.wrapper_inner')
let scrollLeft;
let startX;
const ITEMS = Array.from({ length: 20 }).map((e, index) => index + 1)
ITEMS.forEach((e) => {
  const $item = document.createElement('div')
  const $itemWrapper = document.createElement('div')
  $item.innerText = `item ${e}`
  $item.setAttribute('class', 'item')
  $itemWrapper.setAttribute('class', 'item_wrapper')
  $itemWrapper.append($item)
  $wrapperInner.append($itemWrapper)
})

function handleMouseMove(event) {
  console.log('mouse move!')
  event.preventDefault()
  const x = event.pageX - $wrapperInner.offsetLeft
  const walk = (x - startX) * 2
  const result = scrollLeft - walk
  $wrapperInner.scrollLeft = result
}

$wrapperInner.onmousedown = function(event) {
  console.log('mouse down!')
  $wrapperInner.classList.add('grab')
  startX = event.pageX - $wrapperInner.offsetLeft
  scrollLeft = $wrapperInner.scrollLeft
  
  $wrapperInner.onmousemove = handleMouseMove
  $wrapperInner.onmouseleave = function() {
    console.log('mouse leave!')
    $wrapperInner.classList.remove('grab')
    $wrapperInner.onmousemove = null
    $wrapperInner.onmouseup = null
    $wrapperInner.onmouseleave = null
  }
  $wrapperInner.onmouseup = function() {
    console.log('mouse up!')
    $wrapperInner.classList.remove('grab')
    $wrapperInner.onmousemove = null
    $wrapperInner.onmouseup = null
    $wrapperInner.onmouseleave = null
  }
}
