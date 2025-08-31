# 🔒 Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for receiving such patches depends on the CVSS v3.0 Rating:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of OpenChess seriously. If you believe you have found a security vulnerability, please report it to us as described below.

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to [prateektomar123@gmail.com](mailto:prateektomar123@gmail.com).

You should receive a response within 48 hours. If for some reason you do not, please follow up via email to ensure we received your original message.

Please include the requested information listed below (as much as you can provide) to help us better understand the nature and scope of the possible issue:

### Required Information

- **Type of issue** (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- **Full paths of source file(s) related to the vulnerability**
- **The location of the affected source code** (tag/branch/commit or direct URL)
- **Any special configuration required to reproduce the issue**
- **Step-by-step instructions to reproduce the issue**
- **Proof-of-concept or exploit code** (if possible)
- **Impact of the issue**, including how an attacker might exploit it

### What to Expect

1. **Initial Response**: You will receive an acknowledgment within 48 hours
2. **Investigation**: Our security team will investigate the reported vulnerability
3. **Updates**: You will receive regular updates on the progress
4. **Resolution**: Once confirmed, we will work on a fix and coordinate disclosure

### Disclosure Policy

When we receive a security bug report, we will:

1. **Confirm the problem** and determine affected versions
2. **Audit code** to find any similar problems
3. **Prepare fixes** for all supported versions
4. **Release new versions** with the security fixes
5. **Publicly disclose** the vulnerability in our security advisories

### Security Advisories

Security advisories are published on our [GitHub Security Advisories](https://github.com/prateektomar123/openchess/security/advisories) page.

### Responsible Disclosure

We kindly ask that you:

- **Give us reasonable time** to respond to issues before any disclosure
- **Make a good faith effort** to avoid privacy violations, destruction of data, and interruption or degradation of our service
- **Not exploit** a security issue you discover for any reason
- **Not violate** any other applicable laws or regulations

### Security Best Practices

To help keep OpenChess secure, we recommend:

- **Keep dependencies updated** - Regularly update your project dependencies
- **Use HTTPS** - Always use HTTPS in production
- **Validate input** - Never trust user input
- **Follow OWASP guidelines** - Refer to [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- **Regular security audits** - Use tools like `npm audit` and `snyk`

### Security Tools

We use several tools to maintain security:

- **npm audit** - For dependency vulnerability scanning
- **Snyk** - For continuous security monitoring
- **GitHub Security** - For automated vulnerability detection
- **Lighthouse CI** - For security and best practices monitoring

### Security Contacts

- **Security Team**: [prateektomar123@gmail.com](mailto:prateektomar123@gmail.com)
- **Maintainers**: [@prateektomar123](https://github.com/prateektomar123)
- **PGP Key**: Available upon request for sensitive communications

### Bug Bounty

Currently, we do not offer a formal bug bounty program. However, we do recognize security researchers who responsibly disclose vulnerabilities in our [Security Hall of Fame](SECURITY_HALL_OF_FAME.md).

### Acknowledgments

We would like to thank the security researchers and community members who have responsibly disclosed vulnerabilities to us. Your contributions help make OpenChess more secure for everyone.

---

**Thank you for helping keep OpenChess secure! 🛡️**

By following these guidelines, we can work together to ensure the security and integrity of our open-source chess platform.
