import React, { useState, useMemo } from "react";
import {
  Landmark,
  Wallet,
  Calculator,
  BarChart3,
  CloudRain,
  IndianRupee,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  Info,
  Droplets,
  Wheat,
  Sun,
  Snowflake,
  PartyPopper,
  CircleDollarSign,
  Scale,
  Banknote,
  Percent,
  Clock,
  Layers,
  CircleDot,
  TrendingDown,
  PiggyBank,
  Sparkles,
} from "lucide-react";

// ─── Constants ───────────────────────────────────────────────────────────────

const CAPITAL_CHIPS = [25000, 50000, 100000, 250000, 500000];

const VIEWS = [
  {
    id: 1,
    short: "Scheme Calculator",
    label: "Module 2: Smart Scheme Calculator & EMI Router",
    icon: Calculator,
  },
  {
    id: 2,
    short: "Unit Economics",
    label: "Feature 2: Prudential Loan & Unit-Economics Simulator",
    icon: BarChart3,
  },
  {
    id: 3,
    short: "Seasonal Stress",
    label: "Feature 3: Agro-Seasonal & Monsoon EMI Stress Engine",
    icon: CloudRain,
  },
];

const SEASONAL_CYCLES = [
  {
    id: "kharif",
    name: "Kharif Dominant",
    icon: Droplets,
    desc: "Oct/Nov Harvest peak",
    quarters: [
      { name: "Q1 – Sowing", inflowPct: 40, label: "Pre-monsoon sowing" },
      { name: "Q2 – Monsoon", inflowPct: 25, label: "Peak monsoon dip" },
      { name: "Q3 – Harvest", inflowPct: 130, label: "Oct/Nov harvest peak" },
      { name: "Q4 – Post-Harvest", inflowPct: 90, label: "Marketing & warehousing" },
    ],
  },
  {
    id: "rabi",
    name: "Rabi Dominant",
    icon: Wheat,
    desc: "March/April Harvest peak",
    quarters: [
      { name: "Q1 – Sowing", inflowPct: 35, label: "Winter sowing" },
      { name: "Q2 – Growth", inflowPct: 30, label: "Minimal cash flow" },
      { name: "Q3 – Harvest", inflowPct: 135, label: "March/April harvest peak" },
      { name: "Q4 – Post-Harvest", inflowPct: 100, label: "Marketing phase" },
    ],
  },
  {
    id: "dairy",
    name: "Dairy / Perennial",
    icon: CircleDot,
    desc: "Steady with monsoon dip",
    quarters: [
      { name: "Q1 – Normal", inflowPct: 95, label: "Steady production" },
      { name: "Q2 – Monsoon", inflowPct: 70, label: "Feed cost spike, monsoon dip" },
      { name: "Q3 – Recovery", inflowPct: 105, label: "Post-monsoon recovery" },
      { name: "Q4 – Peak", inflowPct: 120, label: "Festive demand surge" },
    ],
  },
  {
    id: "artisanal",
    name: "Artisanal",
    icon: PartyPopper,
    desc: "Festive surge",
    quarters: [
      { name: "Q1 – Lean", inflowPct: 50, label: "Off-season production" },
      { name: "Q2 – Moderate", inflowPct: 70, label: "Moderate sales" },
      { name: "Q3 – Build-up", inflowPct: 85, label: "Festive inventory build" },
      { name: "Q4 – Festive Peak", inflowPct: 160, label: "Diwali/festival peak" },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtINR(n) {
  if (n == null || isNaN(n)) return "₹0";
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

function fmtINRFull(n) {
  if (n == null || isNaN(n)) return "₹0";
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

function fmtPct(n, decimals = 1) {
  if (n == null || isNaN(n)) return "0%";
  return n.toFixed(decimals) + "%";
}

function fmtX(n) {
  if (n == null || isNaN(n)) return "0x";
  return n.toFixed(2) + "x";
}

// Standard quarterly EMI (annuity) – reducing balance
function calcQuarterlyEMI(principal, quarterlyRate, totalQuarters) {
  if (principal <= 0 || totalQuarters <= 0) return 0;
  if (quarterlyRate === 0) return principal / totalQuarters;
  const r = quarterlyRate;
  const n = totalQuarters;
  const factor = Math.pow(1 + r, n);
  return (principal * r * factor) / (factor - 1);
}

// Build amortization schedule with moratorium
function buildAmortization(principal, annualRate, totalMonths, moratoriumMonths) {
  const quarterlyRate = annualRate / 4;
  const totalQuarters = totalMonths / 3;
  const moratoriumQuarters = moratoriumMonths / 3;

  const quarterlyEMI =
    totalQuarters - moratoriumQuarters > 0
      ? calcQuarterlyEMI(principal, quarterlyRate, totalQuarters - moratoriumQuarters)
      : 0;

  const schedule = [];
  let balance = principal;

  for (let q = 1; q <= totalQuarters; q++) {
    const openingBalance = balance;
    const interest = balance * quarterlyRate;

    if (q <= moratoriumQuarters) {
      // Moratorium: interest accrued to principal, no principal repayment
      balance += interest;
      schedule.push({
        quarter: q,
        openingBalance,
        interest,
        principalRepaid: 0,
        totalEMI: interest,
        closingBalance: balance,
        status: "moratorium",
      });
    } else {
      const principalRepaid = quarterlyEMI - interest;
      balance = Math.max(0, balance - principalRepaid);
      schedule.push({
        quarter: q,
        openingBalance,
        interest,
        principalRepaid,
        totalEMI: quarterlyEMI,
        closingBalance: balance,
        status: balance <= 0.5 ? "settled" : "active",
      });
    }
  }

  return { schedule, quarterlyEMI, moratoriumQuarters, totalQuarters };
}

// ─── View Components ─────────────────────────────────────────────────────────

// ─── View 1: Smart Scheme Calculator & EMI Router ────────────────────────────

function View1SchemeCalculator({ marginCapital }) {
  const feasibleProjectCost = marginCapital / 0.1;
  const scaLoan = feasibleProjectCost * 0.9;

  // Determine tier
  const isTierA = feasibleProjectCost <= 140000;
  const tierConfig = isTierA
    ? {
        name: "Micro Finance Scheme",
        tier: "Tier A",
        rate: 0.065,
        annualRate: 6.5,
        totalMonths: 36,
        moratoriumMonths: 3,
        cap: 125000,
        capLabel: "₹1,25,000",
      }
    : {
        name: "Term Loan Scheme",
        tier: "Tier B",
        rate: 0.08,
        annualRate: 8.0,
        totalMonths: 84,
        moratoriumMonths: 6,
        cap: 4500000,
        capLabel: "₹45,00,000",
      };

  const effectiveLoan = Math.min(scaLoan, tierConfig.cap);
  const { schedule, quarterlyEMI, moratoriumQuarters, totalQuarters } = buildAmortization(
    effectiveLoan,
    tierConfig.rate,
    tierConfig.totalMonths,
    tierConfig.moratoriumMonths
  );

  const capex = feasibleProjectCost * 0.7;
  const opex = feasibleProjectCost * 0.3;

  return (
    <div className="space-y-6">
      {/* Metric badges */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricBadge
          icon={<CircleDollarSign className="h-4 w-4" />}
          label="Feasible Project Cost"
          value={fmtINR(feasibleProjectCost)}
          color="emerald"
        />
        <MetricBadge
          icon={<Banknote className="h-4 w-4" />}
          label="90% Loan Disbursal"
          value={fmtINR(effectiveLoan)}
          color="indigo"
        />
        <MetricBadge
          icon={<ShieldCheck className="h-4 w-4" />}
          label="Scheme Tier"
          value={tierConfig.tier}
          sub={tierConfig.name}
          color="amber"
        />
        <MetricBadge
          icon={<Clock className="h-4 w-4" />}
          label="Standard Quarterly EMI"
          value={fmtINR(quarterlyEMI)}
          color="slate"
        />
      </div>

      {/* CapEx vs OpEx visualizer */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5">
        <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">
          Capital Allocation Split
        </p>
        <div className="flex h-8 rounded-full overflow-hidden border border-slate-200">
          <div
            className="bg-emerald-600 flex items-center justify-center text-white text-xs font-bold transition-all duration-500"
            style={{ width: "70%" }}
          >
            70% CapEx – Fixed Assets
          </div>
          <div
            className="bg-indigo-500 flex items-center justify-center text-white text-xs font-bold transition-all duration-500"
            style={{ width: "30%" }}
          >
            30% OpEx
          </div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-slate-500">
          <span>CapEx: {fmtINR(capex)}</span>
          <span>Working Capital Cushion: {fmtINR(opex)}</span>
        </div>
      </div>

      {/* Scheme routing decision cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <SchemeDecisionCard
          title="Micro Finance Scheme"
          tier="Tier A"
          criteria="Project Cost ≤ ₹1,40,000"
          rate="6.5%"
          tenure="3 Years (36 months)"
          moratorium="3 Months"
          cap="₹1,25,000"
          active={isTierA}
        />
        <SchemeDecisionCard
          title="Term Loan Scheme"
          tier="Tier B"
          criteria="₹1,40,000 < Project Cost ≤ ₹50,00,000"
          rate="8.0%"
          tenure="7 Years (84 months)"
          moratorium="6 Months"
          cap="₹45,00,000"
          active={!isTierA}
        />
      </div>

      {/* Amortization table */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-slate-900">Quarterly Amortization Schedule</p>
            <p className="text-xs text-slate-500 mt-0.5">
              {tierConfig.name} · {tierConfig.annualRate}% p.a. · {tierConfig.totalMonths / 12} years ·{" "}
              {tierConfig.moratoriumMonths} month moratorium
            </p>
          </div>
          <span className="text-xs font-semibold bg-slate-100 text-slate-600 rounded-full px-3 py-1">
            {totalQuarters} quarters
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider">
                <th className="px-4 py-2.5 text-left font-semibold">Qtr #</th>
                <th className="px-4 py-2.5 text-right font-semibold">Opening Balance</th>
                <th className="px-4 py-2.5 text-right font-semibold">Interest</th>
                <th className="px-4 py-2.5 text-right font-semibold">Principal Repaid</th>
                <th className="px-4 py-2.5 text-right font-semibold">Total EMI</th>
                <th className="px-4 py-2.5 text-right font-semibold">Closing Balance</th>
                <th className="px-4 py-2.5 text-center font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row) => (
                <tr
                  key={row.quarter}
                  className={`border-t border-slate-100 ${
                    row.status === "moratorium"
                      ? "bg-amber-50/50"
                      : row.status === "settled"
                      ? "bg-emerald-50/50"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <td className="px-4 py-2 font-semibold text-slate-700">Q{row.quarter}</td>
                  <td className="px-4 py-2 text-right text-slate-700">
                    {fmtINRFull(row.openingBalance)}
                  </td>
                  <td className="px-4 py-2 text-right text-slate-600">
                    {fmtINRFull(row.interest)}
                  </td>
                  <td className="px-4 py-2 text-right text-slate-600">
                    {row.status === "moratorium" ? (
                      <span className="text-amber-600">—</span>
                    ) : (
                      fmtINRFull(row.principalRepaid)
                    )}
                  </td>
                  <td className="px-4 py-2 text-right font-semibold text-slate-800">
                    {fmtINRFull(row.totalEMI)}
                  </td>
                  <td className="px-4 py-2 text-right font-semibold text-slate-800">
                    {fmtINRFull(row.closingBalance)}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        row.status === "moratorium"
                          ? "bg-amber-100 text-amber-700 border border-amber-200"
                          : row.status === "settled"
                          ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                          : "bg-slate-100 text-slate-600 border border-slate-200"
                      }`}
                    >
                      {row.status === "moratorium"
                        ? "Moratorium"
                        : row.status === "settled"
                        ? "Settled"
                        : "Active"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── View 2: Prudential Loan & Unit-Economics Simulator ──────────────────────

function View2UnitEconomics({ marginCapital }) {
  const [projectScale, setProjectScale] = useState(150000);
  const [dailySales, setDailySales] = useState(40);
  const [sellingPrice, setSellingPrice] = useState(60);
  const [rawMaterialCost, setRawMaterialCost] = useState(30);
  const [monthlyFixedOpex, setMonthlyFixedOpex] = useState(8000);

  const loanAmount = projectScale * 0.9;
  const quarterlyRate = 0.08 / 4;
  const totalQuarters = 28; // 7 years
  const quarterlyEMI = calcQuarterlyEMI(loanAmount, quarterlyRate, totalQuarters);

  // 26 working days/month
  const workingDays = 26;
  const monthlyRevenue = dailySales * sellingPrice * workingDays;
  const monthlyRawCost = dailySales * rawMaterialCost * workingDays;
  const monthlyGrossProfit = monthlyRevenue - monthlyRawCost;
  const monthlyNetOperatingCashFlow = monthlyGrossProfit - monthlyFixedOpex;
  const quarterlyNetOperatingIncome = monthlyNetOperatingCashFlow * 3;
  const quarterlyDebtService = quarterlyEMI;

  const dscr = quarterlyDebtService > 0 ? quarterlyNetOperatingIncome / quarterlyDebtService : 0;

  // BEP: units where monthly net operating = 0 (break-even revenue)
  // Monthly fixed cost = monthlyFixedOpex
  // Per-unit gross margin = sellingPrice - rawMaterialCost
  const perUnitGrossMargin = sellingPrice - rawMaterialCost;
  const bepUnitsPerMonth =
    perUnitGrossMargin > 0 ? Math.ceil(monthlyFixedOpex / perUnitGrossMargin) : 0;
  const bepRevenuePerMonth = bepUnitsPerMonth * sellingPrice;

  // Safe borrowing: where DSCR >= 1.5
  // DSCR = quarterlyNetOpIncome / quarterlyDebtService >= 1.5
  // quarterlyNetOpIncome = (dailySales * (sellingPrice - rawMaterialCost) * 26 - monthlyFixedOpex) * 3
  // We want to find the max loan where this holds
  // quarterlyDebtService = calcQuarterlyEMI(maxLoan, 0.02, 28)
  // Since EMI is proportional to loan, safe max loan = loanAmount * (1.5 / dscr) if dscr < 1.5
  const safeBorrowingMultiple = dscr > 0 ? 1.5 / dscr : 0;
  const safeBorrowingThreshold =
    dscr >= 1.5 ? loanAmount : loanAmount * safeBorrowingMultiple;

  // Risk gauge
  let riskLevel, riskColor, riskBg, riskBorder;
  if (dscr >= 1.5) {
    riskLevel = "Safe";
    riskColor = "text-emerald-700";
    riskBg = "bg-emerald-50";
    riskBorder = "border-emerald-200";
  } else if (dscr >= 1.15) {
    riskLevel = "Moderate Caution";
    riskColor = "text-amber-700";
    riskBg = "bg-amber-50";
    riskBorder = "border-amber-200";
  } else {
    riskLevel = "High Default Risk";
    riskColor = "text-red-700";
    riskBg = "bg-red-50";
    riskBorder = "border-red-200";
  }

  // DSCR gauge fill (cap at 2x for visual)
  const dscrGaugePct = Math.min(100, (dscr / 2) * 100);

  return (
    <div className="space-y-6">
      {/* Unit Economics Controls */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5">
        <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-4">
          Interactive Unit Economics Controls
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          <SliderControl
            label="Simulated Project Scale"
            value={projectScale}
            onChange={setProjectScale}
            min={25000}
            max={500000}
            step={5000}
            format={fmtINR}
          />
          <SliderControl
            label="Daily Sales Volume"
            value={dailySales}
            onChange={setDailySales}
            min={5}
            max={200}
            step={1}
            format={(v) => `${v} units/day`}
          />
          <SliderControl
            label="Selling Price per Unit"
            value={sellingPrice}
            onChange={setSellingPrice}
            min={5}
            max={500}
            step={1}
            format={(v) => fmtINR(v)}
          />
          <SliderControl
            label="Raw Material Cost per Unit"
            value={rawMaterialCost}
            onChange={setRawMaterialCost}
            min={1}
            max={400}
            step={1}
            format={(v) => fmtINR(v)}
          />
          <SliderControl
            label="Monthly Fixed OpEx"
            value={monthlyFixedOpex}
            onChange={setMonthlyFixedOpex}
            min={1000}
            max={50000}
            step={500}
            format={fmtINR}
          />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricBadge
          icon={<TrendingUp className="h-4 w-4" />}
          label="Monthly Gross Revenue"
          value={fmtINR(monthlyRevenue)}
          color="emerald"
        />
        <MetricBadge
          icon={<Banknote className="h-4 w-4" />}
          label="Monthly Gross Profit"
          value={fmtINR(monthlyGrossProfit)}
          color="indigo"
        />
        <MetricBadge
          icon={<Wallet className="h-4 w-4" />}
          label="Net Operating Cash Flow"
          value={fmtINR(monthlyNetOperatingCashFlow)}
          color={monthlyNetOperatingCashFlow >= 0 ? "emerald" : "rose"}
        />
        <MetricBadge
          icon={<Clock className="h-4 w-4" />}
          label="Monthly Debt Service"
          value={fmtINR(quarterlyEMI / 3)}
          color="slate"
        />
      </div>

      {/* BEP and DSCR */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Break-Even */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold px-2.5 py-1 mb-4">
            <Scale className="h-3.5 w-3.5" /> Break-Even Point
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Break-Even (units/month)</span>
              <span className="text-lg font-bold text-slate-900">
                {bepUnitsPerMonth.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Break-Even Revenue/month</span>
              <span className="text-lg font-bold text-slate-900">{fmtINR(bepRevenuePerMonth)}</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100 overflow-hidden mt-2">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  monthlyRevenue >= bepRevenuePerMonth ? "bg-emerald-500" : "bg-amber-500"
                }`}
                style={{
                  width: `${Math.min(100, (monthlyRevenue / Math.max(bepRevenuePerMonth, 1)) * 100)}%`,
                }}
              />
            </div>
            <p className="text-xs text-slate-400">
              Current revenue: {fmtINR(monthlyRevenue)} ·{" "}
              {monthlyRevenue >= bepRevenuePerMonth ? (
                <span className="text-emerald-600 font-semibold">Above break-even ✓</span>
              ) : (
                <span className="text-amber-600 font-semibold">
                  Below break-even ({fmtINR(bepRevenuePerMonth - monthlyRevenue)} shortfall)
                </span>
              )}
            </p>
          </div>
        </div>

        {/* DSCR */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-300 text-slate-700 text-xs font-bold px-2.5 py-1 mb-4">
            <PiggyBank className="h-3.5 w-3.5" /> Debt Service Coverage Ratio
          </div>
          <div className="flex items-center gap-5">
            <div className="relative">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={dscr >= 1.5 ? "#059669" : dscr >= 1.15 ? "#d97706" : "#dc2626"}
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 40}
                  strokeDashoffset={2 * Math.PI * 40 * (1 - Math.min(dscrGaugePct / 100, 1))}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dy="0.35em"
                  className="fill-slate-900 font-bold"
                  fontSize="18"
                >
                  {dscr.toFixed(2)}x
                </text>
              </svg>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Quarterly Net Operating Income</span>
                <span className="font-semibold text-slate-800">
                  {fmtINR(quarterlyNetOperatingIncome)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Quarterly Debt Service (EMI)</span>
                <span className="font-semibold text-slate-800">{fmtINR(quarterlyDebtService)}</span>
              </div>
              <p className="text-xs text-slate-400">
                DSCR = Quarterly Net Operating Income / Quarterly Debt Service
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Safe-Borrowing Benchmark */}
      <div className={`rounded-2xl ${riskBg} border ${riskBorder} shadow-sm p-5`}>
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
            <Sparkles className="h-5 w-5 text-indigo-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-slate-900">
              AI Safe-Borrowing Benchmark
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Calculates the maximum safe borrowing threshold where DSCR ≥ 1.50x
            </p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-lg bg-white border border-slate-200 p-3">
                <p className="text-[11px] text-slate-400 uppercase">Current Loan</p>
                <p className="text-lg font-bold text-slate-900 mt-0.5">{fmtINR(loanAmount)}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  DSCR: <span className={`font-bold ${riskColor}`}>{dscr.toFixed(2)}x</span>
                </p>
              </div>
              <div className="rounded-lg bg-white border border-slate-200 p-3">
                <p className="text-[11px] text-slate-400 uppercase">Safe Max Borrowing</p>
                <p className="text-lg font-bold text-slate-900 mt-0.5">
                  {fmtINR(safeBorrowingThreshold)}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">DSCR target: 1.50x</p>
              </div>
              <div className="rounded-lg bg-white border border-slate-200 p-3">
                <p className="text-[11px] text-slate-400 uppercase">Risk Assessment</p>
                <p className={`text-lg font-bold mt-0.5 ${riskColor}`}>{riskLevel}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {dscr >= 1.5
                    ? "Comfortable margin above 1.5x"
                    : dscr >= 1.15
                    ? "Approaching stress zone"
                    : "Below minimum viability threshold"}
                </p>
              </div>
            </div>

            {/* Risk gauge bar */}
            <div className="mt-4">
              <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                <span>0x</span>
                <span>1.15x</span>
                <span>1.50x</span>
                <span>2.0x+</span>
              </div>
              <div className="h-3 rounded-full overflow-hidden bg-gradient-to-r from-red-400 via-amber-400 to-emerald-500 relative">
                <div
                  className="absolute top-0 h-full w-1 bg-slate-900 rounded-full shadow-md transition-all duration-500"
                  style={{ left: `${Math.min(100, (dscr / 2) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between mt-1 text-[10px] font-semibold">
                <span className="text-red-600">High Default Risk</span>
                <span className="text-amber-600">Moderate Caution</span>
                <span className="text-emerald-600">Safe Zone</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── View 3: Agro-Seasonal & Monsoon EMI Stress Engine ──────────────────────

function View3SeasonalStress({ marginCapital }) {
  const [selectedCycle, setSelectedCycle] = useState("kharif");

  const feasibleProjectCost = marginCapital / 0.1;
  const loanAmount = feasibleProjectCost * 0.9;
  const quarterlyRate = 0.08 / 4;
  const totalQuarters = 28;
  const quarterlyEMI = calcQuarterlyEMI(loanAmount, quarterlyRate, totalQuarters);

  const cycle = SEASONAL_CYCLES.find((c) => c.id === selectedCycle);

  // Compute quarterly inflows (as ₹ per quarter) assuming projectScale = feasibleProjectCost
  // Base quarterly income estimate: feasibleProjectCost * 0.35 / year, spread across 4 quarters
  const annualBaseIncome = feasibleProjectCost * 0.35;
  const baseQuarterlyIncome = annualBaseIncome / 4;

  const quarterData = cycle.quarters.map((q) => {
    const projectedInflow = baseQuarterlyIncome * (q.inflowPct / 100);
    const deficit = projectedInflow - quarterlyEMI;
    const coverageRatio = quarterlyEMI > 0 ? projectedInflow / quarterlyEMI : 0;
    return {
      ...q,
      projectedInflow,
      deficit,
      coverageRatio,
      hasDeficit: projectedInflow < quarterlyEMI,
    };
  });

  // Emergency reserve: sum of deficits across all quarters that have a shortfall
  const totalDeficit = quarterData
    .filter((q) => q.hasDeficit)
    .reduce((sum, q) => sum + Math.abs(q.deficit), 0);

  // Max quarter shortfall (for recommended reserve)
  const maxQuarterShortfall = quarterData
    .filter((q) => q.hasDeficit)
    .reduce((max, q) => Math.max(max, Math.abs(q.deficit)), 0);

  // Recommended reserve = cover all deficits for the year
  const recommendedReserve = totalDeficit * 1.1; // 10% buffer

  return (
    <div className="space-y-6">
      {/* Agro-Climatic Cycle Selector */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5">
        <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-4">
          Agro-Climatic Cycle Selector
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {SEASONAL_CYCLES.map((sc) => {
            const Icon = sc.icon;
            const isActive = sc.id === selectedCycle;
            return (
              <button
                key={sc.id}
                onClick={() => setSelectedCycle(sc.id)}
                className={`rounded-xl border p-4 text-left transition-all ${
                  isActive
                    ? "bg-emerald-50 border-emerald-300 shadow-sm ring-2 ring-emerald-200"
                    : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div
                  className={`h-10 w-10 rounded-lg flex items-center justify-center mb-3 ${
                    isActive ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <p
                  className={`text-sm font-bold ${isActive ? "text-emerald-800" : "text-slate-800"}`}
                >
                  {sc.name}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{sc.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quarterly EMI summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4 flex items-center gap-4">
          <div className="h-11 w-11 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center">
            <Clock className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Fixed Quarterly EMI</p>
            <p className="text-xl font-bold text-slate-900">{fmtINR(quarterlyEMI)}</p>
          </div>
        </div>
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4 flex items-center gap-4">
          <div className="h-11 w-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
            <Banknote className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Base Quarterly Income</p>
            <p className="text-xl font-bold text-slate-900">{fmtINR(baseQuarterlyIncome)}</p>
          </div>
        </div>
      </div>

      {/* 4-Quarter Stress Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {quarterData.map((q, i) => {
          const coveragePct = Math.min(100, (q.coverageRatio / 2) * 100);
          return (
            <div
              key={i}
              className={`rounded-2xl border shadow-sm p-5 ${
                q.hasDeficit
                  ? "bg-red-50/50 border-red-200"
                  : "bg-white border-slate-200"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-bold text-slate-900">{q.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{q.label}</p>
                </div>
                {q.hasDeficit && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-100 text-red-700 border border-red-200 text-[10px] font-bold px-2 py-0.5">
                    <AlertTriangle className="h-3 w-3" /> Deficit Alert
                  </span>
                )}
              </div>

              <div className="space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Projected Cash Inflow</span>
                  <span className="font-semibold text-slate-800">
                    {fmtINR(q.projectedInflow)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Fixed Quarterly EMI</span>
                  <span className="font-semibold text-slate-800">{fmtINR(quarterlyEMI)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Net Position</span>
                  <span
                    className={`font-bold ${
                      q.hasDeficit ? "text-red-700" : "text-emerald-700"
                    }`}
                  >
                    {q.hasDeficit ? "−" : "+"}
                    {fmtINR(Math.abs(q.deficit))}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">EMI Coverage</span>
                  <span
                    className={`font-bold ${
                      q.coverageRatio >= 1.5
                        ? "text-emerald-700"
                        : q.coverageRatio >= 1.0
                        ? "text-amber-700"
                        : "text-red-700"
                    }`}
                  >
                    {q.coverageRatio.toFixed(2)}x
                  </span>
                </div>

                {/* Coverage bar */}
                <div>
                  <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        q.coverageRatio >= 1.5
                          ? "bg-emerald-500"
                          : q.coverageRatio >= 1.0
                          ? "bg-amber-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${coveragePct}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-0.5">
                    <span className="text-[10px] text-slate-400">0%</span>
                    <span className="text-[10px] text-slate-400">100%</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mitigation Directive */}
      <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 shadow-sm p-5">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0">
            <ShieldCheck className="h-5 w-5 text-amber-700" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-slate-900">
              Mitigation Directive — Emergency Working Capital Reserve
            </p>
            <p className="text-xs text-slate-500 mt-1">
              To ensure uninterrupted debt solvency throughout the {cycle.name.toLowerCase()} cycle,
              the following reserve should be ring-fenced from project capital.
            </p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-lg bg-white border border-slate-200 p-3">
                <p className="text-[11px] text-slate-400 uppercase">Total Annual Shortfall</p>
                <p className="text-lg font-bold text-red-700 mt-0.5">{fmtINR(totalDeficit)}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Sum of all quarterly deficits
                </p>
              </div>
              <div className="rounded-lg bg-white border border-slate-200 p-3">
                <p className="text-[11px] text-slate-400 uppercase">Max Quarter Shortfall</p>
                <p className="text-lg font-bold text-amber-700 mt-0.5">
                  {fmtINR(maxQuarterShortfall)}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">Worst single quarter</p>
              </div>
              <div className="rounded-lg bg-white border border-amber-300 p-3">
                <p className="text-[11px] text-amber-600 uppercase font-bold">
                  Recommended Reserve
                </p>
                <p className="text-lg font-bold text-emerald-700 mt-0.5">
                  {fmtINR(recommendedReserve)}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  10% buffer over total shortfall
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-white border border-slate-200 p-3">
              <p className="text-xs text-slate-600">
                <span className="font-bold">Directive:</span> Reserve{" "}
                <span className="font-bold text-emerald-700">{fmtINR(recommendedReserve)}</span> of
                the {fmtINR(marginCapital)} margin capital as an emergency working capital buffer.
                This ensures that during {cycle.quarters.filter((q) => q.hasDeficit).map((q) => q.name.split(" – ")[1]).join(", ") || "lean"} quarters, the enterprise maintains uninterrupted debt solvency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Shared Sub-Components ───────────────────────────────────────────────────

function MetricBadge({ icon, label, value, sub, color }) {
  const colorMap = {
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-700",
    indigo: "bg-indigo-50 border-indigo-200 text-indigo-700",
    amber: "bg-amber-50 border-amber-200 text-amber-700",
    slate: "bg-slate-100 border-slate-300 text-slate-700",
    rose: "bg-red-50 border-red-200 text-red-700",
  };
  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4">
      <div
        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold mb-3 ${colorMap[color]}`}
      >
        {icon} {label}
      </div>
      <p className="text-xl font-extrabold text-slate-900">{value}</p>
      {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
    </div>
  );
}

function SchemeDecisionCard({
  title,
  tier,
  criteria,
  rate,
  tenure,
  moratorium,
  cap,
  active,
}) {
  return (
    <div
      className={`rounded-2xl border shadow-sm p-5 transition-all ${
        active
          ? "bg-emerald-50 border-emerald-300 ring-2 ring-emerald-200"
          : "bg-white border-slate-200 opacity-60"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-slate-900">{title}</p>
            {active && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5">
                <CheckCircle2 className="h-3 w-3" /> Auto-Selected
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">{criteria}</p>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-bold ${
            active
              ? "bg-emerald-600 text-white"
              : "bg-slate-200 text-slate-500"
          }`}
        >
          {tier}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="rounded-lg bg-white border border-slate-200 p-2.5">
          <p className="text-[10px] text-slate-400 uppercase">Interest Rate</p>
          <p className="text-sm font-bold text-slate-800 mt-0.5">{rate}% p.a.</p>
        </div>
        <div className="rounded-lg bg-white border border-slate-200 p-2.5">
          <p className="text-[10px] text-slate-400 uppercase">Tenure</p>
          <p className="text-sm font-bold text-slate-800 mt-0.5">{tenure}</p>
        </div>
        <div className="rounded-lg bg-white border border-slate-200 p-2.5">
          <p className="text-[10px] text-slate-400 uppercase">Moratorium</p>
          <p className="text-sm font-bold text-slate-800 mt-0.5">{moratorium}</p>
        </div>
        <div className="rounded-lg bg-white border border-slate-200 p-2.5">
          <p className="text-[10px] text-slate-400 uppercase">Max SCA Loan</p>
          <p className="text-sm font-bold text-slate-800 mt-0.5">{cap}</p>
        </div>
      </div>
    </div>
  );
}

function SliderControl({ label, value, onChange, min, max, step, format }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-semibold text-slate-600">{label}</label>
        <span className="text-xs font-bold text-slate-800 bg-slate-100 rounded-full px-2.5 py-0.5">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer accent-emerald-600"
        style={{
          background: `linear-gradient(to right, #059669 0%, #059669 ${pct}%, #e2e8f0 ${pct}%, #e2e8f0 100%)`,
        }}
      />
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-slate-400">{format(min)}</span>
        <span className="text-[10px] text-slate-400">{format(max)}</span>
      </div>
    </div>
  );
}

// ─── Main FinanceTab Component ───────────────────────────────────────────────

export default function FinanceTab({ lastReport, user }) {
  const [activeView, setActiveView] = useState(1);
  const [marginCapital, setMarginCapital] = useState(
    lastReport?.meta?.capital || 100000
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Top banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white p-5 mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
            <Landmark className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-slate-300">Ministry of Social Justice & Empowerment</p>
            <p className="text-sm font-bold mt-0.5">
              Concessional Credit Structuring Module — 10:90 Margin Capital Framework
            </p>
          </div>
        </div>
      </div>

      {/* Global Margin Input */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
          <div className="flex-1 w-full sm:w-auto">
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Wallet className="h-3.5 w-3.5" /> Available Margin Capital (₹)
              </span>
            </label>
            <input
              type="number"
              value={marginCapital}
              onChange={(e) => setMarginCapital(Number(e.target.value) || 0)}
              className="w-full rounded-lg border border-slate-300 py-2.5 px-3 text-sm font-semibold focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CAPITAL_CHIPS.map((c) => (
              <button
                key={c}
                onClick={() => setMarginCapital(c)}
                className={`text-xs px-3 py-1.5 rounded-full border font-semibold transition ${
                  marginCapital === c
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:border-emerald-300"
                }`}
              >
                {fmtINR(c)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Segmented View Switcher */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-1.5 mb-6 flex flex-col sm:flex-row gap-1.5">
        {VIEWS.map((v) => {
          const Icon = v.icon;
          const isActive = v.id === activeView;
          return (
            <button
              key={v.id}
              onClick={() => setActiveView(v.id)}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                isActive
                  ? "bg-emerald-600 text-white shadow-md"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="hidden md:inline">{v.label}</span>
              <span className="md:hidden">{v.short}</span>
            </button>
          );
        })}
      </div>

      {/* Active View Content */}
      {activeView === 1 && <View1SchemeCalculator marginCapital={marginCapital} />}
      {activeView === 2 && <View2UnitEconomics marginCapital={marginCapital} />}
      {activeView === 3 && <View3SeasonalStress marginCapital={marginCapital} />}
    </div>
  );
}
