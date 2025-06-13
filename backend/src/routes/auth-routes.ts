import { Router } from 'express';
import { registerUser, loginUser } from '../controller/auth-controller';

const router = Router();

router.post('/register', registerUser as any);
router.post("/login", loginUser);

export default router;
