import {useState, useEffect} from "react"

function App() {
  const [cards, setCards] = useState([])
  const [sum, setSum] = useState(0)
  const [isAlive, setIsAlive] = useState(false)
  const [hasBlackjack, setHasBlackjack] = useState(false) 

  //tailwinds styles
  const mainStl = `bg-gradient-to-b from-indigo-700 via-indigo-600 to-violet-600
                    px-10 py-20 rounded-lg shadow-lg shadow-indigo-400/30 mx-auto mt-20 w-10/12
                    flex flex-col items-center text-stone-900`
  const titleStl = `text-3xl font-bold`
  const msgSecStl = `border border-indigo-400 rounded-lg py-2 px-4 my-3
                     bg-gradient-to-b from-indigo-700 to-violet-600`
  const msgStl = ``
  const cardsStl = ``
  const sumStl = ``
  const btnStl = `font-bold rounded-lg shadow-lg py-2 px-4 w-full
                   bg-gradient-to-b from-indigo-700 to-violet-600 
                   border-2 border-violet-400
                   hover:transform hover:scale-105 active:scale-95 `
  const btnSecStl = `flex gap-2`

  //

  useEffect(() => {
    if(!isAlive) return
    sum > 21 ? setIsAlive(false) :
    sum === 21 ? (setIsAlive(false), setHasBlackjack(true)) : null
  }, [sum, isAlive]) 
 

  function getRandomCard(){
    const n = Math.floor(Math.random() * 13) +1
    return n === 1 ? 11 : n > 10 ? 10 : n
  }

  function renderCards(){
    const card = getRandomCard()
    setCards(c => [...c, card])
    setSum(s => s + card)
  }

  function noCard(){
    setIsAlive(false)
  }

  function startGame(){
    setIsAlive(true)
    const card1 = getRandomCard()
    const card2 = getRandomCard()
    setCards([card1, card2])
    setSum(card1 + card2)
  }

  return (
    <div className={mainStl}>
       <h1 className={titleStl}>BlackJack</h1>
       <div className={msgSecStl}>
          <h3 className={msgStl}>
            {
              isAlive ? "Draw another card ?" :
              hasBlackjack ? "blackjack!!!" :
              sum === 0 ? "Start game ?" :
              sum > 21 ? "You lost!!!" : 
              sum < 21 ? `Total : ${sum}` :
              "hello there"
            }
          </h3>
       </div>
       <p className={cardsStl}>{cards}</p>
       <p className={sumStl}>{sum}</p>
       <div>
        {isAlive ? 
          <div className={btnSecStl}>
            <button className={btnStl} onClick={renderCards}>New Card</button>
            <button className={btnStl} onClick={noCard}>Stop</button>
          </div>
              :
          <button className={btnStl} onClick={startGame}>Start Game</button>
        }
       </div>
    </div>
  )
}

export default App
