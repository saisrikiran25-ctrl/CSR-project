# Urja Kaushal Platform — API Specification (/api/v1/...)

This document outlines the typed REST endpoints simulated client-side via the service adapter layer.

## 1. Authentication & Session (/api/v1/auth)
- `POST /api/v1/auth/otp/request`
  - Body: `{ phone: string }`
  - Returns: `{ success: boolean, challengeId: string, cooldownSec: number }`
- `POST /api/v1/auth/otp/verify`
  - Body: `{ phone: string, otp: string }`
  - Returns: `{ accessToken: string, refreshToken: string, expiresAt: number, user: AuthUser }`
- `POST /api/v1/auth/login`
  - Body: `{ email: string, passwordHash: string }`
  - Returns: `{ accessToken: string, refreshToken: string, user: AuthUser }`

## 2. Hubs & Telemetry (/api/v1/hubs)
- `GET /api/v1/hubs`
  - Returns: `Hub[]` (10 village clusters, coordinates, live kW, today kWh, MWh total, placement rate)
- `GET /api/v1/hubs/:hubId/telemetry`
  - Returns: `{ hubId, liveKW, todayGenKWh, co2AvoidedKg, inverterStatus: 'online' | 'tripped' }`

## 3. Courses & Media (/api/v1/courses)
- `GET /api/v1/courses`
  - Query params: `stream=A|B|C|D`, `level`, `lang=gu|hi|en`
  - Returns: `Course[]`
- `GET /api/v1/courses/:courseId/lessons/:lessonId/manifest`
  - Returns: `MediaManifest` (cuePoints, modes, audioDurationSec, sizeKB)

## 4. Assessment & Certification (/api/v1/assessments)
- `GET /api/v1/assessments/:assessmentId`
  - Returns: `Assessment` + sanitized question bank
- `POST /api/v1/assessments/:assessmentId/submit`
  - Body: `{ answers: Record<string, any>, voiceRecordings?: Record<string, string> }`
  - Returns: `AssessmentAttempt` (score, percentage, passed, recommendations)
- `GET /api/v1/certificates/:certId`
  - Public route (no auth required)
  - Returns: `Certificate` (learnerName, hub, completedHours, grade, qrVerificationUrl, status)

## 5. Jobs & Placement Tracer (/api/v1/jobs)
- `GET /api/v1/jobs`
  - Returns: `Job[]` (Reliance partner vacancies, cluster filter)
- `POST /api/v1/jobs/:jobId/apply`
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ applicationId: string, status: 'applied' }`
- `POST /api/v1/outcomes/tracer`
  - Body: `{ monthInterval: 1|3|6, status: 'employed'|'enterprise', monthlyIncomeINR: number }`
  - Returns: `{ success: true, updatedOutcomeRecord: OutcomeRecord }`

