import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero, SectionTitle, CtaBand } from "@/components/dhg/page-elements";
import { unitImages } from "@/lib/dhg-media";
import { units, type UnitKey } from "@/lib/dhg";
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
const unitKeys: UnitKey[] = ["carapicuiba", "osasco-jardim-dabril", "osasco-jardim-conceicao"];
function UnidadesPage() {
  return (
    <>
      <PageHero
        eyebrow="Presença local"
        title="Uma DHG perto de você."
        text="Três unidades físicas para atender pessoas e empresas em Carapicuíba e Osasco."
        image={unitImages.carapicuiba}
      />
      <section className="bg-brand-soft py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionTitle
            eyebrow="Nossas unidades"
            title="Três endereços. A mesma forma de atender."
            text="Escolha a unidade mais conveniente para consultar endereço, contatos e rota."
          />
          <div className="mt-12 space-y-8">
            {unitKeys.map((key, index) => {
              const unit = units[key];
              return (
                <article
                  key={key}
                  className={`grid overflow-hidden bg-background lg:grid-cols-2 ${index % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}
                >
                  <img
                    src={unitImages[key]}
                    alt={`Fachada real da unidade DHG ${unit.area}`}
                    className="aspect-[4/3] h-full w-full object-cover"
                    width="1448"
                    height="1086"
                    loading="lazy"
                  />
                  <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
                    <p className="eyebrow text-primary">{unit.city}</p>
                    <h2 className="mt-3 text-3xl font-semibold text-brand-deep">{unit.area}</h2>
                    <address className="mt-5 not-italic text-base leading-7 text-muted-foreground">
                      {unit.address}
                      <br />
                      {unit.zip}
                    </address>
                    <Link
                      to={`/unidades/${key}` as "/unidades/carapicuiba"}
                      className="mt-8 inline-flex items-center gap-2 font-semibold text-primary"
                    >
                      Conhecer esta unidade <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
