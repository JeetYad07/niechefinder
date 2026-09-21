# NicheRadar - API Reference Specification

## 1. Overview & Base URL
The NicheRadar API provides health monitoring, structured AI analysis, and evidence synthesis.

- **Base URL**: `http://localhost:3000/api` (Dev) / `https://<your-domain>/api` (Prod)
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer <Firebase_ID_Token>` (For protected routes)

---

## 2. Endpoints

### 2.1 Health Check
Check system readiness and Gemini API availability.

- **URL**: `GET /api/health`
- **Response**:
```json
{
  "status": "ok",
  "hasApiKey": true,
  "timestamp": "2026-09-21T12:30:00.000Z"
}
```

---

### 2.2 AI Idea Evaluator
Evaluates a user's proposed problem idea against unsexy B2B criteria.

- **URL**: `POST /api/ai/validate`
- **Request Body**:
```json
{
  "problemTitle": "Automated HVAC Warranty Claim Dispute Assistant",
  "industry": "Trades & Local Services",
  "targetAudience": "HVAC Shop Owners & Service Managers",
  "userBackground": "Full-stack React / Node developer"
}
```
- **Response**:
```json
{
  "success": true,
  "data": {
    "verdict": "High-conviction unsexy opportunity: Solving HVAC warranty dispute forms has strong WTP due to direct cash recovery.",
    "willingnessToPayReasoning": "Shop owners lose 3-5 hours weekly submitting paper warranty claims that get rejected over minor formatting codes.",
    "estimatedPricing": {
      "starter": "$49/mo (up to 20 claims)",
      "growth": "$149/mo (unlimited auto-filing)",
      "expectedLTV": "$1,200 per shop"
    },
    "whyCompetitorsIgnore": "Enterprise CMMS suites cost $10k+/yr and don't build carrier-specific warranty PDF generators.",
    "fourteenDayMVPScope": [
      "PDF form parser extracting model & serial number",
      "Auto-fill warranty claim packet",
      "Email notification to manufacturer rep"
    ],
    "firstTenCustomersChannel": "Walk into 15 local HVAC supply distributors or call trade association members.",
    "riskiestAssumption": "Will manufacturers accept digitally auto-filled claim packets without requiring manual signatures?",
    "validationQuestion": "How many rejected warranty claims did you write off last month, and what was the dollar value?"
  },
  "isAIInferred": true
}
```

---

### 2.3 AI Outreach Pitch Generator
Generates personalized, non-spammy outreach scripts grounded in real problem context.

- **URL**: `POST /api/ai/generate-outreach`
- **Request Body**:
```json
{
  "problemTitle": "Subcontractor Insurance Verification Tracker",
  "targetBuyer": "General Contractors",
  "bleedingNeck": "Uninsured subcontractor accidents freezing project escrow accounts"
}
```
- **Response**:
```json
{
  "success": true,
  "data": {
    "coldEmail": {
      "subject": "Quick question re: subcontractor insurance auditing at [Company]",
      "body": "Hi [Name],\n\nNoticed [Company] manages commercial builds across [City]. Most general contractors we speak with lose 4+ hours a week chasing expired subcontractor COIs before audit deadlines.\n\nWe built a 30-second SMS link where subs upload proof directly from their phone before stepping onto site.\n\nWorth a 3-minute chat this Thursday to see how it works?"
    },
    "phoneScript": {
      "opening": "Hi [Name], I know I called out of the blue—I'll keep this to 20 seconds.",
      "hook": "Are you currently managing subcontractor insurance certificates in Excel, or using a software portal?",
      "callToAction": "If I sent a 45-second video showing how GCs eliminate expired COI liability, would you be open to taking a look?"
    },
    "linkedInDM": {
      "message": "Hi [Name], saw your updates on [Project]. Quick question: how is your team handling expired sub insurance verification before site access? We built a simple 30-sec SMS verification link for GCs."
    }
  }
}
```

---

## 3. Resilience & Fallback Protocol

If the Gemini API returns a `503 Service Unavailable`, `429 Rate Limit`, or experiences network timeout:
1. Server automatically retries request against secondary model `gemini-3.1-flash-lite`.
2. If all LLM attempts fail, server responds with structured fallback object and sets `"fallbackNotice": true`.
3. Client UI displays an informational badge: `[Generated via Fallback Matrix - Connect API Key for Live Inference]`.
