import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/dhg-logo.png.asset.json";
import { mainWhatsapp } from "@/lib/dhg";

const nav = [
  ["A DHG", "/sobre"], ["Serviços", "/servicos"], ["Empresas", "/empresas"],
  ["Unidades", "/unidades"], ["Conteúdos", "/conteudos"], ["Contato", "/contato"],
] as const;

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return <span className={`flex h-12 w-28 items-center overflow-hidden ${inverse ? "bg-brand-deep" : "bg-brand-blue"}`}><img src={logoAsset.url} alt="DHG Despachante" className="h-full w-full object-contain" width="1906" height="825" /></span>;
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  useEffect(() => setOpen(false), [pathname]);
  return <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
    <header className="sticky top-0 z-50 border-b border-primary-foreground/10 bg-brand-deep text-primary-foreground">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" aria-label="DHG Despachante — início"><Logo inverse /></Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
          {nav.map(([label, to]) => <Link key={to} to={to} className="text-sm font-semibold text-primary-foreground/68 transition-colors hover:text-primary-foreground" activeProps={{ className: "text-primary-foreground" }}>{label}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild className="hidden h-11 bg-primary-foreground px-5 text-brand-deep shadow-none hover:bg-primary-foreground/90 md:inline-flex"><a href={mainWhatsapp} target="_blank" rel="noreferrer"><MessageCircle /> Falar com um especialista</a></Button>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground lg:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? "Fechar menu" : "Abrir menu"}>{open ? <X /> : <Menu />}</Button>
        </div>
      </div>
      {open && <nav className="border-t border-primary-foreground/10 bg-brand-deep px-5 py-5 lg:hidden" aria-label="Navegação móvel"><div className="mx-auto grid max-w-7xl">{nav.map(([label, to]) => <Link key={to} to={to} className="border-b border-primary-foreground/10 py-3 text-sm font-semibold text-primary-foreground/75">{label}</Link>)}<Button asChild className="mt-5 h-12 bg-whatsapp text-primary-foreground hover:bg-whatsapp/90"><a href={mainWhatsapp} target="_blank" rel="noreferrer"><MessageCircle /> Falar com um especialista</a></Button></div></nav>}
    </header>
    <main>{children}</main>
    <footer className="bg-brand-deep py-16 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 border-b border-primary-foreground/15 pb-12 md:grid-cols-[1.2fr_0.8fr_1fr_1fr]">
          <div><Logo inverse /><p className="mt-5 max-w-sm text-sm leading-6 text-primary-foreground/60">Assessoria documental para veículos, pessoas e empresas, com três unidades em Carapicuíba e Osasco.</p></div>
          <div><h2 className="text-sm font-semibold">Institucional</h2><div className="mt-4 grid gap-2 text-sm text-primary-foreground/60"><Link to="/sobre">A DHG</Link><Link to="/empresas">Empresas</Link><Link to="/conteudos">Conteúdos</Link><Link to="/contato">Contato</Link></div></div>
          <div><h2 className="text-sm font-semibold">Serviços</h2><div className="mt-4 grid gap-2 text-sm text-primary-foreground/60"><Link to="/servicos/documentacao-veicular">Documentação veicular</Link><Link to="/servicos/transferencia-de-veiculo">Transferência</Link><Link to="/servicos/licenciamento">Licenciamento</Link><Link to="/servicos/cnh">CNH</Link></div></div>
          <div><h2 className="text-sm font-semibold">Unidades</h2><div className="mt-4 grid gap-2 text-sm text-primary-foreground/60"><Link to="/unidades/carapicuiba">Carapicuíba</Link><Link to="/unidades/osasco-jardim-dabril">Osasco — Jd. D'Abril</Link><Link to="/unidades/osasco-jardim-conceicao">Osasco — Conceição</Link></div></div>
        </div>
        <div className="flex flex-col justify-between gap-4 pt-6 text-xs text-primary-foreground/45 sm:flex-row"><span>© 2026 DHG Despachante e Assessoria.</span><div className="flex gap-5"><span>Desde 2012</span><Link to="/contato">Política de Privacidade</Link></div></div>
      </div>
    </footer>
    <Button asChild size="icon" className="fixed bottom-5 right-5 z-40 size-14 rounded-full bg-whatsapp text-primary-foreground shadow-lg hover:bg-whatsapp/90 md:hidden"><a href={mainWhatsapp} target="_blank" rel="noreferrer" aria-label="Falar com a DHG pelo WhatsApp"><MessageCircle className="size-6" /></a></Button>
  </div>;
}
