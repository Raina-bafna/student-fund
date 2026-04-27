# Execution Roadmap — Student VC Fund Simulation Platform

**Date:** 2026-04-27
**Companion to:** [Business_plan.md](Business_plan.md)
**Purpose:** Phased order of execution and priority. Used downstream for PRD construction and feature consolidation.

---

## Operating Principles (govern every phase)

1. **Sell clubs, not students.** Unit of adoption = a finance club running a semester-long fund. Every phase decision must protect that unit.
2. **Earn the next phase.** No phase begins until the prior phase's decision gate passes. No "build it and hope."
3. **Moat over features.** Optimize for things StockGro / TheGame.vc cannot replicate in a sprint: real-founder pipeline, club exclusivity, recruiter relationships, India instrument depth.
4. **Web-first, semester-shaped.** No mobile, no real money, no founder-side product until Phase 5.
5. **One PMF metric per phase.** If it isn't measurable, it doesn't gate the next phase.

---

## Phase Map at a Glance

| Phase | Window | Theme | Decision Gate |
|---|---|---|---|
| **P0** | Weeks 0–2 | Foundation plumbing | Internal demo runs end-to-end |
| **P1** | Weeks 3–8 | Core simulation loop (MVP) | Alpha club runs 1 full week without us in the loop |
| **P2** | Weeks 9–16 | Closed pilot — 5 clubs | ≥3/5 renew unprompted; ≥60% WAU weeks 4–8 |
| **P3** | Weeks 17–26 | Inter-campus league + India depth | ≥30 teams sign up organically; <30% mid-league drop-off |
| **P4** | Months 7–12 | Recruiter loop + monetization | ≥1 paid VC partnership; ≥1 paid club tier |
| **P5** | Year 2+ | Scale & adjacencies | Phase 4 revenue trend → expansion thesis |

---

# PHASE 0 — Foundation Plumbing (Weeks 0–2)

### What
- Auth + identity (student email verification, club admin role, team membership).
- Multi-tenant data model: `Org (Club) → Fund (instance) → Team → Member` plus `Deal → Memo → Vote → PortfolioPosition → ValuationEvent`.
- Club admin console: create a fund, set semester window, invite teams, configure starting AUM.
- Synthetic deal seed: 50 hand-curated Indian startup profiles (problem, traction, financials, ask, round). Used as the deal universe for Phase 1.
- Observability from day one: per-action event log, funnel instrumentation, weekly active fund tracking.

### Why
- Every Phase 1 feature sits on this data model. Skipping rigor here causes a rewrite at Phase 3.
- Synthetic deal seed avoids the cold-start supply problem (real-founder pipeline is Phase 3 — not now).
- Instrumentation from day zero is the only way Phase 2's PMF gate is measurable.

### How
- Stack: Next.js (App Router) + Postgres + Drizzle/Prisma + Clerk or Auth.js + Vercel.
- Deal seed: pull from public Indian startup data (Tracxn/Crunchbase pulls + manual cleanup) — NOT real founder applications yet.
- Define event taxonomy *before* writing instrumentation: `deal.viewed`, `memo.drafted`, `memo.submitted`, `vote.cast`, `valuation.applied`.

### Done = decision gate
- Internal team can: create a fund → invite a fake team → assign a deal → draft a memo → vote → see portfolio position appear with valuation. End-to-end. No bugs.
- If gate fails → fix before P1. Do not parallelize.

---

# PHASE 1 — Core Simulation Loop / MVP (Weeks 3–8)

### What — the 5 RICE "MUST/HIGH" features

| # | Feature | RICE | Notes |
|---|---|---|---|
| 1 | Multi-fund leaderboard (cross-team, cross-campus) | 3,375 | Realtime IRR/MOIC ranking; visible by default |
| 2 | AI-drafted investment memo per deal | 2,000 | LLM produces v0 memo; team edits and submits |
| 3 | Semester-long portfolio with mark-to-market jumps (IRR/MOIC/TVPI) | 1,417 | Weekly valuation cron; randomized within bounded scenarios |
| 5 | Team workspace (GP/Principal/Analyst roles, DD assignments) | 1,500 | Role-gated permissions; assignment queue |
| 6 | Memo defense / AI Socratic grading (rebuttals & scoring) | 743 | LLM challenges memos; teams must defend; score feeds leaderboard |

### Why
- These five together are the smallest scope where a club says *"yes, we'll run our semester on this instead of Notion+Sheets+Discord."*
- Removing any one breaks the loop:
  - No leaderboard → no competitive pull, no virality.
  - No memos → no academic credibility, no recruiter signal.
  - No MTM → no fund metrics → no claim to teach VC math.
  - No team roles → it's a solo game, like TheGame.vc.
  - No memo defense → AI memos become low-effort slop and top-tier students churn.
- All five fit in 6 weeks because the synthetic deal universe (P0) lets us skip supply-side complexity.

### How
- **Memo gen:** Claude API w/ prompt caching on the deal context; structured output (problem, market, team, traction, risks, recommendation, valuation).
- **Memo defense:** second LLM call plays Socratic GP; produces 5 ranked challenges; team rebuttal scored against rubric.
- **Valuation engine:** deterministic-with-noise. Each portfolio company has a hidden trajectory (up-round / flat / down / write-off) revealed weekly. Bounded so leaderboard reflects judgment, not luck.
- **Leaderboard:** materialized view, recomputed on every valuation event; public by default within a fund and across funds in the same league.
- **No real founders yet.** No recruiter pages yet. No cap-table math yet (use simple post-money $ valuation).

### Done = decision gate
- One alpha club (friendly, e.g. one personal-network finance club) runs **one full week** of the sim without product-team intervention. They:
  - Form 4+ teams,
  - Each team submits ≥3 memos,
  - Leaderboard updates correctly,
  - End-of-week NPS ≥ 40 from team leads.
- If gate fails → fix the loop, don't add features.

---

# PHASE 2 — Closed Pilot, 5 Clubs (Weeks 9–16)

### What
- Recruit 5 finance clubs for an 8-week pilot fund. Targets:
  1. FinClub IIM-C (gold standard — Joka Advantage Fund DNA already exists)
  2. Finance Club IIT-B
  3. Finance Club IIT-M
  4. ISB Finance Club
  5. BITS Pilani / SRCC / Ashoka (one tier-1 private)
- Each club runs ~3–6 teams, 8 weeks, 8–12 deals each.
- Weekly product-team office hours with every club.
- Per-club Slack/WhatsApp loop for ground-truth feedback.

### Why
- This is **PMF test #1** from the business plan. The signal we need is **renewal + WAU**, not signups.
- 5 is the right number: small enough for hand-holding, large enough to triangulate signal vs. noise.
- These specific clubs were chosen because: (a) brand effect on subsequent recruitment, (b) different formats (MBA vs UG, engineering vs commerce vs liberal arts) to stress-test the product.

### How
- **Onboarding playbook**: 90-min kickoff with each club coordinator → fund config → team formation → first deal assigned in week 1.
- **Weekly metric review**: WAU per club, memos/team, leaderboard volatility, support tickets. Top 3 friction points fixed every Friday.
- **No new features in pilot weeks 1–4** unless a friction point demands it. Stability > novelty.
- **Pilot weeks 5–8** open the inter-club leaderboard to create early competitive cross-pollination — preview of Phase 3.

### Done = decision gate
- ≥3 of 5 clubs commit to next semester unprompted (don't ask — wait for them).
- ≥60% weekly active rate on registered participants in weeks 4–8.
- Qualitative: at least 2 clubs use the phrase "this is replacing what we did in Notion/Sheets."
- If gate fails → diagnose: distribution problem (clubs aren't pushing students), product problem (loop too thin), or fit problem (clubs don't actually want this). Each has a different remedy. **Do not progress to P3 with a stretch interpretation.**

---

# PHASE 3 — Inter-Campus League + India Depth Layer (Weeks 17–26)

### What — three parallel workstreams

**3A. Inter-campus league format (PMF test #2)**
- Public league signup. Any tier-1 campus club can register a fund.
- Season-shaped: 10-week season, demo day finale, prize sponsor.
- Aggregate cross-campus leaderboard (top fund per campus → top campus).

**3B. Real startup application pipeline (the moat layer)**
- Founders submit decks via a public submission portal.
- Curation pipeline: AI screen → human screen → 5–10 deals/week added to league universe.
- Partnership track: Campus Fund / GradCapital deal flow as a funnel hedge.

**3C. India instrument depth**
- SAFE / CCPS / CCD mechanics with INR cap tables.
- Pre-money/post-money math, dilution, anti-dilution, liquidation preference (1x non-participating as default).
- Ladder: simple post-money (P1 carryover) → SAFE → priced round.

### Why
- **3A is PMF test #2.** Cross-campus is the viral layer; one club is a pilot, ten clubs is a market.
- **3B is the moat StockGro cannot copy fast.** Real founder pipeline requires VC-style relationships and curation muscle — not just engineering.
- **3C is depth that justifies the academic claim.** Without Indian instruments we are a US toy in a sari; with them we're the only sim that teaches what an Indian VC analyst actually does.
- Sequenced *after* P2 because none of these work without a validated core loop. Building 3B before P2 wastes founder relationships on an unproven product.

### How
- **3A**: market via the 5 P2 clubs (each invites 2 peer clubs); secure prize sponsor (any of: Blume/3one4 founder fellowship slot, Peak XV scout intro, ₹2–5L cash).
- **3B**: founder portal = simple Typeform-style submission; AI screen = Claude with structured rubric (market, team, traction, deck quality); human screen = 1 part-time analyst hired specifically for this.
- **3C**: build SAFE/CCPS as additive — old funds keep simple post-money; new funds opt into instrument depth. Avoid migration pain.

### Done = decision gate
- ≥30 teams sign up for the league organically (not from P2 cohort).
- <30% mid-league drop-off.
- ≥40 real founder applications in the pipeline.
- ≥1 league completes a Demo Day with external sponsor presence.
- If 3A passes but 3B/3C lag → continue to P4 with 3B/3C as P4 sidecar work. **3A is the gate.**

---

# PHASE 4 — Recruiter Loop + Monetization (Months 7–12)

### What
- **Recruiter-facing profiles**: opt-in student profile pages showing memos, fund performance, team contributions.
- **VC firm scout pipeline**: 1–2 paid sourcing partnerships with Indian VC firms (target: Blume, 3one4, Z47, or Peak XV scout team).
- **Paid club tier**: admin tools, custom branding, sponsor matchmaking, faculty dashboards. ₹X/club/semester.
- **Prize sponsor matchmaking**: B2B layer connecting clubs to corporate/VC sponsors for league prizes.

### Why
- **PMF test #3.** Until a VC firm pays for access to top-leaderboard students, recruiter monetization is theory. Validate before scaling.
- This phase is where the moat compounds: top students → top clubs → recruiters pay → top students want in. The flywheel only starts when one paid partnership exists.
- Earlier monetization risks distorting the product (e.g., over-indexing on memos that recruiters like vs. memos that teach).

### How
- **Sourcing partnerships first, product second.** Land 1 firm pilot manually before building the recruiter portal. The pilot tells you what to build.
- **Privacy-first profile design.** Default opt-in, granular control, student-owned data. Anything else burns trust at the campus level.
- **Pricing test**: clubs pay nothing in P1–P3; introduce paid tier in P4 with grandfathering for the original 5. Price discovery via 5 paid offers.

### Done = decision gate
- ≥1 paid VC sourcing partnership signed (₹ or fee-per-hire).
- ≥5 clubs on paid tier.
- Recruiter NPS ≥ 50 from partner firms.
- Aggregate run-rate revenue trajectory clear enough to underwrite Phase 5 expansion.

---

# PHASE 5 — Scale & Adjacencies (Year 2+)

### What — sequenced sub-phases

**5A. AI deal sourcing co-pilot** (RICE: 400) — surfaces relevant deals to teams based on thesis.
**5B. Faculty / B-school enterprise tier** — sell to MBA programs (IIMs, ISB, MDI) as accredited coursework module.
**5C. International expansion** — US undergrad finance clubs first (largest English-speaking analogue), then UK MBAs, then SEA.
**5D. Founder-side product** — separate SKU; founders practice fundraising against student VC funds.

### Why
- Each is a meaningful market on its own; bundling them dilutes execution.
- 5B is the highest-margin adjacent (B-school budgets are 10–100× a club's), but only credible after 5+ club paid tier proves student-side demand.
- 5C uses the same playbook as India; PLG plus club-led adoption.
- 5D is *opt-in optionality* — only build if club product hits a ceiling.

### How
- One sub-phase at a time. Revisit RICE before each.
- **5A** is internal: existing engineering, no new market.
- **5B** needs 1 dedicated B-school sales hire.
- **5C** needs 1 country-lead hire per geo.
- **5D** needs a fresh PRD; do not bundle into the club product.

### Done
- Open-ended; this is the scale-out phase. Govern with quarterly RICE re-scoring.

---

## Phase ↔ RICE Feature Traceability

| RICE Feature | Phase | Notes |
|---|---|---|
| 1. Multi-fund leaderboard | P1 | Cross-campus aggregation arrives in P3 |
| 2. AI-drafted memo | P1 | Defense layer = same phase |
| 3. MTM portfolio (IRR/MOIC/TVPI) | P1 | Simple post-money in P1; instrument depth in P3 |
| 4. Real startup applications | P3 (3B) | Deferred until core loop validated |
| 5. Team workspace + roles | P1 | |
| 6. Memo defense / AI grading | P1 | |
| 7. Demo Day / mock LP pitch | P3 (3A) | Tied to inter-campus league finale |
| 8. Cap table / SAFE / CCPS | P3 (3C) | Opt-in depth, not default |
| 9. Recruiter profile / badges | P4 | Earned by Phase 3 leaderboard data |
| 10. AI deal sourcing co-pilot | P5 (5A) | |
| 11. Founder-side product | P5 (5D) | Separate SKU |

---

## Cross-Phase Risks & Mitigations

| Risk | Phase first felt | Mitigation |
|---|---|---|
| StockGro adds VC mode | P3+ | Lock 5–10 club exclusives in P2; founder pipeline supply moat in P3 |
| TheGame.vc adds multiplayer | P1–P2 | India context + memo defense + recruiter loop are non-trivial to copy |
| Real founder pipeline cold-start | P3 | Campus Fund / GradCapital partnerships as supply hedge |
| AI memo "slop" perception | P1 | Memo defense scoring is the antidote; ship it day 1 of P1 |
| Club retention crash post-exams | P2 | Semester windows align with academic calendar; no sim weeks during placement/exams |
| Recruiter monetization stall | P4 | Validate one paid partnership manually before building the portal |
| Faculty gatekeeping at IIMs/ISB | P5 (5B) | P1–P4 stay club-led (no faculty needed); faculty enters as enterprise upsell |

---

## What This Roadmap Deliberately Does Not Have

- No mobile app before P5.
- No founder-side product before P5.
- No real money / SEBI-regulated paths ever (kept as simulation explicitly).
- No "AI agent investor" gimmick — humans must do the reps; AI is a tool, not a substitute.
- No premature internationalization — India PMF first.
- No multi-asset class (debt, secondaries, public-private crossover) until VC core is locked.

---

## Next Step

Build the **PRD for Phase 1 only**. Phases 2–5 inform direction but are not specified at build-time — they get their own PRDs after each decision gate.
