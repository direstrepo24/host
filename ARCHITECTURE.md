# Architecture Overview

## System Architecture

### Monorepo Structure
The project is organized as a monorepo using pnpm workspaces with the following structure:

```
mk-modular-remix/
├── packages/
│   ├── host/           # Main application host
│   ├── shared/         # Shared components and utilities
│   └── modules/        # Individual feature modules
├── docs/              # Documentation
└── tools/             # Development and build tools
```

### Key Components

#### Host Application
- Serves as the main application container
- Handles module registration and lifecycle
- Manages routing and navigation
- Provides core services and utilities

#### Shared Components
- Reusable UI components
- Common utilities and helpers
- Shared types and interfaces
- Event system implementation

#### Modules
- Independent feature modules
- Self-contained business logic
- Module-specific components
- Isolated state management

### Communication
- Event-based communication between modules
- Typed events with schema validation
- Centralized event bus
- Asynchronous message handling

### Development Workflow
1. Module Development
   - Independent development
   - Local testing
   - Integration testing

2. Integration
   - Module registration
   - Event subscription
   - Route configuration

3. Deployment
   - Module bundling
   - Host application packaging
   - Cloudflare Workers deployment

## Technical Stack

### Frontend
- React
- Remix
- TypeScript
- Tailwind CSS

### Build & Development
- pnpm (Package Manager)
- Vite (Build Tool)
- Jest (Testing)
- ESLint & Prettier (Code Quality)

### Infrastructure
- Cloudflare Workers
- GitHub Actions (CI/CD)
- SonarQube (Code Quality)

## Security Considerations
- Module isolation
- Type safety
- Event validation
- Access control
