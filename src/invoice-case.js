(() => {
  const architecture = document.querySelector("[data-architecture]");
  if (architecture) {
    const buttons = [...architecture.querySelectorAll("[data-architecture-language]")];
    const localisedNodes = [...architecture.querySelectorAll("[data-en][data-zh][data-fr]")];
    const setLanguage = (language) => {
      localisedNodes.forEach((node) => { node.textContent = node.dataset[language]; });
      buttons.forEach((button) => {
        const active = button.dataset.architectureLanguage === language;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });
      architecture.setAttribute("lang", language === "zh" ? "zh-CN" : language);
    };
    buttons.forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.architectureLanguage)));
  }

  const film = document.querySelector("[data-invoice-film]");
  if (film) {
    const video = film.querySelector("video");
    const chapters = [...film.querySelectorAll("[data-film-time]")];
    const type = film.querySelector("[data-film-type]");
    const title = film.querySelector("[data-film-title]");
    const description = film.querySelector("[data-film-description]");
    const counter = film.querySelector("[data-film-counter]");
    let current = -1;
    const showChapter = (index) => {
      if (index === current) return;
      current = index;
      const chapter = chapters[index];
      type.textContent = chapter.dataset.filmLabel;
      title.textContent = chapter.dataset.filmTitle;
      description.textContent = chapter.dataset.filmDescription;
      counter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(chapters.length).padStart(2, "0")}`;
      chapters.forEach((button, i) => {
        button.classList.toggle("is-active", i === index);
        if (i === index) button.setAttribute("aria-current", "true");
        else button.removeAttribute("aria-current");
      });
    };
    const sync = () => {
      const time = video.currentTime;
      let index = 0;
      chapters.forEach((chapter, i) => { if (time >= Number(chapter.dataset.filmTime)) index = i; });
      showChapter(index);
    };
    chapters.forEach((chapter, index) => chapter.addEventListener("click", () => {
      video.currentTime = Number(chapter.dataset.filmTime);
      showChapter(index);
      if (!matchMedia("(prefers-reduced-motion: reduce)").matches) video.play().catch(() => {});
    }));
    video.addEventListener("timeupdate", sync);
    video.addEventListener("seeked", sync);
    showChapter(0);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.removeAttribute("autoplay");
      video.pause();
    }
  }

  const nav = document.querySelector(".invoice-side-nav");
  if (nav) {
    const links = [...nav.querySelectorAll('a[href^="#"]')];
    const sections = links.map((link) => document.querySelector(link.hash)).filter(Boolean);
    const progress = nav.querySelector("[data-invoice-progress]");
    const activate = (section) => {
      links.forEach((link, index) => {
        const active = link.hash === `#${section.id}`;
        if (active) {
          link.setAttribute("aria-current", "location");
          progress.textContent = String(index + 1).padStart(2, "0");
          if (matchMedia("(max-width: 720px)").matches) {
            const list = link.closest("ol");
            list.scrollTo({ left: link.parentElement.offsetLeft - list.clientWidth / 2 + link.offsetWidth / 2, behavior: "auto" });
          }
        } else link.removeAttribute("aria-current");
      });
    };
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) activate(visible.target);
    }, { rootMargin: "-12% 0px -60% 0px", threshold: [0, .15, .35] });
    sections.forEach((section) => observer.observe(section));
    links.forEach((link) => link.addEventListener("click", (event) => {
      const target = document.querySelector(link.hash);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      history.replaceState(null, "", link.hash);
      activate(target);
    }));
  }
})();
