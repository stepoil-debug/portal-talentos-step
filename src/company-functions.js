const ENDPOINT = 'https://qxmxtbjxkhecqilpnhgq.supabase.co/functions/v1/portal-talentos-funcoes';
const CACHE_KEY = 'step-careers-company-functions-v1';
const CACHE_TTL = 12 * 60 * 60 * 1000;

const copy = {
  'pt-BR': {
    title: 'Funções / especialidades',
    help: 'Pesquise e selecione uma ou mais funções já existentes na STEP. Se sua função não estiver na lista, você também pode adicioná-la manualmente.',
    placeholder: 'Ex.: Soldador, Caldeireiro, Tubista, Supervisor...',
    empty: 'Nenhuma função encontrada',
    add: 'Adicionar',
    complementary: 'Áreas complementares',
    selected: 'Selecionadas'
  },
  'pt-PT': {
    title: 'Funções / especialidades',
    help: 'Pesquise e selecione uma ou mais funções já existentes na STEP. Se a sua função não estiver na lista, também pode adicioná-la manualmente.',
    placeholder: 'Ex.: Soldador, Caldeireiro, Tubista, Supervisor...',
    empty: 'Nenhuma função encontrada',
    add: 'Adicionar',
    complementary: 'Áreas complementares',
    selected: 'Selecionadas'
  },
  en: {
    title: 'Roles / specialties',
    help: 'Search and select one or more roles already used at STEP. If your role is not listed, you can also add it manually.',
    placeholder: 'E.g. Welder, Fitter, Pipe Fitter, Supervisor...',
    empty: 'No matching role found',
    add: 'Add',
    complementary: 'Complementary areas',
    selected: 'Selected'
  },
  es: {
    title: 'Funciones / especialidades',
    help: 'Busca y selecciona una o más funciones ya utilizadas en STEP. Si tu función no aparece, también puedes añadirla manualmente.',
    placeholder: 'Ej.: Soldador, Calderero, Tubista, Supervisor...',
    empty: 'No se encontró ninguna función',
    add: 'Añadir',
    complementary: 'Áreas complementarias',
    selected: 'Seleccionadas'
  },
  fr: {
    title: 'Fonctions / spécialités',
    help: 'Recherchez et sélectionnez une ou plusieurs fonctions déjà utilisées chez STEP. Si votre fonction n’est pas listée, vous pouvez aussi l’ajouter manuellement.',
    placeholder: 'Ex. Soudeur, Chaudronnier, Tuyauteur, Superviseur...',
    empty: 'Aucune fonction trouvée',
    add: 'Ajouter',
    complementary: 'Domaines complémentaires',
    selected: 'Sélectionnées'
  }
};

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
  if (document.getElementById('step-company-functions-style')) return;
  const style = document.createElement('style');
  style.id = 'step-company-functions-style';
  style.textContent = `
    .step-company-functions{margin:2px 0 18px;padding:16px;border:1px solid #d9e5f3;border-radius:14px;background:#fbfdff}
    .step-company-functions-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:10px}
    .step-company-functions-head strong{display:block;color:#0b2347;font-size:13px}
    .step-company-functions-head p{margin:4px 0 0;color:#6a7890;font-size:11px;line-height:1.55;max-width:760px}
    .step-company-functions-search{position:relative}
    .step-company-functions-search input{width:100%;min-height:44px;border:1px solid #c8d8ec;border-radius:10px;padding:0 14px;font:inherit;color:#152b4c;background:#fff;outline:none}
    .step-company-functions-search input:focus{border-color:#5b9cef;box-shadow:0 0 0 3px rgba(51,126,218,.11)}
    .step-company-functions-menu{position:absolute;z-index:60;left:0;right:0;top:calc(100% + 6px);max-height:280px;overflow:auto;border:1px solid #cfdced;border-radius:12px;background:#fff;box-shadow:0 18px 40px rgba(8,35,74,.16);padding:6px}
    .step-company-functions-menu[hidden]{display:none}
    .step-company-functions-option{width:100%;border:0;background:transparent;text-align:left;padding:10px 11px;border-radius:8px;font:inherit;font-size:12px;color:#1c3455;cursor:pointer}
    .step-company-functions-option:hover,.step-company-functions-option:focus{background:#eef6ff;outline:none}
    .step-company-functions-empty{padding:11px;color:#7c8aa0;font-size:12px}
    .step-company-functions-selected{display:flex;flex-wrap:wrap;gap:7px;margin-top:11px}
    .step-company-function-chip{display:inline-flex;align-items:center;gap:7px;padding:7px 9px 7px 11px;border-radius:999px;background:#eaf3ff;color:#155cad;border:1px solid #cfe0f5;font-size:11px;font-weight:760}
    .step-company-function-chip button{border:0;background:transparent;color:#55759b;cursor:pointer;padding:0;font-size:15px;line-height:1}
    .step-company-functions-subtitle{margin:14px 0 8px;color:#6d7b90;font-size:10px;font-weight:850;text-transform:uppercase;letter-spacing:.06em}
    .step-target-role-helper{margin-top:6px;color:#78869a;font-size:10px}
    @media(max-width:640px){.step-company-functions{padding:13px}.step-company-functions-head{display:block}}
  `;
  document.head.appendChild(style);
}

function restoreDraftFunctions(locale, available, addSelection) {
  const keys = [`step-careers-draft-v2:${locale}`, 'step-careers-draft-v2', `step-careers-draft-v1:${locale}`];
  let values = [];
  for (const key of keys) {
    try {
      const raw = JSON.parse(localStorage.getItem(key) || 'null');
      const q = raw?.qualifications;
      if (Array.isArray(q) && q.length) { values = q; break; }
    } catch (_) {}
  }
  if (!values.length) return;
  const availableMap = new Map(available.map(v => [normalize(v), v]));
  values.forEach(value => {
    const canonical = availableMap.get(normalize(value));
    if (canonical) addSelection(canonical, false);
  });
}

async function bootCompanyFunctions() {
  const root = document.getElementById('step-careers-root');
  const form = root?.querySelector('#step-careers-form');
  if (!root || !form || form.dataset.companyFunctionsReady === '1') return false;
  const qualificationsBox = form.querySelector('.step-careers-qualifications');
  const targetRole = form.querySelector('input[name="targetRole"]');
  if (!qualificationsBox || !targetRole) return false;

  form.dataset.companyFunctionsReady = '1';
  injectStyles();
  const locale = localeFromPage();
  const t = copy[locale] || copy.en;

  let functions = [];
  try { functions = await loadFunctions(); } catch (error) { console.warn('[STEP Careers] company functions unavailable', error); }

  // Autocomplete for the target role field.
  if (functions.length) {
    const datalist = document.createElement('datalist');
    datalist.id = 'step-company-functions-datalist';
    datalist.innerHTML = functions.map(value => `<option value="${esc(value)}"></option>`).join('');
    document.body.appendChild(datalist);
    targetRole.setAttribute('list', datalist.id);
    const helper = document.createElement('div');
    helper.className = 'step-target-role-helper';
    helper.textContent = `${functions.length} funções atuais da STEP disponíveis como referência.`;
    targetRole.closest('.step-careers-field')?.appendChild(helper);
  }

  const wrapper = document.createElement('div');
  wrapper.className = 'step-company-functions';
  wrapper.innerHTML = `
    <div class="step-company-functions-head">
      <div><strong>${esc(t.title)}</strong><p>${esc(t.help)}</p></div>
    </div>
    <div class="step-company-functions-search">
      <input type="text" data-company-function-search autocomplete="off" placeholder="${esc(t.placeholder)}" aria-autocomplete="list">
      <div class="step-company-functions-menu" data-company-function-menu hidden></div>
    </div>
    <div class="step-company-functions-selected" data-company-function-selected></div>
    <div class="step-company-functions-hidden" data-company-function-hidden></div>
    <div class="step-company-functions-subtitle">${esc(t.complementary)}</div>`;
  qualificationsBox.before(wrapper);

  const search = wrapper.querySelector('[data-company-function-search]');
  const menu = wrapper.querySelector('[data-company-function-menu]');
  const selectedWrap = wrapper.querySelector('[data-company-function-selected]');
  const hiddenWrap = wrapper.querySelector('[data-company-function-hidden]');
  const selected = new Map();

  function notify() {
    form.dispatchEvent(new Event('input', {bubbles:true}));
    form.dispatchEvent(new Event('change', {bubbles:true}));
  }

  function addSelection(value, doNotify = true) {
    const clean = String(value || '').trim().slice(0, 180);
    if (!clean) return;
    const key = normalize(clean);
    if (!key || selected.has(key)) return;
    selected.set(key, clean);

    const chip = document.createElement('span');
    chip.className = 'step-company-function-chip';
    chip.dataset.key = key;
    chip.innerHTML = `<span>${esc(clean)}</span><button type="button" aria-label="Remover ${esc(clean)}">×</button>`;
    chip.querySelector('button').addEventListener('click', () => removeSelection(key));
    selectedWrap.appendChild(chip);

    const hidden = document.createElement('input');
    hidden.type = 'checkbox';
    hidden.name = 'qualification';
    hidden.value = clean;
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
    if (!q) return functions.slice(0, 12);
    const starts = [];
    const contains = [];
    for (const value of functions) {
      const key = normalize(value);
      if (selected.has(key)) continue;
      if (key.startsWith(q)) starts.push(value);
      else if (key.includes(q)) contains.push(value);
    }
    return [...starts, ...contains].slice(0, 12);
  }

  function renderMenu() {
    const value = search.value.trim();
    const items = matches(value);
    menu.innerHTML = '';
    items.forEach(item => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'step-company-functions-option';
      button.textContent = item;
      button.addEventListener('mousedown', event => event.preventDefault());
      button.addEventListener('click', () => {
        addSelection(item);
        search.value = '';
        renderMenu();
        search.focus();
      });
      menu.appendChild(button);
    });

    const exact = functions.some(item => normalize(item) === normalize(value));
    if (value && !exact && !selected.has(normalize(value))) {
      const custom = document.createElement('button');
      custom.type = 'button';
      custom.className = 'step-company-functions-option';
      custom.innerHTML = `<strong>${esc(t.add)}:</strong> ${esc(value)}`;
      custom.addEventListener('mousedown', event => event.preventDefault());
      custom.addEventListener('click', () => {
        addSelection(value);
        search.value = '';
        renderMenu();
        search.focus();
      });
      menu.appendChild(custom);
    }

    if (!menu.children.length) menu.innerHTML = `<div class="step-company-functions-empty">${esc(t.empty)}</div>`;
    menu.hidden = false;
  }

  search.addEventListener('focus', renderMenu);
  search.addEventListener('input', renderMenu);
  search.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const first = menu.querySelector('.step-company-functions-option');
      if (first) first.click();
      else if (search.value.trim()) { addSelection(search.value); search.value = ''; }
    }
    if (event.key === 'Escape') menu.hidden = true;
  });
  document.addEventListener('click', event => {
    if (!wrapper.contains(event.target)) menu.hidden = true;
  });

  restoreDraftFunctions(locale, functions, addSelection);
  return true;
}

queueMicrotask(() => {
  if (bootCompanyFunctions()) return;
  const observer = new MutationObserver(() => {
    bootCompanyFunctions().then(ok => { if (ok) observer.disconnect(); });
  });
  observer.observe(document.documentElement, {childList:true, subtree:true});
});
