import express from 'express';
import { getByUserId, post } from '../controllers/transactions.controller';
const router = express.Router();
router.post('/transactions/add', (req, res) => post(req, res));
router.get('/transactions/:userId', (req, res) => getByUserId(req, res));
export default router;
//# sourceMappingURL=transactions.routes.js.map