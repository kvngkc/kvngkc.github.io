export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-card border-y border-border">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-accent">You don't need another dashboard.</h2>
        
        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
          <p className="text-white text-xl font-medium">
            You need systems that stop your business from bleeding time, money, and opportunities.
          </p>
          
          <p>
            Growing businesses often run on operational duct tape: spreadsheets, WhatsApp messages, disconnected tools, manual processes, and information that exists only in someone's head.
          </p>
          
          <p>That works until the business grows. Then you start seeing the symptoms:</p>
          
          <ul className="list-disc pl-6 space-y-2 text-gray-400">
            <li>Inventory that doesn't match reality.</li>
            <li>Leads that disappear between conversations and follow-ups.</li>
            <li>Manual processes that consume hours every week.</li>
            <li>Data scattered across different systems.</li>
            <li>Teams working around software instead of software working for them.</li>
          </ul>

          <p className="text-white font-medium mt-8">That's where I come in.</p>
          
          <p>
            I build custom software systems, internal tools, AI workflows, and automation that fit how a business actually operates. I start with the workflow, not the technology. I map how information, people, money, inventory, and decisions move through the business, then turn those processes into reliable digital systems.
          </p>

          <div className="bg-background border border-border p-6 rounded-lg mt-8">
            <h3 className="font-semibold text-white mb-4">My technical toolkit includes:</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'AI-powered automation', 'Fastify', 'System Architecture'].map((tool) => (
                <span key={tool} className="bg-card border border-border px-3 py-1 rounded text-sm text-gray-300">
                  {tool}
                </span>
              ))}
            </div>
            <p className="mt-4 italic text-sm text-gray-500">
              But the technology is the means, not the product. The goal is simple: make your operations more visible, more reliable, and less dependent on manual work.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
