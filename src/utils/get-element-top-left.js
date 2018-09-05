export function getElementTopLeft (element, parent) {
  let top = 0
  let left = 0
  while (element && (!parent || element !== parent)) {
    top += element.offsetTop
    left += element.offsetLeft
    element = element.offsetParent
  }
  return { top: top, left: left }
}

export function getElementTop (element, parent) {
  let top = 0
  while (element && (!parent || element !== parent)) {
    top += element.offsetTop
    element = element.offsetParent
  }
  return top
}

export function getElementLeft (element, parent) {
  let left = 0
  while (element && (!parent || element !== parent)) {
    left += element.offsetLeft
    element = element.offsetParent
  }
  return left
}
