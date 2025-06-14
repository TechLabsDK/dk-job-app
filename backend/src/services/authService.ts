import { createUserIfNotExists, setUserPassword, findUserByEmail } from '../repositories/userRepository';
import { saveCode, validateCode, removeCode } from './codeStore';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function generateAndStoreVerificationCode(email: string) {
  const code = crypto.randomInt(100000, 999999).toString();

  // create user if needed (with null password)
  await createUserIfNotExists(email);

  // save code in memory
  saveCode(email, code);

  // set up nodemailer transporter (Yahoo)
  const transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // prepare verification link
  const frontendUrl = process.env.FRONTEND_URL;
  const link = `${frontendUrl}/verify?email=${encodeURIComponent(email)}&code=${code}`;

  // send the email
  await transporter.sendMail({
    from: `"BetterApply" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your BetterApply login link',
    text: `Hi there!\n\nClick the link below to verify your login:\n\n${link}\n\nThis link will let you verify your email and log in.`,
  });

  console.log(`Verification link sent to ${email}: ${link}`);
}


export async function verifyLoginCodeAndSetPassword(email: string, inputCode: string, plainPassword: string) {
  // check the code
  if (!validateCode(email, inputCode)) {
    throw new Error('Invalid code.');
  }

  // hash the password
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  // store the password in the DB
  await setUserPassword(email, hashedPassword);

  // remove the used code
  removeCode(email);
}


const JWT_SECRET = process.env.JWT_SECRET || 'default-secret'; // Load from .env in real use

export async function loginUser(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user || !user.password) {
    throw new Error('Invalid email or password');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  console.log(`Password match result: ${isMatch}`);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }
  

  // Token payload can include user ID or email
  const token = jwt.sign({ email: user.email }, JWT_SECRET);
  return token;
}
