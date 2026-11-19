const root = document.documentElement;

function savedTheme(fallback = "dark") {
  try {
    return localStorage.getItem("theme") === "light" ? "light" : "dark";
  } catch {
    return fallback;
  }
}

// Resolve the appearance before the stylesheets load.
root.dataset.theme = savedTheme();
const is90sPreview = new URLSearchParams(location.search).get("style") === "90s";
if (is90sPreview) root.dataset.style = "90s";

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".theme-toggle");
  const themeColor = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme) {
    root.dataset.theme = theme;
    toggle.textContent = theme === "dark" ? "Light mode" : "Dark mode";
    themeColor.content = getComputedStyle(root).backgroundColor;
  }

  applyTheme(root.dataset.theme);

  // Keep preview links shareable without changing the default site.
  if (is90sPreview) {
    for (const link of document.querySelectorAll('a[href]:not([href^="#"])')) {
      if (link.origin !== location.origin) continue;
      if (link.pathname !== "/" && !link.pathname.endsWith(".html")) continue;

      const url = new URL(link.href);
      url.searchParams.set("style", "90s");
      link.href = url.href;
    }
  }

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
