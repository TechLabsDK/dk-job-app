import { findUserByEmail } from '../repositories/userRepository';
import { savePrediction } from '../repositories/predictionRepository';

export async function savePredictionToDB(email: string, role: string, score: number) {
  const user = await findUserByEmail(email);
  if (!user) throw new Error('User not found');

  return await savePrediction(user.id, role, score);
}
