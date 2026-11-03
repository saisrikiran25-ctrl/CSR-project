# Mock Authentication System & Adapter Contract (docs/auth.md)

## 1. Architecture Overview
The Urja Kaushal prototype employs an interchangeable Authentication Architecture designed for drop-in replacement with production Identity Providers (such as Firebase Auth, Supabase, Keycloak, or custom OTP SMS gateways):

```
+-------------------------------------------------------------+
|                     React Application                       |
|         (useAuth Hook, ProtectedRoute, RouteGuard)          |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|                      AuthProvider Context                   |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|                  AuthService (Interface)                    |
|  - loginWithOtp(phone, otp)                                 |
|  - requestOtp(phone)                                        |
|  - loginWithPassword(email, password)                       |
|  - registerLearner(data)                                    |
|  - logout()                                                 |
|  - switchProfile(pin)                                       |
|  - getSession()                                             |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|                   MockAuthAdapter (Current)                 |
|  - Network latency simulation (300-800ms)                   |
|  - Chaos Mode (random simulated network error toggle)       |
|  - On-screen Simulated SMS Notification                     |
|  - Client-side SHA-256 password hashing simulation          |
|  - Fake JWT Access Token (15 min) + Refresh Token (7 days)  |
|  - Dexie / LocalStorage persistence                         |
+-------------------------------------------------------------+
```

## 2. Adapter Contract Definition (TypeScript)
```typescript
export interface AuthUser {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  role: 'learner' | 'trainer' | 'coordinator' | 'assessor' | 'employer' | 'pm' | 'funder' | 'admin';
  language: 'gu' | 'hi' | 'en';
  hubId?: string;
  avatarUrl?: string;
  pin?: string;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  user: AuthUser;
  deviceId: string;
}

export interface IAuthAdapter {
  requestOtp(phone: string): Promise<{ success: boolean; challengeId: string; simulatedOtp?: string }>;
  verifyOtp(challengeId: string, otp: string): Promise<AuthSession>;
  loginWithPassword(email: string, passwordHash: string): Promise<AuthSession>;
  registerLearner(registrationData: any): Promise<AuthSession>;
  refreshToken(refreshToken: string): Promise<AuthSession>;
  logout(): Promise<void>;
  getSession(): Promise<AuthSession | null>;
  switchProfile(targetUserId: string, pin: string): Promise<AuthSession>;
}
```

## 3. Production Migration Path
To swap the mock adapter for a live backend:
1. Implement `IAuthAdapter` connecting to your REST/GraphQL or Firebase/OAuth endpoints.
2. In `src/features/auth/authService.ts`, change the exported instance from `new MockAuthAdapter()` to `new ProductionAuthAdapter(baseUrl)`.
3. No React UI components require modification.

