import { prisma } from '../db';

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUserIfNotExists(email: string) {
  return prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, password: null },
  });
}

export async function setUserPassword(email: string, hashedPassword: string) {
  return prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  });
}
