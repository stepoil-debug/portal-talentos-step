const ENDPOINT = 'https://qxmxtbjxkhecqilpnhgq.supabase.co/functions/v1/portal-talentos-funcoes';
const CACHE_KEY = 'step-careers-company-functions-v2';
const CACHE_TTL = 12 * 60 * 60 * 1000;

const copy = {
  'pt-BR': {
    sectionTitle: '6. Funções e competências',
    title: 'Funções / especialidades',
    help: 'Pesquise e selecione uma ou mais funções. A lista usa as funções atualmente existentes na STEP.',
    placeholder: 'Busque uma função...',
    empty: 'Nenhuma função encontrada',
    other: 'Outros / não encontrei minha função',
    customTitle: 'Qual é a sua função?',
    customPlaceholder: 'Digite sua função ou especialidade',
    add: 'Adicionar',
    cancel: 'Cancelar',
    helper: count => `${count} funções da STEP disponíveis como referência. Você também pode informar outra função.`
  },
  'pt-PT': {
    sectionTitle: '6. Funções e competências',
    title: 'Funções / especialidades',
    help: 'Pesquise e selecione uma ou mais funções. A lista utiliza as funções atualmente existentes na STEP.',
    placeholder: 'Pesquisar uma função...',
    empty: 'Nenhuma função encontrada',
    other: 'Outros / não encontrei a minha função',
    customTitle: 'Qual é a sua função?',
    customPlaceholder: 'Introduza a sua função ou especialidade',
    add: 'Adicionar',
    cancel: 'Cancelar',
    helper: count => `${count} funções da STEP disponíveis como referência. Também pode indicar outra função.`
  },
  en: {
    sectionTitle: '6. Roles & skills',
    title: 'Roles / specialties',
    help: 'Search and select one or more roles. The list is based on roles currently used at STEP.',
    placeholder: 'Search for a role...',
    empty: 'No matching role found',
    other: 'Other / I could not find my role',
    customTitle: 'What is your role?',
    customPlaceholder: 'Enter your role or specialty',
    add: 'Add',
    cancel: 'Cancel',
    helper: count => `${count} STEP roles available as reference. You can also enter another role.`
  },
  es: {
    sectionTitle: '6. Funciones y competencias',
    title: 'Funciones / especialidades',
    help: 'Busca y selecciona una o más funciones. La lista utiliza las funciones que existen actualmente en STEP.',
    placeholder: 'Buscar una función...',
    empty: 'No se encontró ninguna función',
    other: 'Otros / no encontré mi función',
    customTitle: '¿Cuál es tu función?',
    customPlaceholder: 'Escribe tu función o especialidad',
    add: 'Añadir',
    cancel: 'Cancelar',
    helper: count => `${count} funciones de STEP disponibles como referencia. También puedes indicar otra función.`
  },
  fr: {
    sectionTitle: '6. Fonctions et compétences',
    title: 'Fonctions / spécialités',
    help: 'Recherchez et sélectionnez une ou plusieurs fonctions. La liste reprend les fonctions actuellement utilisées chez STEP.',
    placeholder: 'Rechercher une fonction...',
    empty: 'Aucune fonction trouvée',
    other: 'Autre / je ne trouve pas ma fonction',
    customTitle: 'Quelle est votre fonction ?',
    customPlaceholder: 'Saisissez votre fonction ou spécialité',
    add: 'Ajouter',
    cancel: 'Annuler',
    helper: count => `${count} fonctions STEP disponibles comme référence. Vous pouvez aussi indiquer une autre fonction.`
  }
};

const roleTranslationText = `AJUDANTE DE CALDEIRARIA|Ajudante de caldeiraria|Boilermaker helper|Ayudante de calderería|Aide chaudronnier
AJUDANTE DE ELETRICA|Ajudante de eletricidade|Electrical helper|Ayudante electricista|Aide électricien
AJUDANTE DE MECANICA|Ajudante de mecânica|Mechanical helper|Ayudante de mecánica|Aide mécanicien
AJUDANTE DE SOLDADOR|Ajudante de soldador|Welder helper|Ayudante de soldador|Aide soudeur
ALMOXARIFE|Almoxarife|Storekeeper|Almacenero|Magasinier
ANALISTA ADMINISTRATIVO|Analista administrativo|Administrative analyst|Analista administrativo|Analyste administratif
ANALISTA CONTÁBIL|Analista contabilístico|Accounting analyst|Analista contable|Analyste comptable
ANALISTA DE ALMOXARIFADO|Analista de armazém|Warehouse analyst|Analista de almacén|Analyste magasin
ANALISTA DE CUSTOS|Analista de custos|Cost analyst|Analista de costes|Analyste des coûts
ANALISTA DE DADOS|Analista de dados|Data analyst|Analista de datos|Analyste de données
ANALISTA DE DEPTO. PESSOAL|Analista de administração de pessoal|Personnel administration analyst|Analista de administración de personal|Analyste administration du personnel
ANALISTA DE LOGISTICA DE PESSOAL|Analista de logística de pessoal|Personnel logistics analyst|Analista de logística de personal|Analyste logistique du personnel
ANALISTA DE ORÇAMENTO|Analista de orçamentos|Budget analyst|Analista de presupuestos|Analyste budgétaire
ANALISTA DE PROJETOS|Analista de projetos|Project analyst|Analista de proyectos|Analyste projets
ANALISTA DE RECRUTAMENTO E SELEÇÃO|Analista de recrutamento e seleção|Recruitment & selection analyst|Analista de reclutamiento y selección|Analyste recrutement et sélection
ANALISTA DE RECURSOS HUMANOS|Analista de recursos humanos|Human resources analyst|Analista de recursos humanos|Analyste ressources humaines
ANALISTA DE SGI|Analista de SGI|Integrated management system analyst|Analista de sistema integrado de gestión|Analyste système de management intégré
ANALISTA DE TI|Analista de TI|IT analyst|Analista de TI|Analyste informatique
ANALISTA FINANCEIRO|Analista financeiro|Financial analyst|Analista financiero|Analyste financier
ANALISTA FISCAL|Analista fiscal|Tax analyst|Analista fiscal|Analyste fiscal
ASSISTENTE ADMINISTRATIVO|Assistente administrativo|Administrative assistant|Asistente administrativo|Assistant administratif
ASSISTENTE DE CONTROLE DE PINTURA|Assistente de controlo de pintura|Painting control assistant|Asistente de control de pintura|Assistant contrôle peinture
ASSISTENTE DE ESTOQUE|Assistente de stock|Inventory assistant|Asistente de inventario|Assistant stocks
ASSISTENTE DE LOGISTICA DE MATERIAIS|Assistente de logística de materiais|Materials logistics assistant|Asistente de logística de materiales|Assistant logistique matériaux
ASSISTENTE DE MATERIAIS|Assistente de materiais|Materials assistant|Asistente de materiales|Assistant matériaux
ASSISTENTE DE ORÇAMENTOS|Assistente de orçamentos|Budgeting assistant|Asistente de presupuestos|Assistant chiffrage
ASSISTENTE DE QUALIDADE|Assistente de qualidade|Quality assistant|Asistente de calidad|Assistant qualité
ASSISTENTE DE RECURSOS HUMANOS|Assistente de recursos humanos|Human resources assistant|Asistente de recursos humanos|Assistant ressources humaines
AUXILIAR DE ALMOXARIFADO|Auxiliar de armazém|Warehouse helper|Auxiliar de almacén|Aide magasinier
AUXILIAR DE DESENHO|Auxiliar de desenho|Drafting assistant|Auxiliar de dibujo técnico|Assistant dessin technique
AUXILIAR DE JATEAMENTO E PINTURA|Auxiliar de jateamento e pintura|Blasting & painting helper|Auxiliar de granallado y pintura|Aide sablage et peinture
AUXILIAR DE LOGISTICA DE MATERIAIS|Auxiliar de logística de materiais|Materials logistics helper|Auxiliar de logística de materiales|Aide logistique matériaux
AUXILIAR DE PROJETOS|Auxiliar de projetos|Project assistant|Auxiliar de proyectos|Assistant projets
AUXILIAR DE QUALIDADE|Auxiliar de qualidade|Quality helper|Auxiliar de calidad|Aide qualité
AUXILIAR DE RECURSOS HUMANOS|Auxiliar de recursos humanos|Human resources helper|Auxiliar de recursos humanos|Aide ressources humaines
AUXILIAR DE SERVIÇOS GERAIS|Auxiliar de serviços gerais|General services assistant|Auxiliar de servicios generales|Agent de services généraux
AUXILIAR DE SERVIÇOS GERAIS NIVEL II|Auxiliar de serviços gerais nível II|General services assistant level II|Auxiliar de servicios generales nivel II|Agent de services généraux niveau II
CALDEIREIRO|Caldeireiro|Boilermaker / Fitter|Calderero|Chaudronnier
COMPRADOR|Comprador|Buyer / Purchaser|Comprador|Acheteur
COORD DE LOGISTICA DE MATERIAIS|Coordenador de logística de materiais|Materials logistics coordinator|Coordinador de logística de materiales|Coordinateur logistique matériaux
COORDENADOR DE DESENHO|Coordenador de desenho|Drafting coordinator|Coordinador de dibujo técnico|Coordinateur dessin technique
COORDENADOR DE DESENVOLVIMENTO E NEGOCIOS|Coordenador de desenvolvimento e negócios|Business development coordinator|Coordinador de desarrollo de negocios|Coordinateur développement commercial
COORDENADOR DE MECÂNICA DE MANUTENÇÃO|Coordenador de mecânica de manutenção|Mechanical maintenance coordinator|Coordinador de mantenimiento mecánico|Coordinateur maintenance mécanique
COORDENADOR DE PROJETOS|Coordenador de projetos|Project coordinator|Coordinador de proyectos|Coordinateur projets
COORDENADOR DE QUALIDADE|Coordenador de qualidade|Quality coordinator|Coordinador de calidad|Coordinateur qualité
COORDENADOR DE SOLDA|Coordenador de soldadura|Welding coordinator|Coordinador de soldadura|Coordinateur soudage
COORDENADOR FINANCEIRO|Coordenador financeiro|Finance coordinator|Coordinador financiero|Coordinateur financier
COORDENADOR OFFSHORE|Coordenador offshore|Offshore coordinator|Coordinador offshore|Coordinateur offshore
COORDNADOR DE SGI|Coordenador de SGI|Integrated management system coordinator|Coordinador de sistema integrado de gestión|Coordinateur système de management intégré
DELINEADOR|Delineador|Field planner / Work preparer|Delineador|Préparateur de travaux
DESENHISTA TECNICO|Desenhador técnico|Technical drafter|Dibujante técnico|Dessinateur technique
DILIGENCIADOR|Diligenciador|Expeditor|Expeditor|Expéditeur
DIRETOR|Diretor|Director|Director|Directeur
DOC. CONTROLLER|Document controller|Document controller|Controlador documental|Document controller
ELETRICISTA|Eletricista|Electrician|Electricista|Électricien
ENCARREGADO|Encarregado|Foreman|Encargado|Chef d'équipe
ENCARREGADO DE ANDAIMES|Encarregado de andaimes|Scaffolding foreman|Encargado de andamios|Chef d'équipe échafaudage
ENGENHEIRO DE SEGURANÇA DO TRABALHO|Engenheiro de segurança no trabalho|Occupational safety engineer|Ingeniero de seguridad laboral|Ingénieur sécurité au travail
GERENTE ADMINISTRATIVO|Gestor administrativo|Administrative manager|Gerente administrativo|Responsable administratif
GERENTE DE QUALIDADE|Gestor de qualidade|Quality manager|Gerente de calidad|Responsable qualité
GERENTE DE RECURSOS HUMANOS|Gestor de recursos humanos|Human resources manager|Gerente de recursos humanos|Responsable ressources humaines
GESTOR DE MUDANÇAS|Gestor de mudanças|Change manager|Gestor de cambios|Responsable conduite du changement
INSPETOR DE LP/PM|Inspetor de LP/PM|PT/MT inspector|Inspector LP/PM|Inspecteur ressuage / magnétoscopie
INSPETOR DE QUALIDADE|Inspetor de qualidade|Quality inspector|Inspector de calidad|Inspecteur qualité
INSPETOR DE SOLDAGEM|Inspetor de soldadura|Welding inspector|Inspector de soldadura|Inspecteur soudage
INSPETOR DIMENSIONAL|Inspetor dimensional|Dimensional inspector|Inspector dimensional|Inspecteur dimensionnel
JOVEM APRENDIZ|Jovem aprendiz|Apprentice|Aprendiz|Apprenti
MECANICO|Mecânico|Mechanic|Mecánico|Mécanicien
MEIO OFICIAL DE MANUTENÇÃO|Meio oficial de manutenção|Maintenance assistant|Ayudante de mantenimiento|Aide maintenance
MONTADOR DE ANDAIMES|Montador de andaimes|Scaffolder|Montador de andamios|Échafaudeur
MOTORISTA|Motorista|Driver|Conductor|Chauffeur
OFICIAL DE MANUTENÇÃO PREDIAL|Oficial de manutenção predial|Building maintenance technician|Técnico de mantenimiento de edificios|Technicien maintenance bâtiment
ORÇAMENTISTA|Orçamentista|Estimator|Presupuestista|Estimateur
PINTOR JATISTA|Pintor jatista|Blaster / Painter|Granallador / Pintor|Sableur / Peintre
PINTOR JATISTA N II C|Pintor jatista N II C|Blaster / Painter level II C|Granallador / Pintor nivel II C|Sableur / Peintre niveau II C
PROJETISTA|Projetista|Designer / Design engineer|Proyectista|Projeteur
SOLDADOR|Soldador|Welder|Soldador|Soudeur
SUPERVISOR|Supervisor|Supervisor|Supervisor|Superviseur
SUPERVISOR ADMINISTRATIVO|Supervisor administrativo|Administrative supervisor|Supervisor administrativo|Superviseur administratif
SUPERVISOR DE ANDAIMES|Supervisor de andaimes|Scaffolding supervisor|Supervisor de andamios|Superviseur échafaudage
SUPERVISOR DE CALDEIRARIA|Supervisor de caldeiraria|Boilermaking supervisor|Supervisor de calderería|Superviseur chaudronnerie
SUPERVISOR DE DESENHO|Supervisor de desenho|Drafting supervisor|Supervisor de dibujo técnico|Superviseur dessin technique
SUPERVISOR DE ELETRICA OFFSHORE|Supervisor de eletricidade offshore|Offshore electrical supervisor|Supervisor eléctrico offshore|Superviseur électricité offshore
SUPERVISOR DE MANUTENÇÃO|Supervisor de manutenção|Maintenance supervisor|Supervisor de mantenimiento|Superviseur maintenance
SUPERVISOR DE PRODUÇÃO|Supervisor de produção|Production supervisor|Supervisor de producción|Superviseur production
SUPERVISOR DE SOLDA|Supervisor de soldadura|Welding supervisor|Supervisor de soldadura|Superviseur soudage
SUPERVISOR DE SOLDAGEM OFFSHORE|Supervisor de soldadura offshore|Offshore welding supervisor|Supervisor de soldadura offshore|Superviseur soudage offshore
SUPERVISOR DE TUBULAÇÃO OFFSHORE|Supervisor de tubagem offshore|Offshore piping supervisor|Supervisor de tuberías offshore|Superviseur tuyauterie offshore
SUPERVISOR ESCALADOR N3|Supervisor de acesso por corda N3|Rope access supervisor level 3|Supervisor de acceso por cuerda nivel 3|Superviseur travaux sur cordes niveau 3
SUPERVISOR OFFSHORE|Supervisor offshore|Offshore supervisor|Supervisor offshore|Superviseur offshore
TÉCNICO DE EXPEDIÇÃO|Técnico de expedição|Shipping technician|Técnico de expedición|Technicien expédition
TÉCNICO DE MATERIAIS|Técnico de materiais|Materials technician|Técnico de materiales|Technicien matériaux
TÉCNICO DE MATERIAIS OFFSHORE|Técnico de materiais offshore|Offshore materials technician|Técnico de materiales offshore|Technicien matériaux offshore
TECNICO DE MECANICA|Técnico de mecânica|Mechanical technician|Técnico mecánico|Technicien mécanique
TÉCNICO DE PLANEJAMENTO|Técnico de planeamento|Planning technician|Técnico de planificación|Technicien planification
TÉCNICO DE SEGURANÇA DO TRABALHO|Técnico de segurança no trabalho|Occupational safety technician|Técnico de seguridad laboral|Technicien sécurité au travail
TUBISTA|Tubista|Pipe fitter|Tubista|Tuyauteur`;

const roleTranslations = new Map(roleTranslationText.split('\n').map(line => {
  const [canonical, ptPT, en, es, fr] = line.split('|');
  return [canonical, {'pt-BR': canonical, 'pt-PT': ptPT, en, es, fr}];
}));

const legacyStatic = new Set(['solda','caldeiraria','mecanica','mecânica','eletrica','elétrica','instrumentacao','instrumentação','irata / acesso por corda','inspecao / end','inspeção / end','offshore']);

function localeFromPage() {
  const rootLocale = document.getElementById('step-careers-root')?.dataset.locale;
  const lang = String(rootLocale || document.documentElement.lang || navigator.language || 'en').toLowerCase();
  if (lang.startsWith('pt-br')) return 'pt-BR';
  if (lang.startsWith('pt')) return 'pt-PT';
  if (lang.startsWith('es')) return 'es';
  if (lang.startsWith('fr')) return 'fr';
  return 'en';
}

function normalize(value = '') {
  return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

function esc(value = '') {
  return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}

function displayRole(canonical, locale) {
  const translated = roleTranslations.get(canonical)?.[locale];
  if (translated) return translated;
  return canonical.toLocaleLowerCase(locale).replace(/(^|[\s/-])\p{L}/gu, match => match.toLocaleUpperCase(locale));
}

function readCache() {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
    if (!cached?.items?.length || !cached?.savedAt) return null;
    if (Date.now() - Number(cached.savedAt) > CACHE_TTL) return null;
    return cached.items;
  } catch (_) { return null; }
}

function writeCache(items) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify({savedAt: Date.now(), items})); } catch (_) {}
}

async function loadFunctions() {
  const cached = readCache();
  if (cached) return cached;
  const response = await fetch(ENDPOINT, {method:'GET', credentials:'omit'});
  if (!response.ok) throw new Error(`functions_${response.status}`);
  const body = await response.json();
  const items = Array.isArray(body?.functions) ? body.functions.filter(Boolean) : [];
  writeCache(items);
  return items;
}

function injectStyles() {
  if (document.getElementById('step-company-functions-v2-style')) return;
  const style = document.createElement('style');
  style.id = 'step-company-functions-v2-style';
  style.textContent = `
    .step-company-functions{margin:2px 0 16px;padding:16px;border:1px solid #d9e5f3;border-radius:14px;background:#fbfdff}
    .step-company-functions-head{margin-bottom:11px}.step-company-functions-head strong{display:block;color:#0b2347;font-size:13px}.step-company-functions-head p{margin:4px 0 0;color:#6a7890;font-size:11px;line-height:1.55;max-width:820px}
    .step-company-functions-search{position:relative}.step-company-functions-search>input{width:100%;min-height:44px;border:1px solid #c8d8ec;border-radius:10px;padding:0 14px;font:inherit;color:#152b4c;background:#fff;outline:none}.step-company-functions-search>input:focus{border-color:#5b9cef;box-shadow:0 0 0 3px rgba(51,126,218,.11)}
    .step-company-functions-menu{position:absolute;z-index:90;left:0;right:0;top:calc(100% + 6px);max-height:310px;overflow:auto;border:1px solid #cfdced;border-radius:12px;background:#fff;box-shadow:0 18px 40px rgba(8,35,74,.16);padding:6px}.step-company-functions-menu[hidden]{display:none}
    .step-company-functions-option{width:100%;border:0;background:transparent;text-align:left;padding:10px 11px;border-radius:8px;font:inherit;font-size:12px;color:#1c3455;cursor:pointer}.step-company-functions-option:hover,.step-company-functions-option:focus{background:#eef6ff;outline:none}.step-company-functions-option.is-other{margin-top:5px;border-top:1px solid #e5edf7;border-radius:0 0 8px 8px;color:#0867d7;font-weight:800}.step-company-functions-empty{padding:10px 11px;color:#7c8aa0;font-size:12px}
    .step-company-functions-selected{display:flex;flex-wrap:wrap;gap:7px;margin-top:11px}.step-company-function-chip{display:inline-flex;align-items:center;gap:7px;padding:7px 9px 7px 11px;border-radius:999px;background:#eaf3ff;color:#155cad;border:1px solid #cfe0f5;font-size:11px;font-weight:760}.step-company-function-chip button{border:0;background:transparent;color:#55759b;cursor:pointer;padding:0;font-size:15px;line-height:1}
    .step-company-functions-custom{display:grid;grid-template-columns:1fr auto auto;gap:8px;align-items:end;margin-top:10px;padding:12px;border-radius:11px;background:#f4f8fd;border:1px solid #dce8f5}.step-company-functions-custom[hidden]{display:none}.step-company-functions-custom label{display:block;color:#263d5d;font-size:11px;font-weight:800;margin-bottom:5px}.step-company-functions-custom input{width:100%;min-height:38px;border:1px solid #c9d8eb;border-radius:9px;padding:0 11px;font:inherit;font-size:12px;background:#fff}.step-company-functions-custom button{min-height:38px;border-radius:9px;padding:0 13px;font:inherit;font-size:11px;font-weight:800;cursor:pointer}.step-company-functions-custom .is-add{border:0;background:#0867d7;color:#fff}.step-company-functions-custom .is-cancel{border:1px solid #c8d8ec;background:#fff;color:#4f647f}
    .step-target-role-helper{margin-top:6px;color:#78869a;font-size:10px}
    @media(max-width:640px){.step-company-functions{padding:13px}.step-company-functions-custom{grid-template-columns:1fr 1fr}.step-company-functions-custom>div{grid-column:1/-1}}
  `;
  document.head.appendChild(style);
}

function draftQualificationValues(locale) {
  const keys = [`step-careers-draft-v2:${locale}`, 'step-careers-draft-v2', `step-careers-draft-v1:${locale}`];
  for (const key of keys) {
    try {
      const raw = JSON.parse(localStorage.getItem(key) || 'null');
      const q = raw?.qualifications;
      if (Array.isArray(q) && q.length) return q.filter(value => !legacyStatic.has(normalize(value)));
    } catch (_) {}
  }
  return [];
}

async function bootCompanyFunctions() {
  const root = document.getElementById('step-careers-root');
  const form = root?.querySelector('#step-careers-form');
  if (!root || !form || form.dataset.companyFunctionsV2Ready === '1') return false;
  const oldQualifications = form.querySelector('.step-careers-qualifications');
  const targetRole = form.querySelector('input[name="targetRole"]');
  if (!oldQualifications || !targetRole) return false;

  form.dataset.companyFunctionsV2Ready = '1';
  injectStyles();
  const locale = localeFromPage();
  const t = copy[locale] || copy.en;

  const section = oldQualifications.closest('.step-careers-section');
  const sectionTitle = section?.querySelector('.step-careers-section-head h2');
  if (sectionTitle) sectionTitle.textContent = t.sectionTitle;

  let functions = [];
  try { functions = await loadFunctions(); } catch (error) { console.warn('[STEP Careers] company functions unavailable', error); }
  const roleItems = functions.map(canonical => ({canonical, display: displayRole(canonical, locale)})).sort((a,b) => a.display.localeCompare(b.display, locale));

  if (roleItems.length) {
    const datalist = document.createElement('datalist');
    datalist.id = `step-company-functions-datalist-${locale.replace(/[^a-z]/gi,'')}`;
    datalist.innerHTML = roleItems.map(item => `<option value="${esc(item.display)}"></option>`).join('');
    document.body.appendChild(datalist);
    targetRole.setAttribute('list', datalist.id);
    const helper = document.createElement('div');
    helper.className = 'step-target-role-helper';
    helper.textContent = t.helper(roleItems.length);
    targetRole.closest('.step-careers-field')?.appendChild(helper);
  }

  const wrapper = document.createElement('div');
  wrapper.className = 'step-company-functions';
  wrapper.innerHTML = `
    <div class="step-company-functions-head"><strong>${esc(t.title)}</strong><p>${esc(t.help)}</p></div>
    <div class="step-company-functions-search">
      <input type="text" data-company-function-search autocomplete="off" placeholder="${esc(t.placeholder)}" aria-autocomplete="list">
      <div class="step-company-functions-menu" data-company-function-menu hidden></div>
    </div>
    <div class="step-company-functions-selected" data-company-function-selected></div>
    <div class="step-company-functions-hidden" data-company-function-hidden></div>
    <div class="step-company-functions-custom" data-company-function-custom hidden>
      <div><label>${esc(t.customTitle)}</label><input type="text" data-company-function-custom-input placeholder="${esc(t.customPlaceholder)}"></div>
      <button type="button" class="is-add" data-company-function-custom-add>${esc(t.add)}</button>
      <button type="button" class="is-cancel" data-company-function-custom-cancel>${esc(t.cancel)}</button>
    </div>`;
  oldQualifications.before(wrapper);
  oldQualifications.remove();

  const search = wrapper.querySelector('[data-company-function-search]');
  const menu = wrapper.querySelector('[data-company-function-menu]');
  const selectedWrap = wrapper.querySelector('[data-company-function-selected]');
  const hiddenWrap = wrapper.querySelector('[data-company-function-hidden]');
  const customBox = wrapper.querySelector('[data-company-function-custom]');
  const customInput = wrapper.querySelector('[data-company-function-custom-input]');
  const selected = new Map();

  function notify() {
    form.dispatchEvent(new Event('input', {bubbles:true}));
    form.dispatchEvent(new Event('change', {bubbles:true}));
  }

  function addSelection(value, canonical = null, doNotify = true) {
    const display = String(value || '').trim().slice(0, 180);
    const stored = String(canonical || display).trim().slice(0, 180);
    if (!display || !stored) return;
    const key = normalize(stored);
    if (!key || selected.has(key)) return;
    selected.set(key, {display, stored});

    const chip = document.createElement('span');
    chip.className = 'step-company-function-chip';
    chip.dataset.key = key;
    chip.innerHTML = `<span>${esc(display)}</span><button type="button" aria-label="×">×</button>`;
    chip.querySelector('button').addEventListener('click', () => removeSelection(key));
    selectedWrap.appendChild(chip);

    const hidden = document.createElement('input');
    hidden.type = 'checkbox';
    hidden.name = 'qualification';
    hidden.value = stored;
    hidden.checked = true;
    hidden.hidden = true;
    hidden.dataset.companyFunction = key;
    hiddenWrap.appendChild(hidden);
    if (doNotify) notify();
  }

  function removeSelection(key) {
    selected.delete(key);
    selectedWrap.querySelector(`[data-key="${CSS.escape(key)}"]`)?.remove();
    hiddenWrap.querySelector(`[data-company-function="${CSS.escape(key)}"]`)?.remove();
    notify();
  }

  function matches(query) {
    const q = normalize(query);
    const source = q ? roleItems.filter(item => normalize(item.display).includes(q) || normalize(item.canonical).includes(q)) : roleItems;
    return source.filter(item => !selected.has(normalize(item.canonical))).slice(0, 14);
  }

  function openCustom(prefill = '') {
    customBox.hidden = false;
    customInput.value = prefill;
    menu.hidden = true;
    requestAnimationFrame(() => customInput.focus());
  }

  function closeCustom() {
    customBox.hidden = true;
    customInput.value = '';
  }

  function renderMenu() {
    const typed = search.value.trim();
    const items = matches(typed);
    menu.innerHTML = '';
    if (!items.length && typed) menu.innerHTML = `<div class="step-company-functions-empty">${esc(t.empty)}</div>`;
    items.forEach(item => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'step-company-functions-option';
      button.textContent = item.display;
      button.addEventListener('mousedown', event => event.preventDefault());
      button.addEventListener('click', () => {
        addSelection(item.display, item.canonical);
        search.value = '';
        menu.hidden = true;
        search.focus();
      });
      menu.appendChild(button);
    });
    const other = document.createElement('button');
    other.type = 'button';
    other.className = 'step-company-functions-option is-other';
    other.textContent = t.other;
    other.addEventListener('mousedown', event => event.preventDefault());
    other.addEventListener('click', () => openCustom(typed));
    menu.appendChild(other);
    menu.hidden = false;
  }

  search.addEventListener('focus', renderMenu);
  search.addEventListener('input', renderMenu);
  search.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const first = menu.querySelector('.step-company-functions-option:not(.is-other)');
      if (first) first.click(); else openCustom(search.value.trim());
    }
    if (event.key === 'Escape') menu.hidden = true;
  });
  document.addEventListener('click', event => { if (!wrapper.contains(event.target)) menu.hidden = true; });

  wrapper.querySelector('[data-company-function-custom-add]').addEventListener('click', () => {
    const value = customInput.value.trim();
    if (!value) { customInput.focus(); return; }
    addSelection(value, null);
    closeCustom();
    search.value = '';
    search.focus();
  });
  wrapper.querySelector('[data-company-function-custom-cancel]').addEventListener('click', () => { closeCustom(); search.focus(); });
  customInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') { event.preventDefault(); wrapper.querySelector('[data-company-function-custom-add]').click(); }
    if (event.key === 'Escape') { event.preventDefault(); closeCustom(); search.focus(); }
  });

  const drafts = draftQualificationValues(locale);
  const canonicalMap = new Map(roleItems.map(item => [normalize(item.canonical), item]));
  const displayMap = new Map(roleItems.map(item => [normalize(item.display), item]));
  drafts.forEach(value => {
    const match = canonicalMap.get(normalize(value)) || displayMap.get(normalize(value));
    if (match) addSelection(match.display, match.canonical, false);
    else addSelection(value, null, false);
  });
  if (drafts.length) notify();
  return true;
}

queueMicrotask(() => {
  if (bootCompanyFunctions()) return;
  const observer = new MutationObserver(() => {
    bootCompanyFunctions().then(ok => { if (ok) observer.disconnect(); });
  });
  observer.observe(document.documentElement, {childList:true, subtree:true});
});