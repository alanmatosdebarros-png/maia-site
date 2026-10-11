// MAIA · comportamento comum a todas as páginas
(function(){
  const header = document.querySelector('.site-header');
  const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

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
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g,' ').trim());
    walk(el); el.classList.add('split');
    el.querySelectorAll('.w > span').forEach((s,i) => { s.style.transitionDelay = (i*0.05)+'s'; s.setAttribute('aria-hidden','true'); });
  });

  // revelar ao rolar
  const els = document.querySelectorAll('.reveal, .split');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, {threshold:.12, rootMargin:'0px 0px -6% 0px'});
    els.forEach(el => io.observe(el));
  } else els.forEach(el => el.classList.add('in'));

  // aviso rápido
  window.maiaToast = (msg) => {
    let t = document.querySelector('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role','status'); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show');
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 2800);
  };

  // armazenamento seguro
  window.maiaStore = {
    get(k){ try { return JSON.parse(localStorage.getItem(k)); } catch(e){ return null; } },
    set(k,v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} }
  };
})();
