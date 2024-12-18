import { useCallback, useEffect } from 'react';
import type { AppEvent, EventHandler } from './types';
import { useEventBus } from './EventProvider';

/**
 * Hook para suscribirse a eventos.
 * @param eventType - El tipo de evento a escuchar
 * @param handler - La función que maneja el evento
 */
export function useEventSubscription<T extends AppEvent>(
  eventType: T['type'],
  handler: EventHandler<T>
) {
  const eventBus = useEventBus();

  useEffect(() => {
    if (!eventBus) return;
    return eventBus.subscribe(eventType, handler);
  }, [eventBus, eventType, handler]);
}

/**
 * Hook para publicar eventos.
 * @returns Objeto con la función publish para enviar eventos
 */
export function useEventPublisher() {
  const eventBus = useEventBus();

  const publish = useCallback(<T extends AppEvent>(event: T) => {
    if (!eventBus) {
      console.warn('EventBus not initialized');
      return;
    }
    return eventBus.publish(event);
  }, [eventBus]);

  return { publish };
}

/**
 * Hook para acceder al historial de eventos.
 * @returns Array con el historial de eventos
 */
export function useEventHistory() {
  const eventBus = useEventBus();
  return eventBus?.getHistory() || [];
}
