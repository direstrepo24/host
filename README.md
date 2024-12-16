# Modular Remix Application

## Overview
A modular Remix application that leverages a monorepo structure with pnpm workspaces. The project implements an event system for communication between modules and provides shared components for consistent development.

## Project Structure
```
mk-modular-remix/
├── packages/
│   ├── host/           # Main application host
│   ├── shared/         # Shared components and utilities
│   └── modules/        # Individual feature modules
├── docs/              # Documentation
└── tools/             # Development and build tools
```

## Key Features
- Modular architecture
- Event-based communication
- Shared component library
- Cloudflare Workers deployment
- Responsive design
- Comprehensive testing

## Documentation
- [Architecture Overview](./ARCHITECTURE.md)
- [Development Roadmap](./ROADMAP.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- pnpm (v8 or later)
- Cloudflare Workers account (for deployment)

### Installation
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test
```

## Development
See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines and best practices.

## License
MIT

# Modular Remix Application (PoC)

Este proyecto es una prueba de concepto (PoC) que demuestra una arquitectura modular en una aplicación Remix, utilizando un monorepo con pnpm workspaces. La aplicación implementa un sistema de eventos para la comunicación entre módulos y un sistema de notificaciones compartido.

## Arquitectura

### Estructura del Monorepo

```
mk-modular-remix/
├── packages/
│   ├── host/           # Aplicación principal que aloja los módulos
│   ├── shared/         # Componentes y utilidades compartidas
│   ├── module1/        # Módulo independiente 1
│   └── module2/        # Módulo independiente 2
└── package.json        # Configuración del monorepo
```

### Componentes Principales

1. **Host Application (`packages/host/`)**
   - Actúa como el contenedor principal
   - Maneja el enrutamiento global
   - Proporciona el layout común con header y sistema de notificaciones
   - Integra los módulos independientes

2. **Shared Package (`packages/shared/`)**
   - Contiene componentes UI reutilizables
   - Sistema de eventos para comunicación entre módulos
   - Tipos y utilidades compartidas
   - Hooks personalizados

3. **Módulos Independientes (`packages/module1/`, `packages/module2/`)**
   - Funcionalidad autocontenida
   - Pueden ser desarrollados y desplegados independientemente
   - Se comunican a través del sistema de eventos

## Manejo de Estilos

La aplicación utiliza Tailwind CSS para estilos con una configuración centralizada en la aplicación host:

### Configuración de Tailwind en el Host

- Ubicada en `packages/host/tailwind.config.ts`
- Controla estilos para toda la aplicación
- Incluye rutas a todos los módulos y componentes compartidos
- Define estilos personalizados y extensiones de tema

```typescript
// packages/host/tailwind.config.ts
{
  content: [
    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
    "../modules/module1/app/**/*.{js,jsx,ts,tsx}",
    "../modules/module2/app/**/*.{js,jsx,ts,tsx}",
    "../shared/src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      // Estilos personalizados como sombras neumórficas
      boxShadow: {
        'neumorphic': '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
        'neumorphic-inset': 'inset 20px 20px 60px #bebebe, inset -20px -20px 60px #ffffff',
      }
    }
  }
}
```

### Directrices de Estilos
- Todos los estilos personalizados deben definirse en la configuración de Tailwind del host
- Los componentes compartidos usan clases de Tailwind para estilos consistentes
- Los módulos no deben definir sus propias configuraciones de Tailwind
- Use los componentes compartidos para mantener la consistencia de estilos en los módulos

## Sistema de Eventos

El sistema de eventos es una parte crucial de la arquitectura que permite la comunicación desacoplada entre módulos.

### Componentes Clave

1. **EventBus (`shared/src/events/EventBus.ts`)**
   ```typescript
   // Implementación del patrón Singleton para asegurar una única instancia
   export class EventBus {
     private static instance: EventBus;
     private handlers: Map<string, EventHandler<any>[]>;

     public static getInstance(): EventBus {
       if (!EventBus.instance) {
         EventBus.instance = new EventBus();
       }
       return EventBus.instance;
     }
   }
   ```

2. **EventProvider (`shared/src/events/EventProvider.tsx`)**
   ```typescript
   export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
     // Inicialización lazy del EventBus en el cliente
     const eventBus = React.useMemo(() => {
       if (typeof window !== 'undefined') {
         return EventBus.getInstance();
       }
       return null;
     }, []);

     return (
       <EventContext.Provider value={eventBus}>
         {children}
       </EventContext.Provider>
     );
   }
   ```

3. **Hooks de Eventos (`shared/src/events/hooks.ts`)**
   ```typescript
   // Hook para suscribirse a eventos
   export function useEventSubscription<T extends AppEvent>(
     eventType: T['type'],
     handler: EventHandler<T>
   ) {
     const eventBus = useContext(EventContext);
     // ...
   }

   // Hook para publicar eventos
   export function useEventPublisher() {
     const eventBus = useContext(EventContext);
     // ...
   }
   ```

## Cómo Agregar un Nuevo Módulo

1. **Crear el Directorio del Módulo**
   ```bash
   mkdir packages/new-module
   cd packages/new-module
   pnpm init
   ```

2. **Configurar package.json**
   ```json
   {
     "name": "@mk-modular/new-module",
     "version": "1.0.0",
     "dependencies": {
       "@mk-modular/shared": "workspace:*"
     }
   }
   ```

3. **Implementar el Módulo**
   ```typescript
   // app/routes/_index.tsx
   import { Button } from "@mk-modular/shared";
   import { useEventPublisher } from "@mk-modular/shared/events";

   export default function NewModule() {
     const { publish } = useEventPublisher();
     // Implementar la lógica del módulo
   }
   ```

4. **Integrar en el Host**
   - Agregar la ruta en el host
   - Importar y utilizar los componentes del módulo

## Trabajando con el Monorepo

### Comandos Principales

```bash
# Instalar dependencias
pnpm install

# Desarrollo
pnpm dev          # Inicia todos los módulos
cd packages/module1 && pnpm dev  # Inicia un módulo específico

# Build
pnpm build        # Construye todos los módulos
cd packages/module1 && pnpm build  # Construye un módulo específico

# Test
pnpm test         # Ejecuta tests en todos los módulos
```

### Ventajas del Monorepo

1. **Desarrollo Coordinado**
   - Cambios atómicos a través de múltiples paquetes
   - Fácil compartición de código y dependencias
   - Versionado consistente

2. **Independencia de Módulos**
   - Cada módulo puede ser desarrollado y desplegado independientemente
   - Equipos pueden trabajar en paralelo
   - Fácil escalabilidad

3. **Reutilización de Código**
   - Componentes compartidos a través del paquete `shared`
   - Reducción de duplicación de código
   - Mantenimiento simplificado

## Características Destacadas

1. **Sistema de Notificaciones**
   - Implementación centralizada en el header
   - Cualquier módulo puede enviar notificaciones
   - Soporte para diferentes tipos de notificaciones (error, info, success)

2. **Comunicación entre Módulos**
   - Sistema de eventos tipo pub/sub
   - Desacoplamiento entre módulos
   - Fácil extensibilidad

3. **UI Consistente**
   - Componentes compartidos
   - Theming centralizado
   - Experiencia de usuario coherente

## Mejores Prácticas

1. **Desarrollo de Módulos**
   - Mantener los módulos autocontenidos
   - Usar el sistema de eventos para comunicación
   - Seguir las convenciones de nombrado

2. **Gestión de Dependencias**
   - Mantener las dependencias actualizadas
   - Usar versiones fijas para estabilidad
   - Aprovechar las workspace dependencies

3. **Testing**
   - Escribir tests para componentes compartidos
   - Probar la integración entre módulos
   - Validar el sistema de eventos

## Contribución

1. Fork el repositorio
2. Crear una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abrir un Pull Request

## Notas

- Esta es una prueba de concepto y puede requerir ajustes para producción
- Considerar aspectos de seguridad adicionales
- Evaluar estrategias de caching y optimización
- Planificar estrategia de deployment

# Modular Remix Application

Este proyecto es una aplicación modular construida con Remix, diseñada para demostrar una arquitectura escalable y mantenible para aplicaciones web grandes.

## Características Principales

- Arquitectura modular con monorepo
- Sistema de eventos para comunicación entre módulos
- Módulos independientes y reutilizables
- Compilación selectiva de módulos
- Interfaz de usuario moderna y responsiva

## Requisitos Previos

- Node.js >= 18
- pnpm (recomendado) o npm

## Estructura del Proyecto

```
mk-modular-remix/
├── packages/
│   ├── shared/           # Código compartido entre módulos
│   │   ├── src/
│   │   │   ├── events/  # Sistema de eventos
│   │   │   └── ui/      # Componentes UI compartidos
│   ├── module1/         # Módulo de ejemplo 1
│   │   ├── app/
│   │   └── package.json
│   └── module2/         # Módulo de ejemplo 2
│       ├── app/
│       └── package.json
└── package.json
```

## Sistema de Eventos

El sistema de eventos es una parte fundamental de la arquitectura, permitiendo la comunicación entre módulos de forma desacoplada.

### Componentes Principales

- `EventBus`: Implementa el patrón pub/sub para manejo de eventos
- `EventProvider`: Proveedor de React que da acceso al EventBus
- `useEventSubscription`: Hook para suscribirse a eventos
- `useEventPublisher`: Hook para publicar eventos

### Tipos de Eventos

- `NotificationEvent`: Eventos para mostrar notificaciones en el header
- `UserEvent`: Eventos relacionados con acciones del usuario
- `ModuleEvent`: Eventos específicos de cada módulo

## Agregar un Nuevo Módulo

1. Crear un nuevo directorio en `packages/`
2. Inicializar package.json:
```bash
cd packages/nuevo-modulo
pnpm init
```

3. Agregar dependencias necesarias:
```json
{
  "dependencies": {
    "@remix-run/react": "^2.0.0",
    "@shared": "workspace:*"
  }
}
```

4. Crear la estructura básica:
```
nuevo-modulo/
├── app/
│   ├── routes/
│   │   └── _index.tsx
│   └── root.tsx
└── package.json
```

5. Implementar las rutas necesarias usando el sistema de eventos compartido

## Desarrollo

1. Instalar dependencias:
```bash
pnpm install
```

2. Iniciar el servidor de desarrollo:
```bash
# Desarrollo de todos los módulos
pnpm dev

# Desarrollo de un módulo específico
pnpm dev --filter module1
```

## Compilación

```bash
# Compilar todos los módulos
pnpm build

# Compilar un módulo específico
pnpm build --filter module1
```

## Pruebas

```bash
# Ejecutar todas las pruebas
pnpm test

# Pruebas de un módulo específico
pnpm test --filter module1
```

## Ejemplos de Uso

### Publicar un Evento

```typescript
import { useEventPublisher } from '@shared/events';

function MyComponent() {
  const { publish } = useEventPublisher();
  
  const handleClick = () => {
    publish({
      type: 'NOTIFICATION',
      source: 'module1',
      timestamp: Date.now(),
      payload: {
        message: '¡Hola desde Module1!',
        level: 'info'
      }
    });
  };

  return <button onClick={handleClick}>Enviar Notificación</button>;
}
```

### Suscribirse a Eventos

```typescript
import { useEventSubscription } from '@shared/events';

function NotificationListener() {
  useEventSubscription('NOTIFICATION', (event) => {
    console.log('Nueva notificación:', event.payload.message);
  });

  return null;
}
```

## Mejores Prácticas

1. **Modularidad**
   - Mantener los módulos independientes y autocontenidos
   - Usar el sistema de eventos para comunicación entre módulos
   - Compartir código común a través del paquete `shared`

2. **Eventos**
   - Definir tipos de eventos claros y específicos
   - Documentar el propósito y payload de cada tipo de evento
   - Manejar errores y casos extremos en los manejadores de eventos

3. **Desarrollo**
   - Seguir las convenciones de código establecidas
   - Escribir pruebas para la lógica de negocio
   - Documentar cambios significativos

## Contribuir

1. Fork el repositorio
2. Crear una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está licenciado bajo los términos de la licencia MIT.
