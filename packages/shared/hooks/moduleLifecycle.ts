import { useEffect, useRef } from 'react';
import { useEventPublisher } from '../events';

export function useModuleMount(moduleId: string, callback: () => void) {
  const isFirstRender = useRef(true);
  const eventPublisher = useEventPublisher();

  useEffect(() => {
    if (isFirstRender.current) {
      callback();
      eventPublisher.publish('moduleMount', { moduleId });
      isFirstRender.current = false;
    }
  }, [moduleId, callback, eventPublisher]);
}

export function useModuleUnmount(moduleId: string, callback: () => void) {
  const eventPublisher = useEventPublisher();

  useEffect(() => {
    return () => {
      callback();
      eventPublisher.publish('moduleUnmount', { moduleId });
    };
  }, [moduleId, callback, eventPublisher]);
}

export function useModuleUpdate(moduleId: string, deps: any[], callback: () => void) {
  const eventPublisher = useEventPublisher();
  const prevDepsRef = useRef(deps);

  useEffect(() => {
    if (JSON.stringify(prevDepsRef.current) !== JSON.stringify(deps)) {
      callback();
      eventPublisher.publish('moduleUpdate', { moduleId, prevDeps: prevDepsRef.current, newDeps: deps });
      prevDepsRef.current = deps;
    }
  }, [moduleId, ...deps, callback, eventPublisher]);
}
