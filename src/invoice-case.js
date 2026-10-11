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

  const gallery = document.querySelector("[data-invoice-gallery]");
  if (gallery) {
    const tabs = [...gallery.querySelectorAll('[role="tab"]')];
    const panels = [...gallery.querySelectorAll('[role="tabpanel"]')];
    const position = gallery.querySelector("[data-gallery-position]");
    let selected = 0;
    const select = (index, focus = false) => {
      selected = (index + tabs.length) % tabs.length;
      tabs.forEach((tab, i) => {
        tab.setAttribute("aria-selected", String(i === selected));
        tab.tabIndex = i === selected ? 0 : -1;
        panels[i].hidden = i !== selected;
      });
      position.textContent = `${String(selected + 1).padStart(2, "0")} / ${String(tabs.length).padStart(2, "0")}`;
      if (focus) tabs[selected].focus();
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => select(index));
      tab.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft" || event.key === "Home" || event.key === "End") {
          event.preventDefault();
          select(event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : selected + (event.key === "ArrowRight" ? 1 : -1), true);
        }
      });
    });
    gallery.querySelector("[data-gallery-prev]").addEventListener("click", () => select(selected - 1));
    gallery.querySelector("[data-gallery-next]").addEventListener("click", () => select(selected + 1));
  }
})();
