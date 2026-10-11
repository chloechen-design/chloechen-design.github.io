(() => {
  const stories = [
    {id:'returns',type:'product',tag:'B2B operations',title:'Untangling a returns workflow',summary:'A support and operations team needed one view of returns across several handoffs.',topics:['ambiguity','workflow','conflict','prioritization','stakeholders','product'],situation:'Support and operations teams used separate views to track the same return. A handoff could lose its status and owner.',decision:'Map the shared states first, then design a single exception queue with a visible owner and next action.',evidence:'Example service blueprint, state map and annotated queue screen.',limit:'This fictional example has no production outcome or measured time savings.',angles:['ambiguity','stakeholders','impact']},
    {id:'library',type:'systems',tag:'Design system',title:'Making a component library usable',summary:'Teams needed common behavior across forms and tables without blocking local needs.',topics:['design system','accessibility','trade-offs','governance','systems'],situation:'Product teams had different form and table patterns, making reviews and handoff inconsistent.',decision:'Define shared states, accessibility rules and contribution criteria before expanding the component catalogue.',evidence:'Example component anatomy and documented states for empty, error and loading.',limit:'This fictional example has no verified adoption or efficiency metric.',angles:['systems','tradeoffs','impact']},
    {id:'dashboard',type:'product',tag:'Analytics',title:'Designing a clearer performance dashboard',summary:'A team had many charts but could not tell which change needed action.',topics:['metrics','research','prioritization','dashboard','decision'],situation:'Operators saw several metrics at once, but the interface did not connect a signal to the next decision.',decision:'Prioritize actionable exceptions and show the comparison period and metric definition beside each signal.',evidence:'Example dashboard hierarchy and metric-definition card.',limit:'This fictional example has not been tested with real operators.',angles:['ambiguity','tradeoffs','impact']},
    {id:'scheduling',type:'product',tag:'Service design',title:'Reducing friction in appointment scheduling',summary:'A multi-step booking flow needed a clearer recovery path.',topics:['accessibility','usability','research','trade-offs','service'],situation:'A user who changed appointment details had to restart the flow, and errors appeared only at the end.',decision:'Keep the selected context visible, validate per step and make rescheduling reversible.',evidence:'Example journey map and annotated booking states.',limit:'This fictional example has no measured booking conversion result.',angles:['tradeoffs','stakeholders','impact']}
  ];
  const questions = {
    ambiguity:{label:'Ambiguity',prompt:'Tell me about a time you brought clarity to an ambiguous product problem.',fr:'Parlez-moi d’une situation où vous avez clarifié un problème produit ambigu.'},
    stakeholders:{label:'Collaboration',prompt:'How did you align people with different priorities?',fr:'Comment avez-vous aligné des personnes aux priorités différentes ?'},
    systems:{label:'Systems thinking',prompt:'How did you create a reusable design approach?',fr:'Comment avez-vous créé une approche de design réutilisable ?'},
    tradeoffs:{label:'Trade-offs',prompt:'What did you deliberately leave out, and why?',fr:'Qu’avez-vous choisi de laisser de côté, et pourquoi ?'},
    impact:{label:'Impact & limits',prompt:'What changed, and what evidence do you have?',fr:'Qu’est-ce qui a changé, et de quelles preuves disposez-vous ?'}
  };
  const framing = {
    ambiguity:{en:'The ambiguous part was identifying the underlying task before designing a screen.',fr:'La difficulté était de clarifier la tâche avant de dessiner un écran.'},
    stakeholders:{en:'I used the shared workflow to make competing priorities visible.',fr:'Je me suis appuyée sur le parcours commun pour rendre visibles les priorités divergentes.'},
    systems:{en:'I chose rules and states that could be reused beyond a single screen.',fr:'J’ai défini des règles et des états réutilisables au-delà d’un seul écran.'},
    tradeoffs:{en:'I prioritized the decision path over adding more interface features.',fr:'J’ai privilégié le parcours de décision plutôt que d’ajouter des fonctions.'},
    impact:{en:'The available artifact shows the design decision; it does not establish a measured outcome.',fr:'Le livrable illustre la décision de design, sans prouver un résultat mesuré.'}
  };
  const frenchExamples = {
    returns:{situation:'Les équipes support et opérations suivaient un même retour dans des vues séparées.',decision:'J’ai d’abord cartographié les états communs, puis conçu une file des exceptions avec un responsable et une prochaine action visibles.',evidence:'Un exemple de parcours de service, de carte des états et d’écran annoté.',limit:'Aucun résultat en production ni gain de temps mesuré.'},
    library:{situation:'Les équipes produit utilisaient des formulaires et tableaux différents, ce qui compliquait les revues.',decision:'J’ai défini les états partagés, les règles d’accessibilité et les critères de contribution avant d’élargir la bibliothèque.',evidence:'Une anatomie de composant et des états vide, erreur et chargement.',limit:'Aucune mesure vérifiée d’adoption ou d’efficacité.'},
    dashboard:{situation:'Les opérateurs voyaient plusieurs métriques sans lien clair avec la prochaine décision.',decision:'J’ai donné la priorité aux exceptions actionnables et placé la période de comparaison près de chaque signal.',evidence:'Une hiérarchie de tableau de bord et une fiche de définition des métriques.',limit:'Aucun test avec des opérateurs réels.'},
    scheduling:{situation:'Modifier un rendez-vous obligeait à recommencer, et les erreurs apparaissaient trop tard.',decision:'J’ai gardé le contexte sélectionné visible, validé chaque étape et rendu le changement réversible.',evidence:'Un parcours et des états de réservation annotés.',limit:'Aucune mesure de conversion.'}
  };
  const $ = id => document.getElementById(id);
  const state = {story:stories[0],angle:'ambiguity',filter:'all',query:'',language:'en',hasDraft:false};
  const getAngles = () => state.story.angles.map(id => ({id,...questions[id]}));
  const escaped = value => String(value).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const resetReview = () => {$('factCheck').checked=false;$('voiceCheck').checked=false;$('answer').value='';state.hasDraft=false;$('copyMessage').textContent='';updateReview();};
  function renderStories() {
    const query=state.query.toLowerCase().trim();
    const results=stories.filter(story => (state.filter==='all'||story.type===state.filter) && (!query||[story.title,story.summary,story.tag,...story.topics].join(' ').toLowerCase().includes(query)));
    $('resultCount').textContent=`${results.length} example${results.length===1?'':'s'}`;
    $('storyList').innerHTML=results.map(story=>`<button type="button" class="story-card ${state.story.id===story.id?'is-selected':''}" data-story="${story.id}" aria-pressed="${state.story.id===story.id}"><span>${escaped(story.tag)} <i aria-hidden="true">↗</i></span><strong>${escaped(story.title)}</strong><small>${escaped(story.summary)}</small></button>`).join('')||'<p class="empty">No matching example. Try “workflow,” “metrics,” or “accessibility.”</p>';
    $('storyList').querySelectorAll('[data-story]').forEach(button=>button.addEventListener('click',()=>{state.story=stories.find(item=>item.id===button.dataset.story);state.angle=state.story.angles[0];resetReview();renderAll();}));
  }
  function renderAngles() {
    $('questionList').innerHTML=getAngles().map(({id,label})=>`<button type="button" data-angle="${id}" class="${state.angle===id?'is-selected':''}" aria-pressed="${state.angle===id}">${escaped(label)}<span aria-hidden="true">↗</span></button>`).join('');
    $('questionList').querySelectorAll('[data-angle]').forEach(button=>button.addEventListener('click',()=>{state.angle=button.dataset.angle;resetReview();renderAll();}));
    $('selectedQuestion').textContent=state.language==='fr'?questions[state.angle].fr:questions[state.angle].prompt;
  }
  function renderSource() {['title','situation','decision','evidence','limit'].forEach(key=>{const id=key==='title'?'storyTitle':key;$(id).textContent=state.story[key];});}
  function renderAll(){renderStories();renderAngles();renderSource();}
  function updateReview(){
    const hasText=$('answer').value.trim().length>0;
    const facts=$('factCheck').checked,voice=$('voiceCheck').checked;
    const status=!hasText?'Not drafted':facts&&voice?'Human reviewed':facts?'Voice check needed':voice?'Fact check needed':'Needs review';
    $('status').textContent=status;
    $('status').classList.toggle('is-ready',hasText&&facts&&voice);
    $('reviewState').textContent=!hasText?'Needs a draft':facts&&voice?'Ready to use after your own final read':facts?'Check your voice':voice?'Check facts against the source':'Check facts and voice';
    $('reviewState').classList.toggle('is-ready',hasText&&facts&&voice);
    $('copy').disabled=!(hasText&&facts&&voice);
  }
  function buildDraft(){
    const s=state.story;
    // Deliberately deterministic: the public demo does not imply an AI model is running.
    if(state.language==='fr') {const f=frenchExamples[s.id];return `${framing[state.angle].fr} ${f.situation} ${f.decision} Preuve à examiner : ${f.evidence} Limite : ${f.limit}`;}
    return `${framing[state.angle].en} ${s.situation} ${s.decision} Supporting artifact: ${s.evidence} Evidence limit: ${s.limit}`;
  }
  $('search').addEventListener('input',event=>{state.query=event.target.value;renderStories();});
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{state.filter=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(item=>{item.classList.toggle('is-active',item===button);item.setAttribute('aria-pressed',String(item===button));});renderStories();}));
  $('language').addEventListener('change',event=>{state.language=event.target.value;resetReview();renderAngles();});
  $('suggest').addEventListener('click',()=>{$('answer').value=buildDraft();state.hasDraft=true;$('answer').focus();updateReview();});
  $('answer').addEventListener('input',()=>{$('factCheck').checked=false;$('voiceCheck').checked=false;updateReview();});
  ['factCheck','voiceCheck'].forEach(id=>$(id).addEventListener('change',updateReview));
  $('copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('answer').value);$('copyMessage').textContent='Reviewed answer copied.';}catch{$('answer').select();$('copyMessage').textContent='Select and copy the answer manually.';}});
  $('reset').addEventListener('click',()=>{state.story=stories[0];state.angle='ambiguity';state.filter='all';state.query='';state.language='en';$('search').value='';$('language').value='en';document.querySelectorAll('[data-filter]').forEach(item=>{const active=item.dataset.filter==='all';item.classList.toggle('is-active',active);item.setAttribute('aria-pressed',String(active));});resetReview();renderAll();});
  document.addEventListener('keydown',event=>{if(event.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){event.preventDefault();$('search').focus();}});
  renderAll();updateReview();
})();
