// Definición de tipos base para eventos
/**
 * Estructura base para todos los eventos de la aplicación
 */
export interface BaseEvent {
  type: string;
  timestamp: number;
  source: string;
}

// Tipos específicos de eventos
/**
 * Evento de acción de usuario
 */
export interface UserEvent extends BaseEvent {
  type: 'USER_ACTION';
  payload: {
    action: string;
    userId: string;
    data?: unknown;
  };
}

/**
 * Evento de acción de módulo
 */
export interface ModuleEvent extends BaseEvent {
  type: 'MODULE_ACTION';
  payload: {
    moduleId: string;
    action: string;
    data?: unknown;
  };
}

/**
 * Niveles de notificación soportados por el sistema
 */
export type NotificationLevel = 'info' | 'warning' | 'error' | 'success';

/**
 * Evento de notificación para mostrar mensajes en el header
 */
export interface NotificationEvent extends BaseEvent {
  type: 'NOTIFICATION';
  payload: {
    message: string;
    level: NotificationLevel;
    targetModule?: string;
  };
}

/**
 * Evento de registro de rutas dinámicas
 */
export interface RouteRegistrationEvent extends BaseEvent {
  type: 'ROUTE_REGISTRATION';
  payload: {
    moduleId: string;
    routes: Array<{
      path: string;
      component: React.ComponentType;
      index?: boolean;
      children?: Array<{
        path: string;
        component: React.ComponentType;
        index?: boolean;
      }>;
    }>;
  };
}

// Unión de todos los tipos de eventos
/**
 * Unión de todos los tipos de eventos soportados por la aplicación
 */
export type AppEvent = UserEvent | ModuleEvent | NotificationEvent | RouteRegistrationEvent;

// Tipo para los manejadores de eventos
/**
 * Tipo para las funciones que manejan eventos
 */
export type EventHandler<T extends AppEvent = AppEvent> = (event: T) => void;

// Tipo para el mapa de suscriptores
/**
 * Mapa de suscriptores para cada tipo de evento
 */
export type EventSubscribersMap = Map<string, Set<EventHandler>>;
