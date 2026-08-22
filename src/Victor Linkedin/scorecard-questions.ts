export type ScoreOption = {
  label: string;
  points: number; // 0 to 10
  diagnosticTag?: string; // Maps to a specific bottleneck
  readinessModifier?: 'high' | 'low'; // Affects Implementation Readiness
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
  { id: 'integration', name: 'Systems Integration', description: 'Disconnected tools and manual handoffs.' },
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
      { label: 'Almost none, our systems talk to each other.', points: 10, readinessModifier: 'high' },
      { label: 'A few hours a week for specific tasks.', points: 7, diagnosticTag: 'manual_handoff', readinessModifier: 'high' },
      { label: 'Significant time (10+ hours). It is someone’s main job.', points: 3, diagnosticTag: 'repetitive_work', readinessModifier: 'high' },
      { label: 'We run completely on manual copy-pasting, and everyone does it differently.', points: 0, diagnosticTag: 'repetitive_work', readinessModifier: 'low' }
    ]
  },
  {
    id: 'w2',
    pillarId: 'workflow',
    question: 'When a standard process (like fulfilling an order or onboarding a client) happens, how do people know what to do next?',
    options: [
      { label: 'A system automatically triggers the next step.', points: 10, readinessModifier: 'high' },
      { label: 'We have a written checklist they follow consistently.', points: 7, readinessModifier: 'high' },
      { label: 'Someone sends an email, Slack, or WhatsApp message.', points: 3, diagnosticTag: 'disconnected_tools', readinessModifier: 'low' },
      { label: 'They just have to remember or ask someone.', points: 0, diagnosticTag: 'repetitive_work', readinessModifier: 'low' }
    ]
  },
  // Data Pillar
  {
    id: 'd1',
    pillarId: 'data',
    question: 'If you needed a reliable report on your most profitable customer cohort today, how long would it take to get it?',
    options: [
      { label: 'Instant. It is on a live dashboard.', points: 10, readinessModifier: 'high' },
      { label: 'An hour or two to pull the numbers from a few consistent sources.', points: 7, readinessModifier: 'high' },
      { label: 'A few days of exporting and manipulating messy spreadsheets.', points: 3, diagnosticTag: 'fragmented_data', readinessModifier: 'low' },
      { label: 'We couldn’t easily answer that right now.', points: 0, diagnosticTag: 'fragmented_data', readinessModifier: 'low' }
    ]
  },
  {
    id: 'd2',
    pillarId: 'data',
    question: 'Where does your core business data (customers, inventory, or projects) live?',
    options: [
      { label: 'In a centralized database or connected CRM/ERP.', points: 10, readinessModifier: 'high' },
      { label: 'In a few different SaaS tools, mostly organized.', points: 7, readinessModifier: 'high' },
      { label: 'Spread across many disconnected Google Sheets/Excel files.', points: 3, diagnosticTag: 'fragmented_data', readinessModifier: 'high' },
      { label: 'In people’s notebooks, heads, or WhatsApp chats.', points: 0, diagnosticTag: 'fragmented_data', readinessModifier: 'low' }
    ]
  },
  // Integration Pillar
  {
    id: 'i1',
    pillarId: 'integration',
    question: 'Do you currently have software tools that your team refuses to use, or complains about constantly?',
    options: [
      { label: 'No, our tools fit our workflow perfectly.', points: 10, readinessModifier: 'high' },
      { label: 'Only minor complaints about specific features.', points: 7, readinessModifier: 'high' },
      { label: 'Yes, because the tools force us to work in awkward ways.', points: 3, diagnosticTag: 'unsuitable_saas', readinessModifier: 'high' },
      { label: 'Yes, people actively bypass the software to use manual workarounds.', points: 0, diagnosticTag: 'unsuitable_saas', readinessModifier: 'low' }
    ]
  },
  {
    id: 'i2',
    pillarId: 'integration',
    question: 'How do you handle unique business processes that standard SaaS tools (like a basic CRM or Shopify) can’t handle?',
    options: [
      { label: 'We built a custom internal tool or app.', points: 10, readinessModifier: 'high' },
      { label: 'We connected tools using Zapier/Make.', points: 7, readinessModifier: 'high' },
      { label: 'We created complex, massive spreadsheets to bridge the gap.', points: 3, diagnosticTag: 'unsuitable_saas', readinessModifier: 'high' },
      { label: 'We just do it manually and accept the errors.', points: 0, diagnosticTag: 'manual_handoff', readinessModifier: 'low' }
    ]
  },
  // People Pillar
  {
    id: 'p1',
    pillarId: 'people',
    question: 'If your best operations employee was unavailable for 2 weeks unexpectedly, what would happen?',
    options: [
      { label: 'Things would run fine; their processes are automated/systematized.', points: 10, readinessModifier: 'high' },
      { label: 'Minor hiccups, but others could pick up the slack using documentation.', points: 7, readinessModifier: 'high' },
      { label: 'Major disruption; key tasks would pile up or be done wrong.', points: 3, diagnosticTag: 'repetitive_work', readinessModifier: 'low' },
      { label: 'The business operations would functionally halt.', points: 0, diagnosticTag: 'repetitive_work', readinessModifier: 'low' }
    ]
  },
  // Sales Pillar
  {
    id: 's1',
    pillarId: 'sales',
    question: 'When a new lead reaches out, what is the process to capture and track them?',
    options: [
      { label: 'They are automatically captured into a CRM and tracked.', points: 10, readinessModifier: 'high' },
      { label: 'We manually enter them into a CRM following a strict rule.', points: 7, readinessModifier: 'high' },
      { label: 'We log them in a spreadsheet occasionally when we remember.', points: 3, diagnosticTag: 'disconnected_tools', readinessModifier: 'low' },
      { label: 'They sit in WhatsApp/email until someone remembers to reply.', points: 0, diagnosticTag: 'disconnected_tools', readinessModifier: 'low' }
    ]
  }
];
