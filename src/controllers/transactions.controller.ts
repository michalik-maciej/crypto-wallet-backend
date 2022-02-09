import Transaction from '../models/transaction.model'
import Coin from '../models/coin.model'
import User from '../models/user.model'
import mongoose from 'mongoose'

export const post = async (req: any, res: any) => {
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

    res.json({ message: 'transaction successfully added' })
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

export const getByUserId = async (req: any, res: any) => {
  try {
    const transactions = await Transaction.find({
      userId: req.params.userId
    })
    const { coins } = await User.findById(req.params.userId).populate('coins')

    if (transactions) res.json({ transactions, coins })
    res.status(404).json({ message: 'user not found' })
  } catch (err) {
    res.status(500).json({ message: err })
  }
}
