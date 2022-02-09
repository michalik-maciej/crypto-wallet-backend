import express from 'express'
import { ping, add, getUser } from '../controllers/users.controller'

const router = express.Router()

router.get('/ping', (req, res) => ping(req, res))
router.post('/user/add', (req, res) => add(req, res))
router.post('/user/login', (req, res) => getUser(req, res))

export default router
