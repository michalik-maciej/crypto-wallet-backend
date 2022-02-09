import User from '../models/user.model'

export const ping = (_req: any, res: any) => {
  res.json({ message: 'ping' })
}

export const add = async (req: any, res: any) => {
  try {
    const newUser = await new User({ ...req.body, coins: [] })
    await newUser.save()
    res.json({ message: 'User account created. Please login.' })
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

export const getUser = async (req: any, res: any) => {
  try {
    const { email, password } = req.body
    const isUser = await User.find({ email })
    if (!isUser || !isUser.length)
      res.status(404).json({ message: 'User not found.' })
    else {
      const auth = await User.findOne({ email, password }, { _id: 1 })
      if (!auth._id) {
        res.status(401).json({ message: 'Incorrect password. Try again.' })
      } else
        res.json({
          message: 'User logged in successfully.',
          userId: auth._id
        })
    }
  } catch (err) {
    res.status(500).json({ message: err })
  }
}
