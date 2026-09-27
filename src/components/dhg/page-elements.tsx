import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import vehicleImage from "@/assets/dhg-veiculo.jpg";
import {
  mainWhatsapp,
  mapUrl,
  services,
  units,
  whatsapp,
  type ServiceKey,
  type UnitKey,
} from "@/lib/dhg";
import { unitImages } from "@/lib/dhg-media";
import { WhatsAppIcon } from "@/components/dhg/whatsapp-icon";

export function PageHero({
  eyebrow,
  title,
  text,
  image = vehicleImage,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  text: string;
  image?: string;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <section className="bg-brand-deep text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-14">
          <div className="max-w-3xl reveal-in">
            <p className="eyebrow text-primary-foreground/70">{eyebrow}</p>
            <h1 className="mt-4 text-3xl font-semibold leading-[1.05] sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-primary-foreground/80 sm:text-lg sm:leading-8">
              {text}
            </p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="relative min-h-[500px] overflow-hidden bg-brand-deep text-primary-foreground lg:min-h-[620px]">
      <img
        src={image}
        alt="Atendimento profissional DHG"
        className="absolute inset-0 h-full w-full object-cover"
        width="1536"
        height="1024"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-brand-overlay" />
      <div className="relative mx-auto flex min-h-[500px] max-w-7xl items-end px-5 py-16 lg:min-h-[620px] lg:px-8 lg:py-24">
        <div className="max-w-3xl reveal-in">
          <p className="eyebrow text-primary-foreground/70">{eyebrow}</p>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.03] sm:text-5xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/80">{text}</p>
        </div>
      </div>
    </section>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow text-primary">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold leading-[1.12] text-brand-deep sm:text-5xl">
        {title}
      </h2>
      {text && <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">{text}</p>}
    </div>
  );
}

export function CtaBand({
  title = "Tem uma documentação para resolver?",
  text = "Fale com a DHG e explique o que você precisa.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-brand-blue py-16 text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 md:flex-row md:items-center lg:px-8">
        <div>
          <h2 className="text-3xl font-semibold">{title}</h2>
          <p className="mt-3 text-primary-foreground/75">{text}</p>
        </div>
        <Button
          asChild
          size="lg"
          className="h-12 bg-primary-foreground px-6 text-brand-deep shadow-none hover:bg-primary-foreground/90"
        >
          <a href={mainWhatsapp} target="_blank" rel="noreferrer">
            <WhatsAppIcon /> Falar com a DHG
          </a>
        </Button>
      </div>
    </section>
  );
}

export function ServiceDetail({ serviceKey }: { serviceKey: ServiceKey }) {
  const service = services[serviceKey];
  const ctaTitle =
    serviceKey === "cnh"
      ? "Precisa de ajuda com sua CNH?"
      : `Precisa de ajuda com ${service.title.toLowerCase()}?`;
  return (
    <>
      <PageHero eyebrow={service.eyebrow} title={service.title} text={service.summary} />
      <section className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <SectionTitle
            eyebrow="Atendimento especializado"
            title={`O que a DHG atende em ${service.title.toLowerCase()}`}
          />
          <div>
            <p className="text-lg leading-8 text-muted-foreground">{service.description}</p>
            <ul className="mt-10 border-t border-border">
              {service.items.map((item) => (
                <li
                  key={item}
                  className="border-b border-border py-5 text-base font-semibold text-brand-deep"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-7 text-sm leading-6 text-muted-foreground">{service.note}</p>
          </div>
        </div>
      </section>
      <CtaBand title={ctaTitle} />
    </>
  );
}

export function UnitSummary({ unitKey }: { unitKey: UnitKey }) {
  const unit = units[unitKey];
  return (
    <article className="group border-t border-border py-7">
      <div className="grid gap-5 md:grid-cols-[0.6fr_1fr_auto] md:items-center">
        <div>
          <p className="eyebrow text-primary">{unit.city}</p>
          <h3 className="mt-2 text-xl font-semibold text-brand-deep">{unit.area}</h3>
        </div>
        <address className="not-italic text-sm leading-6 text-muted-foreground">
          <span className="block">{unit.address}</span>
          <span>{unit.zip}</span>
        </address>
        <Link
          to={
            `/unidades/${unitKey}` as
              | "/unidades/carapicuiba"
              | "/unidades/osasco-jardim-dabril"
              | "/unidades/osasco-jardim-conceicao"
          }
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
        >
          Ver unidade <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}

export function UnitDetail({ unitKey }: { unitKey: UnitKey }) {
  const unit = units[unitKey];
  return (
    <>
      <PageHero
        eyebrow={`Unidade ${unit.city}`}
        title={unit.area}
        text={`Atendimento DHG em ${unit.city}, com orientação para pessoas e empresas.`}
        image={unitImages[unitKey]}
      />
      <section className="bg-brand-soft py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <SectionTitle
            eyebrow="Onde estamos"
            title={unit.name}
            text="Entre em contato antes de se deslocar para confirmar o atendimento adequado à sua necessidade."
          />
          <div className="border-y border-brand-deep/15">
            <div className="py-6">
              <span className="eyebrow text-primary">Endereço</span>
              <address className="mt-3 not-italic text-lg leading-8 text-brand-deep">
                {unit.address}
                <br />
                {unit.zip}
              </address>
            </div>
            <div className="border-t border-brand-deep/15 py-6">
              <span className="eyebrow text-primary">Contato</span>
              <a
                href={`tel:+55${unit.phoneHref}`}
                className="mt-3 flex items-center gap-2 text-lg font-semibold text-brand-deep"
              >
                <Phone className="size-5 text-primary" />
                {unit.phone}
              </a>
              {unit.secondary && (
                <a href="tel:+551142073543" className="mt-2 block text-muted-foreground">
                  {unit.secondary}
                </a>
              )}
            </div>
            <div className="flex flex-wrap gap-3 border-t border-brand-deep/15 py-6">
              <Button asChild className="bg-whatsapp text-primary-foreground hover:bg-whatsapp/90">
                <a
                  href={whatsapp(
                    unit.phoneHref,
                    `Olá, DHG! Gostaria de atendimento na unidade de ${unit.city} — ${unit.area}.`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  <WhatsAppIcon /> Falar com esta unidade
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={mapUrl(unit)} target="_blank" rel="noreferrer">
                  <MapPin /> Como chegar
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-brand-deep py-16 text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-[0.7fr_1.3fr] md:items-center lg:px-8">
          <div>
            <p className="text-xl" aria-label="5 estrelas">
              ★★★★★
            </p>
            <p className="mt-2 text-3xl font-semibold">{unit.rating} no Google</p>
          </div>
          <p className="max-w-xl text-lg leading-8 text-primary-foreground/70">
            Confiança construída no atendimento da unidade {unit.area}, em {unit.city}.
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

export function EditorialList({ children }: { children: ReactNode }) {
  return <div className="mt-12 border-t border-border">{children}</div>;
}

export function StatsBar({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <div className="grid border-t border-border md:grid-cols-3">
      {stats.map(({ value, label }) => (
        <div key={label} className="border-b border-border py-8 md:border-r md:px-8 first:pl-0 last:border-r-0">
          <span className="text-3xl font-semibold text-brand-deep">{value}</span>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{label}</p>
        </div>
      ))}
    </div>
  );
}