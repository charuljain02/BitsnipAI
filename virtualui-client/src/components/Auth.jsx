
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

import {
  TbX,
  TbLogin2,
  TbSettings,
  TbCopy,
  TbDownload,
} from "react-icons/tb";

import { SiValorant } from "react-icons/si";
import { HiSparkles } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";

import { signInWithPopup } from "firebase/auth";
import axios from "axios";

import { auth, provider } from "../utils/firebase.js";
import { setUserData } from "../redux/userSlice.js";

// Backend URL
const ServerUrl = "https://bitsnipai.onrender.com";

// Steps configuration
const steps = [
  {
    icon: TbLogin2,
    title: "Login with Google",
    desc: "Secure OAuth to unlock all AI tools instantly.",
  },
  {
    icon: HiSparkles,
    title: "Get 150 AI Credits",
    desc: "Free credits to generate premium UI components.",
  },
  {
    icon: TbSettings,
    title: "Customize Props",
    desc: "Fine-tune and preview every change live.",
  },
  {
    icon: TbCopy,
    title: "Generate Components",
    desc: "AI builds production-ready JSX components.",
  },
  {
    icon: TbDownload,
    title: "Copy or Save",
    desc: "Export clean code straight into your project.",
  },
];

function Auth({ onClose }) {
  const dispatch = useDispatch();

  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);

  // Automatically change active feature
  useEffect(() => {
    const id = setInterval(() => {
      setActive((current) => (current + 1) % steps.length);
    }, 2400);

    return () => clearInterval(id);
  }, []);

  // Google Authentication
  const googleAuth = async () => {
    try {
      setLoading(true);

      // 1. Google Login
      const response = await signInWithPopup(auth, provider);
      const user = response.user;

      const name = user.displayName;
      const email = user.email;

      console.log("Google User:", {
        name,
        email,
      });

      // 2. Send user data to backend
      const result = await axios.post(
        `${ServerUrl}/api/auth/google`,
        {
          name,
          email,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Backend Login Response:", result.data);

      // 3. Store user in Redux
      dispatch(setUserData(result.data));

      // 4. Debug & CLOSE AUTH MODAL
      console.log("Login successful, closing modal...");
      onClose();

    } catch (error) {
      console.error("Google Authentication Error:", error);

      if (error.response) {
        console.error("Backend Error:", error.response.data);
        console.error("Status:", error.response.status);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 p-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row w-full max-w-[880px] max-h-[90vh] overflow-y-auto rounded-2xl border border-[#3be8ff]/10 shadow-[0_40px_80px_rgba(0,0,0,0.8)] relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all cursor-pointer"
          >
            <TbX size={15} />
          </button>

          {/* LEFT SIDE */}
          <div className="sm:w-[52%] bg-gradient-to-br from-[#03181c] to-[#041e24] p-6 sm:p-10 relative overflow-hidden">
            {/* Glow */}
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(59,232,255,0.08)_0%,transparent_70%)] pointer-events-none" />

            {/* Brand Header */}
            <motion.div
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-7 sm:mb-9"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#03181c] to-[#0ab5d4] flex items-center justify-center shadow-[0_0_18px_rgba(59,232,255,0.35)]">
                <SiValorant size={17} color="#051c20" />
              </div>

              <span
                className="text-xl font-bold text-[#e8f8fa] tracking-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                BitsnipAI
              </span>
            </motion.div>

            <p className="text-[10px] font-semibold tracking-[3px] text-[#3be8ff] uppercase mb-4 sm:mb-5">
              How it works
            </p>

            {/* Feature List */}
            <div className="flex sm:flex-col gap-2 sm:gap-1 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0 -mx-1 px-1">
              {steps.map((item, i) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={i}
                    onClick={() => setActive(i)}
                    className={`flex-shrink-0 sm:flex-shrink flex items-start gap-3 px-3 py-2.5 rounded-xl border transition-all duration-300 min-w-[200px] sm:min-w-0 cursor-pointer ${
                      active === i
                        ? "bg-[#3be8ff]/[0.07] border-[#3be8ff]/20"
                        : "bg-transparent border-transparent"
                    }`}
                  >
                    <div
                      className={`min-w-[28px] h-7 rounded-lg flex items-center justify-center border transition-all duration-300 ${
                        active === i
                          ? "bg-gradient-to-br from-[#3be8ff] to-[#0ab8d6] border-transparent"
                          : "bg-[#3be8ff]/[0.08] border-[#3be8ff]/20"
                      }`}
                    >
                      <Icon
                        size={16}
                        className={
                          active === i
                            ? "text-[#051c20]"
                            : "text-[#3be8ff]"
                        }
                      />
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <h4
                        className={`text-xs font-semibold tracking-wide transition-colors ${
                          active === i ? "text-white" : "text-white/80"
                        }`}
                      >
                        {item.title}
                      </h4>

                      <p className="text-[11px] leading-relaxed text-white/40 font-medium hidden sm:block">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="sm:w-[48%] bg-[#040f12] px-6 sm:px-10 py-8 sm:py-12 flex flex-col justify-center items-center relative overflow-hidden"
          >
            {/* Blueprint Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,232,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(59,232,255,0.025)_1px,transparent_1px)] bg-[size:32px_32px]" />

            <div className="relative z-10 w-full max-w-[280px] sm:max-w-[260px] text-center mx-auto">
              {/* Brand Icon */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl mx-auto mb-5 sm:mb-6 bg-gradient-to-br from-[#3be8ff]/15 to-[#040f12] border border-[#3be8ff]/20 flex items-center justify-center"
              >
                <SiValorant size={22} color="#3be8ff" />
              </motion.div>

              <h3 className="text-xl font-bold text-[#e4f6f8] tracking-tight mb-2">
                Welcome
              </h3>

              <p className="text-[11px] leading-relaxed text-white/40 font-medium mb-7">
                Sign in to generate AI-powered UI components in seconds
              </p>

              {/* Stats */}
              <div className="flex justify-center gap-4 sm:gap-5 mb-7">
                {[
                  ["150", "AI Credits"],
                  ["∞", "Components"],
                  ["JSX", "Ready"],
                ].map(([value, label], i) => (
                  <div key={i} className="text-center">
                    <div className="text-base font-bold text-[#3be8ff]">
                      {value}
                    </div>

                    <div className="text-[9px] text-[#78aab4]/45 uppercase tracking-wider font-medium">
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Google Login */}
              <motion.button
                onClick={googleAuth}
                disabled={loading}
                whileHover={{
                  y: loading ? 0 : -2,
                  scale: loading ? 1 : 1.02,
                }}
                whileTap={{
                  scale: loading ? 1 : 0.98,
                }}
                className={`w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-white text-[#0a1a1d] font-semibold text-sm border-none shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-shadow ${
                  loading
                    ? "opacity-60 cursor-not-allowed"
                    : "cursor-pointer hover:shadow-[0_12px_40px_rgba(59,232,255,0.2)]"
                }`}
              >
                <FcGoogle size={19} />

                {loading ? "Signing in..." : "Continue with Google"}
              </motion.button>

              {/* Terms */}
              <p className="text-[11px] text-[#64919b]/45 mt-4 sm:mt-5">
                No account needed for npm.{" "}
                <span
                  onClick={onClose}
                  className="text-[#3be8ff]/50 border-b border-[#3be8ff]/20 cursor-pointer hover:text-[#3be8ff]/80 transition-colors"
                >
                  View docs
                </span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Auth;
