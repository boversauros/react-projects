import { useState } from 'react'

const TURNS = {
  x: 'X',
  o: 'O'
}

const checkWinner = (board) => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i]
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }
  return null
}

function Square ({ value, onSquareClick }) {
  return (
    <div onClick={onSquareClick} className='square'>{value}</div>
  )
}

function App () {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.x)
  const [winner, setWinner] = useState(null)
  const [draw, setDraw] = useState(false)

  const handleClick = (index) => {
    // if there is a winner or the square is already filled, do nothing
    if (board[index] || winner) return

    // create a new board array and update the square with the current turn
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    setTurn(turn === TURNS.x ? TURNS.o : TURNS.x)

    // check for a winner
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      // check for a draw
    } else if (newBoard.every((square) => square !== null)) {
      setDraw(true)
    }
  }

  // reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)
    setDraw(false)
  }

  return (
    <>
      <header>
        <h1>Tic Tac Toe</h1>
      </header>
      <main>
        <section className='results'>
          {winner && <h2>{winner} wins!</h2>}
          {draw && <h2>Draw!</h2>}
          {winner || draw ? <button onClick={resetGame}>Play again</button> : <h2>Turn: {turn}</h2>}
        </section>
        <section className='board'>
          {board.map((square, index) => (<Square key={index} value={square} onSquareClick={() => handleClick(index)} />))}
        </section>
      </main>
    </>
  )
}

export default App
