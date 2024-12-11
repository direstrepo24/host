import { json, redirect } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';

export interface AuthMiddlewareOptions {
  requireAuth?: boolean;
  roles?: string[];
}

export function createAuthMiddleware(options: AuthMiddlewareOptions = {}) {
  return async (request: Request, next: LoaderFunction) => {
    try {
      // Verificar token de sesión
      const session = await getSession(request);
      
      if (options.requireAuth && !session.has('userId')) {
        return redirect('/login');
      }

      if (options.roles?.length) {
        const userRole = session.get('role');
        if (!options.roles.includes(userRole)) {
          throw new Error('Unauthorized');
        }
      }

      return next(request);
    } catch (error) {
      return json(
        { error: error instanceof Error ? error.message : 'Internal Server Error' },
        { status: error instanceof Error ? 401 : 500 }
      );
    }
  };
}

// Utility para obtener la sesión
async function getSession(request: Request) {
  // Implementar lógica de sesión aquí
  return new Map();
}
