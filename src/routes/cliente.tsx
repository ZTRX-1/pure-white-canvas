import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
export const Route = createFileRoute("/cliente")({
  head: () => ({
    meta: [
      { title: "Área do Cliente | DHG" },
      { name: "description", content: "Área do cliente DHG em preparação." },
      { property: "og:title", content: "Área do Cliente | DHG" },
      { property: "og:description", content: "Área digital em preparação." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ClientePage,
});
function ClientePage() {
  return (
    <section className="flex min-h-[60vh] items-center bg-brand-deep text-primary-foreground">
      <div className="mx-auto w-full max-w-7xl px-5 py-24 lg:px-8">
        <p className="eyebrow text-primary-foreground/60">Área digital</p>
        <h1 className="mt-5 max-w-2xl text-4xl font-semibold sm:text-5xl">
          Área do cliente em preparação.
        </h1>
        <p className="mt-6 max-w-xl leading-7 text-primary-foreground/70">
          A DHG está preparando este caminho para uma futura experiência digital. Nenhuma consulta
          está disponível por aqui neste momento.
        </p>
        <Button
          asChild
          variant="outline"
          className="mt-8 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
        >
          <Link to="/">
            <ArrowLeft /> Voltar ao início
          </Link>
        </Button>
      </div>
    </section>
  );
}
