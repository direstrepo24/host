# Contributing to MK Modular Remix

## Branch Strategy

We follow a trunk-based development approach with the following branch structure:

```
main (production)
└── dev (development)
    ├── feature/feature-name
    ├── fix/bug-fix-name
    └── test/test-implementation
```

### Branch Naming Convention

- Feature branches: `feature/descriptive-feature-name`
- Bug fix branches: `fix/descriptive-bug-fix`
- Test implementation: `test/component-or-feature-name`

### Development Workflow

1. Create a new branch from `dev` for your work
2. Develop and test your changes
3. Create a Pull Request to `dev`
4. After review and approval, merge to `dev`
5. Periodic releases from `dev` to `main`

## Pull Request Process

1. Update the README.md with details of changes if needed
2. Update the documentation if you're changing functionality
3. Add or update tests as needed
4. Ensure all tests pass locally
5. Create a Pull Request with a clear description
6. Wait for review and address any comments
7. Merge only after approval and all checks pass

## Testing Requirements

All new features and bug fixes must include:

- Unit tests for new functionality
- Integration tests where appropriate
- E2E tests for major features
- Updated documentation

## Commit Message Format

We follow the conventional commits specification:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation only
- style: Code style changes
- refactor: Code changes that neither fixes a bug nor adds a feature
- test: Adding or updating tests
- chore: Maintenance tasks

## Project Structure

```
mk-modular-remix/
├── packages/
│   ├── host/           # Main application
│   ├── shared/         # Shared components and utilities
│   └── modules/        # Individual modules
│       ├── module1/
│       └── module2/
└── docs/              # Project documentation
```

## Development Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run tests:
   ```bash
   pnpm test
   ```

3. Start development server:
   ```bash
   pnpm dev
   ```

## Code Review Process

All submissions require review. We use GitHub pull requests for this purpose.

1. Create a pull request
2. Address review comments
3. Get approval from at least one maintainer
4. Ensure CI checks pass
5. Merge after approval

## Issue Management

- Use appropriate issue templates
- Label issues correctly
- Link PRs to relevant issues
- Update issue status as you work

## Documentation

- Update README.md for major changes
- Add JSDoc comments for new functions
- Update API documentation if needed
- Include examples for new features
