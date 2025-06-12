import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import userRoutes from './routes/user.route';
import login from './routes/login.route';
import walletsRoutes from './routes/wallets.route';
import TransactionsRoutes from './routes/transactions.route';
import OrderRoutes from './routes/order.route';
import TradeRoutes from './routes/trade.route';

dotenv.config();
const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/login', login);
app.use('/api', userRoutes);
app.use('/api', walletsRoutes);
app.use('/api', TransactionsRoutes);
app.use('/api', OrderRoutes);
app.use('/api', TradeRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
