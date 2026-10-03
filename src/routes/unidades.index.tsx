import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { PageHero, SectionTitle, CtaBand } from "@/components/dhg/page-elements";
import { unitImages } from "@/lib/dhg-media";
import { units } from "@/lib/dhg";

export const Route = createFileRoute("/unidades/")({
  head: () => ({
    meta: [
      { title: "Unidades DHG | Carapicuíba e Osasco" },
      {
        name: "description",
        content:
          "Encontre as unidades DHG em Carapicuíba, Jardim D'Abril e Jardim Conceição, em Osasco.",
      },
      { property: "og:title", content: "Nossas Unidades | DHG" },
      {
        property: "og:description",
        content: "Três unidades para atender você em Carapicuíba e Osasco.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: UnidadesPage,
});

const unitKeys = ["carapicuiba", "osasco-jardim-dabril", "osasco-jardim-conceicao"] as const;

function UnidadesPage() {
  return (
    <>
      <PageHero
        eyebrow="Presença local"
        title="Uma DHG perto de você."
        text="Três unidades físicas para atender pessoas e empresas em Carapicuíba e Osasco."
        image={unitImages.carapicuiba}
      />
      <section className="bg-brand-soft py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionTitle
            eyebrow="Nossas unidades"
            title="Três endereços. A mesma forma de atender."
            text="Escolha a unidade mais conveniente para consultar endereço, contatos e rota."
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {unitKeys.map((key) => {
              const unit = units[key];
              return (
                <div
                  key={key}
                  data-motion-card
                  className="interactive-card group flex flex-col overflow-hidden rounded-lg bg-background"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={unitImages[key]}
                      alt={`Fachada real da unidade DHG ${unit.area}`}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      width="1448"
                      height="1086"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-brand-overlay" />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <p className="eyebrow text-primary">{unit.city}</p>
                    <h2 className="mt-2 text-xl font-semibold text-brand-deep">{unit.area}</h2>
                    <address className="mt-4 flex-1 not-italic text-sm leading-6 text-muted-foreground">
                      {unit.address}
                      <br />
                      {unit.zip}
                    </address>
                    <div className="mt-6 space-y-3">
                      <a
                        href={`tel:+55${unit.phoneHref}`}
                        className="flex items-center gap-2 text-sm font-semibold text-brand-deep"
                      >
                        <Phone className="size-4 text-primary" />
                        {unit.phone}
                      </a>
                      <Link
                        to={`/unidades/${key}` as "/unidades/carapicuiba"}
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                      >
                        Ver unidade <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}