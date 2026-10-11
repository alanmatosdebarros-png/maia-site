// MAIA · comportamento comum a todas as páginas
(function(){
  // menu mobile
  const mbtn = document.querySelector('.menu-btn');
  if (mbtn) {
    mbtn.addEventListener('click', () => {
      const open = document.body.classList.toggle('menu-open');
      mbtn.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) mbtn.click();
    });
  }

  // títulos que sobem palavra por palavra
  document.querySelectorAll('[data-split]').forEach(el => {
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span'); w.className = 'w';
            const s = document.createElement('span'); s.textContent = part;
            w.appendChild(s); frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
    };
    if (!el.closest('[aria-label]')) el.setAttribute('aria-label', el.textContent.replace(/\s+/g,' ').trim());
    walk(el); el.classList.add('split');
    el.querySelectorAll('.w > span').forEach((s,i) => { s.style.transitionDelay = (i*0.06)+'s'; s.setAttribute('aria-hidden','true'); });
  });

  // revelar ao rolar
  const els = document.querySelectorAll('.reveal, .split, .wipe');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, {threshold:.1, rootMargin:'0px 0px -5% 0px'});
    els.forEach(el => io.observe(el));
  } else els.forEach(el => el.classList.add('in'));

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // parallax suave nas fotos
  const par = [...document.querySelectorAll('[data-parallax-img]')];
  if (par.length && !reduce) {
    const tick = () => {
      par.forEach(img => {
        const r = img.parentElement.getBoundingClientRect();
        const p = (r.top + r.height/2 - innerHeight/2) / innerHeight;
        img.style.transform = `translateY(${p * -8}%)`;
      });
    };
    addEventListener('scroll', () => requestAnimationFrame(tick), {passive:true}); tick();
  }

  // foto que segue o cursor na lista de segmentos
  const list = document.getElementById('seglist'), box = document.getElementById('cursor-ph');
  if (list && box && matchMedia('(hover:hover)').matches) {
    const imgs = {};
    list.querySelectorAll('a[data-img]').forEach(a => {
      const im = new Image(); im.src = a.dataset.img; im.alt = ''; box.appendChild(im); imgs[a.dataset.img] = im;
      a.addEventListener('mouseenter', () => { Object.values(imgs).forEach(i => i.classList.remove('on')); imgs[a.dataset.img].classList.add('on'); box.classList.add('on'); });
    });
    list.addEventListener('mouseleave', () => box.classList.remove('on'));
    let x = 0, y = 0, cx = 0, cy = 0;
    addEventListener('mousemove', e => { x = e.clientX + 170; y = e.clientY; }, {passive:true});
    const loop = () => { cx += (x - cx) * .14; cy += (y - cy) * .14; box.style.left = cx + 'px'; box.style.top = cy + 'px'; requestAnimationFrame(loop); };
    loop();
  }

  // aviso rápido
  window.maiaToast = (msg) => {
    let t = document.querySelector('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role','status'); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show');
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 3000);
  };

  // armazenamento seguro
  window.maiaStore = {
    get(k){ try { return JSON.parse(localStorage.getItem(k)); } catch(e){ return null; } },
    set(k,v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} }
  };
})();
