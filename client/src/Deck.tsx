import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createCard, deleteCard, getDeck, TDeck } from './api/decks'
import './Deck.css'

const Deck = () => {
  const [deck, setDeck] = useState<TDeck | undefined>()
  const [cards, setCards] = useState<string[]>([])
  const [text, setText] = useState('')

  const { deckId } = useParams()

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault()
    const { cards: serverCards } = await createCard(deckId!, text)
    // setDecks([...decks, deck])
    setCards(serverCards)
    setText('')
  }

  const handleDeleteCard = async (index: number) => {
    if (!deckId) return
    const newDeck = await deleteCard(deckId, index)
    setCards(newDeck.cards)
  }

  useEffect(() => {
    async function fetchDecks() {
      if (!deckId) return
      const newDeck = await getDeck(deckId)
      setDeck(newDeck)
      setCards(newDeck.cards)
    }
    fetchDecks()
  }, [deckId])

  return (
    <div className="Deck">
      <h1>{deck?.title}</h1>
      <ul className="cards">
        {cards.map((card, index) => (
          <li key={card}>
            <button onClick={() => handleDeleteCard(index)}>X</button>
            {card}
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Crad text</label>
        <input
          id="card-text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value)
          }}
        />
        <button>Create card</button>
      </form>
    </div>
  )
}

export default Deck
