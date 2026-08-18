/*
 * Ponto único de integração do Portal de Talentos STEP com o backend.
 *
 * Produção recomendada:
 * 1) Front chama uma Supabase Edge Function pública controlada.
 * 2) Edge Function valida payload, normaliza país/módulo e grava usando credenciais de servidor.
 * 3) RLS impede leitura pública dos currículos.
 * 4) Após insert, o backend dispara notificações somente para usuários autorizados ao módulo.
 *
 * Nunca adicionar SUPABASE_SERVICE_ROLE_KEY neste repositório/front-end.
 */

function getConfig() {
  return window.STEP_TALENT_CONFIG || {};
}

export async function submitTalentProfile(payload) {
  const config = getConfig();

  // Modo de estruturação/preview enquanto o endpoint oficial não estiver configurado.
  if (!config.endpoint) {
    return {
      ok: true,
      mode: 'preview',
      id: `preview-${Date.now()}`,
      payload
    };
  }

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  // Opcional: token público/CSRF definido pelo ambiente hospedeiro.
  if (config.publicToken) {
    headers.Authorization = `Bearer ${config.publicToken}`;
  }

  const response = await fetch(config.endpoint, {
    method: 'POST',
    headers,
    credentials: config.credentials || 'omit',
    body: JSON.stringify(payload)
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
