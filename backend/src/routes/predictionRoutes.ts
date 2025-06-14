import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { getPrediction } from '../controllers/predictionController';

const router = Router();

router.post('/predict', authenticateToken, getPrediction); // if the first function fails, the second one will never be called

export default router;
