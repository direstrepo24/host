import React from 'react';
import { EventBus } from './EventBus';

/**
 * Contexto que proporciona acceso al EventBus en toda la aplicación
 */
export const EventContext = React.createContext<EventBus | null>(null);

/**
 * Proveedor de eventos que inicializa y proporciona el EventBus a todos los componentes hijos.
 * Solo inicializa el EventBus en el cliente para evitar problemas de hidratación.
 * 
 * @param props.children - Componentes hijos que tendrán acceso al EventBus
 */
export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Inicializar el EventBus solo en el cliente
  const eventBus = React.useMemo(() => {
    if (typeof window !== 'undefined') {
      console.log('Initializing EventBus in client');
      return EventBus.getInstance();
    }
    return null;
  }, []);

  // En el servidor, renderizar los children sin el contexto
  if (!eventBus) {
    return <>{children}</>;
  }

  return (
    <EventContext.Provider value={eventBus}>
      {children}
    </EventContext.Provider>
  );
};
