# Urja Kaushal Learning Platform (UK-LMS) • ઊર્જા કૌશલ્ય

> **"Urja Kaushal turns clean energy into clean livelihoods, one village hub at a time."**  
> *A digital learning and livelihood layer for 10 solar village hubs across rural Jamnagar, Gujarat (Reliance Foundation CSR Proposal Prototype).*

---

## 1. Quick Start & Setup

Ensure you have Node.js 18+ installed.

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Run automated test suite (12 unit & integration tests)
npm test

# 4. Create production build
npm run build
```

The application will be live at `http://localhost:5173`.

---

## 2. 7-Minute Demo Walkthrough Script (For Stakeholders)

| Time | Screen / Route | Persona to Select | What to Demonstrate |
|---|---|---|---|
| **0:00 - 1:00** | `/pitch` | Public Guest | **The 8-Step Interactive Pitch Tour**: Walk Reliance Foundation reviewers through the 10 hubs, 6,000 beneficiaries (≥50% women), ₹9.5 Cr budget, 375 MWh solar generation, and 0.727 kg CO₂/kWh calculation. |
| **1:00 - 2:00** | `/login` | Learner (Meera) | **Mobile + Simulated SMS OTP**: Enter phone number `+91 98765 43210`. Observe the on-screen SMS notification banner appear. Tap "Autofill 123456" and sign in instantly. Show the instant 1-click persona switcher. |
| **2:00 - 3:30** | `/learn/course_solar_flagship_600h/les_1_1_ppe_intro` | Learner | **Tri-Modal Course Player**: Switch between **Audio-Only Podcast** (shows low data estimate ~1.2 MB), **Adaptive Video** (with live captions), and **Interactive AV Diagram**. In AV mode, click components on the schematic and use the **Series vs. Parallel Wiring Simulator** (showing Voc addition vs. Isc scaling). Test the **"🔊 Listen"** voice-read button in Gujarati/Hindi/English. |
| **3:30 - 4:30** | `/tests` | Learner | **Vocational Assessment & A4 Certificate**: Run an assessment featuring MCQ, Numeric calculation, Component Hotspots, and Ordering. Submit to view the competency breakdown and unlock the **verifiable A4 Landscape Certificate** with embedded QR code. |
| **4:30 - 5:15** | `/verify/UK-2026-MK-0842` | Public (Logged-Out) | **Standalone Fraud-Proof QR Verification**: Shows authentic verified credential with "SAMPLE / PROTOTYPE" watermark and third-party assessor signature. |
| **5:15 - 6:00** | `/enterprise` & `/jobs` | Learner | **Stream C & D Livelihoods**: Show the **SHG Solar Dehydrator Profit Calculator** (turning raw chillies/onions into dried spices generating ₹31,250/mo profit), and apply in one tap to Reliance vendor solar technician openings. |
| **6:00 - 7:00** | `/funder` & `/pm` | Funder / PM | **Executive Oversight**: Switch to the **Reliance Foundation Funder Dashboard**. Explore the interactive Jamnagar Cluster Map with 10 village pins, live telemetry, and the **Project Manager 36-month timeline & risk register**. |

---

## 3. Project Documentation Index

- [`DECISIONS.md`](./DECISIONS.md): Complete record of technical and architectural decisions.
- [`docs/architecture.md`](./docs/architecture.md): High-level system architecture and data flows.
- [`docs/auth.md`](./docs/auth.md): AuthProvider adapter contract and migration guide.
- [`docs/demo-accounts.md`](./docs/demo-accounts.md): All 9 seeded demo personas and credentials.
- [`docs/data-model.md`](./docs/data-model.md): Comprehensive Mermaid Entity-Relationship diagram.
- [`docs/api.md`](./docs/api.md): Typed REST API layer specification (`/api/v1/...`).
- [`docs/routes.md`](./docs/routes.md): Full screen and route map.
- [`docs/content-guide.md`](./docs/content-guide.md): Curriculum authoring for lessons, audio, and questions.
- [`docs/accessibility.md`](./docs/accessibility.md): WCAG 2.2 AA compliance, large touch targets, and voice guidance.
- [`docs/production-roadmap.md`](./docs/production-roadmap.md): Production replacement checklist for live deployment.
- [`docs/credits.md`](./docs/credits.md): Attributions and licenses.

