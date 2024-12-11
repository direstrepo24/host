import { json, redirect } from '@remix-run/node';
import type { LoaderFunctionArgs } from '@remix-run/node';

export interface AuthMiddlewareOptions {
  requireAuth?: boolean;
  roles?: string[];
}

interface SessionData {
  userId?: string;
  role?: string;
}

export function createAuthMiddleware(options: AuthMiddlewareOptions = {}) {
  return async (args: LoaderFunctionArgs, next: (args: LoaderFunctionArgs) => Promise<Response>) => {
    try {
      // Verificar token de sesión
      const session = await getSession(args.request);
      
      if (options.requireAuth && !session.userId) {
        return redirect('/login');
      }

      if (options.roles?.length && session.role) {
        if (!options.roles.includes(session.role)) {
          throw new Error('Unauthorized');
        }
      }

      return next(args);
    } catch (error) {
      return json(
        { error: error instanceof Error ? error.message : 'Internal Server Error' },
        { status: error instanceof Error ? 401 : 500 }
      );
    }
  };
}

// Utility para obtener la sesión
async function getSession(_request: Request): Promise<SessionData> {
  // TODO: Implementar lógica de sesión real aquí
  return {
    userId: '1',
    role: 'admin'
  };
}
