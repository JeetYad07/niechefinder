export type ProblemCategory =
  | 'All'
  | 'Trades & Blue Collar'
  | 'B2B Operations'
  | 'E-commerce & Logistics'
  | 'Healthcare & Clinics'
  | 'Real Estate & Property'
  | 'Local Services'
  | 'Legal & Compliance';

export type BuildComplexity = 'Weekend MVP' | '1-2 Weeks' | '2-3 Weeks' | '3-4 Weeks';

export interface EvidenceItem {
  id: string;
  problemId: string;
  sourceType: 'forum_post' | 'g2_review' | 'reddit_thread' | 'regulatory_filing' | 'job_listing' | 'customer_interview';
  sourceUrl: string;
  sourceTitle: string;
  verbatimQuote: string;
  authorRole?: string;
  publishedAt?: string;
  verifiedAt: string;
  isAIInferred: boolean;
}

export interface ProblemOpportunity {
  id: string;
  title: string;
  tagline: string;
  category: Exclude<ProblemCategory, 'All'>;
  complexity: BuildComplexity;
  targetBuyer: string;
  estimatedPrice: string;
  priceModel: 'Monthly SaaS' | 'Per Transaction' | 'Usage Base';
  urgencyRating?: number; // Optional legacy score
  profitScore?: number; // Optional legacy score
  theBleedingNeck: string;
  currentStatusQuo: string;
  whyIncumbentsIgnore: string;
  mvpFeatureSet: string[];
  firstTenCustomersStrategy: string;
  evidenceSignal: string;
  evidenceItems?: EvidenceItem[];
  invalidationCriteria: string[];
  pricingTiers: {
    name: string;
    price: string;
    features: string[];
  }[];
  financialFreedomSimulation: {
    twentyFiveClients: string;
    fiftyClients: string;
    hundredClients: string;
  };
  riskiestAssumption: string;
  fiveMinutePitch: string;
  customerValidationQuestions: string[];
}

export interface AIValidationResult {
  verdict: string;
  willingnessToPayScore: number;
  willingnessToPayReasoning: string;
  estimatedPricing: {
    starter: string;
    growth: string;
    expectedLTV: string;
  };
  whyCompetitorsIgnore: string;
  fourteenDayMVPScope: string[];
  firstTenCustomersChannel: string;
  riskiestAssumption: string;
  validationQuestion: string;
}

export interface GeneratedProblemIdea {
  id: string;
  title: string;
  category: string;
  targetCustomer: string;
  currentWorkaround: string;
  thePain: string;
  theSolutionMVP: string;
  whyUnsolved: string;
  monthlyPrice: string;
  urgencyScore: number;
  speedToBuild: string;
  acquisitionAngle: string;
}
