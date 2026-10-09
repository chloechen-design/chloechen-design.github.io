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

  const gallery = document.querySelector("[data-lvv-demo]");
  const tabs = Array.from(gallery?.querySelectorAll("[data-lvv-step]") || []);
  const previous = gallery?.querySelector(".lvv-gallery-prev");
  const next = gallery?.querySelector(".lvv-gallery-next");
  const tabList = gallery?.querySelector('[role="tablist"]');
  const activeIndex = () => Math.max(0, tabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true"));
  const selectStep = (index) => tabs[Math.min(tabs.length - 1, Math.max(0, index))]?.click();
  const syncArrows = () => {
    const index = activeIndex();
    if (previous) previous.disabled = index === 0;
    if (next) next.disabled = index === tabs.length - 1;
  };

  previous?.addEventListener("click", () => selectStep(activeIndex() - 1));
  next?.addEventListener("click", () => selectStep(activeIndex() + 1));
  tabs.forEach((tab) => tab.addEventListener("click", syncArrows));
  tabList?.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectStep(activeIndex() + 1);
      tabs[Math.min(tabs.length - 1, activeIndex())]?.focus();
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectStep(activeIndex() - 1);
      tabs[Math.max(0, activeIndex())]?.focus();
    }
  });
  const stage = gallery?.querySelector(".lvv-gallery-stage");
  let touchStartX = 0;
  stage?.addEventListener("touchstart", (event) => { touchStartX = event.changedTouches[0]?.clientX || 0; }, { passive: true });
  stage?.addEventListener("touchend", (event) => {
    const delta = (event.changedTouches[0]?.clientX || touchStartX) - touchStartX;
    if (Math.abs(delta) > 48) selectStep(activeIndex() + (delta < 0 ? 1 : -1));
  }, { passive: true });
  syncArrows();

  const motionItems = Array.from(document.querySelectorAll(".case-section, .decision, .lvv-evidence-grid article, .lvv-component-card"));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    motionItems.forEach((item) => {
      item.classList.add("lvv-reveal");
      revealObserver.observe(item);
    });
    document.body.classList.add("is-enhanced");
  }
})();
