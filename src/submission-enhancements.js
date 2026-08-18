const optionalLabels = {
  'pt-BR': 'Opcional',
  'pt-PT': 'Opcional',
  en: 'Optional',
  es: 'Opcional',
  fr: 'Facultatif'
};

const successCopy = {
  'pt-BR': {
    eyebrow: 'STEP Careers',
    title: 'Cadastro recebido!',
    message: 'Obrigado pelo interesse em fazer parte da STEP. Seu currículo foi recebido e será analisado pela nossa equipe.',
    followup: 'Caso o seu perfil seja compatível com uma oportunidade, entraremos em contato o quanto antes.',
    note: 'Você não precisa enviar o cadastro novamente.',
    button: 'Concluir',
    close: 'Fechar'
  },
  'pt-PT': {
    eyebrow: 'STEP Careers',
    title: 'Registo recebido!',
    message: 'Obrigado pelo interesse em fazer parte da STEP. O seu currículo foi recebido e será analisado pela nossa equipa.',
    followup: 'Caso o seu perfil seja compatível com uma oportunidade, entraremos em contacto assim que possível.',
    note: 'Não é necessário enviar o registo novamente.',
    button: 'Concluir',
    close: 'Fechar'
  },
  en: {
    eyebrow: 'STEP Careers',
    title: 'Application received!',
    message: 'Thank you for your interest in joining STEP. Your career profile has been received and will be reviewed by our team.',
    followup: 'If your profile matches an opportunity, we will contact you as soon as possible.',
    note: 'There is no need to submit your profile again.',
    button: 'Done',
    close: 'Close'
  },
  es: {
    eyebrow: 'STEP Careers',
    title: '¡Registro recibido!',
    message: 'Gracias por tu interés en formar parte de STEP. Hemos recibido tu currículum y nuestro equipo lo analizará.',
    followup: 'Si tu perfil coincide con una oportunidad, nos pondremos en contacto contigo lo antes posible.',
    note: 'No es necesario enviar el registro nuevamente.',
    button: 'Finalizar',
    close: 'Cerrar'
  },
  fr: {
    eyebrow: 'STEP Careers',
    title: 'Candidature reçue !',
    message: 'Merci de votre intérêt pour STEP. Votre profil professionnel a bien été reçu et sera examiné par notre équipe.',
    followup: 'Si votre profil correspond à une opportunité, nous vous contacterons dès que possible.',
    note: 'Il n’est pas nécessaire d’envoyer votre candidature à nouveau.',
    button: 'Terminer',
    close: 'Fermer'
  }
};

function getLocale() {
  const rootLocale = document.getElementById('step-careers-root')?.dataset.locale;
  const lang = String(rootLocale || document.documentElement.lang || navigator.language || 'en').toLowerCase();
  if (lang.startsWith('pt-br')) return 'pt-BR';
  if (lang.startsWith('pt')) return 'pt-PT';
  if (lang.startsWith('es')) return 'es';
  if (lang.startsWith('fr')) return 'fr';
  return 'en';
}

function injectStyles() {
  if (document.getElementById('step-submission-enhancements-style')) return;
  const style = document.createElement('style');
  style.id = 'step-submission-enhancements-style';
  style.textContent = `
    .step-section-title-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
    .step-section-optional{display:inline-flex;align-items:center;justify-content:center;min-height:24px;padding:0 9px;border-radius:999px;background:#eef5ff;color:#1760bb;border:1px solid #d5e5fa;font-size:10px;font-weight:850;letter-spacing:.04em;text-transform:uppercase}
    .step-careers-repeat-list[data-list="certification"]:empty{display:none}
    .step-success-modal[hidden]{display:none!important}
    .step-success-modal{position:fixed;inset:0;z-index:100000;display:grid;place-items:center;padding:22px;background:rgba(5,20,45,.58);backdrop-filter:blur(7px);animation:stepModalFade .18s ease-out}
    .step-success-dialog{position:relative;width:min(520px,100%);border-radius:24px;background:#fff;padding:34px 34px 30px;box-shadow:0 30px 90px rgba(5,20,45,.28);border:1px solid rgba(116,151,195,.25);text-align:center;animation:stepModalUp .24s ease-out}
    .step-success-close{position:absolute;top:15px;right:15px;width:38px;height:38px;border:0;border-radius:50%;background:#f4f7fb;color:#52647d;font-size:22px;line-height:1;cursor:pointer}
    .step-success-close:hover{background:#eaf0f8;color:#0b2a58}
    .step-success-icon{width:68px;height:68px;margin:0 auto 18px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(145deg,#0ea95c,#18c978);box-shadow:0 14px 32px rgba(18,180,101,.22);color:#fff;font-size:34px;font-weight:900}
    .step-success-eyebrow{margin-bottom:9px;color:#0c63ca;font-size:11px;font-weight:900;letter-spacing:.09em;text-transform:uppercase}
    .step-success-dialog h2{margin:0;color:#071b3d;font-size:30px;line-height:1.12;letter-spacing:-.025em}
    .step-success-message{margin:16px auto 0;max-width:430px;color:#52647d;font-size:15px;line-height:1.7}
    .step-success-followup{margin:8px auto 0;max-width:430px;color:#243a5b;font-size:15px;line-height:1.65;font-weight:700}
    .step-success-note{margin:18px auto 0;padding:10px 14px;max-width:390px;border-radius:12px;background:#f5f9ff;color:#687891;font-size:12px;line-height:1.5}
    .step-success-button{margin-top:22px;min-width:170px;min-height:44px;border:0;border-radius:11px;background:#0867d7;color:#fff;font:inherit;font-weight:850;cursor:pointer;box-shadow:0 10px 24px rgba(8,103,215,.20)}
    .step-success-button:hover{background:#075abd}
    body.step-modal-open{overflow:hidden}
    @keyframes stepModalFade{from{opacity:0}to{opacity:1}}
    @keyframes stepModalUp{from{opacity:0;transform:translateY(12px) scale(.98)}to{opacity:1;transform:none}}
    @media(max-width:560px){.step-success-dialog{padding:30px 22px 24px;border-radius:20px}.step-success-dialog h2{font-size:26px}.step-success-message,.step-success-followup{font-size:14px}}
  `;
  document.head.appendChild(style);
}

function enhanceCertifications(root) {
  const list = root.querySelector('[data-list="certification"]');
  if (!list || list.dataset.optionalReady === '1') return false;
  list.dataset.optionalReady = '1';

  const section = list.closest('.step-careers-section');
  const head = section?.querySelector('.step-careers-section-head');
  const title = head?.querySelector('h2');
  if (head && title && !head.querySelector('.step-section-optional')) {
    const row = document.createElement('div');
    row.className = 'step-section-title-row';
    title.before(row);
    row.appendChild(title);
    const badge = document.createElement('span');
    badge.className = 'step-section-optional';
    badge.textContent = optionalLabels[getLocale()] || optionalLabels.en;
    row.appendChild(badge);
  }

  const initialItems = [...list.querySelectorAll('[data-kind="certification"]')];
  if (initialItems.length === 1 && !hasCertificationValue(initialItems[0])) {
    initialItems[0].remove();
  }

  root.addEventListener('click', event => {
    const remove = event.target.closest('[data-remove-item]');
    const item = remove?.closest('[data-kind="certification"]');
    if (!item || item.parentElement !== list) return;
    const items = list.querySelectorAll('[data-kind="certification"]');
    if (items.length === 1) {
      event.preventDefault();
      event.stopImmediatePropagation();
      item.remove();
    }
  }, true);

  return true;
}

function hasCertificationValue(item) {
  return [...item.querySelectorAll('input,select,textarea')].some(control => {
    if (control.type === 'checkbox') return control.checked;
    return String(control.value || '').trim().length > 0;
  });
}

function ensureModal() {
  let modal = document.querySelector('[data-step-success-modal]');
  if (modal) return modal;

  const c = successCopy[getLocale()] || successCopy.en;
  modal = document.createElement('div');
  modal.className = 'step-success-modal';
  modal.dataset.stepSuccessModal = '1';
  modal.hidden = true;
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'step-success-title');
  modal.innerHTML = `
    <div class="step-success-dialog">
      <button type="button" class="step-success-close" data-step-success-close aria-label="${escapeHtml(c.close)}">×</button>
      <div class="step-success-icon" aria-hidden="true">✓</div>
      <div class="step-success-eyebrow">${escapeHtml(c.eyebrow)}</div>
      <h2 id="step-success-title">${escapeHtml(c.title)}</h2>
      <p class="step-success-message">${escapeHtml(c.message)}</p>
      <p class="step-success-followup">${escapeHtml(c.followup)}</p>
      <div class="step-success-note">${escapeHtml(c.note)}</div>
      <button type="button" class="step-success-button" data-step-success-close>${escapeHtml(c.button)}</button>
    </div>`;
  document.body.appendChild(modal);

  modal.addEventListener('click', event => {
    if (event.target.closest('[data-step-success-close]')) closeModal(modal);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !modal.hidden) closeModal(modal);
  });
  return modal;
}

function openModal(modal) {
  if (!modal || !modal.hidden) return;
  modal.hidden = false;
  document.body.classList.add('step-modal-open');
  requestAnimationFrame(() => modal.querySelector('.step-success-button')?.focus());
}

function closeModal(modal) {
  modal.hidden = true;
  document.body.classList.remove('step-modal-open');
}

function watchSuccessfulSubmission(root) {
  const status = root.querySelector('[data-status]');
  if (!status || status.dataset.successWatchReady === '1') return false;
  status.dataset.successWatchReady = '1';
  const modal = ensureModal();
  let lastSuccess = '';

  const check = () => {
    if (!status.classList.contains('is-success')) return;
    const text = String(status.textContent || '').trim();
    if (!text || text === lastSuccess) return;
    // Nunca mostrar confirmação de recebimento se o front estiver, por engano, em modo preview.
    if (/supabase|implantação oficial|implementação oficial|official deployment|implantación oficial|implémentation officielle/i.test(text)) return;
    lastSuccess = text;
    openModal(modal);
  };

  new MutationObserver(check).observe(status, {childList:true, subtree:true, attributes:true, attributeFilter:['class']});
  check();
  return true;
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}

function bootEnhancements() {
  injectStyles();
  const root = document.getElementById('step-careers-root');
  if (!root) return false;
  const form = root.querySelector('#step-careers-form');
  if (!form) return false;
  enhanceCertifications(root);
  watchSuccessfulSubmission(root);
  return true;
}

queueMicrotask(() => {
  if (bootEnhancements()) return;
  const observer = new MutationObserver(() => {
    if (bootEnhancements()) observer.disconnect();
  });
  observer.observe(document.documentElement, {childList:true, subtree:true});
});
