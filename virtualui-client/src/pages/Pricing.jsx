import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Check, Loader2 } from 'lucide-react';
import { setUserData } from '../redux/userSlice';

// Adjust this to wherever your backend base URL lives (env var / config file)
const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:8000';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 99,
    aiCredits: 50,
    tagline: 'Perfect for trying things out',
    highlighted: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 299,
    aiCredits: 200,
    tagline: 'Best value for regular builders',
    highlighted: true,
  },
  {
    id: 'studio',
    name: 'Studio',
    price: 799,
    aiCredits: 600,
    tagline: 'For heavy, daily generation',
    highlighted: false,
  },
];

const Pricing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);

  const [loadingPlanId, setLoadingPlanId] = useState(null);
  const [error, setError] = useState('');

  const handleBuy = async (plan) => {
    setError('');
    setLoadingPlanId(plan.id);
    try {
      const response = await axios.post(
        `${serverUrl}/api/payment/add-credits`,
        { aiCredits: plan.aiCredits },
        { withCredentials: true }
      );

      if (response.data.success) {
        // Instant, app-wide credit update - no reload needed
        dispatch(setUserData(response.data.user));
      }
    } catch (err) {
      console.error('Credit purchase failed:', err);
      setError(
        err?.response?.data?.message || 'Something went wrong. Please try again.'
      );
    } finally {
      setLoadingPlanId(null);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0f] text-white relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
      </div>

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-10 flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-200"
      >
        <ArrowLeft size={18} />
        <span className="text-sm">Back</span>
      </button>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-20 flex flex-col items-center">
        {/* Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
          <Sparkles size={14} className="text-purple-400" />
          <span className="text-xs font-medium tracking-wider text-white/70">
            AI CREDITS
          </span>
        </div>

        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent mb-3">
          Simple Pricing
        </h1>
        <p className="text-white/50 text-center max-w-md mb-4">
          Top up your AI credits instantly and keep generating components without interruption.
        </p>

        {userData?.aiCredits !== undefined && (
          <p className="text-sm text-white/40 mb-10">
            Current balance:{' '}
            <span className="text-purple-400 font-semibold">
              {userData.aiCredits} credits
            </span>
          </p>
        )}

        {error && (
          <div className="mb-6 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {plans.map((plan) => {
            const isLoading = loadingPlanId === plan.id;
            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-6 backdrop-blur-xl border transition-all duration-300 flex flex-col ${
                  plan.highlighted
                    ? 'bg-white/[0.07] border-purple-500/40 shadow-[0_0_40px_-10px_rgba(168,85,247,0.4)] md:scale-105'
                    : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold tracking-wide px-3 py-1 rounded-full bg-purple-500 text-white">
                    MOST POPULAR
                  </span>
                )}

                <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                <p className="text-white/40 text-sm mb-6">{plan.tagline}</p>

                <div className="mb-6">
                  <span className="text-3xl font-bold">₹{plan.price}</span>
                </div>

                <div className="flex items-center gap-2 mb-8 text-sm text-white/70">
                  <Check size={16} className="text-purple-400" />
                  <span>{plan.aiCredits} AI credits</span>
                </div>

                <button
                  onClick={() => handleBuy(plan)}
                  disabled={isLoading}
                  className={`mt-auto w-full py-2.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-white'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Buy for ₹${plan.price}`
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Pricing;