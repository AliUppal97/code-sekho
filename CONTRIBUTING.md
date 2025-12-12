# Contributing to CodeSekho

Thank you for your interest in contributing to CodeSekho! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Code Standards](#code-standards)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/codesekho.git
   cd codesekho
   ```
3. **Add the upstream remote**:
   ```bash
   git remote add upstream https://github.com/original-owner/codesekho.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Create a branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Branch Naming Convention

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Test additions or changes
- `chore/` - Maintenance tasks
- `perf/` - Performance improvements

Examples:
- `feature/add-dark-mode`
- `fix/login-validation-error`
- `docs/update-api-documentation`

### Development Process

1. **Create your feature branch** from `main`:
   ```bash
   git checkout main
   git pull upstream main
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our code standards

3. **Test your changes**:
   ```bash
   npm run test
   npm run lint
   npm run type-check
   ```

4. **Commit your changes** using conventional commits (see below)

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Code style changes (formatting, missing semi-colons, etc.)
- `refactor`: Code refactoring without bug fixes or features
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Changes to build process or auxiliary tools
- `ci`: Changes to CI configuration files and scripts

### Examples

```
feat(auth): add OAuth2 authentication

Implement Google and GitHub OAuth2 providers with NextAuth.js

Closes #123
```

```
fix(dashboard): resolve video player loading issue

The video player was not loading correctly on slow connections.
Added proper error handling and loading states.

Fixes #456
```

## Pull Request Process

1. **Update your branch** with the latest changes from `main`:
   ```bash
   git checkout main
   git pull upstream main
   git checkout feature/your-feature-name
   git rebase main
   ```

2. **Ensure all checks pass**:
   - All tests pass
   - Linting passes
   - Type checking passes
   - Build succeeds

3. **Write a clear PR description**:
   - What changes were made
   - Why the changes were necessary
   - How to test the changes
   - Screenshots (if UI changes)

4. **Link related issues** using keywords:
   - `Closes #123`
   - `Fixes #456`
   - `Relates to #789`

5. **Request review** from maintainers

6. **Address review feedback** promptly

## Code Standards

### TypeScript

- Use TypeScript for all new code
- Avoid `any` type - use proper types or `unknown`
- Use interfaces for object shapes
- Use type aliases for unions and intersections

### React/Next.js

- Use functional components with hooks
- Prefer Server Components when possible
- Use proper TypeScript types for props
- Follow Next.js 15 App Router conventions

### Styling

- Use Tailwind CSS utility classes
- Follow the design system in `src/components/ui`
- Ensure responsive design (mobile-first)
- Maintain accessibility standards (ARIA attributes)

### File Organization

- One component per file
- Use index files for barrel exports
- Group related files in directories
- Use descriptive file names

### Naming Conventions

- **Components**: PascalCase (`UserProfile.tsx`)
- **Files**: Match component name or kebab-case for utilities
- **Functions**: camelCase (`getUserData`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Types/Interfaces**: PascalCase (`UserProfile`)

## Testing

- Write tests for new features and bug fixes
- Aim for meaningful test coverage
- Use Vitest for unit tests
- Test user interactions, not implementation details

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Documentation

- Update README.md if needed
- Add JSDoc comments for complex functions
- Update CHANGELOG.md for user-facing changes
- Keep API documentation up to date

## Questions?

If you have questions, please:
- Open an issue for discussion
- Check existing issues and PRs
- Reach out to maintainers

Thank you for contributing to CodeSekho! 🚀

