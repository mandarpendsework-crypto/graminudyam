import React, { useState, useMemo } from "react";
import {
  Handshake,
  Landmark,
  ShieldCheck,
  MapPin,
  Phone,
  Truck,
  ShoppingCart,
  Users,
  ArrowDownRight,
  ArrowUpRight,
  ArrowRightLeft,
  AlertTriangle,
  CheckCircle2,
  Download,
  X,
  Factory,
  Milk,
  Wheat,
  Shirt,
  Store,
  TreePine,
  Fuel,
  Snowflake,
  Wrench,
  PackageCheck,
  BadgeCheck,
  TrendingDown,
  TrendingUp,
  Minus,
  CircleDot,
  FileText,
  Sparkles,
  ChevronDown,
} from "lucide-react";

// ─── Constants & Mock Data ───────────────────────────────────────────────────

const SECTOR_ICON_MAP = {
  dairy: Milk,
  tailoring: Shirt,
  agro: Wheat,
  kirana: Store,
  bamboo: TreePine,
};

const ENTERPRISES = [
  {
    id: "dairy-1",
    name: "Dairy & Milk Chilling Unit",
    sector: "dairy",
    sectorLabel: "Dairy Farming",
    block: "Wagholi",
    district: "Pune",
    state: "Maharashtra",
    owner: "Sunita Devi",
    phone: "+91 98765 43210",
  },
  {
    id: "tailoring-1",
    name: "Tailoring & Garment Enterprise",
    sector: "tailoring",
    sectorLabel: "Garments / Tailoring",
    block: "Haveli",
    district: "Pune",
    state: "Maharashtra",
    owner: "Ramesh Kumar",
    phone: "+91 87654 32109",
  },
  {
    id: "agro-1",
    name: "Agro-Processing (Flour Mill)",
    sector: "agro",
    sectorLabel: "Agro-Processing",
    block: "Niphad",
    district: "Nashik",
    state: "Maharashtra",
    owner: "Vikram Patil",
    phone: "+91 76543 21098",
  },
];

const BACKWARD_LINKAGES = {
  "dairy-1": [
    {
      name: "Prajkta Cattle Feed Center",
      category: "Cattle Feed Supply",
      distance: "3.2 km",
      phone: "+91 98234 56701",
      capacity: "500 kg/month feed stock",
      verified: true,
    },
    {
      name: "Amul-Style Milk Chilling Machine Co.",
      category: "Machinery Servicing",
      distance: "6.8 km",
      phone: "+91 98123 45602",
      capacity: "Annual service & spare parts",
      verified: true,
    },
    {
      name: "Sai Veterinary Pharmacy",
      category: "Raw Material (Veterinary)",
      distance: "4.5 km",
      phone: "+91 98345 67803",
      capacity: "Bulk medicine & supplements",
      verified: false,
    },
    {
      name: "Kisan fodder cooperative",
      category: "Raw material (Fodder)",
      distance: "2.1 km",
      phone: "+91 98456 78904",
      capacity: "800 kg/month silage bales",
      verified: true,
    },
  ],
  "tailoring-1": [
    {
      name: "Priya Textile Traders",
      category: "Raw Material (Fabric)",
      distance: "5.0 km",
      phone: "+91 98111 22201",
      capacity: "200 metres/month cotton stock",
      verified: true,
    },
    {
      name: "Jain Sewing Machine Works",
      category: "Machinery Servicing",
      distance: "7.3 km",
      phone: "+91 98222 33302",
      capacity: "Annual service contracts",
      verified: true,
    },
    {
      name: "Mahalaxmi Button & Zipper Store",
      category: "Raw Material (Accessories)",
      distance: "3.8 km",
      phone: "+91 98333 44403",
      capacity: "Bulk buttons, zippers, threads",
      verified: false,
    },
  ],
  "agro-1": [
    {
      name: "Santosh Grain Mandi",
      category: "Raw Material (Wheat/Maize)",
      distance: "2.5 km",
      phone: "+91 98444 55501",
      capacity: "5 tonnes/month grain supply",
      verified: true,
    },
    {
      name: "Kalyani Oil Seed Suppliers",
      category: "Raw Material (Oil Seeds)",
      distance: "4.7 km",
      phone: "+91 98555 66602",
      capacity: "2 tonnes/month mustard & soybean",
      verified: true,
    },
    {
      name: "Nashik Agro Engineering Co.",
      category: "Machinery Servicing",
      distance: "8.1 km",
      phone: "+91 98666 77703",
      capacity: "Mill blade sharpening & motor repair",
      verified: false,
    },
  ],
};

const FORWARD_LINKAGES = {
  "dairy-1": [
    {
      name: "Wagholi Village Weekly Haat",
      category: "Weekly Haat",
      distance: "1.2 km",
      demand: "120 litres/day (Tue & Fri)",
      phone: "+91 98777 11101",
    },
    {
      name: "Shree Sweets & Namkeen",
      category: "Sweet Confectioners",
      distance: "5.4 km",
      demand: "80 litres/day (daily)",
      phone: "+91 98888 22202",
    },
    {
      name: "Pune Zilla Parishad Milk Board",
      category: "Institutional Buyer",
      distance: "12.0 km",
      demand: "200 litres/day (contract)",
      phone: "+91 98999 33303",
    },
    {
      name: "Sahyadri Milk Aggregator Pvt Ltd",
      category: "Wholesale Aggregator",
      distance: "15.2 km",
      demand: "300 litres/day (bulk pickup)",
      phone: "+91 98000 44404",
    },
  ],
  "tailoring-1": [
    {
      name: "Haveli Weekly Bazaar",
      category: "Weekly Haat",
      distance: "2.3 km",
      demand: "40 garments/week (Sat & Sun)",
      phone: "+91 98111 55501",
    },
    {
      name: "Balaji Uniforms & School Wear",
      category: "Institutional Buyer",
      distance: "6.8 km",
      demand: "150 garments/month (school contract)",
      phone: "+91 98222 66602",
    },
    {
      name: "Shree Garments Wholesale",
      category: "Wholesale Aggregator",
      distance: "9.5 km",
      demand: "200 garments/month",
      phone: "+91 98333 77703",
    },
  ],
  "agro-1": [
    {
      name: "Niphad Local Mandi",
      category: "Weekly Haat",
      distance: "1.8 km",
      demand: "150 kg flour/day",
      phone: "+91 98444 88801",
    },
    {
      name: "D-Mart Nashik Regional Hub",
      category: "Wholesale Aggregator",
      distance: "18.0 km",
      demand: "500 kg flour/week",
      phone: "+91 98555 99902",
    },
    {
      name: "Jumbo Flour Distributors",
      category: "Retail Chain",
      distance: "10.2 km",
      demand: "250 kg flour/week",
      phone: "+91 98666 00003",
    },
  ],
};

const HORIZONTAL_SYNERGIES = {
  "dairy-1": [
    {
      type: "Pooled Refrigerated Mini-Van",
      partner: "Ramesh Kumar (Tailoring Enterprise)",
      impact: "40% fuel cost reduction on milk transport to Pune mandi",
      savings: "₹4,200/month saved",
      icon: Truck,
    },
    {
      type: "Collective Cold Storage Unit",
      partner: "Vikram Patil (Agro-Processing)",
      impact: "Shared 5-tonne cold room — ₹35,000 CapEx saved vs. individual setup",
      savings: "₹35,000 CapEx saved",
      icon: Snowflake,
    },
    {
      type: "Joint Milk Packaging Procurement",
      partner: "Sahyadri Dairy Cluster (3 units)",
      impact: "Bulk pouch packaging at 28% lower cost per 1,000 pouches",
      savings: "₹1,800/month saved",
      icon: PackageCheck,
    },
  ],
  "tailoring-1": [
    {
      type: "Pooled Bulk Fabric Order",
      partner: "Sunita Devi (Dairy Enterprise — family unit)",
      impact: "Joint fabric procurement at 22% discount from Surat supplier",
      savings: "₹5,500/month saved",
      icon: PackageCheck,
    },
    {
      type: "Shared Sewing Machine Maintenance Contract",
      partner: "Haveli Tailoring Cluster (4 units)",
      impact: "Annual AMC at ₹8,000 vs ₹15,000 individual — 47% cost cut",
      savings: "₹7,000/year saved",
      icon: Wrench,
    },
    {
      type: "Joint Delivery Route to Wholesale Hub",
      partner: "Vikram Patil (Agro-Processing)",
      impact: "Shared vehicle to Pune wholesale market — 35% fuel split",
      savings: "₹2,800/month saved",
      icon: Truck,
    },
  ],
  "agro-1": [
    {
      type: "Pooled Procurement Vehicle",
      partner: "Sunita Devi (Dairy Enterprise)",
      impact: "Shared pickup for grain mandi trips — 45% fuel cost reduction",
      savings: "₹3,600/month saved",
      icon: Truck,
    },
    {
      type: "Collective Packaging Line",
      partner: "Nashik Flour Mill Cluster (3 units)",
      impact: "Shared automated packing machine — ₹60,000 CapEx avoided",
      savings: "₹60,000 CapEx saved",
      icon: Factory,
    },
    {
      type: "Joint Waste-to-Fodder Initiative",
      partner: "Sunita Devi (Dairy Enterprise)",
      impact: "Wheat bran byproduct sold as cattle feed at ₹3/kg to dairy cluster",
      savings: "₹2,200/month additional income",
      icon: Wheat,
    },
  ],
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmtINR(n) {
  if (n == null || isNaN(n)) return "₹0";
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

// ─── Sub-Components ──────────────────────────────────────────────────────────

function MoUModal({ enterprise, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide opacity-80">
              Tri-Party Micro-Supply Agreement
            </p>
            <h3 className="text-xl font-bold mt-1">Local B2B MoU</h3>
            <p className="text-sm opacity-80 mt-0.5">{enterprise.name} · MoSJE Concessional Cluster</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close MoU"
            className="rounded-full p-1 hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4">
            <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide mb-2">
              Agreement Reference
            </p>
            <p className="text-sm text-emerald-800">
              MoU/{enterprise.block}/{enterprise.sector.toUpperCase()}/2026/
              {String(Math.floor(Date.now() / 1000) % 10000).padStart(4, "0")}
            </p>
          </div>

          <div className="space-y-3">
            <MoUField label="Party A (Enterprise)" value={`${enterprise.owner} — ${enterprise.name}`} />
            <MoUField label="Party B (Input Supplier)" value={BACKWARD_LINKAGES[enterprise.id]?.[0]?.name || "Local Supplier"} />
            <MoUField label="Party C (Off-Taker/Buyer)" value={FORWARD_LINKAGES[enterprise.id]?.[0]?.name || "Local Buyer"} />
            <MoUField label="Scope" value={`Hyper-local supply of raw materials and guaranteed off-take within ${enterprise.block} Block, ${enterprise.district} District`} />
            <MoUField label="Duration" value="12 months (renewable under SCA cluster scheme)" />
            <MoUField label="Payment Terms" value="Net 7 days from delivery, via UPI / Bank Transfer" />
            <MoUField label="Dispute Resolution" value="Gram Panchayat mediation → Block Development Officer (BDO)" />
          </div>

          <div className="rounded-xl bg-indigo-50 border border-indigo-200 p-4">
            <p className="text-xs font-bold text-indigo-700 uppercase tracking-wide mb-2">
              MoSJE Concessional Credit Clause
            </p>
            <p className="text-xs text-indigo-800 leading-relaxed">
              This tri-party agreement is registered under the MoSJE 10:90 Margin Capital
              Framework. Signatories acknowledge the concessional credit terms under
              {enterprise.sector === "dairy"
                ? " NSFDC Micro-Finance Scheme"
                : enterprise.sector === "tailoring"
                ? " NBCFDC Skill-Linked Finance"
                : " NSFDC Term Loan Scheme"}{" "}
              and agree to maintain uninterrupted supply chain continuity for the duration
              of the loan tenure.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-slate-300 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Close
          </button>
          <button
            onClick={() => {
              alert("MoU PDF downloaded (simulated)!");
              onClose();
            }}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 py-2.5 text-sm font-semibold text-white transition"
          >
            <Download className="h-4 w-4" /> Download MoU PDF
          </button>
        </div>
      </div>
    </div>
  );
}

function MoUField({ label, value }) {
  return (
    <div className="flex flex-col">
      <p className="text-[11px] text-slate-400 uppercase font-semibold">{label}</p>
      <p className="text-sm text-slate-800 mt-0.5">{value}</p>
    </div>
  );
}

// ─── Main PartnershipTab ─────────────────────────────────────────────────────

export default function PartnershipTab({ lastReport, user }) {
  const [selectedEnterprise, setSelectedEnterprise] = useState(ENTERPRISES[0].id);
  const [mouOpen, setMoUOpen] = useState(false);

  const enterprise = useMemo(
    () => ENTERPRISES.find((e) => e.id === selectedEnterprise),
    [selectedEnterprise]
  );

  const backwardData = BACKWARD_LINKAGES[enterprise.id] || [];
  const forwardData = FORWARD_LINKAGES[enterprise.id] || [];
  const synergiesData = HORIZONTAL_SYNERGIES[enterprise.id] || [];

  // Risk metrics
  const isolatedRisk = 85;
  const clusterRisk = 22;
  const riskReduction = isolatedRisk - clusterRisk;

  const SectorIcon = SECTOR_ICON_MAP[enterprise.sector] || Factory;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
            <Handshake className="h-6 w-6 text-emerald-400" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-slate-300">Feature 4 — Community Business Builder</p>
            <h1 className="text-xl font-extrabold mt-1">
              B2B Matchmaker & Hyper-Local Circular Ecosystem
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Eliminates isolated micro-enterprise failure and single-buyer monopoly risks
              through hyper-local circular value chains — connecting input suppliers, off-takers,
              and shared-asset clusters within a 5–10 km radius.
            </p>
          </div>
        </div>
      </div>

      {/* Enterprise Selector */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
          <div className="flex-1 w-full sm:w-auto">
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Select Enterprise Profile
            </label>
            <div className="relative">
              <select
                value={selectedEnterprise}
                onChange={(e) => setSelectedEnterprise(e.target.value)}
                className="w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-3 pr-9 text-sm font-semibold focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none"
              >
                {ENTERPRISES.map((ent) => (
                  <option key={ent.id} value={ent.id}>
                    {ent.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-200 px-4 py-2.5">
            <div className="h-10 w-10 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center">
              <SectorIcon className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">{enterprise.sectorLabel}</p>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {enterprise.block} Block, {enterprise.district} District
              </p>
            </div>
          </div>
          <div className="text-xs text-slate-400">
            <p className="font-semibold text-slate-600">{enterprise.owner}</p>
            <p className="flex items-center gap-1 mt-0.5">
              <Phone className="h-3 w-3" /> {enterprise.phone}
            </p>
          </div>
        </div>
      </div>

      {/* Risk Reduction Metric Card */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 mb-6">
        <div className="flex items-start gap-3 mb-5">
          <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0">
            <ShieldCheck className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">
              Value-Chain Diversification Index
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Quantified risk reduction from isolated single-buyer dependency to cluster-linked
              diversified off-taker network
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Isolated Risk */}
          <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-red-100 border border-red-200 text-red-700 text-[10px] font-bold px-2.5 py-1 mb-2">
              <AlertTriangle className="h-3 w-3" /> Without Cluster
            </div>
            <p className="text-3xl font-extrabold text-red-700">{isolatedRisk}%</p>
            <p className="text-xs text-red-600 mt-1 font-semibold">High Vulnerability</p>
            <p className="text-[11px] text-red-500 mt-0.5">
              Single buyer · No backup supply · No pooled logistics
            </p>
          </div>

          {/* Arrow & reduction */}
          <div className="flex flex-col items-center justify-center py-2">
            <div className="h-12 w-12 rounded-full bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center mb-2">
              <TrendingDown className="h-6 w-6 text-emerald-600" />
            </div>
            <p className="text-lg font-extrabold text-emerald-700">
              −{riskReduction}%
            </p>
            <p className="text-xs text-emerald-600 font-semibold">Risk Reduction</p>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden mt-2">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-emerald-500 rounded-full transition-all duration-700"
                style={{ width: `${100 - (riskReduction / isolatedRisk) * 100}%` }}
              />
            </div>
          </div>

          {/* Cluster Risk */}
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 text-[10px] font-bold px-2.5 py-1 mb-2">
              <CheckCircle2 className="h-3 w-3" /> With Cluster
            </div>
            <p className="text-3xl font-extrabold text-emerald-700">{clusterRisk}%</p>
            <p className="text-xs text-emerald-600 mt-1 font-semibold">Protected — Low Risk</p>
            <p className="text-[11px] text-emerald-500 mt-0.5">
              Diversified off-takers · Pooled logistics · Shared cold-chain
            </p>
          </div>
        </div>

        {/* MoU Button */}
        <div className="mt-5 flex justify-center">
          <button
            onClick={() => setMoUOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 text-sm font-semibold transition shadow-md"
          >
            <FileText className="h-4 w-4" /> Generate Local B2B MoU
          </button>
        </div>
      </div>

      {/* 3-Pillar Ecosystem Grid */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
          Hyper-Local Ecosystem
        </p>
        <h2 className="text-xl font-bold text-slate-900 mt-1">
          Verified Partners within 5–10 km Radius
        </h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Pillar 1: Backward Linkages */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 bg-emerald-50 border-b border-emerald-200 flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-emerald-600 flex items-center justify-center">
              <Truck className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-emerald-800">Backward Linkages</p>
              <p className="text-[11px] text-emerald-600">Input Suppliers within 5–10 km</p>
            </div>
          </div>
          <div className="p-4 space-y-3">
            {backwardData.map((partner, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-200 p-3.5 hover:border-emerald-300 transition"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-bold text-slate-900 leading-snug">{partner.name}</p>
                  {partner.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 text-[9px] font-bold px-2 py-0.5 shrink-0 ml-2">
                      <BadgeCheck className="h-3 w-3" /> SCA Verified
                    </span>
                  )}
                </div>
                <span className="inline-block rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-0.5 mb-2">
                  {partner.category}
                </span>
                <div className="space-y-1 text-xs text-slate-500">
                  <p className="flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 text-slate-400" /> {partner.distance}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Phone className="h-3 w-3 text-slate-400" /> {partner.phone}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <PackageCheck className="h-3 w-3 text-slate-400" /> {partner.capacity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pillar 2: Forward Linkages */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 bg-indigo-50 border-b border-indigo-200 flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-indigo-600 flex items-center justify-center">
              <ShoppingCart className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-indigo-800">Forward Linkages</p>
              <p className="text-[11px] text-indigo-600">Off-Takers & Market Channels</p>
            </div>
          </div>
          <div className="p-4 space-y-3">
            {forwardData.map((buyer, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-200 p-3.5 hover:border-indigo-300 transition"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-bold text-slate-900 leading-snug">{buyer.name}</p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200 text-[9px] font-bold px-2 py-0.5 shrink-0 ml-2">
                    <BadgeCheck className="h-3 w-3" /> Verified Demand
                  </span>
                </div>
                <span className="inline-block rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-0.5 mb-2">
                  {buyer.category}
                </span>
                <div className="space-y-1 text-xs text-slate-500">
                  <p className="flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 text-slate-400" /> {buyer.distance}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <PackageCheck className="h-3 w-3 text-slate-400" /> {buyer.demand}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Phone className="h-3 w-3 text-slate-400" /> {buyer.phone}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pillar 3: Horizontal Synergies */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 bg-amber-50 border-b border-amber-200 flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-amber-600 flex items-center justify-center">
              <Users className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-amber-800">Horizontal Synergies</p>
              <p className="text-[11px] text-amber-600">Shared Assets & Logistics Pooling</p>
            </div>
          </div>
          <div className="p-4 space-y-3">
            {synergiesData.map((synergy, i) => {
              const SIcon = synergy.icon || Users;
              return (
                <div
                  key={i}
                  className="rounded-xl border border-slate-200 p-3.5 hover:border-amber-300 transition"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className="h-9 w-9 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0">
                      <SIcon className="h-4 w-4 text-amber-700" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-900 leading-snug">
                        {synergy.type}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        with {synergy.partner}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{synergy.impact}</p>
                  <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2.5 py-0.5">
                    <TrendingUp className="h-3 w-3" /> {synergy.savings}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Ecosystem Summary Footer */}
      <div className="mt-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-indigo-50 border border-emerald-200 shadow-sm p-5">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0">
            <Sparkles className="h-5 w-5 text-emerald-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-slate-900">
              Circular Ecosystem Impact Summary
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Connecting {backwardData.length} input suppliers, {forwardData.length} verified off-takers,
              and {synergiesData.length} shared-asset synergies within a hyper-local radius — all
              verified under the MoSJE SCA cluster framework.
            </p>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-lg bg-white border border-slate-200 p-2.5 text-center">
                <p className="text-lg font-extrabold text-emerald-700">{backwardData.length}</p>
                <p className="text-[10px] text-slate-400 uppercase">Input Suppliers</p>
              </div>
              <div className="rounded-lg bg-white border border-slate-200 p-2.5 text-center">
                <p className="text-lg font-extrabold text-indigo-700">{forwardData.length}</p>
                <p className="text-[10px] text-slate-400 uppercase">Verified Off-Takers</p>
              </div>
              <div className="rounded-lg bg-white border border-slate-200 p-2.5 text-center">
                <p className="text-lg font-extrabold text-amber-700">{synergiesData.length}</p>
                <p className="text-[10px] text-slate-400 uppercase">Shared Synergies</p>
              </div>
              <div className="rounded-lg bg-white border border-slate-200 p-2.5 text-center">
                <p className="text-lg font-extrabold text-red-600">−{riskReduction}%</p>
                <p className="text-[10px] text-slate-400 uppercase">Risk Reduction</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MoU Modal */}
      {mouOpen && <MoUModal enterprise={enterprise} onClose={() => setMoUOpen(false)} />}
    </div>
  );
}
