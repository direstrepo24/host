# Sistema de Eventos Desacoplados

El sistema de eventos implementado en este proyecto permite la comunicación entre módulos de forma desacoplada, siguiendo el patrón de diseño Pub/Sub (Publisher/Subscriber). Este sistema es especialmente útil para la comunicación entre módulos independientes sin crear dependencias directas entre ellos.

## Arquitectura

### EventBus

El `EventBus` es el componente central del sistema, implementado como un Singleton que maneja la publicación y suscripción de eventos. Características principales:

```typescript
class EventBus {
  private static instance: EventBus;
  private subscribers: Map<string, Set<EventHandler>>;
  private eventHistory: AppEvent[];
}
```

- **Singleton**: Asegura una única instancia del bus de eventos en toda la aplicación
- **Manejo del SSR**: Retorna `null` en el servidor para evitar problemas de hidratación
- **Historial de Eventos**: Mantiene un registro de los últimos eventos para debugging
- **Suscriptores**: Utiliza un Map para mantener los manejadores de eventos por tipo

### Tipos de Eventos

Los eventos están tipados para asegurar consistencia:

```typescript
interface AppEvent {
  type: string;
  timestamp: number;
  source: string;
  payload: any;
}

// Ejemplo de evento específico
interface NotificationEvent extends AppEvent {
  type: 'NOTIFICATION';
  payload: {
    message: string;
    level: 'info' | 'warning' | 'error' | 'success';
  };
}
```

## Uso del Sistema

### 1. Provider

Envuelve tu aplicación con el `EventProvider`:

```tsx
import { EventProvider } from '@mk-modular/shared/events';

function App() {
  return (
    <EventProvider>
      {/* Componentes de la aplicación */}
    </EventProvider>
  );
}
```

### 2. Publicación de Eventos

Usa el hook `useEventPublisher` para enviar eventos:

```tsx
import { useEventPublisher } from '@mk-modular/shared/events';

function MyComponent() {
  const { publish } = useEventPublisher();

  const handleClick = () => {
    publish({
      type: 'NOTIFICATION',
      source: 'module1',
      timestamp: Date.now(),
      payload: {
        message: '¡Operación exitosa!',
        level: 'success'
      }
    });
  };

  return <button onClick={handleClick}>Notificar</button>;
}
```

### 3. Suscripción a Eventos

Usa el hook `useEventSubscription` para escuchar eventos:

```tsx
import { useEventSubscription } from '@mk-modular/shared/events';

function NotificationListener() {
  useEventSubscription<NotificationEvent>('NOTIFICATION', (event) => {
    console.log(`Nueva notificación: ${event.payload.message}`);
  });

  return null;
}
```

## Consideraciones Importantes

### Server-Side Rendering (SSR)

El sistema está diseñado para manejar SSR correctamente:

1. En el servidor, `EventBus.getInstance()` retorna `null`
2. Los hooks manejan graciosamente el caso cuando no hay EventBus
3. Los eventos solo se procesan en el cliente

### Ciclo de Vida de las Suscripciones

Las suscripciones se limpian automáticamente:

```tsx
useEventSubscription('EVENT_TYPE', handler);
// El useEffect interno maneja la limpieza automáticamente
```

### Debugging

Para depurar eventos, puedes usar el hook `useEventHistory`:

```tsx
import { useEventHistory } from '@mk-modular/shared/events';

function EventDebugger() {
  const history = useEventHistory();
  return <pre>{JSON.stringify(history, null, 2)}</pre>;
}
```

## Mejores Prácticas

1. **Tipos de Eventos**:
   - Define interfaces para cada tipo de evento
   - Usa tipos genéricos al suscribirte a eventos

2. **Manejo de Errores**:
   - Los errores en los manejadores de eventos están aislados
   - Se registran en la consola sin afectar otros manejadores

3. **Rendimiento**:
   - Las suscripciones se limpian automáticamente
   - El historial de eventos está limitado para evitar fugas de memoria

4. **Modularidad**:
   - Cada módulo puede publicar y suscribirse a eventos independientemente
   - No hay acoplamiento directo entre módulos

## Ejemplo de Flujo Completo

```tsx
// Definición del evento
interface AuthEvent extends AppEvent {
  type: 'AUTH_STATE_CHANGE';
  payload: {
    isAuthenticated: boolean;
    user?: {
      id: string;
      name: string;
    };
  };
}

// Componente que publica eventos
function LoginButton() {
  const { publish } = useEventPublisher();

  const handleLogin = async () => {
    const user = await authenticateUser();
    publish<AuthEvent>({
      type: 'AUTH_STATE_CHANGE',
      source: 'auth-module',
      timestamp: Date.now(),
      payload: {
        isAuthenticated: true,
        user
      }
    });
  };

  return <button onClick={handleLogin}>Login</button>;
}

// Componente que escucha eventos
function AuthStateListener() {
  useEventSubscription<AuthEvent>('AUTH_STATE_CHANGE', (event) => {
    if (event.payload.isAuthenticated) {
      // Actualizar UI, redirigir, etc.
    }
  });

  return null;
}
```

## Conclusión

Este sistema de eventos proporciona una forma robusta y tipada de manejar la comunicación entre módulos, manteniendo un acoplamiento bajo y soportando SSR. La arquitectura permite una fácil extensión y mantenimiento del código, mientras que el sistema de tipos de TypeScript ayuda a prevenir errores en tiempo de compilación.
