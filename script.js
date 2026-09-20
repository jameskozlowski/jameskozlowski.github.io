document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

// Native anchor navigation keeps URLs, browser history, and no-JS access intact.
const navigationLinks = document.querySelectorAll('.nav-links a[href^="#"]');
if (navigationLinks.length && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        for (const link of navigationLinks) {
          if (link.hash === `#${entry.target.id}`) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        }
      }
    },
    { rootMargin: "-110px 0px -55% 0px" },
  );

  document
    .querySelectorAll("main > section[id]")
    .forEach((section) => observer.observe(section));
}
