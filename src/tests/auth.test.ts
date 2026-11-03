import { describe, it, expect, beforeEach } from 'vitest';
import { AuthService } from '../features/auth/authService';

describe('AuthService & OTP Simulation Unit Tests', () => {
  let auth: AuthService;

  beforeEach(() => {
    auth = new AuthService();
  });

  it('generates simulated OTP challenge and dispatches SMS event', async () => {
    const res = await auth.requestOtp('+91 98765 43210');
    expect(res.success).toBe(true);
    expect(res.simulatedOtp).toBe('123456');
  });

  it('successfully verifies default demo OTP and creates session', async () => {
    await auth.requestOtp('+91 98765 43210');
    const session = await auth.verifyOtp('+91 98765 43210', '123456');
    expect(session).toBeDefined();
    expect(session.accessToken).toContain('mock_jwt');
    expect(session.user).toBeDefined();
  });

  it('rejects invalid OTP with descriptive error', async () => {
    await auth.requestOtp('+91 98765 43210');
    await expect(auth.verifyOtp('+91 98765 43210', '999999')).rejects.toThrow(
      'Invalid OTP. Please enter 123456 in demo mode.'
    );
  });

  it('authenticates demo persona instantly with correct role', async () => {
    const session = await auth.loginAsPersona('user_trainer_amit');
    expect(session.user.role).toBe('trainer');
    expect(session.user.name).toContain('Amit Patel');
  });

  it('clears session on logout', async () => {
    await auth.loginAsPersona('user_learner_meera');
    expect(auth.getSession()).not.toBeNull();
    auth.logout();
    expect(auth.getSession()).toBeNull();
  });
});
