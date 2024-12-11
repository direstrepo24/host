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
export const useEventSubscriber = <T extends AppEvent>(
  eventType: T['type'],
  handler: EventHandler<T>
) => {
  const eventBus = useContext(EventContext);

  useEffect(() => {
    if (!eventBus) {
      return;
    }

    const unsubscribe = eventBus.subscribe(eventType, handler);
    return () => {
      unsubscribe();
    };
  }, [eventBus, eventType, handler]);
};

/**
 * Hook personalizado para publicar eventos.
 * Proporciona una función memoizada para publicar eventos que puede ser usada en callbacks.
 * 
 * @returns Un objeto con la función publish para enviar eventos
 */
export const useEventPublisher = () => {
  const eventBus = useContext(EventContext);

  const publish = useCallback(
    <T extends AppEvent>(event: T) => {
      if (!eventBus) {
        console.warn('EventBus not found in context');
        return;
      }
      eventBus.publish(event);
    },
    [eventBus]
  );

  return { publish };
};

/**
 * Hook personalizado para acceder al historial de eventos.
 * Útil para debugging y monitoreo del sistema de eventos.
 * 
 * @returns Array con el historial de eventos
 */
export const useEventHistory = () => {
  const eventBus = useContext(EventContext);
  return eventBus?.getHistory() || [];
};
