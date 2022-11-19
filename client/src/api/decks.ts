import { API_URL } from './config'

export type TDeck = {
  title: string
  cards: string[]
  _id: string
}

export const getDecks = async (): Promise<TDeck[]> => {
  const response = await fetch(`${API_URL}/decks`)
  return response.json()
}

export const getDeck = async (deckId: string): Promise<TDeck> => {
  const response = await fetch(`${API_URL}/decks/${deckId}`)
  return response.json()
}

export const createDecks = async (title: string) => {
  const response = await fetch(`${API_URL}/decks`, {
    method: 'POST',
    body: JSON.stringify({
      title
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return response.json()
}

export const createCard = async (
  deckId: string,
  text: string
): Promise<TDeck> => {
  const response = await fetch(`${API_URL}/decks/${deckId}/cards`, {
    method: 'POST',
    body: JSON.stringify({
      text
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return response.json()
}

export const deleteDeck = async (deckId: string) => {
  await fetch(`${API_URL}/decks/${deckId}`, {
    method: 'DELETE'
  })
}

export const deleteCard = async (
  deckId: string,
  index: number
): Promise<TDeck> => {
  const response = await fetch(`${API_URL}/decks/${deckId}/cards/${index}`, {
    method: 'DELETE'
  })

  return response.json()
}
