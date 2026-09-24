import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero, SectionTitle, CtaBand } from "@/components/dhg/page-elements";
import vehicleImage from "@/assets/dhg-veiculo.jpg";
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
const categories = [
  [
    "Documentação Veicular",
    "Emplacamento, atualizações, segunda via e outros processos documentais.",
    "/servicos/documentacao-veicular",
  ],
  [
    "Transferência de Veículo",
    "Orientação para transferências de propriedade, município ou estado.",
    "/servicos/transferencia-de-veiculo",
  ],
  [
    "Licenciamento",
    "Suporte para licenciamento anual e pendências relacionadas.",
    "/servicos/licenciamento",
  ],
  [
    "Débitos e Regularizações",
    "Apoio para débitos, taxas e regularização documental.",
    "/servicos/debitos-e-regularizacoes",
  ],
  ["CNH", "Renovação, segunda via e documentação relacionada.", "/servicos/cnh"],
  [
    "Soluções para Empresas",
    "Gestão documental e acompanhamento especializado de processos.",
    "/empresas",
  ],
] as const;
function ServicosPage() {
  return (
    <>
      <PageHero
        eyebrow="Serviços"
        title="Soluções documentais para cada necessidade."
        text="Atendimento para pessoas e empresas, com orientação clara e acompanhamento de processos."
        image={vehicleImage}
      />
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionTitle
            eyebrow="Catálogo de serviços"
            title="Encontre o atendimento que procura"
            text="Conheça as áreas atendidas pela DHG e acesse os detalhes do serviço relacionado à sua necessidade."
          />
          <div className="mt-14 grid gap-8">
            {categories.map(([title, text, to]) => (
              <Link
                key={to}
                to={to}
                className="group grid gap-4 py-3 md:grid-cols-[1fr_1fr_auto] md:items-center"
              >
                <h2 className="text-xl font-semibold text-brand-deep">{title}</h2>
                <p className="text-sm leading-6 text-muted-foreground">{text}</p>
                <ArrowRight className="size-5 text-primary transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
