var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from '../models/user.model';
export const ping = (_req, res) => {
    res.json({ message: 'ping' });
};
export const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield new User(Object.assign(Object.assign({}, req.body), { coins: [] }));
        yield newUser.save();
        res.json({ message: 'User account created. Please login.' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
export const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const isUser = yield User.find({ email });
        if (!isUser || !isUser.length)
            res.status(404).json({ message: 'User not found.' });
        else {
            const auth = yield User.findOne({ email, password }, { _id: 1 });
            if (!auth._id) {
                res.status(401).json({ message: 'Incorrect password. Try again.' });
            }
            else
                res.json({
                    message: 'User logged in successfully.',
                    userId: auth._id
                });
        }
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
//# sourceMappingURL=users.controller.js.map