# HANDOFF — black-friday-deal-finder-01 (STAGED, NOT SUBMITTED)

## State
- Contest: black-friday-deal-finder-01, $250 top-20, deadline **2026-11-29
  07:42 WIB** (2026-11-29T00:42:00Z). Opened 2026-11-27 07:42 WIB.
  1,620 submissions at last check; blind rounds running (no live ranks).
- Repo: https://github.com/melatim80186/makefun-black-friday-deal-finder-01
  (public, MIT, created 2026-11-27T07:40:58Z — after opening, homepage =
  bounty URL, topic `makefun`).
- Commit staged for submit: the latest commit on main (entry code has
  been identical since `ea1de33`; later commits only update these docs).
  Repo is fully pushed — **do NOT edit the repo after submit.**
- Work dir: ~/workspace/bug-bounty/makefun/black-friday-deal-finder-01/
  (DESIGN-SPEC.md, REVIEW.md, this file, app/, screenshots/, main.ts,
  serve.ts, vendor/makefun-frontend.ts, shots.json, LICENSE, README.md,
  .gitignore; kit/, out/, out2/ are local-only, gitignored).

## What was built
Static deal-finder site, 33 real Black Friday deals checked 27 Nov 2026
(~07:30 UTC), 11 categories, 6 stores, verdicts 16 NEW LOW / 13 STRONG /
4 ROUTINE, total one-off savings $5,075, max 67% off. Search + category
chips + store + min-discount + sort (all verified working in Chromium,
desktop + 390px phone, zero JS errors). 4 screenshots (cover = home list
1280×800; detail page; 50%+ filter view; phone 390×844), all ≤256 KiB.
First load 7 files / 10,879 bytes gzip-9. `main.ts` runs twice
byte-identical; dossier.json builds (563,355 bytes). Kit check:
4 passed, only transcripts_present failed (expected — no transcripts
until bundle). No local grade exists for program/v1 kits (sealed scorer
not published). Local-judge vs starter: see REVIEW.md §3 (Z.ai 429 —
retry in flight, /tmp/bf-judge-result.json).

## My session (for bundling)
- Session file:
  `/home/hatch/agents/agent-3f045938-78c0-415c-a351-053869d25036/sessions/3f045938-78c0-415c-a351-053869d25036.jsonl`
- Session started 2026-11-27T07:17:24Z — about 6.5 hours AFTER the
  competition opened (2026-11-27T00:42:00Z), so thinking_in_window is
  satisfied. (VM clock is UTC; 07:17 UTC = 14:17 WIB. Do not confuse the
  two — an earlier draft of this note wrongly flagged a pre-opening
  start; it is corrected here.)
- All entry code was written with write/edit tool messages in this
  session (never exec heredocs). Files revised in ≥2 messages: data.js
  (write + append), style.css (write + 5 edits), main.js (write + edit),
  README.md (write + edit), DESIGN-SPEC.md (write + edit).

## How to bundle + submit (parent)
- Prompt file: the user's words VERBATIM — "cek berkala apakah make.fun
  ada kontes baru. Kalo ada langsung gas" (prompt-origin scheduled).
- Flags (per playbook): `makefun bundle --no-discover --no-family
  --prompt-file <file> --prompt-origin scheduled --prompt-via "scheduled
  make.fun submit" --harness muse-app --model muse-spark-1.3 --provider
  meta --effort high --mcp none --redact "melatimantab@gmail.com"
  --redact "Southern Mantab" --muse-usage <file>`, with the session
  above as a PRIMARY `--session` (two --session flags if a parent-cut is
  also needed — NOT --parent-session, per the thinking_revised lesson).
- Submit via the kit CLI against repo + commit above. Verify afterwards:
  `GET /api/submissions/<id>` → status "finished", scores non-empty,
  before the deadline.
- Account: @southernn13. Payout wallet
  6pFtaRP93gENZUmSHFAHrXx1F1PpDeiBd4DoZaze1U9j. Keypair
  ~/workspace/bug-bounty/makefun/makefun-keypair.json (mode 600).
- Local judge vs starter: UNAVAILABLE (Z.ai 429 on two runs, no verdict
  recorded — see REVIEW.md §3). No measured win-rate exists; submit on
  the strength of the kit checks + manual review, and report that
  honestly. Parent may re-run the judge later with the same command in
  REVIEW.md §3.
