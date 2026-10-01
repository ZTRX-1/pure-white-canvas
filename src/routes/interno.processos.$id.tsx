import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/interno/processos/$id")({
  head: () => ({ meta: [{ title: 'Processo | DHG' }, { name: 'description', content: 'Acompanhamento de processo na operação interna da DHG.' }, { property: 'og:title', content: 'Processo | DHG' }, { property: 'og:description', content: 'Acompanhamento de processo na operação interna da DHG.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }, { name: 'robots', content: 'noindex,nofollow' }] }),
  component: () => null,
});
