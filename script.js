const root = document.documentElement;

function savedTheme(fallback = "dark") {
  try {
    return localStorage.getItem("theme") === "light" ? "light" : "dark";
  } catch {
    return fallback;
  }
}

// This script runs before the stylesheets so a saved theme applies on first paint.
root.dataset.theme = savedTheme();

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".theme-toggle");
  const themeColor = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme) {
    root.dataset.theme = theme;
    toggle.textContent = theme === "dark" ? "Light mode" : "Dark mode";
    themeColor.content = getComputedStyle(root).backgroundColor;
  }

  applyTheme(root.dataset.theme);
  toggle.hidden = false;
  toggle.addEventListener("click", () => {
    const theme = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // The toggle still works on this page if storage is unavailable.
    }
  });

  window.addEventListener("pageshow", (event) => {
    if (event.persisted) applyTheme(savedTheme(root.dataset.theme));
  });

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
});
