(() => {
  const sections = [...document.querySelectorAll('.case-section[id]')];
  const links = [...document.querySelectorAll('.case-nav a[href^="#"]')];
  const progress = document.querySelector('[data-progress]');
  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (!visible) return;
      const index = sections.indexOf(visible.target);
      links.forEach(link => link.getAttribute('href') === '#' + visible.target.id ? link.setAttribute('aria-current','location') : link.removeAttribute('aria-current'));
      if (progress) progress.textContent = String(index + 1).padStart(2,'0');
      if (matchMedia('(max-width:720px)').matches) links[index]?.scrollIntoView({block:'nearest',inline:'nearest'});
    }, {rootMargin:'-12% 0px -62% 0px'});
    sections.forEach(section => navObserver.observe(section));
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
    }), {threshold:.07});
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  } else document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));

  const demo = document.querySelector('[data-demo]');
  if (!demo) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const phases = [
    {heading:'Find the right story',query:'complex project decision',status:'Find source',answer:'Choose a story with evidence before drafting the response.',check:'Human review required'},
    {heading:'Inspect the source',query:'complex project decision ↗ project memory',status:'Source found',answer:'The example sitemap and interface show how the audience entry points changed.',check:'Evidence attached'},
    {heading:'Generate an editable draft',query:'complex project decision ↗ story angle',status:'AI draft',answer:'I reframed navigation around audience needs, then translated the new structure into a clearer set of entry points.',check:'Fact and voice check needed'},
    {heading:'Review before using',query:'complex project decision ↗ verified answer',status:'Human reviewed',answer:'I grouped entry points by audience need. The sitemap and interface show the resulting structure; its impact was not measured.',check:'Claim boundary retained'}
  ];
  const $ = selector => demo.querySelector(selector);
  let phase = reduced ? 3 : 0;
  let playing = !reduced;
  let visible = false;
  let timer;
  const render = () => {
    const state = phases[phase];
    demo.dataset.phase = String(phase);
    $('[data-demo-heading]').textContent = state.heading;
    $('[data-demo-query]').textContent = state.query;
    $('[data-demo-status]').textContent = state.status;
    $('[data-demo-answer]').textContent = state.answer;
    $('[data-demo-check]').textContent = state.check;
    demo.querySelectorAll('[data-step]').forEach((step,index) => step.classList.toggle('is-active',index === phase));
    $('[data-demo-meter]').style.width = `${(phase+1)*25}%`;
    $('[data-demo-toggle]').textContent = playing ? 'Pause Ⅱ' : 'Play ▶';
    $('[data-demo-toggle]').setAttribute('aria-label',playing ? 'Pause walkthrough' : 'Play walkthrough');
  };
  const clear = () => { clearTimeout(timer); timer = undefined; };
  const schedule = () => {
    clear();
    if (!playing || !visible || reduced) return;
    timer = setTimeout(() => { phase = (phase+1)%phases.length; render(); schedule(); }, phase===3 ? 3400 : 2700);
  };
  $('[data-demo-toggle]').addEventListener('click', () => { playing = !playing; render(); schedule(); });
  $('[data-demo-replay]').addEventListener('click', () => { phase=0; playing=!reduced; render(); schedule(); });
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => {visible=entries[0].isIntersecting; schedule();},{threshold:.15}).observe(demo);
  else { visible=true; schedule(); }
  document.addEventListener('visibilitychange',() => { if (document.hidden) clear(); else schedule(); });
  render();
})();
