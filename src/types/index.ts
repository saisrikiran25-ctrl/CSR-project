export type Role =
  | 'learner'
  | 'trainer'
  | 'coordinator'
  | 'assessor'
  | 'employer'
  | 'pm'
  | 'funder'
  | 'admin';

export type Language = 'gu' | 'hi' | 'en';

export interface User {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  role: Role;
  language: Language;
  avatarUrl?: string;
  hubId?: string;
  pin?: string;
  createdAt: string;
}

export interface LearnerProfile {
  id: string;
  userId: string;
  name: string;
  gender: 'female' | 'male' | 'other' | 'prefer_not_to_say';
  dob: string;
  education: '10th_pass' | '12th_pass' | 'iti' | 'diploma' | 'graduate' | 'other';
  clusterId: string;
  hubId: string;
  cohortId: string;
  shgMember: boolean;
  shgName?: string;
  stipendEligible: boolean;
  preferredTiming: 'morning' | 'afternoon' | 'evening' | 'women_only';
  preferredMode: 'audio' | 'video' | 'av';
  completedHours: number;
  targetHours: number;
  streakDays: number;
  badges: string[];
  consentJobSharing: boolean;
  consentEvaluation: boolean;
  isJobReady: boolean;
  bio?: string;
  workPreferences?: {
    location: string;
    shift: string;
    canTravel: boolean;
    type: 'apprenticeship' | 'job' | 'self_employed';
    expectedIncome: string;
  };
  outcomeHistory?: OutcomeRecord[];
}

export interface Hub {
  id: string;
  name: string;
  cluster: string;
  panchayatOrSchool: string;
  lat: number;
  lng: number;
  solarCapacityKW: number;
  annualTargetMWh: number;
  currentCohortName: string;
  status: 'commissioned' | 'under_construction' | 'planned';
  liveSolarKW: number;
  todayGenKWh: number;
  monthGenKWh: number;
  totalGenMWh: number;
  co2AvoidedTons: number;
  enrolledLearners: number;
  womenPercentage: number;
  placementRate: number;
}

export type CourseStream = 'A' | 'B' | 'C' | 'D';

export interface Course {
  id: string;
  stream: CourseStream;
  code: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  durationHours: number;
  nsqfLevel?: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  isFlagship?: boolean;
  isWomenCentric?: boolean;
  modulesCount: number;
  lessonsCount: number;
  thumbnail: string;
  modules: Module[];
}

export interface Module {
  id: string;
  courseId: string;
  order: number;
  title: Record<Language, string>;
  description: Record<Language, string>;
  durationHours: number;
  lessons: Lesson[];
}

export type MediaMode = 'audio' | 'video' | 'av';

export interface CuePoint {
  timeSec: number;
  title: string;
  slideIndex: number;
  spokenHint?: string;
}

export interface MediaManifest {
  modes: MediaMode[];
  audioDurationSec: number;
  videoDurationSec?: number;
  cuePoints?: CuePoint[];
  sizeKB: {
    audio: number;
    video360: number;
    video720: number;
  };
}

export interface Lesson {
  id: string;
  moduleId: string;
  courseId: string;
  order: number;
  title: Record<Language, string>;
  summary: Record<Language, string>;
  durationMinutes: number;
  modes: MediaMode[];
  manifest: MediaManifest;
  transcript: Record<Language, string>;
  hasPractical: boolean;
  practicalChecklist?: string[];
  keyTerms?: Array<{ term: string; translation: Record<Language, string>; definition: Record<Language, string> }>;
}

export type QuestionType =
  | 'mcq_single'
  | 'mcq_multi'
  | 'true_false'
  | 'hotspot'
  | 'ordering'
  | 'numeric'
  | 'audio_prompt'
  | 'voice_viva';

export interface Question {
  id: string;
  courseId?: string;
  moduleId?: string;
  type: QuestionType;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  prompt: Record<Language, string>;
  audioPromptUrl?: string;
  options?: Array<{
    id: string;
    text: Record<Language, string>;
    isCorrect: boolean;
    image?: string;
  }>;
  correctOrder?: string[]; // for ordering
  numericTarget?: number;
  numericTolerance?: number;
  hotspotAreas?: Array<{
    id: string;
    label: Record<Language, string>;
    x: number;
    y: number;
    radius: number;
  }>;
  explanation: Record<Language, string>;
  points: number;
}

export interface Assessment {
  id: string;
  courseId: string;
  moduleId?: string;
  type: 'micro_check' | 'module_quiz' | 'practice_exam' | 'final_theory' | 'practical';
  title: Record<Language, string>;
  description: Record<Language, string>;
  durationMinutes: number;
  passPercentage: number;
  totalMarks: number;
  questionIds: string[];
  isFinalCertificateExam?: boolean;
}

export interface AssessmentAttempt {
  id: string;
  assessmentId: string;
  userId: string;
  startedAt: string;
  completedAt?: string;
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  answers: Record<string, any>;
  voiceRecordings?: Record<string, string>; // base64 or audio blob url
  feedback?: string;
  assessorId?: string;
}

export interface Certificate {
  id: string; // UK-2026-XXXX
  learnerId: string;
  learnerName: string;
  courseId: string;
  courseName: Record<Language, string>;
  hubId: string;
  hubName: string;
  cohort: string;
  completedHours: number;
  grade: 'Distinction' | 'First Class' | 'Pass';
  theoryScore: number;
  practicalScore: number;
  attendancePercentage: number;
  issueDate: string;
  expiryDate?: string;
  status: 'valid' | 'revoked' | 'pending';
  qrVerificationUrl: string;
  signatories: Array<{ name: string; title: string }>;
}

export interface Job {
  id: string;
  employerId: string;
  employerName: string;
  title: string;
  cluster: string;
  location: string;
  type: 'full_time' | 'apprenticeship' | 'contract';
  salaryMonthly: string;
  vacancies: number;
  requiredSkills: string[];
  minimumQualification: string;
  isRelianceVendor: boolean;
  postedDate: string;
  description: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  learnerId: string;
  appliedDate: string;
  status: 'applied' | 'shortlisted' | 'interview' | 'offered' | 'joined' | 'rejected';
  employerNotes?: string;
}

export interface OutcomeRecord {
  id: string;
  learnerId: string;
  monthInterval: 1 | 3 | 6;
  status: 'employed' | 'self_employed_enterprise' | 'further_education' | 'seeking_work';
  organizationOrBusinessName?: string;
  monthlyIncomeINR: number;
  verifiedByCoordinator: boolean;
  reportedAt: string;
}

export interface SolarReading {
  hubId: string;
  date: string;
  generationKWh: number;
  co2AvoidedKg: number;
  peakSunHours: number;
}

export interface SHGGroup {
  id: string;
  name: string;
  cluster: string;
  hubId: string;
  membersCount: number;
  solarInitiative: 'Solar Dehydration Dryer' | 'Solar Micro Irrigation' | 'Battery Charging Kiosk';
  grantSubsidyStatus: 'applied' | 'approved' | 'disbursed';
  grantAmountINR: number;
  monthlyRevenueINR: number;
}

