// MAIA · dados dos planos e do simulador
window.MAIA = {
  plans: {
    base: {
      id:'base', name:'Base', short:'Presença organizada, todo mês.',
      posts:8, carrosseis:4, estaticos:4, videos:0,
      redes:'Instagram, espelhado no Facebook',
      acompanhamento:'Relatório mensal no painel',
      midia:false,
      ideal:'Para quem precisa sair do improviso e manter o perfil vivo com consistência.'
    },
    ritmo: {
      id:'ritmo', name:'Ritmo', short:'Constância com vídeo no mix.',
      posts:12, carrosseis:6, estaticos:6, videos:2,
      redes:'Instagram e Facebook',
      acompanhamento:'Relatório mensal e conversa de 30 minutos',
      midia:false,
      ideal:'Para quem quer ser lembrado e aparecer com frequência no feed e nos Reels.'
    },
    presenca: {
      id:'presenca', name:'Presença', short:'Volume para atrair gente nova.',
      posts:16, carrosseis:8, estaticos:8, videos:3,
      redes:'Instagram e Facebook, vídeos adaptados para TikTok ou Shorts',
      acompanhamento:'Relatório mensal e reunião de 45 minutos',
      midia:false,
      ideal:'Para quem quer alcançar pessoas que ainda não conhecem o negócio.'
    },
    impulso: {
      id:'impulso', name:'Impulso', short:'Conteúdo e estratégia de mídia paga.',
      posts:12, carrosseis:6, estaticos:6, videos:4,
      redes:'Instagram e Facebook',
      acompanhamento:'Relatório com leitura de mídia e reunião de 45 minutos',
      midia:true,
      ideal:'Para quem quer transformar conteúdo em contatos e vendas com anúncios.'
    }
  },
  order:['base','ritmo','presenca','impulso'],

  segments: [
    {id:'alimentacao', label:'Alimentação', hint:'Restaurantes, cafés, confeitarias, delivery', ic:'🍽'},
    {id:'beleza', label:'Beleza e estética', hint:'Salões, barbearias, clínicas de estética', ic:'✂'},
    {id:'saude', label:'Saúde e bem-estar', hint:'Consultórios, terapias, academias', ic:'✚'},
    {id:'moda', label:'Moda e varejo', hint:'Lojas físicas e online', ic:'◇'},
    {id:'servicos', label:'Serviços profissionais', hint:'Advocacia, contabilidade, arquitetura', ic:'▣'},
    {id:'educacao', label:'Educação e cursos', hint:'Escolas, cursos livres, mentorias', ic:'✎'},
    {id:'pet', label:'Pet', hint:'Pet shops, banho e tosa, veterinárias', ic:'◉'},
    {id:'outro', label:'Outro segmento', hint:'Conte no contato, a gente adapta', ic:'✦'}
  ],

  goals: [
    {id:'lembrado', label:'Ser lembrado', hint:'Aparecer com frequência para quem já conhece', plan:'ritmo'},
    {id:'atrair', label:'Atrair clientes novos', hint:'Chegar em quem ainda não conhece', plan:'presenca'},
    {id:'vender', label:'Gerar contatos e vendas', hint:'Mais conversas, pedidos e agendamentos', plan:'impulso'},
    {id:'fidelizar', label:'Fidelizar quem já compra', hint:'Fazer o cliente voltar e indicar', plan:'base'},
    {id:'lancar', label:'Lançar algo novo', hint:'Produto, serviço, unidade ou temporada', plan:'impulso'}
  ],

  capacity: [
    {id:'frequente', label:'Tenho material sempre', hint:'Fotos e vídeos do dia a dia chegam toda semana',
      prod:'Você envia fotos e vídeos brutos toda semana pela pasta do painel. A equipe faz a curadoria, edita, escreve e monta as peças.'},
    {id:'orientado', label:'Gravo com orientação', hint:'Consigo gravar pelo celular se alguém me disser o quê',
      prod:'Você recebe roteiro e lista de cenas para cada vídeo e grava pelo celular. A equipe edita, legenda e finaliza.'},
    {id:'pouco', label:'Quase não tenho material', hint:'Não tenho tempo ou jeito para fotografar e gravar',
      prod:'As peças são feitas com design, ilustração ou imagens licenciadas, e os vídeos usam texto animado e motion. Captação presencial é contratada à parte.'}
  ],

  // mistura de temas por objetivo (em %)
  mix: {
    lembrado:[['Bastidores e rotina',30],['Dicas e conteúdo útil',30],['Produtos e serviços',20],['Datas e novidades',20]],
    atrair:[['Conteúdo útil e compartilhável',40],['Produtos e serviços',25],['Bastidores e rotina',20],['Prova e processo',15]],
    vender:[['Ofertas e chamadas para contato',35],['Produtos e serviços',30],['Dúvidas frequentes',20],['Prova e processo',15]],
    fidelizar:[['Relacionamento e comunidade',35],['Bastidores e rotina',25],['Cuidados e uso',25],['Novidades para quem já é cliente',15]],
    lancar:[['Aquecimento e expectativa',30],['Apresentação do lançamento',30],['Detalhes e dúvidas',25],['Chamada para compra ou inscrição',15]]
  },

  examples: {
    alimentacao:[
      ['carrossel','Os 5 pratos mais pedidos da semana','Foto de cada prato com uma frase sobre o preparo.'],
      ['video','Do forno à mesa em 30 segundos','Bastidor do preparo do prato da casa.'],
      ['estatico','Horário especial do feriado','Aviso claro com dia, horário e canal de pedido.'],
      ['carrossel','Como montar o combo ideal para 4 pessoas','Sugestão de pedido com quantidades.']
    ],
    beleza:[
      ['video','Transformação: corte e finalização','Processo resumido com a profissional explicando a técnica.'],
      ['carrossel','Qual corte combina com o seu rosto','Guia visual com formatos e sugestões.'],
      ['estatico','Agenda aberta para a próxima semana','Chamada direta para agendar pelo WhatsApp.'],
      ['carrossel','Cuidados em casa depois da coloração','Passo a passo para o resultado durar mais.']
    ],
    saude:[
      ['carrossel','3 sinais de que é hora de procurar avaliação','Conteúdo educativo, com nome e registro do profissional.'],
      ['video','Uma dúvida, uma resposta','Profissional responde em 40 segundos uma pergunta comum.'],
      ['estatico','Como funciona a primeira consulta','O que levar, duração e como agendar.'],
      ['carrossel','Mitos e verdades sobre o tratamento','Linguagem simples, validada pelo profissional.']
    ],
    moda:[
      ['carrossel','3 jeitos de usar a mesma peça','Composições para trabalho, fim de semana e noite.'],
      ['video','Chegou na loja','Abertura das novidades da semana.'],
      ['estatico','Peça da semana','Destaque com tamanhos disponíveis e como comprar.'],
      ['carrossel','Guia de medidas','Como escolher o tamanho certo sem provar.']
    ],
    servicos:[
      ['carrossel','O que fazer antes de assinar um contrato','Checklist prático da área do cliente.'],
      ['video','Um dia no escritório','Bastidores que mostram quem atende.'],
      ['estatico','Prazo importante deste mês','Aviso útil com data e o que fazer.'],
      ['carrossel','Perguntas que todo cliente faz na primeira reunião','Respostas diretas e sem jargão.']
    ],
    educacao:[
      ['carrossel','O que você aprende em cada módulo','Mapa do curso em uma sequência visual.'],
      ['video','Aula de 1 minuto','Trecho de uma explicação real do professor.'],
      ['estatico','Inscrições abertas até sexta','Data, formato e link para inscrição.'],
      ['carrossel','Para quem é e para quem não é este curso','Ajuda a pessoa a se reconhecer.']
    ],
    pet:[
      ['video','Antes e depois do banho e tosa','Transformação curta com o pet da semana.'],
      ['carrossel','Quanto tempo entre um banho e outro','Guia por tipo de pelagem.'],
      ['estatico','Horários livres para sábado','Chamada direta para agendar.'],
      ['carrossel','Itens que todo filhote precisa','Lista útil com produtos da loja.']
    ],
    outro:[
      ['carrossel','Como funciona o seu serviço, passo a passo','Explica a experiência do começo ao fim.'],
      ['video','Bastidores do negócio','Quem faz, como faz e por que faz assim.'],
      ['estatico','Novidade do mês','Anúncio claro com data e como aproveitar.'],
      ['carrossel','As dúvidas mais frequentes','Respostas que economizam conversas no WhatsApp.']
    ]
  },

  included:['Diagnóstico inicial do negócio','Linha editorial: pilares, tom de voz e direção visual','Planejamento mensal com pauta','Textos e legendas','Design na identidade do seu negócio','Agendamento e publicação','Painel do cliente','Relatório mensal'],
  notIncluded:['Respostas a comentários e mensagens','Stories do dia a dia','Captação presencial de fotos e vídeos','Criação de logotipo ou identidade visual','Operação das campanhas de anúncio','Verba de anúncios'],
  duties:['Dar acesso às contas das redes','Avisar novidades, preços e datas até o dia 15','Aprovar as peças em até 2 dias úteis','Responder comentários e mensagens','Enviar ou gravar material conforme a capacidade combinada'],
  dutiesMidia:['Dar acesso à conta de anúncios','Pagar a verba de anúncios direto à plataforma'],
  dutiesSaude:['Informar o registro profissional e validar temas técnicos']
};
