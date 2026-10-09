// Native anchors remain usable without JavaScript. Enhance only the reading tools.
document.querySelectorAll('[data-gallery]').forEach(gallery => {
  const buttons = [...gallery.querySelectorAll('[data-panel]')];
  buttons.forEach(button => button.addEventListener('click', () => {
    buttons.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    gallery.querySelectorAll('.gallery-panel').forEach(panel => { panel.hidden = panel.id !== button.dataset.panel; });
  }));
});

const sectionLinks = [...document.querySelectorAll('.case-nav ol a')];
const sections = sectionLinks.map(link => document.getElementById(link.hash.slice(1))).filter(Boolean);
if (sections.length) {
  let pending = false;
  let previousActiveId = '';
  const update = () => {
    const nav = document.querySelector('.case-nav');
    const navRect = nav?.getBoundingClientRect();
    const offset = window.innerWidth <= 720
      ? (navRect ? navRect.bottom + 8 : 72)
      : (navRect ? navRect.top + 20 : 135);
    let active = sections[0];
    for (const section of sections) if (section.getBoundingClientRect().top <= offset) active = section;
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) active = sections[sections.length - 1];
    sectionLinks.forEach(link => {
      const isActive = link.hash === '#' + active.id;
      if (isActive) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
      if (isActive && active.id !== previousActiveId && window.innerWidth <= 720 && nav) {
        const list = nav.querySelector('ol');
        const linkRect = link.getBoundingClientRect();
        const listRect = list.getBoundingClientRect();
        if (linkRect.left < listRect.left || linkRect.right > listRect.right) {
          list.scrollTo({left: list.scrollLeft + linkRect.left - listRect.left - 12, behavior: 'smooth'});
        }
      }
    });
    previousActiveId = active.id;
    pending = false;
  };
  window.addEventListener('scroll', () => { if (!pending) { pending = true; requestAnimationFrame(update); } }, {passive:true});
  window.addEventListener('resize', update);
  window.addEventListener('hashchange', update);
  update();
}

const dialog = document.querySelector('.lightbox');
if (dialog && typeof dialog.showModal === 'function') {
  const image = dialog.querySelector('img');
  const close = () => dialog.close();
  document.querySelectorAll('[data-zoom]').forEach(link => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); image.src = link.href; image.alt = link.querySelector('img')?.alt || 'Project detail'; dialog.showModal();
  }));
  dialog.querySelector('button').addEventListener('click', close);
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
  });
}
