// One job: building the HTML for the list page and the deal pages from data.
// Every value from the data is escaped before it goes into the page.

import { checkedLabel, pctOff, priceLabel, savedLabel, usd } from "./format.js";

export const VERDICTS = {
  "new-low": { label: "NEW LOW", title: "Lowest price reported this year, or 50%+ off" },
  strong: { label: "STRONG DEAL", title: "A real 25–49% cut with a solid dollar saving" },
  routine: { label: "ROUTINE SALE", title: "Under 25% off — a sale, not a bargain" },
};

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

function verdictBadge(deal) {
  const v = VERDICTS[deal.verdict];
  return `<span class="verdict verdict-${deal.verdict}" title="${esc(v.title)}">${v.label}</span>`;
}

function dealCard(deal) {
  const off = pctOff(deal);
  return `<article class="card">
    <div class="card-top">
      <span class="store">${esc(deal.store)}</span>
      <span class="cat">${esc(deal.category)}</span>
    </div>
    <h3><a href="#/deal/${deal.id}">${esc(deal.title)}</a></h3>
    <div class="prices">
      <span class="price">${priceLabel(deal)}</span>
      <span class="was">${usd(deal.was)}${deal.unit ?? ""}</span>
      <span class="off">−${off}%</span>
    </div>
    <div class="save-line">${savedLabel(deal)} ${deal.unit ? "a month" : ""} · ${verdictBadge(deal)}</div>
    <p class="note">${esc(deal.note)}</p>
    <div class="meta">Checked ${checkedLabel(deal.checked)}</div>
    <a class="cta" href="${esc(deal.url)}" target="_blank" rel="noopener">View at ${esc(deal.store)} ↗</a>
  </article>`;
}

export function listView(shown, total, state, categories, stores) {
  const chips = ["All", ...categories]
    .map(
      (c) =>
        `<button type="button" class="chip${state.category === c || (!state.category && c === "All") ? " active" : ""}" data-category="${esc(c)}">${esc(c)}</button>`,
    )
    .join("");
  const storeOptions = ["All", ...stores]
    .map(
      (s) =>
        `<option value="${esc(s)}"${state.store === s || (!state.store && s === "All") ? " selected" : ""}>${esc(s)}</option>`,
    )
    .join("");
  const cards = shown.map(dealCard).join("");
  const empty = shown.length
    ? ""
    : `<p class="empty">No deals match that search. Try clearing a filter.</p>`;
  return `
  <section class="controls" aria-label="Search and filter deals">
    <input id="q" type="search" placeholder="Search deals, stores, categories…" value="${esc(state.q ?? "")}" aria-label="Search deals">
    <div class="control-row">
      <label>Store
        <select id="store">${storeOptions}</select>
      </label>
      <label>Min. discount
        <select id="minoff">
          <option value=""${!state.minOff ? " selected" : ""}>Any discount</option>
          <option value="25"${state.minOff === "25" ? " selected" : ""}>25% off or more</option>
          <option value="40"${state.minOff === "40" ? " selected" : ""}>40% off or more</option>
          <option value="50"${state.minOff === "50" ? " selected" : ""}>50% off or more</option>
        </select>
      </label>
      <label>Sort by
        <select id="sort">
          <option value="pct"${state.sort === "pct" ? " selected" : ""}>Biggest % off</option>
          <option value="saved"${state.sort === "saved" ? " selected" : ""}>Biggest $ saving</option>
          <option value="low"${state.sort === "low" ? " selected" : ""}>Lowest price</option>
          <option value="high"${state.sort === "high" ? " selected" : ""}>Highest price</option>
        </select>
      </label>
    </div>
    <div class="chips" role="group" aria-label="Category">${chips}</div>
  </section>
  <p class="count">Showing <strong>${shown.length}</strong> of ${total} deals · sorted by ${state.sort === "saved" ? "biggest $ saving" : state.sort === "low" ? "lowest price" : state.sort === "high" ? "highest price" : "biggest % off"}</p>
  <section class="grid">${cards}</section>
  ${empty}`;
}

export function dealView(deal, sameProduct) {
  const off = pctOff(deal);
  const v = VERDICTS[deal.verdict];
  const others = sameProduct
    .filter((d) => d.id !== deal.id)
    .map(
      (d) =>
        `<li><a href="#/deal/${d.id}">${esc(d.store)}</a> — ${priceLabel(d)} (was ${usd(d.was)}${d.unit ?? ""})</li>`,
    )
    .join("");
  return `
  <p class="back"><a href="#/">← All deals</a></p>
  <article class="detail">
    <div class="card-top">
      <span class="store">${esc(deal.store)}</span>
      <span class="cat">${esc(deal.category)}</span>
    </div>
    <h2>${esc(deal.title)}</h2>
    <div class="prices big">
      <span class="price">${priceLabel(deal)}</span>
      <span class="was">${usd(deal.was)}${deal.unit ?? ""}</span>
      <span class="off">−${off}%</span>
    </div>
    <p class="save-line big">${savedLabel(deal)}${deal.unit ? " a month" : ""} off the usual price</p>
    <div class="verdict-box verdict-${deal.verdict}">
      <strong>${v.label}</strong> — ${esc(v.title)}
      <p>${esc(deal.note)}</p>
    </div>
    <dl class="facts">
      <div><dt>Store</dt><dd>${esc(deal.store)}</dd></div>
      <div><dt>Category</dt><dd>${esc(deal.category)}</dd></div>
      <div><dt>Price checked</dt><dd>${checkedLabel(deal.checked)}</dd></div>
      <div><dt>Price read in</dt><dd>${esc(deal.source)}</dd></div>
    </dl>
    ${others ? `<h3>Same product, another store</h3><ul class="also">${others}</ul>` : ""}
    <a class="cta big" href="${esc(deal.url)}" target="_blank" rel="noopener">View at ${esc(deal.store)} ↗</a>
    <p class="fine">Prices change fast on Black Friday — confirm the price at the store before you buy.</p>
  </article>`;
}

export function missingView() {
  return `<p class="empty">That deal is not on this board. <a href="#/">Back to all deals</a>.</p>`;
}
