// Components
export { Button } from './components/Button';
export { DataTable } from './components/DataTable';
export { Footer } from './components/Footer';
export { Breadcrumbs } from './components/Breadcrumbs';

// Hooks
export { useModuleMount, useModuleUnmount, useModuleUpdate } from './hooks/moduleLifecycle';

// Events
export * from './events';

// Routing
export { useRouteRegistration } from './routing/useRouteRegistration';
export * from './routing';

// Middleware
export { createAuthMiddleware } from './middleware/auth';

// Validation
export { validateModuleConfig, validateModuleEvent } from './validation/moduleSchema';
export type { ModuleConfig, ModuleEvent } from './validation/moduleSchema';
