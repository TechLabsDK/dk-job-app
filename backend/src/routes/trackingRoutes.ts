import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { getUserApplications } from '../controllers/trackingController';

const router = Router();

router.get('/applications', authenticateToken, getUserApplications);

export default router;
