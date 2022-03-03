import Transaction from '../models/transaction.model'
import Coin from '../models/coin.model'
import User from '../models/user.model'
import mongoose from 'mongoose'
import express from 'express'

export const post = async (req: express.Request, res: express.Response) => {
  try {
    const coin = await Coin.findOneAndUpdate(
      {
        originalId: req.body.coin.originalId
      },
      { ...req.body.coin },
      { upsert: true, new: true }
    )

    await new Transaction({
      ...req.body,
      coinId: coin.originalId
    }).save()

    await User.findOneAndUpdate(
      {
        _id: req.body.userId,
        coins: { $nin: coin._id }
      },
      { $push: { coins: coin._id } }
    )

    return res.json({ message: 'Transaction successfully added' })
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

export const getByUserId = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const transactions = await Transaction.find({
      userId: req.params.userId
    })
    const { coins } = await User.findById(req.params.userId).populate('coins')

    if (transactions) return res.json({ transactions, coins })
    return res.status(404).json('user not found')
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}
