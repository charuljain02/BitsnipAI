import React, { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { label: "Home", href: "#" },
    { label: "Features", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "About", href: "#" },
  ];

  return (
    <nav className="w-full bg-slate-900 border-b border-slate-800 text-white">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">

        {/* ================= DESKTOP / MAIN NAVBAR ================= */}
        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <a
            href="#"
            className="flex items-center flex-shrink-0"
          >
            {/* Logo Icon */}
            <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center mr-3 shadow-lg shadow-cyan-400/10">
              <svg
                className="w-6 h-6 text-cyan-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Logo Text */}
            <span className="text-xl font-bold tracking-tight whitespace-nowrap">
              Nova<span className="text-cyan-400">UI</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center ml-auto mr-10">
            {links.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                className={`
                  text-sm font-medium
                  text-slate-300
                  hover:text-cyan-400
                  transition-colors duration-200
                  whitespace-nowrap
                  ${index !== links.length - 1 ? "mr-8" : ""}
                `}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center flex-shrink-0">

            {/* Sign In */}
            <button
              type="button"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200 mr-6 whitespace-nowrap"
            >
              Sign In
            </button>

            {/* CTA */}
            <button
              type="button"
              className="
                px-5 py-2.5
                rounded-lg
                bg-cyan-400
                text-slate-950
                text-sm
                font-semibold
                hover:bg-cyan-300
                active:bg-cyan-500
                transition-all duration-200
                shadow-lg shadow-cyan-400/20
                whitespace-nowrap
              "
            >
              Get Started
            </button>
          </div>

          {/* ================= MOBILE MENU BUTTON ================= */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="
              md:hidden
              w-10 h-10
              flex items-center justify-center
              rounded-lg
              border border-slate-700
              bg-slate-800
              text-slate-300
              hover:text-cyan-400
              hover:border-cyan-400/40
              transition-all duration-200
            "
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              /* X Icon */
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M6 6L18 18M18 6L6 18"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              /* Hamburger Icon */
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M4 6H20M4 12H20M4 18H20"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>

        {/* ================= MOBILE DRAWER ================= */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 py-6">

            {/* Mobile Links */}
            <div className="flex flex-col">

              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="
                    py-3
                    text-base
                    font-medium
                    text-slate-300
                    hover:text-cyan-400
                    transition-colors duration-200
                  "
                >
                  {link.label}
                </a>
              ))}

              {/* Divider */}
              <div className="h-px bg-slate-800 my-4" />

              {/* Sign In */}
              <button
                type="button"
                className="
                  py-3
                  text-left
                  text-base
                  font-medium
                  text-slate-300
                  hover:text-white
                  transition-colors duration-200
                "
              >
                Sign In
              </button>

              {/* Mobile CTA */}
              <button
                type="button"
                className="
                  w-full
                  mt-4
                  px-5 py-3
                  rounded-lg
                  bg-cyan-400
                  text-slate-950
                  font-semibold
                  hover:bg-cyan-300
                  transition-colors duration-200
                  shadow-lg shadow-cyan-400/20
                "
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}