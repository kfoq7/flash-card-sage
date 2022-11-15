import React, { useEffect, useState } from 'react'
import './App.css'

type TDeck = {
  title: string
  _id: string
}

const App = () => {
  const [decks, setDecks] = useState<TDeck[]>([])
  const [title, setTitle] = useState('')

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('http://localhost:5000/decks', {
      method: 'POST',
      body: JSON.stringify({
        title
      }),
      headers: {
        'Content-type': 'application/json'
      }
    })
    setTitle('')
  }

  useEffect(() => {
    async function fetchDecks() {
      const response = await fetch('http://localhost:5000/decks')
      const newDecks = await response.json()
      setDecks(newDecks)
    }
    fetchDecks()
  }, [])

  return (
    <div className="App">
      <ul className="decks">
        {decks.map(deck => (
          <li key={deck._id}>{deck.title}</li>
        ))}
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Deck Title</label>
        <input
          id="deck-title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value)
          }}
        />
        <button>Create Deck</button>
      </form>
    </div>
  )
}

export default App
