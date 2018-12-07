function scoreBorad (url) {
  ctx.fillStyle = '#ddd'
  ctx.font = '30px VT323'
  const currentScore = document.querySelector('#score').innerText

  window.fetch(url)
    .then(a => a.json())
    .then(xs => {
      drawBoard(currentScore, xs)
      const isWinner = xs.some(x => x.score < currentScore)
      console.log(isWinner)
      if (isWinner) {
        window.fetch(`${baseURL}/api/newScore`, {
          method: 'POST',
          body: JSON.stringify({
            name: window.prompt('Name:'),
            score: currentScore
          }),
          headers: { 'Content-Type': 'application/json' }
        }, _ => window.fetch(url)
          .then(xs => xs.json())
          .then(xs => { drawBoard(currentScore, xs); console.log(xs) })

        )
      }
    })
  return undefined
}

async function scoreBorad (url) {
  ctx.fillStyle = '#ddd'
  ctx.font = '30px VT323'
  const currentScore = document.querySelector('#score').innerText
  await data = window.fetch(url)
  await json = data.json()
  console.log(json)
  /*   .then(a => a.json())
    .then(xs => {
      drawBoard(currentScore, xs)
      const isWinner = xs.some(x => x.score < currentScore)
      console.log(isWinner)
      if (isWinner) {
        window.fetch(`${baseURL}/api/newScore`, {
          method: 'POST',
          body: JSON.stringify({
            name: window.prompt('Name:'),
            score: currentScore
          }),
          headers: { 'Content-Type': 'application/json' }
        }, _ => window.fetch(url)
          .then(xs => xs.json())
          .then(xs => { drawBoard(currentScore, xs); console.log(xs) })

        )
      }
    })
   */return undefined
}