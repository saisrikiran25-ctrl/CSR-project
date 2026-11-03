import { AuthSession } from './types';
import { DEMO_PERSONAS } from './demoPersonas';
import { db } from '../../lib/db';
import { Role } from '../../types';

const SESSION_STORAGE_KEY = 'urja_auth_session';

export class AuthService {
  private activeSession: AuthSession | null = null;
  private otpChallenges = new Map<string, { otp: string; expiresAt: number; attempts: number }>();

  constructor() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(SESSION_STORAGE_KEY);
      if (saved) {
        try {
          this.activeSession = JSON.parse(saved);
        } catch (e) {
          localStorage.removeItem(SESSION_STORAGE_KEY);
        }
      }
    }
  }

  public getSession(): AuthSession | null {
    if (!this.activeSession) return null;
    // Check access token expiry
    if (Date.now() > this.activeSession.expiresAt) {
      // Auto refresh simulation
      this.activeSession.expiresAt = Date.now() + 15 * 60 * 1000;
      this.saveSession(this.activeSession);
    }
    return this.activeSession;
  }

  private saveSession(session: AuthSession | null) {
    this.activeSession = session;
    if (typeof localStorage !== 'undefined') {
      if (session) {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
      } else {
        localStorage.removeItem(SESSION_STORAGE_KEY);
      }
    }
  }

  public async requestOtp(phone: string): Promise<{ success: boolean; simulatedOtp: string }> {
    // Artificial latency
    await new Promise(r => setTimeout(r, 400));
    
    const cleanPhone = phone.trim();
    const simulatedOtp = '123456';
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 mins

    this.otpChallenges.set(cleanPhone, {
      otp: simulatedOtp,
      expiresAt,
      attempts: 0,
    });

    // Dispatch simulated SMS event to window so toast can display it
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(
        new CustomEvent('urja_simulated_sms', {
          detail: {
            phone: cleanPhone,
            otp: simulatedOtp,
            message: `[Urja Kaushal / ઊર્જા કૌશલ્ય] Your login verification OTP is ${simulatedOtp}. Valid for 5 minutes. Do not share.`,
          },
        })
      );
    }

    return { success: true, simulatedOtp };
  }

  public async verifyOtp(phone: string, inputOtp: string): Promise<AuthSession> {
    await new Promise(r => setTimeout(r, 450));
    const challenge = this.otpChallenges.get(phone.trim());

    // In demo mode, accept 123456 regardless
    const isValid = inputOtp.trim() === '123456' || (challenge && challenge.otp === inputOtp.trim());

    if (!isValid) {
      if (challenge) challenge.attempts += 1;
      throw new Error('Invalid OTP. Please enter 123456 in demo mode.');
    }

    // In Node / non-browser test environment where IndexedDB is not polyfilled
    if (typeof indexedDB === 'undefined') {
      return this.loginAsPersona('user_learner_meera');
    }

    // Find or create learner
    let existingUser = await db.users.where('phone').equals(phone.trim()).first();
    if (!existingUser) {
      // Check if matches Meera or Rahul demo phone
      if (phone.includes('43210')) {
        return this.loginAsPersona('user_learner_meera');
      } else if (phone.includes('43211')) {
        return this.loginAsPersona('user_learner_rahul');
      }
      // Or create dynamic learner
      const newId = `user_${Date.now()}`;
      existingUser = {
        id: newId,
        name: `Learner (${phone.slice(-4)})`,
        phone: phone.trim(),
        role: 'learner',
        language: 'gu',
        createdAt: new Date().toISOString(),
      };
      await db.users.add(existingUser);
      await db.learnerProfiles.add({
        id: `profile_${newId}`,
        userId: newId,
        name: existingUser.name,
        gender: 'female',
        dob: '2000-01-01',
        education: '10th_pass',
        clusterId: 'Moti Khavdi',
        hubId: 'hub_moti_khavdi',
        cohortId: 'MK-Cohort-03',
        shgMember: false,
        stipendEligible: true,
        preferredTiming: 'morning',
        preferredMode: 'av',
        completedHours: 0,
        targetHours: 600,
        streakDays: 1,
        badges: [],
        consentJobSharing: true,
        consentEvaluation: true,
        isJobReady: false,
      });
    }

    const session: AuthSession = {
      accessToken: `mock_jwt_access_${Date.now()}`,
      refreshToken: `mock_jwt_refresh_${Date.now()}`,
      expiresAt: Date.now() + 15 * 60 * 1000,
      user: {
        id: existingUser.id,
        name: existingUser.name,
        phone: existingUser.phone,
        role: existingUser.role,
        language: existingUser.language || 'gu',
        hubId: existingUser.hubId || 'hub_moti_khavdi',
      },
    };

    this.saveSession(session);
    return session;
  }

  public async loginWithPassword(email: string, _passwordHash: string): Promise<AuthSession> {
    await new Promise(r => setTimeout(r, 400));
    const matchedPersona = DEMO_PERSONAS.find(p => p.identifier.toLowerCase() === email.toLowerCase());
    if (matchedPersona) {
      return this.loginAsPersona(matchedPersona.id);
    }
    // Generic fallback for staff
    const session: AuthSession = {
      accessToken: `mock_jwt_${Date.now()}`,
      refreshToken: `mock_refresh_${Date.now()}`,
      expiresAt: Date.now() + 15 * 60 * 1000,
      user: {
        id: `user_staff_${Date.now()}`,
        name: email.split('@')[0],
        email,
        role: 'trainer',
        language: 'en',
      },
    };
    this.saveSession(session);
    return session;
  }

  public async loginAsPersona(personaId: string): Promise<AuthSession> {
    await new Promise(r => setTimeout(r, 300));
    const persona = DEMO_PERSONAS.find(p => p.id === personaId);
    if (!persona) {
      throw new Error(`Persona not found: ${personaId}`);
    }

    let userHub = 'hub_moti_khavdi';
    if (persona.id === 'user_learner_rahul') userHub = 'hub_rangpar';
    if (persona.id === 'user_trainer_amit') userHub = 'hub_jambuda';
    if (persona.id === 'user_coord_bhavna') userHub = 'hub_danidhar';

    const session: AuthSession = {
      accessToken: `mock_jwt_${persona.id}_${Date.now()}`,
      refreshToken: `mock_refresh_${persona.id}`,
      expiresAt: Date.now() + 15 * 60 * 1000,
      user: {
        id: persona.id,
        name: persona.name,
        phone: persona.identifier.startsWith('+') ? persona.identifier : undefined,
        email: persona.identifier.includes('@') ? persona.identifier : undefined,
        role: persona.role,
        language: 'gu',
        hubId: userHub,
      },
    };

    this.saveSession(session);
    return session;
  }

  public async registerLearner(data: {
    name: string;
    phone: string;
    gender: 'female' | 'male' | 'other' | 'prefer_not_to_say';
    dob: string;
    education: any;
    cluster: string;
    hubId: string;
    timing: any;
    shgMember: boolean;
    shgName?: string;
    consentJobSharing: boolean;
  }): Promise<AuthSession> {
    await new Promise(r => setTimeout(r, 500));
    const userId = `user_${Date.now()}`;
    const newUser = {
      id: userId,
      name: data.name,
      phone: data.phone,
      role: 'learner' as Role,
      language: 'gu' as const,
      hubId: data.hubId,
      createdAt: new Date().toISOString(),
    };
    await db.users.add(newUser);

    await db.learnerProfiles.add({
      id: `profile_${userId}`,
      userId,
      name: data.name,
      gender: data.gender,
      dob: data.dob,
      education: data.education,
      clusterId: data.cluster,
      hubId: data.hubId,
      cohortId: `${data.cluster.slice(0, 2).toUpperCase()}-Cohort-01`,
      shgMember: data.shgMember,
      shgName: data.shgName,
      stipendEligible: true,
      preferredTiming: data.timing,
      preferredMode: 'av',
      completedHours: 0,
      targetHours: 600,
      streakDays: 1,
      badges: ['Welcome Pioneer'],
      consentJobSharing: data.consentJobSharing,
      consentEvaluation: true,
      isJobReady: false,
    });

    const session: AuthSession = {
      accessToken: `mock_jwt_${userId}`,
      refreshToken: `mock_refresh_${userId}`,
      expiresAt: Date.now() + 15 * 60 * 1000,
      user: {
        id: userId,
        name: data.name,
        phone: data.phone,
        role: 'learner',
        language: 'gu',
        hubId: data.hubId,
      },
    };

    this.saveSession(session);
    return session;
  }

  public logout(): void {
    this.saveSession(null);
  }
}

export const authService = new AuthService();
