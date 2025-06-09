import { Request, Response } from 'express';
import { generateAndStoreVerificationCode, verifyLoginCodeAndSetPassword } from '../services/authService';

export async function requestLoginCode(req: Request, res: Response) {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    await generateAndStoreVerificationCode(email);
    res.status(200).json({ message: 'Verification code sent!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function verifyLoginCode(req: Request, res: Response) {
  const { email, code, password } = req.body;

  if (!email || !code || !password) {
    return res.status(400).json({ message: 'Email, code, and password are required.' });
  }

  try {
    await verifyLoginCodeAndSetPassword(email, code, password);
    res.status(200).json({ message: 'Verification successful!' });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || 'Verification failed.' });
  }
}
