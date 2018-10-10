console.log('hey')
window.onload = function () { initCanvas(); initArrowControls() }

function isPhone () {
  const flag = document.querySelector('#isPhone')
  const computedStyle = window.getComputedStyle(flag, null)
  const color = computedStyle.getPropertyValue('color')
  return Number(color.toString().slice(4, 7)) === 255
}

function initArrowControls () {
  let myEvent = isPhone() ? 'touchstart' : 'click'
  const ctrl = document.querySelector('#controls')
  let arrows = ctrl.children
  for (let i = 0; i < arrows.length; i++) {
    arrows[i].addEventListener(myEvent, (x) => console.log(x.type))
  }
  return 0
}

function initCanvas () {
  var canvas = document.getElementById('snakeCanvas')
  var ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
  console.log(canvas.clientWidth)
  ctx.fillStyle = 'black'
  // ctx.rotate(Math.PI / 180 * 10)
  ctx.fillRect(500, 500, 100, 100)
  ctx.stroke()
  window.requestAnimationFrame(draw)
}

function draw () {
  var canvas = document.getElementById('snakeCanvas')
  var ctx = canvas.getContext('2d')
  const time = (new Date()).getSeconds()
  ctx.fillStyle = time % 2 === 0 ? 'blue' : 'red'
  ctx.fillRect(100, 100, 200, 200)
  const myMove = time % 2 === 0 ? [0, 0] : [1, 0]
  ctx.translate(...myMove)

  window.requestAnimationFrame(draw)
}
