var canvas = document.getElementById('snakeCanvas')
var ctx = canvas.getContext('2d')
var snake = {
  body: [[0, 0], [20, 0], [40, 0], [60, 0]],
  food: [[100, 100], [120, 120]],
  x: 0,
  y: 0,
  width: 20,
  dir: 'right',
  speed: 20,
  border: 5,
  incSpeedX: function () {
    this.x += this.speed
  },
  incSpeedY: function () {
    this.y += this.speed
  },
  moveX: function () {
    this.body = this.body.map(x => [x[0] + 20, x[1]])
  }
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
  // console.log(new Date())
  // window.requestAnimationFrame(draw)
  window.setInterval(draw, 300) // Main Loop!
}

function draw () {
  // window.requestAnimationFrame(draw)
  // ;({ x, y, width } = snake) // eslint-disable-line
  const leftest = snake.body[0]
  ctx.clearRect(leftest[0], leftest[1], snake.width, snake.width)
  snake.moveX()
  // snake.incSpeedX()
  // snake.x += snake.speed
  // snake.y += 0
  // ;(() => snake.x === 600 ? console.log(new Date()) : null)()
  snake.body.forEach(xy => {
    drawAllWithBorder(xy)
  })
  // snake.body = snake.body.slice(1).concat(xs[0])
  // ctx.fillRect(snake.x, snake.y, width, width)
}

function drawAllWithBorder (xy) {
  const br = snake.border
  const wd = snake.width
  ctx.fillStyle = 'black'
  ctx.fillRect(xy[0], xy[1], wd, wd)
  ctx.fillStyle = 'yellow'
  ctx.fillRect(xy[0] + (br / 2), xy[1] + (br / 2), wd - br, wd - br)
}
// test config
