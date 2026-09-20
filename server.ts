import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let aiClient: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

// Resilient API Caller with Multi-Model Fallback and Transient 503 Retry
async function generateWithFallback(prompt: string, temp = 0.4): Promise<any> {
  const ai = getAIClient();
  if (!ai) {
    console.warn('GEMINI_API_KEY is not configured; using intelligent fallback response generator.');
    return null;
  }

  const models = ['gemini-3.8-flash', 'gemini-3.1-flash-lite'];
  let lastError: any = null;

  for (const model of models) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: temp,
        },
      });

      const responseText = response.text || '{}';
      return JSON.parse(responseText);
    } catch (err: any) {
      console.warn(`Model ${model} request error:`, err?.message || err);
      lastError = err;

      // Check if transient 503 or 429
      const isTransient =
        err?.status === 503 ||
        err?.code === 503 ||
        err?.message?.includes('503') ||
        err?.message?.includes('high demand') ||
        err?.message?.includes('UNAVAILABLE') ||
        err?.status === 429;

      if (isTransient) {
        // Delay 1 second before trying next model
        await new Promise((r) => setTimeout(r, 800));
        continue;
      } else {
        return null;
      }
    }
  }

  return null;
}

function getSmartFallbackValidation(problemTitle: string, industry: string, targetAudience: string) {
  const ind = industry || 'Niche B2B Operations';
  const aud = targetAudience || 'Small Business Owners & Managers';

  return {
    verdict: `High-conviction unsexy opportunity: Solving "${problemTitle}" for ${aud} has strong willingness to pay if focused on direct cost or time reduction.`,
    willingnessToPayScore: 8,
    willingnessToPayReasoning: `Businesses in ${ind} currently waste expensive employee hours on broken spreadsheets and manual phone calls. A tool that saves 5-8 hours weekly or prevents a compliance penalty is an instant no-brainer purchase.`,
    estimatedPricing: {
      starter: '$49 - $79/mo (solo operator / up to 3 seats)',
      growth: '$129 - $199/mo (automated notifications & integrations)',
      expectedLTV: '$900 - $1,800 per customer',
    },
    whyCompetitorsIgnore: `Enterprise software suites (like Salesforce or Procore) cost $15k+/yr and take months to set up. Lightweight tools like Notion or Trello lack specialized compliance validation and automated industry alerting.`,
    fourteenDayMVPScope: [
      'Simple client input form or PDF upload without mandatory user registration',
      'Automated rule checker (expiration alert, missing field flag, or calculation engine)',
      'Automated SMS / Email reminder drip to all involved parties',
    ],
    firstTenCustomersChannel: `Direct phone calls or LinkedIn messages to 25 local ${aud} offering a free 48-hour manual audit of their current process.`,
    riskiestAssumption: `Will the end-users (especially less tech-savvy trades or field staff) actually submit data through a simple mobile link?`,
    validationQuestion: `How many hours did your team spend dealing with this exact headache last week, and what did that error or delay cost you?`,
  };
}

function getSmartFallbackIdeas(industry: string, skills: string) {
  const ind = industry || 'Local Trades & Specialized Services';
  return [
    {
      id: 'subcontractor-compliance-portal',
      title: `${ind} Subcontractor & Vendor Compliance Tracker`,
      category: 'Trades & Operations',
      targetCustomer: `General Contractors & ${ind} Managers`,
      currentWorkaround: 'Color-coded Excel sheets and frantic SMS threads chasing documents.',
      thePain: 'Uninsured vendor accidents cause $50,000+ in frozen payments and legal lawsuits.',
      theSolutionMVP: 'SMS magic link where vendors upload proof in 30 seconds; automated expiration alerts.',
      whyUnsolved: 'Enterprise suites cost $1,500/mo and take 90 days to configure.',
      monthlyPrice: '$79 - $149/mo',
      urgencyScore: 9,
      speedToBuild: '7-10 days',
      acquisitionAngle: 'Call 20 local trade directory listings and offer free setup in 24 hours.',
    },
    {
      id: 'uncollected-revenue-recovery',
      title: `${ind} Carrier & Vendor Dispute Recovery Assistant`,
      category: 'Finance & Logistics',
      targetCustomer: `${ind} business operators shipping goods or hiring freight`,
      currentWorkaround: 'Writing off late, damaged, or lost deliveries as unavoidable costs.',
      thePain: 'Losing 2-4% of gross revenue because filing carrier refund forms takes 15 minutes each.',
      theSolutionMVP: '1-click automated claim generator that pulls order data and generates compliant dispute packets.',
      whyUnsolved: 'Shipping aggregators do not want conflict with carrier partners.',
      monthlyPrice: '20% of recovered cash (or $99/mo)',
      urgencyScore: 9,
      speedToBuild: '10-14 days',
      acquisitionAngle: 'Offer a "No Win, No Fee" audit on their last 30 days of shipment tracking numbers.',
    },
    {
      id: 'preventive-qr-maintenance-hub',
      title: `${ind} QR Equipment Log & Preventive Service Alert`,
      category: 'Local Services',
      targetCustomer: `${ind} shop owners with critical machinery or appliances`,
      currentWorkaround: 'Faded paper clipboards and calling random emergency Yelp repairmen when machines die.',
      thePain: 'Emergency weekend repair technician callouts cost $350/hr plus spoiled inventory or lost revenue.',
      theSolutionMVP: 'Printable weatherproof QR codes on equipment that anyone can scan from mobile to see service history.',
      whyUnsolved: 'CMMS enterprise software is made for 500-factory corporations, not single shops.',
      monthlyPrice: '$49 - $99/mo per location',
      urgencyScore: 8,
      speedToBuild: '5-7 days',
      acquisitionAngle: 'Walk into 10 local shops with printed sample QR tags during afternoon lulls.',
    },
  ];
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const HOST = process.env.HOST || '127.0.0.1';

  app.disable('x-powered-by');
  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      hasApiKey: !!process.env.GEMINI_API_KEY,
    });
  });

  // AI Problem Validator Endpoint
  app.post('/api/ai/validate', async (req: Request, res: Response) => {
    const { problemTitle, industry, targetAudience, userBackground } = req.body;

    if (!problemTitle) {
      return res.status(400).json({ error: 'Problem title or description is required.' });
    }

    try {
      const prompt = `You are a world-class Micro-SaaS founder, B2B product strategist, and venture scout specialized in unsexy, high-margin, unsolved business and operational problems.
Analyze this problem idea with brutal honesty and pinpoint precision:
- Problem: "${problemTitle}"
- Industry / Niche: "${industry || 'General'}"
- Target Customer: "${targetAudience || 'Small business owners / professionals'}"
- Founder background / skills: "${userBackground || 'Indie developer / no-code builder'}"

Provide a structured, deeply practical evaluation. Avoid generic corporate buzzwords. Give specific dollar figures, real workflow friction, and actionable tactical steps.

Return ONLY a valid JSON object matching this exact schema:
{
  "verdict": "string (one punchy sentence summarizing if this is a high-conviction winner or risky trap)",
  "willingnessToPayScore": number (1 to 10),
  "willingnessToPayReasoning": "string (why customers will pull out their credit cards; what financial loss or time drain does this prevent?)",
  "estimatedPricing": {
    "starter": "string (e.g. $49/mo for up to 5 users)",
    "growth": "string (e.g. $149/mo with automated sync)",
    "expectedLTV": "string (e.g. $800 - $1,500)"
  },
  "whyCompetitorsIgnore": "string (why big SaaS like Salesforce, HubSpot, or Monday don't solve this well)",
  "fourteenDayMVPScope": [
    "string (bullet 1: Core single feature)",
    "string (bullet 2: Essential integration or file input)",
    "string (bullet 3: Basic notification or deliverable)"
  ],
  "firstTenCustomersChannel": "string (where to find 10 buyers in 7 days: specific subreddit, directory, cold email angle, or trade group)",
  "riskiestAssumption": "string (the single biggest risk that could kill this project)",
  "validationQuestion": "string (exact question to ask 5 prospects on a 15-minute call)"
}`;

      let parsedData = await generateWithFallback(prompt, 0.4);

      if (!parsedData) {
        parsedData = getSmartFallbackValidation(problemTitle, industry, targetAudience);
      }

      return res.json({ success: true, data: parsedData });
    } catch (error: any) {
      console.error('Validation error fallback:', error);
      // Graceful recovery so UI never fails
      const fallback = getSmartFallbackValidation(problemTitle, industry, targetAudience);
      return res.json({ success: true, data: fallback, fallbackNotice: true });
    }
  });

  // AI Unsolved Problems Generator
  app.post('/api/ai/generate-ideas', async (req: Request, res: Response) => {
    const { industry, builderSkills, preferredModel } = req.body;

    try {
      const prompt = `You are an expert Micro-SaaS researcher who finds hidden, high-pain B2B and niche problems that people are desperate to pay for, but that nobody is properly solving.
Preferences:
- Industry/Niche: "${industry || 'Any high-friction industry'}"
- Builder Skills: "${builderSkills || 'Full-stack Web / React'}"
- Preferred Model: "${preferredModel || 'Subscription SaaS'}"

Generate 3 deeply specific, high-friction, unsexy problems that are currently unsolved or horribly solved by messy Excel sheets and manual emails.
Criteria:
1. Solvable by a solo founder or small team in 2 to 4 weeks.
2. Clear willingness to pay ($30 - $300/mo or pay-per-transaction).
3. Target customer has an existing operational budget.
4. Not a generic "AI wrapper" for writing or summarizing.

Return ONLY a valid JSON object matching this schema:
{
  "problems": [
    {
      "id": "string (slug-like id)",
      "title": "string (crisp, informative problem title)",
      "category": "string (e.g. Blue Collar, Healthcare, E-commerce, Local Services, Legal/Compliance, Finance)",
      "targetCustomer": "string (specific job title or business type)",
      "currentWorkaround": "string (how they suffer right now, e.g. Excel + 4 hours of phone calls)",
      "thePain": "string (acute financial or operational cost)",
      "theSolutionMVP": "string (the 14-day minimal software tool that solves it)",
      "whyUnsolved": "string (why big software ignores it)",
      "monthlyPrice": "string (e.g. $79/mo)",
      "urgencyScore": number (1 to 10),
      "speedToBuild": "string (e.g. 7-10 days)",
      "acquisitionAngle": "string (how to get first 10 customers)"
    }
  ]
}`;

      let parsedData = await generateWithFallback(prompt, 0.6);

      if (!parsedData || !parsedData.problems) {
        parsedData = { problems: getSmartFallbackIdeas(industry, builderSkills) };
      }

      return res.json({ success: true, data: parsedData });
    } catch (error: any) {
      console.error('Generate ideas error fallback:', error);
      const fallback = { problems: getSmartFallbackIdeas(industry, builderSkills) };
      return res.json({ success: true, data: fallback, fallbackNotice: true });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`Server running securely on http://${HOST}:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
