import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/components/dhg/login-form";
import { dhgLogos } from "@/lib/dhg-media";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Login — DHG Despachante" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-brand-deep px-5 py-10">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 size-[500px] rounded-full bg-brand-blue/20 blur-[120px]" />
        <div className="absolute -bottom-40 -right-20 size-[420px] rounded-full bg-brand-mid/25 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(color-mix(in oklch,var(--brand-soft) 50%,transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in oklch,var(--brand-soft) 50%,transparent) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-4 text-center">
          <img
            src={dhgLogos.white}
            alt="DHG Despachante"
            className="h-14 w-auto"
            width="1753"
            height="897"
          />
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight text-primary-foreground">
              Painel DHG
            </h1>
            <p className="text-sm text-primary-foreground/60">
              Acesse sua conta para continuar
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/25 backdrop-blur-sm">
          <LoginForm />
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-primary-foreground/40">
          <Shield className="size-3" />
          <span>Seguro · Criptografado · DHG Despachante</span>
        </div>
      </div>
    </main>
  );
}