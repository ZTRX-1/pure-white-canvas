import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function LoginForm() {
  const navigate = useNavigate();
  const [mode,setMode] = useState<'login'|'signup'|'reset'>('login');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [message,setMessage] = useState('');
  const [busy,setBusy] = useState(false);
  useEffect(()=>{void supabase.auth.getUser().then(({data})=>{if(data.user)void navigate({to:'/interno'});});},[navigate]);
  async function submit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();setBusy(true);setMessage('');
    try {
      if(mode==='reset') {const {error}=await supabase.auth.resetPasswordForEmail(email,{redirectTo:`${window.location.origin}/login`});if(error)throw error;setMessage('Se o e-mail estiver cadastrado, você receberá as instruções de recuperação.');}
      else if(mode==='signup') {const {error}=await supabase.auth.signUp({email,password,options:{emailRedirectTo:`${window.location.origin}/login`}});if(error)throw error;setMessage('Verifique seu e-mail e confirme o cadastro. O acesso à área interna depende de autorização.');}
      else {const {error}=await supabase.auth.signInWithPassword({email,password});if(error)throw error;await navigate({to:'/interno'});}
    } catch(error) {setMessage(error instanceof Error?error.message:'Não foi possível continuar.');}
    finally {setBusy(false);}
  }
  return <div className="space-y-5"><form className="space-y-5" onSubmit={submit}>
    <h2 className="text-lg font-semibold text-foreground">{mode==='login'?'Entrar':mode==='signup'?'Criar conta':'Recuperar senha'}</h2>
    <label className="grid gap-1 text-sm text-foreground">E-mail<Input type="email" required autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)}/></label>
    {mode!=='reset'&&<label className="grid gap-1 text-sm text-foreground">Senha<Input type="password" required minLength={8} autoComplete={mode==='signup'?'new-password':'current-password'} value={password} onChange={e=>setPassword(e.target.value)}/></label>}
    {message&&<p role="status" className="text-sm text-foreground">{message}</p>}
    <Button disabled={busy} className="w-full" type="submit">{busy?'Aguarde…':mode==='login'?'Entrar':mode==='signup'?'Cadastrar e confirmar por e-mail':'Enviar instruções'}</Button>
  </form><div className="flex flex-wrap justify-between gap-2 text-sm"><Button variant="link" className="p-0 text-primary" onClick={()=>{setMode(mode==='signup'?'login':'signup');setMessage('');}}>{mode==='signup'?'Já tenho conta':'Criar conta'}</Button><Button variant="link" className="p-0 text-primary" onClick={()=>{setMode(mode==='reset'?'login':'reset');setMessage('');}}>{mode==='reset'?'Voltar':'Esqueci minha senha'}</Button></div><Link to="/" className="block text-center text-sm text-muted-foreground">Voltar ao site</Link></div>;
}
