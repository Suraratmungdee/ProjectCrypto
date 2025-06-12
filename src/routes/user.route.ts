import { Router } from 'express';
import { CreateUsers } from '../controllers/user.controller';

const router = Router();

router.post('/createUsers', CreateUsers);

export default router;
