import React, { useState } from "react";
import { X, User, Landmark, Phone, ShieldCheck, ChevronDown, Loader2, CheckCircle2 } from "lucide-react";

const SCA_LIST = [
  "Maharashtra State SC/OBC Finance Corp.",
  "Uttar Pradesh Scheduled Castes Finance Corp.",
  "Tamil Nadu Backward Classes Finance Corp.",
  "Karnataka Maharshi Valmiki ST Finance Corp.",
  "Rajasthan SC/ST Finance & Development Corp.",
];

export default function LoginModal({ open, onClose, onLoginSuccess }) {
  const [role, setRole] = useState("beneficiary"); // beneficiary | officer
  const [step, setStep] = useState("form"); // form | otp | success
  const [phone, setPhone] = useState("");
  const [sca, setSca] = useState(SCA_LIST[0]);
  const [otp, setOtp] = useState("");
  const [sending, setSending] = useState(false);

  if (!open) return null;

  const resetAndClose = () => {
    setStep("form");
    setPhone("");
    setOtp("");
    onClose();
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phone.length !== 10) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setStep("otp");
    }, 700);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.length !== 6) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setStep("success");
      setTimeout(() => {
        onLoginSuccess({ role, phone, sca: role === "officer" ? sca : null });
        resetAndClose();
      }, 900);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-emerald-700 to-emerald-600 px-6 py-5 text-white">
          <button
            onClick={resetAndClose}
            aria-label="Close login dialog"
            className="absolute right-4 top-4 rounded-full p-1 hover:bg-white/20 transition"
          >
            <X className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-bold">Sign in to GraminUdyam AI</h2>
          <p className="text-emerald-100 text-sm mt-1">National Concessional Credit Portal</p>
        </div>

        <div className="p-6">
          {/* Role toggle */}
          <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1 mb-6">
            <button
              onClick={() => setRole("beneficiary")}
              className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition ${
                role === "beneficiary" ? "bg-white text-emerald-700 shadow" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <User className="h-4 w-4" /> Beneficiary
            </button>
            <button
              onClick={() => setRole("officer")}
              className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition ${
                role === "officer" ? "bg-white text-indigo-700 shadow" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Landmark className="h-4 w-4" /> SCA / Bank Officer
            </button>
          </div>

          {step === "form" && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {role === "beneficiary" ? "Aadhaar-linked Mobile Number" : "Official Mobile Number"}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="10-digit mobile number"
                    className="w-full rounded-lg border border-slate-300 py-2.5 pl-9 pr-3 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none"
                    required
                  />
                </div>
              </div>

              {role === "officer" && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">State Channelizing Agency (SCA)</label>
                  <div className="relative">
                    <select
                      value={sca}
                      onChange={(e) => setSca(e.target.value)}
                      className="w-full appearance-none rounded-lg border border-slate-300 py-2.5 pl-3 pr-9 text-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none bg-white"
                    >
                      {SCA_LIST.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={phone.length !== 10 || sending}
                className={`w-full flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-white transition ${
                  role === "beneficiary" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-indigo-600 hover:bg-indigo-700"
                } disabled:opacity-50`}
              >
                {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
                Send OTP
              </button>
              <p className="text-xs text-slate-400 text-center">
                By continuing you consent to Aadhaar e-KYC verification as per DBT norms.
              </p>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <p className="text-sm text-slate-600">
                Enter the 6-digit OTP sent to <span className="font-semibold text-slate-900">+91 {phone}</span>
              </p>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="••••••"
                className="w-full tracking-[0.5em] text-center text-lg font-semibold rounded-lg border border-slate-300 py-3 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none"
                required
              />
              <button
                type="submit"
                disabled={otp.length !== 6 || sending}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 py-2.5 text-sm font-semibold text-white transition disabled:opacity-50"
              >
                {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
                Verify & Continue
              </button>
              <button
                type="button"
                onClick={() => setStep("form")}
                className="w-full text-xs text-slate-400 hover:text-slate-600"
              >
                Change mobile number
              </button>
            </form>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <CheckCircle2 className="h-12 w-12 text-emerald-600 mb-3" />
              <p className="font-semibold text-slate-900">Verification successful</p>
              <p className="text-sm text-slate-500">Redirecting to your dashboard…</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
