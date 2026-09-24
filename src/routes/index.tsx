import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronDown,
  FileCheck2,
  Landmark,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import heroImage from "@/assets/dhg-atendimento.jpg";
import logoAsset from "@/assets/dhg-logo.png.asset.json";

const whatsapp = (phone: string, message: string) =>
  `https://wa.me/55${phone}?text=${encodeURIComponent(message)}`;

const mainWhatsapp = whatsapp(
  "11947836048",
  "Olá, DHG! Gostaria de informações sobre um serviço de documentação.",
);

const services = [
  {
    number: "01",
    title: "Documentação veicular",
    icon: FileCheck2,
    summary: "Emplacamento, transferências, licenciamento e atualizações.",
    items: [
      "Primeiro emplacamento",
      "Transferência de propriedade, estado ou município",
      "Licenciamento anual",
      "Segunda via do CRV e CRLV",
      "Alteração e atualização cadastral",
      "Bloqueio e desbloqueio de CRV",
      "Análise para compra e venda de veículos",
    ],
  },
  {
    number: "02",
    title: "Débitos e regularizações",
    icon: Landmark,
    summary: "Orientação para pendências, débitos, taxas e regularização.",
    items: [
      "Pagamento e parcelamento de débitos",
      "Débitos online",
      "Apuração de impostos, taxas e emolumentos",
      "Pedido de baixa de débitos",
      "Regularização documental",
      "Processos relacionados a pendências",
    ],
  },
  {
    number: "03",
    title: "CNH e documentação",
    icon: UserRound,
    summary: "Suporte para renovação, segunda via e documentação relacionada.",
    items: ["Renovação de CNH", "Segunda via da CNH", "Serviços documentais relacionados"],
  },
  {
    number: "04",
    title: "Assessoria para empresas",
    icon: BriefcaseBusiness,
    summary: "Gestão documental e acompanhamento especializado de processos.",
    items: [
      "Gestão de documentos e vencimentos",
      "Preparação de documentos e requerimentos",
      "Protocolização e acompanhamento de processos",
      "Regularizações, alvarás e licenças",
      "Laudos, perícias, vistorias e avaliações",
      "Certificações, registros e cadastros",
    ],
  },
];

const units = [
  {
    city: "Carapicuíba",
    name: "DHG Despachante Carapicuíba",
    address: "R. Itajubá, 81 — Parque Santa Teresa",
    zip: "Carapicuíba - SP, CEP 06341-160",
    phone: "(11) 94783-6048",
    phoneHref: "11947836048",
    secondary: "(11) 4207-3543",
  },
  {
    city: "Osasco · Jardim D'Abril",
    name: "DHG Despachante JD D'Abril Osasco",
    address: "Av. Prestes Maia, 817 — Jardim D'Abril",
    zip: "Osasco - SP, CEP 06040-014",
    phone: "(11) 93245-5781",
    phoneHref: "11932455781",
  },
  {
    city: "Osasco · Jardim Conceição",
    name: "DHG Despachante JD Conceição Osasco",
    address: "R. Pernambucana, 113 — Conceição",
    zip: "Osasco - SP, CEP 06140-040",
    phone: "(11) 97991-0132",
    phoneHref: "11979910132",
  },
];

const faqs = [
  ["Quais serviços um despachante pode realizar?", "A DHG atua com documentação veicular, débitos e regularizações, CNH e assessoria documental para empresas. Fale com a equipe para confirmar o atendimento ao seu caso."],
  ["Como funciona a transferência de um veículo?", "A equipe entende o seu caso, orienta sobre a documentação necessária e acompanha as etapas do processo. Os requisitos podem variar, por isso recomendamos falar diretamente com a DHG."],
  ["Quais documentos são necessários para transferir um veículo?", "A documentação depende das características de cada transferência. Entre em contato para receber uma orientação adequada ao seu caso."],
  ["A DHG atende em quais cidades?", "A DHG possui três unidades de atendimento: uma em Carapicuíba e duas em Osasco, nos bairros Jardim D'Abril e Conceição."],
  ["Posso falar com a DHG pelo WhatsApp?", "Sim. Você pode iniciar uma conversa pelos botões de WhatsApp desta página ou falar diretamente com uma das unidades."],
  ["A DHG atende empresas?", "Sim. A DHG oferece suporte documental e acompanhamento de processos para empresas."],
  ["É possível solicitar atendimento à distância?", "Entre em contato com a equipe para verificar as possibilidades de atendimento para a sua necessidade."],
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@graph": units.map((unit) => ({
    "@type": "ProfessionalService",
    name: unit.name,
    description: "Assessoria documental para veículos, pessoas e empresas.",
    telephone: `+55 ${unit.phone}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: unit.address.split(" — ")[0],
      addressLocality: unit.city.startsWith("Carapicuíba") ? "Carapicuíba" : "Osasco",
      addressRegion: "SP",
      postalCode: unit.zip.replace(/.*CEP /, ""),
      addressCountry: "BR",
    },
  })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DHG Despachante | Assessoria em Carapicuíba e Osasco" },
      { name: "description", content: "Assessoria documental para veículos, pessoas e empresas. Desde 2012, com três unidades em Carapicuíba e Osasco." },
      { property: "og:title", content: "DHG Despachante e Assessoria" },
      { property: "og:description", content: "Resolva sua documentação com quem entende do assunto." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className={`flex h-[46px] w-[106px] items-center overflow-hidden rounded-sm ${inverse ? "bg-brand-deep" : "bg-brand-blue"}`}>
      <img src={logoAsset.url} alt="DHG Despachante" className="h-full w-full object-contain" width="1906" height="825" />
    </span>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#inicio" aria-label="DHG Despachante — início"><Logo /></a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
            {[["Início", "inicio"], ["Sobre a DHG", "sobre"], ["Serviços", "servicos"], ["Para Empresas", "empresas"], ["Unidades", "unidades"], ["Conteúdos", "conteudos"]].map(([label, id]) => (
              <a key={id} href={`#${id}`} className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">{label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild className="hidden h-11 bg-whatsapp px-5 text-primary-foreground shadow-none hover:bg-whatsapp/90 md:inline-flex">
              <a href={mainWhatsapp} target="_blank" rel="noreferrer"><MessageCircle /> Falar no WhatsApp</a>
            </Button>
            <Button variant="outline" size="icon" className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}>
              {menuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {menuOpen && (
          <nav className="border-t border-border bg-background px-5 py-5 lg:hidden" aria-label="Navegação móvel">
            <div className="mx-auto grid max-w-7xl gap-1">
              {[["Início", "inicio"], ["Sobre a DHG", "sobre"], ["Serviços", "servicos"], ["Para Empresas", "empresas"], ["Unidades", "unidades"], ["Conteúdos", "conteudos"]].map(([label, id]) => (
                <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className="border-b border-border py-3 text-sm font-semibold">{label}</a>
              ))}
              <Button asChild className="mt-3 h-12 bg-whatsapp text-primary-foreground hover:bg-whatsapp/90"><a href={mainWhatsapp} target="_blank" rel="noreferrer"><MessageCircle /> Falar no WhatsApp</a></Button>
            </div>
          </nav>
        )}
      </header>

      <main>
        <section id="inicio" className="relative min-h-[700px] scroll-mt-24 overflow-hidden border-b border-border lg:min-h-[760px]">
          <img src={heroImage} alt="Atendimento profissional de assessoria documental DHG" className="absolute inset-0 h-full w-full object-cover object-[62%_center]" width="1536" height="1024" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/10" />
          <div className="relative mx-auto flex min-h-[700px] max-w-7xl items-center px-5 py-20 lg:min-h-[760px] lg:px-8">
            <div className="max-w-2xl">
              <div className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-primary"><span className="h-px w-10 bg-primary" />Desde 2012</div>
              <h1 className="max-w-xl text-4xl font-semibold leading-[1.08] text-brand-deep sm:text-5xl lg:text-6xl">Resolva sua documentação com quem entende do assunto.</h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">Assessoria documental para veículos, pessoas e empresas, com atendimento próximo em Carapicuíba e Osasco.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-13 bg-brand-blue px-6 text-primary-foreground shadow-none hover:bg-brand-deep"><a href={mainWhatsapp} target="_blank" rel="noreferrer"><MessageCircle /> Falar com a DHG pelo WhatsApp</a></Button>
                <Button asChild size="lg" variant="outline" className="h-13 border-brand-deep/20 bg-background/80 px-6 text-brand-deep shadow-none"><a href="#servicos">Conhecer nossos serviços <ArrowRight /></a></Button>
              </div>
              <div className="mt-12 grid max-w-xl grid-cols-3 border-y border-brand-deep/15 py-5">
                {[['Desde 2012', 'Experiência'], ['3 unidades', 'Atendimento local'], ['Pessoas e empresas', 'Soluções documentais']].map(([value, label], index) => (
                  <div key={value} className={`pr-3 ${index ? "border-l border-brand-deep/15 pl-4" : ""}`}><strong className="block text-sm text-brand-deep sm:text-base">{value}</strong><span className="mt-1 block text-[11px] text-muted-foreground sm:text-xs">{label}</span></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-brand-deep text-primary-foreground">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 lg:grid-cols-[1.2fr_2fr] lg:px-8 lg:py-14">
            <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground/60">Experiência que transmite segurança</p><h2 className="mt-3 text-2xl font-semibold sm:text-3xl">Experiência para resolver. Tranquilidade para você.</h2></div>
            <div className="grid grid-cols-2 gap-px bg-primary-foreground/15 sm:grid-cols-4">
              {[['2012', 'Atuação desde'], ['03', 'Unidades'], ['PF', 'Atendimento individual'], ['PJ', 'Soluções para empresas']].map(([value, label]) => <div key={value} className="bg-brand-deep px-5 py-4"><strong className="text-xl">{value}</strong><span className="mt-1 block text-xs text-primary-foreground/65">{label}</span></div>)}
            </div>
          </div>
        </section>

        <section id="servicos" className="scroll-mt-24 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-7 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Serviços</p><h2 className="mt-4 text-3xl font-semibold text-brand-deep sm:text-4xl">Encontre a solução que você precisa</h2></div>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground">Da documentação do seu veículo à gestão de processos para empresas, a DHG oferece assessoria para diferentes necessidades.</p>
            </div>
            <div className="mt-12 border-t border-border">
              {services.map((service) => {
                const Icon = service.icon;
                return <details key={service.number} className="group border-b border-border"><summary className="grid cursor-pointer list-none grid-cols-[44px_1fr_auto] items-center gap-4 py-6 sm:grid-cols-[70px_1fr_1fr_auto]"><span className="text-sm font-bold text-primary">{service.number}</span><span className="flex items-center gap-3 text-base font-bold text-brand-deep sm:text-lg"><Icon className="size-5" />{service.title}</span><span className="hidden text-sm text-muted-foreground sm:block">{service.summary}</span><ChevronDown className="size-5 text-primary transition-transform group-open:rotate-180" /></summary><div className="pb-7 pl-[60px] sm:pl-[86px]"><ul className="grid max-w-3xl gap-3 text-sm text-muted-foreground sm:grid-cols-2">{service.items.map((item) => <li key={item} className="flex items-start gap-2"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{item}</li>)}</ul></div></details>;
              })}
            </div>
            <Button asChild variant="outline" className="mt-8 h-11 border-brand-deep/20 text-brand-deep shadow-none"><a href={mainWhatsapp} target="_blank" rel="noreferrer">Ver todos os serviços <ArrowRight /></a></Button>
          </div>
        </section>

        <section className="border-y border-border bg-muted/40">
          <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
            <div className="px-5 py-16 lg:px-12 lg:py-20"><UserRound className="size-7 text-primary" /><p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-primary">Para pessoas</p><h2 className="mt-3 text-3xl font-semibold text-brand-deep">Para você, sem complicação.</h2><p className="mt-5 max-w-lg leading-7 text-muted-foreground">Conte com a DHG para cuidar dos processos documentais do seu veículo e ajudar você a resolver pendências com mais praticidade.</p><Button asChild variant="link" className="mt-6 h-auto p-0 text-primary"><a href={whatsapp("11947836048", "Olá, DHG! Preciso resolver uma documentação e gostaria de orientação.")} target="_blank" rel="noreferrer">Preciso resolver uma documentação <ArrowRight /></a></Button></div>
            <div id="empresas" className="scroll-mt-24 bg-brand-soft px-5 py-16 lg:px-12 lg:py-20"><Building2 className="size-7 text-primary" /><p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-primary">Para empresas</p><h2 className="mt-3 text-3xl font-semibold text-brand-deep">Assessoria documental para empresas</h2><p className="mt-5 max-w-lg leading-7 text-muted-foreground">A DHG também atua no suporte documental e acompanhamento de processos para empresas que precisam de organização, agilidade e acompanhamento especializado.</p><div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-brand-deep">{['Gestão documental', 'Controle de vencimentos', 'Regularizações', 'Protocolização'].map((item) => <span key={item} className="flex items-center gap-2"><Check className="size-4 text-primary" />{item}</span>)}</div><Button asChild className="mt-8 bg-brand-deep text-primary-foreground shadow-none hover:bg-brand-blue"><a href={whatsapp("11947836048", "Olá, DHG! Gostaria de informações sobre assessoria documental para empresas.")} target="_blank" rel="noreferrer">Falar com a equipe <ArrowRight /></a></Button></div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="max-w-xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Atendimento claro</p><h2 className="mt-4 text-3xl font-semibold text-brand-deep sm:text-4xl">Como funciona</h2></div><ol className="mt-12 grid gap-px bg-border md:grid-cols-5">{['Você entra em contato', 'Explica o que precisa resolver', 'A equipe orienta você', 'A DHG acompanha o processo', 'Você recebe as orientações'].map((step, index) => <li key={step} className="bg-background p-6"><span className="text-xs font-bold text-primary">0{index + 1}</span><p className="mt-8 text-sm font-semibold leading-6 text-brand-deep">{step}</p></li>)}</ol></div>
        </section>

        <section id="sobre" className="scroll-mt-24 bg-brand-deep py-20 text-primary-foreground sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.75fr_1.25fr] lg:px-8"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground/60">Sobre a DHG</p><h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Experiência que facilita o seu caminho.</h2></div><div className="max-w-2xl space-y-5 text-base leading-8 text-primary-foreground/75"><p>A DHG nasceu com um propósito simples: facilitar a vida das pessoas. Desde 2012, atua com assessoria documental para tornar processos envolvendo documentação, veículos e órgãos públicos mais simples para seus clientes.</p><p>Com equipe preparada e processos organizados, trabalha para oferecer atendimento transparente, segurança nas informações e acompanhamento das etapas de cada processo.</p><p>Hoje, a DHG atende pessoas e empresas por meio de suas unidades em Carapicuíba e Osasco.</p></div></div>
        </section>

        <section id="unidades" className="scroll-mt-24 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Presença local</p><h2 className="mt-4 text-3xl font-semibold text-brand-deep sm:text-4xl">Encontre a DHG mais perto de você</h2></div><p className="max-w-md text-sm leading-6 text-muted-foreground">Três unidades para atender você em Carapicuíba e Osasco.</p></div><div className="mt-12 grid gap-5 lg:grid-cols-3">{units.map((unit) => <article key={unit.name} className="flex min-h-[380px] flex-col border border-border bg-card p-7"><div className="flex size-10 items-center justify-center rounded-full bg-brand-soft text-primary"><MapPin className="size-5" /></div><p className="mt-7 text-xs font-bold uppercase tracking-[0.15em] text-primary">{unit.city}</p><h3 className="mt-3 text-xl font-semibold text-brand-deep">{unit.name}</h3><address className="mt-5 not-italic text-sm leading-6 text-muted-foreground"><span className="block">{unit.address}</span><span>{unit.zip}</span></address><div className="mt-5 space-y-1 text-sm"><a href={`tel:+55${unit.phoneHref}`} className="flex items-center gap-2 font-semibold text-brand-deep"><Phone className="size-4 text-primary" />{unit.phone}</a>{unit.secondary && <a href="tel:+551142073543" className="block pl-6 text-muted-foreground">{unit.secondary}</a>}</div><div className="mt-auto flex flex-wrap gap-3 pt-7"><Button asChild size="sm" className="bg-whatsapp text-primary-foreground shadow-none hover:bg-whatsapp/90"><a href={whatsapp(unit.phoneHref, `Olá, DHG! Gostaria de atendimento na unidade de ${unit.city}.`)} target="_blank" rel="noreferrer"><MessageCircle /> Falar com esta unidade</a></Button><Button asChild size="sm" variant="outline" className="shadow-none"><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${unit.address}, ${unit.zip}`)}`} target="_blank" rel="noreferrer"><MapPin /> Como chegar</a></Button></div></article>)}</div></div>
        </section>

        <section className="border-y border-border bg-muted/40 py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Avaliações no Google</p><h2 className="mt-4 text-3xl font-semibold text-brand-deep">Quem confia na DHG</h2><p className="mt-4 text-sm leading-6 text-muted-foreground">Avaliações públicas das unidades, conforme dados disponíveis.</p></div><div className="grid gap-3 sm:grid-cols-3">{[["Carapicuíba", "5,0", "12 avaliações"], ["Osasco · Conceição", "5,0", "12 avaliações"], ["Osasco · Jd. D'Abril", "5,0", "1 avaliação"]].map(([name, rating, count]) => <div key={name} className="border-l-2 border-primary bg-background p-5"><span className="text-2xl font-bold text-brand-deep">{rating}</span><span className="ml-2 text-sm text-primary" aria-label="5 estrelas">★★★★★</span><p className="mt-4 text-sm font-semibold text-brand-deep">{name}</p><p className="mt-1 text-xs text-muted-foreground">{count}</p></div>)}</div></div></div>
        </section>

        <section id="conteudos" className="scroll-mt-24 py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.7fr_1.3fr] lg:px-8"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Dúvidas frequentes</p><h2 className="mt-4 text-3xl font-semibold text-brand-deep sm:text-4xl">Informação clara para você decidir</h2><p className="mt-5 text-sm leading-6 text-muted-foreground">Para orientações específicas, fale com a equipe da DHG.</p></div><div className="border-t border-border">{faqs.map(([question, answer]) => <details key={question} className="group border-b border-border"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-semibold text-brand-deep"><span>{question}</span><ChevronDown className="size-5 shrink-0 text-primary transition-transform group-open:rotate-180" /></summary><p className="max-w-2xl pb-6 text-sm leading-7 text-muted-foreground">{answer}</p></details>)}</div></div>
        </section>

        <section className="bg-brand-blue py-16 text-primary-foreground sm:py-20">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 sm:flex-row sm:items-center lg:px-8"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground/65">Fale com a equipe</p><h2 className="mt-3 text-3xl font-semibold">Precisa resolver uma documentação?</h2><p className="mt-3 text-primary-foreground/75">Explique o que você precisa e fale com a equipe da DHG.</p></div><Button asChild size="lg" className="h-13 shrink-0 bg-background px-6 text-brand-deep shadow-none hover:bg-background/90"><a href={mainWhatsapp} target="_blank" rel="noreferrer"><MessageCircle /> Falar com a DHG pelo WhatsApp</a></Button></div>
        </section>
      </main>

      <footer className="bg-brand-deep py-14 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="grid gap-10 border-b border-primary-foreground/15 pb-12 md:grid-cols-[1.1fr_0.8fr_1.1fr]"><div><Logo inverse /><p className="mt-5 max-w-sm text-sm leading-6 text-primary-foreground/60">Assessoria documental para veículos, pessoas e empresas, com atendimento em Carapicuíba e Osasco.</p></div><div><h3 className="text-sm font-semibold">Navegação</h3><div className="mt-4 grid gap-2 text-sm text-primary-foreground/60">{[["Início", "inicio"], ["Sobre", "sobre"], ["Serviços", "servicos"], ["Para Empresas", "empresas"], ["Unidades", "unidades"]].map(([label, id]) => <a key={id} href={`#${id}`} className="hover:text-primary-foreground">{label}</a>)}</div></div><div><h3 className="text-sm font-semibold">Unidades</h3><div className="mt-4 grid gap-3 text-sm text-primary-foreground/60"><span>Carapicuíba — Parque Santa Teresa</span><span>Osasco — Jardim D'Abril</span><span>Osasco — Jardim Conceição</span></div></div></div><div className="flex flex-col justify-between gap-4 pt-6 text-xs text-primary-foreground/45 sm:flex-row"><span>© 2026 DHG Despachante e Assessoria.</span><span>Desde 2012, facilitando processos documentais.</span></div></div>
      </footer>

      <Button asChild size="icon" className="fixed bottom-5 right-5 z-40 size-14 rounded-full bg-whatsapp text-primary-foreground shadow-lg hover:bg-whatsapp/90 md:hidden"><a href={mainWhatsapp} target="_blank" rel="noreferrer" aria-label="Falar com a DHG pelo WhatsApp"><MessageCircle className="size-6" /></a></Button>
    </div>
  );
}
