var canvas = document.getElementById('snakeCanvas') // you are here!!! make sure to declate vars in startSnakeGame and mae a form for levels and such
var ctx = canvas.getContext('2d')
const baseURL = `${window.location.protocol}//${window.location.host}`
const colorList = [
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
  'aqua',
  '#21abcd',
  '#fe6f5e',
  '#e3dac9',
  '#66ff00',
  '#08e8de',
  '#fb607f',
  '#d19fe8',
  '#ffc1cc',
  '#00cc99',
  '#ff0040',
  '#ff0800',
  '#fad6a5',
  '#9bddff',
  '#9932cc',
  '#ff8c00',
  '#ff003f',
  '#ffff00',
  '#00ffff',
  '#ff00ff'
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
    let change = []
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
        change = [spd, 0]
        // console.error('error with snake dir', new Error())
        break
    }
    // const nextHd = snake.hd()
    let nextHd = snake.tail[snake.length - 1]
    snake.tail.shift()
    snake.tail.push({
      x: nextHd.x + change[0],
      y: nextHd.y + change[1]
    })
    nextHd = snake.tail[snake.length - 1]
    if (nextHd.x > 560 || nextHd.x < 0 || nextHd.y > 560 || nextHd.y < 0) {
      snake.tail.pop()
      let nextChange = [nextHd.x, nextHd.y]
      // console.log(nextHd)
      if (nextHd.x > 580) {
        nextChange[0] = 0
      } else if (nextHd.x < 0) {
        nextChange[0] = 600
      } else if (nextHd.y > 580) {
        nextChange[1] = 0
      } else if (nextHd.y < 0) {
        nextChange[1] = 600
      }
      snake.tail.push({
        x: nextChange[0],
        y: nextChange[1]
      })
    }
    // console.log(change)
    // const nextHd = snake.tail[snake.length - 1]

    /* if (nextHd.x > 580) {
      snake.tail.pop()
      snake.tail.push({
        x: 0,
        y: nextHd.y
      })
    } */
  }
}
window.onload = snakeGame()

function snakeGame () {
  const settings = `
  <form action='' method='get'>
  <h1>snake speed:</h1>
  <div class='speedForm'>
    <label for='slow'>Nice and slow</label>
    <input type='radio' name='speed' class='speedForm' checked id='slow' value='6.5'>
  </div>
  <div class='speedForm'>
    <label for='mid'>Ok i guess?</label>
    <input type='radio' name='speed' class='speedForm' id='mid' value='10'>
  </div>
  <div class='speedForm'>
    <label for='fast'>Kinda fast</label>
    <input type='radio' name='speed' class='speedForm' id='fast' value='18'>
  </div>
  <div class="deathForm">
    <label for='deathF'>1 life?</label>
    <input type='checkbox' name='death' class='deathForm' id='deathF' checked>
  </div>
  <input type="submit" value="Submit">
  </form>`
  document.getElementById('main').style.display = 'none'
  document.getElementById('form').innerHTML = settings
  // reset
  // document.getElementById('score').innerText = 0
  // reset
  const splitted = location.search.split('&')
  const spd = splitted[0].split('=')[1]
  let dth = false
  if (splitted.length !== 1) {
    dth = true
  }
  if (spd) {
    document.getElementById('form').style.display = 'none'
    startSnakeGame({ speed: spd, death: dth })
  }
}
function startSnakeGame (args) {
  document.getElementById('main').style.display = 'grid'
  window.snakePerFrame = args.speed
  initCanvas()
  initArrowControls()
  // funkTitle() dont need cuz no title :/
  for (let i = 0; i <= 580; i += 20) { // [0, 20 .. 580]
    snake.grid.push(i)
  }
  genRandFood()
  changeSnakeColor()
  deathSequence = args.death ? deathSequence2 : deathSequence
}

function isPhone () {
  const flag = document.querySelector('#isPhone')
  const computedStyle = window.getComputedStyle(flag, null)
  const color = computedStyle.getPropertyValue('color')
  return Number(color.toString().slice(4, 7)) === 255
}

function initArrowControls () {
  let myEvent = 'mousedown' // isPhone() ? 'touchstart' : 'click'
  const ctrl = document.querySelectorAll('#arrowBlock')[0]
  let arrows = ctrl.children
  const falseMove = {
    'up': 'down',
    'down': 'up',
    'left': 'right',
    'right': 'left'
  }
  for (let i = 0; i < arrows.length; i++) {
    let elem = arrows[i]
    if (elem.tagName === 'H3') {
      elem
        .addEventListener(myEvent, function (x) {
          const direction = x.target.parentNode.id
          if (falseMove[direction] !== snake.dir) {
            snake.dir = direction
          }
        }, false)
    }
  }
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
      // console.log('na')
    }
  })
  return 0
}

function switchThisColor (me, xs = colorList) {
  me.style.color = randChoice(xs)
  return 0
}
function blinkRestart (me) {
  me.style.color = me.style.color === 'cornflowerblue' ? '#ec3b83' : 'cornflowerblue'
  return 0
}
/* function funkTitle () {
  document.querySelector('#h-one').addEventListener('click', function (x) {
    window.setInterval(function () { switchThisColor(x.srcElement) }, 1000 / 3)
    return 0
  })
  // switchThisColor(, undefined)
  return 0
} */
function cleanCanvas () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  // console.log(canvas.clientWidth)
  ctx.fillStyle = 'black'
  // ctx.rotate(Math.PI / 180 * 10)
  ctx.fillRect(500, 500, 100, 100)
  ctx.stroke()
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
  window.stopThis = window.setInterval(draw, 1000 / window.snakePerFrame) // Main Loop!
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
  // const death = document.querySelector('#death').innerText
  // document.querySelector('#death').innerText = Number(death) + 1
  snake.color = 'white'
  // alert('dead! refresh 4 now')
}
function deathSequence2 () {
  window.clearInterval(stopThis)
  console.log('you died!')
  const score = document.querySelector('#score')
  console.log(`high score was: ${score.innerText}`)
  console.log('top 10 is')
  window.setInterval(function () { switchThisColor(score.parentElement) }, 1000 / 2.5)
  // window.setInterval(function () { blinkRestart(score.parentElement.parentElement.parentElement.children[5].children[0]) }, 1000 / 1)
  // death seq canvas
  cleanCanvas()
  scoreBorad(`${baseURL}/api/top10`)
}

function drawBoard (currentScore, xs) {
  cleanCanvas()
  ctx.fillStyle = '#ddd'
  ctx.font = '30px VT323'
  ctx.fillText(`Your score: ${currentScore}`, (canvas.width / 2) - 90, 26, 150)
  ctx.fillText(`- Highscore Board -`, (canvas.width / 2) - 120, 50, 300)
  let yOfBoard = 125
  const xName = 2
  const xScore = canvas.width / 2 - 60
  const xDate = (canvas.width) - 190
  // init board
  ctx.fillText(`Name:`, xName, 100)
  ctx.fillText(`Score:`, xScore, 100)
  ctx.fillText(`Date(D.M.Y):`, xDate, 100)
  // end init board
  xs.forEach(player => {
    ctx.fillStyle = randChoice(colorList)
    ctx.fillText(player.name, xName, yOfBoard)
    ctx.fillText(player.score, xScore, yOfBoard)
    ctx.fillText(craftDate(player.ondate), xDate, yOfBoard)
    yOfBoard += 32
  })
}
async function scoreBorad (url, curName = '') {
  ctx.fillStyle = '#ddd'
  ctx.font = '30px VT323'
  const currentScore = document.querySelector('#score').innerText
  const data = await window.fetch(url)
  const json = await data.json()
  drawBoard(currentScore, json)
  const isWinner = json.some(x => x.score < currentScore)
  if (!curName && isWinner) {
    (async function () {
      curName = curName || window.prompt('Name:') || 'anonymous'
      const data = await window.fetch(`${baseURL}/api/newScore`, {
        method: 'POST',
        body: JSON.stringify({
          name: curName,
          score: currentScore
        }),
        headers: { 'Content-Type': 'application/json' }
      })
      scoreBorad(url, curName)
    })()
  }
  console.log(json)
}

function craftDate (date) {
  return date.slice(0, 10).split('-').reverse().join('.')
}

function reStart () {
  document.location = document.location
  return 0
}
function mainMenu () {
  document.location = document.location.origin
  return 0
}
