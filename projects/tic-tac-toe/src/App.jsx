import { useEffect, useState } from 'react'

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

  useEffect(() => {
    setWinner(checkWinner(board))
  }, [board])

  const handleClick = (index) => {
    if (winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    setTurn(turn === TURNS.x ? TURNS.o : TURNS.x)
  }

  return (
    <>
      <h1>Tic Tac Toe</h1>
      {winner && <h2>{winner} wins!</h2>}
      <div className='board'>
        {board.map((square, index) => (<Square key={index} value={square} onSquareClick={() => handleClick(index)} />))}
      </div>
    </>
  )
}

export default App
