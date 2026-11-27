// One job: turning deal numbers into the strings the pages show.

export function usd(n) {
  return `$${Number(n).toLocaleString("en-US", {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

export function priceLabel(deal) {
  return usd(deal.price) + (deal.unit ?? "");
}

export function pctOff(deal) {
  return Math.round((1 - deal.price / deal.was) * 100);
}

export function saved(deal) {
  return deal.was - deal.price;
}

export function savedLabel(deal) {
  const s = saved(deal);
  const rounded = Math.abs(s - Math.round(s)) < 0.005 ? Math.round(s) : s;
  return `Save ${usd(rounded)}`;
}

// "27 Nov 2026, 07:30 UTC" — the check time every deal carries.
export function checkedLabel(iso) {
  const d = new Date(iso);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const day = String(d.getUTCDate()).padStart(2, "0");
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");
  return `${day} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}, ${hh}:${mm} UTC`;
}
