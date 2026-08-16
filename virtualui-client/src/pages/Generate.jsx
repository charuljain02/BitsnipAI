import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiLoader,
    FiZap,
    FiCpu,
    FiCheckCircle,
    FiAlertCircle,
    FiEye,
    FiCode,
    FiSave,
    FiUploadCloud,
    FiRefreshCw,
    FiLayers,
    FiArrowLeft,
    FiCopy
} from "react-icons/fi";
import { TbX, TbInfinity } from "react-icons/tb";
import axios from "axios";
import { ServerUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { LiveComponentPreview } from "../components/LiveComponentPreview";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// Custom Toast Component
const Toast = ({ message, type, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl"
            style={{
                background: type === "success" ? "#0d9f6e" : type === "error" ? "#e02424" : "#1c1c2e",
                color: "#fff",
                minWidth: "220px"
            }}
        >
            {type === "success" ? <FiCheckCircle size={18} /> : <FiAlertCircle size={18} />}
            <p className="text-sm font-medium">{message}</p>
            <button
                onClick={onClose}
                className="ml-auto text-white/60 hover:text-white text-xs bg-transparent border-none cursor-pointer"
            >
                <TbX size={18} />
            </button>
        </motion.div>
    );
};

// Turns "My Cool Button" -> "my-cool-button"
const slugify = (str = "") =>
    str
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") || "component";

function Generate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userData } = useSelector((state) => state.user);

    const userRole = userData?.role;
    const isAdmin = userRole === "admin";

    // Admins are not subject to the credit gate at all
    const aiCredits = userData?.aiCredits ?? 800;
    const lowCredits = !isAdmin && aiCredits < 50;

    const [prompt, setPrompt] = useState("");
    const [generated, setGenerated] = useState(null);
    const [generating, setGenerating] = useState(false);
    const [toast, setToast] = useState(null);

    // Component preview/code state & action states
    const [activeTab, setActiveTab] = useState("preview");
    const [savedComponentId, setSavedComponentId] = useState(null);
    const [saving, setSaving] = useState(false);
    const [publishing, setPublishing] = useState(false);
    const [published, setPublished] = useState(false);

    // Package name for publish: add state `packageName` and input field shown for admins
    const [packageName, setPackageName] = useState("");

    // Copy-to-clipboard state for the code tab
    const [copied, setCopied] = useState(false);

    const handleCopyCode = async () => {
        if (!generated?.code) return;
        try {
            await navigator.clipboard.writeText(generated.code);
            setCopied(true);
            showToast("Code copied to clipboard", "success");
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Copy failed:", error);
            showToast("Couldn't copy code", "error");
        }
    };

    const showToast = (message, type = "info") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3500);
    };

    // Suggest a unique, scoped package name whenever a new component is generated/saved
    const suggestedPackageName = useMemo(() => {
        if (!generated) return "";
        const scope = slugify(userData?.username || userData?.name || "user");
        const name = slugify(generated?.name || generated?.title || "component");
        const suffix = Date.now().toString(36).slice(-5);
        return `@${scope}/${name}-${suffix}`;
    }, [generated, userData]);

    // AI Generation Call
    const handleGenerate = async () => {
        if (!prompt.trim() || lowCredits) return;

        setGenerated(null);
        setGenerating(true);
        setSavedComponentId(null);
        setPublished(false);
        setPackageName("");

        try {
            const { data } = await axios.post(
                ServerUrl + "/api/component/generate",
                { prompt },
                { withCredentials: true }
            );

            const payload = data?.parsed || data;

            if (payload) {
                const componentCode = typeof payload === "string" ? payload : payload.code;

                if (componentCode) {
                    setGenerated({ ...payload, code: componentCode });
                    showToast("AI Component Generated", "success");
                } else {
                    showToast("Failed to parse component code", "error");
                }
            }

            // Admins have unlimited credits server-side too, but only sync the field if present
            if (data?.remainingCredits !== undefined) {
                dispatch(setUserData({
                    ...userData,
                    aiCredits: data.remainingCredits
                }));
            }

        } catch (error) {
            console.error("Generation failed:", error);
            showToast("Generate Error", "error");
        } finally {
            setGenerating(false);
        }
    };

    // Handle Keyboard Shortcut
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
            handleGenerate();
        }
    };

    // Save Component Logic
    const handleSave = async () => {
        if (!generated || saving) return;
        setSaving(true);
        try {
            // Base name from the AI response, falling back to a generic label if the
            // AI didn't return one. A generic/repeated name is exactly what triggers
            // the backend's duplicate-name 400 ("Admin cannot create duplicate public
            // component name" / "You already have a component with this name"), so we
            // always append a short unique suffix to the *saved* name. The suffix is
            // save-time only — it doesn't affect what's shown in the UI as the title.
            const baseName = generated?.name || generated?.title || "Custom Component";
            const uniqueSuffix = Date.now().toString(36).slice(-5);
            const uniqueSaveName = `${baseName}-${uniqueSuffix}`;

            const res = await axios.post(
                ServerUrl + "/api/component/save",
                {
                    name: uniqueSaveName,
                    code: generated.code,
                    props: generated?.props || []
                },
                { withCredentials: true }
            );

            if (res.data?._id) {
                setSavedComponentId(res.data._id);
                setPackageName(suggestedPackageName);
                showToast("Component saved successfully!", "success");
            }
        } catch (error) {
            console.error("Save failed:", error);
            // Surface the real backend reason (e.g. duplicate name) instead of a generic message
            const serverMessage = error?.response?.data?.message;
            showToast(serverMessage || "Component saved Error", "error");
        } finally {
            setSaving(false);
        }
    };

    // Publish Component Logic — admin only, guarded both here and by the UI below
    const handlePublish = async () => {
        if (!isAdmin || !savedComponentId || publishing) return;
        if (!packageName.trim()) {
            showToast("Package name is required", "error");
            return;
        }
        setPublishing(true);
        try {
            await axios.post(
                ServerUrl + "/api/component/publish",
                {
                    componentId: savedComponentId,
                    packageName: packageName.trim()
                },
                { withCredentials: true }
            );
            setPublished(true);
            showToast("Published to npm successfully!", "success");
        } catch (error) {
            console.error("Publish failed:", error);
            const serverMessage = error?.response?.data?.message;
            showToast(serverMessage || "Publish Failed", "error");
        } finally {
            setPublishing(false);
        }
    };

    const resetWorkspace = () => {
        setPrompt("");
        setGenerated(null);
        setSavedComponentId(null);
        setPublished(false);
        setActiveTab("preview");
        setPackageName("");
    };

    return (
        <div
            className="min-h-screen text-white relative overflow-x-hidden p-6 sm:p-10 flex flex-col items-center"
            style={{ background: "#060814" }}
        >
            {/* Toast Notifications */}
            <AnimatePresence>
                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}
            </AnimatePresence>

            {/* Top Pill Header */}
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#13172e] border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wider uppercase mb-6">
                <FiCpu size={14} />
                <span>AI Component Studio</span>
            </div>

            {/* Main Title Banner */}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-center tracking-tight mb-3">
                Build with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">AI</span>
            </h1>
            <p className="text-gray-400 text-center max-w-lg text-sm sm:text-base mb-10">
                Describe your React component in plain English. Preview, save, and publish — all in one place.
            </p>

            <div className="w-full max-w-4xl">
                {/* AI Credits Badge Row */}
                <div className="flex justify-end mb-3">
                    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#0e1326] border border-slate-800 text-xs font-medium text-slate-300">
                        <FiZap size={14} className="text-indigo-400" />
                        {isAdmin ? (
                            <span className="flex items-center gap-1">
                                <TbInfinity size={14} />
                                Unlimited
                            </span>
                        ) : (
                            <>
                                <span>{aiCredits} AI Credits</span>
                                <button
                                    onClick={() => navigate("/pricing")}
                                    className="bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 w-4 h-4 rounded flex items-center justify-center text-xs ml-1 border-none cursor-pointer"
                                >
                                    +
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Textarea Prompt Card */}
                <div className="bg-[#0b0f1d] border border-slate-800/80 rounded-2xl p-5 shadow-2xl relative">
                    <div className="flex items-start gap-3">
                        <FiZap size={18} className="text-indigo-400 mt-1 shrink-0" />
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="A glassmorphism pricing card with a toggle for monthly/annual billing..."
                            className="w-full h-28 bg-transparent text-slate-200 placeholder-slate-500 resize-none outline-none border-none text-sm leading-relaxed"
                        />
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800/40">
                        <span className="text-xs text-slate-500">
                            Ctrl + Enter to generate
                        </span>

                        <motion.button
                            disabled={generating || !prompt.trim() || lowCredits}
                            onClick={handleGenerate}
                            whileHover={{ scale: generating ? 1 : 1.02 }}
                            whileTap={{ scale: generating ? 1 : 0.98 }}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed border-none text-white cursor-pointer"
                            style={{
                                background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                                boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)"
                            }}
                        >
                            {generating ? (
                                <motion.span
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    className="inline-block"
                                >
                                    <FiLoader size={16} />
                                </motion.span>
                            ) : (
                                <FiZap size={16} />
                            )}
                            {generating ? "Generating..." : "Generate"}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Display / Live Component Workspace */}
            <div className="w-full max-w-4xl mt-8">
                {/* 1. Empty State Placeholder */}
                {!generated && !generating && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-12 text-center"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-3">
                            <FiCpu size={22} className="text-indigo-400" />
                        </div>
                        <p className="text-slate-400 text-sm">Describe your component above and hit Generate</p>
                    </motion.div>
                )}

                {/* 2. Loading State Spinner */}
                {generating && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-16"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="w-10 h-10 rounded-full border-2 border-indigo-500 border-t-transparent mb-4"
                        />
                        <p className="text-slate-400 text-sm">Crafting component with AI...</p>
                    </motion.div>
                )}

                {/* 3. Live Preview & Code Workspace */}
                <AnimatePresence>
                    {generated && !generating && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 30 }}
                            className="rounded-2xl overflow-hidden bg-[#0b0f1d] border border-slate-800/80 p-5"
                        >
                            {/* Toolbar Header */}
                            <div className="flex items-center justify-between pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                                        <FiLayers size={18} className="text-indigo-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold text-white leading-tight">
                                            {generated?.name || generated?.title || "Button"}
                                        </h3>
                                        <p className="text-xs text-slate-400 mt-0.5">
                                            Props: {generated?.props?.length > 0
                                                ? generated.props.join(", ")
                                                : "text, bg, color, size, disabled, loading, onClick"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    {/* Regenerate-with-AI lives in the toolbar now, separate from the
                                        in-preview "remount" refresh button so the two never overlap */}
                                    {activeTab === "preview" && (
                                        <button
                                            onClick={handleGenerate}
                                            title="Regenerate with AI"
                                            className="p-2 rounded-lg text-slate-400 hover:text-white bg-[#060814] border border-slate-800 transition-colors cursor-pointer"
                                        >
                                            <FiRefreshCw size={14} />
                                        </button>
                                    )}

                                    {/* Tab Controls (Preview / Code) */}
                                    <div className="flex items-center gap-2 bg-[#060814] p-1 rounded-xl border border-slate-800">
                                        <button
                                            onClick={() => setActiveTab("preview")}
                                            className={`p-2 rounded-lg text-xs font-medium transition-all border-none cursor-pointer ${
                                                activeTab === "preview"
                                                    ? "bg-indigo-600 text-white"
                                                    : "text-slate-400 hover:text-white"
                                            }`}
                                        >
                                            <FiEye size={15} />
                                        </button>
                                        <button
                                            onClick={() => setActiveTab("code")}
                                            className={`p-2 rounded-lg text-xs font-medium transition-all border-none cursor-pointer ${
                                                activeTab === "code"
                                                    ? "bg-indigo-600 text-white"
                                                    : "text-slate-400 hover:text-white"
                                            }`}
                                        >
                                            <FiCode size={15} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* View Content Box */}
                            <div className="relative rounded-xl overflow-hidden bg-[#030611] border border-slate-800/80 min-h-[280px] p-6">
                                <AnimatePresence mode="wait">
                                    {activeTab === "preview" ? (
                                        <motion.div
                                            key="preview"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="w-full h-full flex items-center justify-start min-h-[220px]"
                                        >
                                            {generated?.code && (
                                                <LiveComponentPreview code={generated.code} />
                                            )}
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="code"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="w-full overflow-auto max-h-[320px]"
                                        >
                                            <SyntaxHighlighter
                                                language="jsx"
                                                style={vscDarkPlus}
                                                customStyle={{ background: "transparent", fontSize: "12px", margin: 0, padding: 0 }}
                                                wrapLongLines
                                            >
                                                {generated.code}
                                            </SyntaxHighlighter>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Package name field — only relevant once saved and only for admins,
                                since only admins can publish. Prevents generic-name collisions on npm. */}
                            {isAdmin && savedComponentId && !published && (
                                <motion.div
                                    initial={{ opacity: 0, y: -6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4"
                                >
                                    <label className="text-xs text-slate-400 mb-1.5 block">
                                        NPM package name
                                    </label>
                                    <input
                                        type="text"
                                        value={packageName}
                                        onChange={(e) => setPackageName(e.target.value)}
                                        placeholder={suggestedPackageName}
                                        className="w-full bg-[#060814] border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-indigo-500/50"
                                    />
                                    <p className="text-[11px] text-slate-500 mt-1.5">
                                        Scoped names (e.g. <code>@you/component-name</code>) avoid collisions with existing public packages.
                                    </p>
                                </motion.div>
                            )}

                            {/* Bottom Actions Footer */}
                            <div className="flex items-center justify-between mt-4 pt-2">
                                {/* Save Component Button */}
                                <motion.button
                                    whileTap={{ scale: 0.97 }}
                                    onClick={handleSave}
                                    disabled={saving || savedComponentId}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                    style={{
                                        background: savedComponentId ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.06)",
                                        border: savedComponentId ? "1px solid rgba(16,185,129,0.3)" : "1px solid rgba(255,255,255,0.1)",
                                        color: savedComponentId ? "#34d399" : "#fff"
                                    }}
                                >
                                    {saving ? (
                                        <motion.span
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                        >
                                            <FiLoader size={14} />
                                        </motion.span>
                                    ) : savedComponentId ? (
                                        <FiCheckCircle size={14} />
                                    ) : (
                                        <FiSave size={14} />
                                    )}
                                    <span>{saving ? "Saving..." : savedComponentId ? "Saved" : "Save Component"}</span>
                                </motion.button>

                                {/* Post-Save Action Buttons */}
                                {savedComponentId && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-center gap-2 ml-auto"
                                    >
                                        <motion.button
                                            onClick={() => navigate("/")}
                                            whileTap={{ scale: 0.97 }}
                                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                                            style={{
                                                background: "rgba(255,255,255,0.05)",
                                                border: "1px solid rgba(255,255,255,0.1)",
                                                color: "rgba(255,255,255,0.5)"
                                            }}
                                        >
                                            <FiArrowLeft size={14} /> Back
                                        </motion.button>

                                        {/* Non-admins never see a Publish button — they go straight
                                            from Save to a clean "Generate New" state. */}
                                        {!isAdmin && (
                                            <motion.button
                                                onClick={resetWorkspace}
                                                whileTap={{ scale: 0.97 }}
                                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                                                style={{
                                                    background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                                                    boxShadow: "0 0 20px rgba(99,102,241,0.3)",
                                                    color: "#fff"
                                                }}
                                            >
                                                <FiRefreshCw size={14} /> Generate New
                                            </motion.button>
                                        )}

                                        {isAdmin && !published && (
                                            <motion.button
                                                onClick={handlePublish}
                                                whileTap={{ scale: 0.97 }}
                                                disabled={publishing || !packageName.trim() && !suggestedPackageName}
                                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-40"
                                                style={{
                                                    background: publishing ? "rgba(6,182,212,0.2)" : "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
                                                    boxShadow: publishing ? "none" : "0 0 15px rgba(6,182,212,0.3)",
                                                    color: "#fff"
                                                }}
                                            >
                                                {publishing ? (
                                                    <motion.span
                                                        animate={{ rotate: 360 }}
                                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                    >
                                                        <FiLoader size={14} />
                                                    </motion.span>
                                                ) : (
                                                    <FiUploadCloud size={14} />
                                                )}
                                                <span>{publishing ? "Publishing..." : "Publish to NPM"}</span>
                                            </motion.button>
                                        )}

                                        {isAdmin && published && (
                                            <motion.button
                                                onClick={resetWorkspace}
                                                whileTap={{ scale: 0.97 }}
                                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                                                style={{
                                                    background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                                                    boxShadow: "0 0 20px rgba(99,102,241,0.3)",
                                                    color: "#fff"
                                                }}
                                            >
                                                <FiRefreshCw size={14} /> Generate New
                                            </motion.button>
                                        )}
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default Generate;