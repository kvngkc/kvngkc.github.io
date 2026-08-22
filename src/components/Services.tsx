export default function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-card border-y border-border">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How I Work</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            I work with growing businesses that have outgrown spreadsheets and disconnected tools, but don't need a massive enterprise implementation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-background border border-border p-6 rounded-xl flex flex-col h-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-600"></div>
            <div className="mb-4 text-gray-500 font-mono text-sm">Step 01</div>
            <h3 className="text-xl font-bold text-white mb-2">The Playbook</h3>
            <p className="text-gray-400 text-sm mb-6 flex-grow">
              Start diagnosing your own bottlenecks. Take the interactive 5-minute health scorecard to identify where your business is bleeding time and how to patch it.
            </p>
            <a href="/scorecard" className="w-full block text-center py-2 bg-card border border-border rounded text-sm font-medium hover:bg-gray-800 transition-colors text-gray-300">
              Take the Free Scorecard
            </a>
          </div>

          {/* Step 2 */}
          <div className="bg-background border border-accent/20 p-6 rounded-xl flex flex-col h-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-accent"></div>
            <div className="mb-4 text-accent font-mono text-sm">Step 02</div>
            <h3 className="text-xl font-bold text-white mb-2">Operational Quickstart</h3>
            <p className="text-gray-400 text-sm mb-6 flex-grow">
              A fixed-scope, fast-turnaround intervention to automate one high-friction workflow and prove immediate ROI.
            </p>
            <button className="w-full py-2 bg-accent text-black rounded text-sm font-bold hover:bg-accent-hover transition-colors">
              Apply for Quickstart
            </button>
          </div>

          {/* Step 3 */}
          <div className="bg-background border border-border p-6 rounded-xl flex flex-col h-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-600"></div>
            <div className="mb-4 text-gray-500 font-mono text-sm">Step 03</div>
            <h3 className="text-xl font-bold text-white mb-2">Systems Implementation</h3>
            <p className="text-gray-400 text-sm mb-6 flex-grow">
              I architect, build, and deploy the custom software system or AI workflow designed precisely for how your business actually operates.
            </p>
            <a href="mailto:victor.k.okoye@gmail.com" className="w-full py-2 bg-white text-black text-center rounded text-sm font-bold hover:bg-gray-200 transition-colors block">
              Inquire for Build
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
