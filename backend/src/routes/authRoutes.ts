import { Router } from 'express';
import { requestLoginCode, verifyLoginCode, login } from '../controllers/authController';

const router = Router();

router.post('/request-code', requestLoginCode);
router.post('/verify', verifyLoginCode);
router.post('/auth/login', login);

export default router;
