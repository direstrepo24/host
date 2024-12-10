import { useRouteRegistration } from '@mk-modular/shared/routing';
import { ModuleLayout } from './components/ModuleLayout';
import { HomePage } from './pages/HomePage';
import { DetailsPage } from './pages/DetailsPage';

interface ModuleRootProps {
  version: string;
  buildTime: string;
}

export function ModuleRoot({ version, buildTime }: ModuleRootProps) {
  useRouteRegistration('module1', [
    {
      path: '/module1',
      component: () => <ModuleLayout version={version} buildTime={buildTime}>
        <HomePage />
      </ModuleLayout>,
      index: true
    },
    {
      path: 'details',
      component: () => <ModuleLayout version={version} buildTime={buildTime}>
        <DetailsPage />
      </ModuleLayout>
    }
  ]);

  return null;
}
