import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// JWT secret MUST be provided in environment
const JWT_SECRET: string = process.env.NEXTAUTH_SECRET || '';

if (!JWT_SECRET || JWT_SECRET === '') {
  throw new Error(
    'NEXTAUTH_SECRET environment variable is not set. Please set it in your .env.local file. ' +
    'Generate with: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"'
  );
}

export interface AdminToken {
  id: string;
  email: string;
  name: string;
  role?: string;
  iat: number;
  exp: number;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(
  admin: { id: string; email: string; name: string; role?: string },
  expiresIn: string | number = '30d'
): string {
  return jwt.sign(
    {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role || 'admin',
    },
    JWT_SECRET,
    { expiresIn } as any
  );
}

export function verifyToken(token: string): AdminToken | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as unknown as AdminToken;
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export function getTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader) return null;
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return null;
  return parts[1];
}

export function getTokenFromCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'admin-token') {
      return decodeURIComponent(value);
    }
  }
  return null;
}
