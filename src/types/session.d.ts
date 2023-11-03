import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

export interface CustomSession extends DefaultSession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
  };
}

export interface CustomUser extends DefaultUser {
  role?: string | null;
}

export interface CustomJWT extends DefaultJWT {
  role?: string | null;
  iat?: number;
  exp?: number;
  jti?: string;
}
