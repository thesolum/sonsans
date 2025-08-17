# Security Guidelines for the sonsans Mobile Recipe Application

This document outlines mandatory security principles and practices tailored to the sonsans mobile recipe app built with React Native, Supabase, and external APIs. It embeds security by design, defense in depth, and least-privilege into every layer of the system.

## 1. Security by Design & Secure Defaults

- Adopt security early: integrate these guidelines into design, code reviews, and CI/CD pipelines.  
- Ship with secure defaults: enforce HTTPS everywhere, disable debug flags in production builds, and set strict permissions on storage and network access.

## 2. Authentication & Access Control

- **User Accounts & Passwords**  
  • Enforce strong passwords (minimum 12 characters with mixed case, numbers, symbols).  
  • Use Argon2 or bcrypt via Supabase Auth with per-user unique salts.  
  • Implement rate limiting on sign-in endpoints to block credential stuffing.

- **Session Management & JWT**  
  • Supabase issues short-lived JWTs (≤15 min) and refresh tokens bound to device ID.  
  • Validate exp, iat, and signature on each request.  
  • Revoke refresh tokens on password change or explicit sign-out.  
  • Protect tokens using Secure & HttpOnly storage (Keychain on iOS, Encrypted SharedPreferences on Android).

- **Role-Based Access Control (RBAC)**  
  • Define roles: `guest`, `user`, `admin`.  
  • Enforce server-side permission checks in Supabase policies for reads/writes.  
  • Deny by default; explicitly allow required operations per role.

- **Multi-Factor Authentication (MFA)** (future phase)  
  • Prepare for TOTP or SMS-based MFA for sensitive actions (e.g., profile changes).

## 3. Input Handling & Data Validation

- **Client & Server-Side Validation**  
  • Mirror validation logic: validate forms in React Native and re-validate in backend or API gateway.  
  • Reject malformed JSON or unexpected fields.

- **Prevent Injection Attacks**  
  • Use Supabase parameterized queries and ORM abstractions—never string-concatenate SQL.  
  • Sanitize any user-provided text before using in dynamic queries.

- **File Upload Security**  
  • If users can upload avatars, enforce type/size checks (e.g., JPEG/PNG ≤2 MB).  
  • Scan uploads with antivirus service and store them outside web-accessible buckets with restrictive ACLs.

## 4. Data Protection & Privacy

- **In Transit Encryption**  
  • Enforce TLS 1.2+ on all endpoints (Supabase, external recipe API).  
  • Pin certificates where feasible.

- **At Rest Encryption**  
  • Supabase database encryption at rest (managed).  
  • Encrypt sensitive local storage (e.g., cached favorites) using platform-provided encryption APIs.

- **Secrets Management**  
  • Do not hardcode API keys or tokens in source code.  
  • Use environment variables and secure vault (e.g., GitHub Secrets or CI secret store) for build-time injection.

- **Privacy & PII**  
  • Collect only necessary PII (email, name).  
  • Mask or truncate logs containing user identifiers.  
  • Provide a privacy policy and enable users to delete their data on request.

## 5. API & Service Security

- **HTTPS & CORS**  
  • Enforce HTTPS-only in app and backend.  
  • Configure CORS on Supabase REST endpoints to allow only official app origins.

- **Rate Limiting & Throttling**  
  • Implement per-user and global rate limits on critical APIs (search, auth) via API gateway or Cloudflare.

- **Least Privilege for API Keys**  
  • Scope external recipe API keys to read-only operations.  
  • Rotate keys periodically and on compromise.

- **Input Sanitization**  
  • Reject overly large payloads.  
  • Enforce request schemas (e.g., JSON Schema) and reject unexpected inputs.

## 6. Mobile-Specific Security Hygiene

- **OWASP Mobile Top 10**  
  • Address insecure storage, insufficient cryptography, and improper session handling.  
  • Regularly test against common mobile threats with dynamic analysis tools.

- **Secure Storage**  
  • Store tokens in Secure Enclave/Keychain on iOS, Encrypted SharedPreferences or Android Keystore.  
  • Avoid storing PII or secrets in AsyncStorage or plain files.

- **Code Protection**  
  • Obfuscate JavaScript bundle using Metro’s minification and optional code obfuscation tools.  
  • Disable remote debugging and developer menus in production.

- **Secure Config Flags**  
  • Build with `__DEV__ = false`.  
  • Remove unused or debug-only libraries from release builds.

## 7. Infrastructure & CI/CD Security

- **CI/CD Configuration**  
  • Use GitHub Actions with least-privilege runners and sealed secrets.  
  • Scan code with SAST tools (e.g., ESLint security plugins) on every pull request.

- **Dependency Management**  
  • Maintain lockfiles (`package-lock.json`).  
  • Run SCA tools (e.g., npm audit, Dependabot) to detect vulnerable packages.  
  • Review and approve updates to critical dependencies.

- **Server & Hosting Hardening**  
  • Rely on Supabase managed service (hardened by provider).  
  • If self-hosting any backend, disable unused ports/services and enforce firewall rules.

## 8. Monitoring, Logging & Incident Response

- **Secure Logging**  
  • Log authentication events, failed requests, and critical errors without exposing PII or secrets.  
  • Aggregate logs in a central SIEM or hosted service.

- **Real-Time Alerts**  
  • Alert on repeated failed logins, high error rates, or anomalous traffic spikes.

- **Incident Playbooks**  
  • Document roles, communication channels, and steps for containment and remediation.  
  • Practice periodic tabletop exercises.

## 9. Continuous Improvement

- Schedule regular penetration tests and code audits.  
- Stay current with security advisories for React Native, Expo, Supabase, and third-party libraries.  
- Review and update this guideline with each major release.

---

By following these guidelines, the sonsans team ensures a robust, secure, and privacy-respecting experience for all users, aligning with industry best practices and regulatory requirements.