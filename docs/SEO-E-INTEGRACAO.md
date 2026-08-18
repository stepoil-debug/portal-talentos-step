# SEO e integração — STEP Careers

## Objetivo

Transformar o cadastro de currículo em uma página oficial de carreira dentro de `step-og.com`, fortalecendo a associação da marca com buscas como:

- STEP
- STEP Oil & Gas
- STEP Integrated Solutions
- STEP Solutions
- STEP Careers
- Trabalhe na STEP
- vagas STEP Oil & Gas
- carreiras offshore
- offshore jobs / oil and gas careers

O projeto não usa texto escondido, cloaking ou repetição artificial de palavras-chave. Esse tipo de técnica pode prejudicar a presença orgânica. A estratégia é baseada em conteúdo útil, arquitetura técnica, marca consistente, páginas localizadas e dados estruturados.

## Arquitetura recomendada no domínio oficial

```text
https://step-og.com/careers/          -> x-default / entrada global
https://step-og.com/careers/en/       -> inglês
https://step-og.com/careers/pt-br/    -> português Brasil
https://step-og.com/careers/pt-pt/    -> português Portugal
https://step-og.com/careers/es/       -> espanhol
https://step-og.com/careers/fr/       -> francês
```

Cada versão deve ter:

1. `<title>` próprio e natural.
2. Meta description localizada.
3. URL canonical apontando para ela mesma.
4. `hreflang` bidirecional para todas as versões.
5. Conteúdo realmente traduzido, não apenas o menu.
6. Um H1 claro.
7. Links internos vindos do site oficial.
8. Dados estruturados coerentes com o conteúdo visível.

## O que já foi criado neste repositório

- Páginas localizadas para PT-BR, PT-PT, EN, ES e FR.
- Metadados SEO individuais.
- Canonical.
- Hreflang.
- Open Graph.
- JSON-LD com `Organization`, `WebPage` e `BreadcrumbList`.
- Sitemap específico de Careers.
- Formulário com troca de idioma.
- Conteúdo semântico relacionado a STEP Careers, STEP Oil & Gas, STEP Integrated Solutions e STEP ManPower.
- Layout leve e responsivo para ajudar Core Web Vitals.

## Importante: SEO "oculto"

A parte que pode ficar invisível ao usuário é apenas a camada técnica legítima, como:

- JSON-LD.
- canonical.
- hreflang.
- Open Graph.
- metadados.
- sitemap.
- cabeçalhos HTTP.

Não inserir blocos de palavras-chave com `display:none`, texto branco sobre fundo branco, conteúdo fora da tela para manipular busca ou versões diferentes para Google e usuários.

Referência oficial: https://developers.google.com/search/docs/fundamentals/seo-starter-guide

## Conteúdo e autoridade de marca

O formulário sozinho não deve carregar páginas enormes de texto. Para manter a experiência simples, a página pode ter uma introdução curta e útil antes do formulário e links para conteúdos reais do site, especialmente:

- Home da STEP.
- Who We Are.
- STEP ManPower.
- Engineering.
- Construction.
- Installation.
- Procurement.
- News.
- Careers.

O ganho mais importante para buscas de marca virá quando a página Careers estiver fortemente ligada ao restante do domínio oficial e a marca for usada de forma consistente em títulos, conteúdo, dados estruturados e links internos.

## Estratégia internacional

O Google recomenda URLs próprias por idioma/região e relacionamento entre elas via `hreflang`.

Referência oficial: https://developers.google.com/search/docs/specialty/international/localized-versions

Idiomas implementados inicialmente:

- `pt-BR` — Brasil.
- `pt-PT` — Portugal.
- `en` — internacional, incluindo Namíbia e outros mercados anglófonos.
- `es` — expansão internacional.
- `fr` — expansão internacional.

Novos idiomas podem ser adicionados sem alterar a estrutura do formulário.

## Vagas reais no futuro

Quando o sistema possuir vagas individuais, cada vaga deve ter uma URL própria e poderá usar `JobPosting` JSON-LD. Não usar `JobPosting` no formulário geral de banco de talentos, porque ele não representa uma vaga específica.

Para vagas reais, incluir no mínimo:

- cargo;
- descrição;
- local;
- tipo de contratação;
- data de publicação;
- validade da vaga, quando aplicável;
- organização contratante;
- URL canônica da vaga.

Referência oficial: https://developers.google.com/search/docs/appearance/structured-data/job-posting

## Search Console e indexação

Após publicar no domínio oficial:

1. Confirmar propriedade `step-og.com` no Google Search Console.
2. Inspecionar `/careers/` e cada versão localizada.
3. Testar canonical e indexabilidade.
4. Enviar o sitemap atualizado.
5. Solicitar indexação das páginas principais.
6. Monitorar consultas de marca e carreira.
7. Avaliar CTR, posição média, páginas indexadas e Core Web Vitals.

Não existe mecanismo legítimo que garanta a primeira posição para a palavra genérica `STEP`. A meta técnica é aumentar fortemente a relevância para consultas de marca como `STEP Oil & Gas`, `STEP Solutions`, `STEP Careers` e variações relacionadas.

## Integração do formulário com Supabase

O navegador não deve usar `service_role`.

Fluxo recomendado:

```text
Candidato
   ↓
STEP Careers
   ↓
Validação de campos e consistência
   ↓
Supabase Edge Function
   ↓
Normalização de país / módulo
   ↓
Schema de talentos
   ↓
Brasil | Portugal | Namíbia | Global
   ↓
Painel de mão de obra
   ↓
Notificações apenas para usuários com permissão
```

### Payload já preparado

O módulo envia uma estrutura com:

- dados pessoais;
- objetivo profissional;
- resumo profissional;
- experiências;
- formação;
- qualificações;
- competências técnicas e comportamentais;
- certificações informadas manualmente;
- idiomas;
- disponibilidade;
- país/módulo desejado;
- consentimento;
- idioma da página;
- URL de origem;
- referrer;
- parâmetros UTM;
- timestamp.

Isso permite medir também a origem dos candidatos e campanhas de recrutamento.

## Privacidade e segurança

Para uma operação global, tratar privacidade desde a primeira versão:

- coletar somente dados necessários;
- consentimento explícito;
- política de retenção;
- RLS no Supabase;
- nenhuma leitura pública da tabela de candidatos;
- auditoria de acesso;
- exclusão/anonimização quando aplicável;
- versionamento da política de privacidade;
- validação de payload no servidor;
- rate limiting e proteção anti-spam.

## Deploy de preview

Ambientes de teste não devem competir com o domínio oficial. Em Vercel/Netlify/GitHub Pages de homologação, usar `noindex` por cabeçalho HTTP ou meta tag. O ambiente indexável deve ser o conteúdo final hospedado em `step-og.com`.

## Próxima etapa técnica

1. Definir o schema Supabase do Portal de Talentos.
2. Criar Edge Function de cadastro.
3. Criar regras de roteamento BR/PT/NA/Global.
4. Integrar notificações por permissão.
5. Conectar ao painel de mão de obra.
6. Inserir o módulo na página oficial Careers.
7. Validar Rich Results, hreflang, sitemap e Search Console.
