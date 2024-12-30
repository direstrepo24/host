# Testing Guide

Este documento describe la configuración y estrategias de pruebas para el proyecto Modular Remix.

## Configuración

### Jest y Testing Library

El proyecto utiliza Jest como framework de pruebas junto con Testing Library para pruebas de componentes React.

#### Estructura de Pruebas

```
packages/
  ├── shared/
  │   ├── src/
  │   └── __tests__/
  ├── host/
  │   ├── app/
  │   └── __tests__/
  └── modules/
      └── module1/
          ├── app/
          └── __tests__/
```

### Ejecutar Pruebas

```bash
# Ejecutar todas las pruebas
pnpm test

# Ejecutar pruebas con cobertura
pnpm test:coverage

# Ejecutar pruebas en modo watch
pnpm test:watch

# Ejecutar pruebas E2E
pnpm test:e2e
```

## Tipos de Pruebas

### 1. Pruebas Unitarias

Para componentes y funciones individuales:

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

### 2. Pruebas de Integración

Para interacciones entre componentes:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { NotificationSystem } from './NotificationSystem';

describe('NotificationSystem', () => {
  it('shows notification when event is published', () => {
    render(<NotificationSystem />);
    fireEvent.click(screen.getByText('Show Notification'));
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
```

### 3. Pruebas E2E

Usando Playwright para flujos completos:

```typescript
import { test, expect } from '@playwright/test';

test('complete user journey', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Login');
  await page.fill('[name=email]', 'user@example.com');
  await page.fill('[name=password]', 'password123');
  await page.click('button[type=submit]');
  await expect(page.locator('text=Dashboard')).toBeVisible();
});
```

## Cobertura de Código

Se requiere una cobertura mínima del 80% para:
- Líneas
- Funciones
- Ramas
- Declaraciones

## Mejores Prácticas

### 1. Nombrado de Pruebas

```typescript
describe('ComponentName', () => {
  it('should [expected behavior] when [condition]', () => {
    // ...
  });
});
```

### 2. Organización de Archivos

- Archivos de prueba junto al código: `Component.test.tsx`
- Utilidades de prueba en `__tests__/helpers`
- Mocks en `__tests__/mocks`

### 3. Mocks y Fixtures

```typescript
// __tests__/mocks/eventBus.ts
export const mockEventBus = {
  publish: jest.fn(),
  subscribe: jest.fn(),
};
```

### 4. Testing Library Queries (en orden de preferencia)

1. `getByRole`
2. `getByLabelText`
3. `getByPlaceholderText`
4. `getByText`
5. `getByDisplayValue`
6. `getByAltText`
7. `getByTitle`
8. `getByTestId`

## CI/CD Integration

Las pruebas se ejecutan automáticamente en:
- Pull Requests
- Push a main
- Deploy a producción

### Pipeline de Pruebas

1. Lint
2. Pruebas Unitarias
3. Pruebas de Integración
4. Pruebas E2E
5. Reporte de Cobertura

## Debugging

### Jest

```bash
# Debug una prueba específica
pnpm test --debug-brk path/to/test.ts

# Filtrar pruebas
pnpm test -t "test name pattern"
```

### Playwright

```bash
# Modo UI para debugging
pnpm playwright test --ui

# Grabar pruebas
pnpm playwright codegen
```

## Recursos

- [Jest Documentation](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)
- [Playwright](https://playwright.dev/)
- [Testing Library Cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet)
