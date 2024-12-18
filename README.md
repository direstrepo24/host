# Modular Remix Application

Este proyecto es una aplicación Remix modular desplegada en Cloudflare Workers. Utiliza una arquitectura de monorepo para gestionar múltiples módulos y un paquete compartido.

## Estructura del Proyecto

```
mk-modular-remix/
├── packages/
│   ├── host/               # Aplicación principal que integra los módulos
│   ├── modules/            # Directorio de módulos
│   │   ├── module1/       # Módulo de ejemplo 1
│   │   └── module2/       # Módulo de ejemplo 2
│   └── shared/            # Código compartido entre módulos
├── package.json           # Configuración del monorepo
└── pnpm-workspace.yaml    # Configuración del workspace
```

## Requisitos Previos

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Cuenta de Cloudflare (para despliegue)

## Configuración Inicial

1. Instalar dependencias:
```bash
pnpm install
```

2. Configurar variables de entorno:
- Crear archivo `.env` en el directorio raíz
- Agregar las siguientes variables:
  ```
  CF_API_TOKEN=tu_token_de_cloudflare
  CF_ACCOUNT_ID=tu_account_id
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

### Desarrollo Local

1. Construir todos los paquetes:
```bash
pnpm build
```

2. Iniciar el servidor de desarrollo:
```bash
cd packages/host
pnpm start
```

La aplicación estará disponible en http://localhost:8787

### Despliegue

#### Despliegue Automático (CI/CD)

El proyecto utiliza GitHub Actions para el despliegue automático. Cada push a la rama `main` desencadena:

1. Construcción de paquetes compartidos
2. Construcción de módulos
3. Despliegue a Cloudflare Workers

Requisitos:
- Configurar los siguientes secrets en GitHub:
  - `CF_API_TOKEN`
  - `CF_ACCOUNT_ID`

#### Despliegue Manual

Para desplegar manualmente:

```bash
# Construir todos los paquetes
pnpm build

# Desplegar a producción
cd packages/host
pnpm deploy:production
```

## Configuración de Cloudflare

El proyecto utiliza dos configuraciones de Wrangler:

1. `wrangler.toml` - Desarrollo local
2. `wrangler.production.toml` - Entorno de producción

Ambos archivos están configurados para servir assets estáticos desde el directorio `public`.

## Estructura de Módulos

### Host

La aplicación principal que integra todos los módulos. Configurada con:
- Remix
- Cloudflare Workers
- Tailwind CSS

### Módulos

Cada módulo es una aplicación Remix independiente que:
- Puede tener sus propias rutas y componentes
- Comparte código a través del paquete `shared`
- Se integra con la aplicación host

### Shared

Paquete compartido que contiene:
- Utilidades comunes
- Componentes reutilizables
- Tipos compartidos
- Middleware

## Scripts Disponibles

### Root
- `build`: Construye todos los paquetes
- `dev`: Inicia el entorno de desarrollo
- `lint`: Ejecuta el linter en todos los paquetes

### Host
- `build`: Construye la aplicación
- `start`: Inicia el servidor local
- `deploy:production`: Despliega a producción

### Módulos
- `build`: Construye el módulo
- `dev`: Inicia el servidor de desarrollo del módulo

## Contribución

Ver [CONTRIBUTING.md](CONTRIBUTING.md) para detalles sobre cómo contribuir al proyecto.

## Licencia

MIT
