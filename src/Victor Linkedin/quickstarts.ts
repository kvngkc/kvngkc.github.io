export const QUICKSTARTS = {
  workflow: {
    id: 'workflow',
    title: 'Workflow Automation',
    target: 'repetitive work',
    description: 'Fixed-scope engagement to identify and automate one high-friction operational workflow.',
    deliverables: [
      'Current-state workflow map',
      'Bottleneck analysis',
      'Automation design & build',
      'Implementation & Testing',
      'Documentation'
    ],
    price: '$1,500'
  },
  data: {
    id: 'data',
    title: 'Data Visibility',
    target: 'fragmented information',
    description: 'Fixed-scope engagement to turn one messy operational data process into a reliable source of truth.',
    deliverables: [
      'Data source audit',
      'Consolidation architecture',
      'Automated sync pipeline',
      'Single-source-of-truth dashboard',
      'Documentation'
    ],
    price: '$2,000'
  },
  integration: {
    id: 'integration',
    title: 'Systems Integration',
    target: 'disconnected tools',
    description: 'Fixed-scope engagement to connect existing tools and eliminate manual handoffs.',
    deliverables: [
      'Systems architecture review',
      'Integration map',
      'API/Webhook configuration',
      'Data flow testing',
      'Error handling protocols'
    ],
    price: '$2,500'
  },
  internal: {
    id: 'internal',
    title: 'Internal Tool',
    target: 'existing software doesn\'t fit',
    description: 'Build focused software where existing off-the-shelf tools don\'t fit your unique workflow.',
    deliverables: [
      'Requirements scope',
      'Database architecture',
      'Custom interface build',
      'Workflow integration',
      'Deployment & Training'
    ],
    price: '$5,000'
  }
};

export const FALLBACK_PATH = {
  id: 'fallback',
  title: 'Process Standardization',
  target: 'chaotic undocumented workflows',
  description: 'Your assessment suggests the underlying workflow isn\'t standardized enough to automate reliably. Fix the process before automating it.',
  deliverables: [
    'Document how the process currently works.',
    'Identify the three biggest sources of variation.',
    'Create a standard operating procedure (SOP) that a new hire could follow.',
    'Run the manual process according to the SOP for 2 weeks to verify it works.'
  ],
  price: 'Free Action Plan'
};
