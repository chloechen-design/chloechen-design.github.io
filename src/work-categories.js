(() => {
  const buttons = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('.work-catalogue__grid [data-category]')];
  const result = document.querySelector('.work-filter-result');
  const labels = {
    all: 'Showing all six projects · delivered work first',
    product: 'Showing product & systems · two company projects',
    web: 'Showing web & brand · two company projects',
    experiments: 'Showing product experiments · prototype and concept'
  };

  buttons.forEach((button) => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    buttons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    let visible = 0;
    cards.forEach((card) => {
      card.hidden = category !== 'all' && card.dataset.category !== category;
      if (!card.hidden) card.querySelector('.work-card__index').textContent = String(++visible).padStart(2, '0');
    });
    result.textContent = labels[category];
  }));
})();
