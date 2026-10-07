# Hyperframes Composition Brief: FinQuest

## Objective
Create a 90-second landscape launch/pitch video for FinQuest, the MoSJE hackathon prototype at PS-26091. This is a high-energy national hackathon pitch, not a generic SaaS promo.

## Output
- Composition directory: `brag-output-2026-09-22-090006/composition/`
- Rendered video: `brag-output-2026-09-22-090006/brag.mp4`
- Format: landscape — 1920x1080
- Duration: 90 seconds

## Source Material
- Project root: `c:/Users/Mandar/Desktop/avalanche/Draft1/graminudyam`
- Primary files read: `index.html`, `README.md`, `src/App.jsx`, `src/components/HomeTab.jsx`, `ReportTab.jsx`, `FinanceTab.jsx`, `VoiceAssistant.jsx`, `PartnershipTab.jsx`, `src/data/mockData.js`
- Product name: FinQuest
- Tagline / strongest claim: `Empowering marginalized rural entrepreneurs with hyper-local business feasibility and automated 10:90 concessional credit structuring.`
- Key UI moments: Pune / Haveli / Wagholi feasibility dashboard; 10:90 scheme calculator and 28-quarter simulator; vernacular voice assistant; seasonal stress engine; circular B2B matchmaker.
- Copy that must appear verbatim:
  - `10% Margin Capital Rule`
  - `5–10 km Hyper-Local Catchment`
  - `Quarterly Moratorium Protection`
  - `AI Safe-Borrowing Benchmark`
  - `B2B Matchmaker & Hyper-Local Circular Ecosystem`

## Creative Direction
- Tone preset: cinematic
- Creative direction: High-energy national hackathon pitch
- Interpretation: Trailer-scale stakes, hard cuts and fast UI proof, with readable holds and narration connecting each module.
- Angle: FinQuest makes the rural credit gap legible and actionable by binding local demand intelligence, concessional-credit structuring, inclusive onboarding, prudential simulation, and circular enterprise linkages into one flow.
- Hook: `A VIABLE RURAL BUSINESS CAN STILL DIE BEFORE ITS FIRST LOAN.`
- Outro: `FROM CREDIT GAP TO BANK-READY RURAL ENTERPRISE.`
- Avoid: generic SaaS language, abstract filler, unsupported impact claims, unrelated redesign, and text faster than narration can carry.

## Visual Identity
- Background: `#f8fafc` plus source hero `#0f172a` / emerald-950
- Text: `#0f172a` and white on dark scenes
- Accent: `#059669` emerald-600, indigo-600, amber-400, rose-500 for alerts
- Display font: geometric sans fallback with bold condensed treatment for caps
- Body font: ui-sans-serif, system-ui, sans-serif
- Visual references: source FinQuest header, dark hero, circular SVG gauges, metric cards, form selectors, quarterly table, risk bars, verified partner columns.

## Storyboard
Use `brag-plan.md` as the creative contract. Scene durations are 8s + 10s + 13s + 13s + 12s + 13s + 13s + 8s = 90 seconds.

1. The gap — 8s — hook and rural credit context.
2. The platform — 10s — identity and source metric cards.
3. Hyper-local feasibility — 13s — Pune/Haveli/Wagholi flow, 78% demand gap, 9 km catchment, and low competitor density.
4. Finance that explains itself — 13s — 10:90, CapEx/OpEx, amortization and 28 quarters.
5. Vernacular onboarding — 12s — voice assistant and simplified profiling.
6. Prudential risk simulator — 13s — seasonal stress, DSCR and safe borrowing.
7. Circular B2B resilience — 13s — verified partners, risk reduction and MoU.
8. National pitch close — 8s — final claim and lockup.

## Audio
- Audio role: dense rhythmic layer under clear hackathon narration
- Audio arc: urgent hook, confident proof, inclusive human moment, controlled risk tension, collective payoff, decisive close
- Music: `assets/music/happy-beats-business-moves-vol-1-by-ende-dot-app.mp3`
- Music treatment: 0.32 bed, duck to 0.14 under `voiceover.wav`, return for final 8 seconds, fade out over the last second
- Music cue guidance: bundled cue JSON is staged beside the music; use strong cues as optional timing hints and beat-grid timing for card/counter arrivals.
- Audio-reactive treatment: subtle RMS modulation of hero glow/card presence; no waveform or equalizer.
- Audio-coupled moments: hook typing, selector clicks, gauge count-up, 10:90 split, mic pulse, deficit alert, partner card waves, final logo.
- SFX selection guidance: interface clicks/selects for real UI actions, soft impacts for numeric reveals, one bell/impact for final lockup.
- Exact SFX choice: choose local CC0 files according to motion; keep narration dominant.
- Audio files: music is staged in `composition/assets/music/`; voiceover is generated as `composition/assets/voiceover.wav`.

## Voice
Voice is explicitly enabled for this run. Generate Kokoro narration with `af_heart` and wire it on its own track. The voiceover script is in `brag-plan.md`. Keep music at 0.14 while voice plays.

## Hyperframes Instructions
Use native Hyperframes timing attributes and a seek-safe, self-contained HTML composition. The visual implementation may recreate the real UI as a polished presentation surface, but must include actual source copy and actual product numbers. Keep all major text readable, show real UI-derived scenes, and use no external runtime dependencies.

Requirements:
- 1920x1080 landscape
- exactly 90 seconds
- show the actual product story and source copy
- include music and generated voiceover
- use local relative asset paths only
- include at least one subtle audio-reactive visual treatment or document extraction unavailability
- include readable sequential reveals and simulated interactions
- run `npx hyperframes check` before render
