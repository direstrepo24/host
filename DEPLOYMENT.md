# Guía de Despliegue

Esta guía detalla el proceso de despliegue de la aplicación Remix modular en Cloudflare Workers.

## Requisitos Previos

1. **Cuenta de Cloudflare**
   - Cuenta activa en Cloudflare
   - Token de API con permisos de Workers
   - ID de la cuenta de Cloudflare

2. **Variables de Entorno**
   ```bash
   CF_API_TOKEN=tu_token_de_cloudflare
   CF_ACCOUNT_ID=tu_account_id
   ```

## Configuración de Wrangler

El proyecto utiliza dos configuraciones de Wrangler:

### 1. Desarrollo Local (`wrangler.toml`)

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
bucket = "public"
```

### 2. Producción (`wrangler.production.toml`)

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
bucket = "public"

[env.production]
name = "mk-modular-remix"
workers_dev = true
```

## Proceso de Despliegue

### Despliegue Manual

1. **Construir la Aplicación**
   ```bash
   # En la raíz del proyecto
   pnpm build
   ```

2. **Desplegar a Producción**
   ```bash
   cd packages/host
   pnpm deploy:production
   ```

3. **Desplegar a Staging (opcional)**
   ```bash
   cd packages/host
   pnpm deploy:staging
   ```

### Despliegue Automático (CI/CD)

El proyecto utiliza GitHub Actions para el despliegue automático.

1. **Configuración de Secrets**
   En GitHub, configurar:
   - `CF_API_TOKEN`
   - `CF_ACCOUNT_ID`

2. **Flujo de CI/CD**
   - Push a `main` inicia el despliegue automático
   - El workflow ejecuta:
     1. Instalación de dependencias
     2. Construcción de paquetes
     3. Despliegue a Cloudflare Workers

### Scripts de Despliegue

En `packages/host/package.json`:
```json
{
  "scripts": {
    "build": "remix build",
    "deploy": "pnpm run build && wrangler deploy --config wrangler.production.toml",
    "deploy:staging": "pnpm run build && wrangler deploy",
    "deploy:production": "pnpm run build && wrangler deploy --config wrangler.production.toml --env production"
  }
}
```

## Verificación del Despliegue

1. **Verificar Assets Estáticos**
   - Confirmar que los estilos se cargan correctamente
   - Verificar que los scripts JavaScript se ejecutan
   - Comprobar que las imágenes y otros recursos se muestran

2. **Verificar Funcionalidad**
   - Probar la navegación entre módulos
   - Verificar el sistema de eventos
   - Comprobar las notificaciones

3. **Monitoreo**
   - Revisar los logs en Cloudflare Dashboard
   - Verificar métricas de rendimiento
   - Monitorear errores y excepciones

## Solución de Problemas

### Assets No se Cargan

1. Verificar la configuración del bucket:
   - Debe ser `bucket = "public"` en ambos archivos wrangler
   - Los assets deben estar en el directorio `public`

2. Verificar la construcción:
   - Ejecutar `pnpm build` en la raíz
   - Confirmar que los assets se generan en `packages/host/public`

### Errores de Despliegue

1. **Error de Autenticación**
   - Verificar `CF_API_TOKEN`
   - Confirmar permisos del token

2. **Error de Construcción**
   - Limpiar caché: `pnpm clean`
   - Reconstruir: `pnpm build`

3. **Error de Workers**
   - Verificar límites de Workers
   - Revisar logs en Cloudflare

## Mejores Prácticas

1. **Versionado**
   - Usar tags para releases
   - Seguir versionado semántico
   - Documentar cambios en CHANGELOG.md

2. **Seguridad**
   - No exponer tokens o secretos
   - Usar variables de entorno
   - Revisar permisos mínimos necesarios

3. **Optimización**
   - Minimizar tamaño de assets
   - Implementar caching efectivo
   - Monitorear rendimiento

## Rollback

En caso de necesitar revertir un despliegue:

1. **Revertir en Git**
   ```bash
   git revert HEAD
   git push
   ```

2. **Despliegue Manual de Versión Anterior**
   ```bash
   git checkout <version-anterior>
   pnpm build
   cd packages/host
   pnpm deploy:production
   ```

## Entornos

### Desarrollo
- URL: http://localhost:8787
- Configuración: `wrangler.toml`
- Comando: `pnpm start`

### Staging
- URL: Proporcionada por Cloudflare
- Configuración: `wrangler.toml`
- Comando: `pnpm deploy:staging`

### Producción
- URL: Proporcionada por Cloudflare
- Configuración: `wrangler.production.toml`
- Comando: `pnpm deploy:production`
