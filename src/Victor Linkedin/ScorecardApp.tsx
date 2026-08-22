import React, { useState } from 'react';
import { QUESTIONS } from './scorecard-questions';
import { generateDiagnostic, type AssessmentAnswers, type DiagnosticResult } from './scoringEngine';

export default function ScorecardApp() {
  const [started, setStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qualificationStarted, setQualificationStarted] = useState(false);

  // Qualification State
  const [qualProblem, setQualProblem] = useState('');
  const [qualCurrent, setQualCurrent] = useState('');
  const [qualOutcome, setQualOutcome] = useState('');
  const [qualTimeline, setQualTimeline] = useState('');
  const [qualBudget, setQualBudget] = useState('');

  const handleStart = () => setStarted(true);

  const handleAnswer = (optionIndex: number) => {
    // Remove active focus from the clicked button to prevent lingering highlight bug
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    const qId = QUESTIONS[currentQuestionIndex].id;
    const newAnswers = { ...answers, [qId]: optionIndex };
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      const diag = generateDiagnostic(newAnswers);
      setResult(diag);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL'; 
    try {
      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          name, email, company,
          overallScore: result?.overallScore,
          primaryBottleneck: result?.primaryBottleneck,
          recommendedAction: result?.recommendedAction.title,
          answers: JSON.stringify(answers)
        })
      });
    } catch(err) { console.error(err); }

    setTimeout(() => {
      setIsSubmitting(false);
      setEmailCaptured(true);
    }, 800);
  };

  const handleQualificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Fire to backend or construct a mailto link
    const subject = encodeURIComponent(`Application: ${result?.recommendedAction.title}`);
    const body = encodeURIComponent(`Problem: ${qualProblem}\nCurrent State: ${qualCurrent}\nDesired Outcome: ${qualOutcome}\nTimeline: ${qualTimeline}\nBudget: ${qualBudget}`);
    window.location.href = `mailto:victor.k.okoye@gmail.com?subject=${subject}&body=${body}`;
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4">
        <div className="max-w-2xl text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">How dependent is your business on spreadsheets, manual work and people's memory?</h1>
          <p className="text-xl text-gray-400">Take the 10-minute Business Systems Health Assessment to find your biggest operational bottleneck.</p>
          <button onClick={handleStart} className="mt-8 px-8 py-4 bg-accent text-black font-bold rounded-md hover:bg-green-400 transition-colors text-lg cursor-pointer">
            Start the Assessment &rarr;
          </button>
        </div>
      </div>
    );
  }

  if (!result) {
    const q = QUESTIONS[currentQuestionIndex];
    const progress = Math.round(((currentQuestionIndex) / QUESTIONS.length) * 100);
    
    return (
      <div className="min-h-screen bg-background text-foreground py-12 px-4 flex flex-col items-center">
        <div className="w-full max-w-2xl mb-12">
          <div className="h-2 bg-gray-800 rounded-full w-full overflow-hidden">
            <div className="h-full bg-accent transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="text-right text-sm text-gray-500 mt-2">{currentQuestionIndex + 1} of {QUESTIONS.length}</div>
        </div>
        
        <div className="w-full max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-tight">{q.question}</h2>
          <div className="space-y-4">
            {q.options.map((opt, idx) => (
              <button 
                // key forces React to render a fresh button for each question, fixing the lingering hover/focus bug
                key={`${currentQuestionIndex}-${idx}`} 
                onClick={() => handleAnswer(idx)}
                className="w-full text-left p-6 border border-gray-800 rounded-lg hover:border-accent focus:border-accent hover:bg-gray-900 transition-all text-lg cursor-pointer outline-none"
              >
                {opt.label}
              </button>
            ))}
          </div>
          
          {currentQuestionIndex > 0 && (
             <button 
               onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
               className="mt-8 text-sm text-gray-500 hover:text-white cursor-pointer"
             >
               &larr; Previous Question
             </button>
          )}
        </div>
      </div>
    );
  }

  if (result && !emailCaptured) {
    return (
      <div className="min-h-screen bg-background text-foreground py-16 px-4 flex flex-col items-center">
        <div className="w-full max-w-2xl text-center space-y-6">
          <div className="p-8 bg-gray-900 border border-gray-800 rounded-lg my-8">
            <div className="text-sm font-mono text-gray-500 mb-2 uppercase tracking-widest">Your Biggest Problem</div>
            <h2 className="text-3xl font-bold text-accent mb-4">{result.primaryBottleneck}</h2>
            <div className="flex items-center justify-center space-x-4 mb-4">
               <span className="text-lg font-medium text-gray-300">Systems Health: {result.overallScore}/100</span>
               <span className="px-3 py-1 bg-black rounded-full text-sm font-mono text-gray-400 border border-gray-800">{result.maturityBand}</span>
            </div>
            <p className="text-gray-300 text-lg border-t border-gray-800 pt-4 mt-4">
              <strong>Why it matters:</strong> {result.bottleneckImpact}
            </p>
          </div>
          
          <h3 className="text-2xl font-bold mt-12">Your detailed diagnostic is ready.</h3>
          <p className="text-gray-400 mb-8">Enter your email to unlock:</p>
          
          <ul className="text-left text-gray-300 space-y-2 max-w-md mx-auto mb-8 font-medium">
             <li className="flex items-center"><span className="text-accent mr-2">✓</span> Your 3 biggest operational bottlenecks</li>
             <li className="flex items-center"><span className="text-accent mr-2">✓</span> Why they are happening</li>
             <li className="flex items-center"><span className="text-accent mr-2">✓</span> Where automation or better systems could help</li>
             <li className="flex items-center"><span className="text-accent mr-2">✓</span> Your recommended first step</li>
          </ul>
          
          <form onSubmit={handleEmailSubmit} className="space-y-4 max-w-md mx-auto text-left">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Name</label>
              <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-black border border-gray-800 rounded px-4 py-3 text-white focus:border-accent outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Work Email</label>
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-black border border-gray-800 rounded px-4 py-3 text-white focus:border-accent outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Company</label>
              <input required type="text" value={company} onChange={e => setCompany(e.target.value)} className="w-full bg-black border border-gray-800 rounded px-4 py-3 text-white focus:border-accent outline-none" />
            </div>
            <button disabled={isSubmitting} type="submit" className="w-full bg-accent text-black font-bold py-4 rounded hover:bg-green-400 disabled:opacity-50 mt-4 cursor-pointer">
              {isSubmitting ? 'Generating Report...' : 'Unlock Full Report &rarr;'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (qualificationStarted) {
    return (
       <div className="min-h-screen bg-background text-foreground py-16 px-4 flex flex-col items-center">
         <div className="w-full max-w-2xl">
           <div className="mb-8 cursor-pointer text-gray-500 hover:text-white" onClick={() => setQualificationStarted(false)}>&larr; Back to Results</div>
           <h2 className="text-3xl font-bold mb-2">Apply for {result.recommendedAction.title}</h2>
           <p className="text-gray-400 text-lg mb-8">Final scope and pricing confirmed after qualification.</p>
           
           <form onSubmit={handleQualificationSubmit} className="space-y-6">
             <div className="p-6 bg-gray-900 border border-gray-800 rounded-lg space-y-4">
               <h3 className="font-bold text-accent mb-4 border-b border-gray-800 pb-2">The Problem</h3>
               <div>
                 <label className="block text-sm font-medium mb-1">What problem are you trying to solve?</label>
                 <textarea required rows={2} value={qualProblem} onChange={e => setQualProblem(e.target.value)} className="w-full bg-black border border-gray-800 rounded px-4 py-2 text-white focus:border-accent outline-none"></textarea>
               </div>
               <div>
                 <label className="block text-sm font-medium mb-1">How are you handling it today?</label>
                 <textarea required rows={2} value={qualCurrent} onChange={e => setQualCurrent(e.target.value)} className="w-full bg-black border border-gray-800 rounded px-4 py-2 text-white focus:border-accent outline-none"></textarea>
               </div>
               <div>
                 <label className="block text-sm font-medium mb-1">What would a successful outcome look like?</label>
                 <textarea required rows={2} value={qualOutcome} onChange={e => setQualOutcome(e.target.value)} className="w-full bg-black border border-gray-800 rounded px-4 py-2 text-white focus:border-accent outline-none"></textarea>
               </div>
             </div>
             
             <div className="p-6 bg-gray-900 border border-gray-800 rounded-lg space-y-4">
                <h3 className="font-bold text-accent mb-4 border-b border-gray-800 pb-2">Buying Context</h3>
                <div>
                  <label className="block text-sm font-medium mb-2">When are you looking to address this?</label>
                  <select required value={qualTimeline} onChange={e => setQualTimeline(e.target.value)} className="w-full bg-black border border-gray-800 rounded px-4 py-3 text-white focus:border-accent outline-none">
                    <option value="">Select Timeline...</option>
                    <option value="Now">Now</option>
                    <option value="1-3 months">1–3 months</option>
                    <option value="3-6 months">3–6 months</option>
                    <option value="Just researching">Just researching</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">What best describes your current budget for solving this?</label>
                  <select required value={qualBudget} onChange={e => setQualBudget(e.target.value)} className="w-full bg-black border border-gray-800 rounded px-4 py-3 text-white focus:border-accent outline-none">
                    <option value="">Select Budget Range...</option>
                    <option value="Under $1k">Under $1,000 (Self-serve/Research)</option>
                    <option value="$1.5k - $3k">$1,500 - $3,000 (Quickstart Target)</option>
                    <option value="$3k - $10k">$3,000 - $10,000</option>
                    <option value="$10k+">$10,000+</option>
                  </select>
                </div>
             </div>

             <button type="submit" className="w-full bg-accent text-black font-bold py-4 rounded hover:bg-green-400 text-lg cursor-pointer">
               Submit Application &rarr;
             </button>
           </form>
         </div>
       </div>
    );
  }

  // The Full Results Dashboard
  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl space-y-12">
        <div className="text-center">
          <div className="inline-block px-3 py-1 bg-gray-900 border border-gray-800 rounded-full text-sm font-mono text-gray-400 mb-4">{result.maturityBand}</div>
          <h1 className="text-4xl font-bold mb-2">Your Diagnostic Report</h1>
          <p className="text-xl text-gray-400">Score: {result.overallScore}/100</p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold border-b border-gray-800 pb-2">Operational Bottlenecks</h2>
          {result.weakestPillars.map((p, index) => (
            <div key={p.id} className="flex flex-col mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-medium">{index + 1}. {p.name}</span>
                <span className="text-gray-500 font-mono text-sm">{p.score}/100</span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full w-full overflow-hidden">
                <div className={`h-full ${index === 0 ? 'bg-accent' : 'bg-gray-500'}`} style={{ width: `${p.score}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 border border-gray-800 p-8 rounded-lg space-y-6">
          <h2 className="text-2xl font-bold text-accent">Recommended Next Step</h2>
          
          <div className="mt-6">
            <h3 className="text-2xl font-bold mb-2">{result.recommendedAction.title}</h3>
            <div className="inline-block px-2 py-1 bg-black text-gray-300 text-xs font-mono uppercase tracking-widest border border-gray-800 rounded mb-4">
              Price: {result.recommendedAction.price}
            </div>
            
            <p className="text-gray-300 mb-6 text-lg">{result.recommendedAction.description}</p>
            
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-500 mb-3">Deliverables</h4>
            <ul className="list-none space-y-2 mb-8 text-gray-300">
              {result.recommendedAction.deliverables.map((d, i) => (
                <li key={i} className="flex items-start">
                   <span className="text-accent mr-3 mt-1">✓</span> <span>{d}</span>
                </li>
              ))}
            </ul>

            {result.isReadyForImplementation ? (
              <button onClick={() => setQualificationStarted(true)} className="w-full bg-accent text-black font-bold py-4 rounded hover:bg-green-400 text-lg cursor-pointer transition-all">
                Apply for this Quickstart &rarr;
              </button>
            ) : (
              <a href="#" className="w-full block text-center bg-white text-black font-bold py-4 rounded hover:bg-gray-200 text-lg cursor-pointer transition-all">
                Get the Process Mapping Guide &rarr;
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
