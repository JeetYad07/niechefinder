# NicheRadar - UX & Design Specification

## 1. UX Design Philosophy

NicheRadar's user interface is designed to evoke the precision and authority of an **investigative intelligence platform** for software founders. It replaces gimmicky ratings with evidence-backed clarity.

---

## 2. Visual Design System & Aesthetics

### 2.1 Color Palette
- **Background**: Deep obsidian dark (`#0a0a0a` / `bg-neutral-950`) with subtle radial glow highlights.
- **Card Surfaces**: Translucent glassmorphism (`bg-neutral-900/90`, `backdrop-blur-md`, `border-neutral-800`).
- **Primary Accent**: Warm Gold / Amber (`bg-amber-500`, `text-amber-400`) symbolizing high-value opportunity.
- **Evidence / Verified Accent**: Emerald Green (`bg-emerald-500/10`, `text-emerald-400`, `border-emerald-500/30`).
- **Warning / Kill Signal Accent**: Crimson Rose (`bg-rose-500/10`, `text-rose-400`, `border-rose-500/30`).
- **Typography**: Inter / Outfit sans-serif fonts; high contrast text hierarchy (`text-white`, `text-neutral-300`, `text-neutral-400`).

### 2.2 Visual Badges for Evidence Identification
Every data card and modal section must explicitly display one of two visual badges:

1. **`[Source Evidence]` Badge**:
   - Styling: Solid Emerald background pill with link icon (`bg-emerald-500/15 text-emerald-400 border border-emerald-500/30`).
   - Indicates raw data derived from verified customer quotes, Reddit links, G2 reviews, or filings.

2. **`[AI Analysis]` Badge**:
   - Styling: Translucent Amber background pill with sparkles icon (`bg-amber-500/15 text-amber-400 border border-amber-500/30`).
   - Indicates synthesized breakdowns or AI-assisted summaries.

---

## 3. The 7-Stage Founder Workflow UI

The top header / detail view includes an interactive **Progression Stepper**:

```
[1. Discover] ──▶ [2. Research] ──▶ [3. Evaluate] ──▶ [4. Validate] ──▶ [5. Experiment] ──▶ [6. Decide] ──▶ [7. Build]
```

### Stage UI Components:
- **Discover**: Problem Cards Grid with Category pills, search bar, and complexity filters.
- **Research**: Verbatim Evidence Log + Status Quo & Incumbent Gap breakdown.
- **Evaluate**: Financial Freedom Simulator + 14-Day MVP Scope Card.
- **Validate**: Prospect Interview Questions + **Riskiest Assumptions Checklist** + Invalidation Kill Triggers.
- **Experiment**: Cold Email / Phone / LinkedIn Script Copy Modal + Landing Page Lead Magnet Template.
- **Decide**: Validation Scorecard + `Proceed to MVP`, `Pivot Angle`, or `Kill Idea` decision buttons.
- **Build**: Recommended Tech Stack Blueprint + User Story Backlog Export.

---

## 4. Invalidation & Kill Signal UI

To prevent founders from wasting time on unviable ideas, the interface features a prominent **Idea Invalidation Warning Box**:

> [!CAUTION]
> **Kill Signal Criteria**:
> - If target buyers confirm they would only pay via one-off manual invoices under $20/mo → **Kill Idea**.
> - If 4 out of 5 interviewed prospects state they do not check email/SMS during business hours → **Pivot Channel**.

---

## 5. Responsive & Accessibility Standards

- **Touch Navigation**: All tab bars and category filter lists feature horizontal scroll with `scrollbar-none` and `cursor-pointer select-none`.
- **Contrast Ratios**: Exceeds WCAG AA guidelines with standard 4.5:1 text contrast ratio on dark backgrounds.
- **Screen Reader Support**: All interactive buttons include explicit `aria-label` attributes.
