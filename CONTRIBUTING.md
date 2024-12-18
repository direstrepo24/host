# Guía de Contribución

## Desarrollo Local

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/mk-modular-remix.git
cd mk-modular-remix
```

2. Instalar dependencias:
```bash
pnpm install
```

3. Construir todos los paquetes:
```bash
pnpm build
```

4. Iniciar el servidor de desarrollo:
```bash
cd packages/host
pnpm start
```

## Estructura de Carpetas

```
mk-modular-remix/
├── packages/
│   ├── host/               # Aplicación principal
│   │   ├── app/           # Código fuente de la aplicación
│   │   ├── public/        # Assets estáticos
│   │   ├── wrangler.toml  # Configuración de desarrollo
│   │   └── wrangler.production.toml  # Configuración de producción
│   │
│   ├── modules/           # Módulos de la aplicación
│   │   ├── module1/      # Módulo de ejemplo 1
│   │   │   ├── app/     # Código fuente del módulo
│   │   │   └── public/  # Assets estáticos del módulo
│   │   └── module2/     # Módulo de ejemplo 2
│   │
│   └── shared/           # Código compartido
│       └── src/         # Utilidades, componentes y tipos compartidos
```

## Flujo de Trabajo

1. Crear una rama para tu feature:
```bash
git checkout -b feature/nombre-feature
```

2. Hacer commits con mensajes descriptivos siguiendo Conventional Commits:
```bash
git commit -m "feat: add new feature"
git commit -m "fix: resolve bug in module1"
```

3. Pushear los cambios y crear un Pull Request

## Convenciones de Código

- Usar TypeScript para todo el código
- Seguir el estilo de código existente
- Documentar funciones y componentes nuevos
- Agregar tests para nuevas funcionalidades

## Pruebas Locales

1. Construir y probar localmente:
```bash
pnpm build
cd packages/host
pnpm start
```

2. Verificar que los assets estáticos se cargan correctamente
3. Probar la integración con otros módulos

## CI/CD

El proyecto usa GitHub Actions para:
1. Construir todos los paquetes
2. Ejecutar pruebas
3. Desplegar a Cloudflare Workers

Asegúrate de que tu PR pase todas las verificaciones antes de solicitar revisión.

## Despliegue

### Desarrollo
```bash
cd packages/host
pnpm start
```

### Staging
```bash
cd packages/host
pnpm deploy:staging
```

### Producción
```bash
cd packages/host
pnpm deploy:production
```

## Problemas Comunes

### Assets Estáticos
- Asegúrate de que los assets estén en el directorio `public`
- Verifica la configuración de `wrangler.toml`

### Módulos
- Los módulos deben exportar sus rutas correctamente
- Usar el paquete `shared` para código común

## Recursos Adicionales

- [Documentación de Remix](https://remix.run/docs)
- [Documentación de Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [pnpm Workspaces](https://pnpm.io/workspaces)
