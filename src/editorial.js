(() => {
  const navLinks = [...document.querySelectorAll(".case-nav ol a[href^='#']")];
  const sections = navLinks.map(link => document.querySelector(link.hash)).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      const current = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!current) return;
      navLinks.forEach(link => {
        if (link.hash === `#${current.target.id}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-15% 0px -70% 0px", threshold: [0, .1, .25, .5] });
    sections.forEach(section => observer.observe(section));
  }

  document.querySelectorAll(".gallery-controls").forEach(group => {
    const buttons = [...group.querySelectorAll("button[data-panel]")];
    const select = button => {
      buttons.forEach(item => {
        const active = item === button;
        item.setAttribute("aria-pressed", String(active));
        const panel = document.getElementById(item.dataset.panel);
        if (panel) panel.hidden = !active;
      });
    };
    buttons.forEach((button, index) => {
      button.addEventListener("click", () => select(button));
      button.addEventListener("keydown", event => {
        const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
        if (!step) return;
        event.preventDefault();
        const next = (index + step + buttons.length) % buttons.length;
        select(buttons[next]);
        buttons[next].focus();
      });
    });
  });

  const dialog = document.querySelector("dialog.lightbox");
  const image = dialog?.querySelector("img");
  document.querySelectorAll("a[data-zoom]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      if (!dialog || !image) return;
      image.src = link.getAttribute("href");
      image.alt = link.querySelector("img")?.alt || link.getAttribute("aria-label") || "Project image";
      dialog.showModal();
    });
  });
  dialog?.querySelector("button")?.addEventListener("click", () => dialog.close());
  dialog?.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
})();
