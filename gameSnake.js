var canvas = document.getElementById('snakeCanvas')
var ctx = canvas.getContext('2d')
const colorList = [
  'whitesmoke',
  'green',
  'blue',
  'burlywood',
  'violet',
  'pink',
  'crimson',
  'cadetblue',
  'rosybrown',
  'royalblue',
  'red',
  'rebeccapurple',
  'yellowgreen',
  'yellow',
  'palevioletred',
  'palegreen',
  'salmon',
  'aqua'
]
var snake = {
  body: [[0, 0], [20, 0], [40, 0], [60, 0]],
  food: [[100, 100], [120, 120]],
  x: 0,
  y: 0,
  width: 20,
  dir: 'right',
  speed: 20,
  border: 2,
  incSpeedX: function () {
    this.x += this.speed
  },
  incSpeedY: function () {
    this.y += this.speed
  },
  move: function () {
    let change
    const spd = this.speed
    switch (this.dir) {
      case 'right':
        change = [spd, 0]
        break
      case 'left':
        change = [-spd, 0]
        break
      case 'up':
        change = [0, -spd]
        break
      case 'down':
        change = [0, spd]
        break
      default:
        console.error('error with snake dir', new Error())
        break
    }
    this.body = this.body.map(x => [x[0] + change[0], x[1] + change[1]])
  }
}
window.onload = function () { initCanvas(); initArrowControls(); funkTitle() }

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
    arrows[i].addEventListener(myEvent, function (x) { snake.dir = (x.target.id); console.log(snake) })
  }
  return 0
}

function switchThisColor (me, xs = colorList) {
  me.style.color = randChoice(xs)
  return 0
}
function funkTitle () {
  document.querySelector('#h-one').addEventListener('click', function (x) {
    window.setInterval(function () { switchThisColor(x.srcElement) }, 1000)
    return 0
  })
  // switchThisColor(, undefined)
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

function randRange (l, h) {
  return Math.floor(Math.random() * (h - l))
}
function randChoice (xs) {
  return xs[randRange(0, xs.length)]
}

function draw () {
  // window.requestAnimationFrame(draw)
  // ;({ x, y, width } = snake) // eslint-disable-line
  const leftest = snake.body[0]
  ctx.clearRect(leftest[0], leftest[1], snake.width, snake.width)
  snake.move()
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
