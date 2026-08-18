const DRAFT_VERSION = 2;
const GLOBAL_KEY = 'step-careers-draft-v2';
const IDB_NAME = 'step-careers-local';
const IDB_STORE = 'drafts';
const AUTO_SAVE_DELAY = 700;

const copy = {
  'pt-BR': {
    saved: 'Rascunho salvo com segurança neste dispositivo',
    restored: 'Rascunho restaurado automaticamente',
    files: 'Anexos precisam ser selecionados novamente por segurança do navegador.',
    failed: 'Não foi possível salvar o rascunho neste dispositivo.'
  },
  'pt-PT': {
    saved: 'Rascunho guardado com segurança neste dispositivo',
    restored: 'Rascunho restaurado automaticamente',
    files: 'Os anexos precisam de ser selecionados novamente por segurança do navegador.',
    failed: 'Não foi possível guardar o rascunho neste dispositivo.'
  },
  en: {
    saved: 'Draft saved securely on this device',
    restored: 'Draft restored automatically',
    files: 'Attachments must be selected again due to browser security.',
    failed: 'The draft could not be saved on this device.'
  },
  es: {
    saved: 'Borrador guardado de forma segura en este dispositivo',
    restored: 'Borrador restaurado automáticamente',
    files: 'Los archivos adjuntos deben seleccionarse nuevamente por seguridad del navegador.',
    failed: 'No se pudo guardar el borrador en este dispositivo.'
  },
  fr: {
    saved: 'Brouillon enregistré en toute sécurité sur cet appareil',
    restored: 'Brouillon restauré automatiquement',
    files: 'Les pièces jointes doivent être sélectionnées à nouveau pour des raisons de sécurité du navigateur.',
    failed: 'Le brouillon n’a pas pu être enregistré sur cet appareil.'
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

function localeKey(locale) {
  return `${GLOBAL_KEY}:${locale}`;
}

function legacyKey(locale) {
  return `step-careers-draft-v1:${locale}`;
}

function hasFiles(form) {
  return [...form.querySelectorAll('input[type="file"]')].some(input => input.files?.length);
}

function readControl(control) {
  if (control.type === 'checkbox') return control.checked;
  if (control.type === 'radio') return control.checked ? control.value : undefined;
  if (control.type === 'file') return undefined;
  return control.value ?? '';
}

function collectRepeat(form, kind) {
  return [...form.querySelectorAll(`[data-kind="${kind}"]`)].map(item => {
    const record = {};
    item.querySelectorAll('[data-key]').forEach(control => {
      record[control.dataset.key] = readControl(control);
    });
    return record;
  }).filter(record => Object.values(record).some(value => value === true || String(value ?? '').trim()));
}

function collectDraft(form, locale) {
  const data = {
    version: DRAFT_VERSION,
    locale,
    savedAt: new Date().toISOString(),
    fields: {},
    qualifications: [...form.querySelectorAll('input[name="qualification"]:checked')].map(input => input.value),
    experiences: collectRepeat(form, 'experience'),
    education: collectRepeat(form, 'education'),
    certifications: collectRepeat(form, 'certification'),
    languages: collectRepeat(form, 'language'),
    hadAttachments: hasFiles(form)
  };

  [...form.elements].forEach(control => {
    if (!control?.name) return;
    if (control.name === 'qualification') return;
    if (control.closest('[data-kind]')) return;
    if (['submit', 'button', 'reset', 'file'].includes(control.type)) return;
    const value = readControl(control);
    if (value !== undefined) data.fields[control.name] = value;
  });

  return data;
}

function normalizeLegacy(raw, locale) {
  if (!raw || typeof raw !== 'object') return null;
  if (raw.version === DRAFT_VERSION && raw.fields) return raw;

  const repeatKeys = new Set(['experiences', 'education', 'certifications', 'languages', 'qualifications', 'source', 'submittedAt', 'locale']);
  const fields = {};
  Object.entries(raw).forEach(([key, value]) => {
    if (repeatKeys.has(key)) return;
    if (Array.isArray(value) || (value && typeof value === 'object')) return;
    fields[key] = value;
  });

  return {
    version: DRAFT_VERSION,
    locale: raw.locale || locale,
    savedAt: new Date().toISOString(),
    fields,
    qualifications: Array.isArray(raw.qualifications) ? raw.qualifications : [],
    experiences: Array.isArray(raw.experiences) ? raw.experiences : [],
    education: Array.isArray(raw.education) ? raw.education : [],
    certifications: Array.isArray(raw.certifications) ? raw.certifications : [],
    languages: Array.isArray(raw.languages) ? raw.languages : [],
    hadAttachments: false
  };
}

function writeLocal(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (_) {
    return false;
  }
}

function readLocal(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

function removeLocal(key) {
  try { localStorage.removeItem(key); } catch (_) {}
}

function openDb() {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) return reject(new Error('indexedDB unavailable'));
    const request = indexedDB.open(IDB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) db.createObjectStore(IDB_STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('indexedDB error'));
  });
}

async function writeIndexedDb(key, value) {
  try {
    const db = await openDb();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).put(value, key);
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
    db.close();
    return true;
  } catch (_) {
    return false;
  }
}

async function readIndexedDb(key) {
  try {
    const db = await openDb();
    const value = await new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const request = tx.objectStore(IDB_STORE).get(key);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
    db.close();
    return value;
  } catch (_) {
    return null;
  }
}

async function removeIndexedDb(key) {
  try {
    const db = await openDb();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).delete(key);
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  } catch (_) {}
}

function setField(form, name, value) {
  const controls = form.querySelectorAll(`[name="${CSS.escape(name)}"]`);
  if (!controls.length) return;

  controls.forEach(control => {
    if (control.type === 'checkbox') control.checked = Boolean(value);
    else if (control.type === 'radio') control.checked = String(control.value) === String(value);
    else if (control.type !== 'file') control.value = value ?? '';
  });
}

function fillRepeatItem(item, record) {
  Object.entries(record || {}).forEach(([key, value]) => {
    const control = item.querySelector(`[data-key="${CSS.escape(key)}"]`);
    if (!control) return;
    if (control.type === 'checkbox') control.checked = Boolean(value);
    else control.value = value ?? '';
  });
}

function rebuildList(root, kind, values) {
  const list = root.querySelector(`[data-list="${kind}"]`);
  const addButton = root.querySelector(`[data-add="${kind}"]`);
  if (!list || !addButton) return;

  list.innerHTML = '';
  const records = Array.isArray(values) ? values : [];

  records.forEach(record => {
    addButton.click();
    const item = list.lastElementChild;
    if (item) fillRepeatItem(item, record);
  });

  // Keep optional certifications completely empty. Other sections retain one blank row for usability.
  if (!records.length && kind !== 'certification') addButton.click();
}

function syncImmediateAvailability(form, draft) {
  const value = draft?.fields?.immediateAvailability;
  if (value !== 'yes' && value !== 'no') return;
  const hidden = form.querySelector('input[name="immediateAvailability"]');
  const button = form.querySelector('[data-immediate-availability]');
  const date = form.querySelector('input[name="startAvailability"]');
  if (!hidden || !button) return;

  hidden.value = value;
  const active = value === 'yes';
  button.setAttribute('aria-pressed', active ? 'true' : 'false');
  button.closest('.step-careers-field')?.classList.toggle('is-immediate-selected', active);
  if (date) date.readOnly = active;
}

function restoreDraft(root, form, draft) {
  if (!draft) return false;

  Object.entries(draft.fields || {}).forEach(([name, value]) => setField(form, name, value));
  form.querySelectorAll('input[name="qualification"]').forEach(input => {
    input.checked = (draft.qualifications || []).includes(input.value);
  });

  rebuildList(root, 'experience', draft.experiences);
  rebuildList(root, 'education', draft.education);
  rebuildList(root, 'certification', draft.certifications);
  rebuildList(root, 'language', draft.languages);
  syncImmediateAvailability(form, draft);

  form.dispatchEvent(new Event('input', {bubbles:true}));
  form.dispatchEvent(new Event('change', {bubbles:true}));
  return true;
}

function showStatus(root, message, type = 'info') {
  const status = root.querySelector('[data-status]');
  if (!status) return;
  status.textContent = message;
  status.className = `step-careers-status is-visible is-${type}`;
}

function timeLabel(iso, locale) {
  try {
    return new Intl.DateTimeFormat(locale, {hour:'2-digit', minute:'2-digit'}).format(new Date(iso));
  } catch (_) {
    return '';
  }
}

async function bestEffortPersistStorage() {
  try {
    if (navigator.storage?.persist) await navigator.storage.persist();
  } catch (_) {}
}

async function saveDraft(form, locale, {manual = false} = {}) {
  const draft = collectDraft(form, locale);
  const keys = [GLOBAL_KEY, localeKey(locale)];
  const localOk = keys.map(key => writeLocal(key, draft)).some(Boolean);
  const idbOk = (await Promise.all(keys.map(key => writeIndexedDb(key, draft)))).some(Boolean);

  if (manual) bestEffortPersistStorage();
  return {ok: localOk || idbOk, draft};
}

async function loadDraft(locale) {
  const candidates = [
    readLocal(localeKey(locale)),
    readLocal(GLOBAL_KEY),
    await readIndexedDb(localeKey(locale)),
    await readIndexedDb(GLOBAL_KEY),
    readLocal(legacyKey(locale))
  ].filter(Boolean).map(value => normalizeLegacy(value, locale)).filter(Boolean);

  if (!candidates.length) return null;
  candidates.sort((a, b) => new Date(b.savedAt || 0) - new Date(a.savedAt || 0));
  return candidates[0];
}

async function clearDraft(locale) {
  const keys = [GLOBAL_KEY, localeKey(locale), legacyKey(locale)];
  keys.forEach(removeLocal);
  await Promise.all(keys.map(removeIndexedDb));
}

function bootDraftManager() {
  const root = document.getElementById('step-careers-root');
  const form = root?.querySelector('#step-careers-form');
  if (!root || !form || form.dataset.draftManagerReady === '1') return false;
  form.dataset.draftManagerReady = '1';

  const locale = localeFromPage();
  const strings = copy[locale] || copy.en;
  let autosaveTimer = null;
  let restoring = true;
  let lastSnapshot = '';

  const scheduleAutosave = () => {
    if (restoring) return;
    clearTimeout(autosaveTimer);
    autosaveTimer = setTimeout(async () => {
      const draft = collectDraft(form, locale);
      const snapshot = JSON.stringify(draft.fields) + JSON.stringify(draft.qualifications) + JSON.stringify(draft.experiences) + JSON.stringify(draft.education) + JSON.stringify(draft.certifications) + JSON.stringify(draft.languages);
      if (snapshot === lastSnapshot) return;
      lastSnapshot = snapshot;
      await saveDraft(form, locale, {manual:false});
    }, AUTO_SAVE_DELAY);
  };

  form.addEventListener('input', scheduleAutosave);
  form.addEventListener('change', scheduleAutosave);

  const saveButton = root.querySelector('[data-save-draft]');
  saveButton?.addEventListener('click', async () => {
    clearTimeout(autosaveTimer);
    const result = await saveDraft(form, locale, {manual:true});
    if (!result.ok) {
      showStatus(root, strings.failed, 'error');
      return;
    }
    const time = timeLabel(result.draft.savedAt, locale);
    let message = `${strings.saved}${time ? ` · ${time}` : ''}.`;
    if (result.draft.hadAttachments) message += ` ${strings.files}`;
    showStatus(root, message, 'info');
  });

  const saveOnExit = () => {
    if (restoring) return;
    const draft = collectDraft(form, locale);
    writeLocal(GLOBAL_KEY, draft);
    writeLocal(localeKey(locale), draft);
  };
  window.addEventListener('pagehide', saveOnExit);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') saveOnExit();
  });

  const status = root.querySelector('[data-status]');
  if (status) {
    new MutationObserver(async () => {
      if (!status.classList.contains('is-success')) return;
      const text = String(status.textContent || '');
      if (/supabase|implantação oficial|implementação oficial|official deployment|implantación oficial|implémentation officielle/i.test(text)) return;
      await clearDraft(locale);
      lastSnapshot = '';
    }).observe(status, {childList:true, subtree:true, attributes:true, attributeFilter:['class']});
  }

  setTimeout(async () => {
    const draft = await loadDraft(locale);
    if (draft) {
      restoreDraft(root, form, draft);
      // The immediate-availability enhancer can be mounted just after us; sync once more.
      setTimeout(() => syncImmediateAvailability(form, draft), 250);
      const time = timeLabel(draft.savedAt, locale);
      let message = `${strings.restored}${time ? ` · ${time}` : ''}.`;
      if (draft.hadAttachments) message += ` ${strings.files}`;
      showStatus(root, message, 'info');
      lastSnapshot = JSON.stringify(draft.fields) + JSON.stringify(draft.qualifications) + JSON.stringify(draft.experiences) + JSON.stringify(draft.education) + JSON.stringify(draft.certifications) + JSON.stringify(draft.languages);
      // Migrate old v1 drafts into the stronger v2 storage immediately.
      await saveDraft(form, locale, {manual:false});
    }
    restoring = false;
  }, 220);

  return true;
}

queueMicrotask(() => {
  if (bootDraftManager()) return;
  const observer = new MutationObserver(() => {
    if (bootDraftManager()) observer.disconnect();
  });
  observer.observe(document.documentElement, {childList:true, subtree:true});
});
