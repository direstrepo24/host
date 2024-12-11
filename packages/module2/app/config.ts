import { ModuleConfig, validateModuleConfig } from '@mk-modular/shared/validation/moduleSchema';
import { HomePage } from './pages/HomePage';
import { DetailsPage } from './pages/DetailsPage';

const moduleConfig = {
  id: 'module2',
  name: 'Analytics Module',
  version: '1.0.0',
  routes: [
    {
      path: '/module2',
      component: HomePage,
      index: true,
    },
    {
      path: 'details',
      component: DetailsPage,
    },
  ],
  permissions: ['admin', 'editor', 'viewer'],
};

// Validar la configuración del módulo
export const validatedConfig = validateModuleConfig(moduleConfig);
