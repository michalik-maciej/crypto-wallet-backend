import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import coinsRoutes from './routes/coins.routes'

const app = express()

app.use(cors())

app.use('/api', coinsRoutes)

/* Database config */
mongoose.connect(`${process.env.MONGO_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection

db.once('open', () => {
  console.log({ message: 'successfully connected to the database' })
})
db.on('error', (err) => console.log({ message: err }))

/* Not found 404 */
app.use((_req, res) => {
  res.status(404).send('404... resource not found')
})

app.listen(process.env.PORT || 8010, () => {
  console.log('listening on port 8010')
})
