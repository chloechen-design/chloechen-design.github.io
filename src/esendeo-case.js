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

  const site = [
    {src:'source-website-home-hd.png', alt:'Complete Esendeo homepage with audience routes and product sequence', address:'esendeo.com / home', caption:'Homepage · Four customer routes precede the product sequence and contact prompt.', size:[1440,7368]},
    {src:'source-website-solution-a-hd.png', alt:'Esendeo solution page for boutiques with relevant tasks and service details', address:'esendeo.com / boutiques', caption:'Boutiques · A specific customer context comes first; product capabilities follow.', size:[1440,8534]},
    {src:'source-website-features-hd.png', alt:'Esendeo features page showing product capabilities and shipping tasks', address:'esendeo.com / features', caption:'Product features · Capabilities are explained through the work they support.', size:[1440,8531]},
    {src:'source-website-solution-b-hd.png', alt:'Esendeo solution page for logistics operators', address:'esendeo.com / logisticiens', caption:'Logistics teams · The same offer is framed around time and transport decisions.', size:[1440,8537]}
  ];
  const mail = [
    {src:'source-newsletter-shippingbo.png', alt:'Esendeo Shippingbo partner newsletter', title:'Partner launch', purpose:'Introduce a partner and connect the offer to a concrete shipping benefit.', size:[811,2200]},
    {src:'source-newsletter-brick.png', alt:'Esendeo Brick par Brick partner newsletter', title:'Co-branded offer', purpose:'Keep both brands legible while explaining the shared offer.', size:[528,2200]},
    {src:'source-newsletter-welcome.png', alt:'Esendeo welcome newsletter with first-shipment steps', title:'Welcome journey', purpose:'Turn a first delivery into three understandable starting steps.', size:[470,965]},
    {src:'source-newsletter-features.png', alt:'Esendeo product features newsletter', title:'Feature activation', purpose:'Make a feature useful by showing the next action it enables.', size:[470,940]},
    {src:'source-newsletter-thankyou.png', alt:'Esendeo customer thank-you newsletter', title:'Customer follow-up', purpose:'Close the conversation with a clear next contact point.', size:[450,630]}
  ];
  const setupTabs = (name, items, update) => {
    const root = document.querySelector('[data-gallery="' + name + '"]');
    if (!root) return;
    const tabs = [...root.querySelectorAll('[role="tab"]')];
    const panel = root.querySelector('[role="tabpanel"]');
    const select = (index, focus=false) => {
      tabs.forEach((tab,i) => {tab.setAttribute('aria-selected', String(i===index));tab.tabIndex = i===index ? 0 : -1;});
      update(root,items[index]);
      root.querySelector('.site-scroll,.mail-scroll')?.scrollTo(0,0);
      if (focus) tabs[index].focus();
      if (panel) panel.setAttribute('aria-label', tabs[index].innerText.trim() + ' preview');
    };
    tabs.forEach((tab,index) => {
      tab.addEventListener('click',() => select(index));
      tab.addEventListener('keydown',event => {
        const next = event.key === 'ArrowRight' ? (index+1)%tabs.length : event.key === 'ArrowLeft' ? (index-1+tabs.length)%tabs.length : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length-1 : null;
        if (next === null) return;
        event.preventDefault();select(next,true);
      });
    });
  };
  setupTabs('site',site,(root,item) => {
    const img = root.querySelector('[data-site-image]');
    img.src = './assets/esendeo/'+item.src; img.alt = item.alt; img.width=item.size[0]; img.height=item.size[1];
    root.querySelector('[data-site-open]').href = img.src;
    root.querySelector('[data-site-address]').textContent = item.address;
    root.querySelector('[data-site-caption]').textContent = item.caption;
  });
  setupTabs('mail',mail,(root,item) => {
    const img = root.querySelector('[data-mail-image]');
    img.src = './assets/esendeo/'+item.src; img.alt = item.alt; img.width=item.size[0]; img.height=item.size[1];
    root.querySelector('[data-mail-open]').href = img.src;
    root.querySelector('[data-mail-title]').textContent = item.title;
    root.querySelector('[data-mail-purpose]').textContent = item.purpose;
  });
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
