var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { messages } from '../settings/settings';
export class HandleCollection {
    constructor(model) {
        this.model = model;
    }
    getAll(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { req, res } = args;
            try {
                res.json(yield this.model.find().populate('client'));
            }
            catch (err) {
                res.status(500).json(messages.error(err));
            }
        });
    }
    getRandom(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { req, res } = args;
            try {
                const randomSample = yield this.model.aggregate([
                    { $sample: { size: 1 } }
                ]);
                res.json(randomSample);
            }
            catch (err) {
                res.status(500).json(messages.error(err));
            }
        });
    }
    getById(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { req, res } = args;
            try {
                const result = yield this.model.findById(req.params.id).populate('client');
                if (result) {
                    res.json(result);
                }
                else {
                    res.status(404).json(messages.notFound);
                }
            }
            catch (err) {
                res.status(500).json(messages.error(err));
            }
        });
    }
    post(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { req, res } = args;
            const cleanBody = req.body;
            try {
                const newRecord = new this.model(cleanBody);
                yield newRecord.save();
                res.json(messages.success);
            }
            catch (err) {
                res.status(500).json(messages.error(err));
            }
        });
    }
    put(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { req, res } = args;
            try {
                let record = yield this.model.findById(req.params.id);
                if (record) {
                    yield this.model.updateOne({ _id: req.params.id }, { $set: req.body });
                    res.json(messages.success);
                }
                else {
                    res.status(404).json(messages.notFound);
                }
            }
            catch (err) {
                res.status(500).json(messages.error(err));
            }
        });
    }
    delete(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { req, res } = args;
            try {
                const record = yield this.model.findById(req.params.id);
                if (record) {
                    yield record.remove();
                    res.json(messages.deleted(record));
                }
                else {
                    res.status(404).json(messages.notFound);
                }
            }
            catch (err) {
                res.status(500).json(messages.error(err));
            }
        });
    }
}
//# sourceMappingURL=main.controller.js.map