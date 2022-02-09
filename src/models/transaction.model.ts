import mongoose from 'mongoose'

const { Schema, model } = mongoose

const transactionsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  coinId: { type: String, required: true },
  pricePerCoin: { type: Number, required: true },
  coinQuantity: { type: Number, required: true },
  type: { type: String, required: true },
  timestamp: { type: Number, required: true }
})

export default model('Transaction', transactionsSchema)
