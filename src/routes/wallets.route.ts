import { Router } from 'express';
import { CreateWallets } from '../controllers/wallets.controllers';
import { auth } from '../middlewares/auth';

const router = Router();

router.post('/createWallets', auth, CreateWallets);

export default router;
