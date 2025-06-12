import { Router } from 'express';
import { CreateTransactions } from '../controllers/transactions.controllers';
import { auth } from '../middlewares/auth';

const router = Router();

router.post('/createTransactions', auth, CreateTransactions);

export default router;
