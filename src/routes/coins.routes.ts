import express from 'express'
import { ping } from '../controllers/coins.controller'

const router = express.Router()

router.get('/ping', () => ping())

export default router
