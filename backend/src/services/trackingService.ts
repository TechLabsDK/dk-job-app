import { getApplicationsForUser as getApplicationsFromRepo } from '../repositories/predictionRepository';

export async function getApplicationsForUser(email: string) {
  const applications = await getApplicationsFromRepo(email);

  // rename "role" to "position" to match the frontend expectations in label names
  return applications.map(app => ({
    position: app.role,
    score: app.score,
  }));
}
