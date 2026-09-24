import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CtaBand, SectionTitle } from "@/components/dhg/page-elements";
import vehicleImage from "@/assets/dhg-veiculo.jpg";
import { mainWhatsapp } from "@/lib/dhg";
import { unitImages } from "@/lib/dhg-media";
import { WhatsAppIcon } from "@/components/dhg/whatsapp-icon";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "DHG Despachante | Assessoria em Carapicuíba e Osasco" },
    { name: "description", content: "Há mais de uma década, a DHG presta assessoria documental para pessoas e empresas em Carapicuíba e Osasco." },
    { property: "og:title", content: "DHG Despachante e Assessoria" },
    { property: "og:description", content: "Documentação resolvida. Sem complicação." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ], scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "ProfessionalService", name: "DHG Despachante e Assessoria", foundingDate: "2012", areaServed: ["Carapicuíba", "Osasco"], description: "Assessoria documental para pessoas e empresas." }) }] }),
  component: HomePage,
});

function HomePage() {
  return <>
    <section className="relative min-h-[680px] overflow-hidden bg-brand-deep text-primary-foreground lg:min-h-[760px]">
      <img src={unitImages.carapicuiba} alt="Fachada real da unidade DHG em Carapicuíba" className="absolute inset-0 h-full w-full object-cover object-center" width="1448" height="1086" fetchPriority="high" />
      <div className="home-hero-overlay absolute inset-0" />
      <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-end px-5 pb-20 pt-24 lg:min-h-[760px] lg:px-8 lg:pb-24">
        <div className="max-w-3xl reveal-in"><p className="eyebrow text-primary-foreground/75">Assessoria documental desde 2012</p><h1 className="mt-5 max-w-2xl text-5xl font-semibold leading-[1.01] sm:text-6xl lg:text-7xl">Documentação resolvida.<br />Sem complicação.</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-primary-foreground/85">Há mais de uma década, a DHG presta assessoria documental para pessoas e empresas, cuidando dos processos para você ganhar tempo e tranquilidade.</p><div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button asChild size="lg" className="h-12 bg-whatsapp px-6 text-primary-foreground shadow-none hover:bg-whatsapp/90"><a href={mainWhatsapp} target="_blank" rel="noreferrer"><WhatsAppIcon /> Falar com a DHG</a></Button><Button asChild size="lg" variant="outline" className="h-12 border-primary-foreground/45 bg-transparent px-6 text-primary-foreground shadow-none hover:bg-primary-foreground/10 hover:text-primary-foreground"><Link to="/sobre">Conhecer a DHG</Link></Button></div></div>
      </div>
    </section>

    <section className="bg-brand-blue py-5 text-primary-foreground"><div className="mx-auto max-w-7xl px-5 lg:px-8"><p className="text-sm font-semibold">Desde 2012 <span className="px-2 text-primary-foreground/45">·</span> 3 unidades <span className="px-2 text-primary-foreground/45">·</span> Pessoa Física e Jurídica</p></div></section>

    <section className="bg-brand-soft py-20 sm:py-24"><div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:px-8"><div className="relative"><img src={unitImages["osasco-jardim-dabril"]} alt="Fachada real da unidade DHG no Jardim D'Abril" className="aspect-[4/3] w-full object-cover" width="1448" height="1086" loading="lazy" /><span className="absolute bottom-0 left-0 bg-brand-deep px-7 py-4 text-sm font-semibold text-primary-foreground">Presença local desde 2012</span></div><div className="lg:pb-8 lg:pl-10"><SectionTitle eyebrow="Sobre a DHG" title="Mais do que despachante. Assessoria para resolver." text="A DHG nasceu para facilitar processos documentais. Hoje, combina experiência operacional, atendimento próximo e orientação transparente para pessoas e empresas." /><Link to="/sobre" className="editorial-link mt-8 inline-flex items-center text-sm font-semibold text-primary hover:translate-x-1">Conheça nossa história</Link></div></div></section>

    <section className="bg-background py-20 sm:py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionTitle eyebrow="Serviços" title="Soluções para cada necessidade" text="Uma estrutura de atendimento preparada para diferentes momentos da vida documental." /><div className="mt-12 grid gap-10">{[
      ["Documentação Veicular", "Emplacamento, transferências, licenciamento e atualizações.", "/servicos/documentacao-veicular"],
      ["Débitos e Regularizações", "Orientação para pendências, taxas e regularização.", "/servicos/debitos-e-regularizacoes"],
      ["CNH e Documentação", "Renovação, segunda via e serviços relacionados.", "/servicos/cnh"],
      ["Soluções para Empresas", "Gestão documental e acompanhamento de processos.", "/empresas"],
    ].map(([title, text, to]) => <Link key={title} to={to as "/empresas"} className="group grid gap-4 transition-colors hover:bg-brand-soft sm:grid-cols-[1fr_1fr_auto] sm:items-center sm:px-5"><h3 className="text-xl font-semibold text-brand-deep sm:text-2xl">{title}</h3><p className="text-base leading-7 text-muted-foreground">{text}</p><span className="inline-flex items-center text-sm font-semibold text-primary">Explorar serviço</span></Link>)}</div><Button asChild variant="outline" className="mt-9 h-11 border-brand-deep/20 text-brand-deep"><Link to="/servicos">Ver todos os serviços</Link></Button></div></section>

    <section className="grid lg:grid-cols-2"><div className="min-h-[460px]"><img src={vehicleImage} alt="Assessoria para documentação veicular" className="h-full w-full object-cover" width="1536" height="1024" loading="lazy" /></div><div className="bg-brand-deep px-5 py-16 text-primary-foreground sm:px-12 lg:flex lg:flex-col lg:justify-center lg:px-16"><p className="eyebrow text-primary-foreground/60">Para pessoas</p><h2 className="mt-4 text-4xl font-semibold">Seu veículo. Sua tranquilidade.</h2><p className="mt-6 max-w-xl leading-7 text-primary-foreground/70">Conte com orientação para documentação, transferências, licenciamento, pendências e serviços relacionados à CNH.</p><Button asChild className="mt-8 w-fit bg-whatsapp text-primary-foreground hover:bg-whatsapp/90"><a href={mainWhatsapp} target="_blank" rel="noreferrer"><WhatsAppIcon /> Falar sobre meu veículo</a></Button></div></section>

    <section className="bg-brand-mid py-20 text-primary-foreground sm:py-24"><div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:px-8"><div><p className="eyebrow text-primary-foreground/65">Para empresas</p><h2 className="mt-4 max-w-xl text-4xl font-semibold leading-[1.08] sm:text-5xl">Assessoria documental para empresas</h2><p className="mt-6 max-w-xl text-lg leading-8 text-primary-foreground/75">Suporte profissional para rotinas que exigem organização, acompanhamento e clareza.</p></div><div><div className="grid grid-cols-2 border-t border-primary-foreground/25">{["Gestão documental", "Processos", "Regularizações", "Documentação veicular", "Controle de vencimentos", "Protocolização"].map((item) => <div key={item} className="border-b border-primary-foreground/25 py-5 text-base font-semibold odd:pr-5 even:border-l even:pl-5">{item}</div>)}</div><Link to="/empresas" className="editorial-link mt-8 inline-flex items-center font-semibold text-primary-foreground hover:translate-x-1">Conhecer soluções para empresas</Link></div></div></section>

    <section className="py-20 sm:py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><SectionTitle eyebrow="Presença local" title="Três unidades. Uma mesma experiência." text="Estrutura física em Carapicuíba e Osasco, com atendimento próximo para pessoas e empresas." /><Link to="/unidades" className="inline-flex items-center text-sm font-semibold text-primary">Ver todas as unidades</Link></div><div className="mt-12 grid gap-5 lg:grid-cols-[1.25fr_0.75fr] lg:grid-rows-2">{[
      ["carapicuiba", "Carapicuíba", "Parque Santa Teresa", unitImages.carapicuiba],
      ["osasco-jardim-dabril", "Osasco", "Jardim D'Abril", unitImages["osasco-jardim-dabril"]],
      ["osasco-jardim-conceicao", "Osasco", "Jardim Conceição", unitImages["osasco-jardim-conceicao"]],
    ].map(([slug, city, area, image], index) => <Link key={slug} to={`/unidades/${slug}` as "/unidades/carapicuiba"} className={`group relative min-h-[290px] overflow-hidden bg-brand-deep ${index === 0 ? "lg:row-span-2 lg:min-h-[620px]" : ""}`}><img src={image} alt={`Fachada real da unidade DHG ${area}`} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" width="1448" height="1086" loading="lazy" /><div className="absolute inset-0 bg-brand-overlay" /><div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground sm:p-8"><p className="eyebrow text-primary-foreground/70">{city}</p><h3 className="mt-2 text-2xl font-semibold">{area}</h3></div></Link>)}</div></div></section>

    <section className="bg-brand-deep py-16 text-primary-foreground"><div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8"><div><p className="eyebrow text-primary-foreground/60">Avaliações no Google</p><h2 className="mt-4 text-3xl font-semibold">Confiança construída no atendimento.</h2></div><div className="grid gap-6 sm:grid-cols-3">{["Carapicuíba", "Osasco · Conceição", "Osasco · Jd. D'Abril"].map((name) => <div key={name} className="border-l border-primary-foreground/25 pl-5"><span className="text-xl text-primary-foreground" aria-label="5 estrelas">★★★★★</span><p className="mt-3 font-semibold">Avaliação 5,0</p><p className="mt-1 text-xs text-primary-foreground/60">{name}</p></div>)}</div></div></section>

    <section className="py-20 sm:py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><SectionTitle eyebrow="Conteúdos" title="Informação para decidir com clareza" text="Orientações gerais sobre processos documentais para pessoas e empresas." /><Link to="/conteudos" className="inline-flex items-center text-sm font-semibold text-primary">Ver todos os conteúdos</Link></div><div className="mt-12 grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:grid-rows-2">{["Transferência de veículo: entenda o processo", "Licenciamento: o que observar", "Organização documental para empresas"].map((title, index) => <article key={title} className={`group bg-brand-soft p-7 sm:p-9 ${index === 0 ? "md:row-span-2 md:flex md:flex-col md:justify-end" : ""}`}><span className="text-sm font-bold text-primary">0{index + 1}</span><h3 className={`mt-8 font-semibold leading-tight text-brand-deep ${index === 0 ? "text-3xl sm:text-4xl" : "text-xl"}`}>{title}</h3><Link to="/conteudos" className="mt-7 inline-flex items-center text-sm font-semibold text-primary">Ler conteúdo</Link></article>)}</div></div></section>
    <CtaBand />
  </>;
}
