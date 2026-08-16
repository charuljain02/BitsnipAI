export default function Footer({ logo = "BitsnipAI", links = ["Home", "Features", "Pricing", "Contact"], copyright = "© 2026 BitsnipAI. All rights reserved." }) {
  return (
    <footer className="w-full bg-[#040e11] border-t border-white/[0.06] px-6 py-8 text-white">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-lg font-bold text-[#3be8ff]">{logo}</span>
        <nav className="flex flex-wrap gap-5 text-sm text-white/50">
          {links.map((link) => (
            <a key={link} href="#" className="hover:text-[#3be8ff] transition-colors">
              {link}
            </a>
          ))}
        </nav>
        <p className="text-xs text-white/30">{copyright}</p>
      </div>
    </footer>
  );
}