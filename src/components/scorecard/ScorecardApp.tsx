import React, { useState } from 'react';
import { QUESTIONS, PILLARS } from '../../data/scorecard-questions';
import { generateDiagnostic, type AssessmentAnswers, type DiagnosticResult } from '../../lib/scoringEngine';

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

  const handleStart = () => setStarted(true);

  const handleAnswer = (optionIndex: number) => {
    const qId = QUESTIONS[currentQuestionIndex].id;
    const newAnswers = { ...answers, [qId]: optionIndex };
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Finished
      const diag = generateDiagnostic(newAnswers);
      setResult(diag);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In Option A, we post to the Google Apps Script endpoint.
    // We do not await since it's no-cors, we just assume success.
    const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL'; // To be updated by user
    
    try {
      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          name,
          email,
          company,
          overallScore: result?.overallScore,
          primaryBottleneck: result?.primaryBottleneck,
          recommendedQuickstart: result?.recommendedQuickstart.id,
          answers: JSON.stringify(answers)
        })
      });
    } catch(err) {
      console.error(err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setEmailCaptured(true);
    }, 800);
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4">
        <div className="max-w-2xl text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">How dependent is your business on spreadsheets, manual work and people's memory?</h1>
          <p className="text-xl text-gray-400">Take the 10-minute Business Systems Health Assessment to find your biggest operational bottleneck.</p>
          <button onClick={handleStart} className="mt-8 px-8 py-4 bg-accent text-black font-bold rounded-md hover:bg-green-400 transition-colors text-lg">
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
                key={idx}
                onClick={() => handleAnswer(idx)}
                className="w-full text-left p-6 border border-gray-800 rounded-lg hover:border-accent hover:bg-gray-900 transition-all text-lg"
              >
                {opt.label}
              </button>
            ))}
          </div>
          
          {currentQuestionIndex > 0 && (
             <button 
               onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
               className="mt-8 text-sm text-gray-500 hover:text-white"
             >
               &larr; Previous Question
             </button>
          )}
        </div>
      </div>
    );
  }

  // They have the result, but haven't provided email
  if (result && !emailCaptured) {
    const weakest = result.weakestPillars[0];
    return (
      <div className="min-h-screen bg-background text-foreground py-16 px-4 flex flex-col items-center">
        <div className="w-full max-w-2xl text-center space-y-6">
          <div className="inline-block p-4 border-2 border-accent rounded-full mb-4">
            <div className="text-5xl font-bold text-accent">{result.overallScore}</div>
          </div>
          <h1 className="text-3xl font-bold">Your Business Systems Score: {result.overallScore}/100</h1>
          
          <div className="p-6 bg-gray-900 border border-gray-800 rounded-lg my-8">
            <h2 className="text-xl font-semibold mb-2">Your biggest weakness: <span className="text-accent">{weakest.name}</span></h2>
            <p className="text-gray-400">The data shows this is the core bottleneck preventing you from scaling efficiently.</p>
          </div>
          
          <h3 className="text-2xl font-bold mt-12">Your detailed diagnostic is ready.</h3>
          <p className="text-gray-400 mb-8">Enter your details below to see your top 3 bottlenecks, the opportunity map, and the smallest next step you should take to fix this.</p>
          
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
            <button disabled={isSubmitting} type="submit" className="w-full bg-accent text-black font-bold py-4 rounded hover:bg-green-400 disabled:opacity-50 mt-4">
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
         <div className="w-full max-w-2xl text-center space-y-6">
           <h2 className="text-3xl font-bold text-accent">{result.recommendedQuickstart.title}</h2>
           <p className="text-gray-400 text-lg">Please fill out this short qualification application so we can ensure this is the right fit.</p>
           {/* In a real app, this would be an embedded Typeform or similar, or a more detailed React form. For now, we will direct them to a mailto or external link, or build a simple form. */}
           <div className="p-8 bg-gray-900 border border-gray-800 rounded-lg text-left mt-8">
             <p className="text-white mb-4">To proceed with the Quickstart, please email me directly with the following details, or schedule a brief calibration call.</p>
             <a href="mailto:victor@example.com?subject=Quickstart Application" className="block text-center bg-white text-black font-bold py-3 rounded hover:bg-gray-200">
               Email Application
             </a>
             <div className="text-center text-sm text-gray-500 my-4">OR</div>
             <a href="https://calendly.com/your-link" target="_blank" rel="noreferrer" className="block text-center border border-gray-700 text-white font-bold py-3 rounded hover:bg-gray-800">
               Schedule Calibration Call
             </a>
           </div>
         </div>
       </div>
    );
  }

  // The Full Results Dashboard
  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Your Diagnostic Report</h1>
          <p className="text-xl text-gray-400">Score: {result.overallScore}/100</p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold border-b border-gray-800 pb-2">Pillar Breakdown</h2>
          {PILLARS.map(p => (
            <div key={p.id} className="flex justify-between items-center">
              <span className="text-lg font-medium">{p.name}</span>
              <div className="w-1/2 flex items-center gap-4">
                <div className="h-2 bg-gray-800 rounded-full w-full overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: `${result.pillarScores[p.id]}%` }}></div>
                </div>
                <span className="w-8 text-right text-gray-400">{result.pillarScores[p.id]}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 border border-gray-800 p-8 rounded-lg space-y-6">
          <h2 className="text-2xl font-bold text-accent">Smallest Next Step</h2>
          <p className="text-lg">You don't need a massive new software platform right now. Your biggest opportunity is fixing the bottlenecks in your <strong>{result.weakestPillars[0].name}</strong>.</p>
          
          <div className="mt-8 border-t border-gray-800 pt-8">
            <h3 className="text-xl font-bold mb-2">Recommended Strategy: {result.recommendedQuickstart.title}</h3>
            <p className="text-gray-400 mb-4">{result.recommendedQuickstart.description}</p>
            
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-500 mb-2">Deliverables</h4>
            <ul className="list-disc pl-5 space-y-1 mb-8 text-gray-300">
              {result.recommendedQuickstart.deliverables.map((d, i) => <li key={i}>{d}</li>)}
            </ul>

            <button onClick={() => setQualificationStarted(true)} className="w-full bg-accent text-black font-bold py-4 rounded hover:bg-green-400 text-lg">
              Apply for this Quickstart &rarr;
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
