# GraminUdyam AI — Part 1 (MoSJE Hackathon PS-26091)

AI-Driven Hyper-Local Business Advisory and Financial Structuring Assistant for Rural Micro-Entrepreneurs.

## What's in Part 1

- Global header/nav with brand identity, 4-tab navigation, language selector, and auth button.
- Login/Sign-up modal with Beneficiary/Officer role toggle, mobile+OTP simulator, and SCA dropdown.
- **Home Tab**: hero, key metric indicators, interactive Government Schemes Directory (NSFDC, NBCFDC, NSKFDC) with detail modals.
- **Report Tab (Module 1)**: cascading location selector (State → District → Block → Gram Panchayat), sector + capital inputs, and a dynamic 6-pillar feasibility dashboard (Market Reach, Opportunity & Gaps, Budget-Tailored SWOT, Threats & Bottlenecks, Competitor Density, Pricing Strategy) with SVG gauges and a print-to-PDF export.
- **Feature 1**: floating "Reverse Business Discovery" bot — enter capital + skills/assets, get a ranked top-5 match list, and one-click apply the pick into Module 1.
- Plug-in placeholders for `<FinanceTab />` and `<PartnershipTab />`, wired into `App.jsx` with their Part 2 prop contracts documented inline.

## Project structure

```
graminudyam/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── index.css
    ├── App.jsx                     # tab state, header/nav, modal + bot wiring
    ├── data/
    │   └── mockData.js              # locations, sectors, schemes, calculation engines
    └── components/
        ├── LoginModal.jsx
        ├── HomeTab.jsx
        ├── ReportTab.jsx
        ├── BusinessFinderBot.jsx
        ├── FinanceTab.jsx           # Part 2 stub
        └── PartnershipTab.jsx       # Part 2 stub
```

## Run locally

```bash
npm install
npm run dev
```

## Part 2 integration contract

`App.jsx` already tracks `lastReport` (the most recent Module 1 output) and `user` (the authenticated session) and passes both into `FinanceTab` and `PartnershipTab`. Part 2 can replace the two stub files with full implementations without touching `App.jsx`, `ReportTab.jsx`, or `mockData.js`.
