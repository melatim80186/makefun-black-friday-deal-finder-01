// One job: running the site — hash routing, hero stats, and wiring the
// search and filter controls to the list. Rendering is views.js;
// filtering and sorting is filters.js.
//
//   #/            the deal list, with search and filters
//   #/deal/<id>   one deal, with its verdict and source
//
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import { CATEGORIES, CHECKED_AT, STORES, deals } from "./data.js";
import { applyFilters, countByVerdict, maxPct, totalSavings } from "./filters.js";
import { checkedLabel, usd } from "./format.js";
import { dealView, listView, missingView } from "./views.js";

const app = document.getElementById("app");

const state = { q: "", category: "All", store: "All", minOff: "", sort: "pct" };

function renderStats() {
  const el = document.getElementById("stats");
  if (!el) return;
  const counts = countByVerdict(deals);
  el.innerHTML =
    `<span><strong>${deals.length}</strong> real deals</span>` +
    `<span><strong>${CATEGORIES.length}</strong> categories</span>` +
    `<span><strong>${STORES.length}</strong> stores</span>` +
    `<span>up to <strong>${maxPct(deals)}% off</strong></span>` +
    `<span><strong>${usd(Math.round(totalSavings(deals)))}</strong> total savings</span>` +
    `<span><strong>${counts["new-low"]}</strong> new lows</span>`;
  const checked = document.getElementById("checked-line");
  if (checked) {
    checked.textContent = `Every price checked ${checkedLabel(CHECKED_AT)} — Black Friday, 27 Nov 2026.`;
  }
}

function renderList() {
  const shown = applyFilters(deals, state);
  app.innerHTML = listView(shown, deals.length, state, CATEGORIES, STORES);
  const q = app.querySelector("#q");
  q.addEventListener("input", () => {
    state.q = q.value;
    renderListKeepFocus();
  });
  app.querySelector("#store").addEventListener("change", (e) => {
    state.store = e.target.value;
    renderList();
  });
  app.querySelector("#minoff").addEventListener("change", (e) => {
    state.minOff = e.target.value;
    renderList();
  });
  app.querySelector("#sort").addEventListener("change", (e) => {
    state.sort = e.target.value;
    renderList();
  });
  app.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      state.category = chip.dataset.category;
      renderList();
    });
  });
}

function renderListKeepFocus() {
  const pos = app.querySelector("#q").selectionStart;
  renderList();
  const q = app.querySelector("#q");
  q.focus();
  q.setSelectionRange(pos, pos);
}

function readHashState() {
  const hash = location.hash.replace(/^#\/?/, "");
  const qIndex = hash.indexOf("?");
  if (qIndex === -1) return;
  const params = new URLSearchParams(hash.slice(qIndex + 1));
  if (params.has("q")) state.q = params.get("q");
  if (params.has("category")) state.category = params.get("category");
  if (params.has("store")) state.store = params.get("store");
  if (params.has("minoff")) state.minOff = params.get("minoff");
  if (params.has("sort")) state.sort = params.get("sort");
}

function render() {
  window.__shotReady = false;
  renderStats();
  readHashState();
  const match = location.hash.match(/^#\/deal\/([^/?]+)/);
  if (match) {
    const found = deals.find((d) => d.id === decodeURIComponent(match[1]));
    document.title = `${found ? found.title : "Deal not found"} | Black Friday Deal Finder`;
    if (found) {
      const same = found.group ? deals.filter((d) => d.group === found.group) : [];
      app.innerHTML = dealView(found, same);
    } else {
      app.innerHTML = missingView();
    }
  } else {
    document.title = "Black Friday Deal Finder — 33 real deals, checked today";
    renderList();
  }
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

window.addEventListener("hashchange", render);
render();
