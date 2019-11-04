export default function elementPressKey (el, code) {
  var evt = document.createEvent('UIEvents')
  evt.keyCode = code
  evt.initEvent('keydown', true, true)
  el.dispatchEvent(evt)
}
