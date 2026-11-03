# Urja Kaushal Data Model & Entity Relationship Specification

## 1. Domain Entities
The Urja Kaushal LMS domain model represents the complete lifecycle of rural clean energy training, certification, and livelihood placement across Jamnagar's 10 village clusters.

```mermaid
erDiagram
    HUB ||--o{ CLUSTER : contains
    CLUSTER ||--o{ LEARNER_PROFILE : resides_in
    HUB ||--o{ COHORT : hosts
    COHORT ||--o{ ENROLMENT : enrols
    USER ||--o| LEARNER_PROFILE : has
    USER ||--o{ SESSION : establishes
    USER ||--o{ AUDIT_LOG : generates
    
    PROGRAMME ||--o{ COURSE : contains
    COURSE ||--o{ MODULE : divides_into
    MODULE ||--o{ LESSON : comprises
    LESSON ||--o{ CONTENT_ITEM : delivers
    LESSON ||--o| MEDIA_MANIFEST : defines
    
    COURSE ||--o{ ASSESSMENT : evaluates
    ASSESSMENT ||--o{ QUESTION : includes
    LEARNER_PROFILE ||--o{ ATTEMPT : submits
    ATTEMPT ||--o{ ANSWER_RECORD : stores
    ATTEMPT ||--o{ PRACTICAL_SCORE : records
    ATTEMPT ||--o| RESULT : produces
    RESULT ||--o| CERTIFICATE : unlocks
    
    EMPLOYER ||--o{ JOB : posts
    JOB ||--o{ APPLICATION : receives
    LEARNER_PROFILE ||--o{ APPLICATION : applies
    
    SHG ||--o{ ENTERPRISE : operates
    LEARNER_PROFILE }o--o{ SHG : member_of
    HUB ||--o{ SOLAR_READING : records
    PROGRAMME ||--o{ SURVEY : evaluates
    LEARNER_PROFILE ||--o{ OUTCOME_RECORD : reports
```

## 2. Core Schemas & Attributes

### `User` & `LearnerProfile`
- `id`: string (UUID)
- `name`: string
- `phone`: string (masked by default, e.g., `+91 98*** **421`)
- `email`: optional string
- `role`: `'learner' | 'trainer' | 'coordinator' | 'assessor' | 'employer' | 'pm' | 'funder' | 'admin'`
- `language`: `'gu' | 'hi' | 'en'`
- `hubId`: string (reference to one of 10 clusters)
- `gender`: `'female' | 'male' | 'other' | 'prefer_not_to_say'`
- `education`: `'10th_pass' | '12th_pass' | 'iti' | 'diploma' | 'graduate' | 'other'`
- `shgMember`: boolean
- `shgName`: optional string
- `stipendEligible`: boolean
- `preferredTiming`: `'morning' | 'afternoon' | 'evening' | 'women_only'`
- `consentJobSharing`: boolean
- `consentEvaluation`: boolean
- `pin`: string (4-digit security PIN for shared devices)

### `Hub` & `Cluster`
- `id`: string (`hub_moti_khavdi`, `hub_rangpar`, etc.)
- `name`: string (e.g., "Moti Khavdi Solar Hub")
- `cluster`: string
- `lat`: number, `lng`: number
- `solarCapacityKW`: number (default: 25 kW)
- `annualTargetMWh`: number (default: 37.5 MWh)
- `status`: `'commissioned' | 'under_construction' | 'planned'`
- `currentCohort`: string

### `Course`, `Module`, `Lesson`
- `id`: string
- `stream`: `'A' | 'B' | 'C' | 'D'`
- `title`: { gu: string, hi: string, en: string }
- `description`: { gu: string, hi: string, en: string }
- `durationHours`: number (Solar Flagship = 600 hours)
- `nsqfLevel`: number (e.g., Level 4 Suryamitra)
- `modes`: `('audio' | 'video' | 'av')[]`

### `Assessment`, `Question`, `Certificate`
- `id`: string
- `type`: `'micro_check' | 'module_quiz' | 'practice_exam' | 'final_theory' | 'practical'`
- `passPercentage`: number (default 60%)
- `certificateEligible`: boolean
- `certId`: unique public verifiable hash (e.g., `UK-2026-MK-0842`)

