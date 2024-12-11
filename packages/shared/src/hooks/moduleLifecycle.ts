import { useEffect, useRef } from 'react';
import { useEventPublisher } from '../events';
import type { ModuleEvent } from '../events/types';

export function useModuleMount(moduleId: string, callback: () => void) {
  const isFirstRender = useRef(true);
  const eventPublisher = useEventPublisher();

  useEffect(() => {
    if (isFirstRender.current) {
      callback();
      const event: ModuleEvent = {
        type: 'MODULE_ACTION',
        timestamp: Date.now(),
        source: moduleId,
        payload: {
          moduleId,
          action: 'mount'
        }
      };
      eventPublisher.publish(event);
      isFirstRender.current = false;
    }
  }, [moduleId, callback, eventPublisher]);
}

export function useModuleUnmount(moduleId: string, callback: () => void) {
  const eventPublisher = useEventPublisher();

  useEffect(() => {
    return () => {
      callback();
      const event: ModuleEvent = {
        type: 'MODULE_ACTION',
        timestamp: Date.now(),
        source: moduleId,
        payload: {
          moduleId,
          action: 'unmount'
        }
      };
      eventPublisher.publish(event);
    };
  }, [moduleId, callback, eventPublisher]);
}

export function useModuleUpdate(moduleId: string, deps: any[], callback: () => void) {
  const eventPublisher = useEventPublisher();
  const prevDepsRef = useRef(deps);

  useEffect(() => {
    if (JSON.stringify(prevDepsRef.current) !== JSON.stringify(deps)) {
      callback();
      const event: ModuleEvent = {
        type: 'MODULE_ACTION',
        timestamp: Date.now(),
        source: moduleId,
        payload: {
          moduleId,
          action: 'update',
          data: {
            prevDeps: prevDepsRef.current,
            newDeps: deps
          }
        }
      };
      eventPublisher.publish(event);
      prevDepsRef.current = deps;
    }
  }, [moduleId, ...deps, callback, eventPublisher]);
}
