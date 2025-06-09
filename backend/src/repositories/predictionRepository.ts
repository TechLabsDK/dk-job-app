import { prisma } from '../db';

export async function getApplicationsForUser(email: string) {
  return await prisma.prediction.findMany({
    where: {
      user: {
        email: email,
      },
    },
    select: {
      role: true,
      score: true,
    },
  });
}

export async function savePrediction(userId: number, role: string, score: number) {
  return await prisma.prediction.create({
    data: {
      userId,
      role,
      score,
    },
  });
}