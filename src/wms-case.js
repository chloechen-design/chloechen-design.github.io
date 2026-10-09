(() => {
  const nav = document.querySelector('.wms-case .case-nav');
  if (!nav) return;
  const navLinks = [...nav.querySelectorAll('a[href^="#"]')];
  const sections = navLinks.map(link => document.querySelector(link.hash)).filter(Boolean);
  const setCurrent = section => {
    navLinks.forEach(link => {
      const active = link.hash === `#${section.id}`;
      if (active) link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
      if (active && matchMedia('(max-width: 720px)').matches) {
        const list = link.closest('ol');
        list.scrollTo({left:link.parentElement.offsetLeft-list.clientWidth/2+link.offsetWidth/2,behavior:'auto'});
      }
    });
  };
  const navObserver = new IntersectionObserver(entries => {
    const current = entries.filter(entry => entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if (current) setCurrent(current.target);
  },{rootMargin:'-17% 0px -68% 0px',threshold:[0,.1,.25,.5]});
  sections.forEach(section => navObserver.observe(section));
  navLinks.forEach(link => link.addEventListener('click',event => {
    const target=document.querySelector(link.hash);if(!target)return;
    event.preventDefault();target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    history.replaceState(null,'',link.hash);setCurrent(target);
  }));

  const bindTabs = (tabSelector,panelSelector) => {
    const tabs=[...document.querySelectorAll(tabSelector)];if(!tabs.length)return;
    const select=tab=>{
      tabs.forEach(item=>{
        const active=item===tab;item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1;
        document.getElementById(item.getAttribute('aria-controls')).hidden=!active;
      });
    };
    tabs.forEach((tab,index)=>{
      tab.addEventListener('click',()=>select(tab));
      tab.addEventListener('keydown',event=>{
        let next;if(event.key==='ArrowRight')next=(index+1)%tabs.length;if(event.key==='ArrowLeft')next=(index-1+tabs.length)%tabs.length;
        if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;
        if(next!==undefined){event.preventDefault();select(tabs[next]);tabs[next].focus();}
      });
    });
  };
  bindTabs('.wms-evidence-tabs [role="tab"]','.wms-evidence-panel');
  bindTabs('.wms-gallery-controls [role="tab"]','.wms-art-panel');

  const motionItems=[...document.querySelectorAll('.wms-context-contrast article,.wms-synthesis-grid article,.wms-decision,.wms-adoption-grid article,.wms-next-tests article')];
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if('IntersectionObserver' in window&&!reduce){
    const reveal=new IntersectionObserver((entries,observer)=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:0,rootMargin:'0px 0px -5% 0px'});
    motionItems.forEach(item=>{item.classList.add('wms-rise');reveal.observe(item);});document.body.classList.add('is-enhanced');
  }
})();
