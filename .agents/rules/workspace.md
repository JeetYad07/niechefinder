# NicheRadar Workspace Rules & AI Instructions

## 1. Product Integrity Principles
- **Evidence Before Claims**: Never output fabricated market data, fake opportunity scores, or ungrounded competitor claims.
- **Source Transparency**: Always visually distinguish raw source data (`[Source Evidence]`) from generated summaries (`[AI Analysis]`).
- **Do Not Fabricate Quotes or Competitors**: If specific competitor details or quotes are not provided or verified, label them as general status-quo workarounds.
- **Empower Founder Decisions**: The platform must help founders validate OR kill ideas quickly; never auto-declare a guaranteed winning business.

## 2. Code Quality & Architectural Rules
- **No Production Modifications Without Approval**: Do not alter core application logic or production components during audit/planning mode.
- **TypeScript Strictness**: Always maintain clean TypeScript interfaces with explicit types (avoid `any`).
- **Build Verification**: Every modification must pass `npm run build` with zero compilation errors and zero warnings.
- **Responsive Aesthetics**: Ensure all UI additions adhere to the modern dark-mode glassmorphism design system (`bg-neutral-950`, amber/emerald accents, touch-friendly scrollable filters).

## 3. Workflow Progression
- Align all feature additions with the 7-stage workflow: `Discover → Research → Evaluate → Validate → Experiment → Decide → Build`.
