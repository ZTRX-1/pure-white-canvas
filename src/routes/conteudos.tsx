import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionTitle, CtaBand } from "@/components/dhg/page-elements";
import { PostCard } from "@/components/dhg/post-card";
import { posts } from "@/lib/dhg-posts";

export const Route = createFileRoute("/conteudos")({
  head: () => ({
    meta: [
      { title: "Conteúdos sobre Documentação | DHG" },
      {
        name: "description",
        content:
          "Informações gerais sobre documentação veicular, regularizações, CNH e gestão documental para empresas.",
      },
      { property: "og:title", content: "Conteúdos | DHG Despachante" },
      { property: "og:description", content: "Informação clara para pessoas e empresas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConteudosPage,
});

function ConteudosPage() {
  return (
    <>
      <PageHero
        eyebrow="Conteúdos"
        title="Informação para decidir com clareza."
        text="Orientações gerais para ajudar você a compreender processos documentais antes de falar com nossa equipe."
      />
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionTitle
            eyebrow="Leituras da DHG"
            title="Documentação explicada sem complicação"
            text="Os requisitos podem variar conforme cada caso. Para uma orientação específica, fale diretamente com a equipe."
          />
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => <PostCard key={post.title} post={post} />)}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}