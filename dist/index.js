import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import usersRoutes from './routes/users.routes';
import transactionsRoutes from './routes/transactions.routes';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', usersRoutes);
app.use('/api', transactionsRoutes);
app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../crypto-wallet/build', 'index.html'));
});
app.use(express.static(path.join(__dirname, '../../crypto-wallet/build')));
mongoose.connect(`${process.env.MONGO_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.once('open', () => {
    console.log({ message: 'successfully connected to the database' });
});
db.on('error', (err) => console.log({ message: err }));
app.use((_req, res) => {
    res.status(404).send('404... resource not found');
});
app.listen(process.env.PORT || 8011, () => {
    console.log('listening on port 8011');
});
//# sourceMappingURL=index.js.map