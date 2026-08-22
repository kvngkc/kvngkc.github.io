import { ArrowRight, Terminal } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-40 pb-20 px-6 max-w-5xl mx-auto flex flex-col items-start justify-center min-h-[80vh]">
      <div className="inline-flex items-center space-x-2 bg-card border border-border px-3 py-1 rounded-full text-xs font-medium text-gray-400 mb-8">
        <Terminal size={14} className="text-accent" />
        <span>Fractional Ops & AI Systems Engineer</span>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
        I build the AI operating systems<br />
        <span className="text-gray-500">that run growing businesses.</span>
      </h1>
      
      <p className="text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
        I replace operational duct tape with custom, bulletproof software designed precisely for how your business actually works. 
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <a href="#about" className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
          <span>Read the Manifesto</span>
          <ArrowRight size={18} />
        </a>
        <a href="#systems" className="bg-card border border-border text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center">
          View the Systems
        </a>
      </div>
    </section>
  )
}
