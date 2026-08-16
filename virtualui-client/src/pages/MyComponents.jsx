import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { LiveProvider, LivePreview, LiveError } from "react-live";
import { FiRefreshCw } from "react-icons/fi";
import {
  TbPackage,
  TbCode,
  TbEye,
  TbBox,
  TbX,
  TbBrandNpm,
  TbSearch,
  TbChevronRight,
  TbCopy,
  TbCheck
} from "react-icons/tb";

// ----------------------------------------------------------------------
// 1. Live Component Preview (Executes raw code string dynamically)
// ----------------------------------------------------------------------
export const LiveComponentPreview = ({ code }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshPreview = () => {
    setRefreshKey((prev) => prev + 1);
  };

  if (!code) return null;

  // Clean import/export syntax for react-live compilation
  let sanitized = code
    .replace(/import\s+.*?from\s+["'].*?["'];?/g, "")
    .replace(/export\s+default\s+/g, "")
    .replace(/export\s+/g, "");

  // Sanitize position fixed declarations to avoid overlapping page UI
  sanitized = sanitized
    .replace(/position\s*:\s*["']fixed["']/g, 'position: "absolute"')
    .replace(/position\s*:\s*`fixed`/g, 'position: "absolute"')
    .replace(/\bfixed\b/g, "absolute");

  // Improved Regex: Matches "const ComponentName" OR "function ComponentName"
  const match = sanitized.match(/(?:const|function)\s+([A-Z]\w+)/);
  const componentName = match ? match[1] : null;

  // Append render tag for react-live noInline mode
  const wrappedCode = componentName
    ? `${sanitized}\n\nrender(<${componentName} />)`
    : sanitized;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "100%"
      }}
    >
      <motion.button
        onClick={refreshPreview}
        title="Refresh preview"
        aria-label="Refresh preview"
        style={{
          position: "absolute",
          right: "8px",
          top: "8px",
          background: "#1e293b",
          border: "none",
          color: "#94a3b8",
          padding: "6px",
          borderRadius: "8px",
          cursor: "pointer",
          zIndex: 10,
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FiRefreshCw size={16} />
      </motion.button>

      <LiveProvider
        key={refreshKey}
        code={wrappedCode}
        scope={{ React, useState, useEffect, useRef, useCallback, motion }}
        noInline={true}
      >
        <motion.div
          style={{
            width: "100%",
            minHeight: "300px",
            maxWidth: "100%",
            border: "1px solid #1e293b",
            borderRadius: "12px",
            background: "#020617",
            position: "relative",
            overflow: "hidden",
            padding: "clamp(10px, 2vw, 20px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <LivePreview className="w-full flex justify-center" />
        </motion.div>

        <LiveError
          style={{
            marginTop: "10px",
            padding: "10px",
            background: "#450a0a",
            color: "#f87171",
            borderRadius: "6px",
            fontSize: "clamp(12px, 1.5vw, 14px)",
            overflowX: "auto",
          }}
        />

        {!componentName && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              marginTop: "10px",
              padding: "10px",
              background: "#1e293b",
              borderRadius: "6px",
              color: "#94a3b8",
              fontSize: "clamp(12px, 1.5vw, 14px)",
            }}
          >
            Preview is not available. Copy the code and paste it into your project.
          </motion.div>
        )}
      </LiveProvider>
    </div>
  );
};

// ----------------------------------------------------------------------
// 2. Code Block Helper Component
// ----------------------------------------------------------------------
function CodeBlock({ code, lang = "jsx" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative rounded-xl overflow-hidden bg-[#020608] border border-white/[0.06] font-mono text-xs text-white/80">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.05] bg-white/[0.02]">
        <span className="text-[10px] uppercase font-bold text-white/30 tracking-wider">
          {lang}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[11px] text-white/40 hover:text-white transition-colors cursor-pointer bg-transparent border-0"
        >
          {copied ? (
            <>
              <TbCheck size={13} className="text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <TbCopy size={13} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto leading-relaxed text-emerald-400/90">
        <code>{code || "// No code available"}</code>
      </pre>
    </div>
  );
}

// ----------------------------------------------------------------------
// 3. Live Component Wrapper (Integrates your LiveComponentPreview)
// ----------------------------------------------------------------------
function LiveComponent({ component }) {
  return <LiveComponentPreview code={component?.code} />;
}

// ----------------------------------------------------------------------
// 4. Empty State Guide Panel Component
// ----------------------------------------------------------------------
function GuidePanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full text-center py-16 px-4"
    >
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#3be8ff]/[0.07] border border-[#3be8ff]/15 flex items-center justify-center mx-auto mb-5 sm:mb-6">
        <TbPackage size={24} className="text-[#3be8ff]/60" />
      </div>

      <h2 className="text-base sm:text-lg font-bold mb-2 text-white/80">
        Select a component
      </h2>
      <p className="text-white/35 text-xs sm:text-sm mb-8 sm:mb-10 max-w-sm mx-auto leading-relaxed">
        Click any component from the sidebar to see its preview, code, and usage guide.
      </p>

      <p className="text-white/20 text-xs">
        ← Select a component from the sidebar to get started
      </p>
    </motion.div>
  );
}

// ----------------------------------------------------------------------
// 5. Sidebar Component
// ----------------------------------------------------------------------
function SidebarComponent({ selected, search, setSearch, myComponents, onSelect }) {
  return (
    <div className="w-64 sm:w-72 border-r border-white/[0.06] flex flex-col h-full bg-[#030b0d] shrink-0">
      <div className="p-4 border-b border-white/[0.06]">
        <div className="relative flex items-center">
          <TbSearch className="absolute left-3 text-white/30" size={14} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search my components..."
            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-white/25 focus:outline-none focus:border-[#3be8ff]/40 transition-colors"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        <div className="px-3 py-2 text-[10px] font-bold tracking-widest text-white/30 uppercase">
          MY COMPONENTS • {myComponents?.length || 0}
        </div>

        {myComponents?.length === 0 ? (
          <p className="text-white/20 text-xs px-3 py-4 text-center">
            No components found
          </p>
        ) : (
          myComponents?.map((c) => {
            const isSelected = selected?._id === c._id;
            return (
              <button
                key={c._id || c.name}
                onClick={() => onSelect(c)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs text-left transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-[#3be8ff]/10 border-[#3be8ff]/30 text-white font-medium"
                    : "bg-transparent border-transparent text-white/60 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <span className="truncate">{c.name}</span>
                <TbChevronRight
                  size={12}
                  className={`transition-transform ${
                    isSelected ? "text-[#3be8ff] translate-x-0.5" : "text-white/20"
                  }`}
                />
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 6. Detail Panel Component
// ----------------------------------------------------------------------
function DetailPanel({ component, onBack }) {
  const [activeTab, setActiveTab] = useState("preview");

  const usageCode = `import ${component?.name} from "./${component?.name}";

export default function App() {
  return (
    <div>
      <${component?.name}${
    component?.props?.length
      ? `\n        ${component.props.map((p) => `${p}={/* value */}`).join("\n        ")}`
      : ""
  }
      />
    </div>
  );
};`;

  return (
    <motion.div
      key={component?._id}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col h-full"
    >
      {/* Top Bar / Header */}
      <div className="flex items-start sm:items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-white/[0.06] gap-3 flex-wrap">
        <div className="flex items-center gap-3 min-w-0">
          {onBack && (
            <button
              onClick={onBack}
              className="sm:hidden flex items-center justify-center w-8 h-8 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/50 hover:text-white/80 transition-colors cursor-pointer shrink-0"
            >
              <TbX size={14} />
            </button>
          )}

          <div className="min-w-0">
            <h2 className="text-sm sm:text-base font-bold text-white truncate">
              {component?.name}
            </h2>
            <p className="text-white/35 text-[11px] sm:text-xs mt-0.5 truncate">
              {component?.props?.length > 0
                ? `Props: ${component.props.join(", ")}`
                : "No props"}
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div
          className="flex gap-1 rounded-xl p-1 overflow-x-auto shrink-0"
          style={{ background: "rgba(0,0,0,0.3)" }}
        >
          {[
            { id: "preview", icon: TbEye, label: "Preview" },
            { id: "code", icon: TbCode, label: "Code" },
            { id: "guide", icon: TbBox, label: "Guide" },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-all capitalize cursor-pointer border-none whitespace-nowrap"
              style={{
                background:
                  activeTab === id ? "rgba(59,232,255,0.15)" : "transparent",
                color: activeTab === id ? "#3be8ff" : "rgba(255,255,255,0.35)",
              }}
            >
              <Icon size={11} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Main Body Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <AnimatePresence mode="wait">
          {activeTab === "preview" && (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LiveComponent component={component} />
            </motion.div>
          )}

          {activeTab === "code" && (
            <motion.div
              key="code"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CodeBlock code={component?.code} lang="jsx" />
            </motion.div>
          )}

          {activeTab === "guide" && (
            <motion.div
              key="guide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <p className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-4">
                USAGE GUIDE
              </p>

              <div>
                <p className="text-xs font-semibold text-white/50 mb-3 flex items-center gap-2">
                  <TbCode size={13} />
                  <span className="text-[#3be8ff]/70 font-bold">01</span> Copy the component code
                </p>
                <CodeBlock code={component?.code} lang="jsx" />
              </div>

              <div>
                <p className="text-xs font-semibold text-white/50 mb-3 flex items-center gap-2">
                  <TbCode size={13} />
                  <span className="text-[#3be8ff]/70 font-bold">02</span> Import and use in App.jsx
                </p>
                <CodeBlock code={usageCode} lang="jsx" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------------------------
// 7. Main Root Component
// ----------------------------------------------------------------------
export default function MyComponents() {
  const navigate = useNavigate();
  const { allComponents, userData } = useSelector((s) => s.user || {});
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filter components owned by logged-in user
  const myComponents = (allComponents || [])
    .filter((c) => c.visibility === "private")
    .filter((c) => c.owner?._id === userData?._id)
    .filter((c) => c.name?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.name?.localeCompare(b.name));

  const handleSelect = (c) => {
    setSelected(c);
    setSidebarOpen(false);
  };

  return (
    <div
      className="min-h-screen bg-[#030b0d] text-white overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="flex h-screen overflow-hidden">
        <SidebarComponent
          selected={selected}
          search={search}
          setSearch={setSearch}
          myComponents={myComponents}
          onSelect={handleSelect}
        />

        <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#030b0d]">
          {selected ? (
            <DetailPanel
              component={selected}
              onBack={() => setSelected(null)}
            />
          ) : (
            <GuidePanel />
          )}
        </div>
      </div>
    </div>
  );
}