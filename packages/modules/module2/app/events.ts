import { validateModuleEvent } from '@mk-modular/shared/validation/moduleSchema';
import { useEventPublisher } from '@mk-modular/shared/events';

export function useModuleEvents() {
  const eventPublisher = useEventPublisher();

  const publishEvent = (type: string, payload: Record<string, unknown>) => {
    const event = {
      type,
      payload,
      source: 'module2',
      timestamp: Date.now(),
    };

    // Validar el evento antes de publicarlo
    const validatedEvent = validateModuleEvent(event);
    eventPublisher.publish(validatedEvent.type, validatedEvent.payload);
  };

  return {
    publishEvent,
  };
}
