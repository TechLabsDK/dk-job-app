import { Request, Response } from 'express';
import { getApplicationsForUser } from '../services/trackingService';

export async function getUserApplications(req: Request, res: Response) {
  const email = req.user?.email;

  if (!email) {
    return res.status(400).json({ message: 'User email not found in request' });
  }

  try {
    const applications = await getApplicationsForUser(email);
    res.status(200).json({ applications });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
}