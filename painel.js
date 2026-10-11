// MAIA · painel demonstrativo
(function(){
  const $ = s => document.querySelector(s);
  const ST = {prod:['Em produção','st-prod'], wait:['Aguardando você','st-wait'], adj:['Ajuste pedido','st-adj'], ok:['Aprovado','st-ok'], pub:['Publicado','st-pub']};
  const items = [
    {id:1, d:'02', f:'Carrossel', t:'Os 5 mais pedidos da semana', bg:'var(--lilac)', st:'pub'},
    {id:2, d:'04', f:'Estático', t:'Horário especial do feriado', bg:'var(--sky)', st:'pub'},
    {id:3, d:'06', f:'Vídeo', t:'Bastidores da preparação', bg:'var(--coral)', st:'pub'},
    {id:4, d:'09', f:'Carrossel', t:'Como montar o combo ideal', bg:'var(--lilac)', st:'ok'},
    {id:5, d:'11', f:'Estático', t:'Novidade no cardápio', bg:'var(--sky)', st:'ok'},
    {id:6, d:'13', f:'Carrossel', t:'Perguntas que mais recebemos', bg:'var(--lilac)', st:'wait', cap:'Separamos as perguntas que mais aparecem no WhatsApp e respondemos de um jeito rápido. Salva para consultar depois.', rounds:0},
    {id:7, d:'16', f:'Estático', t:'Agenda aberta para encomendas', bg:'var(--butter)', st:'wait', cap:'Encomendas para o fim de semana abertas até quinta. Chama no WhatsApp do link da bio.', rounds:0},
    {id:8, d:'18', f:'Vídeo', t:'Do forno à mesa em 30 segundos', bg:'var(--coral)', st:'wait', cap:'Roteiro: abertura no forno, corte rápido para a montagem, finaliza na mesa com o nome do prato.', rounds:0},
    {id:9, d:'20', f:'Carrossel', t:'Quem faz a sua comida', bg:'var(--lilac)', st:'prod'},
    {id:10,d:'23', f:'Estático', t:'Prato da semana', bg:'var(--sky)', st:'prod'},
    {id:11,d:'25', f:'Carrossel', t:'Ingredientes da estação', bg:'var(--lilac)', st:'prod'},
    {id:12,d:'27', f:'Estático', t:'Como pedir pelo delivery', bg:'var(--sky)', st:'prod'},
    {id:13,d:'28', f:'Carrossel', t:'Monte sua marmita da semana', bg:'var(--lilac)', st:'prod'},
    {id:14,d:'30', f:'Estático', t:'Recado de fim de mês', bg:'var(--sky)', st:'prod'}
  ];
  const row = i => `<div class="item"><div class="th" style="background:${i.bg};${i.f==='Vídeo'?'color:#fff':''}">${i.f}<br>dia ${i.d}</div><div><b>${i.t}</b><p>${i.f} · dia ${i.d}</p></div><span class="status ${ST[i.st][1]}">${ST[i.st][0]}</span></div>`;
  const count = s => items.filter(i => i.st===s).length;

  function render(){
    const total = items.length, pub = count('pub'), ok = count('ok')+pub;
    $('#kpis').innerHTML = [['Publicadas',pub,total],['Aprovadas',ok,total],['Aguardando você',count('wait'),total],['Em produção',count('prod'),total]]
      .map(([l,v,t])=>`<div class="kpi"><span>${l}</span><b>${v}<span style="font-size:15px;color:var(--muted)"> / ${t}</span></b><div class="track"><i style="width:${v/t*100}%"></i></div></div>`).join('');
    $('#next-list').innerHTML = items.filter(i=>i.st!=='pub').slice(0,4).map(row).join('');
    $('#cal-list').innerHTML = items.map(row).join('');
    const w = count('wait'); $('#cnt').textContent = w; $('#cnt').style.display = w? '' : 'none';
    $('#deliv').innerHTML = `<div class="kpis">${[['Posts',12,items.filter(i=>i.f!=='Vídeo'&&(i.st==='pub')).length],['Vídeos',2,items.filter(i=>i.f==='Vídeo'&&i.st==='pub').length],['Pauta','',''],['Relatório','','']].map(([l,t,v],k)=>k<2?`<div class="kpi"><span>${l} publicados</span><b>${v} <span style="font-size:15px;color:var(--muted)">de ${t}</span></b><div class="track"><i style="width:${v/t*100}%"></i></div></div>`:`<div class="kpi"><span>${l}</span><b style="font-size:20px;margin-top:10px">${k===2?'Aprovada':'No fim do mês'}</b></div>`).join('')}</div>`;
    $('#ind').innerHTML = ['Alcance de não seguidores','Visitas ao perfil','Salvamentos e compartilhamentos','Novos seguidores'].map(l=>`<div class="kpi"><span>${l}</span><b style="color:var(--muted)">sem dados</b></div>`).join('');
    renderAppr();
  }

  function renderAppr(){
    const list = items.filter(i => i.st==='wait' || i.st==='adj');
    if (!list.length) { $('#appr-list').innerHTML = '<div class="card" style="text-align:center;padding:48px"><h3>Tudo aprovado</h3><p class="muted">Nenhuma peça esperando por você.</p></div>'; return; }
    $('#appr-list').innerHTML = list.map(i => `<div class="appr" data-id="${i.id}">
      <div class="preview" style="background:${i.bg};${i.f==='Vídeo'?'color:#fff':''}"><span class="status" style="align-self:flex-start;background:rgba(255,255,255,.75);color:var(--ink)">${i.f} · dia ${i.d}</span><div class="t">${i.t}</div></div>
      <div class="meta">
        <div style="display:flex;justify-content:space-between;gap:10px;align-items:center"><b style="font-size:18px">${i.t}</b><span class="status ${ST[i.st][1]}">${ST[i.st][0]}</span></div>
        <div class="cap">${i.cap}</div>
        <p class="hist">Rodadas de ajuste usadas: ${i.rounds} de ${i.f==='Vídeo'?2:2}${i.note?` · Último pedido: "${i.note}"`:''}</p>
        <textarea placeholder="O que você quer ajustar?" aria-label="Pedido de ajuste" hidden></textarea>
        <div class="acts">
          <button class="btn btn-primary btn-sm" data-a="ok">Aprovar</button>
          <button class="btn btn-ghost btn-sm" data-a="adj" ${i.rounds>=2?'disabled title="Rodadas esgotadas"':''}>Pedir ajuste</button>
        </div>
      </div></div>`).join('');
  }

  document.addEventListener('click', e => {
    const b = e.target.closest('.appr [data-a]'); if (!b) return;
    const card = b.closest('.appr'), it = items.find(i => i.id == card.dataset.id);
    if (b.dataset.a === 'ok') { it.st = 'ok'; maiaToast('Peça aprovada. Vai ao ar no dia '+it.d+'.'); render(); return; }
    const ta = card.querySelector('textarea');
    if (ta.hidden) { ta.hidden = false; ta.focus(); b.textContent = 'Enviar pedido'; return; }
    if (!ta.value.trim()) { ta.focus(); maiaToast('Escreva o que precisa mudar.'); return; }
    it.rounds++; it.note = ta.value.trim(); it.st = 'adj'; maiaToast('Pedido enviado. Rodada '+it.rounds+' de 2.'); render();
  });

  document.querySelector('.app-side').addEventListener('click', e => {
    const b = e.target.closest('[role=tab]'); if (!b) return;
    document.querySelectorAll('.app-side [role=tab]').forEach(t => t.setAttribute('aria-selected', t===b));
    document.querySelectorAll('.app-view').forEach(v => v.classList.toggle('active', v.dataset.view===b.dataset.v));
  });
  render();
})();
