import { Router } from 'express';
import { CreateOrder } from '../controllers/order.controllers';
import { auth } from '../middlewares/auth';

const router = Router();

router.post('/createOrder', auth, CreateOrder);

export default router;