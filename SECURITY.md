# 🔒 Security & Privacy

## Overview

OpenChess takes security seriously. As a frontend-only application, we've designed it to minimize security risks while providing a great user experience.

## How API Keys Are Handled

### Client-Side Storage Only

- **No server storage**: Your API keys never leave your browser
- **localStorage**: Keys are stored locally in your browser's localStorage
- **Session persistence**: Keys remain until you clear them or use incognito mode
- **No transmission**: We never send your keys to our servers

### Direct API Calls

```
Your Browser → AI Provider API
```

- All API calls are made directly from your browser to the AI provider
- No intermediate servers or proxies
- Your API keys are sent directly to the AI provider's servers

## Security Best Practices

### For Users

1. **Use dedicated API keys**: Create separate API keys for OpenChess
2. **Monitor usage**: Check your AI provider's dashboard for usage and costs
3. **Clear keys when done**: Use browser settings to clear localStorage
4. **Use HTTPS**: Always access OpenChess over HTTPS
5. **Keep keys private**: Never share your API keys with anyone

### For Developers

1. **No server-side keys**: Never store API keys on your server
2. **HTTPS only**: Always deploy over HTTPS
3. **CSP headers**: Content Security Policy headers are recommended
4. **Regular updates**: Keep dependencies updated
5. **Code review**: Review all changes for security implications

## Privacy Considerations

### Data Collection

- **Zero data collection**: We don't collect any personal information
- **No analytics**: No tracking or analytics by default
- **No cookies**: No cookies used for tracking
- **Anonymous usage**: All usage is completely anonymous

### What We Don't Store

- ❌ User email addresses
- ❌ Personal information
- ❌ API keys (they stay in your browser)
- ❌ Game history (stored locally)
- ❌ Usage statistics
- ❌ IP addresses

## Security Features

### Built-in Protections

- **HTTPS enforcement**: All connections must be HTTPS
- **CSP headers**: Content Security Policy prevents XSS attacks
- **No eval()**: No use of eval() or similar dangerous functions
- **Input validation**: All user inputs are validated
- **Error handling**: Secure error handling without information leakage

### Third-Party Dependencies

All dependencies are vetted and regularly updated:

- **chess.js**: Well-maintained chess logic library
- **react-chessboard**: Trusted React component
- **AI SDKs**: Official SDKs from AI providers
- **Vite**: Modern, secure build tool

## API Key Security

### Provider-Specific Security

- **OpenAI**: Uses secure token authentication
- **Anthropic**: Enterprise-grade security
- **Google AI**: OAuth 2.0 compliant
- **OpenRouter**: Unified secure access to multiple providers

### Key Management Best Practices

1. **Rate limiting**: Implement your own rate limiting in AI provider dashboards
2. **Cost monitoring**: Set up billing alerts with your AI providers
3. **Key rotation**: Rotate keys regularly for better security
4. **Access restrictions**: Limit API key access to specific services if possible

## Deployment Security

### Netlify Deployment

- **Automatic HTTPS**: Free SSL certificates
- **CDN distribution**: Global content delivery
- **Build security**: Isolated build environments
- **Access controls**: Repository-based access control

### Production Checklist

- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Dependencies updated
- [ ] No sensitive data in source code
- [ ] CSP headers set
- [ ] Regular security audits

## Incident Response

If you suspect a security issue:

1. **Stop using the affected API key**
2. **Generate a new key** from your AI provider
3. **Clear localStorage** in your browser
4. **Report issues** via GitHub issues
5. **Monitor your AI provider's usage** for unauthorized access

## Compliance

### GDPR Compliance

- **No personal data stored**: Fully compliant with GDPR
- **User control**: Users control all their data
- **Data minimization**: Zero data collection principle

### Privacy by Design

- **Privacy-first approach**: Security and privacy considered in all features
- **User consent**: Clear communication about data handling
- **Transparency**: Open source code for public review

## Contributing to Security

We welcome security contributions! Please:

- Report security vulnerabilities via GitHub issues (don't create public issues)
- Follow responsible disclosure practices
- Help improve our security documentation
- Contribute to security testing and code review

## Contact

For security concerns, please contact us through:

- GitHub Issues (for public discussions)
- GitHub Security tab (for private vulnerability reports)

---

**Remember**: With great AI power comes great responsibility. Always use API keys responsibly and monitor your usage! ⚠️
