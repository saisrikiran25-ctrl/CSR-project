import { Role, Language } from '../../types';

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  user: {
    id: string;
    name: string;
    phone?: string;
    email?: string;
    role: Role;
    language: Language;
    hubId?: string;
    avatarUrl?: string;
  };
}

export interface DemoPersona {
  id: string;
  name: string;
  role: Role;
  roleLabel: Record<Language, string>;
  identifier: string;
  badge: string;
  description: string;
}

