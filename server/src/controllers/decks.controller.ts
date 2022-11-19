import { Request, Response } from 'express'
import Deck from '../models/Deck'

export const getDecks = async (_req: Request, res: Response) => {
  const decks = await Deck.find()
  res.json(decks)
}

export const getDeck = async (req: Request, res: Response) => {
  const { deckId } = req.params
  const deck = await Deck.findById(deckId)
  res.json(deck)
}

export const createDeck = async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title
  })
  const createdDeck = await newDeck.save()
  res.json(createdDeck)
}

export const createDeckForDeck = async (req: Request, res: Response) => {
  const deckId = req.params.deckId
  const deck = await Deck.findById(deckId)
  if (!deck) return res.status(400).send('No deck of this id exists')
  const { text } = req.body
  deck.cards.push(text)
  await deck.save()
  res.json(deck)
}

export const deleteDeck = async (req: Request, res: Response) => {
  const deckId = req.params.deckId
  const deck = await Deck.findByIdAndDelete(deckId)
  res.json(deck)
}

export const deleteCardOnDeck = async (req: Request, res: Response) => {
  const deckId = req.params.deckId
  const index = req.params.index
  const deck = await Deck.findById(deckId)
  if (!deck) return res.status(400).send('No deck of this id exists')
  deck.cards.splice(parseInt(index), 1)
  await deck.save()
  res.json(deck)
}
