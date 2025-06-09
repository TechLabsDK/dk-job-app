import { Router } from 'express';
import { requestLoginCode, verifyLoginCode } from '../controllers/authController';

const router = Router();

router.post('/request-code', requestLoginCode);
router.post('/verify', verifyLoginCode);

export default router;
