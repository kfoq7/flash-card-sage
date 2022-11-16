import { API_URL } from './config'

export type TDeck = {
  title: string
  _id: string
}

export const getDecks = async (): Promise<TDeck[]> => {
  const response = await fetch(`${API_URL}/decks`)
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

export const deleteDeck = async (deckId: string) => {
  await fetch(`${API_URL}/decks/${deckId}`, {
    method: 'DELETE'
  })
}
