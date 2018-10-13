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
  grid: [],
  width: 20,
  dir: 'right',
  speed: 20,
  border: 2,
  length: 5,
  tail: [
    { x: 0, y: 200 },
    { x: 20, y: 200 },
    { x: 40, y: 200 },
    { x: 60, y: 200 },
    { x: 80, y: 200 }
  ],
  color: 'green',
  food: { x: 580, y: 580 },
  hd: function () {
    return this.tail[this.length - 1]
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
    const hd = snake.tail[snake.length - 1]
    snake.tail.shift()
    snake.tail.push({
      x: hd.x + change[0],
      y: hd.y + change[1]
    })
  }
}
window.onload = function () {
  initCanvas()
  initArrowControls()
  funkTitle()
  for (let i = 0; i <= 580; i += 20) {
    snake.grid.push(i)
  }
  genRandFood()
  changeSnakeColor()
}

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
  const falseMove = {
    'up': 'down',
    'down': 'up',
    'left': 'right',
    'right': 'left'
  }
  for (let i = 0; i < arrows.length; i++) {
    arrows[i].addEventListener(myEvent, function (x) {
      if (falseMove[x.target.id] !== snake.dir) {
        snake.dir = x.target.id
      }
    })
  } // need to add falseMove to this function too, cause you can make a u turn with out the u
  document.addEventListener('keydown', function (x) {
    const dirKeys = {
      'w': 'up',
      'a': 'left',
      's': 'down',
      'd': 'right'
    }
    if (dirKeys[x.key] !== undefined && falseMove[dirKeys[x.key]] !== snake.dir) {
      snake.dir = dirKeys[x.key]
    } else {
      console.log('na')
    }
  })
  return 0
}

function switchThisColor (me, xs = colorList) {
  me.style.color = randChoice(xs)
  return 0
}
function funkTitle () {
  document.querySelector('#h-one').addEventListener('click', function (x) {
    window.setInterval(function () { switchThisColor(x.srcElement) }, 1000 / 3)
    return 0
  })
  // switchThisColor(, undefined)
  return 0
}

function initCanvas () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  // console.log(canvas.clientWidth)
  ctx.fillStyle = 'black'
  // ctx.rotate(Math.PI / 180 * 10)
  ctx.fillRect(500, 500, 100, 100)
  ctx.stroke()
  // console.log(new Date())
  // window.requestAnimationFrame(draw)
  window.setInterval(draw, 1000 / 10) // Main Loop!
}

function randRange (l, h) {
  return Math.floor(Math.random() * (h - l))
}
function randChoice (xs) {
  return xs[randRange(0, xs.length)]
}

function draw () {
  ctx.fillStyle = 'black'
  ctx.clearRect(0, 0, canvas.width, canvas.height) // clear prev paint
  for (let i = 0; i < snake.length; i++) { // paint all the new (and old) snake points
    const xy = snake.tail[i]
    drawAllWithBorder([xy.x, xy.y])
  }
  snake.move() // move to the next block
  ctx.beginPath()
  ctx.fillStyle = 'red'
  ctx.arc(snake.food.x + 10, snake.food.y + 10, snake.width / 2, 0, Math.PI * 2)
  ctx.fill()
  ctx.closePath() // draw the food
  if (snake.food.x === snake.hd().x && snake.food.y === snake.hd().y) {
    snake.tail.unshift(snake.tail[0])
    snake.length += 1
    genRandFood()
    changeSnakeColor()
    document.querySelector('#score').innerText = snake.length - 5
  } // check if food is eaten, inc snake if does and draw new food
  snake.tail.slice(0, snake.length - 1).forEach(block => {
    if (eqJson(block, snake.hd())) {
      deathSequence()
    }
  })
}

function drawAllWithBorder (xy) {
  const br = snake.border
  const wd = snake.width
  ctx.fillStyle = 'black'
  ctx.fillRect(xy[0], xy[1], wd, wd)
  ctx.fillStyle = snake.color
  ctx.fillRect(xy[0] + (br / 2), xy[1] + (br / 2), wd - br, wd - br)
}

function genRandFood () {
  snake.food = {
    x: randChoice(snake.grid),
    y: randChoice(snake.grid)
  }
}
function changeSnakeColor () {
  snake.color = randChoice(colorList)
  return 0
}
function eqJson (a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}
function deathSequence () {
  alert('dead! refresh 4 now')
}
