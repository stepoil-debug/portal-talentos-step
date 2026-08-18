applyCompactLayout();
setTimeout(applyCompactLayout, 500);
setTimeout(applyCompactLayout, 1600);

function applyCompactLayout() {
  document.getElementById('step-compact-layout-style')?.remove();
  const style = document.createElement('style');
  style.id = 'step-compact-layout-style';
  style.textContent = `
    .step-careers-topbar{height:64px!important;padding-left:clamp(18px,4vw,54px)!important;padding-right:clamp(18px,4vw,54px)!important}
    .step-polished-logo{max-height:52px!important;width:min(290px,28vw)!important}
    .step-careers-language a{height:31px!important;min-width:36px!important;font-size:11px!important}

    .step-careers-container{padding:28px 0 50px!important}
    .step-human-landing{gap:14px!important}

    .step-human-hero{grid-template-columns:minmax(0,1.18fr) minmax(280px,.62fr)!important;gap:36px!important;padding:34px 46px!important;border-radius:22px!important}
    .step-human-eyebrow{margin-bottom:11px!important;font-size:11px!important}
    .step-human-hero h1{font-size:clamp(40px,4.7vw,58px)!important;line-height:1.01!important;margin-bottom:11px!important}
    .step-human-lead{font-size:clamp(17px,1.55vw,21px)!important;line-height:1.42!important;margin-bottom:9px!important}
    .step-human-copy{font-size:13px!important;line-height:1.62!important;max-width:690px!important}
    .step-human-actions{margin-top:18px!important;gap:12px!important}
    .step-human-primary{min-height:44px!important;padding:0 17px!important;font-size:12px!important}
    .step-human-actions>span{font-size:11px!important}

    .step-hero-person{min-height:290px!important;max-height:310px!important;border-radius:18px!important}
    .step-hero-person img{min-height:0!important;height:300px!important;max-height:300px!important;object-fit:contain!important;border-radius:0!important}

    .step-before-with-photo{gap:18px!important}
    .step-human-before{padding:20px!important;border-radius:16px!important}
    .step-human-before-mark{margin-bottom:8px!important}
    .step-human-before h2{font-size:20px!important;margin-bottom:7px!important}
    .step-human-before>p{font-size:12px!important;line-height:1.55!important;margin-bottom:12px!important}
    .step-human-before ul{gap:8px!important}
    .step-human-before li{font-size:12px!important;line-height:1.42!important}
    .step-human-no-vacancy{margin-top:13px!important;padding-top:12px!important;font-size:11px!important}

    .step-secondary-photo{min-height:260px!important;border-radius:18px!important}
    .step-secondary-photo-frame,.step-secondary-photo-frame img{border-radius:18px!important}
    .step-secondary-photo-copy{left:26px!important;bottom:23px!important}
    .step-secondary-photo-copy h2{font-size:clamp(23px,2.2vw,31px)!important;margin-bottom:6px!important}
    .step-secondary-photo-copy p{font-size:12px!important;line-height:1.55!important}

    .step-human-about{padding:24px 8px!important}
    .step-human-section-intro{column-gap:44px!important;margin-bottom:18px!important}
    .step-human-section-intro>span{margin-bottom:7px!important;font-size:10px!important}
    .step-human-section-intro h2{font-size:clamp(27px,3vw,38px)!important}
    .step-human-section-intro p{font-size:13px!important;line-height:1.6!important}
    .step-human-pillars article{padding:18px 22px 19px 0!important}
    .step-human-pillars article+article{padding-left:22px!important}
    .step-human-pillars h3{font-size:15px!important;margin-bottom:6px!important}
    .step-human-pillars p{font-size:12px!important;line-height:1.55!important}

    .step-human-how{gap:38px!important;padding:26px 30px!important;border-radius:18px!important}
    .step-human-how-copy h2{font-size:clamp(25px,2.5vw,33px)!important;margin-bottom:8px!important}
    .step-human-how-copy p{font-size:12px!important;line-height:1.6!important}
    .step-human-steps article{grid-template-columns:30px 1fr!important;gap:13px!important;padding-bottom:14px!important}
    .step-human-steps article+article{padding-top:14px!important}
    .step-human-steps article>span{width:28px!important;height:28px!important;font-size:11px!important}
    .step-human-steps h3{font-size:14px!important;margin-bottom:4px!important}
    .step-human-steps p{font-size:12px!important;line-height:1.5!important}

    .step-human-final{padding:28px 32px!important;border-radius:18px!important}
    .step-human-final h2{font-size:clamp(25px,2.7vw,35px)!important}
    .step-human-final p{font-size:12px!important}

    @media(max-width:920px){
      .step-careers-topbar{height:auto!important;min-height:62px!important}
      .step-polished-logo{width:220px!important;max-height:46px!important}
      .step-human-hero{grid-template-columns:1fr!important;padding:30px!important;gap:22px!important}
      .step-hero-person{min-height:240px!important;max-height:260px!important}
      .step-hero-person img{height:250px!important;max-height:250px!important}
      .step-secondary-photo{min-height:245px!important}
    }

    @media(max-width:620px){
      .step-careers-container{padding-top:20px!important}
      .step-human-hero{padding:24px 20px!important}
      .step-human-hero h1{font-size:36px!important}
      .step-human-lead{font-size:17px!important}
      .step-polished-logo{width:165px!important;max-height:40px!important}
      .step-hero-person{min-height:220px!important}
      .step-hero-person img{height:225px!important}
      .step-human-about{padding:20px 0!important}
      .step-human-how,.step-human-final{padding:22px 19px!important}
    }
  `;
  document.head.appendChild(style);
}
