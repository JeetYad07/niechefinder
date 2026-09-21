# NicheRadar - Product Requirements Document (PRD)

## 1. Product Vision & Core Purpose

### 1.1 Vision Statement
NicheRadar is the premier B2B problem discovery and validation platform. It empowers indie founders, micro-SaaS builders, and product strategists to investigate real-world business operational friction, gather verifiable market evidence, analyze status-quo workarounds, and validate commercial viability before writing a single line of code.

### 1.2 Core Product Idea
NicheRadar helps founders discover painful B2B operational problems, investigate evidence, understand existing alternatives, and validate whether a problem is worth building software for.

---

## 2. Non-Negotiable Product Principles

1. **Evidence Before Claims**: Every claim regarding market pain, ACV, or urgency must be grounded in raw customer evidence (forum complaints, regulatory filings, job postings, support tickets, G2/Capterra reviews).
2. **Never Fabricate Market Data**: System must never hallucinate market sizes, TAM figures, or willingness-to-pay numbers.
3. **Never Fabricate Competitors**: Only actual existing tools, manual workarounds (Excel, PDF, paper), or named market incumbents are presented.
4. **Never Fabricate Customer Quotes**: Quotes must be verbatim or labeled as synthesized summaries derived from cited sources.
5. **Clearly Distinguish Source Evidence from AI Inference**: Visual UI components must explicitly tag content as either **[Source Evidence]** (raw URL/data) or **[AI Analysis]** (structured breakdown).
6. **Avoid Fake Opportunity Scores**: Eliminate arbitrary numerical ratings (e.g., "9/10 Profit Score") that give false confidence. Replace with qualitative conviction signals and risk checklists.
7. **Help Users Validate and Kill Ideas Quickly**: Provide explicit "Idea Invalidation Rules" and kill criteria to prevent founders from wasting weeks on unviable projects.
8. **The User Makes the Final Business Decision**: NicheRadar acts as an intelligence partner and investigative assistant; it never makes definitive "build/don't build" declarations.

---

## 3. Target Product Workflow

The application guides founders through 7 structured progression stages:

```
[1. Discover] → [2. Research] → [3. Evaluate] → [4. Validate] → [5. Experiment] → [6. Decide] → [7. Build]
```

### Stage 1: Discover
- Browse curated, unsexy B2B operational problems sorted by industry (Trades, Logistics, Healthcare, Legal, Property Management).
- Filter by target buyer, compliance trigger, current status quo, and build complexity.
- Submit crowdsourced pain observations with optional link sources.

### Stage 2: Research
- Inspect raw customer evidence log (verbatim quotes, forum threads, directory listings).
- Review existing status-quo workarounds (manual spreadsheets, paper clipboards, SMS chains).
- Analyze incumbent gaps (why enterprise tools like Salesforce or Procore leave SMBs underserved).

### Stage 3: Evaluate
- Conduct financial feasibility checks using real buyer ACV benchmarks.
- Calculate customer acquisition economics ($50-$200/mo pricing models, client density needed to replace target MRR).
- Perform technical complexity assessment (MVP scope limited to 14 days).

### Stage 4: Validate
- Access structured Customer Discovery Interview Scripts tailored to target buyers.
- Define explicit **Riskiest Assumptions** and **Invalidation Triggers** (e.g., "If 4 out of 5 contractors refuse to use mobile web links, kill this project").
- Track prospect interview notes and responses.

### Stage 5: Experiment
- Generate targeted 3-sentence Cold Email, Cold Call, and LinkedIn outreach scripts.
- Setup quick landing page / waitlist lead magnet blueprints to measure buyer intent.

### Stage 6: Decide
- Review complete Validation Scorecard summarizing evidence count, interview feedback, and kill criteria signals.
- Mark decision: `Proceed to MVP`, `Pivot Angle`, or `Kill Idea`.

### Stage 7: Build
- View recommended 14-day tech stack blueprint (Frontend, DB, Auth, Payments, Automation).
- Export structured MVP product spec and user story checklist.

---

## 4. Key Functional Requirements

| ID | Feature Name | Description | Priority |
| :--- | :--- | :--- | :--- |
| **FR-01** | **Evidence Inspector** | Displays verbatim quotes, source URLs, and origin domain for every problem entry. | High (P0) |
| **FR-02** | **Source vs AI Badge** | Visual tagging on every card/modal distinguishing raw source data from AI inference. | High (P0) |
| **FR-03** | **7-Stage Workflow Navigation** | Stepper control tracking progress for saved problem investigations. | High (P0) |
| **FR-04** | **Idea Invalidation Matrix** | Checklist of riskiest assumptions and explicit kill criteria for every problem. | High (P0) |
| **FR-05** | **Cold Outreach Generator** | 3-sentence cold email, phone, and LinkedIn script generator with field overrides. | Medium (P1) |
| **FR-06** | **14-Day MVP Tech Stack** | Recommended technology blueprints categorized by problem type. | Medium (P1) |
| **FR-07** | **Founder Workspace & Sync** | Authenticated user project dashboard saving shortlists, notes, and decisions. | High (P0) |
