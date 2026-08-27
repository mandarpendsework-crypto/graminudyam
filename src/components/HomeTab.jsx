import React, { useState } from "react";
import {
  ArrowRight,
  MapPin,
  CalendarClock,
  PiggyBank,
  X,
  ExternalLink,
  CheckCircle2,
  ShieldCheck,
  Landmark,
} from "lucide-react";
import { SCHEMES } from "../data/mockData";

const COLOR_MAP = {
  emerald: {
    hoverRing: "hover:ring-emerald-200",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    bar: "bg-emerald-600",
    btn: "bg-emerald-600 hover:bg-emerald-700",
    icon: "text-emerald-600",
  },
  indigo: {
    hoverRing: "hover:ring-indigo-200",
    badge: "bg-indigo-50 text-indigo-700 border-indigo-200",
    bar: "bg-indigo-600",
    btn: "bg-indigo-600 hover:bg-indigo-700",
    icon: "text-indigo-600",
  },
  slate: {
    hoverRing: "hover:ring-slate-300",
    badge: "bg-slate-100 text-slate-700 border-slate-300",
    bar: "bg-slate-700",
    btn: "bg-slate-700 hover:bg-slate-800",
    icon: "text-slate-700",
  },
};

function SchemeModal({ scheme, onClose }) {
  if (!scheme) return null;
  const c = COLOR_MAP[scheme.color];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className={`px-6 py-5 text-white ${c.bar} flex items-start justify-between`}>
          <div>
            <p className="text-xs uppercase tracking-wide opacity-80">Government Scheme</p>
            <h3 className="text-xl font-bold">{scheme.shortName}</h3>
            <p className="text-sm opacity-90 mt-1">{scheme.fullName}</p>
          </div>
          <button onClick={onClose} aria-label="Close scheme details" className="rounded-full p-1 hover:bg-white/20">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto space-y-5">
          <p className="text-slate-600 text-sm">{scheme.tagline}</p>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-200 p-3">
              <p className="text-[11px] uppercase text-slate-400 font-semibold">Max Project Cost</p>
              <p className="text-sm font-semibold text-slate-800 mt-1">{scheme.maxProjectCost}</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-3">
              <p className="text-[11px] uppercase text-slate-400 font-semibold">Interest Rate</p>
              <p className="text-sm font-semibold text-slate-800 mt-1">{scheme.interestRate}</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-3">
              <p className="text-[11px] uppercase text-slate-400 font-semibold">Margin Money</p>
              <p className="text-sm font-semibold text-slate-800 mt-1">{scheme.marginMoney}</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-3">
              <p className="text-[11px] uppercase text-slate-400 font-semibold">Moratorium</p>
              <p className="text-sm font-semibold text-slate-800 mt-1">{scheme.moratorium}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800 mb-2">Interest Subsidy</p>
            <p className="text-sm text-slate-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
              {scheme.subsidy}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800 mb-2">Eligibility Criteria</p>
            <ul className="space-y-1.5">
              {scheme.eligibility.map((e, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className={`h-4 w-4 mt-0.5 shrink-0 ${c.icon}`} />
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-slate-100 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-slate-300 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Close
          </button>
          <a
            href={scheme.portalUrl}
            onClick={(e) => e.preventDefault()}
            className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-white ${c.btn}`}
          >
            Apply on Portal <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function HomeTab({ onLaunchAdvisory, onLoginOpen }) {
  const [activeScheme, setActiveScheme] = useState(null);

  return (
    <div className="bg-slate-50">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white">
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
        <div className="relative max-w-6xl mx-auto px-6 py-20 lg:py-28">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-medium mb-6">
            <Landmark className="h-3.5 w-3.5 text-emerald-400" />
            Ministry of Social Justice & Empowerment · PS-26091
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight max-w-3xl">
            Empowering marginalized rural entrepreneurs with{" "}
            <span className="text-emerald-400">hyper-local business feasibility</span> and automated{" "}
            <span className="text-indigo-400">10:90 concessional credit</span> structuring.
          </h1>
          <p className="mt-5 max-w-2xl text-slate-300 text-base">
            One platform for micro-entrepreneurs and SCA field officers to assess viability, structure margin-capital
            financing, and connect with buyers — grounded in real block-level data.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={onLaunchAdvisory}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-6 py-3 font-semibold transition shadow-lg shadow-emerald-900/40"
            >
              Launch Feasibility Advisory <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => document.getElementById("schemes-directory")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 hover:bg-white/10 px-6 py-3 font-semibold transition"
            >
              Explore Concessional Schemes
            </button>
          </div>
        </div>
      </section>

      {/* KEY METRICS */}
      <section className="max-w-6xl mx-auto px-6 -mt-10 relative z-10">
        <div className="grid gap-4 sm:grid-cols-3">
          <MetricCard
            icon={<PiggyBank className="h-5 w-5 text-emerald-600" />}
            title="10% Margin Capital Rule"
            desc="Beneficiary contributes just 10% equity; 90% financed via SCA concessional credit."
          />
          <MetricCard
            icon={<MapPin className="h-5 w-5 text-indigo-600" />}
            title="5–10 km Hyper-Local Catchment"
            desc="Feasibility scored against real village-level buying power & footfall analytics."
          />
          <MetricCard
            icon={<CalendarClock className="h-5 w-5 text-slate-700" />}
            title="Quarterly Moratorium Protection"
            desc="Structured repayment holidays aligned to seasonal agri-business cash flow."
          />
        </div>
      </section>

      {/* SCHEMES DIRECTORY */}
      <section id="schemes-directory" className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-8">
          <p className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">Concessional Credit</p>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">Government Schemes Directory</h2>
          <p className="text-slate-500 text-sm mt-2 max-w-2xl">
            Tap any scheme to see project cost limits, interest subsidies, eligibility, and apply directly.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {SCHEMES.map((scheme) => {
            const c = COLOR_MAP[scheme.color];
            return (
              <button
                key={scheme.id}
                onClick={() => setActiveScheme(scheme)}
                className={`text-left rounded-2xl bg-white border border-slate-200 p-5 hover:shadow-lg hover:-translate-y-0.5 transition ring-1 ring-transparent ${c.hoverRing}`}
              >
                <div className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold mb-4 ${c.badge}`}>
                  <ShieldCheck className="h-3.5 w-3.5" /> {scheme.shortName}
                </div>
                <h3 className="font-bold text-slate-900 leading-snug">{scheme.fullName}</h3>
                <p className="text-sm text-slate-500 mt-2">{scheme.tagline}</p>
                <div className="mt-4 space-y-1.5 text-xs text-slate-500">
                  <p>
                    <span className="font-semibold text-slate-700">Rate:</span> {scheme.interestRate}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-700">Max Cost:</span> {scheme.maxProjectCost}
                  </p>
                </div>
                <div className={`mt-4 inline-flex items-center gap-1 text-sm font-semibold ${c.icon}`}>
                  View details <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* SECONDARY CTA STRIP */}
      <section className="bg-indigo-700">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold text-lg">Ready to check your business feasibility?</p>
            <p className="text-indigo-200 text-sm">Sign in to save your report and apply for financing.</p>
          </div>
          <button
            onClick={onLoginOpen}
            className="inline-flex items-center gap-2 rounded-lg bg-white text-indigo-700 px-5 py-2.5 font-semibold hover:bg-indigo-50 transition shrink-0"
          >
            Officer / Beneficiary Login <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      <SchemeModal scheme={activeScheme} onClose={() => setActiveScheme(null)} />
    </div>
  );
}

function MetricCard({ icon, title, desc }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 flex gap-4">
      <div className="h-11 w-11 shrink-0 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="font-bold text-slate-900 text-sm">{title}</p>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
