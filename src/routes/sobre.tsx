import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero, SectionTitle, CtaBand } from "@/components/dhg/page-elements";
import { unitImages } from "@/lib/dhg-media";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a DHG | Experiência desde 2012" },
      {
        name: "description",
        content:
          "Conheça a trajetória da DHG e sua atuação em assessoria documental para pessoas e empresas desde 2012.",
      },
      { property: "og:title", content: "Sobre a DHG Despachante" },
      {
        property: "og:description",
        content: "Experiência, atendimento e transparência em assessoria documental.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SobrePage,
});

function SobrePage() {
  return (
    <>
      <PageHero
        eyebrow="A DHG"
        title="Experiência para tornar processos mais simples."
        text="Desde 2012, a DHG atua com assessoria documental para pessoas e empresas em Carapicuíba e Osasco."
        image={unitImages["osasco-jardim-dabril"]}
      />
      <section className="bg-brand-soft py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <div className="relative">
            <img
              src={unitImages.carapicuiba}
              alt="Fachada real da unidade DHG em Carapicuíba"
              className="aspect-[4/3] w-full object-cover"
              width="1448"
              height="1086"
              loading="lazy"
            />
            <span className="absolute bottom-0 left-0 bg-brand-deep px-7 py-4 text-sm font-semibold text-primary-foreground">
              Desde 2012
            </span>
          </div>
          <div className="flex flex-col justify-center">
            <SectionTitle
              eyebrow="Nossa história"
              title="Uma trajetória construída para facilitar processos."
            />
            <div className="mt-8 space-y-6 text-lg leading-8 text-muted-foreground">
              <p>
                A DHG nasceu com um propósito claro: facilitar a vida de quem
                precisa lidar com documentação, veículos e processos junto a
                órgãos públicos.
              </p>
              <p>
                Ao longo de mais de uma década, a empresa desenvolveu experiência
                operacional para entender cada necessidade, orientar sobre as
                etapas e acompanhar processos com organização.
              </p>
              <p>
                Hoje, atende pessoas e empresas por meio de três unidades físicas,
                mantendo a proximidade no atendimento e a transparência nas
                informações.
              </p>
            </div>
            <Link
              to="/unidades"
              className="mt-10 inline-flex items-center gap-2 font-semibold text-primary"
            >
              Conheça nossas unidades <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-brand-deep py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="eyebrow text-primary-foreground/60">O que orienta nosso trabalho</p>
          <div className="mt-10 grid border-t border-primary-foreground/20 md:grid-cols-3">
            {[
              ["Atendimento", "Escuta atenta para compreender o que cada pessoa ou empresa precisa."],
              ["Transparência", "Informações claras sobre documentos, etapas e particularidades de cada processo."],
              ["Experiência", "Conhecimento construído na prática desde 2012."],
            ].map(([title, description]) => (
              <div
                key={title}
                className="border-b border-primary-foreground/20 py-10 md:border-r md:px-10 first:pl-0 last:border-r-0"
              >
                <h2 className="text-2xl font-semibold">{title}</h2>
                <p className="mt-4 text-base leading-7 text-primary-foreground/70">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="grid lg:grid-cols-2">
        <img
          src={unitImages["osasco-jardim-conceicao"]}
          alt="Fachada real da unidade DHG no Jardim Conceição"
          className="h-full min-h-[420px] w-full object-cover"
          width="1448"
          height="1086"
          loading="lazy"
        />
        <div className="flex items-center bg-background px-5 py-16 sm:px-12 lg:px-16">
          <div>
            <SectionTitle
              eyebrow="Presença local"
              title="Três unidades. Uma só forma de atender."
              text="A DHG está presente em Carapicuíba e Osasco, atendendo necessidades de pessoas e empresas."
            />
            <Link
              to="/unidades"
              className="mt-8 inline-flex shrink-0 items-center gap-2 font-semibold text-primary"
            >
              Conheça nossas unidades <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}