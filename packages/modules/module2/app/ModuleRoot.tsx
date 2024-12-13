import { useRouteRegistration } from '@mk-modular/shared';
import { Breadcrumbs } from '@mk-modular/shared';
import { useModuleMount, useModuleUnmount } from '@mk-modular/shared';
import { useEventSubscriber } from '@mk-modular/shared/events';
import { ModuleLayout } from './components/ModuleLayout';
import { HomePage } from './pages/HomePage';
import { DetailsPage } from './pages/DetailsPage';
import { useState, useEffect } from 'react';

interface ModuleRootProps {
  version: string;
  buildTime: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    role: string;
    permissions: string[];
  } | null;
}

export function ModuleRoot({ version, buildTime }: ModuleRootProps) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  // Suscribirse a eventos de autenticación
  useEventSubscriber('AUTH_STATE_CHANGE', (event) => {
    console.log('Module2: Received auth state change', event);
    setAuthState({
      isAuthenticated: event.payload.isAuthenticated,
      user: event.payload.user,
    });
  });

  useModuleMount('module2', () => {
    console.log('Module2: Mounted');
  });

  useModuleUnmount('module2', () => {
    console.log('Module2: Unmounting');
  });

  useRouteRegistration('module2', [
    {
      path: '/module2',
      component: () => (
        <ModuleLayout version={version} buildTime={buildTime}>
          <Breadcrumbs />
          <HomePage authState={authState} />
        </ModuleLayout>
      ),
      index: true,
      handle: {
        breadcrumb: 'Home'
      }
    },
    {
      path: 'details',
      component: () => (
        <ModuleLayout version={version} buildTime={buildTime}>
          <Breadcrumbs />
          <DetailsPage />
        </ModuleLayout>
      ),
      handle: {
        breadcrumb: 'Details'
      }
    }
  ]);

  return null;
}
