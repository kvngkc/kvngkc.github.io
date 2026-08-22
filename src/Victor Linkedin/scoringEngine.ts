import { QUESTIONS, PILLARS } from './scorecard-questions';
import { QUICKSTARTS, FALLBACK_PATH } from './quickstarts';

export type AssessmentAnswers = Record<string, number>;

export interface DiagnosticResult {
  overallScore: number;
  maturityBand: string;
  pillarScores: Record<string, number>;
  weakestPillars: { id: string; name: string; score: number }[];
  primaryBottleneck: string; // Used for "What"
  bottleneckImpact: string;  // Used for "Why it matters"
  recommendedAction: typeof QUICKSTARTS[keyof typeof QUICKSTARTS] | typeof FALLBACK_PATH;
  isReadyForImplementation: boolean;
}

export function generateDiagnostic(answers: AssessmentAnswers): DiagnosticResult {
  const pillarScores: Record<string, { total: number; max: number }> = {};
  let totalScore = 0;
  let maxPossibleScore = 0;
  
  let readinessHighCount = 0;
  let readinessLowCount = 0;

  const bottleneckCounts: Record<string, number> = {};

  PILLARS.forEach(p => {
    pillarScores[p.id] = { total: 0, max: 0 };
  });

  QUESTIONS.forEach(q => {
    const selectedOptionIdx = answers[q.id];
    if (selectedOptionIdx !== undefined && q.options[selectedOptionIdx]) {
      const option = q.options[selectedOptionIdx];
      
      pillarScores[q.pillarId].total += option.points;
      pillarScores[q.pillarId].max += 10;
      totalScore += option.points;
      maxPossibleScore += 10;

      if (option.readinessModifier === 'high') readinessHighCount++;
      if (option.readinessModifier === 'low') readinessLowCount++;

      if (option.points <= 3 && option.diagnosticTag) {
        bottleneckCounts[option.diagnosticTag] = (bottleneckCounts[option.diagnosticTag] || 0) + 1;
      }
    }
  });

  const normalizedPillarScores: Record<string, number> = {};
  Object.keys(pillarScores).forEach(key => {
    const p = pillarScores[key];
    normalizedPillarScores[key] = p.max > 0 ? Math.round((p.total / p.max) * 100) : 0;
  });

  const overallScore = maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0;
  
  // 1. Calculate Maturity Band
  let maturityBand = '';
  if (overallScore <= 39) maturityBand = 'Operationally Fragile';
  else if (overallScore <= 59) maturityBand = 'Operationally Strained';
  else if (overallScore <= 74) maturityBand = 'Functional but Fragmented';
  else if (overallScore <= 89) maturityBand = 'Systematically Managed';
  else maturityBand = 'Operationally Mature';

  // 2. Identify weakest pillars
  const sortedPillars = PILLARS.map(p => ({
    id: p.id,
    name: p.name,
    score: normalizedPillarScores[p.id]
  })).sort((a, b) => a.score - b.score);

  // 3. Determine Primary Bottleneck
  let primaryBottleneck = '';
  let maxCount = 0;
  Object.entries(bottleneckCounts).forEach(([tag, count]) => {
    if (count > maxCount) {
      maxCount = count;
      primaryBottleneck = tag;
    }
  });

  // Map the bottleneck to human readable impact
  let bottleneckImpact = 'Your team is acting as the integration layer between disconnected processes.';
  let problemLabel = 'Manual workflow dependency';

  if (primaryBottleneck === 'fragmented_data') {
    problemLabel = 'Fragmented Information';
    bottleneckImpact = 'Your operational decisions are slowed down because data lives in too many disconnected places.';
  } else if (primaryBottleneck === 'disconnected_tools') {
    problemLabel = 'Disconnected Systems';
    bottleneckImpact = 'Information is falling through the cracks because your software tools don\'t talk to each other automatically.';
  } else if (primaryBottleneck === 'unsuitable_saas') {
    problemLabel = 'Unsuitable Software';
    bottleneckImpact = 'Your team is constantly fighting against off-the-shelf software that doesn\'t fit how your business actually operates.';
  } else if (primaryBottleneck === 'repetitive_work' || primaryBottleneck === 'manual_handoff') {
    problemLabel = 'Repetitive Manual Work';
    bottleneckImpact = 'High-value employees are wasting hours every week acting as human glue between steps in your process.';
  }

  // 4. Calculate Readiness and Route to Action
  const isReadyForImplementation = readinessLowCount <= 2; // If they have > 2 'low' readiness answers, they are chaotic
  
  let recommendedAction: typeof QUICKSTARTS[keyof typeof QUICKSTARTS] | typeof FALLBACK_PATH = FALLBACK_PATH;

  if (!isReadyForImplementation) {
    recommendedAction = FALLBACK_PATH;
  } else {
    if (primaryBottleneck === 'fragmented_data') {
      recommendedAction = QUICKSTARTS.data;
    } else if (primaryBottleneck === 'disconnected_tools') {
      recommendedAction = QUICKSTARTS.integration;
    } else if (primaryBottleneck === 'unsuitable_saas') {
      recommendedAction = QUICKSTARTS.internal;
    } else {
      recommendedAction = QUICKSTARTS.workflow; // Default for repetitive work
    }
  }

  return {
    overallScore,
    maturityBand,
    pillarScores: normalizedPillarScores,
    weakestPillars: sortedPillars.slice(0, 3),
    primaryBottleneck: problemLabel,
    bottleneckImpact,
    recommendedAction,
    isReadyForImplementation
  };
}
