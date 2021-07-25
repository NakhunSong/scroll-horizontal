let scrollLeft
let startX
const $target = document.querySelector('.target')
const $wrapperInner = document.querySelector('.wrapper_inner')
const { left: targetLeft = 0, right: targetRight = 0 } = $target.getClientRects()[0]
const ITEMS = Array.from({ length: 20 }).map((e, index) => index + 1)
ITEMS.forEach((e, index) => {
  const $item = document.createElement('div')
  const $itemWrapper = document.createElement('div')
  $item.innerText = `item ${e}`
  $item.setAttribute('class', 'item')
  $itemWrapper.setAttribute('class', 'item_wrapper')
  if (index === 0) {
    $itemWrapper.classList.add('active')
  }
  $itemWrapper.append($item)
  $wrapperInner.append($itemWrapper)
})

function scrollToHorizontal(walk) {
  if (!$wrapperInner) return
  $wrapperInner.scrollTo({
    behavior: 'smooth',
    left: walk,
  })
}

function moveCenter(focusedItem) {
  if (!focusedItem) return
  const itemWrapperSelector = '.item_wrapper'
  const $itemWrapperFirst = document.querySelector(itemWrapperSelector)
  const $itemWrapperActive = document.querySelector(`${itemWrapperSelector}.active`)
  const firstItemLeft = $itemWrapperFirst.getClientRects()[0].left
  const walk = Math.round(focusedItem.getClientRects()[0].left - firstItemLeft)
  scrollToHorizontal(walk)
  $itemWrapperActive.classList.remove('active')
  focusedItem.classList.add('active')
}

function getClosest() {
  const $itemWrappers = document.querySelectorAll('.item_wrapper')
  let leftItem
  let rightItem
  let leftCollapse = 0
  let rightCollapse = 0
  $itemWrappers.forEach((item) =>  {
    const { left, right } = item.getClientRects()[0]
    if (left < targetLeft && targetLeft < right) {
      leftItem = item
      leftCollapse = Math.abs(right - targetLeft)
    } else if (left < targetRight && targetRight < right) {
      rightItem = item
      rightCollapse = Math.abs(left - targetRight)
    }
  })
  if (leftCollapse > rightCollapse) {
    return leftItem
  } else {
    return rightItem
  }
}

function handleMouseMove(event) {
  event.preventDefault()
  const x = event.pageX - $wrapperInner.offsetLeft
  const walk = (x - startX) * 2
  const result = scrollLeft - walk
  $wrapperInner.scrollLeft = result
}

$wrapperInner.onmousedown = function(event) {
  $wrapperInner.classList.add('grab')
  startX = event.pageX - $wrapperInner.offsetLeft
  scrollLeft = $wrapperInner.scrollLeft
  
  $wrapperInner.onmousemove = handleMouseMove
  $wrapperInner.onmouseleave = function() {
    $wrapperInner.classList.remove('grab')
    $wrapperInner.onmousemove = null
    $wrapperInner.onmouseup = null
    $wrapperInner.onmouseleave = null
  }
  $wrapperInner.onmouseup = function() {
    $wrapperInner.classList.remove('grab')
    $wrapperInner.onmousemove = null
    $wrapperInner.onmouseup = null
    $wrapperInner.onmouseleave = null
    const focusedItem = getClosest()
    moveCenter(focusedItem)
  }
}

$wrapperInner.onscroll = debounce(function() {
  console.log('scroll')
  const focusedItem = getClosest()
  moveCenter(focusedItem)
}, 200)