# Urja Kaushal Platform — Seeded Demo Accounts (Prototype Only)

> [!NOTE]
> All credentials listed below are purely fictional and intended for prototype evaluation and testing. No real identities, phone numbers, or passwords are used.

## 1. Quick One-Click Demo Personas (Available on Login Screen)
When `VITE_DEMO_MODE=true`, you can click any of these personas on the `/login` screen to instantly sign in without typing:

| Role | Persona Name | Cluster / Org | Default Mobile / Email | Passcode / OTP |
|---|---|---|---|---|
| **Learner (Flagship)** | Meera Ben Rathod | Moti Khavdi (Women SHG) | `+91 98765 43210` | OTP: `123456` |
| **Learner (Youth)** | Rahul Vaghela | Rangpar Cluster | `+91 98765 43211` | OTP: `123456` |
| **Trainer** | Amit Patel (Lead PV Trainer) | Jambuda Hub Lab | `trainer.jambuda@urjakaushal.org` | `demo1234` |
| **Coordinator** | Bhavna Ben Parmar | Danidhar Mobilisation | `coord.danidhar@urjakaushal.org` | `demo1234` |
| **Assessor** | Dr. R. K. Joshi | External SCGJ Assessor | `assessor.joshi@scgj-eval.mock` | `demo1234` |
| **Employer** | Reliance Solar EPC Partner | Jamnagar Giga Complex | `vendor.recruiter@solartech.mock` | `demo1234` |
| **Project Manager**| Sneha Sharma | Programme & M&E Lead | `pm.sneha@urjakaushal.org` | `demo1234` |
| **Funder Viewer** | Reliance Foundation Rep | CSR & Sustainability Review | `funder.csr@rf.mock` | `demo1234` |
| **Super Admin** | Platform Admin | System Operations | `admin@urjakaushal.org` | `demo1234` |

## 2. SMS Simulator Behaviour
For mobile numbers:
1. Entering any 10-digit Indian phone number triggers an on-screen simulated SMS notification pop-up.
2. The simulated OTP default is `123456` in development mode.
3. 3-attempt limit with 30-second cooldown on resend.

