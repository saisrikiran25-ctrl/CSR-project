# Production Roadmap & Integration Guide (docs/production-roadmap.md)

This document outlines the step-by-step roadmap required to transition the Urja Kaushal prototype to a nationwide live deployment.

| Prototype Layer | Mock Implementation in Prototype | Production Replacement |
|---|---|---|
| **SMS OTP Gateway** | Simulated on-screen SMS toast with fixed default `123456` | Plivo / Gupshup / Twilio SMS gateway API integrated with DLT-registered Gujarati templates. |
| **Learner Identity & KYC** | Self-declared profile + 10th-pass dropdown | DigiLocker API / Aadhaar e-KYC (compliant with UIDAI offline paperless verification). |
| **National Accreditation** | Illustrative Suryamitra outline with sample watermark | Skill India Digital (SID) API sync & Sector Skill Council for Green Jobs (SCGJ) batch assessor sign-off. |
| **Content Delivery Network** | Programmatic SVG/Canvas explainers + Web Speech API | HLS adaptive video streams hosted on Cloudflare R2 / AWS CloudFront with Gujarat Edge POPs. |
| **Stipend Disbursal** | Simulated ₹1,500/month attendance flag | Direct Benefit Transfer (DBT) via PFMS (Public Financial Management System) or RazorpayX payout API. |
| **Data Protection & Privacy** | Client-side privacy toggles & masked phone numbers | Full compliance with Digital Personal Data Protection (DPDP) Act 2023, consent audit trails, and data localization. |
| **Solar Telemetry** | Seeded daily kWh generation per hub | Modbus / RS485 IoT inverters with GSM 4G dongles streaming to an MQTT / InfluxDB time-series backend. |

