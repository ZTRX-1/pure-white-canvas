import { createFileRoute } from '@tanstack/react-router';
import { LoginForm } from '@/components/dhg/login-form';
import { dhgLogos } from '@/lib/dhg-media';
export const Route = createFileRoute('/login')({
 head:()=>({meta:[{title:'Entrar | DHG'},{name:'description',content:'Acesso reservado à equipe DHG.'},{property:'og:title',content:'Entrar | DHG'},{property:'og:description',content:'Acesso reservado à equipe DHG.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'},{name:'robots',content:'noindex,nofollow'}]}),
 component:()=> <main className="grid min-h-screen place-items-center bg-brand-deep px-5 py-12"><div className="w-full max-w-md"><img src={dhgLogos.white} alt="DHG Despachante" className="mx-auto mb-8 h-20 w-auto"/><div className="border-t-4 border-primary bg-card p-7"><h1 className="mb-6 text-2xl font-bold text-foreground">Acesso à operação</h1><LoginForm/></div></div></main>
});
