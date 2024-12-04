import { useEffect, useCallback, useContext } from 'react';
import type { AppEvent, EventHandler } from './types';
import { EventContext } from './EventProvider';

/**
 * Hook personalizado para suscribirse a eventos específicos.
 * Maneja automáticamente la limpieza de la suscripción cuando el componente se desmonta.
 * 
 * @param eventType - El tipo de evento al que suscribirse
 * @param handler - La función que maneja el evento
 */
export function useEventSubscription<T extends AppEvent>(
  eventType: T['type'],
  handler: EventHandler<T>
) {
  const eventBus = useContext(EventContext);

  useEffect(() => {
    if (!eventBus) {
      return;
    }

    console.log('Subscribing to event type:', eventType);
    const unsubscribe = eventBus.subscribe(eventType, handler);

    return () => {
      console.log('Unsubscribing from event type:', eventType);
      unsubscribe();
    };
  }, [eventType, handler, eventBus]);
}

/**
 * Hook personalizado para publicar eventos.
 * Proporciona una función memoizada para publicar eventos que puede ser usada en callbacks.
 * 
 * @returns Un objeto con la función publish para enviar eventos
 */
export function useEventPublisher() {
  const eventBus = useContext(EventContext);

  const publish = useCallback(<T extends AppEvent>(event: T) => {
    if (!eventBus) {
      console.log('Event publishing skipped - EventBus not ready');
      return;
    }
    return eventBus.publish(event);
  }, [eventBus]);

  return { publish };
}

/**
 * Hook personalizado para acceder al historial de eventos.
 * Útil para debugging y monitoreo del sistema de eventos.
 * 
 * @returns Array con el historial de eventos
 */
export function useEventHistory() {
  const eventBus = useContext(EventContext);
  if (!eventBus) {
    return [];
  }
  return eventBus.getHistory();
}
