/*
 * Ponto único de integração do Portal de Talentos STEP com o backend.
 *
 * Produção recomendada:
 * 1) Front chama uma Supabase Edge Function pública controlada.
 * 2) Edge Function valida payload, normaliza país/módulo e grava usando credenciais de servidor.
 * 3) RLS impede leitura pública dos currículos.
 * 4) Após insert, o backend dispara notificações somente para usuários autorizados ao módulo.
 * 5) Anexos, quando enviados, devem ir para bucket privado e ser relacionados ao cadastro.
 *
 * Nunca adicionar SUPABASE_SERVICE_ROLE_KEY neste repositório/front-end.
 */

const ATTACHMENT_RULES = {
  maxFiles: 8,
  maxBytesPerFile: 15 * 1024 * 1024,
  allowedExtensions: ['pdf', 'doc', 'docx', 'png', 'jpg', 'jpeg']
};

const attachmentCopy = {
  'pt-BR': {
    title: '10. Anexos', optional: 'Opcional',
    description: 'Se desejar, você pode anexar seu currículo pronto, certificados ou outros comprovantes. O preenchimento do formulário continua sendo o currículo principal e nenhum anexo é obrigatório.',
    button: 'Adicionar anexos', hint: 'PDF, DOC, DOCX, PNG ou JPG · até 8 arquivos · máximo de 15 MB por arquivo',
    empty: 'Nenhum arquivo selecionado.', remove: 'Remover', tooMany: 'Você pode anexar no máximo 8 arquivos.',
    invalidType: 'Formato não permitido:', tooLarge: 'Arquivo acima de 15 MB:'
  },
  'pt-PT': {
    title: '10. Anexos', optional: 'Opcional',
    description: 'Se desejar, pode anexar o seu currículo, certificados ou outros comprovativos. O preenchimento do formulário continua a ser o currículo principal e nenhum anexo é obrigatório.',
    button: 'Adicionar anexos', hint: 'PDF, DOC, DOCX, PNG ou JPG · até 8 ficheiros · máximo de 15 MB por ficheiro',
    empty: 'Nenhum ficheiro selecionado.', remove: 'Remover', tooMany: 'Pode anexar no máximo 8 ficheiros.',
    invalidType: 'Formato não permitido:', tooLarge: 'Ficheiro acima de 15 MB:'
  },
  en: {
    title: '10. Attachments', optional: 'Optional',
    description: 'If you wish, you may attach an existing CV, certificates or other supporting documents. The online form remains your main career profile and attachments are not required.',
    button: 'Add attachments', hint: 'PDF, DOC, DOCX, PNG or JPG · up to 8 files · maximum 15 MB per file',
    empty: 'No files selected.', remove: 'Remove', tooMany: 'You may attach up to 8 files.',
    invalidType: 'File type not allowed:', tooLarge: 'File exceeds 15 MB:'
  },
  es: {
    title: '10. Archivos adjuntos', optional: 'Opcional',
    description: 'Si lo deseas, puedes adjuntar tu CV, certificados u otros comprobantes. El formulario sigue siendo tu perfil profesional principal y ningún archivo es obligatorio.',
    button: 'Añadir archivos', hint: 'PDF, DOC, DOCX, PNG o JPG · hasta 8 archivos · máximo 15 MB por archivo',
    empty: 'Ningún archivo seleccionado.', remove: 'Eliminar', tooMany: 'Puedes adjuntar como máximo 8 archivos.',
    invalidType: 'Formato no permitido:', tooLarge: 'Archivo superior a 15 MB:'
  },
  fr: {
    title: '10. Pièces jointes', optional: 'Facultatif',
    description: 'Si vous le souhaitez, vous pouvez joindre votre CV, vos certificats ou d’autres justificatifs. Le formulaire en ligne reste votre profil principal et aucune pièce jointe n’est obligatoire.',
    button: 'Ajouter des pièces jointes', hint: 'PDF, DOC, DOCX, PNG ou JPG · jusqu’à 8 fichiers · 15 Mo maximum par fichier',
    empty: 'Aucun fichier sélectionné.', remove: 'Retirer', tooMany: 'Vous pouvez joindre jusqu’à 8 fichiers.',
    invalidType: 'Format non autorisé :', tooLarge: 'Fichier supérieur à 15 Mo :'
  }
};

function getConfig() {
  return window.STEP_TALENT_CONFIG || {};
}

function getSelectedAttachments() {
  const input = document.querySelector('[data-step-attachments]');
  return input?.files ? [...input.files] : [];
}

export async function submitTalentProfile(payload) {
  const config = getConfig();
  const attachments = getSelectedAttachments();

  // Modo de estruturação/preview enquanto o endpoint oficial não estiver configurado.
  if (!config.endpoint) {
    return {
      ok: true,
      mode: 'preview',
      id: `preview-${Date.now()}`,
      payload,
      attachments: attachments.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type || null
      }))
    };
  }

  const headers = {
    'Accept': 'application/json'
  };

  // Opcional: token público/CSRF definido pelo ambiente hospedeiro.
  if (config.publicToken) {
    headers.Authorization = `Bearer ${config.publicToken}`;
  }

  let body;
  if (attachments.length) {
    // Com anexos utilizamos multipart/form-data. O navegador define o boundary automaticamente.
    const multipart = new FormData();
    multipart.append('profile', new Blob([JSON.stringify(payload)], {type: 'application/json'}), 'profile.json');
    attachments.forEach(file => multipart.append('attachments', file, file.name));
    body = multipart;
  } else {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(payload);
  }

  const response = await fetch(config.endpoint, {
    method: 'POST',
    headers,
    credentials: config.credentials || 'omit',
    body
  });

  let data = null;
  try {
    data = await response.json();
  } catch (_) {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.message || `HTTP ${response.status}`);
  }

  return {
    ok: true,
    mode: 'production',
    data
  };
}

function getLocale() {
  const lang = (document.documentElement.lang || 'en').toLowerCase();
  if (lang === 'pt-br') return 'pt-BR';
  if (lang.startsWith('pt')) return 'pt-PT';
  if (lang.startsWith('es')) return 'es';
  if (lang.startsWith('fr')) return 'fr';
  return 'en';
}

function ensureEnhancementStyles() {
  if (document.getElementById('step-careers-enhancement-styles')) return;
  const style = document.createElement('style');
  style.id = 'step-careers-enhancement-styles';
  style.textContent = `
    .step-careers-brand{min-width:0}
    .step-careers-brand-logo{display:block;width:auto;height:58px;max-width:min(390px,42vw);object-fit:contain}
    .step-careers-attachments-head{display:flex;align-items:center;gap:10px}
    .step-careers-optional-badge{display:inline-flex;align-items:center;min-height:25px;padding:0 9px;border-radius:999px;background:#edf5ff;color:#0757d4;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.04em}
    .step-careers-attachments-description{margin:-6px 0 17px;color:#64748b;font-size:13px;line-height:1.65;max-width:900px}
    .step-careers-upload-box{border:1.5px dashed #b8cae2;border-radius:14px;background:#f8fbff;padding:20px;display:flex;align-items:center;justify-content:space-between;gap:18px;flex-wrap:wrap}
    .step-careers-upload-action{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:9px;min-height:42px;padding:0 17px;border-radius:10px;background:#fff;color:#0757d4;border:1px solid #afc8ee;font-size:13px;font-weight:800;cursor:pointer;box-shadow:0 5px 14px rgba(7,87,212,.06)}
    .step-careers-upload-action:hover{background:#eef5ff}
    .step-careers-upload-action input{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:pointer}
    .step-careers-upload-icon{font-size:18px;line-height:1}
    .step-careers-upload-hint{font-size:12px;color:#728198;line-height:1.5;flex:1;min-width:240px}
    .step-careers-file-list{display:grid;gap:8px;margin-top:12px}
    .step-careers-file-empty{font-size:12px;color:#8a97aa}
    .step-careers-file-item{display:flex;align-items:center;justify-content:space-between;gap:12px;border:1px solid #dce6f2;border-radius:10px;background:#fff;padding:10px 12px;font-size:12px}
    .step-careers-file-main{min-width:0;display:flex;align-items:center;gap:9px}
    .step-careers-file-name{font-weight:750;color:#31415a;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:640px}
    .step-careers-file-size{color:#8290a4;white-space:nowrap}
    .step-careers-file-remove{border:0;background:transparent;color:#c43838;font-size:12px;font-weight:800;cursor:pointer;padding:5px 7px}
    .step-careers-attachment-error{display:none;margin-top:10px;padding:10px 12px;border-radius:9px;background:#fff1f1;color:#a52828;border:1px solid #f0c5c5;font-size:12px;font-weight:700}
    .step-careers-attachment-error.is-visible{display:block}
    @media(max-width:900px){.step-careers-brand-logo{height:50px;max-width:320px}}
    @media(max-width:560px){.step-careers-brand-logo{height:42px;max-width:210px}.step-careers-upload-box{align-items:stretch}.step-careers-upload-action{width:100%}.step-careers-file-name{max-width:190px}}
  `;
  document.head.appendChild(style);
}

function enhanceBrand(root) {
  const brand = root.querySelector('.step-careers-brand');
  if (!brand || brand.dataset.logoEnhanced === '1') return;
  const base = root.dataset.base || './';
  brand.dataset.logoEnhanced = '1';
  brand.innerHTML = `<img class="step-careers-brand-logo" src="${base}assets/step-logo.svg" alt="STEP Integrated Solutions">`;
}

function formatBytes(bytes) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function enhanceAttachments(root) {
  const form = root.querySelector('#step-careers-form');
  if (!form || form.querySelector('[data-step-attachments-section]')) return;

  const locale = getLocale();
  const copy = attachmentCopy[locale] || attachmentCopy.en;
  const footer = form.querySelector('.step-careers-footer-actions');
  if (!footer) return;

  const section = document.createElement('section');
  section.className = 'step-careers-section';
  section.dataset.stepAttachmentsSection = '1';
  section.innerHTML = `
    <div class="step-careers-section-head">
      <div class="step-careers-attachments-head">
        <h2>${copy.title}</h2>
        <span class="step-careers-optional-badge">${copy.optional}</span>
      </div>
    </div>
    <p class="step-careers-attachments-description">${copy.description}</p>
    <div class="step-careers-upload-box">
      <label class="step-careers-upload-action">
        <span class="step-careers-upload-icon" aria-hidden="true">＋</span>
        <span>${copy.button}</span>
        <input type="file" multiple accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" data-step-attachments aria-label="${copy.button}">
      </label>
      <div class="step-careers-upload-hint">${copy.hint}</div>
    </div>
    <div class="step-careers-attachment-error" data-step-attachment-error role="alert"></div>
    <div class="step-careers-file-list" data-step-file-list><div class="step-careers-file-empty">${copy.empty}</div></div>
  `;

  footer.before(section);

  const input = section.querySelector('[data-step-attachments]');
  const list = section.querySelector('[data-step-file-list]');
  const errorBox = section.querySelector('[data-step-attachment-error]');
  let selectedFiles = [];

  input.addEventListener('change', () => {
    const candidates = [...input.files];
    const errors = [];

    if (candidates.length > ATTACHMENT_RULES.maxFiles) {
      errors.push(copy.tooMany);
    }

    selectedFiles = candidates.slice(0, ATTACHMENT_RULES.maxFiles).filter(file => {
      const extension = (file.name.split('.').pop() || '').toLowerCase();
      if (!ATTACHMENT_RULES.allowedExtensions.includes(extension)) {
        errors.push(`${copy.invalidType} ${file.name}`);
        return false;
      }
      if (file.size > ATTACHMENT_RULES.maxBytesPerFile) {
        errors.push(`${copy.tooLarge} ${file.name}`);
        return false;
      }
      return true;
    });

    syncFileInput(input, selectedFiles);
    renderFiles();
    showErrors(errors);
  });

  list.addEventListener('click', event => {
    const button = event.target.closest('[data-remove-attachment]');
    if (!button) return;
    const index = Number(button.dataset.removeAttachment);
    selectedFiles.splice(index, 1);
    syncFileInput(input, selectedFiles);
    renderFiles();
    showErrors([]);
  });

  function renderFiles() {
    if (!selectedFiles.length) {
      list.innerHTML = `<div class="step-careers-file-empty">${copy.empty}</div>`;
      return;
    }
    list.innerHTML = selectedFiles.map((file, index) => `
      <div class="step-careers-file-item">
        <div class="step-careers-file-main">
          <span aria-hidden="true">📎</span>
          <span class="step-careers-file-name" title="${escapeHtml(file.name)}">${escapeHtml(file.name)}</span>
          <span class="step-careers-file-size">${formatBytes(file.size)}</span>
        </div>
        <button type="button" class="step-careers-file-remove" data-remove-attachment="${index}">${copy.remove}</button>
      </div>
    `).join('');
  }

  function showErrors(errors) {
    if (!errors.length) {
      errorBox.textContent = '';
      errorBox.classList.remove('is-visible');
      return;
    }
    errorBox.textContent = errors.join(' ');
    errorBox.classList.add('is-visible');
  }
}

function syncFileInput(input, files) {
  try {
    const transfer = new DataTransfer();
    files.forEach(file => transfer.items.add(file));
    input.files = transfer.files;
  } catch (_) {
    // Alguns navegadores antigos não permitem reatribuir FileList; nesses casos o usuário pode selecionar novamente.
  }
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}

function applyUiEnhancements() {
  const root = document.getElementById('step-careers-root');
  if (!root || !root.querySelector('#step-careers-form')) return false;
  ensureEnhancementStyles();
  enhanceBrand(root);
  enhanceAttachments(root);
  return true;
}

// O adapter é importado antes do módulo terminar de renderizar. Observamos o DOM e aplicamos
// os aprimoramentos assim que o formulário estiver disponível, sem duplicar componentes.
if (typeof document !== 'undefined') {
  queueMicrotask(() => {
    if (applyUiEnhancements()) return;
    const observer = new MutationObserver(() => {
      if (applyUiEnhancements()) observer.disconnect();
    });
    observer.observe(document.documentElement, {childList: true, subtree: true});
  });
}
