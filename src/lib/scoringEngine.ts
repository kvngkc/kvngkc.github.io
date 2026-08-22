import { QUESTIONS, PILLARS } from '../data/scorecard-questions';
import { QUICKSTARTS } from '../data/quickstarts';

export type AssessmentAnswers = Record<string, number>; // QuestionID -> Selected Option Index

export interface DiagnosticResult {
  overallScore: number;
  pillarScores: Record<string, number>;
  weakestPillars: { id: string; name: string; score: number }[];
  primaryBottleneck: string; // The diagnosticTag with highest frequency or severity
  recommendedQuickstart: typeof QUICKSTARTS[keyof typeof QUICKSTARTS];
}

export function generateDiagnostic(answers: AssessmentAnswers): DiagnosticResult {
  const pillarScores: Record<string, { total: number; max: number }> = {};
  let totalScore = 0;
  let maxPossibleScore = 0;
  
  // Track specific bottlenecks for routing
  const bottleneckCounts: Record<string, number> = {};

  PILLARS.forEach(p => {
    pillarScores[p.id] = { total: 0, max: 0 };
  });

  QUESTIONS.forEach(q => {
    const selectedOptionIdx = answers[q.id];
    if (selectedOptionIdx !== undefined && q.options[selectedOptionIdx]) {
      const option = q.options[selectedOptionIdx];
      
      // Calculate scores
      pillarScores[q.pillarId].total += option.points;
      pillarScores[q.pillarId].max += 10;
      totalScore += option.points;
      maxPossibleScore += 10;

      // Track bottleneck tags for severe answers (low points)
      if (option.points <= 3 && option.diagnosticTag) {
        bottleneckCounts[option.diagnosticTag] = (bottleneckCounts[option.diagnosticTag] || 0) + 1;
      }
    }
  });

  // Normalize scores to 100
  const normalizedPillarScores: Record<string, number> = {};
  Object.keys(pillarScores).forEach(key => {
    const p = pillarScores[key];
    normalizedPillarScores[key] = p.max > 0 ? Math.round((p.total / p.max) * 100) : 0;
  });

  const overallScore = maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0;

  // Identify weakest pillars
  const sortedPillars = PILLARS.map(p => ({
    id: p.id,
    name: p.name,
    score: normalizedPillarScores[p.id]
  })).sort((a, b) => a.score - b.score);

  const weakestPillar = sortedPillars[0];

  // Determine Primary Bottleneck
  let primaryBottleneck = '';
  let maxCount = 0;
  Object.entries(bottleneckCounts).forEach(([tag, count]) => {
    if (count > maxCount) {
      maxCount = count;
      primaryBottleneck = tag;
    }
  });

  // Routing Engine Logic
  let recommendedQuickstart = QUICKSTARTS.workflow; // Default fallback
  
  if (primaryBottleneck === 'data_silo' || primaryBottleneck === 'spreadsheet_dependency') {
    recommendedQuickstart = QUICKSTARTS.data;
  } else if (primaryBottleneck === 'lead_leakage') {
    recommendedQuickstart = QUICKSTARTS.leads;
  } else if (primaryBottleneck === 'unsuitable_saas') {
    recommendedQuickstart = QUICKSTARTS.internal;
  } else if (primaryBottleneck === 'manual_handoff' || primaryBottleneck === 'high_manual_entry') {
    recommendedQuickstart = QUICKSTARTS.workflow;
  } else {
    // If no specific severe bottlenecks, route based on weakest overall pillar
    if (weakestPillar.id === 'data') recommendedQuickstart = QUICKSTARTS.data;
    else if (weakestPillar.id === 'technology') recommendedQuickstart = QUICKSTARTS.internal;
    else if (weakestPillar.id === 'sales') recommendedQuickstart = QUICKSTARTS.leads;
    else recommendedQuickstart = QUICKSTARTS.workflow;
  }

  return {
    overallScore,
    pillarScores: normalizedPillarScores,
    weakestPillars: sortedPillars.slice(0, 3), // Top 3 weaknesses
    primaryBottleneck,
    recommendedQuickstart
  };
}
