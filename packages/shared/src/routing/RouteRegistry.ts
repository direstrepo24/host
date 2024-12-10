import { EventBus } from '../events/EventBus';
import type { RouteRegistrationEvent } from '../events/types';
import { useEffect, useState } from 'react';

interface RegisteredRoute {
  moduleId: string;
  path: string;
  component: React.ComponentType;
  index?: boolean;
  children?: RegisteredRoute[];
}

class RouteRegistry {
  private static instance: RouteRegistry;
  private routes: Map<string, RegisteredRoute[]>;
  private eventBus: EventBus;

  private constructor() {
    this.routes = new Map();
    this.eventBus = EventBus.getInstance();
    this.initializeEventListeners();
  }

  public static getInstance(): RouteRegistry {
    if (!RouteRegistry.instance) {
      RouteRegistry.instance = new RouteRegistry();
    }
    return RouteRegistry.instance;
  }

  private initializeEventListeners(): void {
    this.eventBus.subscribe<RouteRegistrationEvent>('ROUTE_REGISTRATION', (event) => {
      const { moduleId, routes } = event.payload;
      this.registerModuleRoutes(moduleId, routes);
    });
  }

  private registerModuleRoutes(moduleId: string, routes: RouteRegistrationEvent['payload']['routes']): void {
    this.routes.set(moduleId, routes.map(route => ({
      moduleId,
      ...route,
      children: route.children?.map(child => ({ moduleId, ...child }))
    })));
  }

  public getAllRoutes(): RegisteredRoute[] {
    return Array.from(this.routes.values()).flat();
  }

  public getModuleRoutes(moduleId: string): RegisteredRoute[] {
    return this.routes.get(moduleId) || [];
  }
}

export const useRegisteredRoutes = () => {
  const [routes, setRoutes] = useState<RegisteredRoute[]>([]);
  
  useEffect(() => {
    const registry = RouteRegistry.getInstance();
    setRoutes(registry.getAllRoutes());
    
    // Suscribirse a cambios en las rutas
    const unsubscribe = EventBus.getInstance().subscribe('ROUTE_REGISTRATION', () => {
      setRoutes(registry.getAllRoutes());
    });

    return () => unsubscribe();
  }, []);

  return routes;
};

export default RouteRegistry;
