export interface TechStackConfig {
  category: string;
  recommendedStack: {
    frontend: string;
    backend: string;
    database: string;
    auth: string;
    payments: string;
    notifications: string;
  };
  whyThisStack: string;
  estimatedBuildTime: string;
}

export const RECOMMENDED_TECH_STACKS: Record<string, TechStackConfig> = {
  default: {
    category: 'General Micro-SaaS',
    recommendedStack: {
      frontend: 'React + Vite + Tailwind CSS (Hosted on Vercel)',
      backend: 'Node.js / Express Serverless Functions',
      database: 'Supabase PostgreSQL (Free tier / $25 mo)',
      auth: 'Supabase Auth / Clerk (Magic Link & Passwords)',
      payments: 'Stripe Checkout + Customer Portal',
      notifications: 'Resend (Transactional Emails) + Twilio (SMS Alerts)',
    },
    whyThisStack: 'Zero infrastructure setup time. Magic links allow field workers and contractors to submit proof without downloading apps.',
    estimatedBuildTime: '7 - 10 Days',
  },
  'Trades & Blue Collar': {
    category: 'Trades & Blue Collar',
    recommendedStack: {
      frontend: 'React PWA (Mobile-optimized web app)',
      backend: 'Supabase Edge Functions',
      database: 'Supabase PostgreSQL with Row Level Security',
      auth: 'Twilio Passwordless SMS Magic Links',
      payments: 'Stripe Subscription Billing',
      notifications: 'Twilio SMS & WhatsApp Business API',
    },
    whyThisStack: 'Blue-collar field crews hate downloading native app store apps. Web SMS links have a 98% open rate and zero onboarding friction.',
    estimatedBuildTime: '5 - 7 Days',
  },
  'Healthcare & Clinics': {
    category: 'Healthcare & Clinics',
    recommendedStack: {
      frontend: 'Next.js 15 App Router + Tailwind CSS',
      backend: 'Next.js Route Handlers',
      database: 'Supabase (HIPAA Compliant plan / AWS RDS)',
      auth: 'Clerk B2B Enterprise Auth',
      payments: 'Stripe Invoicing & Billing',
      notifications: 'Resend Transactional Email + AWS SNS',
    },
    whyThisStack: 'Ensures strict data security boundaries, PDF manifest generation, and automated compliance reminder drips.',
    estimatedBuildTime: '10 - 14 Days',
  },
};
