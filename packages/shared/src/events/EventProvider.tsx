import React from 'react';
import { EventBus } from './EventBus';

/**
 * Contexto que proporciona acceso al EventBus en toda la aplicación
 */
export const EventContext = React.createContext<EventBus | null>(null);

/**
 * Hook personalizado para acceder al EventBus
 */
export const useEventBus = () => {
  const context = React.useContext(EventContext);
  if (!context) {
    throw new Error('useEventBus must be used within an EventProvider');
  }
  return context;
};

/**
 * Proveedor de eventos que inicializa y proporciona el EventBus a todos los componentes hijos.
 * Solo inicializa el EventBus en el cliente para evitar problemas de hidratación.
 * 
 * @param props.children - Componentes hijos que tendrán acceso al EventBus
 */
export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [eventBus, setEventBus] = React.useState<EventBus | null>(null);

  React.useEffect(() => {
    // Inicializar el EventBus solo en el cliente
    setEventBus(EventBus.getInstance());
  }, []);

  // En el servidor o durante la hidratación inicial, renderizar los children sin el contexto
  if (!eventBus) {
    return <>{children}</>;
  }

  return (
    <EventContext.Provider value={eventBus}>
      {children}
    </EventContext.Provider>
  );
};
