# NicheRadar - Product Audit & Current State Analysis

## 1. Executive Summary
NicheRadar is currently an interactive Micro-SaaS idea catalog and AI validation prototype built with React 19, TypeScript, Vite, Tailwind CSS v4, and Node.js/Express. While visually polished with a high-contrast dark aesthetic, the current system functions primarily as a static directory with LLM generation shortcuts. 

To transform NicheRadar into a rigorous B2B problem discovery and validation platform, the product must pivot from **speculative AI generation** to **evidence-backed investigation** across a structured 7-stage founder workflow:
`Discover → Research → Evaluate → Validate → Experiment → Decide → Build`.

---

## 2. Technical & Architectural Audit

### 2.1 Frontend Architecture
- **Framework**: React 19 with Vite 8 and TypeScript.
- **Styling**: Tailwind CSS v4 with custom glassmorphism utilities (`glass-card`, `glass-header`).
- **Routing**: Monolithic Single-Page Application (SPA) without client-side routing. Navigation is handled via React state (`activeTab: 'problems' | 'ai-validator' | 'community' | 'calculator' | 'framework' | 'saved'`).
- **Issues**:
  - No URL state (users cannot bookmark or share `/problems/:id`).
  - Heavy single bundle (`~463 kB`) due to lack of route-level code splitting.

### 2.2 Component Hierarchy & Responsibilities
- `App.tsx`: Central coordinator managing active tab, search queries, filters, modal toggles, shortlist state, and Auth gate.
- `Navbar.tsx`: Sticky navigation header with search input, tab triggers, user badge, and logout.
- `AuthScreen.tsx`: Mandatory login gateway supporting Firebase Auth (Google 1-Click + Email/Password) and Demo login fallback.
- `ProblemCard.tsx` & `ProblemDetailModal.tsx`: Visual cards and modal breakdowns for curated B2B problems.
- `AIProblemValidator.tsx`: Dual-purpose view for prompt-based idea validation and generator.
- `CommunityPainFeed.tsx`: Crowdsourced pain feed with upvoting and proposal modal.
- `RevenueCalculator.tsx` & `FrameworkGuide.tsx`: Static financial model simulator and 5-point validation text guide.
- `OutreachGeneratorModal.tsx` & `TechStackRecommender.tsx`: Cold pitch templates and 14-day tech stack recommendations.

### 2.3 State Management & Data Flow
- Component state (`useState`, `useEffect`, React Context).
- **Persistence**: Relies exclusively on browser `localStorage`:
  - `nicheradar_saved_problems`
  - `nicheradar_auth_user`
  - `nicheradar_community_posts`
  - `nicheradar_subscribed_email`
- **Gaps**: Data is isolated to individual browsers; no cross-device sync or backend database persistence for user artifacts.

### 2.4 API & Backend Architecture
- Express server (`server.ts`) serving as both API host and static file server.
- Integrates Google GenAI SDK (`@google/genai`) targeting `gemini-3.8-flash` and `gemini-3.1-flash-lite`.
- Endpoints:
  - `GET /api/health`
  - `POST /api/ai/validate`
  - `POST /api/ai/generate-ideas`
- **Fallback Mechanism**: When API keys are absent or requests fail, `server.ts` and `aiFallback.ts` return pre-computed static JSON mock objects.

### 2.5 Data Model & Storage
- No database engine (PostgreSQL, Firestore, or MongoDB) is currently attached.
- Static dataset stored in [`src/data/problems.ts`](file:///Users/jeetyadav/Workspace/niechefinder/src/data/problems.ts) (`CURATED_PROBLEMS`).
- Schemas defined in [`src/types.ts`](file:///Users/jeetyadav/Workspace/niechefinder/src/types.ts) (`ProblemOpportunity`, `AIValidationResult`, `GeneratedProblemIdea`).

### 2.6 Dependencies
- Core: `react`, `react-dom`, `@google/genai`, `firebase`, `express`, `lucide-react`, `motion`, `dotenv`.
- Tooling: `vite`, `typescript`, `esbuild`, `tsx`, `tailwindcss`.

---

## 3. Product & UX Audit

### 3.1 Key Strengths (To Keep)
- **High Visual Impact**: Modern dark-mode UI with polished typography and micro-interactions.
- **B2B Operational Focus**: Target audience focuses on unsexy, high-margin business operational problems rather than low-ACV consumer apps.
- **Outreach & Tech Stack Blueprints**: Practical starter templates (3-sentence cold emails, 30-sec call scripts, 14-day MVP stacks).
- **Resilient Auth Layer**: Seamless Firebase Auth with instant 1-Click Demo fallback.

### 3.2 Product Deficiencies & Gimmicks (To Change / Delete)
- **Arbitrary AI Opportunity Scores**: Hardcoded ratings like `Urgency: 9/10` or `Willingness to Pay: 8/10` create false confidence without empirical grounding.
- **Unverified AI Hallucinations**: Prompt responses generate hypothetical competitor commentary and quotes without citation.
- **Lack of Evidence Traceability**: No links to real customer forum posts, Reddit complaints, regulatory filings, or G2 reviews.
- **No Invalidation Engine**: Lacks structured tools to help founders quickly test and **kill** unviable ideas before writing code.
- **Flat Catalog Structure**: Lacks progress tracking through the 7 validation stages (`Discover → Research → Evaluate → Validate → Experiment → Decide → Build`).

---

## 4. Technical Debt & Risk Matrix

| Risk / Debt Area | Impact Level | Description | Recommended Remediation |
| :--- | :--- | :--- | :--- |
| **Data Integrity** | High | LLM generates speculative numbers without source citations. | Require evidence links; explicitly label AI inference vs raw source evidence. |
| **No Routing** | Medium | Monolithic tab state prevents deep-linking and bookmarking. | Introduce React Router (or lightweight file-based route structure). |
| **Persistence** | High | User shortlists and custom research exist only in `localStorage`. | Attach persistent database (Firestore or PostgreSQL). |
| **Monolithic State** | Medium | `App.tsx` handles search, state, modals, and tabs. | Refactor into modular feature controllers and store hooks. |
