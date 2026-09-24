import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero, SectionTitle, CtaBand } from "@/components/dhg/page-elements";
import vehicleImage from "@/assets/dhg-veiculo.jpg";
import { unitImages } from "@/lib/dhg-media";

const posts = [
  {
    category: "Veículos",
    title: "Transferência de veículo: entenda como a orientação profissional ajuda",
    text: "Cada transferência possui características próprias. Saiba por que analisar a documentação antes de iniciar o processo.",
    to: "/servicos/transferencia-de-veiculo" as const,
    image: vehicleImage,
    alt: "Profissional prestando assessoria para documentação de veículo",
  },
  {
    category: "Regularidade",
    title: "Licenciamento: documentos e pendências merecem atenção",
    text: "Uma visão geral sobre a importância de verificar o contexto documental do veículo antes de conduzir o licenciamento.",
    to: "/servicos/licenciamento" as const,
    image: unitImages.carapicuiba,
    alt: "Fachada real da unidade DHG em Carapicuíba",
  },
  {
    category: "Empresas",
    title: "Organização documental também faz parte da operação",
    text: "Como o acompanhamento de documentos, vencimentos e protocolos contribui para rotinas empresariais mais organizadas.",
    to: "/empresas" as const,
    image: unitImages["osasco-jardim-conceicao"],
    alt: "Fachada real da unidade DHG no Jardim Conceição",
  },
];

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
            {posts.map((post, index) => (
              <article
                key={post.title}
                className="group flex flex-col overflow-hidden rounded-lg border border-border bg-background transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.alt}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    width="1448"
                    height="1086"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    {post.category}
                  </span>
                  <h2 className="mt-4 text-lg font-semibold leading-snug text-brand-deep">
                    {post.title}
                  </h2>
                  <p className="mt-4 flex-1 text-sm leading-6 text-muted-foreground">
                    {post.text}
                  </p>
                  <Link
                    to={post.to}
                    className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-transform group-hover:translate-x-1"
                  >
                    Ler mais <ArrowRight className="size-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}