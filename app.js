// VoltCut editable site script
(function(){
  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));
  const data = JSON.parse(document.getElementById('site-data').textContent);

  // Brand bits
  $('#yearSpan').textContent = new Date().getFullYear();
  if (data.brand?.name) $$('.font-semibold.text-white\\/80').forEach(el => { if(el.textContent.trim()==='VoltCut') el.textContent = data.brand.name; });
  if (data.brand?.stat) $('#heroStat').textContent = data.brand.stat;

  // Mobile menu
  $('#menuBtn')?.addEventListener('click', () => {
    $('#mobileMenu')?.classList.toggle('hidden');
  });

  // Work grid
  const workGrid = $('#workGrid');
  (data.work || []).forEach((item, i) => {
    const card = document.createElement('article');
    card.className = 'video-card group relative rounded-2xl overflow-hidden border border-white/10 glass';
    card.innerHTML = `
      <div class="relative aspect-video bg-black">
        <video class="w-full h-full object-cover" playsinline muted loop preload="metadata" poster="${item.poster || ''}">
          <source src="${item.src}" type="video/${(item.src||'').split('.').pop()}">
        </video>
        <div class="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
        <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div>
            <div class="font-semibold">${item.title || 'Untitled'}</div>
            <div class="text-sm text-white/70">${item.caption || ''}</div>
          </div>
          <button class="openBtn px-3 py-1 rounded-lg bg-white/10 border border-white/15 text-sm">Open</button>
        </div>
      </div>
    `;
    const vid = $('video', card);
    // Hover/tap play
    card.addEventListener('mouseenter', ()=> vid.play().catch(()=>{}));
    card.addEventListener('mouseleave', ()=> { vid.pause(); vid.currentTime = 0; });
    // Click open
    $('.openBtn', card).addEventListener('click', () => openModal(item.src, `${item.title} — ${item.caption || ''}`));
    // Also open by clicking video
    vid.addEventListener('click', () => openModal(item.src, `${item.title} — ${item.caption || ''}`));
    workGrid.appendChild(card);
  });

  // Services
  const servicesGrid = $('#servicesGrid');
  (data.services || []).forEach(svc => {
    const el = document.createElement('div');
    el.className = 'glass rounded-2xl p-6 border border-white/10';
    el.innerHTML = `
      <h3 class="text-xl font-semibold">${svc.name}</h3>
      <p class="text-white/70 mt-2">${svc.desc || ''}</p>
      <ul class="mt-4 space-y-2 text-sm text-white/70">
        ${(svc.bullets||[]).map(b=>`<li class="flex items-center gap-2"><span class="h-1.5 w-1.5 rounded-full bg-accent"></span>${b}</li>`).join('')}
      </ul>
    `;
    servicesGrid.appendChild(el);
  });

  // Process
  const processList = $('#processList');
  (data.process || []).forEach(step => {
    const li = document.createElement('li');
    li.className = 'glass rounded-2xl p-6 border border-white/10';
    li.textContent = step;
    processList.appendChild(li);
  });

  // Testimonials
  const track = $('#testTrack');
  (data.testimonials || []).forEach(t => {
    const card = document.createElement('figure');
    card.className = 'min-w-[320px] sm:min-w-[420px] snap-start glass rounded-2xl p-6 border border-white/10';
    card.innerHTML = `
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img class="h-10 w-10 rounded-full border border-white/10" src="${t.avatar}" alt="">
          <div>
            <div class="font-semibold">${t.author}</div>
            <div class="text-sm text-white/70">${t.role}</div>
          </div>
        </div>
        <img class="h-6 object-contain" src="${t.logo}" alt="">
      </div>
      <blockquote class="mt-4 text-white/80 leading-relaxed">“${t.quote}”</blockquote>
    `;
    track.appendChild(card);
  });
  $('#prevTest')?.addEventListener('click', ()=> track.scrollBy({left: -420, behavior:'smooth'}));
  $('#nextTest')?.addEventListener('click', ()=> track.scrollBy({left:  420, behavior:'smooth'}));

  // Pricing
  const pricingGrid = $('#pricingGrid');
  (data.pricing || []).forEach((p,i) => {
    const el = document.createElement('div');
    const featured = i===1;
    el.className = `rounded-2xl p-6 border ${featured?'border-glow/40 bg-glow/10':'border-white/10 glass'}`;
    el.innerHTML = `
      <div class="text-sm uppercase tracking-wide ${featured?'text-white':'text-white/70'}">${p.name}</div>
      <div class="mt-2 text-3xl font-extrabold">${p.price}</div>
      <div class="text-white/70 mt-1">${p.desc||''}</div>
      <ul class="mt-4 space-y-2 text-sm text-white/80">
        ${(p.items||[]).map(i=>`<li class="flex items-center gap-2"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" stroke-width="1.5" /></svg>${i}</li>`).join('')}
      </ul>
      <button class="mt-6 w-full px-4 py-2 rounded-xl ${featured?'bg-white text-ink':'border border-white/20'}">${featured?'Get started':'Learn more'}</button>
    `;
    pricingGrid.appendChild(el);
  });

  // Contact form (demo)
  $('#contactForm')?.addEventListener('submit', (e)=>{
    e.preventDefault();
    const form = new FormData(e.target);
    alert('Thanks, ' + (form.get('name')||'friend') + '! This demo form does not send anywhere. Wire it to your backend or a service like Formspree.');
    e.target.reset();
  });

  // Modal
  const modal = $('#videoModal');
  const modalVideo = $('#modalVideo');
  const modalCaption = $('#modalCaption');
  $('#closeModal').addEventListener('click', ()=>{ modal.close(); modalVideo.pause(); });
  function openModal(src, caption){
    modalVideo.innerHTML = '';
    const source = document.createElement('source');
    source.src = src;
    source.type = `video/${(src||'').split('.').pop()}`;
    modalVideo.appendChild(source);
    modalCaption.textContent = caption || '';
    modal.showModal();
    modalVideo.load();
    modalVideo.play().catch(()=>{});
  }

  // Make it easy to edit: expose data globally so you can `window.siteData = {...}`
  window.siteData = data;
})();
