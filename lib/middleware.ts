import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, getTokenFromCookie } from './auth';

/**
 * Middleware to verify admin authentication on protected routes
 * Checks both cookie and Authorization header
 */
export async function requireAuth(req: NextRequest): Promise<{ valid: boolean; error?: string; token?: any }> {
  try {
    // Get token from HTTP-only cookie
    const cookieHeader = req.headers.get('cookie');
    let token = getTokenFromCookie(cookieHeader);

    // Fallback to Authorization header
    if (!token) {
      const authHeader = req.headers.get('authorization');
      if (authHeader) {
        const parts = authHeader.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
          token = parts[1];
        }
      }
    }

    if (!token) {
      return { valid: false, error: 'No authentication token provided' };
    }

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return { valid: false, error: 'Invalid or expired token' };
    }

    return { valid: true, token: decoded };
  } catch (error) {
    console.error('Auth middleware error:', error);
    return { valid: false, error: 'Authentication failed' };
  }
}

/**
 * Helper function for API routes to check authentication
 */
export function createProtectedRoute(handler: (req: NextRequest, context: any) => Promise<NextResponse>) {
  return async (req: NextRequest, context: any) => {
    const auth = await requireAuth(req);
    
    if (!auth.valid) {
      return NextResponse.json(
        { error: auth.error || 'Unauthorized' },
        { status: 401 }
      );
    }

    // Attach user to request for use in handler
    (req as any).user = auth.token;
    
    return handler(req, context);
  };
}
