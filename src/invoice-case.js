(() => {
  const chapterNav = document.querySelector(".invoice-chapter-nav");
  if (chapterNav) {
    const links = [...chapterNav.querySelectorAll('a[href^="#"]')];
    const sections = links.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
    let scheduled = false;
    let activeId = "";
    const updateChapter = () => {
      const navBottom = chapterNav.getBoundingClientRect().bottom;
      let current = sections[0];
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= navBottom + 16) current = section;
      });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = sections[sections.length - 1];
      }
      links.forEach((link) => {
        const active = link.hash === `#${current.id}`;
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
        if (active && current.id !== activeId) {
          const navRect = chapterNav.getBoundingClientRect();
          const linkRect = link.getBoundingClientRect();
          if (linkRect.left < navRect.left || linkRect.right > navRect.right) {
            chapterNav.scrollTo({ left: chapterNav.scrollLeft + linkRect.left - navRect.left - 12, behavior: "smooth" });
          }
        }
      });
      activeId = current.id;
      scheduled = false;
    };
    const scheduleUpdate = () => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(updateChapter);
      }
    };
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);
    updateChapter();
  }

  const architecture = document.querySelector("[data-architecture]");
  if (architecture) {

    const buttons = [...architecture.querySelectorAll("[data-architecture-language]")];
    const localisedNodes = [...architecture.querySelectorAll("[data-en][data-zh][data-fr]")];

    const setLanguage = (language) => {
      localisedNodes.forEach((node) => {
        node.textContent = node.dataset[language];
      });
      buttons.forEach((button) => {
        const active = button.dataset.architectureLanguage === language;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });
      architecture.setAttribute("lang", language === "zh" ? "zh-CN" : language);
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => setLanguage(button.dataset.architectureLanguage));
    });
  }
})();
