# NicheRadar - Database & Data Model Specification

## 1. Schema Overview

The NicheRadar data architecture models unsexy B2B problems, empirical evidence items, founder research workspaces, and validation experiments.

---

## 2. Collection Schemas

### 2.1 `problems` Collection
Main curated directory of unsexy B2B operational problems.

```typescript
export interface ProblemDocument {
  id: string; // e.g. "subcontractor-compliance-tracker"
  title: string; // e.g. "Subcontractor & Trade License Compliance Tracker"
  slug: string;
  category: 'Trades & Blue Collar' | 'B2B Operations' | 'E-commerce & Logistics' | 'Healthcare & Clinics' | 'Real Estate & Property' | 'Local Services' | 'Legal & Compliance';
  tagline: string;
  targetBuyer: string; // e.g. "General Contractors & Safety Managers"
  complexity: 'Weekend MVP' | '1-2 Weeks' | '2-3 Weeks' | '3-4 Weeks';
  
  // Financial & Operational Context (Grounded)
  pricingModel: 'Monthly SaaS' | 'Per Transaction' | 'Usage Base';
  estimatedACV: {
    low: number; // e.g. 600
    high: number; // e.g. 2400
    formatted: string; // "$50 - $200/month"
  };
  
  // Pain Breakdown
  bleedingNeck: string;
  statusQuo: string;
  whyIncumbentsIgnore: string;
  
  // Evidence Association
  evidenceCount: number;
  evidenceIds: string[];
  
  // Validation Framework
  riskiestAssumption: string;
  invalidationCriteria: string[];
  customerValidationQuestions: string[];
  mvpFeatureSet: string[];
  
  createdAt: string; // ISO 8601
  updatedAt: string;
}
```

### 2.2 `evidence_items` Collection
Raw, verifiable customer evidence supporting a problem entry.

```typescript
export interface EvidenceItemDocument {
  id: string;
  problemId: string;
  sourceType: 'forum_post' | 'g2_review' | 'reddit_thread' | 'regulatory_filing' | 'job_listing' | 'customer_interview';
  sourceUrl: string; // Direct link to raw source
  sourceTitle: string; // Thread / Page title
  verbatimQuote: string; // Exact customer quote
  authorRole?: string; // e.g. "HVAC Business Owner"
  publishedAt?: string;
  verifiedAt: string;
  isAIInferred: boolean; // MUST be false for raw evidence
}
```

### 2.3 `user_workspaces` Collection
Tracks founder progress across the 7 validation stages.

```typescript
export interface UserWorkspaceDocument {
  id: string; // user.uid + "_" + problemId
  userId: string;
  problemId: string;
  currentStage: 'discover' | 'research' | 'evaluate' | 'validate' | 'experiment' | 'decide' | 'build';
  stageStatus: {
    discover: 'completed' | 'in_progress';
    research: 'completed' | 'in_progress' | 'pending';
    evaluate: 'completed' | 'in_progress' | 'pending';
    validate: 'completed' | 'in_progress' | 'pending';
    experiment: 'completed' | 'in_progress' | 'pending';
    decide: 'completed' | 'in_progress' | 'pending';
    build: 'completed' | 'in_progress' | 'pending';
  };
  
  // Founder Validation Log
  interviewNotes: {
    id: string;
    prospectRole: string;
    date: string;
    keyTakeaway: string;
    willingnessToPayConfirmed: boolean;
  }[];
  
  invalidationChecklist: {
    assumption: string;
    status: 'unverified' | 'validated' | 'invalidated';
  }[];
  
  decision?: {
    status: 'proceed' | 'pivot' | 'killed';
    rationale: string;
    decidedAt: string;
  };
  
  updatedAt: string;
}
```

---

## 3. Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Read-only public collections
    match /problems/{problemId} {
      allow read: if true;
      allow write: if false;
    }
    match /evidence_items/{evidenceId} {
      allow read: if true;
      allow write: if false;
    }
    
    // User-owned workspace collections
    match /user_workspaces/{workspaceId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```
