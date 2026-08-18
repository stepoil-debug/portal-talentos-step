// Configuração pública do Portal de Talentos STEP.
// Nenhuma chave privada é exposta no front-end. Toda gravação passa pela Edge Function.
window.STEP_TALENT_CONFIG = Object.freeze({
  endpoint: 'https://qxmxtbjxkhecqilpnhgq.supabase.co/functions/v1/portal-talentos-submit',
  credentials: 'omit'
});

function addHoneypot() {
  const form = document.querySelector('#step-careers-form');
  if (!form || form.querySelector('input[name="website"]')) return false;

  const trap = document.createElement('input');
  trap.type = 'text';
  trap.name = 'website';
  trap.value = '';
  trap.tabIndex = -1;
  trap.autocomplete = 'off';
  trap.setAttribute('aria-hidden', 'true');
  trap.style.position = 'absolute';
  trap.style.left = '-10000px';
  trap.style.width = '1px';
  trap.style.height = '1px';
  trap.style.opacity = '0';
  trap.style.pointerEvents = 'none';
  form.appendChild(trap);
  return true;
}

if (typeof document !== 'undefined') {
  queueMicrotask(() => {
    if (addHoneypot()) return;
    const observer = new MutationObserver(() => {
      if (addHoneypot()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  });
}
