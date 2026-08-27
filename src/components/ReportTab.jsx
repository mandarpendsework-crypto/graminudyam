import React, { useEffect, useState } from "react";
import {
  MapPin,
  Wallet,
  Sparkles,
  Users,
  TrendingUp,
  Grid2x2,
  AlertTriangle,
  Building2,
  Tag,
  Download,
  ChevronDown,
  Loader2,
} from "lucide-react";
import {
  STATES,
  getDistricts,
  getBlocks,
  getPanchayats,
  SECTORS,
  generateFeasibilityReport,
} from "../data/mockData";

const CAPITAL_CHIPS = [25000, 50000, 100000, 250000];

function Select({ label, value, onChange, options, disabled, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1.5">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-3 pr-9 text-sm disabled:bg-slate-50 disabled:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none"
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
      </div>
    </div>
  );
}

function Gauge({ value, size = 96, color = "#059669", label }) {
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(value, 100) / 100) * c;
  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text x="50%" y="50%" textAnchor="middle" dy="0.35em" className="fill-slate-900 font-bold" fontSize={size * 0.22}>
          {value}%
        </text>
      </svg>
      {label && <p className="text-xs text-slate-500 mt-1 text-center max-w-[110px]">{label}</p>}
    </div>
  );
}

const DENSITY_STYLE = {
  Low: { color: "#059669", pct: 30 },
  Moderate: { color: "#d97706", pct: 62 },
  Saturated: { color: "#dc2626", pct: 90 },
};

export default function ReportTab({ prefill, onConsumePrefill, onReportGenerated }) {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [block, setBlock] = useState("");
  const [panchayat, setPanchayat] = useState("");
  const [sectorId, setSectorId] = useState("");
  const [capital, setCapital] = useState(100000);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  // Consume prefill coming from the Business Finder Bot
  useEffect(() => {
    if (prefill) {
      setSectorId(prefill.sectorId);
      setCapital(prefill.capital);
      if (!state) {
        setState("Maharashtra");
        setDistrict("Pune");
        setBlock("Haveli");
        setPanchayat("Wagholi");
      }
      onConsumePrefill();
      setTimeout(() => generate({ overrideSector: prefill.sectorId, overrideCapital: prefill.capital }), 50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefill]);

  const districts = getDistricts(state);
  const blocks = getBlocks(state, district);
  const panchayats = getPanchayats(state, district, block);

  const generate = ({ overrideSector, overrideCapital } = {}) => {
    const finalSector = overrideSector || sectorId;
    const finalCapital = overrideCapital || capital;
    const finalState = state || "Maharashtra";
    const finalDistrict = district || "Pune";
    const finalBlock = block || "Haveli";
    const finalPanchayat = panchayat || "Wagholi";
    if (!finalSector) return;

    setLoading(true);
    setTimeout(() => {
      const r = generateFeasibilityReport({
        state: finalState,
        district: finalDistrict,
        block: finalBlock,
        panchayat: finalPanchayat,
        sectorId: finalSector,
        capital: finalCapital,
      });
      setReport(r);
      if (onReportGenerated) onReportGenerated(r);
      setLoading(false);
    }, 800);
  };

  const canGenerate = state && district && block && panchayat && sectorId && capital > 0;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">Module 1</p>
        <h1 className="text-2xl font-bold text-slate-900 mt-1">Hyper-Local Business Feasibility Report</h1>
        <p className="text-slate-500 text-sm mt-2 max-w-2xl">
          Select the exact Gram Panchayat and business sector to generate a bank-ready feasibility dashboard.
        </p>
      </div>

      {/* INPUT FORM */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 mb-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Select
            label="State"
            value={state}
            placeholder="Select State"
            options={STATES}
            onChange={(v) => {
              setState(v);
              setDistrict("");
              setBlock("");
              setPanchayat("");
            }}
          />
          <Select
            label="District"
            value={district}
            placeholder="Select District"
            options={districts}
            disabled={!state}
            onChange={(v) => {
              setDistrict(v);
              setBlock("");
              setPanchayat("");
            }}
          />
          <Select
            label="Block"
            value={block}
            placeholder="Select Block"
            options={blocks}
            disabled={!district}
            onChange={(v) => {
              setBlock(v);
              setPanchayat("");
            }}
          />
          <Select
            label="Gram Panchayat"
            value={panchayat}
            placeholder="Select Panchayat"
            options={panchayats}
            disabled={!block}
            onChange={setPanchayat}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 mt-5">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Business Sector</label>
            <div className="relative">
              <select
                value={sectorId}
                onChange={(e) => setSectorId(e.target.value)}
                className="w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-3 pr-9 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none"
              >
                <option value="">Select Sector</option>
                {SECTORS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1.5">
              <Wallet className="h-3.5 w-3.5" /> Available Margin Capital
            </label>
            <input
              type="number"
              value={capital}
              onChange={(e) => setCapital(Number(e.target.value) || 0)}
              className="w-full rounded-lg border border-slate-300 py-2.5 px-3 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {CAPITAL_CHIPS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCapital(c)}
                  className={`text-xs px-2.5 py-1 rounded-full border font-medium transition ${
                    capital === c
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:border-emerald-300"
                  }`}
                >
                  ₹{c >= 100000 ? `${c / 100000}L` : `${c / 1000}k`}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => generate()}
          disabled={!canGenerate || loading}
          className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-3 text-sm font-semibold transition"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          Generate Hyper-Local Feasibility Report
        </button>
      </div>

      {/* REPORT OUTPUT */}
      {report && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-emerald-50 border border-emerald-200 px-5 py-3">
            <p className="text-sm text-emerald-800 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Report for <span className="font-bold">{report.meta.sector.name}</span> in{" "}
              <span className="font-bold">
                {report.meta.panchayat}, {report.meta.block}, {report.meta.district}
              </span>
            </p>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 text-xs font-semibold"
            >
              <Download className="h-3.5 w-3.5" /> Download Bank-Ready DPR (PDF/Print)
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Pillar 1: Market Reach */}
            <PillarCard icon={<Users className="h-4 w-4" />} title="1 · Market Reach" color="emerald">
              <div className="flex items-center gap-6">
                <Gauge value={Math.min(100, Math.round(report.marketReach.population / 145))} label="Catchment Index" />
                <div className="space-y-2 text-sm flex-1">
                  <Row label="Population within radius" value={report.marketReach.population.toLocaleString("en-IN")} />
                  <Row label="Households in catchment" value={report.marketReach.householdsInCatchment.toLocaleString("en-IN")} />
                  <Row label="Weekly buying power" value={`₹${report.marketReach.catchmentBuyingPower.toLocaleString("en-IN")}`} />
                  <Row label="Catchment radius" value={`${report.marketReach.radiusKm} km`} />
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {report.marketReach.channels.map((c) => (
                  <span key={c} className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-2.5 py-1">
                    {c}
                  </span>
                ))}
              </div>
            </PillarCard>

            {/* Pillar 2: Opportunity & Gaps */}
            <PillarCard icon={<TrendingUp className="h-4 w-4" />} title="2 · Opportunity & Gaps Analysis" color="indigo">
              <div className="flex items-center gap-6">
                <Gauge value={report.opportunityGap.demandGapScore} color="#4f46e5" label="Demand-Gap Score" />
                <div className="flex-1">
                  <p className="text-sm text-slate-700 leading-relaxed">{report.opportunityGap.narrative}</p>
                  <p className="text-xs text-slate-400 mt-3">
                    Higher score indicates a wider unmet local demand — favourable entry conditions for this sector.
                  </p>
                </div>
              </div>
            </PillarCard>

            {/* Pillar 3: SWOT */}
            <PillarCard icon={<Grid2x2 className="h-4 w-4" />} title="3 · Budget-Tailored SWOT Analysis" color="slate" full>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <SwotBlock title="Strengths" items={report.swot.strengths} tone="emerald" />
                <SwotBlock title="Weaknesses" items={report.swot.weaknesses} tone="amber" />
                <SwotBlock title="Opportunities" items={report.swot.opportunities} tone="indigo" />
                <SwotBlock title="Threats" items={report.swot.threats} tone="rose" />
              </div>
            </PillarCard>

            {/* Pillar 4: Bottlenecks */}
            <PillarCard icon={<AlertTriangle className="h-4 w-4" />} title="4 · Threats & Bottleneck Pinpointing" color="amber">
              <div className="space-y-3">
                {report.bottlenecks.map((b) => (
                  <div key={b.label} className="flex items-start gap-3">
                    <div className="flex gap-0.5 mt-1 shrink-0">
                      {[1, 2, 3].map((i) => (
                        <span
                          key={i}
                          className={`h-2 w-2 rounded-full ${i <= b.severity ? "bg-amber-500" : "bg-slate-200"}`}
                        />
                      ))}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{b.label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{b.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </PillarCard>

            {/* Pillar 5: Competitor Density */}
            <PillarCard icon={<Building2 className="h-4 w-4" />} title="5 · Competitor Density Mapping" color="rose">
              <div className="flex items-center gap-6">
                <Gauge
                  value={DENSITY_STYLE[report.competitorDensity.level].pct}
                  color={DENSITY_STYLE[report.competitorDensity.level].color}
                  label="Saturation"
                />
                <div>
                  <p className="text-2xl font-extrabold text-slate-900">{report.competitorDensity.level}</p>
                  <p className="text-sm text-slate-500 mt-1">
                    ~{report.competitorDensity.estimatedUnits} similar micro-units estimated active in this block.
                  </p>
                </div>
              </div>
            </PillarCard>

            {/* Pillar 6: Pricing */}
            <PillarCard icon={<Tag className="h-4 w-4" />} title="6 · Product Market Value & Pricing Strategy" color="emerald">
              <div className="grid grid-cols-2 gap-3">
                <StatBox label="Local Competitor Avg" value={`₹${report.pricing.localCompetitorAvg} / ${report.pricing.unit}`} />
                <StatBox label="Recommended Price" value={`₹${report.pricing.recommendedPrice} / ${report.pricing.unit}`} highlight />
                <StatBox label="Daily Capacity" value={`${report.pricing.dailyUnitsCapacity} ${report.pricing.unit}s`} />
                <StatBox
                  label="Monthly Revenue Ceiling"
                  value={`₹${report.pricing.monthlyRevenueCeiling.toLocaleString("en-IN")}`}
                />
              </div>
              <div className="mt-3 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2">
                <p className="text-xs text-emerald-800">
                  Estimated monthly net margin:{" "}
                  <span className="font-bold">₹{report.pricing.estMonthlyMargin.toLocaleString("en-IN")}</span>
                </p>
              </div>
            </PillarCard>
          </div>
        </div>
      )}

      {!report && (
        <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center">
          <Sparkles className="h-8 w-8 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">
            Complete the form above and generate your first hyper-local feasibility report.
          </p>
        </div>
      )}
    </div>
  );
}

function PillarCard({ icon, title, color, children, full }) {
  const colorMap = {
    emerald: "text-emerald-700 bg-emerald-50 border-emerald-200",
    indigo: "text-indigo-700 bg-indigo-50 border-indigo-200",
    slate: "text-slate-700 bg-slate-100 border-slate-300",
    amber: "text-amber-700 bg-amber-50 border-amber-200",
    rose: "text-rose-700 bg-rose-50 border-rose-200",
  };
  return (
    <div className={`rounded-2xl bg-white border border-slate-200 shadow-sm p-5 ${full ? "lg:col-span-2" : ""}`}>
      <div className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold mb-4 ${colorMap[color]}`}>
        {icon} {title}
      </div>
      {children}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-400">{label}</span>
      <span className="font-semibold text-slate-800">{value}</span>
    </div>
  );
}

function StatBox({ label, value, highlight }) {
  return (
    <div className={`rounded-lg px-3 py-2.5 border ${highlight ? "bg-emerald-600 border-emerald-600" : "bg-slate-50 border-slate-200"}`}>
      <p className={`text-[11px] ${highlight ? "text-emerald-100" : "text-slate-400"}`}>{label}</p>
      <p className={`text-sm font-bold mt-0.5 ${highlight ? "text-white" : "text-slate-800"}`}>{value}</p>
    </div>
  );
}

const SWOT_TONE = {
  emerald: "bg-emerald-50 border-emerald-200 text-emerald-800",
  amber: "bg-amber-50 border-amber-200 text-amber-800",
  indigo: "bg-indigo-50 border-indigo-200 text-indigo-800",
  rose: "bg-rose-50 border-rose-200 text-rose-800",
};

function SwotBlock({ title, items, tone }) {
  return (
    <div className={`rounded-xl border p-3.5 ${SWOT_TONE[tone]}`}>
      <p className="text-xs font-extrabold uppercase tracking-wide mb-2">{title}</p>
      <ul className="space-y-1.5">
        {items.map((it, i) => (
          <li key={i} className="text-xs leading-relaxed flex gap-1.5">
            <span>•</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
