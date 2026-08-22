export type ScoreOption = {
  label: string;
  points: number; // 0 to 10
  diagnosticTag?: string; // Maps to a specific bottleneck
};

export type ScorecardQuestion = {
  id: string;
  pillarId: string;
  question: string;
  explanation?: string;
  options: ScoreOption[];
};

export const PILLARS = [
  { id: 'workflow', name: 'Operations & Workflow', description: 'Manual processes and repetitive work.' },
  { id: 'data', name: 'Data & Decision-Making', description: 'Data visibility and fragmentation.' },
  { id: 'technology', name: 'Technology & Systems', description: 'Software stack and integration.' },
  { id: 'people', name: 'People Dependency', description: 'Knowledge silos and key-person risks.' },
  { id: 'sales', name: 'Sales & Customer Ops', description: 'Lead capture and customer communication.' }
];

export const QUESTIONS: ScorecardQuestion[] = [
  // Workflow Pillar
  {
    id: 'w1',
    pillarId: 'workflow',
    question: 'How much time does your team spend manually copying data from one system to another each week?',
    options: [
      { label: 'Almost none, our systems talk to each other.', points: 10 },
      { label: 'A few hours a week for specific tasks.', points: 7, diagnosticTag: 'manual_handoff' },
      { label: 'Significant time (10+ hours). It is someone’s main job.', points: 3, diagnosticTag: 'high_manual_entry' },
      { label: 'We run completely on manual copy-pasting.', points: 0, diagnosticTag: 'high_manual_entry' }
    ]
  },
  {
    id: 'w2',
    pillarId: 'workflow',
    question: 'When a standard process (like fulfilling an order or onboarding a client) happens, how do people know what to do next?',
    options: [
      { label: 'A system automatically triggers the next step.', points: 10 },
      { label: 'We have a written checklist they follow.', points: 7 },
      { label: 'Someone sends an email, Slack, or WhatsApp message.', points: 3, diagnosticTag: 'informal_comms' },
      { label: 'They just have to remember or ask someone.', points: 0, diagnosticTag: 'informal_comms' }
    ]
  },
  // Data Pillar
  {
    id: 'd1',
    pillarId: 'data',
    question: 'If you needed a reliable report on your most profitable customer cohort today, how long would it take to get it?',
    options: [
      { label: 'Instant. It is on a live dashboard.', points: 10 },
      { label: 'An hour or two to pull the numbers.', points: 7 },
      { label: 'A few days of exporting and manipulating spreadsheets.', points: 3, diagnosticTag: 'data_silo' },
      { label: 'We couldn’t easily answer that right now.', points: 0, diagnosticTag: 'data_silo' }
    ]
  },
  {
    id: 'd2',
    pillarId: 'data',
    question: 'Where does your core business data (customers, inventory, or projects) live?',
    options: [
      { label: 'In a centralized database or connected CRM/ERP.', points: 10 },
      { label: 'In a few different SaaS tools, mostly organized.', points: 7 },
      { label: 'Spread across many disconnected Google Sheets/Excel files.', points: 3, diagnosticTag: 'spreadsheet_dependency' },
      { label: 'In people’s notebooks, heads, or WhatsApp chats.', points: 0, diagnosticTag: 'spreadsheet_dependency' }
    ]
  },
  // Technology Pillar
  {
    id: 't1',
    pillarId: 'technology',
    question: 'Do you currently have software tools that your team refuses to use, or complains about constantly?',
    options: [
      { label: 'No, our tools fit our workflow perfectly.', points: 10 },
      { label: 'Only minor complaints about specific features.', points: 7 },
      { label: 'Yes, because the tools force us to work in awkward ways.', points: 3, diagnosticTag: 'unsuitable_saas' },
      { label: 'Yes, people actively bypass the software to use spreadsheets.', points: 0, diagnosticTag: 'unsuitable_saas' }
    ]
  },
  {
    id: 't2',
    pillarId: 'technology',
    question: 'How do you handle unique business processes that standard SaaS tools (like a basic CRM or Shopify) can’t handle?',
    options: [
      { label: 'We built a custom internal tool or app.', points: 10 },
      { label: 'We connected tools using Zapier/Make.', points: 7 },
      { label: 'We created complex, massive spreadsheets.', points: 3, diagnosticTag: 'unsuitable_saas' },
      { label: 'We just do it manually and accept the errors.', points: 0, diagnosticTag: 'manual_handoff' }
    ]
  },
  // People Pillar
  {
    id: 'p1',
    pillarId: 'people',
    question: 'If your best operations employee was unavailable for 2 weeks unexpectedly, what would happen?',
    options: [
      { label: 'Things would run fine; their processes are automated/systematized.', points: 10 },
      { label: 'Minor hiccups, but others could pick up the slack using documentation.', points: 7 },
      { label: 'Major disruption; key tasks would pile up or be done wrong.', points: 3, diagnosticTag: 'key_person_risk' },
      { label: 'The business operations would functionally halt.', points: 0, diagnosticTag: 'key_person_risk' }
    ]
  },
  // Sales Pillar
  {
    id: 's1',
    pillarId: 'sales',
    question: 'When a new lead reaches out, what is the process to capture and track them?',
    options: [
      { label: 'They are automatically captured into a CRM and tracked.', points: 10 },
      { label: 'We manually enter them into a CRM.', points: 7 },
      { label: 'We log them in a spreadsheet occasionally.', points: 3, diagnosticTag: 'lead_leakage' },
      { label: 'They sit in WhatsApp/email until someone remembers to reply.', points: 0, diagnosticTag: 'lead_leakage' }
    ]
  },
  {
    id: 's2',
    pillarId: 'sales',
    question: 'How consistent is your follow-up with prospects who don’t buy immediately?',
    options: [
      { label: 'Automated nurture sequences keep them engaged.', points: 10 },
      { label: 'Sales reps have scheduled reminders in the CRM.', points: 7 },
      { label: 'It relies on reps remembering to check their notes.', points: 3, diagnosticTag: 'lead_leakage' },
      { label: 'We generally don’t follow up after the first interaction.', points: 0, diagnosticTag: 'lead_leakage' }
    ]
  }
];
