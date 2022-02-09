import mongoose from 'mongoose'

const { Schema, model } = mongoose

const usersSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  coins: [{ type: String, required: true, ref: 'Coin' }]
})

export default model('User', usersSchema)
