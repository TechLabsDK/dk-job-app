import axios from 'axios';

import { Request, Response } from 'express';
import { savePredictionToDB } from '../services/predictionService';

export async function getPrediction(req: Request, res: Response) {
  const inputData = req.body;
  const email = (req as any).user?.email;

  type MLResponse = {
    prediction: string;
    probability: number;
  };

  try {
    const response = await axios.post<MLResponse>('http://localhost:5001/predict', inputData);
    const { prediction, probability } = response.data;

    console.log('ML model response received:');
    console.log('Prediction:', prediction);
    console.log('Probability:', probability);

    await savePredictionToDB(email, inputData.jobRole, probability);

    return res.status(200).json({ prediction, probability });
  } catch (err) {
    console.error('Prediction error:', err);
    return res.status(500).json({ message: 'Failed to get prediction' });
  }
}
