import { initProjectsGallery } from "./theme.js";

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gl");
  const filtersEl = document.getElementById("filters");

  const gallery = initProjectsGallery({
    canvas,
    data: window.projects || [],
    onCounts: (counts) => {
      // Update counters on chips
      filtersEl.querySelectorAll("[data-filter]").forEach((btn) => {
        const key = btn.dataset.filter;
        const n = counts[key] ?? 0;
        const el = btn.querySelector(".count");
        if (el) el.textContent = n ? `(${n})` : "";
      });
    },
  });

  filtersEl.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;
    filtersEl
      .querySelectorAll(".chip")
      .forEach((el) => el.classList.remove("active"));
    btn.classList.add("active");
    gallery.setFilter(btn.dataset.filter);
  });

  // Keyboard navigation
  window.addEventListener("keydown", (e) => {
    if (
      ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", "Enter"].includes(
        e.key
      )
    ) {
      e.preventDefault();
      gallery.handleKey(e.key);
    }
  });

  if (import.meta.hot) import.meta.hot.dispose(() => gallery.destroy());
});
