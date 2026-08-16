export default function Tabs({ tabs = [
  { label: "Overview", content: "This is the overview content." },
  { label: "Details", content: "This is the details content." },
  { label: "Settings", content: "This is the settings content." },
] }) {
  const [active, setActive] = React.useState(0);

  return (
    <div className="w-full max-w-md">
      <div className="flex gap-1 bg-black/30 p-1 rounded-xl">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className="flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all border-none cursor-pointer"
            style={{
              background: active === i ? "rgba(59,232,255,0.2)" : "transparent",
              color: active === i ? "#3be8ff" : "rgba(255,255,255,0.4)",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-3 p-4 rounded-xl border border-white/[0.07] bg-white/[0.02] text-white/70 text-sm">
        {tabs[active]?.content}
      </div>
    </div>
  );
}