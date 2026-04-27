# Student VC Fund Simulation Platform — Market Gap & PMF Analysis

**Date:** 2026-04-27
**Objective:** Find market gap and analyse product-market fitment for the POC.

---

## 0. Concept Recap

A Student VC Fund Simulation Platform where student teams manage a virtual fund end-to-end: AI-assisted due diligence on real startup applications, AI-drafted investment memos per deal, portfolio tracking with simulated valuation changes over time, mark-to-market return calculations (IRR, MOIC, TVPI), and a multi-fund leaderboard that ranks competing student funds across campuses.

**Target users:** Finance/e-cell clubs at IITs, IIMs, BITS, ISB, and tier-1 private universities in India.

**Wedge:** "VCIC × StockGro × Zerodha Varsity, but for VC, semester-long, club-led."

---

## 1. Competitive Landscape

### Direct competitors (VC simulation)

| Platform | Format | Pricing | India fit | Gap vs. our idea |
|---|---|---|---|---|
| **TheGame.vc** | Solo, swipe-style, $30M fund, 10 sim years, 5–10 min round | Free | No — US/global, single-player | No teams, no memos, no leaderboard across campuses, no semester arc |
| **HBS VC/PE Simulation** (Forio) | Faculty-licensed, MBA-grade | Paid per seat, requires instructor | No — locked to B-schools with faculty access | Not self-serve for student clubs |
| **FinSimCo VC Simulation** | Instructor-led classroom sim | Enterprise B-school pricing | No | Short scenario, not multi-semester |
| **SimCap (simcap.vc)** | Interview prep — single decisions | Per-seat | No | No portfolio depth |
| **Responsive.net Venture Game** | 2-year classroom sim | Faculty license | No | Dated, instructor-bound |
| **entrepSim** | Academic, MBA-focused | Faculty license | No | Entrepreneur-side, not VC-side |
| **VC Simulator (vcgame.work)** | Casual web game | Free | No | Not academic-grade |
| **VCIC** (UNC Kenan-Flagler) | One-weekend competition, 120+ teams globally | Per-team entry | Some Indian school participation via global finals | Episodic event, not ongoing |

### Indirect competitors (own the campus channel today)

- **StockGro** — 25M+ users, **750+ campus partnerships including IITs/IIMs/AIIMS**, runs trading leagues with ₹10K–₹1L prize pools. *Public equities only — but they own the distribution moat we'll need to crack.*
- **Zerodha Varsity** — Passive content; public markets.
- **E-Cell competitions** (IIT Bombay TTMM, IIT KGP Empresario, NEC) — One-off pitching, founder-side, not VC-side.
- **Kalaari Fellowship, On Deck VC Fellowship** — Post-grad, not student-time.

### Tangential / not competitors but signal

- **Campus Fund, GradCapital** — Real VC funds for student founders. *Possible partners, not rivals.*
- **AI memo gen tools** (Energent.ai, V7 Go, DiligenceVault, Affinity) — Validate that AI-drafted memos are now table stakes; 85% of pro VCs use AI for daily tasks.

---

## 2. Market Sizing (India)

- **India edtech**: $12.1B (2025) → $50B (2035), CAGR 15.2%.
- **Indian VC ecosystem**: 250+ active micro/early-stage funds in 2026, up from ~100 in 2022. Continuous analyst hiring at Peak XV, Accel, Blume, 3one4, Z47, Kalaari.
- **TAM (institutions)**: 20 IIMs + 23 IITs + BITS (4) + ISB + Ashoka/Plaksha/Krea + tier-1 commerce (SRCC, NMIMS, IIFT, SIBM, MDI) ≈ **150–200 campuses with active finance/e-cells**.
- **TAM (students)**: ~50–100 active students/club × 200 campuses = **10K–20K serious users**; broader funnel of passive learners ~200K–500K.
- **Demand signal**: StockGro's 25M-user pull validates retail-finance gamification appetite among Indian students; the VC-specific subset is unserved.

---

## 3. Market Gap (the headline)

**No platform on earth combines all five of these — and the absence of #5 is the wedge:**

1. Multi-team, multi-campus competitive leaderboard (like StockGro, but VC)
2. Semester-long ongoing portfolio (not a weekend event like VCIC)
3. Memo discipline + AI-assisted DD (rep-building, not swipe-only)
4. India context — INR deals, SAFE/CCPS cap tables, local startup pipeline, Peak XV/Accel framing
5. **Self-serve for student clubs without a faculty advisor** — HBS/FinSimCo sims all require a professor to license and run them; Indian undergrad finance clubs cannot get this

TheGame.vc is our closest analogue but it's solo, US-framed, and casual. StockGro owns the distribution but stays in public equity.

---

## 4. SWOT

### Strengths
- First-mover on student-VC simulation with India localization (cap tables, INR, local deal flow).
- AI memo/DD is now a credible primitive — building this in 2026 is 10× cheaper than it was in 2023.
- High-engagement loop: leaderboards + semester arc + team identity → social/network effects per campus.
- Resume/credentialing angle creates pull from VC firm hiring funnels (recruiter-side monetization).

### Weaknesses
- Cold-start problem on two sides: need real startup applications *and* student funds at once.
- Narrow ICP — only ~200 campuses matter; saturating won't yield consumer-scale numbers.
- Education-as-product: retention drops sharply after exam season / placement season.
- Memo grading is a quality problem; AI feedback must feel rigorous, not generic, or top-tier students churn.

### Opportunities
- StockGro proved campus distribution playbook; partner or copy it (campus ambassadors, club-led leagues).
- Indian VC funds (Peak XV, Blume, 3one4, Kalaari) actively want to see hands-on reps in candidates → recruiter-side revenue.
- B-school adoption (IIMs, ISB, MDI) — sell to faculty after club bottom-up adoption (PLG → enterprise).
- International expansion is straightforward post-PMF (US undergrad finance clubs, UK MBAs, SEA).

### Threats
- StockGro could add a "VC mode" overnight — they have the users, money, and SEBI relationships.
- TheGame.vc could add multiplayer + memos cheaply.
- Real campus VC funds (Campus Fund, GradCapital) could launch their own sim as a top-of-funnel.
- Peak XV / Accel could sponsor an in-house version killing the recruiter monetization angle.
- LLM commoditization → "AI memo writer" is not a moat; the moat must be **community + leaderboard + recruiter pipeline.**

---

## 5. RICE Scoring — Engagement Features for the POC

Reach = students/quarter touched. Impact: 0.25 / 0.5 / 1 / 2 / 3. Confidence: %. Effort: person-weeks. **Score = (R × I × C) / E.**

| # | Feature | R | I | C | E | RICE | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | Multi-fund leaderboard (cross-campus rankings) | 5,000 | 3 | 90% | 4 | **3,375** | **MUST — this is the wedge** |
| 2 | AI-drafted investment memo per deal | 5,000 | 3 | 80% | 6 | **2,000** | **MUST — table stakes in 2026** |
| 3 | Semester-long portfolio with mark-to-market jumps (IRR/MOIC/TVPI) | 5,000 | 2 | 85% | 6 | **1,417** | **MUST — this is the product** |
| 4 | Real startup applications pipeline (founders submit decks) | 3,000 | 3 | 60% | 8 | **675** | **HIGH — unique moat, but supply-side hard** |
| 5 | Team workspace (GP/Principal/Analyst roles, DD assignments) | 5,000 | 2 | 75% | 5 | **1,500** | **HIGH** |
| 6 | Memo defense / AI Socratic grading (rebuttals & scoring) | 4,000 | 2 | 65% | 7 | **743** | **HIGH — differentiator vs. TheGame.vc** |
| 7 | Demo Day / mock LP pitch at semester end | 2,000 | 2 | 70% | 5 | **560** | **MEDIUM — retention spike** |
| 8 | Cap table / SAFE / CCPS mechanics (Indian instruments) | 5,000 | 1 | 80% | 6 | **667** | **MEDIUM — depth, not virality** |
| 9 | Recruiter-facing profile / badge / Peak-XV pipeline | 2,000 | 3 | 50% | 8 | **375** | **DEFER to v2** |
| 10 | AI deal sourcing co-pilot (auto-surfaces relevant startups) | 4,000 | 1 | 60% | 6 | **400** | **DEFER — nice-to-have** |
| 11 | Founder-side product (founders raise mock rounds) | 1,500 | 2 | 40% | 10 | **120** | **DEFER — separate product** |

**POC scope (v1, ranked by RICE):** Features **1, 2, 3, 5, 6** — leaderboard, AI memos, mark-to-market portfolio, team roles, memo defense. That's the minimum viable VC-club-in-a-box.

---

## 6. PMF Recommendation

**The wedge:** "Discord/Notion/Sheets stack that finance clubs cobble together to run mock VC events" → replace with one tool. **Sell clubs, not students.**

### Three concrete PMF tests for the POC

1. **Club pilot test** — Sign 5 finance clubs (e.g., FinClub IIM-C, Finance Club IITB, IIT-M, ISB FinClub, BITS Pilani) for one **8-week pilot fund**. PMF threshold: ≥3 clubs renew for next semester unprompted, ≥60% weekly active in weeks 4–8.
2. **Cross-campus league** — Run an inter-campus VC league with cash/recruiter prize. PMF threshold: ≥30 teams sign up organically after 2 club wins; <30% drop-off mid-league.
3. **Recruiter pull** — Get 1 Indian VC firm (Blume / 3one4 / Peak XV scout team) to *ask* for top-leaderboard student profiles. PMF threshold: ≥1 paid hiring/sourcing partnership inside 6 months.

### What NOT to build for POC
Founder-side product, recruiter portal v1, real-money paths, mobile app. **Web-first, club-admin-led, semester-shaped.**

### Biggest single risk
StockGro pivoting to add VC mode.

**Mitigation:**
- (a) Move fast on real-startup pipeline supply (the part they can't copy without VC relationships).
- (b) Lock in 5–10 club exclusives before they react.

---

## 7. Sources

### VC simulators & competitors
- [TheGame.vc — VC fund simulator](https://thegame.vc/)
- [TheGame.vc About / Glossary](https://thegame.vc/about)
- [VCIC — Venture Capital Investment Competition](https://www.vcic.org/)
- [HBS Venture Capital and Private Equity Game](https://www.hbs.edu/faculty/Pages/item.aspx?num=49166)
- [HBS — VC Game multiplayer simulation](https://www.hbs.edu/faculty/Pages/item.aspx?num=23432)
- [Forio / HBS Simulations](https://forio.com/partner/hbplanding)
- [FinSimCo Venture Capital Simulation](https://finsimco.com/product/venture-capital-simulation)
- [SimCap](https://simcap.vc/)
- [Responsive.net Startup & VC Simulation](https://responsive.net/venture.html)
- [entrepSim](https://entrepsim.com/)
- [VC Simulator (vcgame.work)](https://vcgame.work/)

### India market & ecosystem
- [India EdTech Market — MarketResearchFuture](https://www.marketresearchfuture.com/reports/india-edtech-market-46222)
- [India EdTech Market — IMARC](https://www.imarcgroup.com/india-edtech-market)
- [Blume — India's Micro VC Landscape 2026](https://blume.vc/commentaries/indias-micro-vc-landscape-whos-writing-the-first-cheque-in-2026)
- [Top 30 VC Firms in India 2026 — GrowthJockey](https://www.growthjockey.com/blogs/top-vc-funds-of-india)
- [Blume Ventures — Hiring Investment Analysts](https://blume.vc/commentaries/talent-acquisition-in-venture-capital-insights-from-blumes-hiring-process)
- [Kalaari Fellowship](https://kalaari.com/fellowship/)
- [Top India VC Fellowship & Scout Programs — Superscout](https://superscout.co/list/top-india-vc-fellowship-scout-programs)
- [Campus Fund](https://yourcampusfund.com/)

### Indian student/campus channel
- [StockGro](https://www.stockgro.club/)
- [StockGro Partnership program](https://www.stockgro.club/partnership/)
- [Finance & Investments Club — IIM Calcutta](https://www.finclubiimc.org/)
- [Finance Club — IIT Bombay](https://financeclubiitb.in/)
- [Finance Club — IIT Madras (LinkedIn)](https://in.linkedin.com/company/finance-club-iit-madras)
- [ISB Finance Club](https://www.isb.edu/programmes/post-graduate-programmes/pgp-in-management/student-clubs/finance-club)
- [E-Cell IIT Kharagpur — Empresario](https://www.ecell-iitkgp.org/empresario/)

### VC metrics & AI tooling
- [VC Performance Metrics — Francesca Tabor](https://www.francescatabor.com/articles/2025/1/19/understanding-key-venture-capital-metrics-markup-rate-moic-and-gross-irr-1)
- [Carta — VC/PE Fund Performance Metrics](https://carta.com/learn/private-funds/management/fund-performance/)
- [Affinity — 10 AI Tools for VC Firms 2026](https://www.affinity.co/guides/vc-ai-tools)
- [Energent.ai — Best AI Investment Memo Generator 2026](https://www.energent.ai/use-cases/en/compare/the-best-ai-investment-memo-generator)
- [Third Bridge — PE Due Diligence with AI 2026](https://www.thirdbridge.com/en-us/about-us/media/perspectives/ai-due-diligence-private-equity)
