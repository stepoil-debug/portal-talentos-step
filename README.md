# Portal de Talentos STEP

Módulo global de cadastro de currículo da STEP Oil & Gas, preparado para ser incorporado ao site oficial `step-og.com`.

## Objetivo

- Formulário simples, sem menus laterais e sem upload de documentos.
- Currículo preenchido diretamente pelo candidato.
- Cadastro estruturado: dados pessoais, objetivo, resumo profissional, experiências, formação, qualificações, certificações, idiomas e disponibilidade.
- Idiomas iniciais: Português (Brasil), Português (Portugal), English, Español e Français.
- Arquitetura pronta para integração com Supabase e notificações por permissão/módulo.
- Camada de SEO internacional preparada para STEP Careers / STEP Oil & Gas / STEP Integrated Solutions.

## Estrutura

```text
/
├─ index.html                 # entrada x-default / demonstração do módulo
├─ pt-br/index.html           # versão SEO pt-BR
├─ pt-pt/index.html           # versão SEO pt-PT
├─ en/index.html              # versão SEO English
├─ es/index.html              # versão SEO Español
├─ fr/index.html              # versão SEO Français
├─ src/
│  ├─ module.js               # formulário e comportamento
│  ├─ i18n.js                 # traduções
│  ├─ styles.css              # visual isolado do site principal
│  └─ supabase-adapter.js     # ponto único de integração futura
├─ seo/
│  ├─ structured-data.json
│  ├─ hreflang-snippet.html
│  └─ sitemap-careers.xml
└─ docs/
   └─ SEO-E-INTEGRACAO.md
```

## Integração no site oficial

O módulo foi construído com classes prefixadas `step-careers-*` para reduzir conflitos com WordPress/Elementor ou outro front existente.

Exemplo mínimo:

```html
<link rel="stylesheet" href="/careers/src/styles.css">
<div id="step-careers-root" data-locale="pt-BR" data-base="/careers/"></div>
<script type="module" src="/careers/src/module.js"></script>
```

## Supabase

A camada de persistência está isolada em `src/supabase-adapter.js`. O front **não deve conter `service_role`**. A integração final deve usar chave pública com RLS rigorosa ou, preferencialmente, uma Edge Function controlada para validação, gravação, roteamento por país e notificações.

## SEO

Não é utilizado texto oculto ou repetição artificial de palavras-chave. O projeto usa SEO técnico e semântico: títulos e descrições localizados, `canonical`, `hreflang`, Open Graph, dados estruturados JSON-LD e sitemap dedicado. Consulte `docs/SEO-E-INTEGRACAO.md`.
