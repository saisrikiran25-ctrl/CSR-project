import Dexie, { type Table } from 'dexie';
import {
  User,
  LearnerProfile,
  Hub,
  Course,
  Assessment,
  AssessmentAttempt,
  Certificate,
  Job,
  JobApplication,
  OutcomeRecord,
} from '../types';
import {
  SEEDED_HUBS,
  SEEDED_COURSES,
  SEEDED_CERTIFICATE,
  SEEDED_JOBS,
} from '../mocks/seedData';

export interface OfflineDownload {
  id: string;
  courseId: string;
  lessonId: string;
  title: string;
  downloadedAt: string;
  sizeMB: number;
  data: string; // serialized media/manifest
}

export interface ActivityLogItem {
  id: string;
  timestamp: string;
  userId: string;
  action: string;
  details?: string;
}

export class UrjaDatabase extends Dexie {
  users!: Table<User, string>;
  learnerProfiles!: Table<LearnerProfile, string>;
  hubs!: Table<Hub, string>;
  courses!: Table<Course, string>;
  assessments!: Table<Assessment, string>;
  attempts!: Table<AssessmentAttempt, string>;
  certificates!: Table<Certificate, string>;
  jobs!: Table<Job, string>;
  applications!: Table<JobApplication, string>;
  outcomes!: Table<OutcomeRecord, string>;
  downloads!: Table<OfflineDownload, string>;
  activityLogs!: Table<ActivityLogItem, string>;

  constructor() {
    super('UrjaKaushalDB');
    this.version(1).stores({
      users: 'id, role, phone, email',
      learnerProfiles: 'id, userId, clusterId, hubId, isJobReady',
      hubs: 'id, cluster, status',
      courses: 'id, stream, code',
      assessments: 'id, courseId, type',
      attempts: 'id, assessmentId, userId, passed',
      certificates: 'id, learnerId, courseId, status',
      jobs: 'id, cluster, employerId, isRelianceVendor',
      applications: 'id, jobId, learnerId, status',
      outcomes: 'id, learnerId, monthInterval',
      downloads: 'id, courseId, lessonId',
      activityLogs: 'id, timestamp, userId, action',
    });
  }

  async seedDefaults() {
    const hubCount = await this.hubs.count();
    if (hubCount === 0) {
      await this.hubs.bulkAdd(SEEDED_HUBS);
    }

    const courseCount = await this.courses.count();
    if (courseCount === 0) {
      await this.courses.bulkAdd(SEEDED_COURSES);
    }

    const jobCount = await this.jobs.count();
    if (jobCount === 0) {
      await this.jobs.bulkAdd(SEEDED_JOBS);
    }

    const certCount = await this.certificates.count();
    if (certCount === 0) {
      await this.certificates.add(SEEDED_CERTIFICATE);
    }

    const userCount = await this.users.count();
    if (userCount === 0) {
      // Seed flagship learner Meera
      await this.users.add({
        id: 'user_learner_meera',
        name: 'Meera Ben Rathod',
        phone: '+91 98765 43210',
        role: 'learner',
        language: 'gu',
        hubId: 'hub_moti_khavdi',
        createdAt: '2026-06-01',
      });

      await this.learnerProfiles.add({
        id: 'profile_meera',
        userId: 'user_learner_meera',
        name: 'Meera Ben Rathod',
        gender: 'female',
        dob: '2001-04-12',
        education: '10th_pass',
        clusterId: 'Moti Khavdi',
        hubId: 'hub_moti_khavdi',
        cohortId: 'MK-Cohort-03 (Women Batch)',
        shgMember: true,
        shgName: 'Radhe Krishna Sakhi Mandal',
        stipendEligible: true,
        preferredTiming: 'women_only',
        preferredMode: 'av',
        completedHours: 580,
        targetHours: 600,
        streakDays: 14,
        badges: ['Safety First', 'First Install', 'Wiring Specialist', 'Women In Solar'],
        consentJobSharing: true,
        consentEvaluation: true,
        isJobReady: true,
        bio: 'Moti Khavdi village resident keen on rooftop solar installations and agri-produce solar dryers.',
        workPreferences: {
          location: 'Moti Khavdi / Jamnagar',
          shift: 'day',
          canTravel: true,
          type: 'job',
          expectedIncome: '₹14,000 - ₹18,000/mo',
        },
      });

      // Seed Learner Rahul
      await this.users.add({
        id: 'user_learner_rahul',
        name: 'Rahul Vaghela',
        phone: '+91 98765 43211',
        role: 'learner',
        language: 'gu',
        hubId: 'hub_rangpar',
        createdAt: '2026-08-15',
      });

      await this.learnerProfiles.add({
        id: 'profile_rahul',
        userId: 'user_learner_rahul',
        name: 'Rahul Vaghela',
        gender: 'male',
        dob: '2003-09-20',
        education: '12th_pass',
        clusterId: 'Rangpar',
        hubId: 'hub_rangpar',
        cohortId: 'RP-Cohort-01',
        shgMember: false,
        stipendEligible: true,
        preferredTiming: 'morning',
        preferredMode: 'video',
        completedHours: 120,
        targetHours: 600,
        streakDays: 4,
        badges: ['Safety First'],
        consentJobSharing: true,
        consentEvaluation: true,
        isJobReady: false,
      });
    }
  }

  async resetData() {
    await this.delete();
    await this.open();
    await this.seedDefaults();
  }
}

export const db = new UrjaDatabase();
// Automatically ensure initial seeds in browser environment
if (typeof indexedDB !== 'undefined') {
  db.seedDefaults().catch(err => console.error('Database seeding error:', err));
}
