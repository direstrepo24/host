# Guía de Despliegue - Remix en Cloudflare Workers

Esta guía detalla el proceso de configuración y despliegue de la aplicación Remix tanto en ambiente local como en producción usando Cloudflare Workers.

## Requisitos Previos

- Node.js y pnpm instalados
- Cuenta en Cloudflare
- Wrangler CLI instalado (`npm install -g wrangler`)
- Autenticación en Wrangler (`wrangler login`)

## Configuración Inicial del Entorno

### 1. Instalación de Herramientas Globales
```bash
# Instalar Node.js (recomendado v18 o superior)
# Usando nvm (Node Version Manager)
nvm install 18
nvm use 18

# Instalar pnpm
npm install -g pnpm

# Instalar Wrangler CLI (herramienta de Cloudflare Workers)
npm install -g wrangler

# Autenticarse con Cloudflare
wrangler login
```

### 2. Configuración del Proyecto
```bash
# Instalar dependencias del proyecto
pnpm install

# Instalar dependencias específicas para Cloudflare Workers
pnpm add -D @cloudflare/workers-types
pnpm add @cloudflare/kv-asset-handler
pnpm add @remix-run/cloudflare @remix-run/react

# Instalar dependencias para desarrollo
pnpm add -D wrangler
```

### 3. Comandos Útiles

#### Desarrollo Local
```bash
# Iniciar servidor de desarrollo
pnpm start           # Inicia el servidor usando wrangler
# o
pnpm dev             # Inicia el servidor usando remix dev

# Limpiar caché y builds
rm -rf build public/build
pnpm clean           # Si está configurado en package.json

# Construir la aplicación
pnpm build

# Probar la build en local
pnpm start
```

#### Despliegue y Monitoreo
```bash
# Desplegar a producción
pnpm deploy:production

# Ver logs en tiempo real
wrangler tail mk-modular-remix

# Listar workers desplegados
wrangler workers list

# Ver información del worker
wrangler workers info mk-modular-remix

# Ver uso de recursos
wrangler workers usage mk-modular-remix
```

#### Debugging y Troubleshooting
```bash
# Ver logs detallados de wrangler
wrangler dev --log-level debug

# Verificar configuración de wrangler
wrangler config show

# Validar archivo wrangler.toml
wrangler config validate

# Limpiar caché de wrangler
wrangler cache clean
```

## Estructura de Archivos Clave

```
packages/host/
├── public/              # Archivos estáticos
│   └── build/          # Assets compilados
├── app/                # Código fuente de la aplicación
├── build/              # Build de producción
├── server.ts           # Configuración del servidor
├── wrangler.toml       # Configuración local
├── wrangler.production.toml  # Configuración de producción
└── package.json        # Scripts y dependencias
```

## Configuración de Archivos

### 1. server.ts
```typescript
import "./app/utils/node-polyfills";
import { logDevReady } from "@remix-run/cloudflare";
import { createRequestHandler } from "@remix-run/cloudflare";
import * as build from "@remix-run/dev/server-build";
import { getAssetFromKV } from "@cloudflare/kv-asset-handler";
import manifestJSON from "__STATIC_CONTENT_MANIFEST";

if (process.env.NODE_ENV === "development") {
  logDevReady(build);
}

const handleRequest = createRequestHandler(build);
const assetManifest = JSON.parse(manifestJSON);

export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext) {
    try {
      const url = new URL(request.url);
      if (url.pathname.startsWith("/build/")) {
        try {
          return await getAssetFromKV(
            {
              request,
              waitUntil: ctx.waitUntil.bind(ctx),
            },
            {
              ASSET_NAMESPACE: env.__STATIC_CONTENT,
              ASSET_MANIFEST: assetManifest,
              cacheControl: {
                browserTTL: 60 * 60 * 24 * 365, // 1 año
                edgeTTL: 60 * 60 * 24 * 365, // 1 año
              },
            }
          );
        } catch (error) {
          console.error("Error serving static asset:", error);
        }
      }

      const loadContext = {
        env,
        ctx,
      };
      
      return await handleRequest(request, loadContext);
    } catch (error) {
      console.error("Error handling request:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};
```

### 2. wrangler.toml (Desarrollo Local)
```toml
name = "mk-modular-remix"
main = "build/index.js"
compatibility_date = "2024-09-23"
compatibility_flags = ["nodejs_compat"]

[build]
command = "pnpm build"

[[build.upload]]
format = "modules"

[site]
bucket = "./public"
```

### 3. wrangler.production.toml
```toml
name = "mk-modular-remix"
main = "build/index.js"
compatibility_date = "2024-09-23"
compatibility_flags = ["nodejs_compat"]

[build]
command = "pnpm build"

[[build.upload]]
format = "modules"

[site]
bucket = "./public"

[env.production]
name = "mk-modular-remix"
workers_dev = true
```

### 4. package.json (Scripts relevantes)
```json
{
  "scripts": {
    "build": "remix build",
    "dev": "remix dev",
    "start": "wrangler dev",
    "deploy:production": "pnpm run build && wrangler deploy --config wrangler.production.toml --env production"
  }
}
```

## Despliegue Continuo (CI/CD)

### Configuración de GitHub Actions

El proyecto utiliza GitHub Actions para automatizar el proceso de construcción y despliegue. El workflow se encuentra en `.github/workflows/ci.yml`.

#### Secretos Necesarios

Configura estos secretos en tu repositorio de GitHub (Settings > Secrets and variables > Actions):

- `CF_API_TOKEN`: Token de API de Cloudflare
- `CF_ACCOUNT_ID`: ID de tu cuenta de Cloudflare

#### Pipeline CI/CD

El pipeline consta de dos jobs principales:

1. **Build**
   - Checkout del código
   - Configuración de Node.js y pnpm
   - Instalación de dependencias
   - Type checking
   - Build del proyecto
   - Cacheo de artefactos de build

2. **Deploy Production**
   - Se ejecuta solo en la rama main
   - Utiliza los artefactos cacheados del build
   - Despliega a Cloudflare Workers
   - Verifica el despliegue

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      # ... más pasos de build ...

  deploy-production:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
      # ... pasos de despliegue ...
```

### Flujo de Trabajo

1. **Desarrollo Local**
   ```bash
   git checkout -b feature/nueva-funcionalidad
   # Realizar cambios
   git commit -am "feat: nueva funcionalidad"
   git push origin feature/nueva-funcionalidad
   ```

2. **Pull Request**
   - Crear PR en GitHub
   - CI ejecutará build y tests
   - Review y aprobación

3. **Merge a Main**
   - Al hacer merge a main:
     - Se ejecuta el build
     - Se despliega automáticamente a producción
     - Se verifica el despliegue

4. **Verificación Post-Despliegue**
   - Revisar el estado del despliegue en GitHub Actions
   - Verificar la aplicación en https://mk-modular-remix.direstrepobr.workers.dev
   - Revisar logs en Cloudflare Dashboard

### Rollback

En caso de necesitar revertir un despliegue:

1. **Usando Git**
   ```bash
   git revert <commit-hash>
   git push origin main
   ```
   El pipeline se ejecutará automáticamente con los cambios revertidos.

2. **Usando Wrangler**
   ```bash
   # Ver versiones anteriores
   wrangler workers versions mk-modular-remix
   
   # Rollback a una versión específica
   wrangler workers rollback mk-modular-remix --version <version-id>
   ```

## Proceso de Desarrollo Local

1. **Instalación de Dependencias**
   ```bash
   pnpm install
   ```

2. **Iniciar el Servidor de Desarrollo**
   ```bash
   pnpm start
   ```
   Esto iniciará el servidor en http://localhost:8787

## Proceso de Despliegue a Producción

1. **Limpiar builds anteriores**
   ```bash
   rm -rf build public/build
   ```

2. **Construir la Aplicación**
   ```bash
   pnpm build
   ```

3. **Desplegar a Cloudflare Workers**
   ```bash
   pnpm deploy:production
   ```

4. **Verificar el Despliegue**
   La aplicación estará disponible en:
   https://mk-modular-remix.direstrepobr.workers.dev

## Dependencias Clave

```json
{
  "@cloudflare/kv-asset-handler": "^0.x.x",
  "@remix-run/cloudflare": "^2.x.x",
  "@remix-run/react": "^2.x.x"
}
```

## Solución de Problemas Comunes

1. **Error 404 en Assets**
   - Asegúrate de que la carpeta `public/build` existe y contiene los assets
   - Verifica la configuración de `site.bucket` en wrangler.toml
   - Confirma que el manejo de assets en server.ts está correctamente configurado

2. **Error de Polyfills**
   - Asegúrate de que los polyfills de Node.js están importados en server.ts
   - Verifica que `nodejs_compat` está habilitado en la configuración de wrangler

3. **Errores de Despliegue**
   - Limpia los builds anteriores antes de desplegar
   - Asegúrate de estar autenticado con `wrangler login`
   - Verifica que los nombres de los workers coincidan en la configuración

## Notas Importantes

- La configuración de `site.bucket` es crucial para el manejo correcto de assets estáticos
- Los polyfills son necesarios para compatibilidad con módulos de Node.js en Cloudflare Workers
- La caché está configurada para un año en producción para optimizar el rendimiento
- Se utiliza `getAssetFromKV` para servir eficientemente los assets estáticos

## Mantenimiento

- Regularmente actualiza las dependencias, especialmente las relacionadas con Remix y Cloudflare
- Monitorea el uso de recursos en el dashboard de Cloudflare
- Mantén respaldos de las configuraciones de despliegue
