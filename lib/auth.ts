import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { getUserByUsername, User } from './database';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export interface JWTPayload {
  userId: number;
  username: string;
  role: 'user' | 'admin';
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;
  
  if (!token) {
    return null;
  }

  const payload = verifyToken(token);
  if (!payload) {
    return null;
  }

  const user = getUserByUsername(payload.username);
  return user || null;
}

export async function authenticateUser(username: string, password: string): Promise<User | null> {
  // For demo purposes, hardcode the admin user
  if (username === 'admin' && password === 'admin123') {
    return {
      id: 1,
      username: 'admin',
      email: 'admin@engineering-dashboard.com',
      role: 'admin',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }

  // In a real application, you would:
  // 1. Get user from database
  // 2. Verify password hash
  // const user = getUserByUsername(username);
  // if (!user) return null;
  // const isValid = await verifyPassword(password, user.password_hash);
  // return isValid ? user : null;

  return null;
}

export function setAuthCookie(token: string): void {
  const cookieStore = cookies();
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

export function clearAuthCookie(): void {
  const cookieStore = cookies();
  cookieStore.delete('auth-token');
}