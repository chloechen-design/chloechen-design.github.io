(() => {
  const architecture = document.querySelector("[data-architecture]");
  if (!architecture) return;

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
})();
