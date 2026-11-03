# Urja Kaushal — Content Authoring Guide (docs/content-guide.md)

This guide explains how curriculum designers, trainers, and translators can add new vocational learning modules to the platform.

## 1. Adding a Course
Courses reside in `src/mocks/seedData.ts` under `SEEDED_COURSES`.
Each course requires:
- `id`: unique string slug (e.g. `course_solar_flagship_600h`)
- `stream`: `'A' | 'B' | 'C' | 'D'`
- `title` & `description`: Trilingual objects (`gu`, `hi`, `en`)
- `durationHours`: vocational hour budget (Flagship sums to 600 hours)
- `nsqfLevel`: NSQF vocational alignment level (e.g., Level 4)

## 2. Adding a Lesson with Tri-Modal Media
Each lesson declares support for `'audio'`, `'video'`, and `'av'` (interactive diagram) modes:
```typescript
{
  id: 'les_3_1_wiring_sim',
  moduleId: 'mod_3_series_parallel',
  order: 1,
  title: {
    gu: '૩.૧ સિરીઝ અને સમાંતર વાયરિંગ સિમ્યુલેશન',
    hi: '३.१ सीरीज और पैरेलल वायरिंग सिमुलेशन',
    en: '3.1 Interactive Wiring Simulator',
  },
  modes: ['audio', 'video', 'av'],
  manifest: {
    modes: ['audio', 'video', 'av'],
    audioDurationSec: 420,
    cuePoints: [
      { timeSec: 0, title: 'Concept Overview', slideIndex: 0 },
      { timeSec: 100, title: 'Wiring in Series', slideIndex: 1 },
      { timeSec: 220, title: 'Wiring in Parallel', slideIndex: 2 },
    ],
    sizeKB: { audio: 1600, video360: 6200, video720: 18000 },
  },
  transcript: {
    gu: '...',
    hi: '...',
    en: '...',
  },
  hasPractical: true,
  practicalChecklist: [
    'Inspect rubber glove voltage rating',
    'Verify ladder 4:1 slope angle',
  ],
}
```

## 3. Adding Questions to Question Bank
Question types supported:
- `mcq_single` & `mcq_multi`
- `numeric` (with target value and tolerance, e.g. 0.727 kg CO2/kWh calculation)
- `hotspot` (coordinates for component inspection on PV schematics)
- `ordering` (step sequencing for safe installation)
- `voice_viva` (audio recording answer for low-literacy inclusion)

## 4. Multi-lingual Translations
UI translation strings are externalized in `src/i18n/locales/`:
- `gu.json`: Gujarati
- `hi.json`: Hindi
- `en.json`: English

