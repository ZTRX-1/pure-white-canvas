import { createFileRoute, Link, Outlet, useNavigate } from '@tanstack/react-router';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { FolderOpen, Users, ClipboardList, LogOut, Plus, Upload, Download, Trash2, Search, ShieldCheck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export const Route = createFileRoute('/interno')({
  head: () => ({ meta: [{ title: 'Operação | DHG' }, { name: 'description', content: 'Gestão interna de clientes, processos e documentos da DHG.' }, { property: 'og:title', content: 'Operação | DHG' }, { property: 'og:description', content: 'Gestão interna de clientes, processos e documentos da DHG.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }, { name: 'robots', content: 'noindex,nofollow' }] }),
  component: InternalPage,
});

type Client = Database['public']['Tables']['dhg_clients']['Row'];
type Process = Database['public']['Tables']['dhg_processes']['Row'];
type Document = Database['public']['Tables']['dhg_documents']['Row'];
type Invite = Database['public']['Tables']['dhg_invitations']['Row'];
const units = ['Carapicuíba', "Osasco - Jd. D'Abril", 'Osasco - Jardim Conceição'];
const stages = ['Aberto','Documentos pendentes','Protocolado no órgão','Aguardando análise','Pendência a resolver','Concluído','Cancelado'];
const services = ['Documentação veicular','Transferência de veículo','Licenciamento','Débitos e Regularizações','CNH','Outro'];
const categories = ['CNH','RG','CPF','Documento do veículo','Comprovante de pagamento','Documento do processo','Outro'];
const field = 'w-full border border-border bg-card px-3 py-2 text-foreground outline-none focus:border-primary';
const label = 'grid gap-1 text-sm font-medium text-foreground';
const date = (value: string) => new Date(value).toLocaleDateString('pt-BR');
const errorMessage = (error: unknown) => error instanceof Error ? error.message : 'Não foi possível concluir a operação.';

function InternalPage() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState<'loading'|'signed-out'|'pending'|'ready'>('loading');
  const [userEmail, setUserEmail] = useState('');
  const [admin, setAdmin] = useState(false);
  const [tab, setTab] = useState<'overview'|'clients'|'processes'|'documents'|'team'>('overview');
  const [clients, setClients] = useState<Client[]>([]);
  const [processes, setProcesses] = useState<Process[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [invites, setInvites] = useState<Invite[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [selectedProcess, setSelectedProcess] = useState<string>('');
  const [editingClient, setEditingClient] = useState<string|null>(null);
  const [editingProcess, setEditingProcess] = useState<string|null>(null);
  const [form, setForm] = useState<'client'|'process'|'document'|'invite'|null>(null);
  const [query, setQuery] = useState('');
  const [feedback, setFeedback] = useState('');
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    const [a,b,c,d] = await Promise.all([
      supabase.from('dhg_clients').select('*').order('created_at',{ascending:false}),
      supabase.from('dhg_processes').select('*').order('created_at',{ascending:false}),
      supabase.from('dhg_documents').select('*').order('created_at',{ascending:false}),
      supabase.from('dhg_invitations').select('*').order('created_at',{ascending:false}),
    ]);
    const failure = a.error || b.error || c.error || (admin && d.error);
    if (failure) setFeedback(failure.message);
    else { setClients(a.data ?? []); setProcesses(b.data ?? []); setDocuments(c.data ?? []); setInvites(d.data ?? []); }
  },[admin]);

  useEffect(() => {
    let active = true;
    async function check() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!active) return;
      if (!user) { setAuth('signed-out'); return; }
      setUserEmail(user.email ?? '');
      await supabase.rpc('claim_dhg_access');
      const { data: allowed } = await supabase.rpc('is_staff', { _user_id: user.id });
      const { data: isAdmin } = await supabase.rpc('has_role', { _user_id: user.id, _role: 'admin' });
      if (active) { setAdmin(isAdmin === true); setAuth(allowed ? 'ready' : 'pending'); }
    }
    void check();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => { void check(); });
    return () => { active = false; subscription.unsubscribe(); };
  },[]);
  useEffect(() => { if (auth === 'ready') void refresh(); }, [auth, refresh]);

  const run = async (action: () => Promise<void>) => {
    setBusy(true); setFeedback('');
    try { await action(); await refresh(); setForm(null); setEditingClient(null); setEditingProcess(null); setFeedback('Alterações salvas.'); }
    catch (error) { setFeedback(errorMessage(error)); }
    finally { setBusy(false); }
  };
  const requireOk = (error: { message: string } | null) => { if (error) throw new Error(error.message); };
  const clientName = (id: string) => clients.find(item => item.id === id)?.name ?? 'Cliente removido';
  const chooseClient = (id: string) => { setSelectedClient(id); setTab('clients'); setForm(null); };
  const chooseProcess = (id: string) => { setSelectedProcess(id); setTab('processes'); setForm(null); };
  const filteredClients = clients.filter(item => `${item.name} ${item.cpf ?? ''} ${item.cnpj ?? ''} ${item.phone ?? ''}`.toLowerCase().includes(query.toLowerCase()));
  const filteredProcesses = processes.filter(item => `${clientName(item.client_id)} ${item.plate ?? ''} ${item.service} ${item.protocol ?? ''}`.toLowerCase().includes(query.toLowerCase()));
  const currentClient = clients.find(item => item.id === selectedClient);
  const currentProcess = processes.find(item => item.id === selectedProcess);
  const currentDocs = documents.filter(item => item.client_id === selectedClient);

  if (auth === 'loading') return <div className="min-h-screen bg-background p-12 text-foreground">Verificando acesso…</div>;
  if (auth !== 'ready') return <main className="grid min-h-screen place-items-center bg-background p-6 text-foreground"><div className="max-w-md space-y-5"><h1 className="text-3xl font-bold">{auth === 'signed-out' ? 'Acesso restrito' : 'Acesso pendente'}</h1><p className="text-muted-foreground">{auth === 'signed-out' ? 'Entre com sua conta para acessar a operação da DHG.' : 'Sua conta está confirmada, mas precisa de autorização da administração para acessar esta área.'}</p><Button asChild><Link to="/login">Ir para entrada</Link></Button></div></main>;

  return <div className="min-h-screen bg-background text-foreground lg:grid lg:grid-cols-[225px_1fr]">
    <aside className="bg-brand-deep p-5 text-primary-foreground lg:min-h-screen">
      <Link to="/" className="text-xl font-bold">DHG <span className="text-sm font-normal">/ operação</span></Link>
      <nav aria-label="Área interna" className="mt-8 flex flex-wrap gap-1 lg:grid">
        {([['overview','Visão geral',ClipboardList],['clients','Clientes',Users],['processes','Processos',ClipboardList],['documents','Documentos',FolderOpen],...(admin ? [['team','Acessos',ShieldCheck] as const] : [])] as const).map(([key,text,Icon]) =>
          <Button key={key} type="button" variant="ghost" className={`justify-start text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground ${tab === key ? 'bg-primary-foreground/15' : ''}`} onClick={() => { setTab(key); setForm(null); setQuery(''); }}><Icon className="size-4" />{text}</Button>)}
      </nav>
      <div className="mt-10 break-all text-xs text-primary-foreground/65">{userEmail}</div>
      <Button variant="ghost" className="mt-3 text-primary-foreground hover:text-primary-foreground" onClick={async () => { await supabase.auth.signOut(); await navigate({to:'/login',replace:true}); }}><LogOut className="size-4" /> Sair</Button>
    </aside>
    <main className="min-w-0 p-5 md:p-9">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6"><div><p className="text-xs font-bold uppercase text-primary">DHG / Gestão</p><h1 className="mt-2 text-3xl font-bold">{{overview:'Visão geral',clients:'Clientes',processes:'Processos',documents:'Documentos',team:'Acessos'}[tab]}</h1></div>
        {tab === 'clients' && <Button onClick={() => {setSelectedClient('');setEditingClient(null);setForm('client');}}><Plus className="size-4"/> Novo cliente</Button>}
        {tab === 'processes' && <Button disabled={!clients.length} onClick={() => {setEditingProcess(null);setForm('process');}}><Plus className="size-4"/> Novo processo</Button>}
        {tab === 'documents' && <Button disabled={!clients.length} onClick={() => setForm('document')}><Upload className="size-4"/> Anexar documento</Button>}
        {tab === 'team' && admin && <Button onClick={() => setForm('invite')}><Plus className="size-4"/> Autorizar e-mail</Button>}
      </header>
      {feedback && <p role="status" className="mb-5 border-l-4 border-primary bg-secondary p-3 text-sm">{feedback}</p>}
      {tab === 'overview' && <div className="space-y-8"><div className="grid gap-4 sm:grid-cols-3">{[['Clientes',clients.length],['Processos em andamento',processes.filter(p=>!['Concluído','Cancelado'].includes(p.stage)).length],['Documentos',documents.length]].map(([name,count]) => <div key={name} className="border-b-2 border-primary bg-card p-5"><p className="text-sm text-muted-foreground">{name}</p><strong className="text-4xl">{count}</strong></div>)}</div><h2 className="text-xl font-bold">Processos recentes</h2><ProcessList items={processes.slice(0,8)} clientName={clientName} onOpen={chooseProcess}/></div>}
      {(tab === 'clients' || tab === 'processes' || tab === 'documents') && <div className="mb-5 flex max-w-lg items-center gap-2 border border-border bg-card px-3"><Search className="size-4 text-muted-foreground"/><Input className="border-0" aria-label="Buscar registros" placeholder="Buscar por nome, documento, placa ou protocolo" value={query} onChange={e=>setQuery(e.target.value)}/></div>}
      {tab === 'clients' && <div className="grid gap-8 xl:grid-cols-[minmax(240px,1fr)_minmax(350px,1.4fr)]"><div className="divide-y divide-border border-y border-border">{filteredClients.map(client => <Button key={client.id} variant="ghost" className={`h-auto w-full justify-start py-4 text-left ${selectedClient===client.id?'bg-secondary':''}`} onClick={()=>chooseClient(client.id)}><span className="grid"><strong>{client.name}</strong><small className="text-muted-foreground">{client.cpf || client.cnpj || client.person_type} · {client.unit}</small></span></Button>)}{!filteredClients.length && <p className="py-6 text-muted-foreground">Nenhum cliente encontrado.</p>}</div><div>{currentClient ? <div className="space-y-6"><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-2xl font-bold">{currentClient.name}</h2><p className="text-muted-foreground">{currentClient.person_type} · {currentClient.unit}</p></div><Button variant="outline" onClick={()=>{setEditingClient(currentClient.id);setForm('client');}}>Editar cadastro</Button></div><dl className="grid gap-3 border-y border-border py-5 sm:grid-cols-2">{[['CPF',currentClient.cpf],['CNPJ',currentClient.cnpj],['RG',currentClient.rg],['CNH',currentClient.cnh],['Telefone',currentClient.phone],['E-mail',currentClient.email],['Observações',currentClient.notes]].filter(([,v])=>v).map(([k,v])=><div key={k}><dt className="text-xs uppercase text-muted-foreground">{k}</dt><dd className="break-words">{v}</dd></div>)}</dl><div className="flex items-center justify-between"><h3 className="text-lg font-bold">Processos</h3><Button size="sm" variant="outline" onClick={()=>{setForm('process');setEditingProcess(null);}}>Adicionar processo</Button></div><ProcessList items={processes.filter(p=>p.client_id===selectedClient)} clientName={clientName} onOpen={chooseProcess}/><div className="flex items-center justify-between"><h3 className="text-lg font-bold">Documentos</h3><Button size="sm" variant="outline" onClick={()=>setForm('document')}>Anexar</Button></div><DocumentList items={currentDocs} onOpen={async doc=>{const {data,error}=await supabase.storage.from('dhg-documents').createSignedUrl(doc.storage_path,60);if(error)setFeedback(error.message);else window.open(data.signedUrl,'_blank','noopener,noreferrer');}} onDelete={doc=>void run(async()=>{requireOk((await supabase.storage.from('dhg-documents').remove([doc.storage_path])).error);requireOk((await supabase.from('dhg_documents').delete().eq('id',doc.id)).error);})}/></div>:<p className="text-muted-foreground">Selecione um cliente para ver cadastro, processos e arquivos.</p>}</div></div>}
      {tab === 'processes' && <div className="grid gap-8 xl:grid-cols-[1fr_1fr]"><ProcessList items={filteredProcesses} clientName={clientName} onOpen={chooseProcess}/>{currentProcess ? <div className="space-y-5 border-t-2 border-primary pt-5"><h2 className="text-2xl font-bold">{currentProcess.service}</h2><Button variant="link" className="p-0" onClick={()=>chooseClient(currentProcess.client_id)}>{clientName(currentProcess.client_id)}</Button><p>{currentProcess.stage} · {currentProcess.unit}</p><p className="text-sm text-muted-foreground">Placa: {currentProcess.plate || '—'} · Protocolo: {currentProcess.protocol || '—'} · Prazo: {currentProcess.deadline ? date(currentProcess.deadline+'T12:00:00') : '—'}</p>{currentProcess.notes && <p className="whitespace-pre-wrap">{currentProcess.notes}</p>}<Button variant="outline" onClick={()=>{setEditingProcess(currentProcess.id);setForm('process');}}>Atualizar processo</Button><h3 className="font-bold">Arquivos vinculados</h3><DocumentList items={documents.filter(d=>d.process_id===currentProcess.id)} onOpen={async doc=>{const {data,error}=await supabase.storage.from('dhg-documents').createSignedUrl(doc.storage_path,60);if(error)setFeedback(error.message);else window.open(data.signedUrl,'_blank','noopener,noreferrer');}} onDelete={doc=>void run(async()=>{requireOk((await supabase.storage.from('dhg-documents').remove([doc.storage_path])).error);requireOk((await supabase.from('dhg_documents').delete().eq('id',doc.id)).error);})}/><Button variant="outline" onClick={()=>setForm('document')}>Anexar arquivo</Button></div>:<p className="text-muted-foreground">Selecione um processo para acompanhar e atualizar.</p>}</div>}
      {tab === 'documents' && <DocumentList items={documents.filter(d=>`${d.file_name} ${d.category} ${clientName(d.client_id)}`.toLowerCase().includes(query.toLowerCase()))} clientName={clientName} onOpen={async doc=>{const {data,error}=await supabase.storage.from('dhg-documents').createSignedUrl(doc.storage_path,60);if(error)setFeedback(error.message);else window.open(data.signedUrl,'_blank','noopener,noreferrer');}} onDelete={doc=>void run(async()=>{requireOk((await supabase.storage.from('dhg-documents').remove([doc.storage_path])).error);requireOk((await supabase.from('dhg_documents').delete().eq('id',doc.id)).error);})}/>}
      {tab === 'team' && admin && <div className="max-w-2xl space-y-4"><p className="text-muted-foreground">Somente e-mails autorizados podem acessar a operação após confirmar o cadastro.</p>{invites.map(invite=><div className="flex items-center justify-between gap-3 border-b border-border py-3" key={invite.id}><div><strong>{invite.email}</strong><p className="text-sm text-muted-foreground">{invite.claimed_at?'Acesso ativado — remoção do convite não revoga acesso':'Aguardando cadastro e confirmação'}</p></div><Button size="icon" variant="outline" disabled={!!invite.claimed_at} title="Remover convite pendente" aria-label={`Remover convite de ${invite.email}`} onClick={()=>void run(async()=>{requireOk((await supabase.from('dhg_invitations').delete().eq('id',invite.id)).error);})}><Trash2 className="size-4"/></Button></div>)}</div>}
      {form && <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-deep/65 p-4" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setForm(null)}}><div role="dialog" aria-modal="true" aria-label={{client:'Cadastro de cliente',process:'Cadastro de processo',document:'Anexar documento',invite:'Autorizar e-mail'}[form]} className="mx-auto my-8 max-w-xl bg-card p-6 text-card-foreground md:p-8"><div className="mb-6 flex justify-between gap-3"><h2 className="text-2xl font-bold">{{client:editingClient?'Editar cliente':'Novo cliente',process:editingProcess?'Atualizar processo':'Novo processo',document:'Anexar documento',invite:'Autorizar acesso'}[form]}</h2><Button variant="ghost" onClick={()=>setForm(null)}>Fechar</Button></div>
        {form==='client' && <ClientForm initial={clients.find(c=>c.id===editingClient)} busy={busy} onSave={data=>void run(async()=>{const result=editingClient?await supabase.from('dhg_clients').update({...data,updated_at:new Date().toISOString()}).eq('id',editingClient):await supabase.from('dhg_clients').insert(data).select('id').single();requireOk(result.error);if(!editingClient && result.data)setSelectedClient(result.data.id);})}/>}
        {form==='process' && <ProcessForm initial={processes.find(p=>p.id===editingProcess)} clients={clients} initialClient={selectedClient} busy={busy} onSave={data=>void run(async()=>{const result=editingProcess?await supabase.from('dhg_processes').update({...data,updated_at:new Date().toISOString()}).eq('id',editingProcess):await supabase.from('dhg_processes').insert(data).select('id').single();requireOk(result.error);if(!editingProcess && result.data)setSelectedProcess(result.data.id);})}/>}
        {form==='document' && <UploadForm clients={clients} processes={processes} initialClient={selectedClient || currentProcess?.client_id || ''} initialProcess={selectedProcess} busy={busy} onSave={(clientId,processId,category,file)=>void run(async()=>{if(file.size>20*1024*1024)throw new Error('O arquivo deve ter até 20 MB.');const {data:{user}}=await supabase.auth.getUser();if(!user)throw new Error('Sessão expirada.');const path=`${user.id}/${clientId}/${crypto.randomUUID()}/${file.name.replace(/[^a-zA-Z0-9._-]/g,'_')}`;requireOk((await supabase.storage.from('dhg-documents').upload(path,file,{contentType:file.type || 'application/octet-stream'})).error);const {error}=await supabase.from('dhg_documents').insert({client_id:clientId,process_id:processId || null,category,file_name:file.name,storage_path:path,mime_type:file.type,size_bytes:file.size});if(error){await supabase.storage.from('dhg-documents').remove([path]);throw error;}})}/>}
        {form==='invite' && <form className="space-y-4" onSubmit={e=>{e.preventDefault();const email=new FormData(e.currentTarget).get('email')?.toString().trim().toLowerCase();if(email)void run(async()=>{requireOk((await supabase.from('dhg_invitations').insert({email,role:'staff'})).error);});}}><label className={label}>E-mail autorizado<Input name="email" type="email" required autoComplete="email"/></label><Button disabled={busy} type="submit">Autorizar</Button></form>}
      </div></div>}
      <Outlet />
    </main>
  </div>;
}

function ClientForm({initial,busy,onSave}:{initial:Client|undefined;busy:boolean;onSave:(data:Database['public']['Tables']['dhg_clients']['Insert'])=>void}) {
  return <form className="grid gap-4 sm:grid-cols-2" onSubmit={(e:FormEvent<HTMLFormElement>)=>{e.preventDefault();const d=new FormData(e.currentTarget);const value=(key:string)=>d.get(key)?.toString().trim()||null;onSave({name:value('name')||'',person_type:value('person_type')||'PF',cpf:value('cpf'),cnpj:value('cnpj'),rg:value('rg'),cnh:value('cnh'),phone:value('phone'),email:value('email'),unit:value('unit')||units[0]||'Carapicuíba',notes:value('notes')});}}>
    <label className={`${label} sm:col-span-2`}>Nome completo / razão social<Input name="name" required defaultValue={initial?.name}/></label>
    <label className={label}>Tipo<select className={field} name="person_type" defaultValue={initial?.person_type||'PF'}><option>PF</option><option>PJ</option></select></label>
    <label className={label}>Unidade<select className={field} name="unit" defaultValue={initial?.unit||units[0]}>{units.map(u=><option key={u}>{u}</option>)}</select></label>
    {([['cpf','CPF'],['cnpj','CNPJ'],['rg','RG'],['cnh','CNH'],['phone','Telefone'],['email','E-mail']] as const).map(([key,title])=><label className={label} key={key}>{title}<Input type={key==='email'?'email':'text'} name={key} defaultValue={initial?.[key]||''}/></label>)}
    <label className={`${label} sm:col-span-2`}>Observações<Textarea name="notes" defaultValue={initial?.notes||''}/></label><Button type="submit" disabled={busy} className="sm:col-span-2">Salvar cliente</Button>
  </form>;
}
function ProcessForm({initial,clients,initialClient,busy,onSave}:{initial:Process|undefined;clients:Client[];initialClient:string;busy:boolean;onSave:(data:Database['public']['Tables']['dhg_processes']['Insert'])=>void}) {
  return <form className="grid gap-4 sm:grid-cols-2" onSubmit={e=>{e.preventDefault();const d=new FormData(e.currentTarget);const v=(key:string)=>d.get(key)?.toString().trim()||null;const client=clients.find(c=>c.id===v('client_id'));onSave({client_id:client?.id||'',unit:v('unit')||client?.unit||units[0]||'Carapicuíba',service:v('service')||'',stage:v('stage')||'Aberto',plate:v('plate'),protocol:v('protocol'),deadline:v('deadline'),notes:v('notes')});}}>
    <label className={`${label} sm:col-span-2`}>Cliente<select className={field} name="client_id" required defaultValue={initial?.client_id||initialClient}>{!initial?.client_id&&!initialClient&&<option value="">Selecione</option>}{clients.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
    <label className={label}>Serviço<select className={field} name="service" defaultValue={initial?.service||''} required><option value="">Selecione</option>{services.map(s=><option key={s}>{s}</option>)}</select></label>
    <label className={label}>Etapa<select className={field} name="stage" defaultValue={initial?.stage||'Aberto'}>{stages.map(s=><option key={s}>{s}</option>)}</select></label>
    <label className={label}>Unidade<select className={field} name="unit" defaultValue={initial?.unit||clients.find(c=>c.id===initialClient)?.unit||units[0]}>{units.map(u=><option key={u}>{u}</option>)}</select></label>
    <label className={label}>Placa<Input name="plate" defaultValue={initial?.plate||''}/></label>
    <label className={label}>Protocolo<Input name="protocol" defaultValue={initial?.protocol||''}/></label>
    <label className={label}>Prazo informado<Input type="date" name="deadline" defaultValue={initial?.deadline||''}/></label>
    <label className={`${label} sm:col-span-2`}>Anotações / pendências<Textarea name="notes" defaultValue={initial?.notes||''}/></label>
    <Button type="submit" disabled={busy} className="sm:col-span-2">Salvar processo</Button>
  </form>;
}
function UploadForm({clients,processes,initialClient,initialProcess,busy,onSave}:{clients:Client[];processes:Process[];initialClient:string;initialProcess:string;busy:boolean;onSave:(client:string,process:string,category:string,file:File)=>void}) {
  const [client,setClient]=useState(initialClient);
  return <form className="grid gap-4" onSubmit={e=>{e.preventDefault();const d=new FormData(e.currentTarget);const file=d.get('file');if(file instanceof File&&file.size)onSave(client,d.get('process')?.toString()||'',d.get('category')?.toString()||'Outro',file);}}>
    <label className={label}>Cliente<select className={field} required value={client} onChange={e=>setClient(e.target.value)}><option value="">Selecione</option>{clients.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
    <label className={label}>Processo (opcional)<select className={field} name="process" defaultValue={initialProcess&&processes.find(p=>p.id===initialProcess)?.client_id===client?initialProcess:''}><option value="">Apenas no cadastro do cliente</option>{processes.filter(p=>p.client_id===client).map(p=><option key={p.id} value={p.id}>{p.service} · {p.plate||date(p.created_at)}</option>)}</select></label>
    <label className={label}>Tipo de documento<select className={field} name="category">{categories.map(c=><option key={c}>{c}</option>)}</select></label>
    <label className={label}>Arquivo (até 20 MB)<Input name="file" type="file" required accept="image/*,.pdf,.doc,.docx"/></label>
    <Button disabled={busy||!client} type="submit">Enviar arquivo</Button>
  </form>;
}
function ProcessList({items,clientName,onOpen}:{items:Process[];clientName:(id:string)=>string;onOpen:(id:string)=>void}) { return <div className="divide-y divide-border border-y border-border">{items.map(p=><Button key={p.id} variant="ghost" className="h-auto w-full justify-between gap-4 py-4 text-left" onClick={()=>onOpen(p.id)}><span className="min-w-0"><strong className="block truncate">{clientName(p.client_id)}</strong><span className="block truncate text-sm text-muted-foreground">{p.service} · {p.plate||p.unit}</span></span><span className="shrink-0 text-right text-xs text-muted-foreground">{p.stage}<br/>{p.deadline||''}</span></Button>)}{!items.length&&<p className="py-6 text-muted-foreground">Nenhum processo encontrado.</p>}</div>; }
function DocumentList({items,clientName,onOpen,onDelete}:{items:Document[];clientName?:(id:string)=>string;onOpen:(d:Document)=>void;onDelete:(d:Document)=>void}) { return <div className="divide-y divide-border border-y border-border">{items.map(d=><div key={d.id} className="flex items-center gap-2 py-3"><FolderOpen className="size-4 shrink-0 text-primary"/><div className="min-w-0 flex-1"><p className="truncate font-medium">{d.file_name}</p><p className="text-xs text-muted-foreground">{d.category}{clientName?' · '+clientName(d.client_id):''} · {date(d.created_at)}</p></div><Button size="icon" variant="ghost" title="Abrir arquivo" aria-label={`Abrir ${d.file_name}`} onClick={()=>onOpen(d)}><Download className="size-4"/></Button><Button size="icon" variant="ghost" title="Excluir arquivo" aria-label={`Excluir ${d.file_name}`} onClick={()=>{if(window.confirm(`Excluir ${d.file_name}?`))onDelete(d)}}><Trash2 className="size-4"/></Button></div>)}{!items.length&&<p className="py-6 text-muted-foreground">Nenhum documento encontrado.</p>}</div>; }
