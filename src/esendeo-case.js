(() => {
  const sections = [...document.querySelectorAll('.case-section[id]')];
  const links = [...document.querySelectorAll('.case-nav a[href^="#"]')];
  const progress = document.querySelector('[data-progress]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (!visible) return;
      const index = sections.indexOf(visible.target);
      links.forEach(link => link.getAttribute('href') === '#' + visible.target.id ? link.setAttribute('aria-current', 'location') : link.removeAttribute('aria-current'));
      if (progress) progress.textContent = String(index + 1).padStart(2, '0');
      if (window.matchMedia('(max-width:720px)').matches) links[index]?.scrollIntoView({ block:'nearest', inline:'nearest' });
    }, {rootMargin:'-12% 0px -67% 0px', threshold:0});
    sections.forEach(section => observer.observe(section));
    const reveals = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {entry.target.classList.add('is-visible'); reveals.unobserve(entry.target);}
    }), {threshold:.08});
    document.querySelectorAll('.reveal').forEach(el => reveals.observe(el));
  } else document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));

  const dialog = document.querySelector('.lightbox');
  const lightboxImage = dialog?.querySelector('img');
  let lastTrigger;
  document.addEventListener('click',event => {
    const trigger = event.target.closest('[data-zoom]');
    if (!trigger || !dialog?.showModal) return;
    event.preventDefault(); lastTrigger = trigger;
    lightboxImage.src = trigger.href;
    lightboxImage.alt = trigger.querySelector('img')?.alt || trigger.textContent.trim();
    dialog.showModal();
  });
  dialog?.querySelector('[data-close-lightbox]')?.addEventListener('click',() => dialog.close());
  dialog?.addEventListener('click',event => {if(event.target===dialog) dialog.close();});
  dialog?.addEventListener('close',() => {lightboxImage.removeAttribute('src');lastTrigger?.focus();});
})();
