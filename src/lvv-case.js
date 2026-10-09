(() => {
  const nav = document.querySelector(".case-nav");
  if (!nav) return;

  const links = Array.from(nav.querySelectorAll('a[href^="#"]'));
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const activate = (section) => {
    links.forEach((link) => {
      const active = link.hash === `#${section.id}`;
      if (active) {
        link.setAttribute("aria-current", "location");
        if (window.matchMedia("(max-width: 720px)").matches) {
          link.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
        }
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) activate(visible.target);
    },
    { rootMargin: "-18% 0px -62% 0px", threshold: [0, 0.15, 0.35, 0.6] },
  );

  sections.forEach((section) => observer.observe(section));
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.hash);
      if (!target) return;
      event.preventDefault();
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      history.replaceState(null, "", link.hash);
      activate(target);
    });
  });
})();
