// MAIA · simulador
(function(){
  const M = window.MAIA;
  const S = {seg:null, goal:null, cap:null, step:0, plan:null, suggested:null};
  const $ = s => document.querySelector(s);
  const ic = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const ICONS = {
    alimentacao:'<path d="M7 3v8m-3-8v5a3 3 0 0 0 6 0V3M7 11v10M17 3c-2 2-3 5-3 8h3v10"/>',
    beleza:'<circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/><path d="M8 16 19 4M16 16 5 4"/>',
    saude:'<path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-3 4.5 4.5 0 0 1 8 3c0 6-8 11-8 11Z"/>',
    moda:'<path d="M8 3h8l4 4-3 3v11H7V10L4 7l4-4Z"/>',
    servicos:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V4h6v3"/>',
    educacao:'<path d="m2 9 10-5 10 5-10 5L2 9Z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>',
    pet:'<circle cx="5" cy="10" r="2"/><circle cx="19" cy="10" r="2"/><circle cx="9" cy="5" r="2"/><circle cx="15" cy="5" r="2"/><path d="M12 12c-3 0-6 4-6 7 0 2 2 2 6 1 4 1 6 1 6-1 0-3-3-7-6-7Z"/>',
    outro:'<path d="M12 3c.7 5.4 3.6 8.3 9 9-5.4.7-8.3 3.6-9 9-.7-5.4-3.6-8.3-9-9 5.4-.7 8.3-3.6 9-9Z"/>',
    lembrado:'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21h4"/>',
    atrair:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    vender:'<path d="M21 12a8 8 0 0 1-12 7l-5 1 1-4.5A8 8 0 1 1 21 12Z"/>',
    fidelizar:'<path d="M20 12v8H4v-8M2 7h20v5H2zM12 20V7M12 7H8a2 2 0 1 1 0-4c3 0 4 4 4 4Zm0 0h4a2 2 0 1 0 0-4c-3 0-4 4-4 4Z"/>',
    lancar:'<path d="M5 15c-1.5 1.3-2 5-2 5s3.7-.5 5-2M14 4c4-2 6-1 6-1s1 2-1 6l-7 7-5-5 7-7Z"/><circle cx="15" cy="9" r="1.5"/>',
    frequente:'<rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="12" cy="13" r="3.5"/><path d="M8 6l2-3h4l2 3"/>',
    orientado:'<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M11 18h2"/>',
    pouco:'<path d="M12 3c.7 5.4 3.6 8.3 9 9-5.4.7-8.3 3.6-9 9-.7-5.4-3.6-8.3-9-9 5.4-.7 8.3-3.6 9-9Z"/>'
  };

  function renderOpts(el, list, key){
    el.innerHTML = list.map(o => `<button class="opt" aria-pressed="false" data-v="${o.id}">
      <span class="tick" aria-hidden="true"></span>
      <span class="o-ic">${ic(ICONS[o.id]||'')}</span>
      <span><b>${o.label}</b><small>${o.hint}</small></span></button>`).join('');
    el.addEventListener('click', e => {
      const b = e.target.closest('.opt'); if (!b) return;
      el.querySelectorAll('.opt').forEach(x => x.setAttribute('aria-pressed', x===b));
      S[key] = b.dataset.v; $('#next').disabled = false;
      setTimeout(() => go(1), 320);
    });
  }
  renderOpts($('#opt-seg'), M.segments, 'seg');
  renderOpts($('#opt-goal'), M.goals, 'goal');
  renderOpts($('#opt-cap'), M.capacity, 'cap');

  const keys = ['seg','goal','cap'];
  function go(dir){
    const n = S.step + dir;
    if (n < 0) return;
    if (dir > 0 && !S[keys[S.step]]) return;
    if (n > 2) { showResult(); return; }
    S.step = n; paint();
  }
  function paint(){
    document.querySelectorAll('.sim-step').forEach(s => s.classList.toggle('active', +s.dataset.step === S.step));
    document.querySelectorAll('.progress span').forEach((p,i) => p.classList.toggle('done', i < S.step || (i===S.step && S[keys[i]])));
    $('#sim-label').textContent = `Pergunta ${S.step+1} de 3`;
    $('#back').disabled = S.step === 0;
    $('#next').disabled = !S[keys[S.step]];
    $('#next').innerHTML = (S.step===2?'Ver meu plano ':'Continuar ') + '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    $('#result').classList.remove('active'); $('#sim-nav').style.display = '';
    window.scrollTo({top:0, behavior:'smooth'});
  }
  $('#back').addEventListener('click', () => go(-1));
  $('#next').addEventListener('click', () => go(1));

  function suggest(){
    let p = M.goals.find(g => g.id===S.goal).plan, note = '';
    if (S.cap==='frequente' && p==='base') { p='ritmo'; note='Como você tem material com frequência, sugerimos o Ritmo para aproveitar esse volume com vídeos.'; }
    if (S.cap==='pouco' && p==='presenca') { p='ritmo'; note='Como você tem pouco material, o Ritmo mantém a constância sem exigir tanta produção da sua parte. Quando a rotina de material crescer, o Presença passa a fazer sentido.'; }
    return {p, note};
  }
  const reasons = {
    base:'Para fidelizar, o mais importante é constância e proximidade com quem já compra. O Base garante isso sem excesso de produção.',
    ritmo:'Para ser lembrado, frequência pesa mais que volume. O Ritmo coloca você no feed e nos Reels várias vezes por semana.',
    presenca:'Para atrair gente nova, é preciso volume e vídeos que circulem fora da sua base. O Presença tem a maior quantidade de publicações.',
    impulso:'Para gerar contatos, vendas ou lançar algo, o conteúdo precisa de alcance além dos seguidores. O Impulso soma conteúdo e estratégia de mídia paga.'
  };

  function showResult(){
    const s = suggest(); S.suggested = s.p; S.plan = s.p; S.note = s.note;
    document.querySelectorAll('.sim-step').forEach(x => x.classList.remove('active'));
    document.querySelectorAll('.progress span').forEach(p => p.classList.add('done'));
    $('#sim-label').textContent = 'Seu resultado';
    $('#sim-nav').style.display = 'none';
    $('#result').classList.add('active');
    renderPlan(); window.scrollTo({top:0, behavior:'smooth'});
  }

  function renderPlan(){
    const p = M.plans[S.plan], seg = M.segments.find(x=>x.id===S.seg), goal = M.goals.find(x=>x.id===S.goal), cap = M.capacity.find(x=>x.id===S.cap);
    $('#r-lbl').textContent = S.plan===S.suggested ? 'Plano sugerido para você' : 'Explorando outro plano';
    $('#r-name').textContent = p.name; $('#r-short').textContent = p.ideal;
    $('#r-posts').textContent = p.posts; $('#r-videos').textContent = p.videos; $('#r-total').textContent = p.posts+p.videos;
    $('#r-switch').innerHTML = M.order.map(id => `<button aria-pressed="${id===S.plan}" data-id="${id}">${M.plans[id].name}${id===S.suggested?'<span class="dot" title="Sugerido"></span>':''}</button>`).join('');
    $('#r-answers').innerHTML = `<div><span>Segmento</span><b>${seg.label}</b></div><div><span>Objetivo</span><b>${goal.label}</b></div><div><span>Material</span><b>${cap.label}</b></div><button id="redo">Refazer as respostas</button>`;
    $('#redo').onclick = () => { S.step = 0; paint(); };

    // escopo
    const mix = M.mix[S.goal];
    const why = S.plan===S.suggested ? `<div class="why"><b>Por que o ${p.name}</b>${S.note||reasons[S.plan]}</div>` : `<div class="why" style="background:var(--paper-2)"><b>Você está vendo o ${p.name}</b>O sugerido para as suas respostas é o ${M.plans[S.suggested].name}.</div>`;
    panel('escopo').innerHTML = why + `
      <div class="grid-2" style="margin-bottom:28px">
        <div class="card"><span class="k">Por mês</span><ul class="chk">
          <li>${p.carrosseis} carrosséis</li><li>${p.estaticos} posts estáticos</li>
          ${p.videos?`<li>${p.videos} vídeos curtos de até 60 segundos</li>`:''}
          <li>Pauta mensal e linha editorial</li><li>${p.acompanhamento}</li>
          ${p.midia?'<li>Estratégia de mídia paga e até 4 peças adaptadas para anúncio</li>':''}
        </ul></div>
        <div class="card"><span class="k">Onde publica</span><p style="font-size:20px;letter-spacing:-.02em;font-weight:600">${p.redes}</p>
        <span class="k" style="margin-top:24px">Indicadores no painel</span><p>${kpis(S.goal).join(', ')}.</p></div>
      </div>
      <h3 class="h3" style="margin-bottom:18px">Mistura de temas para "${goal.label.toLowerCase()}"</h3>
      <div class="mix">${mix.map(([t,v])=>`<div class="mix-row"><span>${t}</span><div class="mix-bar"><span style="width:${v}%"></span></div><b>${v}%</b></div>`).join('')}</div>`;

    // calendário
    panel('calendario').innerHTML = calendar(p) + `<div class="legend"><span><i style="background:var(--lilac)"></i>Carrossel</span><span><i style="background:var(--sky)"></i>Estático</span><span><i style="background:var(--coral)"></i>Vídeo</span></div><p class="small muted" style="margin-top:12px">Distribuição de exemplo. As datas reais são combinadas na pauta.</p>`;

    // exemplos
    const ex = M.examples[S.seg];
    const fmtName = {carrossel:'Carrossel', video:'Vídeo', estatico:'Estático'};
    const fmtBg = {carrossel:'var(--lilac)', video:'var(--coral);color:#fff', estatico:'var(--sky)'};
    const list = p.videos ? ex : ex.filter(e => e[0]!=='video');
    panel('exemplos').innerHTML = `<p class="lead" style="margin-bottom:24px">Ideias para ${seg.label.toLowerCase()} que poderiam entrar na pauta. São exemplos, a pauta real nasce do diagnóstico.</p>
      <div class="ex-list">${list.map(e=>`<div class="ex"><span class="fmt" style="background:${fmtBg[e[0]]}">${fmtName[e[0]]}</span><b>${e[1]}</b><p>${e[2]}</p></div>`).join('')}</div>
      ${S.seg==='saude'?'<div class="callout" style="margin-top:20px"><div class="ic"><svg viewBox="0 0 20 20" fill="none"><path d="M10 6v5m0 3h.01" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg></div><div><h3>Área regulada</h3><p>Conteúdos de saúde seguem as regras do conselho profissional. As peças trazem nome e registro, e temas técnicos são validados por você.</p></div></div>':''}`;

    // produção
    panel('producao').innerHTML = `<div class="card" style="background:var(--ink);color:var(--paper);border:0;margin-bottom:28px"><span class="k" style="color:var(--coral)">${cap.label}</span><p style="color:rgba(245,242,236,.85);font-size:18px">${cap.prod}</p></div>
      <div class="timeline">
        <div class="tl-item"><span class="when">Semana 1 do primeiro mês</span><h3>Diagnóstico</h3><p>Conversa de uma hora, formulário e acessos às contas.</p></div>
        <div class="tl-item"><span class="when">Até o dia 10</span><h3>Linha editorial</h3><p>Pilares, tom de voz e direção visual para você aprovar.</p></div>
        <div class="tl-item"><span class="when">Até o dia 20 do mês anterior</span><h3>Pauta do mês</h3><p>Temas, formatos e datas. Uma rodada de ajuste.</p></div>
        <div class="tl-item"><span class="when">Duas vezes por mês</span><h3>Produção em lotes</h3><p>Você aprova cada lote no painel em até 2 dias úteis.</p></div>
        <div class="tl-item" style="padding-bottom:0"><span class="when">Fim do mês</span><h3>Leitura do mês</h3><p>${p.acompanhamento}.</p></div>
      </div>`;

    // incluído
    const duties = M.duties.concat(p.midia?M.dutiesMidia:[], S.seg==='saude'?M.dutiesSaude:[]);
    panel('incluido').innerHTML = `<div class="grid-2">
      <div class="card"><span class="k">Incluído</span><ul class="chk">${M.included.map(x=>`<li>${x}</li>`).join('')}</ul></div>
      <div class="card"><span class="k">Fora do plano</span><ul class="chk x">${M.notIncluded.map(x=>`<li>${x}</li>`).join('')}</ul></div>
      <div class="card"><span class="k">Da sua parte</span><ul class="chk">${duties.map(x=>`<li>${x}</li>`).join('')}</ul></div>
      <div class="card"><span class="k">Combinados</span><ul class="chk">
        <li>Até 2 rodadas de ajuste por post</li>${p.videos?'<li>Vídeos: 1 rodada no roteiro e 2 na edição</li>':''}
        <li>Trocar o tema depois da pauta aprovada conta como peça nova</li><li>Sem aprovação, nada é publicado</li>
        ${p.midia?'<li>A verba de anúncios é paga por você direto à plataforma</li>':''}</ul></div>
    </div>`;

    // guarda resumo para o contato
    maiaStore.set('maia-sim', {plan:p.name, seg:seg.label, goal:goal.label, cap:cap.label, posts:p.posts, videos:p.videos});
  }
  const panel = n => document.querySelector(`.tabpanel[data-p="${n}"]`);

  function kpis(g){
    return {lembrado:['Alcance de não seguidores','visitas ao perfil','salvamentos e compartilhamentos','novos seguidores'],
      atrair:['Alcance de não seguidores','visitas ao perfil','cliques no link','novos seguidores'],
      vender:['Conversas iniciadas','cliques no link','vendas ou agendamentos informados por você'],
      fidelizar:['Comentários','compartilhamentos','mensagens','clientes que voltaram'],
      lancar:['Alcance no período','cliques','conversas','vendas ou inscrições']}[g];
  }

  function calendar(p){
    const now = new Date(); const y = now.getFullYear(), m = now.getMonth()+1;
    const first = new Date(y, m, 1), days = new Date(y, m+1, 0).getDate();
    let monthName = first.toLocaleDateString('pt-BR',{month:'long', year:'numeric'}); monthName = monthName.charAt(0).toUpperCase()+monthName.slice(1);
    // dias úteis (seg a sáb)
    const slots = []; for (let d=1; d<=days; d++){ const wd = new Date(y,m,d).getDay(); if (wd!==0) slots.push(d); }
    const items = []; for (let i=0;i<p.carrosseis;i++) items.push('carrossel'); for (let i=0;i<p.estaticos;i++) items.push('estatico');
    // intercalar formatos
    const posts = []; let c=0,e=0; while (posts.length < p.posts){ if (c<p.carrosseis) {posts.push('carrossel');c++;} if (e<p.estaticos && posts.length<p.posts) {posts.push('estatico');e++;} }
    const total = p.posts + p.videos; const seq = [];
    const vStep = p.videos ? Math.floor(total / p.videos) : 0; let pi=0, vi=0;
    for (let i=0;i<total;i++){ if (p.videos && vi<p.videos && i % vStep === Math.floor(vStep/2)) { seq.push('video'); vi++; } else if (pi<posts.length) seq.push(posts[pi++]); else { seq.push('video'); vi++; } }
    const map = {}; seq.forEach((t,i) => { const d = slots[Math.floor(i * slots.length / total)]; (map[d] = map[d]||[]).push(t); });
    const lab = {carrossel:'Carrossel', estatico:'Estático', video:'Vídeo'};
    let html = `<h3 class="h3" style="margin-bottom:16px">${monthName}</h3><div class="cal">` + ['DOM','SEG','TER','QUA','QUI','SEX','SÁB'].map(d=>`<div class="dh">${d}</div>`).join('');
    for (let i=0;i<first.getDay();i++) html += '<div class="d empty" aria-hidden="true"></div>';
    for (let d=1; d<=days; d++) html += `<div class="d"><span class="dn">${d}</span>${(map[d]||[]).map(t=>`<span class="ev ${t}">${lab[t]}</span>`).join('')}</div>`;
    return html + '</div>';
  }

  $('#r-switch').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; S.plan = b.dataset.id; renderPlan(); });
  $('#r-tabs').addEventListener('click', e => {
    const b = e.target.closest('[role=tab]'); if (!b) return;
    document.querySelectorAll('#r-tabs [role=tab]').forEach(t => t.setAttribute('aria-selected', t===b));
    document.querySelectorAll('.tabpanel').forEach(p => p.classList.toggle('active', p.dataset.p===b.dataset.t));
  });
})();
