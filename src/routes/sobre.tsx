import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { SectionTitle, CtaBand } from "@/components/dhg/page-elements";
import { mainWhatsapp, milestones, story, units } from "@/lib/dhg";
import { WhatsAppIcon } from "@/components/dhg/whatsapp-icon";
import vehicleImage from "@/assets/dhg-veiculo.jpg";
import atendimentoImage from "@/assets/dhg-atendimento.jpg";
import consultoriaImage from "@/assets/dhg-consultoria.jpg";

type LinkTarget =
  | { type: "route"; to: string }
  | { type: "anchor"; href: string }
  | { type: "external"; href: string };

const isAnchor = (t: LinkTarget): t is { type: "anchor"; href: string } =>
  t.type === "anchor";
const isExternal = (t: LinkTarget): t is { type: "external"; href: string } =>
  t.type === "external";

function CtaLink({
  target,
  children,
  className = "",
}: {
  target: LinkTarget;
  children: ReactNode;
  className?: string;
}) {
  const baseClasses = "inline-flex items-center gap-2 rounded-md bg-brand-deep px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-deep/85";
  const merged = `${baseClasses} ${className}`;
  if (isAnchor(target)) {
    return (
      <a href={target.href} className={merged}>
        {children}
      </a>
    );
  }
  if (isExternal(target)) {
    return (
      <a href={target.href} target="_blank" rel="noreferrer" className={merged}>
        {children}
      </a>
    );
  }
  return (
    <Link to={target.to as "/contato"} className={merged}>
      {children}
    </Link>
  );
}

function StoryHero() {
  return (
    <section className="relative min-h-[720px] overflow-hidden bg-brand-deep text-primary-foreground lg:min-h-[800px]">
      <img
        src={atendimentoImage}
        alt="Equipe DHG em atendimento"
        className="absolute inset-0 h-full w-full object-cover object-center"
        width="2048"
        height="1152"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-brand-overlay" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-transparent to-transparent" />
      <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-center px-5 pt-28 lg:min-h-[800px] lg:px-8 lg:pt-32">
        <div className="max-w-2xl reveal-in">
          <p className="eyebrow text-primary-foreground/75">A história por trás da DHG</p>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.02] sm:text-5xl lg:text-6xl">
            Documentação complicada? A DHG nasceu para resolver isso.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-primary-foreground/80">
            Em 2012, três profissionais uniram experiência para criar uma assessoria documental
            que elimina atritos e traz tranquilidade a quem lida com burocracia. Mais de uma
            década depois, a missão continua a mesma.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 bg-whatsapp px-6 text-primary-foreground shadow-none hover:bg-whatsapp/90"
            >
              <a href={mainWhatsapp} target="_blank" rel="noreferrer">
                <WhatsAppIcon /> Resolve pelo WhatsApp
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-primary-foreground/45 bg-transparent px-6 text-primary-foreground shadow-none hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <a href="#historia">Minha jornada</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function OriginStory() {
  return (
    <section id="historia" className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:px-8">
        <div className="reveal-in">
          <SectionTitle
            eyebrow="A origem"
            title="Por que criamos a DHG?"
            text="Tudo começou com uma pergunta simples: por que lidar com documentação precisa ser tão complicado?"
          />
          <div className="mt-10 space-y-6 text-lg leading-8 text-muted-foreground">
            <p>{story.origin.problem}</p>
            <p>{story.origin.solution}</p>
            <p>
              Hoje, com três unidades físicas em Carapicuíba e Osasco, a DHG atende pessoas e
              empresas com a mesma atenção de sempre: entender antes de agir, orientar antes de
              executar e acompanhar até a conclusão.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild className="bg-whatsapp text-primary-foreground hover:bg-whatsapp/90">
              <a href={mainWhatsapp} target="_blank" rel="noreferrer">
                <WhatsAppIcon /> Fale com a equipe agora
              </a>
            </Button>
            <Link
              to="/unidades"
              className="editorial-link inline-flex items-center gap-2 font-semibold text-brand-deep hover:translate-x-1"
            >
              Conheça nossas unidades <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
        <div className="relative reveal-in">
          <img
            src={consultoriaImage}
            alt="Consultoria documental DHG"
            className="aspect-[4/3] w-full object-cover"
            width="2048"
            height="1152"
            loading="lazy"
          />
          <span className="absolute bottom-0 left-0 bg-brand-deep px-7 py-4 text-sm font-semibold text-primary-foreground">
            Desde 2012
          </span>
        </div>
      </div>
    </section>
  );
}

const milestoneTargets: LinkTarget[] = [
  { type: "route", to: "/contato" },
  { type: "route", to: "/unidades/osasco-jardim-dabril" },
  { type: "route", to: "/servicos/documentacao-veicular" },
  { type: "route", to: "/unidades" },
  { type: "route", to: "/empresas" },
  { type: "anchor", href: "#contato-imediato" },
];

function StoryTimeline() {
  return (
    <section className="bg-brand-soft py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionTitle
          eyebrow="Nossa trajetória"
          title="A jornada em marcos"
          text="Cada fase da DHG foi construída para levar você mais perto da solução que precisa."
        />
        <div className="mt-16 flow-root">
          <div className="-my-12 divide-y divide-border/50">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="py-12">
                <div className="grid gap-8 md:grid-cols-[180px_1fr]">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-deep text-primary-foreground">
                        <Calendar className="size-5" />
                      </div>
                      <span className="mt-2 block h-full w-px bg-border" />
                    </div>
                    <div>
                      <span className="eyebrow text-primary">{milestone.label}</span>
                      <p className="mt-1 text-2xl font-semibold text-brand-deep">
                        {milestone.year}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-5">
                    <h3 className="text-2xl font-semibold text-brand-deep">
                      {milestone.title}
                    </h3>
                    <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                      {milestone.description}
                    </p>
                    <CtaLink target={milestoneTargets[index]!}>
                      {milestone.ctaLabel}
                      <ArrowRight className="size-4" />
                    </CtaLink>
                  </div>
                </div>
                {index < milestones.length - 1 && (
                  <div className="mt-8 border-t border-border/50 md:hidden" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkingMethod() {
  const steps = [
    {
      n: "01",
      title: "Entendemos seu caso",
      desc: "Explicamos brevemente o que você precisa e identificamos os próximos passos aplicáveis.",
      target: { type: "route" as const, to: "/contato" },
      cta: "Falar com a DHG",
    },
    {
      n: "02",
      title: "Orientação clara",
      desc: "Preparamos a documentação necessária e orientamos sobre cada etapa do processo.",
      target: { type: "route" as const, to: "/servicos" },
      cta: "Ver serviços",
    },
    {
      n: "03",
      title: "Acompanhamento até o fim",
      desc: "Conduzimos o processo, respondemos dúvidas e confirmamos a conclusão junto ao órgão competente.",
      target: { type: "external" as const, href: mainWhatsapp },
      cta: "WhatsApp direto",
    },
  ];

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionTitle
          eyebrow="Como trabalhamos"
          title="Três passos para resolver a sua documentação"
          text="Do primeiro contato à conclusão do processo, cada etapa é feita para você ter clareza e tranquilidade."
        />
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.n}
              className="flex flex-col rounded-lg border border-border bg-background p-8"
            >
              <span className="text-sm font-bold text-primary">{step.n}</span>
              <h3 className="mt-5 text-xl font-semibold text-brand-deep">{step.title}</h3>
              <p className="mt-4 flex-1 text-base leading-7 text-muted-foreground">{step.desc}</p>
              {isExternal(step.target) ? (
                <Button
                  asChild
                  variant="ghost"
                  className="mt-6 h-auto justify-start p-0 text-sm font-semibold text-primary hover:text-primary/80"
                >
                  <a href={step.target.href} target="_blank" rel="noreferrer">
                    {step.cta} <ArrowRight className="ml-1 size-4" />
                  </a>
                </Button>
              ) : (
                <Link
                  to={step.target.to as "/contato"}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:translate-x-1"
                >
                  {step.cta} <ArrowRight className="size-4" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValuesInAction() {
  const values = [
    {
      title: "Atendimento",
      desc: "Escuta ativa para entender seu caso antes de propor a solução. Porque cada processo é único.",
      cta: "Fale com a gente",
      target: { type: "route" as const, to: "/contato" },
    },
    {
      title: "Transparência",
      desc: "Documentos, etapas e prazos explicados sem rodeios. Você sabe exatamente o que está acontecendo.",
      cta: "Entenda os serviços",
      target: { type: "route" as const, to: "/servicos" },
    },
    {
      title: "Experiência",
      desc: "Mais de uma década de prática em documentos verícolas e empresariais. Conhecimento que evita erros.",
      cta: "Veja nossa trajetória",
      target: { type: "anchor" as const, href: "#historia" },
    },
  ];

  return (
    <section className="bg-brand-deep py-20 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="reveal-in">
          <p className="eyebrow text-primary-foreground/60">O que nos move</p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">
            Três valores. Um propósito só.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-lg border border-primary-foreground/15 bg-brand-deep/60 p-7 transition-transform duration-300 hover:translate-y-[-2px]"
            >
              <h3 className="text-xl font-semibold">{v.title}</h3>
              <p className="mt-4 text-base leading-7 text-primary-foreground/70">{v.desc}</p>
              {isAnchor(v.target) ? (
                <a
                  href={v.target.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground hover:translate-x-1"
                >
                  {v.cta}
                  <ArrowRight className="size-4" />
                </a>
              ) : isExternal(v.target) ? (
                <a
                  href={v.target.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground hover:translate-x-1"
                >
                  {v.cta}
                  <ArrowRight className="size-4" />
                </a>
              ) : (
                <Link
                  to={v.target.to as "/contato"}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground hover:translate-x-1"
                >
                  {v.cta}
                  <ArrowRight className="size-4" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  const ratings = [
    { unit: "Carapicuíba", area: "Parque Santa Teresa", phone: units.carapicuiba.phone, href: units.carapicuiba.phoneHref },
    { unit: "Osasco", area: "Jardim Conceição", phone: units["osasco-jardim-conceicao"].phone, href: units["osasco-jardim-conceicao"].phoneHref },
    { unit: "Osasco", area: "Jardim D'Abril", phone: units["osasco-jardim-dabril"].phone, href: units["osasco-jardim-dabril"].phoneHref },
  ];

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:px-8">
        <div className="reveal-in">
          <p className="eyebrow text-primary">Confiança construída no atendimento</p>
          <h2 className="mt-4 text-3xl font-semibold text-brand-deep sm:text-5xl">
            5,0 de avaliação média no Google.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            Mais de 500 clientes avaliaram a DHG com 5 estrelas. A confiança se constrói com cada
            processo resolvido e cada recomendação que recebemos.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild className="bg-whatsapp text-primary-foreground hover:bg-whatsapp/90">
              <a href={mainWhatsapp} target="_blank" rel="noreferrer">
                <WhatsAppIcon /> Faça parte dessa história
              </a>
            </Button>
            <Link
              to="/unidades"
              className="editorial-link inline-flex items-center gap-2 font-semibold text-brand-deep hover:translate-x-1"
            >
              Veja nossas unidades <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
        <div className="grid gap-4">
          {ratings.map((r) => (
            <div
              key={r.area}
              className="flex items-center justify-between rounded-lg border border-border bg-background p-5"
            >
              <div>
                <p className="text-xl text-primary" aria-label="5 estrelas">
                  ★★★★★
                </p>
                <p className="mt-1 font-semibold text-brand-deep">{r.phone}</p>
                <p className="text-sm text-muted-foreground">
                  {r.unit} — {r.area}
                </p>
              </div>
              <a
                href={`tel:+55${r.href}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-deep"
              >
                <Phone className="size-4 text-primary" /> Ligar
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section id="contato-imediato" className="relative py-20 sm:py-32">
      <div className="absolute inset-0 bg-brand-deep" />
      <img
        src={vehicleImage}
        alt="Atendimento DHG"
        className="absolute inset-0 h-full w-full object-cover"
        width="2048"
        height="1152"
      />
      <div className="absolute inset-0 bg-brand-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-deep/90 via-brand-deep/70 to-brand-deep/90" />
      <div className="relative mx-auto max-w-4xl px-5 text-center lg:px-8 reveal-in">
        <p className="eyebrow text-primary-foreground/60">Último passo</p>
        <h2 className="mt-4 text-3xl font-semibold text-primary-foreground sm:text-5xl">
          Sua documentação merece um atendimento que entende do assunto.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/75">
          Conte com a DHG para organizar documentos, veículos e processos. Explicamos tudo e
          acompanhamos cada etapa — para você ganhar tempo e tranquilidade.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            asChild
            size="lg"
            className="h-13 bg-whatsapp px-7 text-primary-foreground shadow-none hover:bg-whatsapp/90"
          >
            <a href={mainWhatsapp} target="_blank" rel="noreferrer">
              <WhatsAppIcon /> Resolver agora pelo WhatsApp
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-13 border-primary-foreground/45 bg-transparent px-7 text-primary-foreground shadow-none hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <Link to="/servicos">Ver serviços oferecidos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function SobrePage() {
  return (
    <>
      <StoryHero />
      <OriginStory />
      <StoryTimeline />
      <WorkingMethod />
      <ValuesInAction />
      <SocialProof />
      <FinalCta />
      <CtaBand />
    </>
  );
}
