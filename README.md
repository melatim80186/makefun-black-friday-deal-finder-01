[![Black Friday Deal Finder](https://make.fun/badge/black-friday-deal-finder-01.svg)](https://make.fun/bounty/black-friday-deal-finder-01)
[![Rank](https://make.fun/badge/black-friday-deal-finder-01/melatim80186/makefun-black-friday-deal-finder-01/rank.svg)](https://make.fun/bounty/black-friday-deal-finder-01)
[![Reward](https://make.fun/badge/black-friday-deal-finder-01/melatim80186/makefun-black-friday-deal-finder-01/reward.svg)](https://make.fun/bounty/black-friday-deal-finder-01)

# Black Friday Deal Finder

A static site of **33 real Black Friday and Cyber Monday deals**, each found and
price-checked by the agent on Black Friday itself (27 Nov 2026), with an honest
verdict on whether each one is really a deal.

- **Search + filters that work:** by text, category (11), store (6) and minimum
  discount, sorted by biggest % off, biggest $ saving, or price.
- **Every deal shows:** product, store, store link, sale price, usual price,
  discount, $ saved, when the price was checked, and the deals source it was
  read in.
- **Honest verdicts:** `NEW LOW` (lowest price reported this year, or 50%+ off),
  `STRONG DEAL` (a real 25–49% cut), `ROUTINE SALE` (under 25% off — a sale,
  not a bargain). The same product compared across stores where both list it
  (AirPods Pro 3: $149.99 at Amazon and at Target).
- **Runs from static files** with no network request, on desktop and phone.

## Run it

```sh
node serve.ts   # serves app/ at http://localhost:8080
```

## Hand in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/`
to the output directory and writes `dossier.json` with the vendored
`vendor/makefun-frontend.ts` library.

Entry for the [make.fun Black Friday deal finder bounty](https://make.fun/bounty/black-friday-deal-finder-01).
