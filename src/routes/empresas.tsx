import { createFileRoute } from "@tanstack/react-router";
import {
  PageHero,
  SectionTitle,
  CtaBand,
  StatsBar,
} from "@/components/dhg/page-elements";

const items = [
  "Gestão de documentos e vencimentos",
  "Preparação de documentos e requerimentos",
  "Protocolização e acompanhamento de processos",
  "Regularizações, alvarás e licenças",
  "Laudos, perícias, vistorias e avaliações",
  "Certificações, registros e cadastros",
];

const empresaStats = [
  { value: "+5.000", label: "atendimentos realizados" },
  { value: "3", label: "unidades em Carapicuíba e Osasco" },
  { value: "Desde 2021", label: "assessoria documental para empresas" },
];

export const Route = createFileRoute("/empresas")({
  head: () => ({
    meta: [
      { title: "Assessoria Documental para Empresas | DHG" },
      {
        name: "description",
        content:
          "Gestão documental, regularizações, controle de vencimentos e acompanhamento de processos para empresas.",
      },
      { property: "og:title", content: "Soluções para Empresas | DHG" },
      {
        property: "og:description",
        content: "Assessoria documental profissional para rotinas empresariais.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EmpresasPage,
});

function EmpresasPage() {
  return (
    <>
      <PageHero
        eyebrow="Soluções para empresas"
        title="Organização documental para sua operação avançar."
        text="Acompanhamento profissional para empresas que precisam de clareza, organização e continuidade em seus processos."
        compact
      />
      <section className="bg-background py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <StatsBar stats={empresaStats} />
        </div>
      </section>
      <section className="bg-brand-soft py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <SectionTitle
            eyebrow="Atuação B2B"
            title="Assessoria que acompanha o ritmo da empresa"
            text="A DHG organiza demandas recorrentes, documentos, vencimentos e protocolos para que a equipe da empresa tenha clareza sobre o que está em andamento e o que exige providência."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {items.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-lg bg-background p-5"
              >
                <span className="mt-1 size-2 shrink-0 rounded-full bg-brand-blue" />
                <span className="text-base font-semibold text-brand-deep">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-brand-deep py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="eyebrow text-primary-foreground/60">Como começamos</p>
          <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">
            Entendimento antes da execução
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              ["01", "Contexto", "A equipe entende as necessidades documentais apresentadas."],
              ["02", "Orientação", "Os próximos passos e documentos são organizados de acordo com o processo."],
              ["03", "Acompanhamento", "A DHG conduz e acompanha as etapas aplicáveis."],
            ].map(([n, t, d]) => (
              <div
                key={n}
                className="rounded-lg border border-primary-foreground/15 bg-brand-deep/60 px-7 py-8"
              >
                <span className="text-sm text-primary-foreground/50">{n}</span>
                <h3 className="mt-5 text-xl font-semibold">{t}</h3>
                <p className="mt-3 text-base leading-7 text-primary-foreground/70">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand
        title="Sua empresa precisa organizar uma demanda documental?"
        text="Converse com a equipe e apresente a sua necessidade."
      />
    </>
  );
}