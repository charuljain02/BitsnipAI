export default function Stepper({ steps = ["Account", "Profile", "Confirm"], currentStep }) {
  const [internalStep, setInternalStep] = React.useState(1);
  const active = currentStep || internalStep;

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center">
        {steps.map((label, i) => {
          const num = i + 1;
          const isDone = num < active;
          const isActive = num === active;
          return (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: isDone ? "rgba(16,185,129,0.15)" : isActive ? "rgba(59,232,255,0.15)" : "rgba(255,255,255,0.05)",
                    color: isDone ? "#34d399" : isActive ? "#3be8ff" : "rgba(255,255,255,0.3)",
                    border: `1px solid ${isDone ? "rgba(16,185,129,0.3)" : isActive ? "rgba(59,232,255,0.3)" : "rgba(255,255,255,0.1)"}`,
                  }}
                >
                  {isDone ? "✓" : num}
                </div>
                <span className="text-[10px] text-white/40 whitespace-nowrap">{label}</span>
              </div>
              {num < steps.length && (
                <div
                  className="flex-1 h-[1.5px] mx-2 mb-4"
                  style={{ background: isDone ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.08)" }}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="flex gap-2 mt-5">
        <button
          onClick={() => setInternalStep((s) => Math.max(1, s - 1))}
          disabled={active === 1}
          className="px-3 py-1.5 rounded-lg text-xs bg-white/5 text-white/50 border-none disabled:opacity-30 cursor-pointer"
        >
          Back
        </button>
        <button
          onClick={() => setInternalStep((s) => Math.min(steps.length, s + 1))}
          disabled={active === steps.length}
          className="px-3 py-1.5 rounded-lg text-xs bg-[#3be8ff]/15 text-[#3be8ff] border-none disabled:opacity-30 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}