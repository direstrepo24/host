import { useEffect } from 'react';
import { EventBus } from '../events/EventBus';
import type { RouteRegistrationEvent } from '../events/types';

export function useRouteRegistration(
  moduleId: string,
  routes: RouteRegistrationEvent['payload']['routes']
) {
  useEffect(() => {
    const eventBus = EventBus.getInstance();
    if (!eventBus) return;

    // Registrar las rutas cuando el módulo se monta
    const event: RouteRegistrationEvent = {
      type: 'ROUTE_REGISTRATION',
      timestamp: Date.now(),
      source: moduleId,
      payload: {
        moduleId,
        routes,
      },
    };

    eventBus.publish(event);

    // No es necesario limpiar ya que el RouteRegistry mantiene las rutas
  }, [moduleId, routes]);
}
