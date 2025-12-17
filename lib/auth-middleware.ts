import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, getTokenFromCookie, getTokenFromHeader } from './auth';

export interface AuthenticatedRequest extends NextRequest {
  admin?: {
    id: string;
    email: string;
    name: string;
    role?: string;
  };
}

export function withAuth(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    try {
      // Get token from cookie or Authorization header
      const cookieToken = getTokenFromCookie(req.headers.get('cookie'));
      const headerToken = getTokenFromHeader(req.headers.get('authorization'));
      const token = cookieToken || headerToken;

      if (!token) {
        return NextResponse.json(
          { error: 'Unauthorized - No token provided' },
          { status: 401 }
        );
      }

      // Verify token
      const decoded = verifyToken(token);
      if (!decoded) {
        return NextResponse.json(
          { error: 'Unauthorized - Invalid token' },
          { status: 401 }
        );
      }

      // Attach admin info to request
      const authenticatedReq = req as AuthenticatedRequest;
      authenticatedReq.admin = {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role,
      };

      return handler(authenticatedReq);
    } catch (error) {
      console.error('Auth middleware error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}
