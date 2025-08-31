# 🤝 Contributing to OpenChess

Thank you for your interest in contributing to OpenChess! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Feature Requests](#feature-requests)
- [Questions and Discussions](#questions-and-discussions)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## 🚀 How Can I Contribute?

### 🐛 Bug Reports

- Use the [GitHub issue tracker](https://github.com/prateektomar123/openchess/issues)
- Include a clear and descriptive title
- Provide detailed steps to reproduce the bug
- Include browser/device information
- Add screenshots or videos if applicable

### 💡 Feature Requests

- Use the [GitHub issue tracker](https://github.com/prateektomar123/openchess/issues)
- Clearly describe the feature and its benefits
- Consider implementation complexity
- Discuss with maintainers before major features

### 🔧 Code Contributions

- Fork the repository
- Create a feature branch
- Make your changes
- Add tests if applicable
- Submit a pull request

### 📚 Documentation

- Improve README files
- Add code comments
- Create tutorials or guides
- Translate documentation

## 🛠️ Development Setup

### Prerequisites

- Node.js 16+
- npm or yarn
- Git

### Local Development

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/prateektomar123/openchess.git
   cd openchess
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**

   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Setup

Create a `.env.local` file for local development:

```env
REACT_APP_OPENROUTER_API_URL=https://openrouter.ai/api/v1
REACT_APP_DEFAULT_MODEL=openai/gpt-4o-mini
```

## 📝 Coding Standards

### JavaScript/React

- Use **ES6+** features
- Follow **React Hooks** best practices
- Use **functional components** when possible
- Implement **proper error handling**
- Add **PropTypes** or **TypeScript** for type safety

### CSS/Styling

- Use **CSS modules** or **styled-components**
- Follow **BEM methodology** for class naming
- Ensure **responsive design**
- Maintain **accessibility standards**

### Code Quality

- **ESLint** configuration is provided
- Run `npm run lint` to check code quality
- Run `npm run lint:fix` to auto-fix linting issues
- Ensure code builds successfully with `npm run build`

### File Naming

- **Components**: PascalCase (e.g., `ChessBoard.jsx`)
- **Utilities**: camelCase (e.g., `chessUtils.js`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `GAME_CONSTANTS.js`)
- **CSS**: kebab-case (e.g., `chess-board.css`)

## 📝 Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Commit Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```bash
feat: add custom AI model support
fix: resolve chess piece drag and drop issue
docs: update README with installation steps
style: format code with Prettier
refactor: simplify chess move validation logic
test: add unit tests for ChessGame component
chore: update dependencies to latest versions
```

## 🔄 Pull Request Process

### Before Submitting

1. **Check linting**: Run `npm run lint`
2. **Update documentation**: Update README if needed
3. **Test functionality**: Verify your changes work as expected
4. **Build locally**: Run `npm run build` to ensure no build errors

### PR Guidelines

1. **Clear title**: Descriptive and concise
2. **Detailed description**: Explain what and why, not how
3. **Related issues**: Link to relevant issues
4. **Screenshots**: Include for UI changes
5. **Testing**: Describe how to test your changes

### PR Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Performance improvement

## Testing

- [ ] Unit tests pass
- [ ] Manual testing completed
- [ ] Cross-browser testing done

## Screenshots (if applicable)

Add screenshots for UI changes

## Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
```

## 🐛 Reporting Bugs

### Bug Report Template

```markdown
## Bug Description

Clear and concise description of the bug

## Steps to Reproduce

1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior

What you expected to happen

## Actual Behavior

What actually happened

## Environment

- OS: [e.g., Windows 11, macOS 14.0]
- Browser: [e.g., Chrome 120, Firefox 121]
- Version: [e.g., 1.2.3]

## Additional Context

Any other context, screenshots, or logs
```

## 💡 Feature Requests

### Feature Request Template

```markdown
## Feature Description

Clear description of the requested feature

## Problem Statement

What problem does this feature solve?

## Proposed Solution

How should this feature work?

## Alternatives Considered

What other solutions were considered?

## Additional Context

Any other context or examples
```

## ❓ Questions and Discussions

- **GitHub Discussions**: Use the [Discussions](https://github.com/prateektomar123/openchess/discussions) tab
- **Issues**: For specific questions about issues
- **Pull Requests**: For questions about specific PRs

## 🏷️ Labels and Milestones

### Issue Labels

- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Improvements or additions to documentation
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed
- `priority: high`: High priority issues
- `priority: low`: Low priority issues

### Milestones

- **v1.0.0**: Initial release
- **v1.1.0**: Bug fixes and minor improvements
- **v1.2.0**: New features
- **v2.0.0**: Major version with breaking changes

## 🎯 Development Priorities

### High Priority

- Bug fixes and stability improvements
- Security updates
- Performance optimizations

### Medium Priority

- New features
- UI/UX improvements
- Documentation updates

### Low Priority

- Nice-to-have features
- Code refactoring
- Additional tests

## 📞 Getting Help

- **Maintainers**: @prateektomar123
- **Community**: Join our discussions
- **Documentation**: Check the README and code comments

## 🙏 Recognition

Contributors will be recognized in:

- Project README
- Release notes
- GitHub contributors page
- Project documentation

---

**Thank you for contributing to OpenChess! 🎉**

Your contributions help make this project better for everyone in the chess and AI communities.
