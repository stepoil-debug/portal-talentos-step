const HERO_IMAGE = 'https://step-og.com/wp-content/uploads/2025/10/fabrication-3-1024x1024.png';
const SECOND_IMAGE = 'https://step-og.com/wp-content/uploads/2025/10/i.png';

bootPolish();

function bootPolish(attempt = 0) {
  const root = document.getElementById('step-careers-root');
  const brand = root?.querySelector('.step-careers-brand');
  const heroPhoto = root?.querySelector('.step-hero-person');
  const secondary = root?.querySelector('.step-secondary-photo');
  if (!root || !brand || !heroPhoto || !secondary) {
    if (attempt < 240) setTimeout(() => bootPolish(attempt + 1), 25);
    return;
  }

  applyFavicon(root);
  fixLogo(root, brand);
  polishImages(heroPhoto, secondary);
  injectStyles();
}

function applyFavicon(root) {
  const base = root.dataset.base || './';
  const href = new URL(`${base}assets/favicon-max.svg?v=2`, document.baseURI).href;
  document.querySelectorAll('link[rel*="icon"]').forEach(link => link.remove());
  ['icon', 'shortcut icon', 'apple-touch-icon'].forEach(rel => {
    const link = document.createElement('link');
    link.rel = rel;
    link.type = 'image/svg+xml';
    link.href = href;
    document.head.appendChild(link);
  });
}

function fixLogo(root, brand) {
  const base = root.dataset.base || './';
  const src = new URL(`${base}assets/step-logo.svg?v=5`, document.baseURI).href;
  brand.innerHTML = `<img class="step-polished-logo" src="${src}" alt="STEP Integrated Solutions">`;
}

function polishImages(heroPhoto, secondary) {
  const heroImg = heroPhoto.querySelector('img');
  if (heroImg) {
    heroImg.src = HERO_IMAGE;
    heroImg.removeAttribute('referrerpolicy');
    heroImg.onerror = () => {
      heroImg.onerror = null;
      heroImg.src = 'https://step-og.com/wp-content/uploads/2025/10/pessoa4-990x1024.png';
    };
  }

  const secondaryImg = secondary.querySelector('img');
  if (secondaryImg) {
    secondaryImg.src = SECOND_IMAGE;
    secondaryImg.removeAttribute('referrerpolicy');
    secondaryImg.onerror = () => {
      secondaryImg.onerror = null;
      secondaryImg.src = 'https://step-og.com/wp-content/uploads/2025/10/c.png';
    };
  }

  const copy = secondary.querySelector('.step-secondary-photo-copy');
  if (copy) secondary.appendChild(copy);
}

function injectStyles() {
  document.getElementById('step-visual-polish-styles')?.remove();
  const style = document.createElement('style');
  style.id = 'step-visual-polish-styles';
  style.textContent = `
    .step-careers-brand{display:flex!important;align-items:center!important;min-width:260px}
    .step-polished-logo{display:block!important;width:min(330px,31vw)!important;height:auto!important;max-height:62px!important;object-fit:contain!important;object-position:left center!important}

    .step-hero-person{background:transparent!important;border:0!important;box-shadow:none!important;border-radius:24px!important;overflow:hidden!important;min-height:390px!important}
    .step-hero-person img{display:block!important;width:100%!important;height:100%!important;min-height:390px!important;padding:0!important;object-fit:cover!important;object-position:center!important;border-radius:24px!important}
    .step-hero-person figcaption{left:22px!important;right:22px!important;bottom:20px!important;border-radius:10px!important;background:rgba(7,27,61,.74)!important;box-shadow:none!important}

    .step-before-with-photo{gap:28px!important;align-items:stretch!important}
    .step-secondary-photo{position:relative!important;display:block!important;padding:0!important;background:transparent!important;border:0!important;box-shadow:none!important;border-radius:24px!important;overflow:hidden!important;min-height:330px!important}
    .step-secondary-photo-frame{position:absolute!important;inset:0!important;height:auto!important;border-radius:24px!important;overflow:hidden!important;background:transparent!important}
    .step-secondary-photo-frame img{display:block!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:center!important;border-radius:24px!important}
    .step-secondary-photo:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(5,25,57,.84) 0%,rgba(5,25,57,.54) 45%,rgba(5,25,57,.06) 100%);pointer-events:none}
    .step-secondary-photo-copy{position:absolute!important;z-index:2!important;left:34px!important;bottom:30px!important;width:min(520px,68%)!important;color:#fff!important;padding:0!important}
    .step-secondary-photo-copy>span{color:#8ed6ff!important}
    .step-secondary-photo-copy h2{color:#fff!important;font-size:clamp(26px,2.6vw,38px)!important}
    .step-secondary-photo-copy p{color:#edf4fb!important;font-size:13px!important;line-height:1.7!important}

    @media(max-width:920px){
      .step-polished-logo{width:245px!important;max-height:52px!important}
      .step-secondary-photo{min-height:300px!important}
      .step-secondary-photo-copy{width:min(560px,78%)!important}
    }
    @media(max-width:620px){
      .step-careers-brand{min-width:170px!important}
      .step-polished-logo{width:175px!important;max-height:44px!important}
      .step-hero-person,.step-hero-person img{min-height:300px!important;border-radius:18px!important}
      .step-secondary-photo{min-height:280px!important;border-radius:18px!important}
      .step-secondary-photo-frame,.step-secondary-photo-frame img{border-radius:18px!important}
      .step-secondary-photo-copy{left:22px!important;right:22px!important;bottom:22px!important;width:auto!important}
    }
  `;
  document.head.appendChild(style);
}
