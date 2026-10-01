import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/interno/documentos")({
  head: () => ({ meta: [{ title: 'Documentos | DHG' }, { name: 'description', content: 'Arquivos da operação interna da DHG.' }, { property: 'og:title', content: 'Documentos | DHG' }, { property: 'og:description', content: 'Arquivos da operação interna da DHG.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }, { name: 'robots', content: 'noindex,nofollow' }] }),
  component: () => null,
});
