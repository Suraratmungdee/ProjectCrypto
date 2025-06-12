import { Router } from 'express';
import { CreateTrade } from '../controllers/trade.controller';
import { auth } from '../middlewares/auth';

const router = Router();

router.post('/createTrade', auth, CreateTrade);

export default router;