# Security Policy

## Supported Versions

We provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of CodeSekho seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Please do NOT:

- Open a public GitHub issue
- Discuss the vulnerability publicly
- Share the vulnerability with others until it has been resolved

### Please DO:

1. **Email us directly** at: security@codesekho.com
   - Include a detailed description of the vulnerability
   - Include steps to reproduce the issue
   - Include potential impact assessment
   - Include any suggested fixes (if you have them)

2. **Wait for our response**:
   - We will acknowledge receipt within 48 hours
   - We will provide an initial assessment within 7 days
   - We will keep you updated on our progress

3. **Allow us time to fix**:
   - We will work to fix the issue as quickly as possible
   - We will notify you when the fix is ready
   - We will coordinate disclosure timing with you

### What to Expect

- **Acknowledgment**: We will confirm receipt of your report within 48 hours
- **Initial Assessment**: We will provide an initial assessment within 7 days
- **Updates**: We will keep you informed of our progress
- **Resolution**: We will work to resolve the issue promptly
- **Credit**: With your permission, we will credit you in our security advisories

### Security Best Practices

When using CodeSekho, please follow these security best practices:

1. **Keep dependencies updated**: Regularly update your dependencies
   ```bash
   npm audit
   npm audit fix
   ```

2. **Use environment variables**: Never commit secrets or API keys
   - Use `.env.local` for local development
   - Use secure secret management in production

3. **Enable security features**:
   - Use HTTPS in production
   - Enable Content Security Policy (CSP)
   - Use secure authentication methods

4. **Regular security audits**:
   ```bash
   npm audit
   ```

### Known Security Considerations

- **Environment Variables**: Always use environment variables for sensitive data
- **API Keys**: Never expose API keys in client-side code
- **Authentication**: Use secure authentication methods (OAuth2, JWT with proper expiration)
- **Input Validation**: Always validate and sanitize user input
- **Dependencies**: Keep all dependencies up to date

### Security Updates

Security updates will be:
- Released as patch versions (e.g., 1.0.1, 1.0.2)
- Documented in the CHANGELOG.md
- Announced via our security advisory system

### Thank You

We appreciate your help in keeping CodeSekho secure. Thank you for taking the time to report vulnerabilities responsibly.


