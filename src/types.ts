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

export interface ProblemOpportunity {
  id: string;
  title: string;
  tagline: string;
  category: Exclude<ProblemCategory, 'All'>;
  complexity: BuildComplexity;
  targetBuyer: string;
  estimatedPrice: string;
  priceModel: 'Monthly SaaS' | 'Per Transaction' | 'Usage Base';
  urgencyRating: number; // 1-10
  profitScore: number; // 1-10
  theBleedingNeck: string;
  currentStatusQuo: string;
  whyIncumbentsIgnore: string;
  mvpFeatureSet: string[];
  firstTenCustomersStrategy: string;
  evidenceSignal: string;
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
