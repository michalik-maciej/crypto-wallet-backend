var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Transaction from '../models/transaction.model';
import Coin from '../models/coin.model';
import User from '../models/user.model';
export const post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coin = yield Coin.findOneAndUpdate({
            originalId: req.body.coin.originalId
        }, Object.assign({}, req.body.coin), { upsert: true, new: true });
        yield new Transaction(Object.assign(Object.assign({}, req.body), { coinId: coin.originalId })).save();
        yield User.findOneAndUpdate({
            _id: req.body.userId,
            coins: { $nin: coin._id }
        }, { $push: { coins: coin._id } });
        res.json({ message: 'transaction successfully added' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
export const getByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield Transaction.find({
            userId: req.params.userId
        });
        const { coins } = yield User.findById(req.params.userId).populate('coins');
        if (transactions)
            res.json({ transactions, coins });
        res.status(404).json({ message: 'user not found' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
//# sourceMappingURL=transactions.controller.js.map