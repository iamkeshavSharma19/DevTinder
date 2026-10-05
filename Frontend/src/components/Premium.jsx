import { Check, Shield, Crown } from "lucide-react";
import { Sparkles, CheckCircle2, ShieldCheck, Code2 } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useState } from "react";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });

    if (res.data.isPremium) {
      setIsUserPremium(true);
    }
  };

  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        memberShipType: type,
      },
      {
        withCredentials: true,
      },
    );

    const { amount, keyId, currency, notes, orderId } = order.data;

    //?It should open a Razorpay Dialog Box.

    const options = {
      key: keyId,
      amount,
      currency,
      name: "Dev Tinder",
      description: "Connect to other developers",
      order_id: orderId,

      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
      //?When the Payment dialog box is closed then this handler function will be called if the payment is successful
      handler: verifyPremiumUser,
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    //?As soon as the payment is successful or payment is failed,razorpay will send a webhook to our backend.
  };

  return !isUserPremium ? (
    <div className="min-h-screen w-full bg-[#030712] text-white flex flex-col items-center justify-center p-4 sm:p-8 pt-20 relative overflow-hidden font-sans">
      {/* Soft Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-125 h-75 bg-pink-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-125 h-75 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] bg-size-[32px_32px]" />

      <div className="relative z-10 w-full max-w-4xl mx-auto space-y-12 text-center">
        {/* Header */}
        <div className="space-y-3 mt-16">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-['JetBrains_Mono'] tracking-tight">
            Upgrade Your{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-400 via-purple-400 to-indigo-400">
              Developer Journey
            </span>
          </h1>
        </div>

        {/* Membership Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch relative">
          {/* SILVER MEMBERSHIP */}
          <div className="relative group bg-[#090d1f]/70 border border-pink-500/20 hover:border-pink-500/40 rounded-3xl p-8 flex flex-col justify-between text-center space-y-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="mx-auto w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shadow-inner">
                  <Shield className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold font-['JetBrains_Mono'] text-white">
                  Silver Membership
                </h2>
              </div>

              <div className="h-px w-full bg-slate-800/80" />

              <ul className="space-y-4 text-sm text-slate-300 font-sans text-left w-fit mx-auto">
                <li className="flex items-center gap-3">
                  <span className="p-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>Chat with other people</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="p-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>
                    <strong>100 connection Requests</strong> per day
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="p-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>Blue Tick</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="p-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>3 months validity</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleBuyClick("silver")}
              className="w-full py-3.5 rounded-2xl bg-linear-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-semibold text-sm font-['JetBrains_Mono'] transition-all active:scale-95 cursor-pointer shadow-lg shadow-pink-600/25"
            >
              Buy Silver
            </button>
          </div>

          {/* OR Divider Badge (Floating center) */}
          <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <span className="bg-[#030712] border border-slate-700/80 text-slate-400 text-xs font-extrabold font-['JetBrains_Mono'] px-3 py-1.5 rounded-full shadow-2xl">
              OR
            </span>
          </div>

          {/* GOLD MEMBERSHIP */}
          <div className="relative group bg-[#090d1f]/70 border border-indigo-500/30 hover:border-indigo-500/60 rounded-3xl p-8 flex flex-col justify-between text-center space-y-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="mx-auto w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-inner">
                  <Crown className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold font-['JetBrains_Mono'] text-white">
                  Gold Membership
                </h2>
              </div>

              <div className="h-px w-full bg-slate-800/80" />

              <ul className="space-y-4 text-sm text-slate-300 font-sans text-left w-fit mx-auto">
                <li className="flex items-center gap-3">
                  <span className="p-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>Chat with other people</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="p-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>
                    <strong>Infinite connection Requests</strong> per day
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="p-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>Blue Tick</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="p-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>6 months validity</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleBuyClick("gold")}
              className="w-full py-3.5 rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm font-['JetBrains_Mono'] transition-all active:scale-95 cursor-pointer shadow-lg shadow-indigo-600/25"
            >
              Buy Gold
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen w-full bg-[#030712] text-white flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden font-sans">
      {/* Ambient Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-87.5 bg-linear-to-tr from-indigo-600/20 via-purple-600/15 to-amber-500/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Background Grid Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] bg-size-[32px_32px]" />

      <div className="relative z-10 max-w-lg w-full text-center space-y-8">
        {/* Animated Glow Card Container */}
        <div className="relative group bg-[#090d1f]/80 border border-slate-800 hover:border-amber-500/30 rounded-3xl p-10 backdrop-blur-2xl shadow-2xl shadow-indigo-500/10 transition-all duration-500">
          {/* Subtle Outer Card Glow */}
          <div className="absolute -inset-0.5 bg-linear-to-r from-amber-500/20 via-purple-500/20 to-indigo-500/20 rounded-3xl blur-md opacity-50 group-hover:opacity-100 transition duration-500 -z-10" />

          <div className="space-y-6 flex flex-col items-center">
            {/* Crown / Check Badge Icon */}
            <div className="relative flex items-center justify-center">
              <div className="w-20 h-20 rounded-2xl bg-linear-to-tr from-amber-500/20 via-indigo-500/20 to-purple-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
                <Sparkles className="w-10 h-10 animate-pulse text-amber-400" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#030712] rounded-full p-1 border border-slate-800">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 fill-emerald-500/20" />
              </div>
            </div>

            {/* Main Premium Badge Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold font-['JetBrains_Mono'] tracking-wide uppercase">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>DevTinder VIP</span>
            </div>

            {/* Core Message */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold font-['JetBrains_Mono'] tracking-tight text-white">
                You Are a{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-300 via-purple-300 to-indigo-300">
                  Premium User
                </span>
              </h1>
              <p className="text-xs text-slate-400 font-['JetBrains_Mono']">
                All developer perks & unlimited matches are active on your
                account.
              </p>
            </div>

            <div className="h-px w-full bg-slate-800/80 my-2" />

            {/* Developer Tagline */}
            <div className="flex items-center gap-2 text-slate-400 text-xs font-['JetBrains_Mono']">
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span>Happy Coding & Networking!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
