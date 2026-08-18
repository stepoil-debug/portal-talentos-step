import { getTranslation, localeRoutes } from './i18n.js';
import { submitTalentProfile } from './supabase-adapter.js';

const root = document.getElementById('step-careers-root');

if (root) {
  const locale = root.dataset.locale || detectLocale();
  const t = getTranslation(locale);
  document.documentElement.lang = t.htmlLang;
  render(root, locale, t);
  boot(root, locale, t);
}

function detectLocale() {
  const language = (navigator.language || 'en').toLowerCase();
  if (language.startsWith('pt-br')) return 'pt-BR';
  if (language.startsWith('pt')) return 'pt-PT';
  if (language.startsWith('es')) return 'es';
  if (language.startsWith('fr')) return 'fr';
  return 'en';
}

function esc(value = '') {
  return String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}

function label(text, required = false) {
  return `${esc(text)}${required ? ' <span>*</span>' : ''}`;
}

function yesNoOptions(t) {
  return `<option value="">${esc(t.select)}</option><option value="yes">${esc(t.yes)}</option><option value="no">${esc(t.no)}</option>`;
}

function languageLinks(locale, base) {
  const labels = {'pt-BR':'PT-BR','pt-PT':'PT-PT',en:'EN',es:'ES',fr:'FR'};
  return Object.entries(labels).map(([code, text]) => {
    const route = `${base}${localeRoutes[code]}`;
    return `<a href="${esc(route)}" hreflang="${esc(code)}" ${code === locale ? 'aria-current="page"' : ''}>${text}</a>`;
  }).join('');
}

function experienceItem(t) {
  return `
    <div class="step-careers-repeat-item" data-kind="experience">
      <div class="step-careers-grid">
        <div class="step-careers-field is-third"><label>${label(t.fields.company)}</label><input data-key="company" type="text"></div>
        <div class="step-careers-field is-third"><label>${label(t.fields.role)}</label><input data-key="role" type="text"></div>
        <div class="step-careers-field is-third"><label>${label(t.fields.start)}</label><input data-key="start" type="month"></div>
        <div class="step-careers-field is-third"><label>${label(t.fields.end)}</label><input data-key="end" type="month"></div>
        <div class="step-careers-field is-full"><label>${label(t.fields.activities)}</label><textarea data-key="activities" placeholder="${esc(t.placeholders.activities)}"></textarea></div>
        <div class="step-careers-field is-full"><label class="step-careers-inline-check"><input data-key="current" type="checkbox"> ${esc(t.fields.currentJob)}</label></div>
      </div>
      <div class="step-careers-repeat-actions"><button class="step-careers-btn step-careers-btn-danger step-careers-btn-small" type="button" data-remove-item>${esc(t.remove)}</button></div>
    </div>`;
}

function educationItem(t) {
  return `
    <div class="step-careers-repeat-item" data-kind="education">
      <div class="step-careers-grid">
        <div class="step-careers-field is-third"><label>${label(t.fields.course)}</label><input data-key="course" type="text"></div>
        <div class="step-careers-field is-third"><label>${label(t.fields.institution)}</label><input data-key="institution" type="text"></div>
        <div class="step-careers-field is-third"><label>${label(t.fields.educationLevel)}</label><input data-key="level" type="text"></div>
        <div class="step-careers-field is-third"><label>${label(t.fields.conclusion)}</label><input data-key="year" type="number" min="1950" max="2100" inputmode="numeric"></div>
      </div>
      <div class="step-careers-repeat-actions"><button class="step-careers-btn step-careers-btn-danger step-careers-btn-small" type="button" data-remove-item>${esc(t.remove)}</button></div>
    </div>`;
}

function certificationItem(t) {
  return `
    <div class="step-careers-repeat-item" data-kind="certification">
      <div class="step-careers-grid">
        <div class="step-careers-field is-quarter"><label>${label(t.fields.certificate)}</label><input data-key="name" type="text"></div>
        <div class="step-careers-field is-quarter"><label>${label(t.fields.issuer)}</label><input data-key="issuer" type="text"></div>
        <div class="step-careers-field is-quarter"><label>${label(t.fields.certificateNumber)}</label><input data-key="number" type="text"></div>
        <div class="step-careers-field is-quarter"><label>${label(t.fields.validity)}</label><input data-key="validity" type="date"></div>
      </div>
      <div class="step-careers-repeat-actions"><button class="step-careers-btn step-careers-btn-danger step-careers-btn-small" type="button" data-remove-item>${esc(t.remove)}</button></div>
    </div>`;
}

function languageItem(t) {
  const levels = t.proficiencies.map(level => `<option value="${esc(level)}">${esc(level)}</option>`).join('');
  return `
    <div class="step-careers-repeat-item" data-kind="language">
      <div class="step-careers-grid">
        <div class="step-careers-field"><label>${label(t.fields.language)}</label><input data-key="language" type="text"></div>
        <div class="step-careers-field"><label>${label(t.fields.proficiency)}</label><select data-key="proficiency"><option value="">${esc(t.select)}</option>${levels}</select></div>
      </div>
      <div class="step-careers-repeat-actions"><button class="step-careers-btn step-careers-btn-danger step-careers-btn-small" type="button" data-remove-item>${esc(t.remove)}</button></div>
    </div>`;
}

function render(root, locale, t) {
  const base = root.dataset.base || './';
  const qualifications = t.qualifications.map((q, i) => `<label class="step-careers-chip-check"><input type="checkbox" name="qualification" value="${esc(q)}"> <span>${esc(q)}</span></label>`).join('');

  root.innerHTML = `
  <div class="step-careers-shell">
    <header class="step-careers-topbar">
      <a class="step-careers-brand" href="https://step-og.com/" aria-label="STEP Oil & Gas">
        <span class="step-careers-brandmark">S</span>
        <span class="step-careers-brandtext"><strong>STEP</strong><span>Integrated Solutions</span></span>
      </a>
      <nav class="step-careers-language" aria-label="${esc(t.languageLabel)}">
        <span class="step-careers-language-label">${esc(t.languageLabel)}:</span>
        ${languageLinks(locale, base)}
      </nav>
    </header>

    <main class="step-careers-container">
      <section class="step-careers-hero" aria-labelledby="step-careers-title">
        <div>
          <div class="step-careers-badge">${esc(t.badge)}</div>
          <h1 id="step-careers-title">${esc(t.title)}</h1>
          <p>${esc(t.subtitle)}</p>
          <p class="step-careers-hero-note">${esc(t.intro)}</p>
        </div>
        <aside class="step-careers-progress-card" aria-live="polite">
          <div class="step-careers-progress-label">${esc(t.requiredHint)}</div>
          <div class="step-careers-progress-track"><div class="step-careers-progress-bar" data-progress-bar></div></div>
          <div class="step-careers-progress-value" data-progress-value>0%</div>
        </aside>
      </section>

      <div class="step-careers-status" data-status role="status" aria-live="polite"></div>

      <form class="step-careers-form" id="step-careers-form" novalidate>
        <section class="step-careers-section">
          <div class="step-careers-section-head"><h2>${esc(t.sections.personal)}</h2><span class="step-careers-section-hint">${esc(t.requiredHint)}</span></div>
          <div class="step-careers-grid">
            <div class="step-careers-field"><label>${label(t.fields.fullName,true)}</label><input name="fullName" type="text" autocomplete="name" required placeholder="${esc(t.placeholders.fullName)}"></div>
            <div class="step-careers-field"><label>${label(t.fields.email,true)}</label><input name="email" type="email" autocomplete="email" required></div>
            <div class="step-careers-field is-third"><label>${label(t.fields.phone,true)}</label><input name="phone" type="tel" autocomplete="tel" required></div>
            <div class="step-careers-field is-third"><label>${label(t.fields.birthDate)}</label><input name="birthDate" type="date"></div>
            <div class="step-careers-field is-third"><label>${label(t.fields.nationality)}</label><input name="nationality" type="text"></div>
            <div class="step-careers-field"><label>${label(t.fields.residenceCountry,true)}</label><input name="residenceCountry" type="text" autocomplete="country-name" required></div>
            <div class="step-careers-field"><label>${label(t.fields.city,true)}</label><input name="city" type="text" autocomplete="address-level2" required></div>
          </div>
        </section>

        <section class="step-careers-section">
          <div class="step-careers-section-head"><h2>${esc(t.sections.objective)}</h2></div>
          <div class="step-careers-grid">
            <div class="step-careers-field is-third"><label>${label(t.fields.targetModule,true)}</label><select name="targetModule" required><option value="">${esc(t.select)}</option><option value="BR">${esc(t.brazil)}</option><option value="PT">${esc(t.portugal)}</option><option value="NA">${esc(t.namibia)}</option><option value="GLOBAL">${esc(t.global)}</option></select></div>
            <div class="step-careers-field is-third"><label>${label(t.fields.targetRole,true)}</label><input name="targetRole" type="text" required placeholder="${esc(t.placeholders.targetRole)}"></div>
            <div class="step-careers-field is-third"><label>${label(t.fields.area,true)}</label><input name="professionalArea" type="text" required></div>
          </div>
        </section>

        <section class="step-careers-section">
          <div class="step-careers-section-head"><h2>${esc(t.sections.summary)}</h2></div>
          <div class="step-careers-grid"><div class="step-careers-field is-full"><label>${label(t.fields.summary,true)}</label><textarea name="professionalSummary" required maxlength="2000" placeholder="${esc(t.placeholders.summary)}"></textarea></div></div>
        </section>

        <section class="step-careers-section">
          <div class="step-careers-section-head"><h2>${esc(t.sections.experience)}</h2><button class="step-careers-btn step-careers-btn-secondary step-careers-btn-small" type="button" data-add="experience">${esc(t.addExperience)}</button></div>
          <div class="step-careers-repeat-list" data-list="experience">${experienceItem(t)}</div>
        </section>

        <section class="step-careers-section">
          <div class="step-careers-section-head"><h2>${esc(t.sections.education)}</h2><button class="step-careers-btn step-careers-btn-secondary step-careers-btn-small" type="button" data-add="education">${esc(t.addEducation)}</button></div>
          <div class="step-careers-repeat-list" data-list="education">${educationItem(t)}</div>
        </section>

        <section class="step-careers-section">
          <div class="step-careers-section-head"><h2>${esc(t.sections.qualifications)}</h2></div>
          <div class="step-careers-qualifications">${qualifications}</div>
          <div class="step-careers-grid">
            <div class="step-careers-field"><label>${label(t.fields.technicalSkills,true)}</label><textarea name="technicalSkills" required maxlength="1500" placeholder="${esc(t.placeholders.technicalSkills)}"></textarea></div>
            <div class="step-careers-field"><label>${label(t.fields.behavioralSkills)}</label><textarea name="behavioralSkills" maxlength="1000" placeholder="${esc(t.placeholders.behavioralSkills)}"></textarea></div>
          </div>
        </section>

        <section class="step-careers-section">
          <div class="step-careers-section-head"><h2>${esc(t.sections.certifications)}</h2><button class="step-careers-btn step-careers-btn-secondary step-careers-btn-small" type="button" data-add="certification">${esc(t.addCertification)}</button></div>
          <div class="step-careers-repeat-list" data-list="certification">${certificationItem(t)}</div>
        </section>

        <section class="step-careers-section">
          <div class="step-careers-section-head"><h2>${esc(t.sections.languages)}</h2><button class="step-careers-btn step-careers-btn-secondary step-careers-btn-small" type="button" data-add="language">${esc(t.addLanguage)}</button></div>
          <div class="step-careers-repeat-list" data-list="language">${languageItem(t)}</div>
        </section>

        <section class="step-careers-section">
          <div class="step-careers-section-head"><h2>${esc(t.sections.availability)}</h2></div>
          <div class="step-careers-grid">
            <div class="step-careers-field is-quarter"><label>${label(t.fields.travel,true)}</label><select name="travelAvailability" required>${yesNoOptions(t)}</select></div>
            <div class="step-careers-field is-quarter"><label>${label(t.fields.offshore,true)}</label><select name="offshoreAvailability" required>${yesNoOptions(t)}</select></div>
            <div class="step-careers-field is-quarter"><label>${label(t.fields.relocation,true)}</label><select name="relocationAvailability" required>${yesNoOptions(t)}</select></div>
            <div class="step-careers-field is-quarter"><label>${label(t.fields.startAvailability,true)}</label><input name="startAvailability" type="date" required></div>
            <div class="step-careers-field is-full"><label>${label(t.fields.notes)}</label><textarea name="availabilityNotes" maxlength="1000"></textarea></div>
          </div>
        </section>

        <div class="step-careers-footer-actions">
          <label class="step-careers-consent"><input name="consent" type="checkbox" required> <span>${esc(t.consent)}</span></label>
          <div class="step-careers-actions">
            <button class="step-careers-btn step-careers-btn-secondary" type="button" data-save-draft>${esc(t.saveDraft)}</button>
            <button class="step-careers-btn step-careers-btn-primary" type="submit">${esc(t.submit)}</button>
          </div>
        </div>
      </form>

      <section class="step-careers-seo-context" aria-label="STEP Careers">
        <h2>STEP Oil & Gas · STEP Integrated Solutions · STEP Careers</h2>
        <p>${esc(t.intro)} <a href="https://step-og.com/step-manpower/">STEP ManPower</a> · <a href="https://step-og.com/">STEP Oil & Gas</a></p>
      </section>
    </main>
  </div>`;
}

function boot(root, locale, t) {
  const form = root.querySelector('#step-careers-form');
  const status = root.querySelector('[data-status]');
  const draftKey = `step-careers-draft-v1:${locale}`;

  root.addEventListener('click', event => {
    const add = event.target.closest('[data-add]');
    if (add) {
      addItem(add.dataset.add);
      return;
    }
    const remove = event.target.closest('[data-remove-item]');
    if (remove) {
      const item = remove.closest('[data-kind]');
      const list = item?.parentElement;
      if (list && list.querySelectorAll('[data-kind]').length > 1) item.remove();
      else item?.querySelectorAll('input,textarea,select').forEach(el => { el.type === 'checkbox' ? el.checked = false : el.value = ''; });
      updateProgress();
    }
  });

  root.querySelector('[data-save-draft]').addEventListener('click', () => {
    localStorage.setItem(draftKey, JSON.stringify(serialize(form, locale)));
    showStatus(t.draftSaved, 'info');
  });

  form.addEventListener('input', updateProgress);
  form.addEventListener('change', updateProgress);

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) {
      showStatus(t.error, 'error');
      return;
    }

    const payload = serialize(form, locale);
    const submitButton = form.querySelector('[type="submit"]');
    submitButton.disabled = true;
    submitButton.style.opacity = '.65';

    try {
      const result = await submitTalentProfile(payload);
      localStorage.removeItem(draftKey);
      showStatus(result.mode === 'preview' ? t.previewSuccess : t.success, 'success');
      status.scrollIntoView({behavior:'smooth', block:'center'});
    } catch (error) {
      console.error('[STEP Careers] submit error', error);
      showStatus(t.error, 'error');
    } finally {
      submitButton.disabled = false;
      submitButton.style.opacity = '';
    }
  });

  restoreDraft();
  updateProgress();

  function addItem(kind, values = null) {
    const list = root.querySelector(`[data-list="${kind}"]`);
    if (!list) return;
    const templates = {experience: experienceItem, education: educationItem, certification: certificationItem, language: languageItem};
    list.insertAdjacentHTML('beforeend', templates[kind](t));
    const item = list.lastElementChild;
    if (values) fillRepeatItem(item, values);
  }

  function restoreDraft() {
    let draft = null;
    try { draft = JSON.parse(localStorage.getItem(draftKey) || 'null'); } catch (_) { draft = null; }
    if (!draft) return;

    Object.entries(draft).forEach(([key, value]) => {
      const control = form.elements.namedItem(key);
      if (!control || Array.isArray(value) || typeof value === 'object') return;
      if (control.type === 'checkbox') control.checked = Boolean(value);
      else control.value = value ?? '';
    });

    if (Array.isArray(draft.qualifications)) {
      form.querySelectorAll('input[name="qualification"]').forEach(input => { input.checked = draft.qualifications.includes(input.value); });
    }

    restoreList('experience', draft.experiences || []);
    restoreList('education', draft.education || []);
    restoreList('certification', draft.certifications || []);
    restoreList('language', draft.languages || []);
  }

  function restoreList(kind, values) {
    if (!values.length) return;
    const list = root.querySelector(`[data-list="${kind}"]`);
    list.innerHTML = '';
    values.forEach(value => addItem(kind, value));
  }

  function showStatus(message, type) {
    status.textContent = message;
    status.className = `step-careers-status is-visible is-${type}`;
  }

  function updateProgress() {
    const required = [...form.querySelectorAll('[required]')];
    const completed = required.filter(el => el.type === 'checkbox' ? el.checked : String(el.value || '').trim()).length;
    const percent = required.length ? Math.round((completed / required.length) * 100) : 0;
    root.querySelector('[data-progress-bar]').style.width = `${percent}%`;
    root.querySelector('[data-progress-value]').textContent = `${percent}%`;
  }
}

function fillRepeatItem(item, values) {
  Object.entries(values || {}).forEach(([key, value]) => {
    const input = item.querySelector(`[data-key="${CSS.escape(key)}"]`);
    if (!input) return;
    if (input.type === 'checkbox') input.checked = Boolean(value);
    else input.value = value ?? '';
  });
}

function serialize(form, locale) {
  const simple = Object.fromEntries(new FormData(form).entries());
  delete simple.qualification;

  const collect = kind => [...form.querySelectorAll(`[data-kind="${kind}"]`)].map(item => {
    const result = {};
    item.querySelectorAll('[data-key]').forEach(control => {
      result[control.dataset.key] = control.type === 'checkbox' ? control.checked : control.value;
    });
    return result;
  }).filter(obj => Object.values(obj).some(value => value === true || String(value || '').trim()));

  const params = new URLSearchParams(window.location.search);
  const payload = {
    ...simple,
    locale,
    qualifications: [...form.querySelectorAll('input[name="qualification"]:checked')].map(input => input.value),
    experiences: collect('experience'),
    education: collect('education'),
    certifications: collect('certification'),
    languages: collect('language'),
    consent: Boolean(form.querySelector('input[name="consent"]:checked')),
    source: {
      page: window.location.href,
      referrer: document.referrer || null,
      utm_source: params.get('utm_source'),
      utm_medium: params.get('utm_medium'),
      utm_campaign: params.get('utm_campaign'),
      utm_content: params.get('utm_content'),
      utm_term: params.get('utm_term')
    },
    submittedAt: new Date().toISOString()
  };

  return payload;
}
