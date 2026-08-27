import React from "react";
import { Landmark, Construction } from "lucide-react";

/**
 * FinanceTab — Module 2: Smart Financial Structuring
 * -----------------------------------------------------------------------
 * Full implementation ships in Part 2. This stub keeps the tab navigable
 * and documents the props contract App.jsx already wires up for it, so
 * Part 2 can drop the real component in without touching App.jsx.
 *
 * Expected props (Part 2):
 *   - lastReport: object | null   → most recent Module 1 feasibility report,
 *                                   used to pre-fill project cost & sector.
 *   - user: { role, phone, sca } | null → current authenticated session.
 */
export default function FinanceTab({ lastReport, user }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24 text-center">
      <div className="mx-auto h-14 w-14 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center mb-5">
        <Landmark className="h-6 w-6 text-indigo-600" />
      </div>
      <h2 className="text-xl font-bold text-slate-900">Finance Tab — Smart Structuring</h2>
      <p className="text-slate-500 text-sm mt-2 max-w-md mx-auto">
        The 10:90 margin-capital structuring engine, EMI simulator, and scheme-matching module ship in Part 2.
      </p>
      {lastReport && (
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1.5">
          Ready to structure: {lastReport.meta.sector.name} · ₹{lastReport.meta.capital.toLocaleString("en-IN")} margin capital
        </div>
      )}
      <div className="mt-8 inline-flex items-center gap-2 text-xs text-slate-400">
        <Construction className="h-3.5 w-3.5" /> Coming in Part 2
      </div>
    </div>
  );
}
