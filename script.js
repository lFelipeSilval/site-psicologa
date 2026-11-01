(function () {
  // Menu mobile
  let burger = document.getElementById('burger'), links = document.getElementById('links');
  burger.addEventListener('click', function () {
    let open = links.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  links.addEventListener('click', function (e) { if (e.target.tagName === 'A') { links.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); } });

  document.getElementById('year').textContent = new Date().getFullYear();

  // Categorias
  let cats = [
    ['🌧️', 'Ansiedade e estresse', 'Ferramentas para lidar com preocupação excessiva, crises de ansiedade e sobrecarga.'],
    ['🌱', 'Depressão e humor', 'Acolhimento e estratégias para retomar energia, sentido e motivação.'],
    ['🤝', 'Relacionamentos', 'Comunicação, limites e vínculos mais saudáveis em família, amizades e no amor.'],
    ['🧭', 'Autoconhecimento', 'Entender seus padrões, valores e escolhas para viver com mais clareza.'],
    ['💼', 'Carreira e burnout', 'Apoio em transições profissionais, pressão no trabalho e esgotamento.'],
    ['🕊️', 'Luto e perdas', 'Espaço respeitoso para elaborar despedidas, mudanças e finais de ciclo.']
  ];
  document.getElementById('cats').innerHTML = cats.map(function (c) {
    return '<article class="card reveal"><div class="icon">' + c[0] + '</div><h3>' + c[1] + '</h3><p>' + c[2] + '</p></article>';
  }).join('');

  // Horários
  let agenda = {
    'Seg': ['19:00', '20:00', '21:00', '22:00'],
    'Ter': ['19:00', '20:00', '21:00', '22:00'],
    'Qua': ['19:00', '20:00', '21:00', '22:00'],
    'Qui': ['19:00', '20:00', '21:00', '22:00'],
    'Sex': ['19:00', '20:00', '21:00', '22:00'],
    //'Sáb':['16:00','17:00','18:00','19:00','20:00']
  };
  //let busy={'Seg-19:00':1,'Ter-19:00':1,'Qua-19:00':1,'Qui-19:00':1,'Sex-19:00':1,'Sáb-19:00':1};
  let full = { 'Seg': 'segunda-feira', 'Ter': 'terça-feira', 'Qua': 'quarta-feira', 'Qui': 'quinta-feira', 'Sex': 'sexta-feira', 'Sáb': 'sábado' };
  let daysEl = document.getElementById('days'), slotsEl = document.getElementById('slots');
  let book = document.getElementById('book'), pickText = document.getElementById('pickText');
  let day = Object.keys(agenda)[0], chosen = null;

  function renderDays() {
    daysEl.innerHTML = '';
    Object.keys(agenda).forEach(function (d) {
      let b = document.createElement('button');
      b.className = 'day'; b.textContent = d; b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', d === day);
      b.onclick = function () { day = d; chosen = null; renderDays(); renderSlots(); updatePick(); };
      daysEl.appendChild(b);
    });
  }
  function renderSlots() {
    slotsEl.innerHTML = '';
    agenda[day].forEach(function (t) {
      let b = document.createElement('button'); b.className = 'slot'; b.textContent = t;
      //let taken=busy[day+'-'+t];
      //if(taken){b.disabled=true;}
      b.setAttribute('aria-pressed', chosen === t);
      b.onclick = function () { chosen = t; renderSlots(); updatePick(); };
      slotsEl.appendChild(b);
    });
  }
  function updatePick() {
    if (!chosen) {
      book.textContent = 'Selecione um horário'; book.href = '#contato';
      book.removeAttribute('target'); pickText.textContent = 'Nenhum horário selecionado.';
      return;
    }
    let msg = 'Olá, Carla! Gostaria de agendar uma sessão na ' + full[day] + ' às ' + chosen + '.';
    book.textContent = 'Solicitar pelo WhatsApp';
    book.href = 'https://wa.me/5511970985946?text=' + encodeURIComponent(msg);
    book.target = '_blank'; book.rel = 'noopener';
    pickText.textContent = 'Selecionado: ' + full[day] + ', às ' + chosen + '.';
  }
  renderDays(); renderSlots();

  // Animações de entrada + contadores
  let io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: .15 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  document.querySelectorAll('[data-count]').forEach(function (el) {
    let end = +el.dataset.count, n = 0, step = Math.max(1, Math.ceil(end / 50));
    let t = setInterval(function () { n = Math.min(end, n + step); el.textContent = n + (end >= 100 ? '+' : ''); if (n >= end) clearInterval(t); }, 30);
  });

  // Link ativo no menu
  let secs = [].slice.call(document.querySelectorAll('main section'));
  let nav = [].slice.call(document.querySelectorAll('.links a:not(.btn)'));
  window.addEventListener('scroll', function () {
    let y = window.scrollY + 140, cur = secs[0].id;
    secs.forEach(function (s) { if (s.offsetTop <= y) cur = s.id; });
    nav.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + cur); });
  }, { passive: true });
})();
