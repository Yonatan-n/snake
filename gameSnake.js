var canvas = document.getElementById('snakeCanvas')
var ctx = canvas.getContext('2d')
var snake = {
  x: 0,
  y: 0,
  dir: 'right',
  speed: 1
}
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
    arrows[i].addEventListener(myEvent, (x) => console.log(x.target.id))
  }
  return 0
}

function initCanvas () {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
  // console.log(canvas.clientWidth)
  ctx.fillStyle = 'black'
  // ctx.rotate(Math.PI / 180 * 10)
  ctx.fillRect(500, 500, 100, 100)
  ctx.stroke()
  window.requestAnimationFrame(draw)
}

function draw () {
  ctx.fillStyle = 'blue'
  ctx.fillRect(snake.x, snake.y, 100, 100)
  snake.x += snake.speed
  snake.y += 0
  console.log(snake)
  window.requestAnimationFrame(draw)
}
