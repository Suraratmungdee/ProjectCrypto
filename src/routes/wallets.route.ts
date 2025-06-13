import { Router } from 'express';
import { CreateWallets, ListWallets } from '../controllers/wallets.controllers';
import { auth } from '../middlewares/auth';

const router = Router();

router.get('/listWallets', auth, ListWallets);
router.post('/createWallets', auth, CreateWallets);

export default router;
