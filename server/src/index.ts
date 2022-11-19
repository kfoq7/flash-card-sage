import { config } from 'dotenv'
config({ path: `${__dirname}/.env` })

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import {
  createDeck,
  createDeckForDeck,
  deleteCardOnDeck,
  deleteDeck,
  getDeck,
  getDecks
} from './controllers/decks.controller'

const PORT = process.env.PORT ?? 5000

const app = express()

app.use(
  cors({
    origin: '*'
  })
)
app.use(express.json())

app.get('/decks', getDecks)

app.get('/decks/:deckId', getDeck)

app.post('/decks', createDeck)

app.post('/decks/:deckId/cards', createDeckForDeck)

app.delete('/decks/:deckId', deleteDeck)

app.delete('/decks/:deckId/cards/:index', deleteCardOnDeck)

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`listening on port ${PORT}`)
  app.listen(PORT)
})
