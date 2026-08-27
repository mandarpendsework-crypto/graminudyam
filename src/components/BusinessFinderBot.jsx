import React, { useState } from "react";
import {
  Sparkles,
  X,
  Wallet,
  ArrowRight,
  Milk,
  Shirt,
  Wheat,
  Store,
  TreePine,
  ChevronLeft,
  CheckCircle2,
} from "lucide-react";
import { SKILL_ASSETS, discoverBusinesses } from "../data/mockData";

const ICONS = { Milk, Shirt, Wheat, Store, TreePine };

const CAPITAL_CHIPS = [25000, 50000, 100000, 250000];

export default function BusinessFinderBot({ onApplyToFeasibility }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("input"); // input | results
  const [capital, setCapital] = useState(50000);
  const [skillIds, setSkillIds] = useState([]);
  const [results, setResults] = useState([]);

  const toggleSkill = (id) => {
    setSkillIds((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  const runDiscovery = () => {
    setResults(discoverBusinesses({ capital, skillIds }));
    setStep("results");
  };

  const reset = () => {
    setStep("input");
    setResults([]);
  };

  return (
    <>
      {/* Floating trigger */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white pl-4 pr-5 py-3.5 shadow-xl shadow-indigo-900/30 transition"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
          </span>
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-semibold">Don't know what to start? Ask AI</span>
        </button>
      )}

      {/* Panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-40 w-[92vw] max-w-sm rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-5 py-4 text-white flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-white/15 flex items-center justify-center">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="font-bold text-sm leading-tight">Business Discovery AI</p>
                <p className="text-[11px] text-indigo-200">Reverse feasibility engine</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close assistant" className="rounded-full p-1 hover:bg-white/20">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-5 overflow-y-auto space-y-5">
            {step === "input" && (
              <>
                <div>
                  <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 mb-2">
                    <Wallet className="h-3.5 w-3.5" /> Available Capital
                  </label>
                  <input
                    type="number"
                    value={capital}
                    onChange={(e) => setCapital(Number(e.target.value) || 0)}
                    className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {CAPITAL_CHIPS.map((c) => (
                      <button
                        key={c}
                        onClick={() => setCapital(c)}
                        className={`text-xs px-2.5 py-1 rounded-full border font-medium transition ${
                          capital === c
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-slate-50 text-slate-600 border-slate-200 hover:border-indigo-300"
                        }`}
                      >
                        ₹{c >= 100000 ? `${c / 100000}L` : `${c / 1000}k`}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-600 mb-2">Skills & Assets Available</p>
                  <div className="flex flex-wrap gap-2">
                    {SKILL_ASSETS.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => toggleSkill(s.id)}
                        className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition text-left ${
                          skillIds.includes(s.id)
                            ? "bg-emerald-600 text-white border-emerald-600"
                            : "bg-slate-50 text-slate-600 border-slate-200 hover:border-emerald-300"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={runDiscovery}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 text-sm font-semibold transition"
                >
                  Find My Top 5 Businesses <ArrowRight className="h-4 w-4" />
                </button>
              </>
            )}

            {step === "results" && (
              <>
                <button onClick={reset} className="flex items-center gap-1 text-xs text-indigo-600 font-semibold">
                  <ChevronLeft className="h-3.5 w-3.5" /> Adjust inputs
                </button>
                <div className="space-y-3">
                  {results.map((r, idx) => {
                    const Icon = ICONS[r.icon] || Store;
                    return (
                      <div key={r.sectorId} className="rounded-xl border border-slate-200 p-3.5">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div className="h-9 w-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                              <Icon className="h-[18px] w-[18px] text-emerald-700" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900 leading-tight">
                                #{idx + 1} {r.sectorName}
                              </p>
                              <p className="text-[11px] text-slate-400">
                                Skill-fit {r.skillFit}% · Budget-fit {r.budgetFit}%
                              </p>
                            </div>
                          </div>
                          <span className="shrink-0 rounded-full bg-emerald-600 text-white text-xs font-bold px-2.5 py-1">
                            {r.matchScore}%
                          </span>
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                          <div className="rounded-lg bg-slate-50 px-2.5 py-1.5">
                            <p className="text-slate-400">Est. Investment</p>
                            <p className="font-semibold text-slate-800">₹{r.estInvestment.toLocaleString("en-IN")}</p>
                          </div>
                          <div className="rounded-lg bg-slate-50 px-2.5 py-1.5">
                            <p className="text-slate-400">Monthly Net Margin</p>
                            <p className="font-semibold text-slate-800">₹{r.monthlyNetMargin.toLocaleString("en-IN")}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            onApplyToFeasibility({ sectorId: r.sectorId, capital });
                            setOpen(false);
                          }}
                          className="mt-3 w-full flex items-center justify-center gap-1.5 rounded-lg border border-emerald-600 text-emerald-700 hover:bg-emerald-50 py-2 text-xs font-semibold transition"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" /> Apply to Feasibility Study
                        </button>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
