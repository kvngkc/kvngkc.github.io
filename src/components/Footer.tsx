import { Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border bg-background">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
        
        <div className="mb-4 md:mb-0">
          <span className="font-bold text-lg tracking-tight text-white block">Victor K. Okoye</span>
          <span className="text-sm text-gray-500">Fractional Ops & AI Systems Engineer</span>
        </div>

        <div className="flex space-x-6 items-center">
          <a href="https://github.com/kvngkc" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
            GitHub
          </a>
          <a href="https://linkedin.com/in/victor-k-okoye" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
            LinkedIn
          </a>
          <a href="mailto:victor.k.okoye@gmail.com" className="text-gray-400 hover:text-white transition-colors">
            <span className="sr-only">Email</span>
            <Mail size={20} />
          </a>
        </div>
        
      </div>
    </footer>
  )
}
