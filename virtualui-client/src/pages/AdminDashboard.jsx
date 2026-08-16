import React, { useState } from 'react';
import {
  TbUsers, TbCode, TbLogout, TbPlus, TbLayoutDashboard,
  TbPackage, TbX, TbTrash, TbDeviceFloppy, TbUpload,
  TbEye, TbCodeDots, TbLoader, TbMenu2, TbChevronLeft,
  TbWorld, TbSearch, TbBoxOff
} from "react-icons/tb";

import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { SiValorant } from "react-icons/si";
import { ServerUrl } from '../App';
import axios from 'axios';
import { setUserData } from '../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from "motion/react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';
import { LiveComponentPreview } from '../components/LiveComponentPreview.jsx';
// Custom Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      className='fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl'
      style={{
        background: type === "success" ? "#0d9f6e" : type === "error" ? "#e02424" : "#1c1c2e",
        color: "#fff",
        minWidth: "220px",
      }}
    >
      {type === "success" ? <FiCheckCircle size={18} /> : <FiAlertCircle size={18} />}
      <p className='text-sm font-medium'>{message}</p>
      <button
        onClick={onClose}
        className='ml-auto text-white/60 hover:text-white text-xs bg-transparent border-none cursor-pointer p-0 flex items-center justify-center'
      >
        <TbX size={18} />
      </button>
    </motion.div>
  );
};

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0a1f24] border border-white/10 rounded-xl px-3 py-2 text-xs shadow-xl">
      <p className="text-white/50 mb-1">{label}</p>
      <p className="text-[#a78bfa] font-bold">
        {payload[0].value} components
      </p>
    </div>
  );
}

function PropsInput({ props, setProps }) {
  const [input, setInput] = useState("");

  const addProps = () => {
    const trimmed = input.trim();
    if (trimmed && !props.includes(trimmed)) {
      setProps([...props, trimmed]);
    }
    setInput("");
  };

  const removeProps = (p) => setProps(props.filter((x) => x !== p));

  return (
    <div>
      <div className='flex flex-wrap gap-1.5 mb-2 min-h-[28px]'>
        {props.map((p) => (
          <span
            key={p}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold"
            style={{
              background: "rgba(167,139,250,0.15)",
              color: "#a78bfa",
              border: "1px solid rgba(167,139,250,0.25)"
            }}
          >
            {p}
            <button
              onClick={() => removeProps(p)}
              className="ml-0.5 opacity-60 hover:opacity-100 transition-opacity bg-transparent border-none cursor-pointer p-0 leading-none"
              style={{ color: "#a78bfa" }}
            >
              <TbX size={11} />
            </button>
          </span>
        ))}
        {props.length === 0 && (
          <span className="text-xs text-white/20 self-center">
            No props added yet
          </span>
        )}
      </div>

      <div className='flex gap-2'>
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              addProps();
            }
          }}
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder='e.g. "title", "onClick", "children"'
          className="flex-1 min-w-0 bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-white/20 outline-none focus:border-[#a78bfa]/50 transition-colors"
        />
        <button
          onClick={addProps}
          className="px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold border-none cursor-pointer transition-all whitespace-nowrap"
          style={{
            background: "rgba(167,139,250,0.15)",
            color: "#a78bfa",
            border: "1px solid rgba(167,139,250,0.25)"
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}

function AddComponentForm() {
  const [name, setName] = useState("");
  const [props, setProps] = useState([]);
  const [code, setCode] = useState("");
  const [codeTab, setCodeTab] = useState("code");

  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [savedId, setSavedId] = useState(null);
  const [isPublished, setIsPublished] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await axios.post(
        ServerUrl + "/api/component/save",
        { name, code, props },
        { withCredentials: true }
      );
      setSavedId(res.data._id);
      showToast("Component saved successfully!", "success");
    } catch (error) {
      console.log(error);
      showToast("Failed to save component", "error");
    } finally {
      setSaving(false);
    }
  };

  const handlePublished = async () => {
  if (!savedId) return;
  setPublishing(true);
  try {
    await axios.post(
      ServerUrl + "/api/component/publish",
      { 
        componentId: savedId,
        name,
        code,
        props 
      },
      { withCredentials: true }
    );
    setIsPublished(true);
    showToast("Published to npm successfully!", "success");
  } catch (error) {
    console.error("Publish Error:", error.response?.data || error.message);
    showToast(error.response?.data?.message || "Publish Failed", "error");
  } finally {
    setPublishing(false);
  }
};

  return (
    <div className='px-4 sm:px-6 lg:px-8 py-5 sm:py-6 max-w-3xl w-full mx-auto'>
      <h2 className='text-base sm:text-lg font-bold mb-1'>
        Add Component
      </h2>
      <p className='text-white/35 text-xs mb-5 sm:mb-6'>
        Manually add a component – give it a name, define props, paste the code and preview it.
      </p>

      <div className='space-y-4 sm:space-y-5'>
        {/* Component Name Input */}
        <div className='p-3.5 sm:p-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] space-y-2'>
          <label
            htmlFor="name"
            className='text-xs font-semibold text-white/50 uppercase tracking-wider block'
          >
            Component Name
          </label>
          <input
            type="text"
            id='name'
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder='e.g. "PricingCard", "HeroSection"'
            className='w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-[#3be8ff]/40 transition-colors'
          />
        </div>

        {/* Props Input */}
        <div className='p-3.5 sm:p-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] space-y-2'>
          <label className='text-xs font-semibold text-white/50 uppercase tracking-wider block'>
            Props
          </label>
          <PropsInput props={props} setProps={setProps} />
        </div>

        {/* Code / Preview Switcher */}
        <div className='rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden'>
          <div className='flex items-center justify-between px-3.5 sm:px-4 py-3 border-b border-white/[0.06]'>
            <label className='text-xs font-semibold text-white/50 uppercase tracking-wider'>
              Component Code
            </label>
            <div
              className="flex gap-1 rounded-xl p-1"
              style={{ background: "rgba(0,0,0,0.3)" }}
            >
              {[
                { id: "code", label: "Code", Icon: TbCodeDots },
                { id: "preview", label: "Preview", Icon: TbEye }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCodeTab(tab.id)}
                  className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize border-none cursor-pointer"
                  style={{
                    background: codeTab === tab.id ? "rgba(59,232,255,0.2)" : "transparent",
                    color: codeTab === tab.id ? "#3be8ff" : "rgba(255,255,255,0.4)",
                  }}
                >
                  <tab.Icon size={14} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode='wait'>
            {codeTab === "code" ? (
              <motion.div
                key="code-editor"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <textarea
                  onChange={(e) => setCode(e.target.value)}
                  value={code}
                  rows={12}
                  placeholder={`export default function MyComponent({ title }) {\n  return (\n    <div>\n      <h1>{title}</h1>\n    </div>\n  );\n}`}
                  className="w-full bg-[#0d1117] px-4 sm:px-5 py-4 text-xs leading-relaxed text-green-300 font-mono resize-none outline-none placeholder-white/10"
                  style={{ minHeight: 220 }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="code-preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-4 bg-[#080d0f] min-h-[220px] flex items-center justify-center"
              >
<LiveComponentPreview code={code} />    
          </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 pt-2">
          {/* Save Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            disabled={saving || savedId}
            onClick={handleSave}
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all border-none cursor-pointer"
            style={{
              background: savedId ? "rgba(16,185,129,0.12)" : "rgba(59,232,255,0.12)",
              color: savedId ? "#34d399" : "#3be8ff",
              border: `1px solid ${savedId ? "rgba(16,185,129,0.3)" : "rgba(59,232,255,0.25)"}`
            }}
          >
            {saving ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="flex items-center"
              >
                <TbDeviceFloppy size={15} />
              </motion.span>
            ) : (
              <TbDeviceFloppy size={15} />
            )}
            {saving ? "Saving..." : savedId ? "Saved ✓" : "Save Component"}
          </motion.button>

          {/* Publish / Published Animation */}
          <AnimatePresence>
            {savedId && !isPublished && (
              <motion.button
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                whileTap={{ scale: 0.97 }}
                disabled={publishing}
                onClick={handlePublished}
                className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-40 transition-all border-none cursor-pointer text-white"
                style={{
                  background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                  boxShadow: publishing ? "none" : "0 0 20px rgba(6,182,212,0.25)",
                }}
              >
                {publishing ? "Publishing..." : "Publish to npm"}
              </motion.button>
            )}

            {isPublished && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
                style={{
                  background: "rgba(16,185,129,0.1)",
                  border: "1px solid rgba(16,185,129,0.3)",
                  color: "#34d399"
                }}
              >
                ✓ Published
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reset Form Button */}
          {(savedId || name || code) && (
            <button
              onClick={() => {
                setName("");
                setProps([]);
                setCode("");
                setSavedId(null);
                setIsPublished(false);
                setCodeTab("code");
              }}
              className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-white/30 hover:text-white/60 transition-all bg-transparent border-none cursor-pointer"
            >
              <TbTrash size={13} /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Toast Notification Container */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function AdminDashboard() {
  const [activeView, setActiveView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [componentSearch, setComponentSearch] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userData, allUsers, allComponents } = useSelector((s) => s.user);

  const publicComponents = allComponents?.filter((c) => c.visibility === "public") || [];

  const filteredPublicComponents = componentSearch.trim()
    ? publicComponents.filter((c) =>
        c.name?.toLowerCase().includes(componentSearch.toLowerCase()) ||
        c.props?.some((p) => p.toLowerCase().includes(componentSearch.toLowerCase()))
      )
    : publicComponents;

  const navItems = [
    { id: "dashboard", label: "Dashboard", Icon: TbLayoutDashboard },
    { id: "add", label: "Add Component", Icon: TbPackage },
  ];

  const stats = [
    { label: "Total Users", value: allUsers?.length || 0, icon: TbUsers, color: "#3be8ff" },
    { label: "Components Made", value: publicComponents?.length || 0, icon: TbCode, color: "#a78bfa" },
  ];

  const chartData = (() => {
    if (!publicComponents.length) return [];
    const map = {};
    publicComponents.forEach((c) => {
      const raw = c.createdAt;
      if (!raw) return;
      const label = new Date(raw).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      });
      map[label] = (map[label] || 0) + 1;
    });
    return Object.entries(map)
      .map(([date, count]) => ({ date, components: count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(-12);
  })();

  const handleLogout = async () => {
    try {
      await axios.get(ServerUrl + "/api/auth/logout", { withCredentials: true });
      dispatch(setUserData(null));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const SidebarContent = () => (
    <>
      <div className='flex items-center gap-2.5 px-5 py-5 border-b border-white/[0.05]'>
        <div className='w-8 h-8 rounded-xl bg-gradient-to-br from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center shadow-[0_0_14px_rgba(59,232,255,0.4)] flex-shrink-0'>
          <SiValorant size={15} color="#051c20" />
        </div>
        <div>
          <span className='text-base font-bold block'>BitsnipAI</span>
          <span className='text-[10px] text-[#3be8ff]/60 font-semibold tracking-[2px] uppercase'>Admin</span>
        </div>
        <button
          className='ml-auto md:hidden bg-transparent border-none cursor-pointer p-1.5 rounded-lg text-white/40 hover:text-white/70 transition-colors'
          onClick={() => setSidebarOpen(false)}
        >
          <TbX size={18} />
        </button>
      </div>

      <nav className='flex-1 px-3 py-4 space-y-1'>
        {navItems.map(({ id, label, Icon }) => {
          const isActive = activeView === id;
          return (
            <button
              key={id}
              onClick={() => {
                setActiveView(id);
                setSidebarOpen(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all bg-transparent border-none cursor-pointer text-left"
              style={{
                background: isActive ? "rgba(59,232,255,0.08)" : "transparent",
                color: isActive ? "#3be8ff" : "rgba(255,255,255,0.45)",
                borderLeft: isActive ? "2px solid #3be8ff" : "2px solid transparent",
              }}
            >
              <Icon size={16} style={{ opacity: isActive ? 1 : 0.7 }} />
              {label}
            </button>
          );
        })}
      </nav>

      <div className='p-3 border-t border-white/[0.05]'>
        <button
          onClick={handleLogout}
          className='w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/[0.06] transition-all cursor-pointer bg-transparent border-none text-left'
        >
          <TbLogout size={16} /> LogOut
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#030b0d] text-white flex overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Desktop Sidebar */}
      <aside className='hidden md:flex flex-col w-60 min-h-screen bg-[#040e11] border-r border-white/[0.06] fixed top-0 left-0 z-20'>
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='fixed inset-0 z-30 bg-black/60 backdrop-blur-[2px] md:hidden'
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className='fixed top-0 left-0 z-40 flex flex-col w-64 min-h-screen bg-[#040e11] border-r border-white/[0.06] md:hidden'
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <main className='flex-1 md:ml-60 min-h-screen overflow-y-auto'>
        {/* Top Header */}
        <div className='sticky top-0 z-10 px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 bg-[#030b0d]/90 backdrop-blur-md border-b border-white/[0.05] flex items-center justify-between gap-2'>
          <div className='flex items-center gap-3 min-w-0'>
            <button
              onClick={() => setSidebarOpen(true)}
              className='md:hidden bg-transparent border-none cursor-pointer p-1.5 rounded-lg text-white/50 hover:text-white/80 hover:bg-white/[0.05] transition-all flex-shrink-0'
            >
              <TbMenu2 size={20} />
            </button>
            <div className='min-w-0'>
              <h1 className='text-base sm:text-lg font-bold truncate'>
                {activeView === "dashboard" ? "Dashboard" : "Add Components"}
              </h1>
              <p className='text-white/35 text-xs truncate'>
                Welcome back, {userData?.name || "Admin"}
              </p>
            </div>
          </div>

          <motion.button
  onClick={() => navigate("/generate")}
  className='flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#030b0d] bg-gradient-to-r from-[#3be8ff] to-[#0ab5d4] hover:opacity-90 transition-all shadow-[0_0_20px_rgba(59,232,255,0.2)] cursor-pointer border-none flex-shrink-0'
>
  <TbPlus size={16} /> Add Component
</motion.button>
        </div>

        {/* Dynamic Views */}
        <AnimatePresence mode='wait'>
          {activeView === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className='px-4 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-4 sm:space-y-6'
            >
              {/* Stats Cards */}
              <div className='grid grid-cols-2 gap-3 sm:gap-4'>
                {stats.map(({ label, value, icon: Icon, color }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className='p-3.5 sm:p-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-[#3be8ff]/20 transition-all'
                  >
                    <div className='mb-2.5 sm:mb-3'>
                      <div className='w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/[0.04] flex items-center justify-center' style={{ color }}>
                        <Icon size={20} />
                      </div>
                    </div>
                    <p className='text-xs text-white/50 font-medium'>{label}</p>
                    <p className='text-xl sm:text-2xl font-bold mt-1' style={{ color }}>{value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className='p-4 sm:p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02]'
              >
                <div className='flex items-start sm:items-center justify-between mb-4 sm:mb-5 gap-2'>
                  <div className='min-w-0'>
                    <p className="font-semibold text-sm truncate">Public Components Published</p>
                    <p className="text-white/35 text-xs mt-0.5">Date-wise breakdown</p>
                  </div>
                  <span className='text-[10px] font-semibold px-2 sm:px-2.5 py-1 rounded-full bg-[#a78bfa]/10 text-[#a78bfa] border border-[#a78bfa]/20 flex-shrink-0'>
                    {publicComponents.length} Total
                  </span>
                </div>

                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={chartData} margin={{ top: 5, right: 5, bottom: 0, left: -25 }}>
                    <defs>
                      <linearGradient id="componentGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.04)" />
                    <XAxis
                      dataKey="date"
                      tick={{ fill: "rgba(255, 255, 255, 0.3)", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      interval="preserveStartEnd"
                    />
                    <YAxis
                      tick={{ fill: "rgba(255, 255, 255, 0.3)", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      allowDecimals={false}
                      width={30}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(255, 255, 255, 0.06)" }} />
                    <Area
                      type="monotone"
                      dataKey="components"
                      stroke="#a78bfa"
                      strokeWidth={2}
                      fill="url(#componentGradient)"
                      dot={false}
                      activeDot={{ r: 4, fill: "#a78bfa", strokeWidth: 0 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Components List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className='rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden'
              >
                <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-5 py-4 border-b border-white/[0.05]'>
                  <div className='flex items-center gap-2.5'>
                    <div className='w-7 h-7 rounded-lg flex items-center justify-center' style={{ background: "rgba(59,232,255,0.1)", border: "1px solid rgba(59,232,255,0.2)" }}>
                      <TbWorld size={14} style={{ color: "#3be8ff" }} />
                    </div>
                    <div>
                      <p className='font-semibold text-sm truncate'>Public Components</p>
                      <p className='text-xs text-white/35'>
                        {publicComponents.length} components visible to all users
                      </p>
                    </div>
                  </div>

                  <div className='relative w-full sm:w-48'>
                    <TbSearch size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                    <input
                      value={componentSearch}
                      onChange={(e) => setComponentSearch(e.target.value)}
                      placeholder="Search components..."
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-white/25 outline-none focus:border-[#3be8ff]/40 transition-colors"
                    />
                  </div>
                </div>

                {filteredPublicComponents.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-14 gap-3 text-white/20">
                    <TbBoxOff size={32} />
                    <p className="text-sm">
                      {componentSearch ? "No components match your search" : "No public components yet"}
                    </p>
                  </div>
                ) : (
                  <div className='divide-y divide-white/[0.04]'>
                    {filteredPublicComponents.map((c, i) => (
                      <motion.div
                        key={c._id || i}
                        className='flex items-start sm:items-center justify-between gap-3 px-4 sm:px-5 py-3.5 hover:bg-white/[0.02] transition-colors'
                      >
                        <div className='flex items-start sm:items-center gap-3 min-w-0'>
                          <div
                            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0"
                            style={{
                              background: "rgba(167,139,250,0.1)",
                              border: "1px solid rgba(167,139,250,0.2)"
                            }}
                          >
                            <TbCode size={14} style={{ color: "#a78bfa" }} />
                          </div>

                          <div className='min-w-0'>
                            <p className='text-sm font-semibold text-[#3be8ff] sm:text-white truncate'>{c.name}</p>

                            {c.props?.length > 0 && (
                              <div className='flex flex-wrap gap-1 mt-1'>
                                {c.props.slice(0, 4).map((p) => (
                                  <div
                                    key={p}
                                    className="px-1.5 py-0.5 rounded-md text-[10px] font-medium"
                                    style={{
                                      background: "rgba(167,139,250,0.1)",
                                      color: "rgba(167,139,250,0.7)"
                                    }}
                                  >
                                    {p}
                                  </div>
                                ))}
                                {c.props.length > 4 && (
                                  <span className='px-1.5 py-0.5 rounded-md text-[10px] text-white/25'>
                                    +{c.props.length - 4}more
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className='flex flex-col sm:flex-row items-end sm:items-center gap-2 flex-shrink-0'>
                          <span className='text-[11px] text-white/25 whitespace-nowrap'>
                            {new Date(c.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric"
                            })}
                          </span>
                          <span
                            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                            style={{
                              background: "rgba(59,232,255,0.08)",
                              color: "#3be8ff",
                              border: "1px solid rgba(59,232,255,0.2)"
                            }}
                          >
                            <TbWorld size={9} /> Public
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}

          {activeView === "add" && (
            <motion.div
              key="add"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <AddComponentForm />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default AdminDashboard;