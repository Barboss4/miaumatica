(() => {
  'use strict';

  const KEY = 'miaumatica.v1';
  const SAVE_VERSION = 2;
  const OPERATIONS = {
    add: { label: 'Adição', symbol: '+', icon: '+', color: '#8b71e4', description: 'Vamos somar!' },
    sub: { label: 'Subtração', symbol: '−', icon: '−', color: '#ef9471', description: 'Descubra a diferença!' },
    mul: { label: 'Multiplicação', symbol: '×', icon: '×', color: '#53bfa9', description: 'Domine a tabuada!' },
    div: { label: 'Divisão', symbol: '÷', icon: '÷', color: '#6ca7ed', description: 'Divida e conquiste!' }
  };
  const OP_IDS = Object.keys(OPERATIONS);
  // Mantemos a implementação para uma versão futura, mas os móveis ficam
  // ocultos na primeira publicação do GitHub Pages.
  const FURNITURE_ENABLED = false;
  const ADVENTURES = {
    add: { region: 'Floresta da Adição', icon: '🌳', story: 'Recupere as sementes luminosas somando os caminhos.' },
    sub: { region: 'Vila da Subtração', icon: '🏘️', story: 'Descubra o que desapareceu e ajude os moradores.' },
    mul: { region: 'Montanha da Multiplicação', icon: '⛰️', story: 'Forme grupos mágicos para chegar ao topo.' },
    div: { region: 'Castelo da Divisão', icon: '🏰', story: 'Reparta os tesouros para abrir os portões.' }
  };
  const MAX_LEVEL = 12;
  // Sequência pedagógica gradual para o 2º e o 3º ano do Ensino Fundamental.
  // A descrição aparece na trilha e nas perguntas. Os limites são reforçados
  // pela própria geração (não são apenas exemplos ilustrativos).
  const LEVEL_GUIDE = {
    add: [
      ['Somar até 10', 'Continhas pequenas, com apoio da contagem.', '3 + 4'],
      ['Somar até 20', 'Junte dois números e descubra o total.', '8 + 7'],
      ['Dezenas + unidades', 'Some um número de dois algarismos com outro pequeno, sem vai um.', '24 + 3'],
      ['Primeiro vai um', 'Some unidades que formam dez ou mais.', '28 + 5'],
      ['Duas dezenas, sem vai um', 'Some dois números de dois algarismos sem reagrupamento.', '23 + 45'],
      ['Duas dezenas, com vai um', 'Agora a soma das unidades passa de nove.', '27 + 35'],
      ['Centenas + dezenas', 'Some números de três e de dois algarismos sem vai um.', '123 + 24'],
      ['Centenas com vai um', 'Some dois números de três algarismos com reagrupamento.', '248 + 325'],
      ['Milhares sem vai um', 'Alinhe unidade, dezena, centena e milhar.', '1.234 + 2.315'],
      ['Milhares com vai um', 'Faça reagrupamentos em números maiores.', '2.768 + 3.547'],
      ['Números redondos', 'Use estratégias mentais com dezenas e centenas.', '1.200 + 700'],
      ['Missão de adição', 'Resolva um pequeno problema da aventura.', '2.485 + 1.376']
    ],
    sub: [
      ['Tirar até 10', 'Retire objetos de uma quantidade pequena.', '8 − 3'],
      ['Tirar até 20', 'Subtraia dentro de vinte, sem emprestar.', '17 − 4'],
      ['Dezenas − unidades', 'Subtraia um número pequeno sem emprestar.', '26 − 3'],
      ['Primeiro empréstimo', 'Aprenda a trocar uma dezena por dez unidades.', '32 − 5'],
      ['Duas dezenas, sem empréstimo', 'Subtraia dezenas e unidades com calma.', '78 − 34'],
      ['Duas dezenas, com empréstimo', 'É hora de emprestar uma dezena.', '63 − 27'],
      ['Centenas, sem empréstimo', 'Subtraia dezenas de um número de três algarismos.', '354 − 22'],
      ['Centenas com empréstimo', 'Resolva subtrações de três algarismos.', '453 − 127'],
      ['Empréstimo através do zero', 'Troque centenas quando houver zero nas dezenas.', '402 − 157'],
      ['Milhares sem empréstimo', 'Alinhe as quatro casas e subtraia.', '7.864 − 3.421'],
      ['Milhares com empréstimo', 'Faça trocas entre unidades, dezenas e centenas.', '6.203 − 2.748'],
      ['Missão de subtração', 'Descubra quanto restou em uma história.', '4.500 − 1.875']
    ],
    mul: [
      ['Dobro: tabuada do 2', 'Dois grupos iguais: é só dobrar.', '2 × 4'],
      ['Triplo: tabuada do 3', 'Três grupos iguais.', '3 × 4'],
      ['Tabuada do 4', 'Quatro grupos iguais.', '4 × 6'],
      ['Tabuada do 5', 'Conte de cinco em cinco.', '5 × 7'],
      ['Tabuada do 10', 'Conte de dez em dez.', '10 × 6'],
      ['Tabuadas do 6 e do 7', 'Amplie seu repertório de tabuadas.', '6 × 4'],
      ['Tabuadas do 8 e do 9', 'Pratique multiplicações um pouco maiores.', '8 × 7'],
      ['Desafio das tabuadas', 'Misture as tabuadas de 2 até 10.', '7 × 9'],
      ['Dezenas vezes unidades', 'Multiplique 20, 30 e outras dezenas.', '30 × 4'],
      ['Dois algarismos', 'Multiplique um número de dois algarismos.', '23 × 3'],
      ['Centenas redondas', 'Multiplique centenas usando padrões.', '300 × 4'],
      ['Missão de multiplicação', 'Use grupos iguais em uma história.', '18 × 5']
    ],
    div: [
      ['Metade: dividir por 2', 'Separe em dois grupos iguais.', '8 ÷ 2'],
      ['Dividir por 3', 'Separe em três grupos iguais.', '12 ÷ 3'],
      ['Dividir por 4', 'Reparta em quatro grupos iguais.', '20 ÷ 4'],
      ['Dividir por 5', 'Reparta em cinco grupos iguais.', '25 ÷ 5'],
      ['Dividir por 10', 'Reparta em dez grupos iguais.', '40 ÷ 10'],
      ['Dividir por 6 e por 7', 'Use as tabuadas que já praticou.', '42 ÷ 7'],
      ['Dividir por 8 e por 9', 'Encontre o número que falta na multiplicação.', '72 ÷ 8'],
      ['Desafio de divisões', 'Misture divisões exatas por 2 até 10.', '63 ÷ 9'],
      ['Dividir por 10', 'Divida dezenas e centenas por dez.', '240 ÷ 10'],
      ['Dividendos maiores', 'Use a tabuada para dividir números maiores.', '144 ÷ 8'],
      ['Dezenas por dezenas', 'Perceba os zeros e encontre o quociente.', '180 ÷ 30'],
      ['Missão de divisão', 'Reparta itens igualmente em uma história.', '156 ÷ 12']
    ]
  };
  const DAILY_GOAL = 20;
  const COIN_CAP_PER_DAY = 30;
  const REVIEW_COIN_CAP = 10;
  const STAGE_XP = [0, 150, 400, 800, 1400];
  const STAGE_CARE = [0, 2, 6, 12, 20];
  const STAGES = ['Filhote', 'Gatinho curioso', 'Gatinho aventureiro', 'Gatinho inteligente', 'Gatinho mestre'];
  const SCENES = [
    { id: 'room', name: 'Quarto', icon: '🛏️' },
    { id: 'garden', name: 'Jardim', icon: '🌼' },
    { id: 'park', name: 'Parque', icon: '🌳' },
    { id: 'library', name: 'Biblioteca', icon: '📚' },
    { id: 'palace', name: 'Casa especial', icon: '🏰' }
  ];
  const COLORS = [
    { id: 'white', name: 'Branco', cost: 0, hex: '#fff9ee', requiredLevel: 0 },
    { id: 'black', name: 'Preto', cost: 100, hex: '#46425c', requiredLevel: 0 },
    { id: 'orange', name: 'Laranja', cost: 150, hex: '#ffb060', requiredLevel: 2 },
    { id: 'gray', name: 'Cinza', cost: 150, hex: '#9fa8b8', requiredLevel: 3 },
    { id: 'pink', name: 'Rosa', cost: 200, hex: '#f7abc9', requiredLevel: 4 },
    { id: 'blue', name: 'Azul', cost: 200, hex: '#8ec8f4', requiredLevel: 5 },
    { id: 'purple', name: 'Roxo', cost: 250, hex: '#b39bf2', requiredLevel: 6 },
    { id: 'brown', name: 'Marrom', cost: 140, hex: '#9b6b4b', requiredLevel: 2 },
    { id: 'mint', name: 'Menta', cost: 180, hex: '#8ed9c3', requiredLevel: 3 },
    { id: 'cream', name: 'Creme', cost: 210, hex: '#f2d6a2', requiredLevel: 4 },
    { id: 'chocolate', name: 'Chocolate', cost: 220, hex: '#6e4634', requiredLevel: 4 },
    { id: 'caramel', name: 'Caramelo', cost: 240, hex: '#d99052', requiredLevel: 5 },
    { id: 'aqua', name: 'Água-marinha', cost: 280, hex: '#63ced0', requiredLevel: 6 },
    { id: 'green', name: 'Verde folha', cost: 300, hex: '#82c783', requiredLevel: 7 },
    { id: 'coral', name: 'Coral', cost: 340, hex: '#df7971', requiredLevel: 8 },
    { id: 'navy', name: 'Azul noturno', cost: 380, hex: '#445a8c', requiredLevel: 9 },
    { id: 'lavender', name: 'Lavanda', cost: 420, hex: '#c8a7ec', requiredLevel: 10 },
    { id: 'gold', name: 'Dourado', cost: 1000, hex: '#ffd15c', requiredLevel: 8 },
    { id: 'galaxy', name: 'Galáxia', cost: 1400, hex: '#6552a3', requiredLevel: 12, special: 'galaxy' },
    { id: 'rainbow', name: 'Arco-íris', cost: 1600, hex: '#f28bab', requiredLevel: 12, special: 'rainbow' }
  ];
  const ACCESSORIES = [
    { id: 'bow', name: 'Gravata borboleta', cost: 100, icon: '🎀', requiredLevel: 0 },
    { id: 'glasses', name: 'Óculos', cost: 200, icon: '👓', requiredLevel: 3 },
    { id: 'hat', name: 'Chapéu', cost: 250, icon: '🎩', requiredLevel: 4 },
    { id: 'crown', name: 'Coroa', cost: 500, icon: '👑', requiredLevel: 6 },
    { id: 'wings', name: 'Asas', cost: 750, icon: '🪽', requiredLevel: 8 },
    { id: 'scarf', name: 'Cachecol', cost: 130, icon: '🧣', requiredLevel: 1 },
    { id: 'flower', name: 'Flor', cost: 180, icon: '🌸', requiredLevel: 2 },
    { id: 'headphones', name: 'Fones', cost: 320, icon: '🎧', requiredLevel: 5 },
    { id: 'cape', name: 'Capa de herói', cost: 450, icon: '🦸', requiredLevel: 7 },
    { id: 'star', name: 'Estrela mágica', cost: 650, icon: '⭐', requiredLevel: 10 },
    { id: 'collar', name: 'Coleira colorida', cost: 90, icon: '📿', requiredLevel: 0 },
    { id: 'bell', name: 'Sininho', cost: 150, icon: '🔔', requiredLevel: 1 },
    { id: 'bandana', name: 'Bandana', cost: 190, icon: '🔻', requiredLevel: 2 },
    { id: 'partyhat', name: 'Chapéu de festa', cost: 220, icon: '🥳', requiredLevel: 3 },
    { id: 'boots', name: 'Botinhas', cost: 280, icon: '👢', requiredLevel: 4 },
    { id: 'backpack', name: 'Mochila', cost: 350, icon: '🎒', requiredLevel: 5 },
    { id: 'heartglasses', name: 'Óculos de coração', cost: 380, icon: '💞', requiredLevel: 6 },
    { id: 'moon', name: 'Pingente da lua', cost: 500, icon: '🌙', requiredLevel: 8 },
    { id: 'wizardhat', name: 'Chapéu de mago', cost: 700, icon: '🧙', requiredLevel: 10 }
  ];
  const HEADWEAR = ['hat', 'crown', 'partyhat', 'wizardhat'];
  const FOOD_ITEMS = [
    { id: 'fish', name: 'Peixinho', cost: 25, icon: '🐟', amount: 1 },
    { id: 'snacks', name: 'Pacote de petiscos', cost: 60, icon: '🍪', amount: 3 },
    { id: 'feast', name: 'Cesta de cuidados', cost: 140, icon: '🧺', amount: 8 }
  ];
  const FURNITURE = [
    { id: 'room-rug', name: 'Tapete de patinhas', scene: 'room', cost: 140, icon: '🐾', requiredLevel: 1, style: 'left:31%;bottom:8px' },
    { id: 'room-lamp', name: 'Luminária', scene: 'room', cost: 190, icon: '💡', requiredLevel: 2, style: 'right:14px;bottom:15px' },
    { id: 'room-scratcher', name: 'Arranhador', scene: 'room', cost: 280, icon: '🪵', requiredLevel: 4, style: 'right:72px;bottom:13px' },
    { id: 'garden-bench', name: 'Banco do jardim', scene: 'garden', cost: 180, icon: '🪑', requiredLevel: 2, style: 'left:13px;bottom:13px' },
    { id: 'garden-fountain', name: 'Fonte', scene: 'garden', cost: 320, icon: '⛲', requiredLevel: 5, style: 'right:14px;bottom:12px' },
    { id: 'garden-butterflies', name: 'Borboletas', scene: 'garden', cost: 230, icon: '🦋', requiredLevel: 3, style: 'left:39%;top:22px' },
    { id: 'park-picnic', name: 'Piquenique', scene: 'park', cost: 220, icon: '🧺', requiredLevel: 3, style: 'left:13px;bottom:12px' },
    { id: 'park-slide', name: 'Escorregador', scene: 'park', cost: 380, icon: '🛝', requiredLevel: 6, style: 'right:12px;bottom:13px' },
    { id: 'park-kite', name: 'Pipa', scene: 'park', cost: 260, icon: '🪁', requiredLevel: 4, style: 'right:28px;top:18px' },
    { id: 'library-globe', name: 'Globo terrestre', scene: 'library', cost: 290, icon: '🌍', requiredLevel: 5, style: 'right:14px;bottom:14px' },
    { id: 'library-desk', name: 'Mesa de estudos', scene: 'library', cost: 360, icon: '📝', requiredLevel: 6, style: 'left:32%;bottom:10px' },
    { id: 'library-plant', name: 'Planta de leitura', scene: 'library', cost: 210, icon: '🪴', requiredLevel: 4, style: 'right:70px;bottom:13px' },
    { id: 'palace-throne', name: 'Trono do mestre', scene: 'palace', cost: 700, icon: '🪑', requiredLevel: 10, style: 'left:13px;bottom:12px' },
    { id: 'palace-treasure', name: 'Baú de tesouro', scene: 'palace', cost: 850, icon: '🧰', requiredLevel: 11, style: 'right:14px;bottom:12px' },
    { id: 'palace-chandelier', name: 'Lustre de estrelas', scene: 'palace', cost: 1000, icon: '✨', requiredLevel: 12, style: 'left:45%;top:12px' }
  ];
  const ACHIEVEMENTS = [
    { id: 'first', icon: '🐾', name: 'Primeiros Passos', description: 'Acerte 10 exercícios.' },
    { id: 'hundred', icon: '🧠', name: 'Calculadora Humana', description: 'Acerte 100 exercícios.' },
    { id: 'perfect', icon: '🌟', name: 'Sem Errar', description: 'Conclua um nível com 10 acertos de primeira.' },
    { id: 'seven', icon: '📅', name: 'Estudante Dedicado', description: 'Estude em 7 dias diferentes.' },
    { id: 'fed', icon: '🐟', name: 'Primeiro Lanchinho', description: 'Alimente seu gatinho pela primeira vez.' },
    { id: 'caring', icon: '💗', name: 'Amizade de Verdade', description: 'Consiga 10 corações de cuidado.' },
    { id: 'levels10', icon: '🗺️', name: 'Grande Explorador', description: 'Conclua 10 níveis.' },
    { id: 'allops', icon: '➕', name: 'Quatro Caminhos', description: 'Conclua um nível de cada operação.' },
    { id: 'fivehundred', icon: '🚀', name: 'Mente em Ação', description: 'Resolva 500 exercícios.' },
    { id: 'shopper', icon: '🛍️', name: 'Gatinho Estiloso', description: 'Adquira 5 itens permanentes.' },
    { id: 'master', icon: '👑', name: 'Dupla de Mestres', description: 'Ajude o gatinho a chegar ao estágio máximo.' }
  ];

  const app = document.querySelector('#app');
  const announceNode = document.querySelector('#announcements');
  const ui = { view: 'home', op: null, shopTab: 'colors', preview: null, mood: 'normal', locked: false, feedback: '', showHint: false, catSpeech: '' };
  let toastTimer;
  let moodTimer;
  let audioContext;

  function defaults() {
    return {
      version: SAVE_VERSION, name: '', catName: 'Mimi', onboardingComplete: false,
      coins: 0, xp: 0, food: 2, careHearts: 0, feedDay: '', feedingsToday: 0, soundEnabled: true,
      catMood: 'normal', mistakePressure: 0, totalAnswered: 0,
      firstTryCorrect: 0, assistedCorrect: 0, errors: 0, totalSeconds: 0,
      streak: 0, bestStreak: 0,
      operationStats: Object.fromEntries(OP_IDS.map(id => [id, { answers: 0, firstTry: 0, errors: 0, seconds: 0 }])),
      unlocked: Object.fromEntries(OP_IDS.map(id => [id, 1])),
      completed: Object.fromEntries(OP_IDS.map(id => [id, []])),
      recentQuestions: Object.fromEntries(OP_IDS.map(id => [id, []])),
      purchasedColors: ['white'], purchasedAccessories: [], purchasedFurniture: [],
      equippedColor: 'white', equippedAccessories: [], placedFurniture: [], selectedScene: 'room',
      studyDays: {}, mistakeBank: [], achievements: [], session: null, lastSummary: null
    };
  }
  const finite = (value, fallback = 0, max = 1e9) =>
    typeof value === 'number' && Number.isFinite(value) && value >= 0 ? Math.min(value, max) : fallback;
  const validOp = op => Object.prototype.hasOwnProperty.call(OPERATIONS, op);
  const intRange = (n, min, max) => Math.max(min, Math.min(max, Math.trunc(finite(n, min, max))));
  const safeText = value => String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const number = n => Math.floor(n).toLocaleString('pt-BR');
  function nicknameFor(name) {
    const first = (name || '').trim().split(/\s+/)[0].normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const victoriaNames = ['vitoria', 'victoria', 'vivi', 'vic', 'vick', 'vicky', 'vi', 'toria'];
    return victoriaNames.includes(first) ? 'Caçambita' : name || 'amigo';
  }
  function childDisplayName() { return nicknameFor(state.name); }
  // Marco obtido ao concluir, com 9/10 acertos de primeira, qualquer operação.
  // Compras feitas em versões anteriores permanecem disponíveis.
  function highestCompletedLevel() {
    return Math.max(0, ...OP_IDS.flatMap(op => state.completed[op]));
  }
  function canPurchase(item, owned = false) {
    return owned || highestCompletedLevel() >= (item.requiredLevel || 0);
  }
  function dayKey() {
    const d = new Date();
    return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-');
  }
  function normalize(input) {
    if (!input || typeof input !== 'object' || Array.isArray(input) || ![1, SAVE_VERSION].includes(input.version)) throw Error('Arquivo de progresso inválido ou incompatível.');
    const st = defaults();
    const importedName = typeof input.name === 'string' ? input.name.replace(/[\u0000-\u001f]/g, '').slice(0, 28).trim() : '';
    st.name = importedName === 'Jogador' ? '' : importedName;
    st.catName = typeof input.catName === 'string' ? input.catName.replace(/[\u0000-\u001f]/g, '').slice(0, 20).trim() || 'Mimi' : 'Mimi';
    st.onboardingComplete = !!st.name && (input.onboardingComplete === true || input.version === 1);
    for (const field of ['coins', 'xp', 'totalAnswered', 'firstTryCorrect', 'assistedCorrect', 'errors', 'totalSeconds', 'streak', 'bestStreak']) st[field] = finite(input[field]);
    st.food = finite(input.food, input.version === 1 ? 2 : 0, 999);
    st.careHearts = finite(input.careHearts, input.version === 1 ? STAGE_CARE[stageByXP(st.xp) - 1] : 0, 999);
    st.feedDay = typeof input.feedDay === 'string' && /^\d{4}-\d\d-\d\d$/.test(input.feedDay) ? input.feedDay : '';
    st.feedingsToday = st.feedDay === dayKey() ? intRange(input.feedingsToday, 0, 2) : 0;
    st.soundEnabled = input.soundEnabled !== false;
    st.catMood = input.catMood === 'sad' ? 'sad' : 'normal';
    st.mistakePressure = intRange(input.mistakePressure, 0, 20);
    for (const op of OP_IDS) {
      const rawStat = input.operationStats?.[op];
      if (rawStat && typeof rawStat === 'object') for (const key of ['answers', 'firstTry', 'errors', 'seconds']) st.operationStats[op][key] = finite(rawStat[key]);
      st.unlocked[op] = intRange(input.unlocked?.[op], 1, MAX_LEVEL);
      if (Array.isArray(input.completed?.[op])) st.completed[op] = [...new Set(input.completed[op].filter(n => Number.isInteger(n) && n >= 1 && n <= MAX_LEVEL))];
      st.unlocked[op] = Math.min(MAX_LEVEL, Math.max(st.unlocked[op], 1, ...st.completed[op].map(n => n + 1)));
      if (Array.isArray(input.recentQuestions?.[op])) st.recentQuestions[op] = input.recentQuestions[op].filter(v => typeof v === 'string').slice(-15);
    }
    if (Array.isArray(input.purchasedColors)) st.purchasedColors = [...new Set(['white', ...input.purchasedColors.filter(id => COLORS.some(x => x.id === id))])];
    if (Array.isArray(input.purchasedAccessories)) st.purchasedAccessories = [...new Set(input.purchasedAccessories.filter(id => ACCESSORIES.some(x => x.id === id)))];
    if (Array.isArray(input.purchasedFurniture)) st.purchasedFurniture = [...new Set(input.purchasedFurniture.filter(id => FURNITURE.some(x => x.id === id)))];
    if (st.purchasedColors.includes(input.equippedColor)) st.equippedColor = input.equippedColor;
    if (Array.isArray(input.equippedAccessories)) st.equippedAccessories = [...new Set(input.equippedAccessories.filter(id => st.purchasedAccessories.includes(id)))];
    const savedHeadwear = st.equippedAccessories.filter(id => HEADWEAR.includes(id));
    if (savedHeadwear.length > 1) st.equippedAccessories = st.equippedAccessories.filter(id => !HEADWEAR.includes(id) || id === savedHeadwear.at(-1));
    if (Array.isArray(input.placedFurniture)) st.placedFurniture = [...new Set(input.placedFurniture.filter(id => st.purchasedFurniture.includes(id)))];
    if (Array.isArray(input.achievements)) st.achievements = [...new Set(input.achievements.filter(id => ACHIEVEMENTS.some(x => x.id === id)))];
    if (input.studyDays && typeof input.studyDays === 'object' && !Array.isArray(input.studyDays)) {
      for (const [date, item] of Object.entries(input.studyDays).slice(-730)) {
        if (!/^\d{4}-\d\d-\d\d$/.test(date) || !item || typeof item !== 'object') continue;
        st.studyDays[date] = {
          answers: finite(item.answers), minutes: finite(item.minutes, 0, 600),
          coins: finite(item.coins), xp: finite(item.xp),
          bonusClaimed: item.bonusClaimed === true,
          milestonesClaimed: Array.isArray(item.milestonesClaimed) ? item.milestonesClaimed.filter(n => n === 5 || n === 10) : [],
          missionsClaimed: Array.isArray(item.missionsClaimed) ? item.missionsClaimed.filter(id => ['answers','accuracy','variety'].includes(id)) : [],
          firstTry: finite(item.firstTry),
          operations: Array.isArray(item.operations) ? [...new Set(item.operations.filter(validOp))] : [],
          reviewAnswersRewarded: finite(item.reviewAnswersRewarded, 0, REVIEW_COIN_CAP),
          rewardFoodAnswers: finite(item.rewardFoodAnswers, 0, 1000),
          rewardedLearningAnswers: finite(item.rewardedLearningAnswers, 0, COIN_CAP_PER_DAY),
          rewardedAnswers: finite(item.rewardedAnswers, 0, COIN_CAP_PER_DAY),
          reviewRewarded: finite(item.reviewRewarded, 0, REVIEW_COIN_CAP),
          streakBonuses: Array.isArray(item.streakBonuses) ? item.streakBonuses.filter(n => n === 5 || n === 10) : []
        };
      }
    }
    if (Array.isArray(input.mistakeBank)) st.mistakeBank = input.mistakeBank.filter(q => q && validOp(q.op) && Number.isInteger(q.level) && q.level >= 1 && q.level <= MAX_LEVEL && Number.isSafeInteger(q.a) && Number.isSafeInteger(q.b) && correctAnswer(q.op, q.a, q.b) === q.answer).slice(-40).map(q => ({
      op: q.op, level: q.level, a: q.a, b: q.b, answer: q.answer,
      availableOn: typeof q.availableOn === 'string' && /^\d{4}-\d\d-\d\d$/.test(q.availableOn) ? q.availableOn : dayKey()
    }));
    if (SCENES.some(x => x.id === input.selectedScene) && SCENES.findIndex(x => x.id === input.selectedScene) < stage(st.xp, st.careHearts)) st.selectedScene = input.selectedScene;
    if (input.session && isSessionValid(input.session)) {
      const s = input.session;
      st.session = {
        type: s.type, operation: s.operation, level: s.level,
        questions: s.questions.map(q => ({
          op: q.op, level: q.level, a: q.a, b: q.b, answer: q.answer,
          format: ['standard','choice','truefalse'].includes(q.format) ? q.format : 'standard',
          choices: Array.isArray(q.choices) ? q.choices.filter(Number.isSafeInteger).slice(0, 4) : [],
          shownAnswer: Number.isSafeInteger(q.shownAnswer) ? q.shownAnswer : q.answer,
          reviewMistake: q.reviewMistake === true
        })),
        index: s.index, firstTryCorrect: intRange(s.firstTryCorrect, 0, s.questions.length),
        results: Array.isArray(s.results) ? s.results.slice(0, s.index).map(Boolean) : [],
        attempts: intRange(s.attempts, 0, 30), hintUsed: !!s.hintUsed,
        answerText: typeof s.answerText === 'string' && /^\d{0,9}$/.test(s.answerText) ? s.answerText : '',
        startedAt: finite(s.startedAt, Date.now(), 1e14),
        questionStartedAt: Date.now(), coinsEarned: finite(s.coinsEarned), xpEarned: finite(s.xpEarned)
      };
    }
    if (input.lastSummary && typeof input.lastSummary === 'object') {
      const sm = input.lastSummary;
      if (['daily', 'level'].includes(sm.type) && validOp(sm.operation)) {
        st.lastSummary = {
          type: sm.type, operation: sm.operation, level: intRange(sm.level, 1, MAX_LEVEL),
          score: finite(sm.score, 0, 20), total: finite(sm.total, 10, 20),
          passed: !!sm.passed, newLevel: !!sm.newLevel,
          coins: finite(sm.coins), xp: finite(sm.xp), elapsed: finite(sm.elapsed),
          newItems: Array.isArray(sm.newItems) ? sm.newItems.filter(id => [...COLORS, ...ACCESSORIES, ...(FURNITURE_ENABLED ? FURNITURE : [])].some(x => x.id === id)).slice(0, 30) : []
        };
      }
    }
    st.version = SAVE_VERSION;
    return st;
  }
  function isSessionValid(s) {
    if (!s || !['daily', 'level'].includes(s.type) || !validOp(s.operation) || !Number.isInteger(s.level) || s.level < 1 || s.level > MAX_LEVEL) return false;
    if (!Array.isArray(s.questions) || s.questions.length !== (s.type === 'daily' ? DAILY_GOAL : 10)) return false;
    if (!Number.isInteger(s.index) || s.index < 0 || s.index >= s.questions.length) return false;
    return s.questions.every(q => validOp(q.op) && Number.isInteger(q.level) && q.level >= 1 && q.level <= MAX_LEVEL && Number.isSafeInteger(q.a) && Number.isSafeInteger(q.b) && q.a >= 0 && q.b >= 0 && Number.isSafeInteger(q.answer) && q.answer >= 0 && q.answer <= 1e9 && correctAnswer(q.op, q.a, q.b) === q.answer && (!q.format || ['standard','choice','truefalse'].includes(q.format)) && (q.format !== 'choice' || (Array.isArray(q.choices) && q.choices.length >= 2 && q.choices.includes(q.answer) && q.choices.every(Number.isSafeInteger))) && (q.format !== 'truefalse' || Number.isSafeInteger(q.shownAnswer)));
  }
  function load() {
    try { const raw = localStorage.getItem(KEY); return raw ? normalize(JSON.parse(raw)) : defaults(); }
    catch (err) { console.warn('Progresso local não pôde ser recuperado:', err); return defaults(); }
  }
  let state = load();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (err) { console.warn('Falha ao salvar:', err); } };
  const today = () => {
    const id = dayKey();
    if (!state.studyDays[id]) state.studyDays[id] = { answers: 0, minutes: 0, coins: 0, xp: 0, bonusClaimed: false, milestonesClaimed: [], missionsClaimed: [], firstTry: 0, operations: [], reviewAnswersRewarded: 0, rewardFoodAnswers: 0, rewardedLearningAnswers: 0, rewardedAnswers: 0, reviewRewarded: 0, streakBonuses: [] };
    if (!Array.isArray(state.studyDays[id].milestonesClaimed)) state.studyDays[id].milestonesClaimed = [];
    if (!Array.isArray(state.studyDays[id].missionsClaimed)) state.studyDays[id].missionsClaimed = [];
    if (!Array.isArray(state.studyDays[id].operations)) state.studyDays[id].operations = [];
    for (const key of ['firstTry','reviewAnswersRewarded','rewardFoodAnswers','rewardedLearningAnswers']) if (!Number.isFinite(state.studyDays[id][key])) state.studyDays[id][key] = 0;
    return state.studyDays[id];
  };
  function stageByXP(xp) { return Math.min(STAGES.length, STAGE_XP.filter(t => xp >= t).length); }
  function stageByCare(hearts) { return Math.min(STAGES.length, STAGE_CARE.filter(t => hearts >= t).length); }
  function stage(xp, hearts) { return Math.min(stageByXP(xp), stageByCare(hearts)); }
  const stageNumber = () => stage(state.xp, state.careHearts);
  function xpInfo() {
    const stg = stageNumber();
    if (stg === 5) return { fraction: 100, text: 'Evolução máxima alcançada!' };
    const a = STAGE_XP[stg - 1], b = STAGE_XP[stg];
    if (state.xp >= b) return { fraction: 100, text: 'Meta de XP concluída ✓' };
    return { fraction: ((state.xp - a) / (b - a)) * 100, text: `${number(state.xp - a)} / ${number(b - a)} XP` };
  }
  function careInfo() {
    const stg = stageNumber();
    if (stg === 5) return { fraction: 100, text: `${number(state.careHearts)} corações` };
    const a = STAGE_CARE[stg - 1], b = STAGE_CARE[stg];
    if (state.careHearts >= b) return { fraction: 100, text: 'Meta de cuidado concluída ✓' };
    return { fraction: ((state.careHearts - a) / (b - a)) * 100, text: `${number(state.careHearts - a)} / ${number(b - a)} corações` };
  }
  function correctAnswer(op, a, b) {
    switch (op) {
      case 'add': return a + b;
      case 'sub': return a - b;
      case 'mul': return a * b;
      case 'div': return b !== 0 && a % b === 0 ? a / b : NaN;
      default: return NaN;
    }
  }
  const rand = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
  const pick = values => values[rand(0, values.length - 1)];
  function singleQuestion(op, lv) {
    if (!validOp(op) || !Number.isInteger(lv) || lv < 1 || lv > MAX_LEVEL) throw new Error('Operação ou nível inválido.');
    let a, b;
    if (op === 'add') {
      switch (lv) {
        case 1: a = rand(0, 5); b = rand(0, 5); break; // soma até 10
        case 2: a = rand(4, 10); b = rand(1, 10); break; // soma até 20
        case 3: a = 10 * rand(1, 6) + rand(0, 8); b = rand(1, 9 - a % 10); break; // sem vai um
        case 4: a = 10 * rand(1, 6) + rand(1, 9); b = rand(10 - a % 10, 9); break; // vai um
        case 5: {
          const t1 = rand(1, 5), t2 = rand(1, 8 - t1), u1 = rand(0, 9);
          a = 10 * t1 + u1; b = 10 * t2 + rand(0, 9 - u1); break;
        }
        case 6: {
          const t1 = rand(1, 4), t2 = rand(1, 4), u1 = rand(1, 9);
          a = 10 * t1 + u1; b = 10 * t2 + rand(10 - u1, 9); break;
        }
        case 7: {
          const t1 = rand(0, 7), u1 = rand(0, 9);
          a = 100 * rand(1, 5) + 10 * t1 + u1;
          b = 10 * rand(1, 9 - t1) + rand(0, 9 - u1); break;
        }
        case 8: {
          const u1 = rand(1, 9);
          a = 100 * rand(1, 4) + 10 * rand(0, 7) + u1;
          b = 100 * rand(1, 4) + 10 * rand(0, 7) + rand(10 - u1, 9); break;
        }
        case 9: {
          const d = [rand(1, 6), rand(0, 8), rand(0, 8), rand(0, 8)];
          a = 1000*d[0] + 100*d[1] + 10*d[2] + d[3];
          b = 1000*rand(1, 8-d[0]) + 100*rand(0, 9-d[1]) + 10*rand(0, 9-d[2]) + rand(0, 9-d[3]); break;
        }
        case 10: {
          const u1 = rand(1, 9);
          a = rand(120, 480) * 10 + u1;
          b = rand(110, 450) * 10 + rand(10-u1, 9); break;
        }
        case 11: a = rand(2, 60) * 100; b = rand(1, 30) * 100; break;
        default: a = rand(1000, 6000); b = rand(500, 3500); break;
      }
    } else if (op === 'sub') {
      switch (lv) {
        case 1: a = rand(1, 10); b = rand(0, Math.min(a, 5)); break;
        case 2: {
          a = rand(10, 20);
          const options = [...Array.from({length: a % 10 + 1}, (_, i) => i), 10];
          b = pick(options); break;
        }
        case 3: a = 10 * rand(2, 8) + rand(1, 9); b = rand(1, a % 10); break;
        case 4: a = 10 * rand(2, 8) + rand(0, 8); b = rand(a % 10 + 1, 9); break;
        case 5: a = 10 * rand(3, 9) + rand(0, 9);
          b = 10 * rand(1, Math.floor(a / 10) - 1) + rand(0, a % 10); break;
        case 6: a = 10 * rand(3, 9) + rand(0, 8);
          b = 10 * rand(1, Math.floor(a / 10) - 1) + rand(a % 10 + 1, 9); break;
        case 7: a = 100 * rand(1, 8) + 10 * rand(1, 9) + rand(0, 9);
          b = 10 * rand(1, Math.floor(a % 100 / 10)) + rand(0, a % 10); break;
        case 8: {
          const h = rand(2, 9), t = rand(1, 8), u = rand(0, 8);
          a = 100 * h + 10 * t + u;
          b = 100 * rand(1, h - 1) + 10 * rand(0, t - 1) + rand(u + 1, 9); break;
        }
        case 9: {
          const h = rand(2, 9); a = 100*h + rand(0, 4);
          b = 100*rand(1, h-1) + 10*rand(1, 9) + rand(5, 9); break;
        }
        case 10: {
          const d = [rand(3,9), rand(1,9), rand(1,9), rand(1,9)];
          a = 1000*d[0] + 100*d[1] + 10*d[2] + d[3];
          b = 1000*rand(1,d[0]-1) + 100*rand(0,d[1]) + 10*rand(0,d[2]) + rand(0,d[3]); break;
        }
        case 11:
          do { a = rand(2500, 9500); b = rand(1000, a - 1); }
          while (a % 10 >= b % 10 && Math.floor(a / 10) % 10 >= Math.floor(b / 10) % 10);
          break;
        default: a = rand(2500, 9000); b = rand(500, a - 1); break;
      }
    } else if (op === 'mul') {
      if (lv <= 8) {
        const factors = [[2], [3], [4], [5], [10], [6, 7], [8, 9], [2, 3, 4, 5, 6, 7, 8, 9, 10]][lv - 1];
        a = pick(factors); b = rand(1, 10);
        if (Math.random() < 0.5) [a, b] = [b, a];
      } else if (lv === 9) { a = rand(2, 9) * 10; b = rand(2, 9); }
      else if (lv === 10) { a = rand(11, 35); b = rand(2, 9); }
      else if (lv === 11) { a = rand(1, 9) * 100; b = rand(2, 9); }
      else { a = rand(12, 45); b = rand(2, 9); }
    } else {
      if (lv <= 8) {
        const divisors = [[2], [3], [4], [5], [10], [6, 7], [8, 9], [2, 3, 4, 5, 6, 7, 8, 9, 10]][lv - 1];
        b = pick(divisors); a = b * rand(1, 10);
      } else if (lv === 9) { b = 10; a = b * rand(2, 50); }
      else if (lv === 10) { b = rand(2, 9); a = b * rand(11, 30); }
      else if (lv === 11) { b = rand(2, 9) * 10; a = b * rand(2, 10); }
      else { b = rand(2, 12); a = b * rand(11, 30); }
    }
    return { op, level: lv, a, b, answer: correctAnswer(op, a, b) };
  }

  function decorateQuestion(q) {
    const tutorial = ((q.op === 'add' || q.op === 'sub') && q.level <= 6) || ((q.op === 'mul' || q.op === 'div') && q.level <= 3);
    if (tutorial || Math.random() < .52) return { ...q, format: 'standard' };
    if (Math.random() < .58) {
      const choices = new Set([q.answer]);
      const offsets = [1, -1, 2, -2, 10, -10, 5, -5];
      for (const offset of offsets.sort(() => Math.random() - .5)) {
        const value = q.answer + offset;
        if (value >= 0) choices.add(value);
        if (choices.size === 3) break;
      }
      return { ...q, format: 'choice', choices: [...choices].sort(() => Math.random() - .5) };
    }
    const truthful = Math.random() < .5;
    const delta = pick([1, 2, 3]) * (Math.random() < .5 ? -1 : 1);
    return { ...q, format: 'truefalse', shownAnswer: truthful ? q.answer : Math.max(0, q.answer + delta) };
  }

  const questionKey = q => `${q.level}:${q.a}:${q.op}:${q.b}`;
  function generateQuestion(op, level, used = new Set()) {
    let q;
    const history = new Set(state.recentQuestions[op]);
    for (let i = 0; i < 90; i++) {
      q = singleQuestion(op, level);
      const key = questionKey(q);
      if (!used.has(key) && (i > 35 || !history.has(key))) break;
    }
    used.add(questionKey(q));
    state.recentQuestions[op].push(questionKey(q));
    state.recentQuestions[op] = state.recentQuestions[op].slice(-15);
    return decorateQuestion(q);
  }
  function nextDayKey() {
    const d = new Date(); d.setDate(d.getDate() + 1);
    return [d.getFullYear(), String(d.getMonth()+1).padStart(2,'0'), String(d.getDate()).padStart(2,'0')].join('-');
  }
  function recordMistake(q) {
    const key = questionKey(q);
    const existing = state.mistakeBank.find(item => questionKey(item) === key);
    if (existing) existing.availableOn = nextDayKey();
    else state.mistakeBank.push({ op: q.op, level: q.level, a: q.a, b: q.b, answer: q.answer, availableOn: nextDayKey() });
    state.mistakeBank = state.mistakeBank.slice(-40);
  }
  function reviewMistakeQuestion(used) {
    const available = state.mistakeBank.filter(q => q.availableOn <= dayKey() && !used.has(questionKey(q)));
    if (!available.length) return null;
    const base = pick(available);
    used.add(questionKey(base));
    return { ...decorateQuestion({ op: base.op, level: base.level, a: base.a, b: base.b, answer: base.answer }), reviewMistake: true };
  }
  function weakestOp() {
    const weights = OP_IDS.map(op => {
      const x = state.operationStats[op];
      return 1 + 4 * (x.answers === 0 ? .35 : (1 - x.firstTry / x.answers));
    });
    let p = Math.random() * weights.reduce((a, b) => a + b, 0);
    for (let i = 0; i < OP_IDS.length; i++) { p -= weights[i]; if (p <= 0) return OP_IDS[i]; }
    return OP_IDS[3];
  }
  function beginSession(type, op, level) {
    if (!validOp(op) || !['level', 'daily'].includes(type)) return;
    const effectiveLevel = type === 'level' ? intRange(level, 1, state.unlocked[op]) : 1;
    const seen = new Set();
    const bossLevel = type === 'level' && [4, 8, 12].includes(effectiveLevel);
    const bossStart = bossLevel ? effectiveLevel - 3 : effectiveLevel;
    const qs = Array.from({ length: type === 'daily' ? DAILY_GOAL : 10 }, () => {
      if (type === 'daily' && Math.random() < .3) {
        const reviewQuestion = reviewMistakeQuestion(seen);
        if (reviewQuestion) return reviewQuestion;
      }
      const chosen = type === 'daily' ? weakestOp() : op;
      const current = type === 'daily' ? state.unlocked[chosen] : effectiveLevel;
      // Most reinforcement happens at the current level; sometimes revisit prior material.
      const lv = bossLevel && Math.random() < .45 ? rand(bossStart, effectiveLevel) : type === 'daily' && current > 1 && Math.random() < .27 ? current - 1 : current;
      return generateQuestion(chosen, lv, seen);
    });
    state.session = { type, operation: op, level: effectiveLevel, questions: qs,
      index: 0, firstTryCorrect: 0, results: [], attempts: 0, hintUsed: false,
      answerText: '', startedAt: Date.now(), questionStartedAt: Date.now(),
      coinsEarned: 0, xpEarned: 0 };
    ui.view = 'play'; ui.feedback = ''; ui.showHint = false; ui.locked = false; ui.mood = 'normal';
    save(); render();
  }
  function earnCoins(amount) {
    state.coins += amount;
    today().coins += amount;
    if (state.session) state.session.coinsEarned += amount;
  }
  function earnXP(amount) {
    const before = stageNumber();
    state.xp += amount;
    today().xp += amount;
    if (state.session) state.session.xpEarned += amount;
    if (stageNumber() > before) {
      ui.mood = 'celebrate';
      message(`Seu gatinho evoluiu: ${STAGES[stageNumber() - 1]}! 🎉`);
    }
  }
  function catPhrase(kind) {
    const child = childDisplayName();
    if (kind === 'home' && state.catMood === 'sad') return `Eu fiquei com saudade, ${child}. Está tudo bem parar ou errar; quando quiser, tentamos juntos!`;
    const phrases = {
      correct: [
        `Mandou muito bem, ${child}!`,
        `Uau, ${child}! Que ótima estratégia!`,
        `${child}, seu esforço está dando resultado!`,
        `Acertou! Eu sabia que você conseguiria, ${child}!`
      ],
      retry: [
        `Quase, ${child}! Vamos tentar mais uma vez?`,
        `Não tem problema errar, ${child}. Eu estou com você!`,
        `${child}, respire e tente por outro caminho.`,
        `Boa tentativa! Vamos olhar a dica juntos, ${child}?`
      ],
      streak: [
        `Incrível, ${child}! Sua sequência está crescendo!`,
        `${child}, você está voando! Continue assim!`
      ],
      home: [
        `Oi, ${child}! Vamos viver uma aventura matemática?`,
        `Que bom ver você, ${child}! Eu estava esperando!`,
        `${child}, hoje podemos aprender e brincar juntos!`
      ]
    };
    return pick(phrases[kind] || phrases.home);
  }
  function checkAchievements(isPerfect = false) {
    const ids = [];
    if (state.totalAnswered >= 10) ids.push('first');
    if (state.totalAnswered >= 100) ids.push('hundred');
    if (isPerfect) ids.push('perfect');
    if (Object.values(state.studyDays).filter(x => x.answers > 0).length >= 7) ids.push('seven');
    if (state.careHearts >= 1) ids.push('fed');
    if (state.careHearts >= 10) ids.push('caring');
    if (OP_IDS.reduce((n, op) => n + state.completed[op].length, 0) >= 10) ids.push('levels10');
    if (OP_IDS.every(op => state.completed[op].length > 0)) ids.push('allops');
    if (state.totalAnswered >= 500) ids.push('fivehundred');
    if (state.purchasedColors.length + state.purchasedAccessories.length + state.purchasedFurniture.length >= 6) ids.push('shopper');
    if (stageNumber() === STAGES.length) ids.push('master');
    for (const id of ids) if (!state.achievements.includes(id)) {
      state.achievements.push(id);
      message(`Conquista: ${ACHIEVEMENTS.find(x => x.id === id).name}! 🏆`);
    }
  }
  function message(text, duration = 2400) {
    announceNode.textContent = text;
    document.querySelector('.toast')?.remove();
    const node = document.createElement('div');
    node.className = 'toast'; node.setAttribute('role', 'status'); node.textContent = text;
    app.append(node);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => node.remove(), duration);
  }
  function playSound(kind) {
    if (!state.soundEnabled) return;
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) return;
    try {
      audioContext ||= new AudioCtor();
      const notes = kind === 'correct' ? [523, 659] : kind === 'wrong' ? [220, 185] : kind === 'reward' ? [523, 659, 784] : [392];
      notes.forEach((frequency, index) => {
        const oscillator = audioContext.createOscillator(), gain = audioContext.createGain();
        oscillator.type = kind === 'wrong' ? 'triangle' : 'sine'; oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(.0001, audioContext.currentTime + index * .09);
        gain.gain.exponentialRampToValueAtTime(.12, audioContext.currentTime + index * .09 + .01);
        gain.gain.exponentialRampToValueAtTime(.0001, audioContext.currentTime + index * .09 + .13);
        oscillator.connect(gain).connect(audioContext.destination);
        oscillator.start(audioContext.currentTime + index * .09); oscillator.stop(audioContext.currentTime + index * .09 + .14);
      });
    } catch (err) { console.warn('Som indisponível:', err); }
  }
  function speakQuestion() {
    const q = state.session?.questions[state.session.index];
    const SpeechCtor = window.SpeechSynthesisUtterance;
    if (!q || !window.speechSynthesis || !SpeechCtor) return message('A leitura em voz alta não está disponível neste navegador.');
    window.speechSynthesis.cancel();
    const spokenOp = { add: 'mais', sub: 'menos', mul: 'vezes', div: 'dividido por' }[q.op];
    let text;
    if (q.format === 'truefalse') text = `${state.catName} respondeu: ${q.a} ${spokenOp} ${q.b} é igual a ${q.shownAnswer}. A resposta está certa?`;
    else if (q.level === 12) {
      const stories = {
        add: `${state.catName} juntou ${q.a} estrelinhas e ganhou mais ${q.b}. Quantas tem agora?`,
        sub: `${state.catName} tinha ${q.a} petiscos e compartilhou ${q.b}. Quantos sobraram?`,
        mul: `Há ${q.a} caixas com ${q.b} brinquedos em cada uma. Quantos há ao todo?`,
        div: `${state.catName} vai repartir ${q.a} peixinhos em ${q.b} potes. Quantos ficam em cada pote?`
      };
      text = stories[q.op];
    } else text = `Quanto é ${q.a} ${spokenOp} ${q.b}?`;
    const utterance = new SpeechCtor(text); utterance.lang = 'pt-BR'; utterance.rate = .88; utterance.pitch = 1.08;
    window.speechSynthesis.speak(utterance);
  }
  function responseText(s) {
    const q = s.questions[s.index];
    if (!q) return;
    if (q.op === 'add') return q.level <= 2 ? `Conte a partir de ${q.a} e dê mais ${q.b} passos.` : `Some primeiro as unidades: ${q.a % 10} + ${q.b % 10}. Depois, veja as dezenas.`;
    if (q.op === 'sub') return q.level <= 2 ? `Comece com ${q.a} e tire ${q.b}, um de cada vez.` : `Observe as unidades: dá para tirar ${q.b % 10} de ${q.a % 10}? Se não, troque uma dezena por 10 unidades.`;
    if (q.op === 'mul') return `Multiplicar é juntar ${q.a} grupos de ${q.b}. Você pode somar ${q.b} várias vezes.`;
    return `Imagine ${q.a} objetos divididos em ${q.b} grupos iguais. Quantos ficam em cada grupo?`; 
  }
  function explanation(q) {
    if (q.op === 'div') return `${q.a} ÷ ${q.b} = ${q.answer}, pois ${q.b} × ${q.answer} = ${q.a}.`;
    if (q.op === 'mul' && q.b <= 8 && q.a <= 30) return `${q.a} × ${q.b} é ${q.b} grupos de ${q.a}: resultado ${q.answer}.`;
    return `${q.a} ${OPERATIONS[q.op].symbol} ${q.b} = ${q.answer}.`;
  }
  function problemMarkup(q) {
    if (q.format === 'truefalse') {
      return `<div class="cat-challenge"><span>🐱 ${safeText(state.catName)} respondeu:</span><div class="problem">${number(q.a)} ${OPERATIONS[q.op].symbol} ${number(q.b)} = ${number(q.shownAnswer)}</div><strong>Essa resposta está certa?</strong></div>`;
    }
    if (q.level !== 12) return `<div class="problem" aria-label="Quanto é ${q.a} ${OPERATIONS[q.op].label.toLowerCase()} ${q.b}?">${number(q.a)} ${OPERATIONS[q.op].symbol} ${number(q.b)}</div>`;
    const cat = safeText(state.catName);
    const stories = {
      add: `${cat} juntou ${number(q.a)} estrelinhas e ganhou mais ${number(q.b)}. Quantas estrelinhas tem agora?`,
      sub: `${cat} tinha ${number(q.a)} petiscos e compartilhou ${number(q.b)}. Quantos sobraram?`,
      mul: `Há ${number(q.a)} caixas com ${number(q.b)} brinquedos em cada uma. Quantos brinquedos há ao todo?`,
      div: `${cat} vai repartir ${number(q.a)} peixinhos igualmente em ${number(q.b)} potes. Quantos ficam em cada pote?`
    };
    return `<div class="story-problem"><span aria-hidden="true">📖</span>${stories[q.op]}</div>`;
  }
  function learningAid(q) {
    if ((q.op === 'add' || q.op === 'sub') && q.level <= 2) {
      const dots = n => Array.from({length: Math.min(n, 20)}, () => '<span>●</span>').join('');
      return `<div class="visual-aid"><strong>Vamos representar:</strong><div class="dot-row"><span class="dot-group">${dots(q.a)}</span><b>${OPERATIONS[q.op].symbol}</b><span class="dot-group alt">${dots(q.b)}</span></div></div>`;
    }
    if ((q.op === 'add' || q.op === 'sub') && q.level <= 6) {
      const width = Math.max(2, String(Math.max(q.a, q.b)).length);
      const headers = ['M','C','D','U'].slice(4-width);
      const digits = n => String(n).padStart(width, '0').split('').map(x => `<span>${x}</span>`).join('');
      return `<div class="place-value-aid"><strong>Alinhe as casas</strong><div class="place-grid" style="--places:${width}"><i></i>${headers.map(x => `<em>${x}</em>`).join('')}<b></b>${digits(q.a)}<b>${OPERATIONS[q.op].symbol}</b>${digits(q.b)}</div><small>${headers.map(x => ({M:'milhar',C:'centena',D:'dezena',U:'unidade'}[x])).join(' · ')}</small></div>`;
    }
    if (q.op === 'mul' && q.level <= 3) {
      const groups = Math.min(q.a, q.b), each = Math.max(q.a, q.b);
      return `<div class="visual-aid"><strong>${groups} grupos de ${each}</strong><div class="object-groups">${Array.from({length:groups}, () => `<span>${'●'.repeat(each)}</span>`).join('')}</div></div>`;
    }
    if (q.op === 'div' && q.level <= 3) {
      return `<div class="visual-aid"><strong>Reparta em ${q.b} grupos iguais</strong><div class="object-groups">${Array.from({length:q.b}, () => `<span>🥣 ${'●'.repeat(q.answer)}</span>`).join('')}</div></div>`;
    }
    return '';
  }
  function refreshAnswer() {
    const el = document.querySelector('#answer-display');
    if (!el || !state.session) return;
    el.textContent = state.session.answerText || '?';
    el.classList.toggle('empty', !state.session.answerText);
  }
  function typeKey(key) {
    const s = state.session;
    if (!s || ui.view !== 'play' || ui.locked) return;
    if (key === 'submit') { submitAnswer(); return; }
    if (key === 'back') s.answerText = s.answerText.slice(0, -1);
    else if (key === 'clear') s.answerText = '';
    else if (/^[0-9]$/.test(key) && s.answerText.length < 9) s.answerText = (s.answerText + key).replace(/^0+(?=\d)/, '');
    save(); refreshAnswer();
    const submit = app.querySelector('[data-key="submit"]');
    if (submit) submit.disabled = !s.answerText;
  }
  function submitAnswer() {
    const s = state.session;
    if (!s || ui.locked || !/^\d{1,9}$/.test(s.answerText)) return;
    const q = s.questions[s.index];
    const given = Number(s.answerText);
    if (given !== q.answer) {
      s.attempts += 1; state.errors += 1; state.operationStats[q.op].errors += 1;
      state.mistakePressure = Math.min(20, state.mistakePressure + 1);
      if (state.mistakePressure >= 3) state.catMood = 'sad';
      if (s.attempts === 1) { state.streak = 0; recordMistake(q); }
      s.answerText = '';
      ui.mood = state.catMood === 'sad' ? 'sad' : 'curious';
      ui.feedback = state.catMood === 'sad' ? `${state.catName} ficou preocupado. Vamos abrir a dica e tentar juntos?` : catPhrase('retry');
      ui.catSpeech = ui.feedback;
      ui.showHint = true;
      playSound('wrong'); save(); render();
      return;
    }
    const first = s.attempts === 0 && !s.hintUsed;
    const seconds = Math.min(300, Math.max(0, (Date.now() - s.questionStartedAt) / 1000));
    const stat = state.operationStats[q.op];
    stat.answers += 1; stat.seconds += seconds;
    state.totalAnswered += 1; state.totalSeconds += seconds;
    const d = today(); d.answers += 1; d.minutes += seconds / 60;
    if (!d.operations.includes(q.op)) d.operations.push(q.op);
    if (first) {
      s.firstTryCorrect += 1; stat.firstTry += 1;
      state.firstTryCorrect += 1;
      d.firstTry += 1;
      state.streak += 1;
      state.bestStreak = Math.max(state.bestStreak, state.streak);
    } else { state.assistedCorrect += 1; state.streak = 0; }
    s.results.push(first);
    if (q.reviewMistake && first) state.mistakeBank = state.mistakeBank.filter(item => questionKey(item) !== questionKey(q));
    const repeatingLevel = s.type === 'level' && state.completed[q.op].includes(q.level);
    const learningRewardEligible = d.rewardedLearningAnswers < COIN_CAP_PER_DAY && (!repeatingLevel || d.reviewAnswersRewarded < REVIEW_COIN_CAP);
    if (learningRewardEligible) {
      d.rewardedLearningAnswers += 1;
      if (repeatingLevel) d.reviewAnswersRewarded += 1;
    }
    const coinEligible = first && learningRewardEligible && d.rewardedAnswers < COIN_CAP_PER_DAY && (!repeatingLevel || d.reviewRewarded < REVIEW_COIN_CAP);
    let gained = 0;
    let foodGained = 0;
    if (coinEligible) {
      earnCoins(5); gained += 5; d.rewardedAnswers += 1;
      if (repeatingLevel) d.reviewRewarded += 1;
      if (state.streak >= 5 && !d.streakBonuses.includes(5)) { earnCoins(10); gained += 10; d.streakBonuses.push(5); }
      if (state.streak >= 10 && !d.streakBonuses.includes(10)) { earnCoins(20); gained += 20; d.streakBonuses.push(10); }
    }
    for (const [goal, reward] of [[5, 10], [10, 20]]) {
      if (d.answers >= goal && !d.milestonesClaimed.includes(goal)) {
        d.milestonesClaimed.push(goal); earnCoins(reward); gained += reward;
      }
    }
    const missionStates = [
      ['answers', d.answers >= 5],
      ['accuracy', d.firstTry >= 4],
      ['variety', d.operations.length >= 2]
    ];
    for (const [id, complete] of missionStates) if (complete && !d.missionsClaimed.includes(id)) {
      d.missionsClaimed.push(id); earnCoins(15); gained += 15;
    }
    if (learningRewardEligible) {
      d.rewardFoodAnswers += 1;
      if (d.rewardFoodAnswers % 5 === 0) { state.food += 1; foodGained += 1; }
      earnXP(repeatingLevel ? 1 : first ? 5 : 2);
    }
    if (d.answers >= DAILY_GOAL && !d.bonusClaimed) {
      d.bonusClaimed = true;
      earnCoins(50); gained += 50;
      state.food += 2; foodGained += 2;
    }
    checkAchievements();
    s.index += 1;
    const perfectFinish = s.index >= s.questions.length && isPerfectScore(s.firstTryCorrect, s.questions.length);
    s.answerText = ''; s.attempts = 0; s.hintUsed = false; s.questionStartedAt = Date.now();
    ui.locked = true; ui.mood = state.catMood === 'sad' && !perfectFinish ? 'sad' : 'celebrate'; ui.feedback = !learningRewardEligible ? 'Revisão concluída! As recompensas de hoje já foram recebidas.' : state.streak >= 5 ? catPhrase('streak') : catPhrase('correct'); ui.catSpeech = ui.feedback; ui.showHint = false;
    const display = document.querySelector('#answer-display');
    if (display) { display.textContent = String(given); display.classList.remove('empty'); display.classList.add('correct'); }
    const feedback = document.querySelector('#feedback');
    if (feedback) { feedback.className = 'feedback good'; feedback.textContent = !learningRewardEligible ? 'Correto! Você pode continuar treinando, mas as recompensas de hoje chegaram ao limite. ✓' : `Correto! ${gained ? `+${gained} 🪙` : 'Continue assim!'}${foodGained ? ` +${foodGained} 🐟` : ''} ✨`; }
    playSound('correct');
    if (state.catMood !== 'sad' || perfectFinish) document.querySelector('.game-cat-note .cat-svg')?.classList.add('celebrate');
    document.querySelectorAll('.key').forEach(b => b.disabled = true);
    const finished = s.index >= s.questions.length;
    if (finished) finishSession();
    save();
    setTimeout(() => { ui.locked = false; ui.feedback = ''; ui.mood = 'normal'; render(); }, 600);
  }
  const isPerfectScore = (firstTryCorrect, total) => total > 0 && firstTryCorrect === total;
  function finishSession() {
    const s = state.session;
    if (!s) return;
    const passed = s.type === 'level' && s.firstTryCorrect >= 9;
    const perfect = isPerfectScore(s.firstTryCorrect, s.questions.length);
    if (perfect) cheerUpCat(false);
    let newLevel = false;
    const previousBestLevel = highestCompletedLevel();
    if (passed && !state.completed[s.operation].includes(s.level)) {
      newLevel = true;
      state.completed[s.operation].push(s.level);
      state.unlocked[s.operation] = Math.max(state.unlocked[s.operation], Math.min(MAX_LEVEL, s.level + 1));
      const bossBonus = [4, 8, 12].includes(s.level);
      earnCoins(bossBonus ? 70 : 30); earnXP(bossBonus ? 45 : 25); state.food += bossBonus ? 4 : 2;
    }
    const currentBestLevel = highestCompletedLevel();
    const newItems = currentBestLevel > previousBestLevel
      ? [...COLORS, ...ACCESSORIES, ...(FURNITURE_ENABLED ? FURNITURE : [])].filter(item => item.requiredLevel > previousBestLevel && item.requiredLevel <= currentBestLevel).map(item => item.id)
      : [];
    checkAchievements(passed && s.firstTryCorrect === 10);
    state.lastSummary = { type: s.type, operation: s.operation, level: s.level,
      score: s.firstTryCorrect, total: s.questions.length, passed, newLevel, newItems,
      coins: s.coinsEarned, xp: s.xpEarned,
      elapsed: Math.min(3600, (Date.now() - s.startedAt) / 1000) };
    state.session = null;
    ui.view = 'summary';
  }
  // An accessible, in-game confirmation replaces the browser's file:// dialog.
  function askConfirmation(title, description, acceptLabel = 'Confirmar', danger = false, cancelLabel = 'Cancelar') {
    return new Promise(resolve => {
      const dialog = document.createElement('dialog');
      dialog.className = 'confirm-dialog';
      dialog.setAttribute('aria-labelledby', 'confirm-title');
      dialog.setAttribute('aria-describedby', 'confirm-description');
      dialog.innerHTML = `<div class="confirm-icon" aria-hidden="true">${danger ? '⚠️' : '🐾'}</div>
        <h2 id="confirm-title">${safeText(title)}</h2>
        <p id="confirm-description">${safeText(description)}</p>
        <div class="confirm-actions">
          <button type="button" class="btn btn-secondary" data-choice="cancel">${safeText(cancelLabel)}</button>
          <button type="button" class="btn ${danger ? 'btn-danger' : 'btn-primary'}" data-choice="accept">${safeText(acceptLabel)}</button>
        </div>`;
      document.body.appendChild(dialog);
      dialog.addEventListener('click', event => {
        const choice = event.target.closest('[data-choice]');
        if (choice) dialog.close(choice.dataset.choice);
      });
      dialog.addEventListener('close', () => {
        const accepted = dialog.returnValue === 'accept';
        dialog.remove();
        resolve(accepted);
      }, { once: true });
      dialog.showModal();
      dialog.querySelector('[data-choice="cancel"]').focus();
    });
  }
  async function abandon() {
    if (!state.session) return navigate('home');
    const accepted = await askConfirmation('Sair do exercício?',
      'Sua sequência será salva. Você poderá continuar de onde parou.', 'Sair e salvar', false, 'Continuar jogando');
    if (accepted && state.session) {
      state.catMood = 'sad'; state.mistakePressure = Math.max(3, state.mistakePressure);
      save(); navigate('home'); message(`${state.catName} ficou com saudade, mas guardou seu lugar. Vocês podem continuar depois. 💜`, 3600);
    }
  }
  function navigate(view) {
    if (ui.locked) return;
    if (view === 'play' && !state.session) view = 'choose';
    if (view === 'summary' && !state.lastSummary) view = 'home';
    ui.view = view; ui.preview = null; ui.feedback = ''; ui.mood = 'normal';
    render(); window.scrollTo?.(0, 0);
  }

  // Inline vector art: no remote images, fonts, frameworks, or API calls.
  function catSVG(preview = null) {
    let color = state.equippedColor;
    let accessories = [...state.equippedAccessories];
    if (preview?.kind === 'color') color = preview.id;
    if (preview?.kind === 'accessory' && !accessories.includes(preview.id)) accessories.push(preview.id);
    const selectedHeadwear = accessories.filter(x => HEADWEAR.includes(x)).at(-1);
    if (selectedHeadwear) accessories = accessories.filter(x => !HEADWEAR.includes(x) || x === selectedHeadwear);
    const specialDef = color === 'galaxy'
      ? '<defs><linearGradient id="special-fur" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#4b3d83"/><stop offset=".48" stop-color="#8a67c8"/><stop offset="1" stop-color="#384f8f"/></linearGradient></defs>'
      : color === 'rainbow' ? '<defs><linearGradient id="special-fur" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ff8aa5"/><stop offset=".25" stop-color="#ffd269"/><stop offset=".5" stop-color="#74d6a2"/><stop offset=".75" stop-color="#6eb9ed"/><stop offset="1" stop-color="#b28ae8"/></linearGradient></defs>' : '';
    const fur = ['galaxy','rainbow'].includes(color) ? 'url(#special-fur)' : COLORS.find(x => x.id === color)?.hex || COLORS[0].hex;
    const mood = ui.mood !== 'normal' ? ui.mood : state.catMood;
    const mealsToday = state.feedDay === dayKey() ? state.feedingsToday : 0;
    const fullness = Math.max(0, Math.min(2, mealsToday));
    const views = ['-15 -10 250 250', '-10 -7 240 242', '-6 -4 232 237', '0 0 220 230', '0 0 220 230'];
    const catViewBox = views[stageNumber() - 1];
    const wings = accessories.includes('wings') ? `<g fill="#eeeaff" stroke="#c1b1e7" stroke-width="3"><path d="M64 139 Q8 92 23 161 Q9 181 67 183Z"/><path d="M153 139 Q210 92 197 161 Q207 181 155 183Z"/></g>` : '';
    const cape = accessories.includes('cape') ? `<path d="M64 140Q42 173 54 218L110 205L166 218Q178 173 156 140Q110 166 64 140Z" fill="#7653cf" stroke="#5638a7" stroke-width="3"/>` : '';
    const backpack = accessories.includes('backpack') ? `<g fill="#d8784f" stroke="#9e4c34" stroke-width="3"><rect x="38" y="139" width="43" height="61" rx="14"/><path d="M49 150Q38 119 72 122" fill="none" stroke-width="7"/></g>` : '';
    const hat = accessories.includes('hat') ? `<g><ellipse cx="110" cy="49" rx="56" ry="10" fill="#37314e"/><path d="M76 49L82 8Q110 -3 139 8L144 49Z" fill="#51465f"/><path d="M80 37L141 37L144 44L78 44Z" fill="#d57bac"/></g>` : '';
    const crown = accessories.includes('crown') ? `<path d="M71 44L68 6L92 22L111 1L129 22L151 6L146 44Q109 54 71 44Z" fill="#ffcc52" stroke="#d49c25" stroke-width="3"/><circle cx="110" cy="33" r="6" fill="#ed7791"/>` : '';
    const partyHat = accessories.includes('partyhat') ? `<g><path d="M81 54L111 0L143 54Z" fill="#ed779b" stroke="#bd4e73" stroke-width="3"/><path d="M91 35L132 35" stroke="#ffd45c" stroke-width="7"/><circle cx="111" cy="3" r="9" fill="#ffd45c"/></g>` : '';
    const wizardHat = accessories.includes('wizardhat') ? `<g><ellipse cx="110" cy="53" rx="61" ry="11" fill="#3e3471"/><path d="M73 51Q101 20 118 -8Q130 25 151 51Z" fill="#554394" stroke="#352963" stroke-width="3"/><path d="M92 24l5 9 10 2-8 7 2 10-9-5-9 5 2-10-8-7 10-2Z" fill="#ffd75e"/></g>` : '';
    const glasses = accessories.includes('glasses') ? `<g fill="none" stroke="#42345f" stroke-width="5"><circle cx="87" cy="102" r="18"/><circle cx="133" cy="102" r="18"/><path d="M105 100Q110 94 115 100M69 100L58 95M151 100L162 95"/></g>` : '';
    const heartGlasses = accessories.includes('heartglasses') ? `<g fill="#f58bab" stroke="#9f4165" stroke-width="3"><path d="M68 96Q76 84 87 96Q98 84 106 96Q105 111 87 121Q69 111 68 96Z"/><path d="M115 96Q123 84 134 96Q145 84 153 96Q152 111 134 121Q116 111 115 96Z"/></g><path d="M105 100H116" stroke="#9f4165" stroke-width="4"/>` : '';
    const bow = accessories.includes('bow') ? `<g><path d="M110 151Q65 126 72 164Q79 181 110 156Q145 184 149 164Q150 131 110 151Z" fill="#f0799e" stroke="#d35982" stroke-width="3"/><circle cx="110" cy="154" r="9" fill="#ffcb5f"/></g>` : '';
    const scarf = accessories.includes('scarf') ? `<g><path d="M67 144Q110 161 153 144L151 165Q110 180 69 164Z" fill="#e85f73" stroke="#bd4057" stroke-width="3"/><path d="M134 160L151 205L130 198L119 165Z" fill="#e85f73"/></g>` : '';
    const flower = accessories.includes('flower') ? `<g transform="translate(151 68)"><circle r="7" fill="#ffd45d"/><g fill="#f48fb1"><circle cy="-10" r="8"/><circle cx="10" r="8"/><circle cy="10" r="8"/><circle cx="-10" r="8"/></g><circle r="6" fill="#ffd45d"/></g>` : '';
    const headphones = accessories.includes('headphones') ? `<g fill="none" stroke="#5042a4" stroke-width="7"><path d="M62 99Q65 57 110 55Q155 57 159 99"/><path d="M62 94V119M159 94V119"/></g><rect x="51" y="96" width="19" height="28" rx="8" fill="#8f7bea"/><rect x="151" y="96" width="19" height="28" rx="8" fill="#8f7bea"/>` : '';
    const starAccessory = accessories.includes('star') ? `<g fill="#ffe05f" stroke="#d8a832" stroke-width="2"><path d="M183 55l7 14 16 2-12 11 3 16-14-8-14 8 3-16-12-11 16-2Z"/></g>` : '';
    const collar = accessories.includes('collar') ? `<path d="M70 143Q110 159 151 143L148 158Q110 170 72 157Z" fill="#58bfc4" stroke="#32878d" stroke-width="3"/>` : '';
    const bell = accessories.includes('bell') ? `<g><path d="M101 154Q110 146 119 154L124 171H96Z" fill="#ffd35a" stroke="#b78820" stroke-width="3"/><circle cx="110" cy="173" r="4" fill="#8f6417"/></g>` : '';
    const bandana = accessories.includes('bandana') ? `<path d="M72 146Q110 164 150 146L137 184L110 166L84 184Z" fill="#ef6d69" stroke="#b94745" stroke-width="3"/>` : '';
    const boots = accessories.includes('boots') ? `<g fill="#6c4f9c" stroke="#47326e" stroke-width="3"><path d="M48 194H88V216Q66 226 47 214Z"/><path d="M132 194H172L173 214Q154 226 132 216Z"/></g>` : '';
    const moon = accessories.includes('moon') ? `<g><path d="M103 157Q110 168 117 157" fill="none" stroke="#e8c55c" stroke-width="3"/><path d="M115 169Q102 177 108 190Q116 201 128 192Q115 193 115 169Z" fill="#ffe071" stroke="#c99b2f" stroke-width="2"/></g>` : '';
    const mouth = mood === 'sleepy' ? '<path d="M102 120Q110 123 118 120" fill="none" stroke="#765667" stroke-width="3" stroke-linecap="round"/>' : mood === 'sad' ? '<path d="M99 125Q110 114 121 125" fill="none" stroke="#765667" stroke-width="3.2" stroke-linecap="round"/>' : '<path d="M96 117Q102 126 110 118Q118 126 124 117" fill="none" stroke="#765667" stroke-width="3" stroke-linecap="round"/>';
    // Draw closed eyelids instead of shrinking pupils: otherwise the white
    // highlights float over the sleeping cat's face.
    const eyes = mood === 'sleepy'
      ? '<path d="M77 103Q87 111 97 103M124 103Q134 111 144 103" fill="none" stroke="#765667" stroke-width="3.4" stroke-linecap="round"/>'
      : mood === 'sad' ? '<ellipse cx="87" cy="103" rx="8.2" ry="10" fill="#3b334a"/><ellipse cx="134" cy="103" rx="8.2" ry="10" fill="#3b334a"/><circle cx="90" cy="100" r="3" fill="#fff"/><circle cx="137" cy="100" r="3" fill="#fff"/><path d="M76 86Q87 92 98 87M123 87Q134 92 145 86" fill="none" stroke="#765667" stroke-width="3" stroke-linecap="round"/><path d="M143 112Q151 122 143 130Q135 122 143 112Z" fill="#72bce8" opacity=".9"/>' : '<ellipse class="cat-eye" cx="87" cy="101" rx="8.2" ry="11.5" fill="#3b334a"/><ellipse class="cat-eye" cx="134" cy="101" rx="8.2" ry="11.5" fill="#3b334a"/><circle cx="90" cy="97" r="3" fill="#fff"/><circle cx="137" cy="97" r="3" fill="#fff"/>';
    const stageAccent = stageNumber() === 5 ? '<path d="M178 80l5 10 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2Z" fill="#ffd85f"/>' : '';
    return `<svg class="cat-svg ${mood} fullness-${fullness} ${stageNumber() === 5 ? 'master' : ''}" role="img" aria-label="Gatinho ${safeText(COLORS.find(x => x.id === color)?.name || 'branco')}, ${fullness === 2 ? 'com a barriguinha cheia' : fullness === 1 ? 'alimentado' : 'pronto para o lanche'}" viewBox="${catViewBox}" xmlns="http://www.w3.org/2000/svg">
      ${specialDef}
      <ellipse cx="110" cy="214" rx="77" ry="11" fill="#534076" opacity=".16"/>
      <path class="cat-tail" d="M154 170Q217 185 188 117Q182 103 174 118Q191 159 155 148" fill="${fur}" stroke="#84758c" stroke-width="3.8"/>
      ${backpack}${cape}${wings}
      <g class="cat-body"><ellipse cx="109" cy="166" rx="64" ry="56" fill="${fur}" stroke="#84758c" stroke-width="3"/>
        <ellipse cx="110" cy="175" rx="34" ry="30" fill="#fff9f7" opacity=".65"/>
        <ellipse cx="70" cy="206" rx="23" ry="13" fill="${fur}" stroke="#84758c" stroke-width="3"/>
        <ellipse cx="149" cy="206" rx="23" ry="13" fill="${fur}" stroke="#84758c" stroke-width="3"/>
        <path d="M49 93L54 31Q57 23 65 31L88 58Q110 51 132 58L156 31Q164 24 167 33L172 92Q183 152 109 159Q36 156 49 93Z" fill="${fur}" stroke="#84758c" stroke-width="3.4" stroke-linejoin="round"/>
        <path d="M57 44L63 76L84 60Z" fill="#edabc7"/><path d="M159 44L155 76L134 60Z" fill="#edabc7"/>
        <ellipse cx="81" cy="118" rx="14" ry="8" fill="#f6a5b7" opacity=".48"/><ellipse cx="140" cy="118" rx="14" ry="8" fill="#f6a5b7" opacity=".48"/>
        ${eyes}
        <path d="M104 112Q110 119 116 112Z" fill="#db8195"/>${mouth}
        <path d="M65 117L37 114M66 123L36 128M155 117L182 114M154 123L184 128" stroke="#817086" stroke-width="2.1" stroke-linecap="round"/>
        ${boots}${bow}${collar}${bell}${bandana}${scarf}${moon}${glasses}${heartGlasses}${headphones}${flower}${stageAccent}${starAccessory}
      </g>${hat}${crown}${partyHat}${wizardHat}</svg>`;
  }
  function scenery(id) {
    if (id === 'room') return '<span class="decoration window"></span><button type="button" data-action="sleep-cat" class="scene-object" style="left:13px;bottom:13px" aria-label="Tocar na cama para o gatinho dormir">🛏️</button>';
    if (id === 'garden') return '<span class="decoration sun"></span><span class="decoration tree"></span><button type="button" data-action="play-cat" class="scene-object" style="right:14px;bottom:15px" aria-label="Brincar com flor">🌷</button>';
    if (id === 'park') return '<span class="decoration sun"></span><span class="decoration tree"></span><button type="button" data-action="play-cat" class="scene-object" style="right:14px;bottom:15px" aria-label="Brincar com bola">⚽</button>';
    if (id === 'library') return '<span class="decoration shelf"></span><button type="button" data-action="play-cat" class="scene-object" style="right:14px;bottom:15px" aria-label="Ler livro">📖</button>';
    return '<span class="decoration star-scene">✨</span><button type="button" data-action="play-cat" class="scene-object" style="right:14px;bottom:15px" aria-label="Brincar com estrela">⭐</button>';
  }
  function furnitureMarkup(scene, preview = null) {
    if (!FURNITURE_ENABLED) return '';
    const previewId = preview?.kind === 'furniture' ? preview.id : '';
    return FURNITURE.filter(item => item.scene === scene && (state.placedFurniture.includes(item.id) || item.id === previewId)).map(item =>
      `<button type="button" class="scene-furniture ${item.id === previewId ? 'furniture-preview' : ''}" data-action="use-furniture" data-item="${item.id}" style="${item.style}" title="${safeText(item.name)}" aria-label="Interagir com ${safeText(item.name)}">${item.icon}</button>`
    ).join('');
  }
  function sceneMarkup(preview = null, label = false) {
    const previewFurniture = preview?.kind === 'furniture' ? FURNITURE.find(item => item.id === preview.id) : null;
    const scene = previewFurniture?.scene || state.selectedScene;
    return `<div class="scene ${scene}">
      ${scenery(scene)}${furnitureMarkup(scene, preview)}${label ? `<span class="scene-preview-tag">${safeText(SCENES.find(s => s.id === scene).name)}</span>` : ''}
      <button type="button" class="scene-cat" data-action="pet-cat" aria-label="Fazer carinho no gatinho">${catSVG(preview)}</button>
    </div>`;
  }
  const track = (pct, gold = false) => `<div class="progress-track"><div class="progress-fill ${gold ? 'gold' : ''}" style="width:${Math.max(0, Math.min(100, pct))}%"></div></div>`;
  function header() {
    return `<header class="topbar"><div class="brand"><span class="brand-mark" aria-hidden="true">🐱</span> MIAUMÁTICA</div>
      <div class="top-stats"><span class="pill food-pill" title="Comida">🐟 ${number(state.food)}</span><span class="pill" title="Experiência">✨ ${number(state.xp)}</span><span class="pill coins" title="Saldo de MiauCoins">🪙 ${number(state.coins)}</span></div></header>`;
  }
  function nav() {
    const items = [ ['home', '🏠', 'Início'], ['choose', '🎮', 'Jogar'], ['cat', '🐱', 'Gatinho'], ['progress', '📈', 'Progresso'] ];
    return `<nav class="bottom-nav" aria-label="Navegação principal">${items.map(([id, emoji, label]) => `<button type="button" class="nav-btn ${ui.view === id || (id === 'choose' && ui.view === 'levels') ? 'active' : ''}" data-action="navigate" data-view="${id}" aria-label="${label}" ${ui.view === id ? 'aria-current="page"' : ''}><span class="nav-icon" aria-hidden="true">${emoji}</span><span>${label}</span></button>`).join('')}</nav>`;
  }
  function onboarding() {
    return `<main class="onboarding-screen"><div class="onboarding-card"><div class="onboarding-cat">${catSVG()}</div><p class="eyebrow">Uma nova amizade começa</p><h1>Oi! Eu vou aprender com você 🐾</h1><p class="muted">Antes da aventura, conte para mim como vocês vão se chamar.</p>
      <label class="form-field" for="first-name">Nome da criança<input class="text-input" id="first-name" maxlength="28" autocomplete="given-name" placeholder="Ex.: Ana"></label>
      <label class="form-field space-top" for="cat-name">Nome do gatinho<input class="text-input" id="cat-name" maxlength="20" autocomplete="off" value="Mimi" placeholder="Ex.: Mimi"></label>
      <button class="btn btn-primary btn-large btn-full space-top" data-action="finish-onboarding">COMEÇAR A AVENTURA ▶</button>
      <p class="onboarding-note">🔒 Os nomes e o progresso ficam somente neste dispositivo.</p></div></main>`;
  }
  function dailyMissionsMarkup(d) {
    const missions = [
      { id: 'answers', icon: '🎯', label: 'Resolver 5 exercícios', value: Math.min(5, d.answers || 0), goal: 5 },
      { id: 'accuracy', icon: '🌟', label: 'Acertar 4 de primeira', value: Math.min(4, d.firstTry || 0), goal: 4 },
      { id: 'variety', icon: '🧭', label: 'Praticar 2 operações', value: Math.min(2, d.operations?.length || 0), goal: 2 }
    ];
    return `<div class="card mission-card"><div class="row between"><h3>📜 Missões de hoje</h3><span class="chip">+15 🪙 cada</span></div><div class="mission-list">${missions.map(m => {
      const claimed = d.missionsClaimed?.includes(m.id);
      return `<div class="mission-row ${claimed ? 'complete' : ''}"><span>${m.icon}</span><div class="flex1"><strong>${m.label}</strong>${track(m.value/m.goal*100)}</div><b>${claimed ? '✓' : `${m.value}/${m.goal}`}</b></div>`;
    }).join('')}</div></div>`;
  }
  function home() {
    const d = state.studyDays[dayKey()] || { answers: 0, bonusClaimed: false, minutes: 0, coins: 0, xp: 0 };
    const progress = xpInfo(); const care = careInfo();
    return `<main class="content"><p class="eyebrow">Sua aventura matemática</p><h1>Olá, ${safeText(childDisplayName())}! 👋</h1><p class="muted">Seu amigo felino está pronto para aprender com você.</p>
      <div class="homepage-split"><div><div class="cat-speech">💬 ${safeText(catPhrase('home'))}</div>${sceneMarkup()}
        <div class="cat-info"><div><strong>🐾 ${STAGES[stageNumber() - 1]}</strong><div class="muted" style="font-size:.82rem">Estágio ${stageNumber()} de 5</div></div><span class="chip">Nível do gatinho ${stageNumber()}</span></div>
        <div class="progress-label"><span>Aprendizado</span><span>${progress.text}</span></div>${track(progress.fraction)}
        <div class="progress-label care-label"><span>💗 Cuidado</span><span>${care.text}</span></div>${track(care.fraction, true)}</div>
        <div class="hero-caption"><h2>Aprender rende recompensas! ✨</h2><p class="muted">Resolva continhas, ganhe MiauCoins e personalize seu gatinho.</p>
          <div class="hero-actions"><button class="btn btn-primary btn-large wide" data-action="navigate" data-view="choose">▶ JOGAR</button>
            <button class="btn btn-gold" data-action="navigate" data-view="shop">🛍️ LOJA</button>
            <button class="btn btn-secondary" data-action="navigate" data-view="progress">📈 MEU PROGRESSO</button></div></div></div>
      <div class="daily-card space-top"><div class="row between"><h3 style="margin:0">☀️ Treino do dia</h3><strong>${Math.min(DAILY_GOAL,d.answers)}/${DAILY_GOAL}</strong></div>
      <p style="margin:8px 0 10px;font-size:.88rem;color:#775e44">${d.bonusClaimed ? '🎉 Recompensa diária recebida!' : `Ganhe prêmios com 5, 10 e ${DAILY_GOAL} exercícios.`}</p>
      <div class="daily-steps"><span class="${d.answers >= 5 ? 'done' : ''}">5 · 🪙10</span><span class="${d.answers >= 10 ? 'done' : ''}">10 · 🪙20</span><span class="${d.answers >= 20 ? 'done' : ''}">20 · 🪙50 + 🐟2</span></div>
      ${track(d.answers / DAILY_GOAL * 100, true)}<div class="daily-metrics"><span>⏱️ ${Math.floor(d.minutes || 0)} min de estudo</span><span>🪙 +${number(d.coins || 0)}</span><span>✨ +${number(d.xp || 0)} XP</span></div><button class="btn btn-gold btn-full space-top" data-action="start-daily">${d.bonusClaimed ? 'CONTINUAR TREINANDO' : 'COMEÇAR TREINO DIÁRIO'}</button></div>
      ${dailyMissionsMarkup(d)}
      ${state.session ? `<div class="card space-top"><h3>⏯️ Sequência em andamento</h3><p class="muted">Exercício ${state.session.index + 1} de ${state.session.questions.length}.</p><button class="btn btn-secondary btn-full" data-action="resume">Continuar de onde parei</button></div>` : ''}
    </main>`;
  }
  function choose() {
    return `<main class="content"><p class="eyebrow">Mapa da aventura</p><h1>Escolha uma região 🗺️</h1><p class="muted">Cada região tem três capítulos e um desafio-chefe ao final de cada um.</p>
      <div class="operation-grid adventure-map">${OP_IDS.map(id => { const o = OPERATIONS[id], a = ADVENTURES[id], done = state.completed[id].length; return `<button class="operation-tile region-${id}" type="button" data-action="select-op" data-op="${id}"><span class="region-icon">${a.icon}</span><span class="op-title">${a.region}</span><span class="op-sub">${a.story}</span><span class="level-pill">${done}/12 níveis · ${Math.floor(done/4)}/3 chefes</span>${track(done / MAX_LEVEL * 100)}</button>`; }).join('')}</div>
      <div class="card space-top"><h3>🌞 Prefere misturar as contas?</h3><p class="muted">O treino diário escolhe questões com base no que você precisa praticar.</p><button class="btn btn-gold btn-full" data-action="start-daily">Iniciar treino diário · ${DAILY_GOAL} questões</button></div>
      ${state.session ? `<div class="card"><h3>⏯️ Você tem uma sequência salva</h3><button class="btn btn-secondary btn-full" data-action="resume">Continuar sequência</button></div>` : ''}</main>`;
  }
  function levels() {
    const op = validOp(ui.op) ? ui.op : 'add';
    const obj = OPERATIONS[op];
    const unlocked = state.unlocked[op];
    return `<main class="content"><button class="btn btn-quiet btn-small" data-action="navigate" data-view="choose">← Operações</button>
      <div class="row space-top" style="align-items:start"><span class="operation-icon" style="background:${obj.color}">${obj.icon}</span><div><p class="eyebrow" style="margin:0">${ADVENTURES[op].icon} ${ADVENTURES[op].region}</p><h1>${obj.label}</h1><p class="muted">${ADVENTURES[op].story} São 10 questões por nível; acerte 9 de primeira para avançar.</p></div></div>
      <div class="stack space-top">${Array.from({length:MAX_LEVEL},(_,i)=>i+1).map(lv => {
        const locked = lv > unlocked;
        const done = state.completed[op].includes(lv);
        const tutorial = ((op === 'add' || op === 'sub') && lv <= 6) || ((op === 'mul' || op === 'div') && lv <= 3);
        const boss = [4, 8, 12].includes(lv);
        const [title, description, example] = LEVEL_GUIDE[op][lv - 1];
        return `<button class="level-challenge ${boss ? 'boss-level' : ''} ${locked ? 'level-locked' : done ? 'level-done' : 'level-current'}" data-action="start-level" data-op="${op}" data-level="${lv}" ${locked ? 'disabled' : ''}>
          <span class="level-challenge-main"><strong>${locked ? '🔒' : done ? '✅' : boss ? '👾' : '⭐'} Nível ${lv} · ${boss ? 'CHEFE: ' : ''}${title}</strong><small>${boss ? 'Mistura as habilidades deste capítulo. ' : ''}${description}</small><span class="level-example">Exemplo: ${example}</span>${tutorial ? '<span class="tutorial-badge">🧩 Tutorial visual</span>' : ''}</span>
          <span class="level-cta">${locked ? 'Bloqueado' : done ? 'Revisar ↻' : 'Jogar ▶'}</span></button>`;
      }).join('')}</div><p class="muted center space-top" style="font-size:.8rem">Não há divisões com resto nem subtrações negativas nos níveis iniciais.</p>
    </main>`;
  }
  function play() {
    const s = state.session;
    if (!s) { ui.view = 'choose'; return choose(); }
    const q = s.questions[s.index];
    if (!q) return summary();
    const dots = s.questions.map((_,i) => `<span class="question-dot ${i<s.index ? (s.results[i] ? 'done' : 'wrong') : i===s.index ? 'current' : ''}"></span>`).join('');
    const feedback = ui.feedback || (s.attempts ? 'Tente mais uma vez! 🐾' : q.format === 'choice' ? 'Escolha a resposta correta.' : q.format === 'truefalse' ? `Confira a resposta de ${state.catName}.` : 'Digite a resposta abaixo.');
    const trueAnswer = q.shownAnswer === q.answer;
    const wrongValue = q.answer === 999999999 ? q.answer - 1 : q.answer + 1;
    const inputArea = q.format === 'choice'
      ? `<div class="answer-options" role="group" aria-label="Escolha a resposta">${q.choices.map(value => `<button type="button" class="answer-option" data-action="choice-answer" data-value="${value}">${number(value)}</button>`).join('')}</div>`
      : q.format === 'truefalse'
        ? `<div class="answer-options true-false" role="group" aria-label="A resposta do gato está certa?"><button type="button" class="answer-option true" data-action="choice-answer" data-value="${trueAnswer ? q.answer : wrongValue}">✅ Verdadeiro</button><button type="button" class="answer-option false" data-action="choice-answer" data-value="${!trueAnswer ? q.answer : wrongValue}">❌ Falso</button></div>`
        : `<div class="numpad" role="group" aria-label="Teclado numérico">${['1','2','3','4','5','6','7','8','9','clear','0','back'].map(key => `<button type="button" class="key ${key === 'clear' || key === 'back' ? 'action' : ''}" data-action="key" data-key="${key}" aria-label="${key === 'clear' ? 'Limpar resposta' : key === 'back' ? 'Apagar último algarismo' : key}">${key === 'clear' ? 'C' : key === 'back' ? '⌫' : key}</button>`).join('')}<button type="button" class="key enter" data-action="key" data-key="submit" style="grid-column:1/-1" ${!s.answerText ? 'disabled' : ''}>✓ RESPONDER</button></div>`;
    const entry = `<div class="game-panel"><div class="progress-label"><span>${s.type === 'daily' ? '☀️ Treino diário' : `${OPERATIONS[q.op].label} · Nível ${q.level}`}</span><span>Questão ${s.index + 1}/${s.questions.length}</span></div>
      <div class="question-progress" aria-label="Progresso da sequência">${dots}</div>
      <div class="lesson-row"><div class="lesson-caption">📘 ${LEVEL_GUIDE[q.op][q.level - 1][0]}</div><button type="button" class="speak-btn" data-action="speak-question" aria-label="Ouvir pergunta">🔊 Ouvir</button></div>
      ${problemMarkup(q)}${learningAid(q)}
      ${q.format === 'standard' ? `<div class="answer-display ${s.answerText ? '' : 'empty'}" id="answer-display" role="status" aria-label="Sua resposta">${s.answerText || '?'}</div>` : ''}
      <div class="feedback ${s.attempts ? 'error' : ''}" id="feedback">${safeText(feedback)}</div>
      ${s.attempts >= 2 ? `<div class="game-hint">💡 <strong>Resolução:</strong> ${safeText(explanation(q))}</div>` : (s.attempts > 0 && (s.hintUsed || ui.showHint)) ? `<div class="game-hint">💡 ${safeText(responseText(s))}</div>` : ''}
      ${inputArea}
      ${s.attempts > 0 && s.attempts < 2 && !s.hintUsed ? `<button class="btn btn-quiet btn-small space-top" data-action="hint">💡 Preciso de uma dica</button>` : ''}
      <div class="game-cat-note">${catSVG()}<span>${safeText(ui.catSpeech || (s.attempts ? `Eu estou com você, ${childDisplayName()}! 💜` : `${childDisplayName()}, você consegue! 🐾`))}</span></div></div>`;
    return `<main class="content game-content"><div class="game-header"><button class="btn btn-quiet btn-small" data-action="leave">← Sair</button><span class="chip">🪙 ${number(state.coins)} &nbsp; ⭐ ${state.streak} seguidos</span></div>
      <div class="tablet-layout"><div>${entry}</div><div class="side-cat" style="display:none">${sceneMarkup()}<p class="muted center" style="margin:7px 0">Seu gatinho está torcendo por você!</p></div></div></main>`;
  }
  function summary() {
    const sm = state.lastSummary;
    if (!sm) return home();
    const isLevel = sm.type === 'level';
    const passed = !isLevel || sm.passed;
    const trailComplete = isLevel && passed && sm.level === MAX_LEVEL;
    const bossWon = isLevel && passed && sm.newLevel && [4, 8, 12].includes(sm.level);
    const headline = isLevel ? (trailComplete ? 'Trilha concluída! 👑' : passed ? 'Nível concluído! 🎉' : 'Vamos praticar mais! 💜') : 'Treino finalizado! 🎉';
    const tip = isLevel && !passed ? 'Você precisa de 9 acertos na primeira tentativa para avançar. Uma nova sequência semelhante vai ajudar.' : 'Cada exercício deixa seu gatinho mais experiente!';
    return `<main class="content"><div class="card center"><div class="summary-icon" aria-hidden="true">${passed ? '🏆' : '🐾'}</div><h1>${headline}</h1><p class="muted">${tip}</p>
      <div class="summary-number">${sm.score}/${sm.total}</div><p class="soft">Acertos na primeira tentativa</p>
      ${track(sm.score / sm.total * 100)}
      <div class="grid2 space-top"><div class="stat"><div class="value">+${number(sm.coins)} 🪙</div><div class="label">Moedas ganhas</div></div><div class="stat"><div class="value">+${number(sm.xp)} XP</div><div class="label">Experiência</div></div></div>
      <p class="session-detail space-top">⏱️ Tempo da sequência: ${formatTime(sm.elapsed)} ${sm.newLevel ? `<br>🔓 Próximo nível desbloqueado!` : ''}</p>
      ${bossWon ? `<div class="boss-story"><strong>📖 Capítulo vencido!</strong><p>${safeText(bossStory(sm.operation, sm.level))}</p><span>Recompensa especial de chefe recebida.</span></div>` : ''}
      ${sm.newItems?.length ? `<div class="new-unlock">🎁 <strong>Novidades na loja!</strong><p>Você liberou: ${sm.newItems.map(id => [...COLORS, ...ACCESSORIES, ...(FURNITURE_ENABLED ? FURNITURE : [])].find(item => item.id === id)?.name).filter(Boolean).join(', ')}. Agora pode comprá-las com suas moedas.</p><button class="btn btn-gold btn-full" data-action="navigate" data-view="shop">Ver recompensas na loja</button></div>` : ''}
      <div class="stack space-top">${isLevel ? `<button class="btn btn-primary btn-full" data-action="start-level" data-op="${sm.operation}" data-level="${trailComplete ? sm.level : sm.passed ? state.unlocked[sm.operation] : sm.level}">${trailComplete ? 'REVISAR DESAFIO FINAL ↻' : passed ? 'PRÓXIMO DESAFIO ▶' : 'TENTAR NOVAMENTE ↻'}</button>` : '<button class="btn btn-primary btn-full" data-action="start-daily">PRATICAR MAIS ▶</button>'}
        <button class="btn btn-secondary btn-full" data-action="navigate" data-view="home">VOLTAR AO INÍCIO</button></div></div></main>`;
  }
  function formatTime(sec) {
    const m = Math.floor(sec / 60); const s = Math.floor(sec % 60);
    return m ? `${m} min ${s} s` : `${s} s`;
  }
  function bossStory(op, level) {
    const chapter = level / 4;
    const stories = {
      add: ['As sementes luminosas voltaram a brotar!', 'A ponte das somas foi reconstruída!', 'A Floresta da Adição está salva!'],
      sub: ['Os objetos perdidos voltaram para seus donos!', 'O mistério da praça foi resolvido!', 'A Vila da Subtração voltou a festejar!'],
      mul: ['Os primeiros grupos mágicos abriram a trilha!', 'O guardião das tabuadas virou seu amigo!', 'O topo da Montanha foi conquistado!'],
      div: ['O primeiro portão se abriu!', 'Os tesouros foram repartidos com justiça!', 'O Castelo da Divisão coroou a dupla de mestres!']
    };
    return stories[op]?.[chapter - 1] || 'Uma nova parte da aventura foi concluída!';
  }
  function catView() {
    const st = stageNumber(); const info = xpInfo(); const care = careInfo();
    const fedToday = state.feedDay === dayKey() ? state.feedingsToday : 0;
    const fullnessText = fedToday === 0 ? 'Esguio e pronto para o lanche' : fedToday === 1 ? 'Barriguinha satisfeita' : 'Barriguinha cheia e redondinha';
    return `<main class="content"><p class="eyebrow">Meu companheiro</p><h1>${safeText(state.catName)} 🐱</h1><p class="muted">Toque nele ou nos objetos do cenário para brincar.</p>
      ${sceneMarkup(null,true)}<div class="fullness-status">🐾 Forma de hoje: <strong>${fullnessText}</strong></div><div class="cat-info"><div><strong>✨ ${STAGES[st-1]}</strong><p class="muted" style="font-size:.82rem;margin:3px 0">Estágio ${st} / 5</p></div><span class="chip">${number(state.xp)} XP</span></div>
      <div class="progress-label"><span>Aprendizado para evoluir</span><span>${info.text}</span></div>${track(info.fraction)}
      <div class="progress-label care-label"><span>💗 Cuidado para evoluir</span><span>${care.text}</span></div>${track(care.fraction, true)}
      <div class="care-card space-top"><div><h3>🐟 Hora do lanchinho</h3><p>${fedToday >= 2 ? `${safeText(state.catName)} já está satisfeito hoje. Volte amanhã para cuidar de novo!` : `Cada lanchinho cria um coração de cuidado. Você pode alimentar ${2-fedToday} vez(es) hoje.`}</p></div><div class="care-actions"><span class="food-count">🐟 ${number(state.food)}</span><button class="btn btn-gold" data-action="${state.food < 1 ? 'go-food-shop' : 'feed-cat'}" ${fedToday >= 2 ? 'disabled' : ''}>${state.food < 1 ? 'PEGAR COMIDA' : 'ALIMENTAR'}</button></div></div>
      <div class="card space-top"><h3>🌄 Escolha um cenário</h3><div class="scene-selector">${SCENES.map((x,i) => `<button class="scene-option ${state.selectedScene === x.id ? 'selected' : ''}" data-action="scene" data-scene="${x.id}" ${st < i+1 ? 'disabled' : ''}>${x.icon}<br>${x.name}<br><small>${st < i+1 ? `Estágio ${i+1}` : 'Liberado'}</small></button>`).join('')}</div></div>
      <button class="btn btn-gold btn-large btn-full space-top" data-action="navigate" data-view="shop">🛍️ LOJA DE PERSONALIZAÇÃO</button></main>`;
  }
  function shop() {
    const colorTab = ui.shopTab === 'colors';
    const foodTab = ui.shopTab === 'food';
    const furnitureTab = FURNITURE_ENABLED && ui.shopTab === 'furniture';
    const items = colorTab ? COLORS : foodTab ? FOOD_ITEMS : furnitureTab ? FURNITURE : ACCESSORIES;
    const best = highestCompletedLevel();
    return `<main class="content"><button class="btn btn-quiet btn-small" data-action="navigate" data-view="cat">← Meu gatinho</button>
      <div class="row between space-top"><div><p class="eyebrow">Estilo do seu amigo</p><h1>Loja do gatinho 🛍️</h1></div><span class="pill coins">🪙 ${number(state.coins)}</span></div>
      <div class="shop-unlock-help">🏆 Seu melhor nível concluído: <strong>${best ? `nível ${best}` : 'nenhum ainda'}</strong>.<br>Alguns itens só podem ser comprados depois de <strong>concluir o nível indicado em qualquer operação</strong>. Você pode experimentar antes de desbloquear.</div>
      ${foodTab ? `<div class="food-shop-hero"><span>🐟</span><div><strong>Você tem ${number(state.food)} comidas</strong><p>Use-as para alimentar ${safeText(state.catName)} e criar corações de cuidado. Nunca há punição por ficar um dia sem jogar.</p></div></div>` : `${sceneMarkup(ui.preview, true)}${ui.preview ? `<p class="center muted space-top" style="font-size:.85rem">👀 Prévia de ${safeText([...COLORS,...ACCESSORIES].find(x => x.id === ui.preview.id)?.name || 'item')}. A aparência só muda definitivamente ao equipar.</p>` : '<p class="center muted space-top" style="font-size:.85rem">Experimente os itens antes de comprar!</p>'}`}
      <div class="shop-tabs"><button class="shop-tab ${colorTab ? 'active' : ''}" data-action="tab" data-tab="colors">🎨 Cores</button><button class="shop-tab ${!colorTab && !foodTab && !furnitureTab ? 'active' : ''}" data-action="tab" data-tab="accessories">🎩 Acessórios</button>${FURNITURE_ENABLED ? `<button class="shop-tab ${furnitureTab ? 'active' : ''}" data-action="tab" data-tab="furniture">🛋️ Móveis</button>` : ''}<button class="shop-tab ${foodTab ? 'active' : ''}" data-action="tab" data-tab="food">🐟 Cuidados</button></div>
      <div class="shop-grid">${items.map(item => {
        if (foodTab) return `<div class="shop-item"><div class="item-art">${item.icon}</div><div class="item-name">${item.name}</div><div class="item-price">🪙 ${number(item.cost)}</div><div class="item-requirement unlocked">+${item.amount} comida(s)</div><button class="btn btn-gold btn-small" data-action="buy-food" data-item="${item.id}" ${state.coins < item.cost ? 'disabled' : ''}>Comprar</button></div>`;
        if (furnitureTab) {
          const owned = state.purchasedFurniture.includes(item.id), placed = state.placedFurniture.includes(item.id), available = canPurchase(item, owned);
          const preview = ui.preview?.id === item.id && ui.preview?.kind === 'furniture';
          const sceneName = SCENES.find(scene => scene.id === item.scene)?.name || 'Cenário';
          return `<div class="shop-item ${preview ? 'preview' : ''} ${available ? '' : 'shop-locked'}"><div class="item-art">${item.icon}</div><div class="item-name">${item.name}</div><div class="item-price">${owned ? '✅ Adquirido' : `🪙 ${number(item.cost)}`}</div><div class="item-requirement ${available ? 'unlocked' : 'locked'}">${available ? `🏡 ${sceneName}` : `🔒 Nível ${item.requiredLevel} · ${sceneName}`}</div><button class="btn btn-quiet btn-small" data-action="preview" data-kind="furniture" data-item="${item.id}">👀 Prévia</button><button class="btn ${placed ? 'btn-secondary' : owned ? 'btn-primary' : available ? 'btn-gold' : 'btn-quiet'} btn-small" data-action="furniture-item" data-item="${item.id}" ${available ? '' : 'disabled'}>${placed ? 'Guardar' : owned ? 'Colocar' : available ? 'Comprar' : '🔒 Bloqueado'}</button></div>`;
        }
        const isColor = colorTab;
        const owned = isColor ? state.purchasedColors.includes(item.id) : state.purchasedAccessories.includes(item.id);
        const equipped = isColor ? state.equippedColor === item.id : state.equippedAccessories.includes(item.id);
        const available = canPurchase(item, owned);
        const preview = ui.preview?.id === item.id && ui.preview?.kind === (isColor ? 'color' : 'accessory');
        const requirement = !available ? `🔒 Conclua o nível ${item.requiredLevel}` : item.requiredLevel && !owned ? `🔓 Nível ${item.requiredLevel} liberado` : '';
        const swatch = item.special === 'galaxy' ? 'linear-gradient(135deg,#4b3d83,#8a67c8,#384f8f)' : item.special === 'rainbow' ? 'linear-gradient(135deg,#ff8aa5,#ffd269,#74d6a2,#6eb9ed,#b28ae8)' : item.hex;
        return `<div class="shop-item ${preview ? 'preview' : ''} ${available ? '' : 'shop-locked'}"><div class="item-art">${isColor ? `<span class="color-swatch" style="background:${swatch}"></span>` : item.icon}</div>
          <div class="item-name">${item.name}</div><div class="item-price">${owned ? '✅ Adquirido' : item.cost ? `🪙 ${number(item.cost)}` : 'Grátis'}</div>
          <div class="item-requirement ${available ? 'unlocked' : 'locked'}">${requirement || '&nbsp;'}</div>
          <button class="btn btn-quiet btn-small" data-action="preview" data-kind="${isColor ? 'color' : 'accessory'}" data-item="${item.id}">👀 Prévia</button>
          <button class="btn ${equipped ? 'btn-secondary' : owned ? 'btn-primary' : available ? 'btn-gold' : 'btn-quiet'} btn-small" data-action="shop-item" data-kind="${isColor ? 'color' : 'accessory'}" data-item="${item.id}" ${available ? '' : 'disabled'}>${equipped ? (isColor ? '✓ Em uso' : 'Desequipar') : owned ? 'Equipar' : available ? 'Comprar' : '🔒 Bloqueado'}</button></div>`;
      }).join('')}</div>
      <p class="muted center space-top" style="font-size:.8rem">Itens comprados continuam seus, mesmo após atualizar o jogo. Gastar moedas não atrapalha a evolução do gatinho.</p>
    </main>`;
  }

  function studyStreak() {
    const dates = Object.entries(state.studyDays).filter(([, x]) => x.answers > 0).map(([date]) => date).sort();
    if (!dates.length) return 0;
    const get = dt => [dt.getFullYear(), String(dt.getMonth()+1).padStart(2,'0'),String(dt.getDate()).padStart(2,'0')].join('-');
    const start = new Date(); start.setHours(12, 0, 0, 0);
    if (!dates.includes(get(start))) start.setDate(start.getDate() - 1);
    let count = 0;
    while (dates.includes(get(start))) { count++; start.setDate(start.getDate() - 1); }
    return count;
  }
  function progress() {
    const total = state.totalAnswered;
    const firstRate = total ? (100 * state.firstTryCorrect / total) : 0;
    const studiedDays = Object.values(state.studyDays).filter(d => d.answers > 0).length;
    const doneLevels = OP_IDS.reduce((n,id) => n + state.completed[id].length, 0);
    return `<main class="content"><p class="eyebrow">Sua jornada</p><h1>Meu progresso 📈</h1><p class="muted">Cada tentativa faz parte do aprendizado.</p>
      <div class="grid2"><div class="stat"><div class="value">${number(total)}</div><div class="label">Exercícios resolvidos</div></div><div class="stat"><div class="value">${firstRate.toFixed(1).replace('.',',')}%</div><div class="label">Acertos de primeira</div></div>
        <div class="stat"><div class="value">${number(state.errors)}</div><div class="label">Tentativas incorretas</div></div><div class="stat"><div class="value">${formatTime(total ? state.totalSeconds / total : 0)}</div><div class="label">Tempo médio</div></div>
        <div class="stat"><div class="value">${number(doneLevels)}</div><div class="label">Níveis concluídos</div></div><div class="stat"><div class="value">${studiedDays} 📅</div><div class="label">Dias estudados</div></div>
        <div class="stat"><div class="value">${studyStreak()} 🔥</div><div class="label">Dias em sequência</div></div><div class="stat"><div class="value">${number(state.xp)} ✨</div><div class="label">XP do gatinho</div></div></div>
      <div class="card space-top"><h3>🧮 Desempenho por operação</h3><div class="op-stats">${OP_IDS.map(id => {
        const stat = state.operationStats[id]; const pct = stat.answers ? stat.firstTry / stat.answers * 100 : 0;
        return `<div class="op-row"><div class="op-title-row"><strong>${OPERATIONS[id].symbol} ${OPERATIONS[id].label}</strong><span class="muted" style="font-size:.79rem">Nível ${state.unlocked[id]} · ${stat.answers} questões · ${pct.toFixed(0)}% de primeira</span></div>${track(pct)}</div>`;
      }).join('')}</div></div>
      <div class="card"><h3>📕 Caderno de revisão</h3><p class="muted">${state.mistakeBank.length ? `${state.mistakeBank.length} conta(s) estão guardadas para revisão. Elas reaparecem aos poucos no treino diário a partir do dia seguinte.` : 'Nenhuma conta pendente. Quando houver um erro, ele será usado para uma revisão futura sem castigo.'}</p>${state.mistakeBank.length ? '<button class="btn btn-secondary btn-full" data-action="start-daily">Praticar com revisão</button>' : ''}</div>
      <div class="card"><h3>🏆 Conquistas (${state.achievements.length}/${ACHIEVEMENTS.length})</h3><div class="stack smgap">${ACHIEVEMENTS.map(a => `<div class="achievement ${state.achievements.includes(a.id) ? '' : 'locked'}"><div class="achievement-icon">${a.icon}</div><div><strong>${a.name}</strong><p>${a.description}${state.achievements.includes(a.id) ? ' · Desbloqueada!' : ' · Bloqueada'}</p></div></div>`).join('')}</div></div>
      <div class="card"><h3>⚙️ Nomes e meus dados</h3><label class="form-field" for="name-input">Nome da criança<input class="text-input" id="name-input" maxlength="28" autocomplete="nickname" value="${safeText(state.name)}" placeholder="Seu nome"></label>
        <label class="form-field space-top" for="cat-name-input">Nome do gatinho<input class="text-input" id="cat-name-input" maxlength="20" value="${safeText(state.catName)}" placeholder="Nome do gatinho"></label>
        <div class="setting-buttons"><button class="btn btn-primary btn-full" data-action="save-name">Salvar nomes</button><button class="btn btn-secondary btn-full" data-action="toggle-sound">${state.soundEnabled ? '🔊 Sons ligados' : '🔇 Sons desligados'}</button><button class="btn btn-secondary btn-full" data-action="export">⬇️ Exportar progresso (.json)</button>
        <label class="btn btn-quiet btn-full" for="import-file" style="cursor:pointer">⬆️ Importar progresso (.json)</label><input id="import-file" type="file" accept=".json,application/json" class="visually-hidden">
        <button class="btn btn-danger btn-full" data-action="reset">🗑️ Reiniciar jogo</button></div>
        <p class="muted space-top" style="font-size:.77rem;margin-bottom:0">O progresso fica somente neste navegador e dispositivo. Exporte um backup antes de limpar os dados ou trocar de aparelho.</p></div>
    </main>`;
  }
  function render() {
    if (!state.onboardingComplete) { app.classList.remove('in-game'); app.innerHTML = onboarding(); return; }
    const isGame = ui.view === 'play' && !!state.session;
    app.classList.toggle('in-game', isGame);
    const views = { home, choose, levels, play, summary, cat: catView, shop, progress };
    app.innerHTML = header() + (views[ui.view] || home)() + (isGame ? '' : nav());
    const submit = app.querySelector('[data-key="submit"]');
    if (submit && state.session) submit.disabled = !state.session.answerText;
  }
  async function shopItem(kind, id) {
    const isColor = kind === 'color';
    const item = (isColor ? COLORS : ACCESSORIES).find(x => x.id === id);
    if (!item) return;
    const own = isColor ? state.purchasedColors : state.purchasedAccessories;
    if (!own.includes(id)) {
      if (!canPurchase(item)) return message(`Primeiro, conclua o nível ${item.requiredLevel} em alguma operação! 🔒`);
      if (state.coins < item.cost) return message('Você ainda não tem MiauCoins suficientes. 🪙');
      if (!(await askConfirmation('Comprar item?',
        `Comprar ${item.name} por ${item.cost} MiauCoins?`, 'Comprar'))) return;
      if (!canPurchase(item) || state.coins < item.cost) return message('A compra não está disponível neste momento.');
      state.coins -= item.cost;
      own.push(id);
    }
    if (isColor) {
      state.equippedColor = id;
    } else if (state.equippedAccessories.includes(id)) {
      state.equippedAccessories = state.equippedAccessories.filter(x => x !== id);
    } else {
      if (HEADWEAR.includes(id)) state.equippedAccessories = state.equippedAccessories.filter(x => !HEADWEAR.includes(x));
      state.equippedAccessories.push(id);
    }
    checkAchievements(); ui.preview = null; save(); render(); message(`${item.name} está pronto para usar! 🎉`);
  }
  async function buyFood(id) {
    const item = FOOD_ITEMS.find(x => x.id === id);
    if (!item || state.coins < item.cost) return message('Você ainda não tem MiauCoins suficientes. 🪙');
    if (!(await askConfirmation('Comprar cuidado?', `Trocar ${item.cost} MiauCoins por ${item.amount} comida(s)?`, 'Comprar'))) return;
    if (state.coins < item.cost) return;
    state.coins -= item.cost; state.food += item.amount; save(); render();
    message(`${item.name} foi guardado para ${state.catName}! 🐟`);
  }
  async function furnitureItem(id) {
    const item = FURNITURE.find(x => x.id === id);
    if (!item) return;
    const owned = state.purchasedFurniture.includes(id);
    if (!owned) {
      if (!canPurchase(item)) return message(`Conclua o nível ${item.requiredLevel} para liberar este móvel. 🔒`);
      if (state.coins < item.cost) return message('Você ainda não tem MiauCoins suficientes. 🪙');
      if (!(await askConfirmation('Comprar móvel?', `Comprar ${item.name} por ${item.cost} MiauCoins?`, 'Comprar'))) return;
      if (state.coins < item.cost) return;
      state.coins -= item.cost; state.purchasedFurniture.push(id); state.placedFurniture.push(id);
    } else if (state.placedFurniture.includes(id)) {
      state.placedFurniture = state.placedFurniture.filter(x => x !== id);
    } else {
      state.placedFurniture.push(id);
    }
    checkAchievements(); if (!owned) playSound('reward'); ui.preview = null; save(); render();
    message(owned ? (state.placedFurniture.includes(id) ? `${item.name} foi colocado no cenário! 🏡` : `${item.name} foi guardado.`) : `${item.name} foi comprado e colocado! 🎉`);
  }
  function react(mood, label) {
    ui.mood = mood;
    const cat = app.querySelector('.scene-cat');
    if (cat) cat.innerHTML = catSVG(ui.preview);
    const duration = mood === 'sleepy' ? 4000 : 1500;
    message(label, 1500);
    clearTimeout(moodTimer);
    moodTimer = setTimeout(() => {
      ui.mood = 'normal';
      if (cat?.isConnected) cat.innerHTML = catSVG(ui.preview);
    }, duration);
  }
  function cheerUpCat(persist = true) {
    state.catMood = 'normal'; state.mistakePressure = 0; if (persist) save();
  }
  function useFurniture(id) {
    const item = FURNITURE.find(x => x.id === id);
    if (!item) return;
    const actions = {
      'room-rug': `${state.catName} rolou no tapete de patinhas!`, 'room-lamp': `${state.catName} acendeu a luz para estudar!`, 'room-scratcher': `${state.catName} afiou as garrinhas!`,
      'garden-bench': `${state.catName} descansou no jardim.`, 'garden-fountain': `${state.catName} brincou com a água da fonte!`, 'garden-butterflies': `${state.catName} tentou alcançar as borboletas!`,
      'park-picnic': `${state.catName} encontrou um delicioso piquenique!`, 'park-slide': `${state.catName} desceu pelo escorregador!`, 'park-kite': `${state.catName} empinou a pipa bem alto!`,
      'library-globe': `${state.catName} escolheu um lugar para conhecer!`, 'library-desk': `${state.catName} abriu o caderno de aventuras!`, 'library-plant': `${state.catName} cuidou da plantinha!`,
      'palace-throne': `${state.catName} sentou no trono dos mestres!`, 'palace-treasure': `${state.catName} encontrou um tesouro brilhante!`, 'palace-chandelier': `${state.catName} fez o lustre de estrelas brilhar!`
    };
    playSound('reward'); react('curious', actions[id] || `${state.catName} brincou com ${item.name}!`);
  }
  function finishOnboarding() {
    const child = app.querySelector('#first-name')?.value.trim().replace(/[\u0000-\u001f]/g, '').slice(0, 28);
    const cat = app.querySelector('#cat-name')?.value.trim().replace(/[\u0000-\u001f]/g, '').slice(0, 20);
    if (!child) return message('Conte para o gatinho o nome da criança. 🐾');
    state.name = child; state.catName = cat || 'Mimi'; state.onboardingComplete = true;
    const nicknameMessage = childDisplayName() === 'Caçambita' ? ` Apelido especial ativado: ${state.catName} vai te chamar de Caçambita. 💜` : '';
    save(); render(); message(`Bem-vindo, ${childDisplayName()}! ${state.catName} já é seu novo amigo! 🎉${nicknameMessage}`, 4300);
  }
  function feedCat() {
    if (state.feedDay !== dayKey()) { state.feedDay = dayKey(); state.feedingsToday = 0; }
    if (state.feedingsToday >= 2) return message(`${state.catName} já está satisfeito hoje. 💜`);
    if (state.food < 1) { ui.shopTab = 'food'; ui.view = 'shop'; render(); return message('Você precisa de um peixinho. Há mais na loja! 🐟'); }
    const before = stageNumber();
    state.food -= 1; state.careHearts += 1; state.feedingsToday += 1;
    const stayedSad = state.catMood === 'sad';
    checkAchievements(); playSound('reward'); save(); render();
    if (stageNumber() > before) message(`${state.catName} evoluiu para ${STAGES[stageNumber()-1]}! 🎉`, 3600);
    else if (stayedSad) message(`${state.catName} aceitou o lanchinho e ganhou um coração, mas ainda espera um desafio perfeito. 💗`, 3600);
    else message(`${state.catName} adorou! Vocês ganharam um coração de cuidado. 💗`, 3000);
  }
  function saveName() {
    const val = app.querySelector('#name-input')?.value.trim();
    const catVal = app.querySelector('#cat-name-input')?.value.trim();
    if (!val) return message('Escreva um nome para seu jogador.');
    state.name = val.replace(/[\u0000-\u001f]/g, '').slice(0, 28);
    state.catName = (catVal || 'Mimi').replace(/[\u0000-\u001f]/g, '').slice(0, 20);
    save(); render(); message(childDisplayName() === 'Caçambita' ? 'Nomes atualizados! O apelido especial será Caçambita. ✨' : 'Nomes atualizados! ✨');
  }
  function exportSave() {
    const content = JSON.stringify(state, null, 2);
    const file = new Blob([content], {type:'application/json'});
    const href = URL.createObjectURL(file);
    const a = document.createElement('a'); a.href = href; a.download = `miaumatica-progresso-${dayKey()}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(href), 1000);
    message('Backup exportado! 📦');
  }
  async function importSave(file) {
    if (!file) return;
    if (file.size > 2_000_000) return message('Arquivo muito grande para um backup do jogo.');
    try {
      const candidate = normalize(JSON.parse(await file.text()));
      if (!(await askConfirmation('Importar progresso?',
        'Os dados salvos neste navegador serão substituídos pelo arquivo escolhido.', 'Importar'))) return;
      state = candidate; ui.preview = null; ui.view = 'home';
      save(); render(); message('Progresso importado com sucesso! 🎉');
    } catch (err) { message(`Não foi possível importar: ${err.message}`); }
  }
  app.addEventListener('click', async event => {
    const node = event.target.closest('[data-action]');
    if (!node || node.disabled || !app.contains(node)) return;
    const action = node.dataset.action;
    if (action === 'finish-onboarding') return finishOnboarding();
    if (action === 'navigate') return navigate(node.dataset.view);
    if (action === 'select-op') { ui.op = node.dataset.op; return navigate('levels'); }
    if (action === 'start-level') {
      const replacing = !!state.session;
      const targetLevel = Number(node.dataset.level);
      if (state.session && !(await askConfirmation('Trocar de sequência?',
        'A sequência atual será substituída. Seu progresso já concluído continuará salvo.', 'Iniciar nova'))) return;
      if (replacing && state.completed[node.dataset.op].includes(targetLevel)) { state.catMood = 'sad'; state.mistakePressure = Math.max(3, state.mistakePressure); }
      return beginSession('level', node.dataset.op, targetLevel);
    }
    if (action === 'start-daily') {
      const replacing = !!state.session;
      if (state.session && !(await askConfirmation('Iniciar outro treino?',
        'A sequência atual será substituída. Seu progresso já concluído continuará salvo.', 'Iniciar treino'))) return;
      if (replacing && today().bonusClaimed) { state.catMood = 'sad'; state.mistakePressure = Math.max(3, state.mistakePressure); }
      return beginSession('daily', 'add', 1);
    }
    if (action === 'resume') { ui.view = 'play'; ui.feedback = ''; return render(); }
    if (action === 'leave') return abandon();
    if (action === 'speak-question') return speakQuestion();
    if (action === 'choice-answer' && state.session && !ui.locked) { state.session.answerText = node.dataset.value; return submitAnswer(); }
    if (action === 'key') return typeKey(node.dataset.key);
    if (action === 'hint' && state.session) { state.session.hintUsed = true; ui.showHint = true; save(); return render(); }
    if (action === 'pet-cat') return state.catMood === 'sad' ? react('sad', `${state.catName} recebeu o carinho, mas ainda espera um desafio perfeito. 🐾`) : react('celebrate', `${state.catName} adorou seu carinho, ${childDisplayName()}! 🐾`);
    if (action === 'sleep-cat') return react('sleepy', `${state.catName} está tirando um cochilo. Zzz... 💤`);
    if (action === 'play-cat') return react('curious', `${state.catName} está se divertindo com você! ✨`);
    if (action === 'use-furniture') return useFurniture(node.dataset.item);
    if (action === 'feed-cat') return feedCat();
    if (action === 'go-food-shop') { ui.shopTab = 'food'; return navigate('shop'); }
    if (action === 'scene') {
      const idx = SCENES.findIndex(x => x.id === node.dataset.scene);
      if (idx >= 0 && idx < stageNumber()) { state.selectedScene = SCENES[idx].id; save(); render(); }
      return;
    }
    if (action === 'tab') { ui.shopTab = ['accessories','food', ...(FURNITURE_ENABLED ? ['furniture'] : [])].includes(node.dataset.tab) ? node.dataset.tab : 'colors'; ui.preview = null; return render(); }
    if (action === 'preview') { ui.preview = { kind: node.dataset.kind, id: node.dataset.item }; return render(); }
    if (action === 'shop-item') return shopItem(node.dataset.kind, node.dataset.item);
    if (action === 'buy-food') return buyFood(node.dataset.item);
    if (action === 'furniture-item') return furnitureItem(node.dataset.item);
    if (action === 'save-name') return saveName();
    if (action === 'toggle-sound') { state.soundEnabled = !state.soundEnabled; save(); render(); if (state.soundEnabled) playSound('reward'); return; }
    if (action === 'export') return exportSave();
    if (action === 'reset') {
      if (!(await askConfirmation('Apagar todo o progresso?',
        'Níveis, moedas, compras e conquistas serão apagados deste navegador. Essa ação não pode ser desfeita.', 'Apagar tudo', true))) return;
      if (!(await askConfirmation('Tem certeza absoluta?',
        'Esta é a última confirmação. Um backup em JSON pode preservar seu progresso antes de apagá-lo.', 'Sim, apagar', true))) return;
      state = defaults(); ui.view = 'home'; ui.preview = null; save(); render(); message('Jogo reiniciado. 🐾');
    }
  });
  app.addEventListener('change', event => {
    if (event.target.id === 'import-file') { importSave(event.target.files?.[0]); event.target.value = ''; }
  });
  app.addEventListener('input', event => {
    if (event.target.id === 'name-input' || event.target.id === 'first-name') event.target.value = event.target.value.slice(0, 28);
    if (event.target.id === 'cat-name-input' || event.target.id === 'cat-name') event.target.value = event.target.value.slice(0, 20);
  });
  window.addEventListener('keydown', event => {
    // The modal owns keyboard input while it is open (including Escape).
    if (document.querySelector('.confirm-dialog')) return;
    if (ui.view !== 'play' || !state.session || event.ctrlKey || event.altKey || event.metaKey) return;
    if (document.activeElement?.tagName === 'INPUT') return;
    if (/^[0-9]$/.test(event.key)) { event.preventDefault(); typeKey(event.key); }
    if (event.key === 'Backspace') { event.preventDefault(); typeKey('back'); }
    if (event.key === 'Enter') { event.preventDefault(); typeKey('submit'); }
    if (event.key === 'Escape') { event.preventDefault(); abandon(); }
  });

  // A small deterministic surface for automated checks of mathematical invariants.
  window.MiaumaticaTest = Object.freeze({
    correctAnswer,
    sample: (op, level, count = 100) => Array.from({ length: count }, () => singleQuestion(op, level)),
    formattedSample: (op, level, count = 100) => Array.from({ length: count }, () => decorateQuestion(singleQuestion(op, level))),
    getState: () => JSON.parse(JSON.stringify(state)),
    normalizeSave: input => JSON.parse(JSON.stringify(normalize(input))),
    stageFor: (xp, hearts) => stage(xp, hearts),
    nicknameFor,
    isPerfectScore,
    levelGuide: LEVEL_GUIDE,
    colors: COLORS.map(({id,requiredLevel}) => ({id,requiredLevel})),
    accessories: ACCESSORIES.map(({id,requiredLevel}) => ({id,requiredLevel})),
    furniture: FURNITURE.map(({id,scene,requiredLevel}) => ({id,scene,requiredLevel})),
    furnitureEnabled: FURNITURE_ENABLED,
    bestLevel: highestCompletedLevel,
    canPurchase: (kind, id) => {
      const isColor = kind === 'color';
      const item = (isColor ? COLORS : ACCESSORIES).find(x => x.id === id);
      return item ? canPurchase(item, (isColor ? state.purchasedColors : state.purchasedAccessories).includes(id)) : false;
    },
    DAILY_GOAL,
    MAX_LEVEL
  });
  save(); render();
})();
