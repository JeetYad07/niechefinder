export interface PitchScript {
  coldEmail: {
    subject: string;
    body: string;
  };
  coldCall: {
    hook: string;
    body: string;
    cta: string;
  };
  linkedinDm: string;
}

export function generateOutreachPitch(
  problemTitle: string,
  targetBuyer: string,
  theBleedingNeck: string,
  priceStr: string
): PitchScript {
  const buyer = targetBuyer || 'Operations Manager';
  const price = priceStr || '$79/mo';

  return {
    coldEmail: {
      subject: `Quick question re: ${problemTitle.split(' ')[0]} process at {{CompanyName}}`,
      body: `Hi {{FirstName}},

I noticed your team handles ${problemTitle}. Most ${buyer}s we talk to lose 8-10 hours weekly because of ${theBleedingNeck.slice(0, 90)}...

We built a simple 14-day lightweight micro-tool (${price}) that automates this workflow so your team never deals with this friction again.

Would you be open to a 5-minute pre-built demo this Thursday?

Best,
{{YourName}}`,
    },
    coldCall: {
      hook: `Hi {{FirstName}}, I know I caught you out of the blue. I'll be brief—I'm calling because we work with local ${buyer}s who spend hours dealing with ${problemTitle.split(' ')[0]} headaches.`,
      body: `When an urgent delay or error happens, it costs companies thousands in lost productivity. We built a 30-second mobile rule-checker that fixes this automatically before checks get disbursed.`,
      cta: `If I sent a 60-second video over text showing how it works, would you be open to checking it out?`,
    },
    linkedinDm: `Hi {{FirstName}} — saw your work at {{CompanyName}}. Quick question: how are you currently handling ${problemTitle.split(' ')[0]} compliance for your team? We built a lightweight $49/mo automation that saves 6+ hours a week. Happy to send a 1-minute loom if helpful!`,
  };
}
