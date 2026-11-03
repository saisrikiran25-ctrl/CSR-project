# Urja Kaushal Learning Platform (UK-LMS) — System Architecture

## 1. Overview
Urja Kaushal is the digital learning and livelihood layer supporting 10 solar village hubs in Jamnagar district, Gujarat. The platform supports low-literacy, multi-lingual rural learners (Gujarati, Hindi, English), with multi-modal learning (Audio-only, Video, and interactive Audio-Visual simulation), third-party assessment and certification, job placement linkage, enterprise toolkit for women SHGs, and full MIS tracking for programme staff and the funder (Reliance Foundation).

```
+-----------------------------------------------------------------------------------+
|                           Presentation Layer (PWA)                                |
|  - Learner Mobile Shell (Bottom Nav: Home, Learn, Tests, Jobs, Profile + Voice)   |
|  - Staff/Trainer/Coordinator/Assessor/Employer/PM/Funder Responsive Consoles       |
|  - Pitch Mode (/pitch) interactive walkthrough                                    |
|  - Standalone Verification Route (/verify/:certId) with QR Code                   |
+-----------------------------------------------------------------------------------+
                                      |
                                      v
+-----------------------------------------------------------------------------------+
|                        State & Domain Application Logic                           |
|  - AuthProvider & RBAC Guards (Learner, Trainer, Coordinator, Assessor, etc.)     |
|  - Multi-lingual i18n Engine (gu, hi, en) + Web Speech Audio Guidance             |
|  - Tri-Modal Course Player (Audio with chapters, Adaptive Video, Audio-Visual SVGs)|
|  - Assessment Engine (MCQ, Hotspot, Ordering, Viva/Voice, Practical Rubrics)      |
|  - Certification Engine (A4 Bilingual Canvas/PDF generation, QR Code hash)        |
+-----------------------------------------------------------------------------------+
                                      |
                                      v
+-----------------------------------------------------------------------------------+
|                         Mock Data & Storage Services                              |
|  - MockAuthAdapter (Mobile+OTP simulation, JWT-style access/refresh, sessions)    |
|  - MockApiService (REST-like endpoints with latency & offline queue)              |
|  - Dexie.js (IndexedDB) + LocalStorage (Offline downloads, Progress sync)          |
|  - Seed Data Generator (10 Jamnagar hubs, 120+ learners, 40+ lessons, 150+ Qs)    |
+-----------------------------------------------------------------------------------+
```

## 2. Security & Mock Guardrails
1. **Mock Notice**: Clear banner on all screens noting: *"Prototype for Proposal - Mock accounts and illustrative data. Not connected to live NSDC/MNRE/Reliance APIs"*.
2. **Bilingual Certificates**: Printed with watermark *"SAMPLE / PROTOTYPE - NOT AN OFFICIAL CERTIFICATE"*.
3. **Privacy by Default**: Masked phone numbers, private learner profiles, consent toggles for employer sharing.

