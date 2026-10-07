# Hyperframes Composition Brief: FinQuest Reverse Business Finder

## Objective
Create a 90-second landscape launch/pitch video for FinQuest, focused on the Reverse Business Finder as the flagship USP.

## Output
- Composition directory: `brag-output-2026-09-22-135531/composition/`
- Rendered video: `brag-output-2026-09-22-135531/brag.mp4`
- Format: landscape — 1920x1080
- Duration: 90 seconds

## Source material
- Project root: `c:/Users/Mandar/Desktop/avalanche/Draft1/graminudyam`
- Primary files: `src/components/BusinessFinderBot.jsx`, `src/data/mockData.js`, `src/components/ReportTab.jsx`, `FinanceTab.jsx`, `VoiceAssistant.jsx`, `PartnershipTab.jsx`, `HomeTab.jsx`
- Product: FinQuest
- Exact source UI: `Business Discovery AI`, `Reverse feasibility engine`, `Find My Top 5 Businesses`, `Apply to Feasibility Study`
- Required product numbers: `₹25,000`, `78%`, `9 km`, `₹16,000`, `10:90`, `28 quarters`

## Creative direction
- Tone preset: cinematic
- Creative direction: High-energy national hackathon pitch
- Angle: FinQuest solves the step before financing: it converts existing rural skills/assets and a small margin-capital amount into a ranked, pre-vetted enterprise shortlist, then carries that decision through local feasibility, credit sizing, risk simulation, and B2B deployment.
- Hook: `WHAT CAN YOU BUILD WITH WHAT YOU ALREADY HAVE?`
- Outro: `FROM UNCERTAINTY TO BANK-READY RURAL ENTERPRISE.`
- Avoid: generic SaaS language, abstract filler, unsupported impact claims, and text that moves faster than it can be read.

## Visual identity
- Background: `#f8fafc` plus source `#0f172a` / emerald-950 hero surfaces
- Accent: `#059669`, indigo-600, amber-400, rose-500
- Text: slate-900 and white on dark scenes
- Font: Inter-like geometric sans, system fallback
- References: source Business Discovery AI panel, match cards, Report dashboard, 10:90 calculator, seasonal stress grid, Voice Assistant, B2B columns

## Storyboard
1. Problem — 0-14s — NSFDC/NBCFDC barrier and unanswered enterprise question.
2. Reverse Business Finder — 14-34s — ₹25,000 plus dairy/processing/artisanal inputs become ranked recommendations and an apply handoff.
3. Catchment Feasibility — 34-50s — Pune/Haveli analytics, 78% gap, 9 km catchment, low density heatmap.
4. Financial Structuring — 50-66s — 10:90 split and 28-quarter seasonal schedule.
5. Inclusivity & Safety — 66-80s — vernacular voice assistant and seasonal stress testing.
6. Closing — 80-90s — B2B value-chain matchmaking and live deployment callout.

## Audio
- Music: `assets/music/happy-beats-business-moves-vol-1-by-ende-dot-app.mp3`
- Voice: Kokoro `af_heart`, generated from `voiceover-script.txt` into `assets/voiceover.wav`
- Music posture: 0.32 bed, ducked under voice, return for the final deployment callout
- Cue guidance: bundled 120.19 BPM cue preset; use readable beat-grid accents for ranked cards and partner waves, with 1-3 major cue locks only
- Audio-reactive treatment: subtle RMS modulation on hero glow, match-score cards, and final lockup; no waveform/equalizer graphics
- SFX: select/click for inputs, card-place for ranked recommendations, soft impact for 28 quarters, final resonant logo hit

## Hyperframes requirements
- Use root `data-composition-id="main"`, `data-width="1920"`, `data-height="1080"`, `data-duration="90"`.
- Register `window.__timelines.main`.
- Keep text readable and use local relative assets.
- Show actual source copy and UI-derived values, especially the Reverse Business Finder.
- Run `npx hyperframes check` from this composition directory before render.
