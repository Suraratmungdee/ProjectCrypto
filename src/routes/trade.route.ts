import { Router } from 'express';
import { ListTrade } from '../controllers/trade.controller';
import { auth } from '../middlewares/auth';

const router = Router();


router.get('/listTrade', auth, ListTrade);

export default router;