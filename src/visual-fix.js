const STEP_LOGO_URL = 'https://raw.githubusercontent.com/stepoil-debug/portal-talentos-step/main/assets/step-logo.svg?v=4';
const STEP_PEOPLE_URL = 'https://step-og.com/wp-content/uploads/2025/10/pessoa4-990x1024.png';
const STEP_FAVICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACTUlEQVR4nO2Vy2sTURTGv3snwYYSYykFcVFUaq0gFAShRqS6ENGdSN26EUEEN666kFFKKbiz0D9AFNT6AHUlGPFRsBRbTG3Ukpi2aTOWJPaRZJK0mZnPRWIbhLaDNilIfjCbe8693znn3nMGqFKlyhYjbHmRq34CAARLjCVnCAAosZUd2kvgn2VIWfwESSlKcxbAJdLZTjpUUtot6sr+dVQVCGE2fudF3YPO1CxgLaIGcZgcT+vmy7Hj7b42feieOZAPp91WSLMYCpLR0VOIXJ8AVAnctDYKQK5puVG4y0wK7xa+mHuWA0t1xoieMIbnas3xqBuvj8T8T3Ehl1FajenEXiuRbeJiLInIaBSqPfH1K7Bqp1ONHap36Vm0uaH7Ux63np3LtxzYPR9ZfmAE4y5Ma4A2XaPERk6ake5XQL8CnDftBODYwE6Q0hBihBMcmMvAazbXpzJR040pCHNSB7R5IP4TYiHUWxBXpV1xOwEAbyCpEukf1vt8Vh7FOLfj2+QLDAf7FJEmjfw+kZyaNUOdTwpdITa5DQszQNT10yN7kjl0+Hu9X+O7aj+wW3Tpt3B26CAAQOXa72kTohAA4Dg3eKz5uXZ4R4BR8ZjE1UXC+2wJOzsbCj7lnAsf6QSAhjE+VN6SuKYlcXrQEi19twEAHf3K3xxrv2xhWFApczO4a33KEdq8C7PhOGf8XYAAHgUqMIKLWSqXw/dx5jNlY/eV0vUKQAlS4IRvv2i94wOathXvvTL/hD/YuIXLx8pr35LMf7Ol4lWqVPl/+AUPLBVZsaY3IQAAAABJRU5ErkJggg==';

const COPY = {
  'pt-BR': {
    peopleEyebrow: 'Pessoas que fazem acontecer',
    peopleTitle: 'Conhecimento técnico ganha força quando existe colaboração.',
    peopleText: 'Nossos projetos conectam profissionais de diferentes áreas, experiências e países. É essa combinação que transforma planejamento em entrega.',
    caption: 'Pessoas, segurança e execução caminham juntas na STEP.',
    secondaryTitle: 'Um ambiente feito por pessoas',
    secondaryText: 'Engenharia, fabricação, construção, instalação e suporte: cada entrega começa com um time preparado.'
  },
  'pt-PT': {
    peopleEyebrow: 'Pessoas que fazem acontecer', peopleTitle: 'O conhecimento técnico ganha força quando existe colaboração.', peopleText: 'Os nossos projetos ligam profissionais de diferentes áreas, experiências e países. É essa combinação que transforma planeamento em entrega.', caption: 'Pessoas, segurança e execução caminham juntas na STEP.', secondaryTitle: 'Um ambiente feito por pessoas', secondaryText: 'Engenharia, fabrico, construção, instalação e suporte: cada entrega começa com uma equipa preparada.'
  },
  en: {
    peopleEyebrow: 'People who make it happen', peopleTitle: 'Technical knowledge becomes stronger through collaboration.', peopleText: 'Our projects connect professionals across disciplines, backgrounds and countries. That combination turns planning into delivery.', caption: 'People, safety and execution move together at STEP.', secondaryTitle: 'A workplace built around people', secondaryText: 'Engineering, fabrication, construction, installation and support: every delivery starts with a prepared team.'
  },
  es: {
    peopleEyebrow: 'Personas que hacen que suceda', peopleTitle: 'El conocimiento técnico se fortalece cuando existe colaboración.', peopleText: 'Nuestros proyectos conectan profesionales de diferentes áreas, experiencias y países. Esa combinación transforma la planificación en resultados.', caption: 'Personas, seguridad y ejecución avanzan juntas en STEP.', secondaryTitle: 'Un entorno hecho por personas', secondaryText: 'Ingeniería, fabricación, construcción, instalación y soporte: cada entrega comienza con un equipo preparado.'
  },
  fr: {
    peopleEyebrow: 'Des personnes qui font avancer les projets', peopleTitle: 'Le savoir-faire technique prend toute sa force dans la collaboration.', peopleText: 'Nos projets réunissent des professionnels de disciplines, d’expériences et de pays différents. Cette complémentarité transforme la planification en réalisation.', caption: 'Les personnes, la sécurité et l’exécution avancent ensemble chez STEP.', secondaryTitle: 'Un environnement construit autour des personnes', secondaryText: 'Ingénierie, fabrication, construction, installation et support : chaque réalisation commence par une équipe préparée.'
  }
};

applyFavicon();
waitForPortal();

function applyFavicon() {
  document.querySelectorAll('link[rel*="icon"]').forEach(link => link.remove());
  const icon = document.createElement('link');
  icon.rel = 'icon';
  icon.type = 'image/png';
  icon.sizes = '32x32';
  icon.href = STEP_FAVICON;
  document.head.appendChild(icon);

  const shortcut = document.createElement('link');
  shortcut.rel = 'shortcut icon';
  shortcut.href = STEP_FAVICON;
  document.head.appendChild(shortcut);
}

function waitForPortal(attempt = 0) {
  const root = document.getElementById('step-careers-root');
  const brand = root?.querySelector('.step-careers-brand');
  const landing = root?.querySelector('.step-human-landing');
  if (!root || !brand || !landing) {
    if (attempt < 180) setTimeout(() => waitForPortal(attempt + 1), 25);
    return;
  }

  fixBrand(brand);
  injectVisualStyles();
  addPeopleSection(root, landing);
}

function fixBrand(brand) {
  brand.innerHTML = '';
  const img = document.createElement('img');
  img.src = STEP_LOGO_URL;
  img.alt = 'STEP Integrated Solutions';
  img.className = 'step-fixed-logo';
  img.decoding = 'async';
  img.onerror = () => {
    img.remove();
    brand.innerHTML = '<span class="step-logo-text-fallback"><strong>STEP</strong><small>Integrated Solutions</small></span>';
  };
  brand.appendChild(img);
}

function addPeopleSection(root, landing) {
  if (root.querySelector('[data-step-people-section]')) return;
  const locale = root.dataset.locale || detectLocale();
  const t = COPY[locale] || COPY.en;
  const hero = landing.querySelector('.step-human-hero');
  const about = landing.querySelector('.step-human-about');
  if (!hero || !about) return;

  const before = hero.querySelector('.step-human-before');
  if (before) {
    const media = document.createElement('figure');
    media.className = 'step-hero-person';
    media.innerHTML = `
      <img src="${STEP_PEOPLE_URL}" alt="Profissional em ambiente industrial" loading="eager" referrerpolicy="no-referrer">
      <figcaption>${escapeHtml(t.caption)}</figcaption>`;
    hero.replaceChild(media, before);

    const infoRow = document.createElement('section');
    infoRow.className = 'step-before-with-photo';
    infoRow.dataset.stepPeopleSection = '1';
    const beforeWrap = document.createElement('div');
    beforeWrap.className = 'step-before-wrap';
    beforeWrap.appendChild(before);
    const second = document.createElement('div');
    second.className = 'step-secondary-photo';
    second.innerHTML = `
      <div class="step-secondary-photo-frame">
        <img src="${STEP_PEOPLE_URL}" alt="Profissional da indústria de óleo e gás" loading="lazy" referrerpolicy="no-referrer">
      </div>
      <div class="step-secondary-photo-copy">
        <span>${escapeHtml(t.peopleEyebrow)}</span>
        <h2>${escapeHtml(t.secondaryTitle)}</h2>
        <p>${escapeHtml(t.secondaryText)}</p>
      </div>`;
    infoRow.append(beforeWrap, second);
    hero.after(infoRow);
  }

  const people = document.createElement('section');
  people.className = 'step-people-message';
  people.innerHTML = `
    <span>${escapeHtml(t.peopleEyebrow)}</span>
    <h2>${escapeHtml(t.peopleTitle)}</h2>
    <p>${escapeHtml(t.peopleText)}</p>`;
  about.before(people);
}

function injectVisualStyles() {
  if (document.getElementById('step-visual-fix-styles')) return;
  const style = document.createElement('style');
  style.id = 'step-visual-fix-styles';
  style.textContent = `
    .step-fixed-logo{display:block;width:min(285px,34vw);height:58px;object-fit:contain;object-position:left center}
    .step-logo-text-fallback{display:flex;flex-direction:column;color:#0b2f67;line-height:1}.step-logo-text-fallback strong{font:900 28px/1 Arial,sans-serif;letter-spacing:.06em}.step-logo-text-fallback small{font:700 9px/1.2 Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;margin-top:4px}
    .step-hero-person{margin:0;position:relative;min-height:360px;height:100%;border-radius:22px;overflow:hidden;background:linear-gradient(145deg,#eef6fc,#e7f0f8);border:1px solid #dbe6f0;box-shadow:0 18px 40px rgba(7,27,61,.09)}
    .step-hero-person img{width:100%;height:100%;min-height:360px;object-fit:contain;object-position:center bottom;display:block;padding:12px 8px 0}
    .step-hero-person figcaption{position:absolute;left:16px;right:16px;bottom:14px;padding:11px 13px;border-radius:12px;background:rgba(7,27,61,.78);backdrop-filter:blur(8px);color:#fff;font-size:11px;font-weight:750;line-height:1.45}
    .step-before-with-photo{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:22px;align-items:stretch}
    .step-before-wrap>.step-human-before{height:100%;box-sizing:border-box}
    .step-secondary-photo{display:grid;grid-template-columns:220px 1fr;gap:26px;align-items:center;padding:22px;border:1px solid #dce6f0;border-radius:20px;background:#fff;box-shadow:0 12px 32px rgba(7,27,61,.055)}
    .step-secondary-photo-frame{height:210px;border-radius:16px;overflow:hidden;background:#eef5fb}.step-secondary-photo-frame img{width:100%;height:100%;object-fit:cover;object-position:58% 20%;display:block}
    .step-secondary-photo-copy>span,.step-people-message>span{display:block;color:#1265ad;font-size:10px;font-weight:850;letter-spacing:.09em;text-transform:uppercase;margin-bottom:10px}
    .step-secondary-photo-copy h2{margin:0 0 9px;color:#0b2448;font-size:25px;line-height:1.08;letter-spacing:-.025em}.step-secondary-photo-copy p{margin:0;color:#617087;font-size:13px;line-height:1.65}
    .step-people-message{max-width:960px;margin:20px auto 2px;text-align:center;padding:38px 24px}.step-people-message h2{margin:0 auto 12px;max-width:850px;color:#071b3d;font-size:clamp(28px,3.4vw,44px);line-height:1.1;letter-spacing:-.035em}.step-people-message p{margin:0 auto;max-width:760px;color:#627087;font-size:14px;line-height:1.75}
    @media(max-width:920px){.step-fixed-logo{width:220px;height:50px}.step-before-with-photo{grid-template-columns:1fr}.step-secondary-photo{grid-template-columns:190px 1fr}.step-hero-person{min-height:330px}.step-hero-person img{min-height:330px}}
    @media(max-width:620px){.step-fixed-logo{width:170px;height:42px}.step-secondary-photo{grid-template-columns:1fr;padding:17px}.step-secondary-photo-frame{height:240px}.step-hero-person{min-height:300px}.step-hero-person img{min-height:300px}.step-people-message{padding:28px 10px}}
  `;
  document.head.appendChild(style);
}

function detectLocale() {
  const lang = (navigator.language || 'en').toLowerCase();
  if (lang.startsWith('pt-br')) return 'pt-BR';
  if (lang.startsWith('pt')) return 'pt-PT';
  if (lang.startsWith('es')) return 'es';
  if (lang.startsWith('fr')) return 'fr';
  return 'en';
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}
