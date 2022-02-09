import mongoose from 'mongoose'

const { Schema, model } = mongoose

const coinsSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  originalId: { type: String, required: true },
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  logo: { type: String }
})

export default model('Coin', coinsSchema)
