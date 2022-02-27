import express from 'express'
import User from '../models/user.model'

export const ping = (_req: express.Request, res: express.Response) => {
  res.json({ message: 'ping' })
}

export const add = async (req: express.Request, res: express.Response) => {
  try {
    const newUser = await new User({ ...req.body, coins: [] })
    await newUser.save()
    res.json('User account created. Please login.')
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

export const getUser = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body
    const isUser = await User.find({ email })
    if (!isUser || !isUser.length) res.status(404).json('User not found')
    else {
      const auth = await User.findOne({ email }, { _id: 1, password: 1 })
      if (auth?.password !== password) {
        res.status(401).json('Incorrect password')
      } else
        res.json({
          message: 'Logged in successfully',
          userId: auth._id
        })
    }
  } catch (err) {
    res.status(500).json({ message: err })
  }
}
