const root = document.getElementById('step-careers-root');

if (root) {
  const locale = root.dataset.locale || 'en';
  const base = root.dataset.base || './';
  const copy = landingCopy[locale] || landingCopy.en;
  waitForModule();

  function waitForModule(attempt = 0) {
    const shell = root.querySelector('.step-careers-shell');
    const main = root.querySelector('.step-careers-container');
    if (!shell || !main) {
      if (attempt < 120) requestAnimationFrame(() => waitForModule(attempt + 1));
      return;
    }
    buildLanding(shell, main);
  }

  function buildLanding(shell, main) {
    if (root.dataset.landingReady === '1') return;
    root.dataset.landingReady = '1';

    injectStyles();
    applyOfficialLogo();

    [...main.children].forEach(child => child.classList.add('step-careers-form-phase'));

    const back = document.createElement('button');
    back.type = 'button';
    back.className = 'step-careers-back step-careers-form-phase';
    back.setAttribute('data-back-intro', '');
    back.innerHTML = `<span aria-hidden="true">←</span> ${escapeHtml(copy.back)}`;
    main.prepend(back);

    const landing = document.createElement('section');
    landing.className = 'step-careers-landing';
    landing.setAttribute('aria-labelledby', 'step-careers-landing-title');
    landing.innerHTML = `
      <div class="step-careers-landing-hero">
        <div class="step-careers-landing-glow step-careers-landing-glow-a"></div>
        <div class="step-careers-landing-glow step-careers-landing-glow-b"></div>
        <div class="step-careers-landing-copy">
          <div class="step-careers-landing-eyebrow">${escapeHtml(copy.eyebrow)}</div>
          <h1 id="step-careers-landing-title">${escapeHtml(copy.title)}</h1>
          <p class="step-careers-landing-lead">${escapeHtml(copy.lead)}</p>
          <p class="step-careers-landing-text">${escapeHtml(copy.text)}</p>
          <div class="step-careers-landing-actions">
            <button class="step-careers-start" type="button" data-start-profile>
              <span>${escapeHtml(copy.cta)}</span><span aria-hidden="true">→</span>
            </button>
            <span class="step-careers-landing-small">${escapeHtml(copy.ctaNote)}</span>
          </div>
          <div class="step-careers-market-chips" aria-label="${escapeHtml(copy.globalLabel)}">
            <span>Brasil</span><span>Portugal</span><span>Namíbia</span><span>Global</span>
          </div>
        </div>

        <div class="step-careers-landing-visual" aria-hidden="true">
          <div class="step-careers-orbit step-careers-orbit-one"></div>
          <div class="step-careers-orbit step-careers-orbit-two"></div>
          <div class="step-careers-world-card">
            <div class="step-careers-world-icon">✦</div>
            <strong>STEP Careers</strong>
            <span>${escapeHtml(copy.globalTalent)}</span>
          </div>
          <div class="step-careers-float-card card-one"><span>01</span>${escapeHtml(copy.floatOne)}</div>
          <div class="step-careers-float-card card-two"><span>02</span>${escapeHtml(copy.floatTwo)}</div>
          <div class="step-careers-float-card card-three"><span>03</span>${escapeHtml(copy.floatThree)}</div>
        </div>
      </div>

      <div class="step-careers-welcome">
        <div class="step-careers-welcome-heading">
          <span>${escapeHtml(copy.welcomeEyebrow)}</span>
          <h2>${escapeHtml(copy.welcomeTitle)}</h2>
          <p>${escapeHtml(copy.welcomeText)}</p>
        </div>
        <div class="step-careers-values">
          ${copy.values.map((item, index) => `
            <article class="step-careers-value-card">
              <div class="step-careers-value-number">0${index + 1}</div>
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.text)}</p>
            </article>`).join('')}
        </div>
      </div>

      <div class="step-careers-collaboration">
        <div>
          <span class="step-careers-collaboration-kicker">${escapeHtml(copy.collabEyebrow)}</span>
          <h2>${escapeHtml(copy.collabTitle)}</h2>
        </div>
        <p>${escapeHtml(copy.collabText)}</p>
      </div>

      <div class="step-careers-final-cta">
        <div>
          <span>${escapeHtml(copy.finalEyebrow)}</span>
          <h2>${escapeHtml(copy.finalTitle)}</h2>
          <p>${escapeHtml(copy.finalText)}</p>
        </div>
        <button class="step-careers-start step-careers-start-light" type="button" data-start-profile>
          <span>${escapeHtml(copy.cta)}</span><span aria-hidden="true">→</span>
        </button>
      </div>`;

    main.prepend(landing);

    root.addEventListener('click', event => {
      const start = event.target.closest('[data-start-profile]');
      if (start) {
        openForm();
        return;
      }
      const backButton = event.target.closest('[data-back-intro]');
      if (backButton) closeForm();
    });

    if (window.location.hash === '#cadastro' || window.location.hash === '#profile') {
      openForm(false);
    }
  }

  function openForm(shouldScroll = true) {
    root.classList.add('is-form-open');
    history.replaceState(null, '', `${window.location.pathname}${window.location.search}#cadastro`);
    if (shouldScroll) {
      requestAnimationFrame(() => {
        root.querySelector('.step-careers-hero')?.scrollIntoView({behavior: 'smooth', block: 'start'});
      });
    }
  }

  function closeForm() {
    root.classList.remove('is-form-open');
    history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    requestAnimationFrame(() => {
      root.querySelector('.step-careers-landing')?.scrollIntoView({behavior: 'smooth', block: 'start'});
    });
  }

  function applyOfficialLogo() {
    const brand = root.querySelector('.step-careers-brand');
    if (!brand) return;
    brand.innerHTML = `<img class="step-careers-logo" src="${escapeAttr(base)}assets/step-logo.svg" alt="STEP Integrated Solutions">`;
  }

  function injectStyles() {
    if (document.querySelector('link[data-step-careers-landing]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${base}src/landing.css`;
    link.dataset.stepCareersLanding = '1';
    document.head.appendChild(link);
  }
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}

function escapeAttr(value = '') {
  return String(value).replace(/["'<>]/g, '');
}

const landingCopy = {
  'pt-BR': {
    eyebrow: 'STEP CAREERS · CONSTRUA O FUTURO COM A GENTE',
    title: 'Seu próximo passo pode começar aqui.',
    lead: 'Ficamos muito felizes com o seu interesse em construir uma trajetória com a STEP.',
    text: 'Nosso crescimento acontece quando experiências, ideias e competências diferentes trabalham juntas. Queremos conhecer quem você é, o que você já construiu e para onde deseja ir.',
    cta: 'Cadastrar currículo',
    ctaNote: 'Cadastro digital, simples e estruturado.',
    globalLabel: 'Oportunidades globais',
    globalTalent: 'Banco global de talentos',
    floatOne: 'Pessoas', floatTwo: 'Projetos', floatThree: 'Oportunidades',
    welcomeEyebrow: 'POR QUE STEP',
    welcomeTitle: 'Grandes resultados são construídos em conjunto.',
    welcomeText: 'Na STEP, cada profissional pode contribuir com experiência, curiosidade, responsabilidade e vontade de evoluir. Valorizamos a colaboração entre pessoas, áreas, projetos e países.',
    values: [
      {title:'Pessoas que constroem', text:'Acreditamos em equipes que compartilham conhecimento e transformam desafios em soluções.'},
      {title:'Excelência e segurança', text:'Qualidade, responsabilidade e segurança fazem parte de como pensamos e executamos cada projeto.'},
      {title:'Conexão global', text:'Atuamos em diferentes mercados e buscamos talentos preparados para colaborar em ambientes diversos.'},
      {title:'Evolução contínua', text:'Queremos crescer junto com profissionais que buscam aprender, contribuir e assumir novos desafios.'}
    ],
    collabEyebrow: 'UMA REDE DE TALENTOS',
    collabTitle: 'Sua experiência pode se conectar ao nosso próximo desafio.',
    collabText: 'Ao cadastrar seu perfil, suas informações passam a fazer parte do nosso banco de talentos e podem ser consideradas de acordo com sua área, qualificações, disponibilidade e localização.',
    finalEyebrow: 'QUEREMOS CONHECER VOCÊ',
    finalTitle: 'Obrigado por considerar a STEP para o seu próximo capítulo profissional.',
    finalText: 'Conte sua trajetória para nós. O cadastro foi pensado para ser claro, organizado e acessível em diferentes idiomas.',
    back: 'Voltar à apresentação'
  },
  'pt-PT': {
    eyebrow:'STEP CAREERS · CONSTRUA O FUTURO CONNOSCO', title:'O seu próximo passo pode começar aqui.', lead:'Ficamos muito satisfeitos com o seu interesse em construir um percurso com a STEP.', text:'O nosso crescimento acontece quando diferentes experiências, ideias e competências trabalham em conjunto. Queremos conhecer quem é, o que já construiu e onde pretende chegar.', cta:'Registar currículo', ctaNote:'Registo digital, simples e estruturado.', globalLabel:'Oportunidades globais', globalTalent:'Base global de talentos', floatOne:'Pessoas', floatTwo:'Projetos', floatThree:'Oportunidades', welcomeEyebrow:'PORQUÊ A STEP', welcomeTitle:'Grandes resultados constroem-se em conjunto.', welcomeText:'Na STEP, cada profissional pode contribuir com experiência, curiosidade, responsabilidade e vontade de evoluir. Valorizamos a colaboração entre pessoas, áreas, projetos e países.', values:[{title:'Pessoas que constroem',text:'Acreditamos em equipas que partilham conhecimento e transformam desafios em soluções.'},{title:'Excelência e segurança',text:'Qualidade, responsabilidade e segurança fazem parte da forma como pensamos e executamos cada projeto.'},{title:'Ligação global',text:'Atuamos em diferentes mercados e procuramos talentos preparados para colaborar em ambientes diversos.'},{title:'Evolução contínua',text:'Queremos crescer com profissionais que procuram aprender, contribuir e assumir novos desafios.'}], collabEyebrow:'UMA REDE DE TALENTOS', collabTitle:'A sua experiência pode ligar-se ao nosso próximo desafio.', collabText:'Ao registar o seu perfil, as suas informações passam a integrar a nossa base de talentos e podem ser consideradas de acordo com a sua área, qualificações, disponibilidade e localização.', finalEyebrow:'QUEREMOS CONHECÊ-LO', finalTitle:'Obrigado por considerar a STEP para o seu próximo capítulo profissional.', finalText:'Conte-nos o seu percurso. O registo foi pensado para ser claro, organizado e acessível em diferentes idiomas.', back:'Voltar à apresentação'
  },
  en: {
    eyebrow:'STEP CAREERS · BUILD THE FUTURE WITH US', title:'Your next step can start here.', lead:'We are glad you are considering building your career journey with STEP.', text:'We grow when different experiences, ideas and skills work together. We want to understand who you are, what you have built and where you want to go next.', cta:'Create career profile', ctaNote:'Simple, structured digital registration.', globalLabel:'Global opportunities', globalTalent:'Global talent network', floatOne:'People', floatTwo:'Projects', floatThree:'Opportunities', welcomeEyebrow:'WHY STEP', welcomeTitle:'Great results are built together.', welcomeText:'At STEP, every professional can contribute experience, curiosity, responsibility and the desire to grow. We value collaboration across people, teams, projects and countries.', values:[{title:'People who build',text:'We believe in teams that share knowledge and turn challenges into practical solutions.'},{title:'Excellence & safety',text:'Quality, responsibility and safety are part of how we think and deliver every project.'},{title:'Global connection',text:'We operate across markets and look for talent ready to collaborate in diverse environments.'},{title:'Continuous growth',text:'We want to grow alongside professionals who are ready to learn, contribute and take on new challenges.'}], collabEyebrow:'A GLOBAL TALENT NETWORK', collabTitle:'Your experience may connect with our next challenge.', collabText:'When you create your profile, your information becomes part of our talent network and may be considered according to your expertise, qualifications, availability and location.', finalEyebrow:'WE WOULD LIKE TO KNOW YOU', finalTitle:'Thank you for considering STEP for your next professional chapter.', finalText:'Tell us about your journey. The registration experience is designed to be clear, organized and available in multiple languages.', back:'Back to introduction'
  },
  es: {
    eyebrow:'STEP CAREERS · CONSTRUYE EL FUTURO CON NOSOTROS', title:'Tu próximo paso puede comenzar aquí.', lead:'Nos alegra que estés considerando construir tu trayectoria profesional con STEP.', text:'Crecemos cuando diferentes experiencias, ideas y competencias trabajan juntas. Queremos conocer quién eres, lo que has construido y hacia dónde quieres avanzar.', cta:'Registrar currículum', ctaNote:'Registro digital, simple y estructurado.', globalLabel:'Oportunidades globales', globalTalent:'Red global de talento', floatOne:'Personas', floatTwo:'Proyectos', floatThree:'Oportunidades', welcomeEyebrow:'POR QUÉ STEP', welcomeTitle:'Los grandes resultados se construyen juntos.', welcomeText:'En STEP, cada profesional puede aportar experiencia, curiosidad, responsabilidad y ganas de crecer. Valoramos la colaboración entre personas, equipos, proyectos y países.', values:[{title:'Personas que construyen',text:'Creemos en equipos que comparten conocimiento y transforman desafíos en soluciones.'},{title:'Excelencia y seguridad',text:'La calidad, la responsabilidad y la seguridad forman parte de cada proyecto.'},{title:'Conexión global',text:'Operamos en distintos mercados y buscamos talento preparado para colaborar en entornos diversos.'},{title:'Evolución continua',text:'Queremos crecer junto a profesionales que buscan aprender, contribuir y asumir nuevos retos.'}], collabEyebrow:'UNA RED GLOBAL DE TALENTO', collabTitle:'Tu experiencia puede conectarse con nuestro próximo desafío.', collabText:'Al registrar tu perfil, tu información pasa a formar parte de nuestra red de talento y podrá considerarse según tu área, cualificaciones, disponibilidad y ubicación.', finalEyebrow:'QUEREMOS CONOCERTE', finalTitle:'Gracias por considerar STEP para tu próximo capítulo profesional.', finalText:'Cuéntanos tu trayectoria. El registro está diseñado para ser claro, organizado y accesible en varios idiomas.', back:'Volver a la presentación'
  },
  fr: {
    eyebrow:'STEP CAREERS · CONSTRUISEZ L’AVENIR AVEC NOUS', title:'Votre prochaine étape peut commencer ici.', lead:'Nous sommes heureux que vous envisagiez de construire votre parcours professionnel avec STEP.', text:'Nous progressons lorsque des expériences, des idées et des compétences différentes travaillent ensemble. Nous souhaitons découvrir qui vous êtes, ce que vous avez construit et où vous souhaitez aller.', cta:'Créer mon profil', ctaNote:'Inscription numérique simple et structurée.', globalLabel:'Opportunités mondiales', globalTalent:'Réseau mondial de talents', floatOne:'Personnes', floatTwo:'Projets', floatThree:'Opportunités', welcomeEyebrow:'POURQUOI STEP', welcomeTitle:'Les grands résultats se construisent ensemble.', welcomeText:'Chez STEP, chaque professionnel peut apporter son expérience, sa curiosité, son sens des responsabilités et son envie d’évoluer. Nous valorisons la collaboration entre les personnes, les équipes, les projets et les pays.', values:[{title:'Des personnes qui construisent',text:'Nous croyons aux équipes qui partagent leurs connaissances et transforment les défis en solutions.'},{title:'Excellence et sécurité',text:'La qualité, la responsabilité et la sécurité font partie de notre manière de réaliser chaque projet.'},{title:'Connexion mondiale',text:'Nous opérons sur différents marchés et recherchons des talents prêts à collaborer dans des environnements variés.'},{title:'Évolution continue',text:'Nous souhaitons évoluer avec des professionnels prêts à apprendre, contribuer et relever de nouveaux défis.'}], collabEyebrow:'UN RÉSEAU MONDIAL DE TALENTS', collabTitle:'Votre expérience peut rejoindre notre prochain défi.', collabText:'En créant votre profil, vos informations rejoignent notre réseau de talents et peuvent être prises en compte selon votre domaine, vos qualifications, votre disponibilité et votre localisation.', finalEyebrow:'NOUS SOUHAITONS VOUS CONNAÎTRE', finalTitle:'Merci d’envisager STEP pour votre prochain chapitre professionnel.', finalText:'Racontez-nous votre parcours. L’inscription a été conçue pour être claire, organisée et accessible en plusieurs langues.', back:'Retour à la présentation'
  }
};