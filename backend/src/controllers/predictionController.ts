import { Request, Response } from 'express';
import { savePredictionToDB } from '../services/predictionService';

export async function getPrediction(req: Request, res: Response) {
  const { jobRole, location, skill, language, visaStatus } = req.body;

  // Here the ML model should be called
  const score = Math.floor(Math.random() * 100); // fake prediction
  const email = (req as any).user?.email;

  try {
    // save prediction to DB
    await savePredictionToDB(email, jobRole, score);

    // return response
    return res.status(200).json({ score });
  } catch (err) {
    console.error('Prediction error:', err);
    return res.status(500).json({ message: 'Failed to save prediction' });
  }
}
