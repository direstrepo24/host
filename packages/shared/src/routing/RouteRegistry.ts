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
  private eventBus: EventBus | null;

  private constructor() {
    this.routes = new Map();
    this.eventBus = EventBus.getInstance();
    if (this.eventBus) {
      this.initializeEventListeners();
    }
  }

  public static getInstance(): RouteRegistry {
    if (!RouteRegistry.instance) {
      RouteRegistry.instance = new RouteRegistry();
    }
    return RouteRegistry.instance;
  }

  private initializeEventListeners(): void {
    if (!this.eventBus) return;
    
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

export function useRegisteredRoutes() {
  const [routes, setRoutes] = useState<RegisteredRoute[]>([]);

  useEffect(() => {
    const registry = RouteRegistry.getInstance();
    setRoutes(registry.getAllRoutes());
  }, []);

  return routes;
}

export default RouteRegistry;
