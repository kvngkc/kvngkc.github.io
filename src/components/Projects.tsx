import { ArrowUpRight, Database, LayoutTemplate, MessageSquare, Briefcase } from 'lucide-react';

const projects = [
  {
    title: "LeadFlow AI",
    role: "AI-powered Sales Operating System",
    icon: <MessageSquare size={20} className="text-accent" />,
    problem: "Sales teams on WhatsApp lose leads due to manual tracking, missed follow-ups, and disconnected CRMs.",
    approach: "Mapped the sales conversation lifecycle from initial contact to close, abstracting it into a strict state machine.",
    solution: "Architected a WhatsApp-native AI Sales OS using Fastify and Drizzle ORM that automatically captures leads, injects context via RAG, and drives the conversation toward an objective.",
    impact: "Stops revenue leakage by ensuring 100% follow-up rate and seamless CRM sync without manual data entry.",
    tech: ["TypeScript", "Fastify", "PostgreSQL", "Drizzle ORM", "Redis", "LLM Integration"]
  },
  {
    title: "Victor's LinkedIn Engine",
    role: "Hard-Gated Content Funnel OS",
    icon: <LayoutTemplate size={20} className="text-accent" />,
    problem: "Creating high-converting, authentic content consistently requires navigating context switching and AI 'hallucinations' that dilute brand voice.",
    approach: "Built a 9-stage pipeline that forces human authenticity before allowing AI drafting, using Socratic interviews and 'Skeptical AI' challenges.",
    solution: "A provider-agnostic LLM workspace with mid-session context retention, multi-identity tagging, and strict human-review gates before scheduling.",
    impact: "Enables consistent, high-signal content generation tailored to specific audience funnels without sounding like a generic AI.",
    tech: ["React", "LLM APIs (Anthropic/Gemini)", "Publora API", "Context Engineering"]
  },
  {
    title: "McDaves Company Brain",
    role: "B2B/B2C Institutional Operating System",
    icon: <Database size={20} className="text-accent" />,
    problem: "Scaling optical supply chains break when inventory, transactions, and SOPs exist across disparate ledgers and staff memory.",
    approach: "Categorized all operations into a strict epistemic taxonomy (Facts, Policies, SOPs) and mapped the physical supply chain to digital states.",
    solution: "Engineered a centralized intelligence dashboard and version-controlled knowledge repository using Next.js App Router and Supabase.",
    impact: "Eliminated stockouts by enforcing strict transaction integrity across multiple locations.",
    tech: ["Next.js", "Supabase", "React", "PostgreSQL", "Knowledge Architecture"]
  },
  {
    title: "Struxel",
    role: "Engineering Project Management",
    icon: <Briefcase size={20} className="text-accent" />,
    problem: "Engineering workforces struggle with disconnected tasks, lack of visibility across project stages, and unoptimized resource allocation.",
    approach: "Designed a centralized hub that connects the workforce directly to project lifecycles.",
    solution: "Built a robust project management application to streamline operations, task assignments, and workforce tracking.",
    impact: "Increased operational visibility and streamlined team workflows for engineering managers.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS"]
  }
];

export default function Projects() {
  return (
    <section id="systems" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-4">Systems & Engines</h2>
        <p className="text-gray-400 max-w-2xl text-lg">
          A selection of full-stack systems I've built to automate operations and eliminate manual bottlenecks.
        </p>
      </div>

      <div className="space-y-8">
        {projects.map((project, idx) => (
          <div key={idx} className="bg-card border border-border p-8 rounded-xl hover:border-gray-700 transition-colors group">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-background rounded-lg border border-border">
                  {project.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <span className="text-sm font-medium text-accent">{project.role}</span>
                </div>
              </div>
              <ArrowUpRight size={20} className="text-gray-600 group-hover:text-white transition-colors" />
            </div>

            <div className="space-y-4 text-sm text-gray-300 mb-6">
              <div><strong className="text-white">The Problem:</strong> {project.problem}</div>
              <div><strong className="text-white">The Approach:</strong> {project.approach}</div>
              <div><strong className="text-white">The Solution:</strong> {project.solution}</div>
              <div><strong className="text-white">The Impact:</strong> {project.impact}</div>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="text-xs font-medium text-gray-400 bg-background border border-border px-2 py-1 rounded">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
