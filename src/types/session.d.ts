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
  login?: string;
}

export interface CustomJWT extends DefaultJWT {
  role?: string | null;
  login?: string;
  iat?: number;
  exp?: number;
  jti?: string;
}
