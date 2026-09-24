import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero, SectionTitle, CtaBand } from "@/components/dhg/page-elements";
import vehicleImage from "@/assets/dhg-veiculo.jpg";

const categories = [
  ["Documentação Veicular", "Emplacamento, atualizações, segunda via e outros processos documentais.", "/servicos/documentacao-veicular"],
  ["Transferência de Veículo", "Orientação para transferências de propriedade, município ou estado.", "/servicos/transferencia-de-veiculo"],
  ["Licenciamento", "Suporte para licenciamento anual e pendências relacionadas.", "/servicos/licenciamento"],
  ["Débitos e Regularizações", "Apoio para débitos, taxas e regularização documental.", "/servicos/debitos-e-regularizacoes"],
  ["CNH", "Renovação, segunda via e documentação relacionada.", "/servicos/cnh"],
  ["Soluções para Empresas", "Gestão documental e acompanhamento especializado de processos.", "/empresas"],
] as const;

export const Route = createFileRoute("/servicos/")({
  head: () => ({
    meta: [
      { title: "Serviços de Despachante | DHG" },
      {
        name: "description",
        content:
          "Conheça os serviços da DHG para documentação veicular, transferências, licenciamento, débitos, CNH e empresas.",
      },
      { property: "og:title", content: "Serviços | DHG Despachante" },
      {
        property: "og:description",
        content: "Assessoria documental para diferentes necessidades.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicosPage,
});

function ServicosPage() {
  return (
    <>
      <PageHero
        eyebrow="Serviços"
        title="Soluções documentais para cada necessidade."
        text="Atendimento para pessoas e empresas, com orientação clara e acompanhamento de processos."
        image={vehicleImage}
      />
      <section className="bg-brand-soft py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionTitle
            eyebrow="Catálogo de serviços"
            title="Encontre o atendimento que procura"
            text="Conheça as áreas atendidas pela DHG e acesse os detalhes do serviço relacionado à sua necessidade."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {categories.map(([title, text, to]) => (
              <Link
                key={to}
                to={to}
                className="group relative flex flex-col justify-between rounded-lg border border-border bg-background p-7 transition-shadow duration-300 hover:shadow-lg sm:min-h-[220px]"
              >
                <div>
                  <h2 className="text-lg font-semibold text-brand-deep">{title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-transform group-hover:translate-x-1">
                  Explorar serviço <ArrowRight className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}