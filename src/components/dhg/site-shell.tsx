import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Lock } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { dhgLogos } from "@/lib/dhg-media";
import { mainWhatsapp } from "@/lib/dhg";
import { WhatsAppIcon } from "@/components/dhg/whatsapp-icon";

const nav = [
  ["Início", "/"],
  ["A DHG", "/sobre"],
  ["Serviços", "/servicos"],
  ["Empresas", "/empresas"],
  ["Unidades", "/unidades"],
  ["Conteúdos", "/conteudos"],
  ["Contato", "/contato"],
] as const;

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className="flex h-14 w-32 items-center sm:h-16 sm:w-36">
      <img
        src={inverse ? dhgLogos.white : dhgLogos.blue}
        alt="DHG Despachante"
        className="h-full w-full object-contain"
        width="1753"
        height="897"
      />
    </span>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  useEffect(() => setOpen(false), [pathname]);
  if (pathname.startsWith("/interno") || pathname === "/login") return <>{children}</>;
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-primary-foreground/10 bg-brand-deep text-primary-foreground">
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link to="/" aria-label="DHG Despachante — início">
            <Logo inverse />
          </Link>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
            {nav.map(([label, to]) => (
              <Link
                key={to}
                to={to}
                className="text-[0.82rem] font-semibold text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                activeProps={{ className: "text-primary-foreground" }}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button
              asChild
              className="hidden h-11 bg-primary-foreground px-5 text-brand-deep shadow-none hover:bg-primary-foreground/90 md:inline-flex"
            >
              <a href={mainWhatsapp} target="_blank" rel="noreferrer">
                <WhatsAppIcon /> Falar com a DHG
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground lg:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
            >
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {open && (
          <nav
            className="border-t border-primary-foreground/10 bg-brand-deep px-5 py-5 lg:hidden"
            aria-label="Navegação móvel"
          >
            <div className="mx-auto grid max-w-7xl">
              {nav.map(([label, to]) => (
                <Link
                  key={to}
                  to={to}
                  className="border-b border-primary-foreground/10 py-3 text-sm font-semibold text-primary-foreground/75"
                >
                  {label}
                </Link>
              ))}
              <Button
                asChild
                className="mt-5 h-12 bg-whatsapp text-primary-foreground hover:bg-whatsapp/90"
              >
                <a href={mainWhatsapp} target="_blank" rel="noreferrer">
                  <WhatsAppIcon /> Falar com a DHG
                </a>
              </Button>
            </div>
          </nav>
        )}
      </header>
      <main>{children}</main>
      <footer className="bg-brand-deep py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 border-b border-primary-foreground/15 pb-14 md:grid-cols-[1.35fr_0.75fr_1fr_1fr]">
            <div>
              <Logo inverse />
              <p className="mt-6 max-w-sm text-base leading-7 text-primary-foreground/65">
                Assessoria documental para veículos, pessoas e empresas, com três unidades em
                Carapicuíba e Osasco.
              </p>
              <a
                href={mainWhatsapp}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground"
              >
                <WhatsAppIcon className="size-4" /> Falar com a DHG
              </a>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Institucional</h3>
              <div className="mt-4 grid gap-2 text-sm text-primary-foreground/60">
                <Link to="/sobre">A DHG</Link>
                <Link to="/empresas">Empresas</Link>
                <Link to="/conteudos">Conteúdos</Link>
                <Link to="/contato">Contato</Link>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Serviços</h3>
              <div className="mt-4 grid gap-2 text-sm text-primary-foreground/60">
                <Link to="/servicos/documentacao-veicular">Documentação veicular</Link>
                <Link to="/servicos/transferencia-de-veiculo">Transferência</Link>
                <Link to="/servicos/licenciamento">Licenciamento</Link>
                <Link to="/servicos/debitos-e-regularizacoes">Débitos e Regularizações</Link>
                <Link to="/servicos/cnh">CNH</Link>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Unidades</h3>
              <div className="mt-4 grid gap-2 text-sm text-primary-foreground/60">
                <Link to="/unidades/carapicuiba">Carapicuíba</Link>
                <Link to="/unidades/osasco-jardim-dabril">Osasco — Jd. D'Abril</Link>
                <Link to="/unidades/osasco-jardim-conceicao">Osasco — Conceição</Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 pt-6 text-xs text-primary-foreground/45 sm:flex-row">
            <span>© 2026 DHG Despachante e Assessoria — CNPJ 16.514.708/0001-09 · Todos os direitos reservados</span>
            <div className="flex gap-5">
              <span>Desde 2012</span>
              <Link to="/contato">Política de Privacidade</Link>
              <Link to="/login" className="inline-flex items-center gap-1 hover:text-primary-foreground/70">
                <Lock className="size-3" /> Área Restrita
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <Button
        asChild
        size="icon"
        className="fixed bottom-5 right-5 z-40 size-14 bg-whatsapp text-primary-foreground hover:bg-whatsapp/90 md:hidden"
      >
        <a
          href={mainWhatsapp}
          target="_blank"
          rel="noreferrer"
          aria-label="Falar com a DHG pelo WhatsApp"
        >
          <WhatsAppIcon className="size-6" />
        </a>
      </Button>
    </div>
  );
}
