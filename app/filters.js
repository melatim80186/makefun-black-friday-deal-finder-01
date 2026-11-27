// One job: filtering and sorting the deal list from the controls' state.
// Pure functions over the deals array — nothing here touches the page.

import { pctOff, saved } from "./format.js";

export const SORTS = {
  pct: "Biggest % off",
  saved: "Biggest $ saving",
  low: "Lowest price",
  high: "Highest price",
};

export function applyFilters(all, state) {
  const q = (state.q ?? "").trim().toLowerCase();
  let out = all.filter((d) => {
    if (state.category && state.category !== "All" && d.category !== state.category) return false;
    if (state.store && state.store !== "All" && d.store !== state.store) return false;
    if (state.minOff && pctOff(d) < Number(state.minOff)) return false;
    if (q) {
      const hay = `${d.title} ${d.store} ${d.category}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
  const by = state.sort ?? "pct";
  const cmp = {
    pct: (a, b) => pctOff(b) - pctOff(a) || saved(b) - saved(a),
    saved: (a, b) => saved(b) - saved(a) || pctOff(b) - pctOff(a),
    low: (a, b) => a.price - b.price,
    high: (a, b) => b.price - a.price,
  }[by];
  return [...out].sort(cmp);
}

export function countByVerdict(all) {
  const counts = { "new-low": 0, strong: 0, routine: 0 };
  for (const d of all) counts[d.verdict] = (counts[d.verdict] ?? 0) + 1;
  return counts;
}

export function totalSavings(all) {
  // Monthly-priced deals (streaming) are left out: a $/month saving is not
  // the same unit as a one-off saving.
  return all
    .filter((d) => !d.unit)
    .reduce((sum, d) => sum + saved(d), 0);
}

export function maxPct(all) {
  return Math.max(...all.map((d) => pctOff(d)));
}
