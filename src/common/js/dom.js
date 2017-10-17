/**
 * Created by fangzhen on 2017/10/17.
 */
export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  let classList = el.className.split(' ')
  classList.push(className)
  el.className = classList.join(' ')
}
