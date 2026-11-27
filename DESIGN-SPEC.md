# DESIGN SPEC — black-friday-deal-finder-01

Contest: "Build the best real Black Friday deal finder" — $250 shared by top 20,
deadline 2026-11-29 07:42 WIB. Judge: pairwise AI judge on screenshots + source
outline (dossier-view, 1536 tokens). Criteria in order: (1) working deal finder
visible in screenshots, (2) real checked deals + honest "is it really a deal"
signal, (3) usefulness (best first, sort, cross-store compare, link/code),
(4) ease of use + look + phone layout, (5) small first load + clean file split.

## What wins pairwise
- Cover screenshot must show, at a glance: MANY real deals with product, store,
  sale price, was price, % off, $ saved, verdict badge, check time, store link —
  plus search + filters visibly present and working.
- Verdict signal must be honest and varied: NEW LOW / STRONG DEAL / ROUTINE SALE.
  Routine examples (Switch 2 bundle −9%, MacBook Air −19%, iPad −16%) prove the
  signal is real, not a rubber stamp.
- Cross-store comparison: AirPods Pro 3 listed at BOTH Amazon and Target at the
  same $149.99; detail page shows "Also at" the other store.
- No text addressed to the judge anywhere. No copied brand/text/images.

## Data — 33 deals, checked TODAY 27 Nov 2026 (~07:30 UTC / 14:30 WIB)
Sources read today: TradingView/Benzinga "Black Friday 2026 Tech Deals"
(published 2026-11-27 05:34 UTC), DansDeals Walmart Black Friday (27 Nov),
nerdsnack gaming deals (checked 26 Nov, read 27 Nov), flashdealfeed Target
(prices checked 25 Nov, re-read 27 Nov), wishdeck deal pages (checked 26 Nov),
iddeya price roundup (25 Nov, re-read 27 Nov), thatshoppingchick (26 Nov),
uscreditcards101 (27 Nov). Every deal cites its source by name on the site;
checked timestamp is uniform 2026-11-27T07:30:00Z (when this agent verified).
Store links are store search URLs (amazon.com/s?k=, walmart.com/search?q=,
bestbuy.com/site/searchpage.jsp?st=, target.com/s?searchTerm=,
newegg.com/p/pl?d=, disneyplus.com) — no guessed product URLs.
Amazon direct fetch is 403-blocked; deals sources naming the store are
explicitly allowed by the rules ("reading the price at the store or in a deals
source that names the store").

Categories (11): Audio, TVs, Computing, Smart home, Kitchen, Gaming, Toys,
Beauty, Reading & tablets, Wearables, Streaming. Stores (6): Amazon, Walmart,
Best Buy, Target, Newegg, Disney+.

Verdict rules: NEW LOW = ≥50% off, or lowest price reported this year
(AirPods Pro 3 $149 is $71 under last year's $219.99 deal; Airwrap $499 matches
last year's low). STRONG DEAL = 25–49% off with a real dollar saving.
ROUTINE SALE = <25% off (Switch 2 −9%, MacBook Air −19%, iPad −16%,
Watch SE 3 −20%, Quest dropped). Verdict note on each deal states the evidence.

## Site structure (app/, static, no network loads, no build step)
- index.html — shell: header, hero + stats strip, controls, <main id="app">,
  footer with method note. Loads style.css + main.js (module).
- style.css — original design: deep navy (#0e1420) + amber (#f5a623) + white
  cards; big sale prices; verdict badge colors (green NEW LOW, blue STRONG,
  grey ROUTINE); responsive grid → 1 column on phone; sticky filter bar.
- data.js — `export const deals = [...]` (33 deals) + `export const CHECKED_AT`.
  Fields: id, title, store, category, price, was, url, checked, source, verdict,
  note, group (cross-store compare key, only for AirPods Pro 3 pair).
- format.js — usd(), pctOff(), saved(), checkedLabel() — one job: formatting.
- filters.js — applyFilters(deals, {q, category, store, minOff, sort}) — one job.
- views.js — listView(), dealView(), dealCard(), verdictBadge() — one job: HTML.
- main.js — hash router (#/ list, #/deal/<id>), wires controls, renders,
  sets window.__shotReady for screenshots. One job: orchestration.

Routes: #/ (list, default sort = biggest % off), #/deal/<id> (detail: big
prices, verdict + evidence, source + checked time, "Also at" cross-store,
"View at <store>" button).

Controls (all working, client-side): search box (title/store/category),
category chips (All + 10), store select, min-discount select (Any/25+/40+/50+),
sort select (Biggest % off / Biggest $ saving / Lowest price / Highest price).
Result count line ("Showing X of 33 deals") updates live. Empty state message
when no match.

Hero stats (computed in JS, shown in hero): 33 deals · 10 categories · 8 stores ·
up to 67% off · $X total savings (computed from data).

## Screenshots (screenshots/, 4 JPEGs, each ≤256 KiB, long side ≤1280)
1. 1-deals.jpg — desktop 1280×800, #/ home: hero + stats + controls + deal grid.
2. 2-deal.jpg — desktop 1280×800, #/deal/airpods-pro-3-amazon detail page.
3. 3-filters.jpg — desktop 1280×800, #/ with "50%+ off" filter applied.
4. 4-deal-phone.jpg — phone 390×844, #/ home mobile layout.
Taken with Playwright (agent-tools venv) against local serve.ts, waiting for
window.__shotReady. JPEG quality tuned to stay under 256 KiB.

## Hand-in (repo root)
- main.ts (Node 22, stdlib only): copies app/ + screenshots/ to /output,
  writes dossier.json via vendor/makefun-frontend.ts (text_max_bytes 163840,
  screenshots max 4 / 256 KiB, app_max_files 993 / 16 MiB).
- vendor/makefun-frontend.ts — kit copy, unchanged.
- serve.ts — dev static server (port 8080).
- LICENSE — MIT. README.md — 3 live make.fun badges (current /badge/ pattern),
  each linking to the bounty page; repo About homepage = bounty URL, topic makefun.
- shots.json — documents the 4 screenshot views.

## Quality gate (before handoff to parent for submit)
- Kit checks: main.ts runs, dossier.json builds, gate limits respected.
- Every deal re-checked: price × was = % off shown; store/source named; no
  placeholder; all 33 links are well-formed store search URLs.
- Filters/search/sort exercised in a real browser at desktop + phone widths.
- 2–3 review rounds: round 1 = build + kit checks; round 2 = screenshot
  legibility at judge size (768×480 contact sheet) + fix; round 3 = final
  deal re-verification + local-judge comparison vs a strong reference layout.
- NEVER edit the repo after submit; parent bundles + submits.
