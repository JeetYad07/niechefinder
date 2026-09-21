# NicheRadar - Execution Roadmap & Phase Breakdown

## Phase 1: Foundation & Audit Cleanup (Current Iteration)
- [x] Complete comprehensive codebase audit and repository analysis.
- [x] Author core product documentation (`PRODUCT_AUDIT.md`, `PRD.md`, `ARCHITECTURE.md`, `DATABASE.md`, `API.md`, `UX.md`, `ROADMAP.md`).
- [x] Configure workspace rules in `.agents/rules/workspace.md`.
- [ ] Remove speculative AI ratings ("Urgency 9/10", "Profit Score 8/10") and replace with evidence-based conviction metrics.
- [ ] Implement explicit `[Source Evidence]` vs `[AI Analysis]` visual badges across problem details.

## Phase 2: 7-Stage Workflow Navigation & Routing
- [ ] Implement client-side routing (`/`, `/problem/:id`, `/workspace`) to allow deep-linking.
- [ ] Create interactive **7-Stage Workflow Stepper** (`Discover → Research → Evaluate → Validate → Experiment → Decide → Build`).
- [ ] Build **Raw Evidence Inspector** displaying source URLs, verbatim quotes, and community complaints.

## Phase 3: Idea Invalidation & Founder Workspace
- [ ] Build **Idea Invalidation Matrix** (Riskiest Assumptions + Kill Criteria Checklist).
- [ ] Build **Customer Interview Tracker** allowing founders to record prospect feedback and willingness-to-pay signals.
- [ ] Add **Decision Gate Modal** (`Proceed to MVP`, `Pivot Angle`, `Kill Idea`) with rationale logging.
- [ ] Sync user workspace state to persistent storage (Firestore / LocalStorage fallback).

## Phase 4: Outreach & Tech Stack Integration
- [ ] Enhance **Outreach Pitch Generator** with customizable company tags and 1-click copy options.
- [ ] Integrate **14-Day MVP Tech Stack Builder** into the Build stage of problem investigation.

## Phase 5: Community & Ecosystem Expansion
- [ ] Refactor Crowdsourced Pain Feed to require source links for new submissions.
- [ ] Optimize bundle size via code-splitting and dynamic route imports.
- [ ] Final UI polish and mobile/tablet touch verification.
