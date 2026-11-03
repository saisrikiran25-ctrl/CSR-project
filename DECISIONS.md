# Urja Kaushal Learning Platform (UK-LMS) — Architectural Decisions (DECISIONS.md)

This log records defaults, architectural choices, and trade-offs made during the development of the Urja Kaushal prototype.

## 1. Technical Stack Decisions
- **Framework**: React 18 + TypeScript + Vite for ultra-fast HMR, sub-200ms builds, and robust client-side routing.
- **Styling**: Tailwind CSS with custom CSS variables matching the "sunrise over village rooftop" design tokens:
  - Primary: Deep Solar Blue (`#1E3A8A` / `#0F2756`)
  - Accent: Sun Amber/Yellow (`#F59E0B` / `#D97706`)
  - Success: Leaf Green (`#10B981` / `#059669`)
  - Highlight: Terracotta/Coral (`#E11D48` / `#EA580C`)
  - Background: Warm Soft Cream (`#FAF8F5`) with Dark Mode support (`#0F172A`)
- **State & Local Storage**: Dexie.js (IndexedDB) + LocalStorage with a dedicated `MockAuthAdapter` and `MockApiService` to simulate realistic async network calls (300–700ms latency), network offline tolerance, and chaos mode toggle.
- **Client Routing**: React Router v6 with strict RBAC route guards (`Learner`, `Trainer`, `Coordinator`, `Assessor`, `Employer`, `ProjectManager`, `Funder`, `SuperAdmin`).
- **Icons**: Lucide React for consistent, accessible SVG icons.
- **Speech Synthesis**: Web Speech API (`speechSynthesis`) with multi-lingual voice detection (`gu-IN`, `hi-IN`, `en-IN`) and smart fallback text display.
- **Certification Engine**: Canvas-based high-DPI rendering + PNG/PDF export with embedded SVG/canvas QR codes resolving to the public standalone verification route `/verify/:certId`.
- **Media Engine**: Native HTML5 Audio/Video player + synchronized interactive SVG/Canvas explainer engine with JSON-based cue-points, audio-only data saver fallback, chapters, playback speed, and transcript highlighting.

## 2. Default Assumptions & Guardrails
- **Mock Honesty Guardrail**: Prominent banner and watermark "PROTOTYPE FOR PROPOSAL — MOCK DATA & SAMPLE CERTIFICATE ONLY. Not affiliated with live NSDC/MNRE/Reliance APIs".
- **Jamnagar Hub Locations**: 10 clusters (Moti Khavdi, Makaji Meghpar, Amrapur, Jambuda, Danidhar, Bhuchar Mori, Khijadiya, Keshiya, Vibhapar, Rangpar) seeded with coordinates around Jamnagar district.
- **Solar Calculations**: Baseline rooftop 25 kW per hub × 10 = 250 kW total. 375,000 kWh/year generating ~272.6 tonnes CO₂ avoided using the exact factor of `0.727 kg CO₂/kWh`.
- **Demo Mode**: `VITE_DEMO_MODE=true` enables instant persona login for all 8 roles and quick SMS OTP simulator (fixed default OTP `123456`).
- **Shared Device Support**: Multi-profile switcher on single device with 4-digit PIN protection.
- **Language Codes**: `gu` (ગુજરાતી), `hi` (हिन्दी), `en` (English) with seamless instant switcher in navigation.

