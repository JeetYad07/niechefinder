# NicheRadar - Target System Architecture

## 1. Architectural Overview

NicheRadar is structured as a decoupled full-stack web application built on **React 19**, **Vite**, **TypeScript**, **Tailwind CSS v4**, **Node.js/Express**, and **Firebase (Auth & Firestore)**.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Client Layer (Vite + React 19)                  │
│                                                                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │
│  │ Discover View│  │ Research View│  │ Evaluate View│  │Validate View│  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └─────┬──────┘  │
│         └─────────────────┼─────────────────┘                │         │
│                           ▼                                  ▼         │
│                     ┌───────────┐                      ┌───────────┐   │
│                     │ UI System │                      │ Workspace │   │
│                     └─────┬─────┘                      └─────┬─────┘   │
└───────────────────────────┼──────────────────────────────────┼─────────┘
                            │ REST / JSON                      │ SDK
                            ▼                                  ▼
┌───────────────────────────────────────────┐      ┌─────────────────────┐
│       Backend API Layer (Express.js)      │      │    Firebase Layer   │
│                                           │      │                     │
│  ┌───────────────┐     ┌───────────────┐  │      │  ┌───────────────┐  │
│  │ AI Analyst    │     │ Evidence Proxy│  │      │  │ Firebase Auth │  │
│  │ (Gemini 3.8)  │     │ & Scraper     │  │      │  └───────────────┘  │
│  └───────────────┘     └───────────────┘  │      │  ┌───────────────┐  │
└───────────────────────────────────────────┘      │  │ Firestore DB  │  │
                                                   │  └───────────────┘  │
                                                   └─────────────────────┘
```

---

## 2. Component Layer Architecture

### 2.1 Router & Page Structure
Transition from tab-based state to client-side routing (`React Router v6` or lightweight SPA router):
- `/`: Discovery Catalog & Problem Search
- `/problem/:id`: Problem Details & Evidence Inspector
- `/problem/:id/research`: Deep Research & Alternatives
- `/problem/:id/evaluate`: Unit Economics & Tech Stack
- `/problem/:id/validate`: Interview Scripts & Invalidation Matrix
- `/problem/:id/experiment`: Cold Outreach Generator
- `/workspace`: Founder Decision Dashboard (Saved Shortlists & Progress)

### 2.2 Modular State Management
- **Auth Store**: Firebase Auth observer via `AuthContext`.
- **Workspace Store**: Manages user shortlists, interview notes, and decision statuses backed by Firestore / LocalStorage sync.
- **Problem Catalog Store**: Filter, search, and pagination state for problem exploration.

---

## 3. Backend & API Services

### 3.1 Node.js / Express Gateway (`server.ts`)
- Serves static production assets from `dist/`.
- Routes `/api/ai/*` to the Gemini API (`@google/genai`).
- Implements resilient multi-model fallback (`gemini-3.8-flash` → `gemini-3.1-flash-lite`) with exponential backoff on 503/429 status codes.

### 3.2 AI Prompting & Grounding Guardrails
- System prompts are strictly instructed **never to fabricate source URLs, customer quotes, or numerical market data**.
- AI outputs are schemas-restricted JSON matching defined TypeScript interfaces.
- Responses must return a `confidenceNotice` flag if grounding data is missing or incomplete.

---

## 4. Security & Data Protection

- **Authentication**: Firebase Auth supporting Google OAuth 2.0 and Email/Password.
- **Data Access Rules**: Firestore security rules restrict workspace write access to `request.auth.uid == resource.data.userId`.
- **Environment Secrets**: API keys (`GEMINI_API_KEY`, Firebase config) managed via `.env` variables and server-side environment variables.
