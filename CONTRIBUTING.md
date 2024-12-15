# Contributing to Modular Remix Project

First off, thank you for considering contributing to our project! It's people like you that make this project such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## Development Process

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes following our commit message conventions
4. Push to your branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Branch Strategy

- `main`: Production branch
- `dev`: Development branch
- Feature branches: `feature/feature-name`
- Bug fix branches: `fix/bug-fix-name`

### Commit Message Format

We follow the conventional commits specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code
- refactor: A code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding missing tests or correcting existing tests
- chore: Changes to the build process or auxiliary tools

### Pull Request Process

1. Update the README.md with details of changes to the interface
2. Update the documentation with any necessary changes
3. The PR must pass all CI/CD checks
4. You must get at least one approval from a core team member

### Testing Requirements

- Write unit tests for new features
- Ensure all tests pass locally before pushing
- Maintain or improve code coverage
- Include both positive and negative test cases

## Development Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run the development server:
   ```bash
   pnpm dev
   ```

3. Run tests:
   ```bash
   pnpm test
   ```

## Style Guide

- Follow the existing code style
- Use Prettier for code formatting
- Follow TypeScript best practices
- Use meaningful variable and function names
- Write clear comments for complex logic

## Working with Modules

1. Each module should be self-contained
2. Use shared components from the shared package
3. Follow the established event system for inter-module communication
4. Maintain consistent styling using Tailwind CSS

## Questions or Problems?

Feel free to open an issue for:
- Bug reports
- Feature requests
- Help wanted
- Questions about the development process

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.
