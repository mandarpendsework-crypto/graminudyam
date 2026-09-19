import VoiceAssistant from './components/VoiceAssistant';
import React, { useState } from "react";
import { Landmark, Globe, User, ChevronDown, Home, FileBarChart2, Wallet, Handshake, Menu, X } from "lucide-react";
import { LANGUAGES } from "./data/mockData";
import LoginModal from "./components/LoginModal";
import HomeTab from "./components/HomeTab";
import ReportTab from "./components/ReportTab";
import BusinessFinderBot from "./components/BusinessFinderBot";
import FinanceTab from "./components/FinanceTab";
import PartnershipTab from "./components/PartnershipTab";

const TABS = [
  { id: "home", label: "Home", icon: Home },
  { id: "report", label: "Report", sub: "AI Feasibility", icon: FileBarChart2 },
  { id: "finance", label: "Finance", sub: "Smart Structuring", icon: Wallet },
  { id: "partnership", label: "Partnership", sub: "B2B Ecosystem", icon: Handshake },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState(LANGUAGES[0]);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [botPrefill, setBotPrefill] = useState(null);
  const [lastReport, setLastReport] = useState(null);

  const goTo = (tabId) => {
    setActiveTab(tabId);
    setMobileNavOpen(false);
  };

  const handleVoiceAutoFill = ({ capital, sector }) => {
    if (sector || capital) {
      goTo("report");
      setBotPrefill((prev) => ({
        ...prev,
        ...(capital && { capital }),
        ...(sector && { sector }),
      }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 relative">
      {/* ============================ HEADER ============================ */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
        {/* Top identity strip */}
        <div className="bg-slate-900 text-slate-300 text-[11px]">
          <div className="max-w-6xl mx-auto px-6 py-1.5 flex items-center justify-between">
            <span>Ministry of Social Justice & Empowerment · Government of India</span>
            <span className="hidden sm:inline">National Concessional Credit Portal</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <button onClick={() => goTo("home")} className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-700 flex items-center justify-center shrink-0">
                <Landmark className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <p className="font-extrabold text-slate-900 leading-tight">FinQuest</p>
                <p className="text-[10px] text-slate-400 leading-tight">MoSJE Emblem · Concessional Credit Portal</p>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {TABS.map((t) => {
                const Icon = t.icon;
                const active = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => goTo(t.id)}
                    className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
                      active ? "bg-emerald-50 text-emerald-700" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {t.label}
                  </button>
                );
              })}
            </nav>

            {/* Utility actions */}
            <div className="flex items-center gap-2">
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setLangOpen((o) => !o)}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  <Globe className="h-3.5 w-3.5" /> {lang.label} <ChevronDown className="h-3 w-3" />
                </button>
                {langOpen && (
                  <div className="absolute right-0 mt-1 w-36 rounded-lg border border-slate-200 bg-white shadow-lg overflow-hidden z-20">
                    {LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLang(l);
                          setLangOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs font-medium hover:bg-slate-50 ${
                          l.code === lang.code ? "text-emerald-700 bg-emerald-50" : "text-slate-600"
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {user ? (
                <div className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2 text-xs font-semibold text-emerald-700">
                  <User className="h-3.5 w-3.5" />
                  {user.role === "officer" ? "Officer" : "Beneficiary"} · {user.phone.slice(0, 4)}••••
                </div>
              ) : (
                <button
                  onClick={() => setLoginOpen(true)}
                  className="flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 text-xs font-semibold transition"
                >
                  <User className="h-3.5 w-3.5" /> Officer/Beneficiary Login
                </button>
              )}

              <button className="lg:hidden p-2 text-slate-500" onClick={() => setMobileNavOpen((o) => !o)}>
                {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileNavOpen && (
          <div className="lg:hidden border-t border-slate-100 px-4 py-3 space-y-1">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => goTo(t.id)}
                  className={`w-full flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold ${
                    active ? "bg-emerald-50 text-emerald-700" : "text-slate-600"
                  }`}
                >
                  <Icon className="h-4 w-4" /> {t.label}
                  {t.sub && <span className="text-[10px] text-slate-400 font-normal ml-auto">{t.sub}</span>}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* ============================ TAB CONTENT ============================ */}
      <main>
        {activeTab === "home" && <HomeTab onLaunchAdvisory={() => goTo("report")} onLoginOpen={() => setLoginOpen(true)} />}

        {activeTab === "report" && (
          <ReportTab
            prefill={botPrefill}
            onConsumePrefill={() => setBotPrefill(null)}
            onReportGenerated={setLastReport}
            currentLang={lang?.label || "English"}
          />
        )}

        {activeTab === "finance" && <FinanceTab lastReport={lastReport} user={user} />}

        {activeTab === "partnership" && <PartnershipTab lastReport={lastReport} user={user} />}
      </main>

      {/* ============================ FLOATING BOT ============================ */}
      <BusinessFinderBot
        onApplyToFeasibility={(payload) => {
          setBotPrefill(payload);
          goTo("report");
        }}
      />

      {/* ============================ VERNACULAR VOICE ASSISTANT ============================ */}
      <VoiceAssistant onAutoFillForm={handleVoiceAutoFill} currentLang={lang?.label || "English"} />

      {/* ============================ LOGIN MODAL ============================ */}
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} onLoginSuccess={setUser} />

      {/* ============================ FOOTER ============================ */}
      <footer className="border-t border-slate-200 bg-white mt-10">
        <div className="max-w-6xl mx-auto px-6 py-6 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} FinQuest · Prototype for MoSJE Hackathon (PS-26091)</p>
          <p>Not a live government service · Demo data only</p>
        </div>
      </footer>
    </div>
  );
}