const immediateCopy = {
  'pt-BR': 'Disponibilidade imediata',
  'pt-PT': 'Disponibilidade imediata',
  en: 'Available immediately',
  es: 'Disponibilidad inmediata',
  fr: 'Disponible immédiatement'
};

function getLocale() {
  const lang = (document.documentElement.lang || navigator.language || 'en').toLowerCase();
  if (lang.startsWith('pt-br')) return 'pt-BR';
  if (lang.startsWith('pt')) return 'pt-PT';
  if (lang.startsWith('es')) return 'es';
  if (lang.startsWith('fr')) return 'fr';
  return 'en';
}

function localToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function ensureStyles() {
  if (document.getElementById('step-immediate-availability-style')) return;
  const style = document.createElement('style');
  style.id = 'step-immediate-availability-style';
  style.textContent = `
    .step-immediate-wrap{display:flex;align-items:center;margin-top:9px}
    .step-immediate-btn{min-height:34px;padding:0 12px;border-radius:999px;border:1px solid #b8cce8;background:#f8fbff;color:#175ca8;font:inherit;font-size:11px;font-weight:800;cursor:pointer;display:inline-flex;align-items:center;gap:7px;transition:.16s ease}
    .step-immediate-btn:hover{background:#eef6ff;border-color:#8eb4e3}
    .step-immediate-btn[aria-pressed="true"]{background:#e8f6ee;border-color:#96d5ad;color:#147044}
    .step-immediate-btn[aria-pressed="true"] .step-immediate-dot{background:#1e9b5a;color:#fff;border-color:#1e9b5a}
    .step-immediate-dot{width:17px;height:17px;border-radius:50%;border:1px solid #9cb8da;display:grid;place-items:center;font-size:10px;line-height:1;background:#fff;color:transparent}
    .step-careers-field.is-immediate-selected input[name="startAvailability"]{background:#f4fbf7;border-color:#9fd3b2;color:#174f34}
  `;
  document.head.appendChild(style);
}

function enhanceImmediateAvailability() {
  const dateInput = document.querySelector('input[name="startAvailability"]');
  if (!dateInput || dateInput.dataset.immediateReady === '1') return false;

  dateInput.dataset.immediateReady = '1';
  ensureStyles();

  const field = dateInput.closest('.step-careers-field');
  if (!field) return false;

  const locale = getLocale();
  const label = immediateCopy[locale] || immediateCopy.en;

  const hidden = document.createElement('input');
  hidden.type = 'hidden';
  hidden.name = 'immediateAvailability';
  hidden.value = 'no';

  const wrap = document.createElement('div');
  wrap.className = 'step-immediate-wrap';
  wrap.innerHTML = `<button type="button" class="step-immediate-btn" aria-pressed="false" data-immediate-availability><span class="step-immediate-dot" aria-hidden="true">✓</span><span>${label}</span></button>`;

  field.appendChild(hidden);
  field.appendChild(wrap);

  const button = wrap.querySelector('[data-immediate-availability]');

  function setImmediate(active, clearDate = true) {
    const today = localToday();
    button.setAttribute('aria-pressed', active ? 'true' : 'false');
    hidden.value = active ? 'yes' : 'no';
    field.classList.toggle('is-immediate-selected', active);
    dateInput.readOnly = active;

    if (active) {
      dateInput.value = today;
    } else if (clearDate && dateInput.value === today) {
      dateInput.value = '';
    }

    dateInput.dispatchEvent(new Event('input', {bubbles:true}));
    dateInput.dispatchEvent(new Event('change', {bubbles:true}));
  }

  button.addEventListener('click', () => {
    const active = button.getAttribute('aria-pressed') === 'true';
    setImmediate(!active, true);
  });

  dateInput.addEventListener('input', () => {
    if (button.getAttribute('aria-pressed') !== 'true') hidden.value = 'no';
  });

  return true;
}

queueMicrotask(() => {
  if (enhanceImmediateAvailability()) return;
  const observer = new MutationObserver(() => {
    if (enhanceImmediateAvailability()) observer.disconnect();
  });
  observer.observe(document.documentElement, {childList:true, subtree:true});
});
