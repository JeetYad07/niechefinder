import { AIValidationResult, GeneratedProblemIdea } from '../types';

export function getSmartFallbackValidation(
  problemTitle: string,
  industry: string,
  targetAudience: string
): AIValidationResult {
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

export function getSmartFallbackIdeas(
  industry: string,
  skills: string
): GeneratedProblemIdea[] {
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
