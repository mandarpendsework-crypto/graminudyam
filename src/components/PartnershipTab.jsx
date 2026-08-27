import React from "react";
import { Handshake, Construction } from "lucide-react";

/**
 * PartnershipTab — Module 3: B2B Ecosystem
 * -----------------------------------------------------------------------
 * Full implementation ships in Part 2. This stub keeps the tab navigable
 * and documents the props contract App.jsx already wires up for it.
 *
 * Expected props (Part 2):
 *   - lastReport: object | null   → most recent Module 1 feasibility report,
 *                                   used to suggest relevant buyer/aggregator matches.
 *   - user: { role, phone, sca } | null → current authenticated session.
 */
export default function PartnershipTab({ lastReport, user }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24 text-center">
      <div className="mx-auto h-14 w-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-5">
        <Handshake className="h-6 w-6 text-emerald-600" />
      </div>
      <h2 className="text-xl font-bold text-slate-900">Partnership Tab — B2B Ecosystem</h2>
      <p className="text-slate-500 text-sm mt-2 max-w-md mx-auto">
        Buyer/aggregator matchmaking, off-take agreement templates, and cooperative bulk-input pooling ship in Part 2.
      </p>
      {lastReport && (
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold px-3 py-1.5">
          Sector context loaded: {lastReport.meta.sector.name}
        </div>
      )}
      <div className="mt-8 inline-flex items-center gap-2 text-xs text-slate-400">
        <Construction className="h-3.5 w-3.5" /> Coming in Part 2
      </div>
    </div>
  );
}
