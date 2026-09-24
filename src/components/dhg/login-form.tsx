import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Lock, Mail, ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { dhgLogos } from "@/lib/dhg-media";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError("Preencha e-mail e senha para continuar.");
      return;
    }
    setError("");
    console.log("Login attempt:", { email, password });
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5" noValidate>
      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          E-mail
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Senha
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {error && (
        <p className="text-center text-xs text-destructive" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" className="h-11 w-full text-sm" size="lg">
        Acessar painel
        <ArrowRight className="size-4" />
      </Button>

      <p className="px-4 text-center text-xs text-muted-foreground">
        Ao acessar, você concorda com os termos de uso e política de privacidade.
      </p>
    </form>
  );
}