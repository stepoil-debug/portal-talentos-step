const attachmentText = {
  'pt-BR': {title:'Anexos opcionais', text:'Se quiser complementar seu cadastro, você pode anexar currículo, certificados ou outros documentos relevantes. O preenchimento do perfil continua sendo o principal.', button:'Adicionar anexos', note:'PDF, DOC, DOCX, JPG ou PNG · até 10 MB por arquivo', empty:'Nenhum anexo selecionado', remove:'Remover'},
  'pt-PT': {title:'Anexos opcionais', text:'Se quiser complementar o seu registo, pode anexar currículo, certificados ou outros documentos relevantes. O preenchimento do perfil continua a ser o principal.', button:'Adicionar anexos', note:'PDF, DOC, DOCX, JPG ou PNG · até 10 MB por ficheiro', empty:'Nenhum anexo selecionado', remove:'Remover'},
  en: {title:'Optional attachments', text:'If you would like to add supporting material, you can attach a résumé, certificates or other relevant documents. Completing the profile remains the main part of the registration.', button:'Add attachments', note:'PDF, DOC, DOCX, JPG or PNG · up to 10 MB per file', empty:'No attachments selected', remove:'Remove'},
  es: {title:'Archivos opcionales', text:'Si quieres complementar tu registro, puedes adjuntar currículum, certificados u otros documentos relevantes. Completar el perfil sigue siendo la parte principal.', button:'Añadir archivos', note:'PDF, DOC, DOCX, JPG o PNG · hasta 10 MB por archivo', empty:'No hay archivos seleccionados', remove:'Eliminar'},
  fr: {title:'Pièces jointes facultatives', text:'Si vous souhaitez compléter votre profil, vous pouvez joindre un CV, des certificats ou d’autres documents utiles. Le profil rempli reste la partie principale de l’inscription.', button:'Ajouter des pièces jointes', note:'PDF, DOC, DOCX, JPG ou PNG · 10 Mo maximum par fichier', empty:'Aucune pièce jointe sélectionnée', remove:'Supprimer'}
};

const root = document.getElementById('step-careers-root');
if (root) initAttachments(root);

function initAttachments(root) {
  const locale = root.dataset.locale || detectLocale();
  const text = attachmentText[locale] || attachmentText.en;
  let attempts = 0;
  const timer = setInterval(() => {
    attempts += 1;
    const form = root.querySelector('#step-careers-form');
    const sections = form?.querySelectorAll('.step-careers-section');
    if (form && sections?.length) {
      clearInterval(timer);
      mount(form, sections, text);
    } else if (attempts > 120) clearInterval(timer);
  }, 20);
}

function mount(form, sections, t) {
  if (form.querySelector('[data-step-attachments]')) return;
  injectStyles();
  window.STEP_TALENT_ATTACHMENTS = [];

  const section = document.createElement('section');
  section.className = 'step-careers-section step-attachments-section';
  section.dataset.stepAttachments = '1';
  section.innerHTML = `
    <div class="step-careers-section-head"><div><h2>${esc(t.title)}</h2><p class="step-attachments-copy">${esc(t.text)}</p></div><span class="step-attachments-optional">Opcional</span></div>
    <div class="step-attachments-box">
      <label class="step-attachments-button">
        <input type="file" data-step-file-input multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" hidden>
        <span aria-hidden="true">＋</span>${esc(t.button)}
      </label>
      <span class="step-attachments-note">${esc(t.note)}</span>
    </div>
    <div class="step-attachments-list" data-step-file-list><span class="step-attachments-empty">${esc(t.empty)}</span></div>`;

  const lastSection = sections[sections.length - 1];
  form.insertBefore(section, lastSection);

  const input = section.querySelector('[data-step-file-input]');
  const list = section.querySelector('[data-step-file-list]');

  input.addEventListener('change', () => {
    const incoming = [...input.files];
    const valid = incoming.filter(file => file.size <= 10 * 1024 * 1024);
    const current = window.STEP_TALENT_ATTACHMENTS || [];
    const merged = [...current];
    valid.forEach(file => {
      const duplicate = merged.some(item => item.name === file.name && item.size === file.size && item.lastModified === file.lastModified);
      if (!duplicate) merged.push(file);
    });
    window.STEP_TALENT_ATTACHMENTS = merged;
    input.value = '';
    renderList(list, t);
  });

  list.addEventListener('click', event => {
    const remove = event.target.closest('[data-remove-attachment]');
    if (!remove) return;
    const index = Number(remove.dataset.removeAttachment);
    const files = [...(window.STEP_TALENT_ATTACHMENTS || [])];
    files.splice(index, 1);
    window.STEP_TALENT_ATTACHMENTS = files;
    renderList(list, t);
  });
}

function renderList(list, t) {
  const files = window.STEP_TALENT_ATTACHMENTS || [];
  if (!files.length) {
    list.innerHTML = `<span class="step-attachments-empty">${esc(t.empty)}</span>`;
    return;
  }
  list.innerHTML = files.map((file, index) => `
    <div class="step-attachment-item">
      <div><strong>${esc(file.name)}</strong><span>${formatSize(file.size)}</span></div>
      <button type="button" data-remove-attachment="${index}" aria-label="${esc(t.remove)} ${esc(file.name)}">${esc(t.remove)}</button>
    </div>`).join('');
}

function formatSize(bytes) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function detectLocale() {
  const lang = (navigator.language || 'en').toLowerCase();
  if (lang.startsWith('pt-br')) return 'pt-BR';
  if (lang.startsWith('pt')) return 'pt-PT';
  if (lang.startsWith('es')) return 'es';
  if (lang.startsWith('fr')) return 'fr';
  return 'en';
}

function injectStyles() {
  if (document.querySelector('link[data-step-attachments-css]')) return;
  const base = root.dataset.base || './';
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `${base}src/attachments.css?v=1`;
  link.dataset.stepAttachmentsCss = '1';
  document.head.appendChild(link);
}

function esc(value='') {
  return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}
