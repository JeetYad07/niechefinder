# Technical Implementation Plan: NicheRadar High-Impact Features

## 1. Executive Summary
This document details the architectural changes, component additions, and step-by-step implementation plan for adding **Cold Pitch Generator**, **Tech Stack Recommender**, **Notion Exporter**, **Crowdsourced Pain Feed**, and **Newsletter Lead Capture** to NicheRadar.

---

## 2. Component Architecture Changes

```
src/
├── components/
│   ├── OutreachGeneratorModal.tsx    [NEW] Cold email & call script generator
│   ├── TechStackRecommender.tsx      [NEW] 14-day MVP stack helper
│   ├── CommunityPainFeed.tsx         [NEW] Crowdsourced pain points with upvotes
│   ├── NewsletterModal.tsx           [NEW] Lead capture popover
│   ├── AIProblemValidator.tsx        [MODIFY] Add outreach pitch & tech stack export
│   ├── ProblemDetailModal.tsx        [MODIFY] Add cold pitch tab & tech stack section
│   └── Navbar.tsx                    [MODIFY] Add Community Feed tab
├── data/
│   └── techStacks.ts                 [NEW] Curated stack configurations by category
├── utils/
│   ├── outreachGenerator.ts          [NEW] Algorithmic pitch script engine
│   └── notionExporter.ts             [NEW] Markdown formatting helpers
└── types.ts                          [MODIFY] Add types for PitchScript & CommunityPost
```

---

## 3. Detailed Component Specs

### 3.1 Outreach Generator (`src/components/OutreachGeneratorModal.tsx`)
- **State**: `selectedType: 'email' | 'call' | 'dm'`, `copied: boolean`
- **Output**:
  - **Cold Email**: 3 sentences focusing on pain point, current cost, and 15-minute quick call request.
  - **Cold Call Script**: Hook -> Pain check -> Permission to send 2-minute video demo.
  - **LinkedIn DM**: Casual 2-line direct message.

### 3.2 Tech Stack Recommender (`src/components/TechStackRecommender.tsx`)
- Categorized by project complexity:
  - **Weekend MVP**: Next.js + Tailwind + Supabase + Vercel
  - **Automated Workflow**: React + Node + Resend + Twilio + Stripe
  - **Data Scraping / AI**: Python + FastAPI + Chrome headless + BigQuery

### 3.3 Community Pain Feed (`src/components/CommunityPainFeed.tsx`)
- LocalStorage + Backend API persistence for crowd submissions.
- Filter by category, vote count, and estimated urgency rating.

---

## 4. Implementation Phasing

### Phase 1: Outreach Generator & Tech Stack Recommender
1. Create `src/utils/outreachGenerator.ts` to generate pitch text dynamically based on problem title, target buyer, and pain point.
2. Integrate Outreach Generator button into `ProblemDetailModal.tsx` and `AIProblemValidator.tsx`.
3. Create `src/data/techStacks.ts` and embed Tech Stack cards in blueprints.

### Phase 2: Notion Exporter & Lead Capture
1. Add `Notion Exporter` utility to format blueprints into Notion-friendly markdown blocks.
2. Add `NewsletterModal.tsx` triggered on 2nd problem inspection or shortlist save.

### Phase 3: Community Pain Feed
1. Build `CommunityPainFeed.tsx` with upvoting and proposal submission modal.
2. Integrate new `'community'` tab in `Navbar.tsx` and `App.tsx`.

---

## 5. Verification & Testing Plan
1. **Automated Build Check**: `npm run build` with zero TypeScript & Vite warnings.
2. **Mobile Responsiveness**: Test touch targets and modal layouts on 375px, 768px, and 1440px viewports.
3. **Clipboard Verification**: Verify copy feedback toasts for email pitch, call script, and Notion report.
