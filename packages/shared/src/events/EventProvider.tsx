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
  // No lanzamos error si no hay contexto, ya que puede ser null en el servidor
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
    const bus = EventBus.getInstance();
    if (bus) {
      setEventBus(bus);
    }
  }, []);

  return (
    <EventContext.Provider value={eventBus}>
      {children}
    </EventContext.Provider>
  );
};
