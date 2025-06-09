import { Request, Response } from 'express';

export async function getPrediction(req: Request, res: Response) {
  const { jobRole, location, skill, language, visaStatus } = req.body;

  // Placeholder logic for now
  const score = Math.floor(Math.random() * 100); // Fake prediction

  res.status(200).json({ score });
}
