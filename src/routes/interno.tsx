import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import {
  Bell,
  BookOpen,
  Building2,
  ChevronDown,
  CircleHelp,
  FileText,
  FolderOpen,
  LayoutDashboard,
  LogOut,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  SlidersHorizontal,
  Upload,
  UserCog,
  Users,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { DocumentControlCenter, ProcessDocuments } from "@/components/dhg/document-control-center";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/interno")({
  head: () => ({
    meta: [{ title: "Painel Interno | DHG" }, { name: "robots", content: "noindex" }],
  }),
  component: InternalPage,
});

type View =
  | "Visão geral"
  | "Clientes"
  | "Processos"
  | "Documentos"
  | "Unidades"
  | "Equipe"
  | "Conteúdos"
  | "Integrações";
type Unit = "Carapicuíba" | "Osasco - Jd. D'Abril" | "Osasco - Conceição";
type ProcessStage =
  | "Aberto"
  | "Documentos pendentes"
  | "Protocolado no órgão"
  | "Aguardando análise"
  | "Pendência a resolver"
  | "Concluído";

const navigation: { label: View; icon: typeof LayoutDashboard }[] = [
  { label: "Visão geral", icon: LayoutDashboard },
  { label: "Clientes", icon: Users },
  { label: "Processos", icon: FileText },
  { label: "Documentos", icon: FolderOpen },
  { label: "Unidades", icon: Building2 },
  { label: "Equipe", icon: UserCog },
  { label: "Conteúdos", icon: BookOpen },
  { label: "Integrações", icon: SlidersHorizontal },
];

const unitInfo: Record<Unit, { code: string; team: number; processes: number; revenue: string }> = {
  Carapicuíba: { code: "CPQ", team: 8, processes: 42, revenue: "R$ 38.420" },
  "Osasco - Jd. D'Abril": { code: "JDA", team: 6, processes: 31, revenue: "R$ 29.680" },
  "Osasco - Conceição": { code: "JDC", team: 5, processes: 25, revenue: "R$ 21.940" },
};

const processes: {
  client: string;
  plate?: string;
  type: string;
  unit: Unit;
  attendant: string;
  stage: ProcessStage;
  deadline?: string;
  deadlineStatus?: "overdue" | "urgent";
}[] = [
  {
    client: "Renata Oliveira",
    plate: "ABC-1D23",
    type: "Transferência",
    unit: "Carapicuíba",
    attendant: "Camila Santos",
    stage: "Documentos pendentes",
    deadline: "22 set 2026",
    deadlineStatus: "overdue",
  },
  {
    client: "Marcos Ribeiro",
    plate: "EJX-9F02",
    type: "Licenciamento",
    unit: "Carapicuíba",
    attendant: "Diego Rodrigues",
    stage: "Protocolado no órgão",
    deadline: "26 set 2026",
    deadlineStatus: "urgent",
  },
  {
    client: "Juliana Costa",
    plate: "RTA-4C88",
    type: "2ª via de CRLV",
    unit: "Osasco - Jd. D'Abril",
    attendant: "Felipe Nunes",
    stage: "Aguardando análise",
    deadline: "30 set 2026",
  },
  {
    client: "Paulo Mendes",
    plate: "GHL-7A61",
    type: "Débitos e Regularizações",
    unit: "Osasco - Conceição",
    attendant: "Aline Moreira",
    stage: "Pendência a resolver",
    deadline: "25 set 2026",
    deadlineStatus: "urgent",
  },
  {
    client: "Larissa Almeida",
    type: "CNH",
    unit: "Osasco - Jd. D'Abril",
    attendant: "Felipe Nunes",
    stage: "Aberto",
  },
  {
    client: "Roberto Lima",
    plate: "KLM-3N45",
    type: "Transferência",
    unit: "Osasco - Conceição",
    attendant: "Aline Moreira",
    stage: "Concluído",
  },
];

function InternalPage() {
  const location = useLocation();
  const [view, setView] = useState<View>("Visão geral");
  const [unit, setUnit] = useState<Unit>("Carapicuíba");
  const [menuOpen, setMenuOpen] = useState(false);
  const [documents, setDocuments] = useState([
    "CRLV - ABC-1D23.pdf",
    "RG - Renata Oliveira.pdf",
    "ATPV-e - ABC-1D23.pdf",
  ]);
  const [search, setSearch] = useState("");
  const info = unitInfo[unit];

  const selectView = (next: View) => {
    if (next === "Documentos") {
      window.location.assign("/interno/documentos");
      return;
    }
    if (location.pathname !== "/interno") {
      window.location.assign("/interno");
      return;
    }
    setView(next);
    setMenuOpen(false);
  };
  const content =
    view === "Visão geral" ? (
      <Overview unit={unit} info={info} />
    ) : view === "Clientes" ? (
      <Clients search={search} onSearch={setSearch} />
    ) : view === "Processos" ? (
      <Processes />
    ) : view === "Documentos" ? (
      <Documents
        documents={documents}
        onAdd={(name) => setDocuments((current) => [name, ...current])}
      />
    ) : view === "Unidades" ? (
      <Units unit={unit} />
    ) : view === "Equipe" ? (
      <Team />
    ) : view === "Conteúdos" ? (
      <Content />
    ) : (
      <Integrations />
    );

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-900">
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-[#101c36] text-white transition-transform lg:translate-x-0 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-7">
          <div>
            <span className="text-lg font-bold tracking-tight">DHG</span>
            <span className="ml-2 text-xs font-medium tracking-[0.18em] text-blue-200">GESTÃO</span>
          </div>
          <button className="lg:hidden" onClick={() => setMenuOpen(false)} aria-label="Fechar menu">
            <X className="size-5" />
          </button>
        </div>
        <div className="px-4 py-6">
          <p className="px-3 text-[10px] font-bold tracking-[0.16em] text-blue-200/55">OPERAÇÃO</p>
          <nav className="mt-3 grid gap-1">
            {navigation.slice(0, 5).map(({ label, icon: Icon }) => (
              <NavItem
                key={label}
                active={view === label}
                icon={<Icon />}
                label={label}
                onClick={() => selectView(label)}
              />
            ))}
          </nav>
          <p className="mt-7 px-3 text-[10px] font-bold tracking-[0.16em] text-blue-200/55">
            ADMINISTRAÇÃO
          </p>
          <nav className="mt-3 grid gap-1">
            {navigation.slice(5).map(({ label, icon: Icon }) => (
              <NavItem
                key={label}
                active={view === label}
                icon={<Icon />}
                label={label}
                onClick={() => selectView(label)}
              />
            ))}
          </nav>
        </div>
        <div className="mt-auto border-t border-white/10 p-4">
          <button className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-left text-sm text-blue-100/70 hover:bg-white/5">
            <CircleHelp className="size-4" /> Central de ajuda
          </button>
          <button className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-left text-sm text-blue-100/70 hover:bg-white/5">
            <LogOut className="size-4" /> Encerrar sessão
          </button>
        </div>
      </aside>
      {menuOpen && (
        <button
          className="fixed inset-0 z-30 bg-slate-950/35 lg:hidden"
          onClick={() => setMenuOpen(false)}
          aria-label="Fechar menu"
        />
      )}
      <main className="min-h-screen lg:pl-72">
        <header className="sticky top-0 z-20 flex h-20 items-center gap-3 border-b border-slate-200 bg-white/95 px-5 backdrop-blur lg:px-8">
          <button
            className="rounded-md p-2 hover:bg-slate-100 lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu className="size-5" />
          </button>
          <div className="relative hidden max-w-sm flex-1 md:block">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar cliente, placa ou processo..."
              className="h-10 border-slate-200 bg-slate-50 pl-9 text-sm"
            />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button className="relative rounded-md p-2 text-slate-500 hover:bg-slate-100">
              <Bell className="size-5" />
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-blue-600" />
            </button>
            <div className="hidden h-8 w-px bg-slate-200 sm:block" />
            <div className="flex items-center gap-2">
              <div className="grid size-9 place-items-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                DR
              </div>
              <div className="hidden text-sm sm:block">
                <p className="font-semibold leading-4">Diego Rodrigues</p>
                <p className="text-xs text-slate-500">Administrador</p>
              </div>
              <ChevronDown className="size-4 text-slate-400" />
            </div>
          </div>
        </header>
        <section className="px-5 py-7 lg:px-8 lg:py-9">
          <div className="mx-auto max-w-7xl">
            {location.pathname === "/interno/documentos" ? (
              <DocumentControlCenter />
            ) : location.pathname.startsWith("/interno/processos/") ? (
              <ProcessDocuments processId={location.pathname.split("/").pop() ?? ""} />
            ) : (
              <>
                <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
                      Painel interno
                    </p>
                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 lg:text-3xl">
                      {view}
                    </h1>
                  </div>
                  <UnitSelect unit={unit} onChange={setUnit} />
                </div>
                {content}
              </>
            )}
          </div>
        </section>
      </main>
      <Outlet />
    </div>
  );
}

function NavItem({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-medium transition-colors ${active ? "bg-blue-600 text-white" : "text-blue-100/75 hover:bg-white/7 hover:text-white"}`}
    >
      {icon}
      {label}
    </button>
  );
}
function UnitSelect({ unit, onChange }: { unit: Unit; onChange: (unit: Unit) => void }) {
  return (
    <select
      value={unit}
      onChange={(event) => onChange(event.target.value as Unit)}
      className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500"
    >
      <option>Carapicuíba</option>
      <option>Osasco - Jd. D'Abril</option>
      <option>Osasco - Conceição</option>
    </select>
  );
}
function Status({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
      {children}
    </span>
  );
}

function Overview({ unit, info }: { unit: Unit; info: (typeof unitInfo)[Unit] }) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          label="Processos ativos"
          value={String(info.processes)}
          detail="8 iniciados esta semana"
          color="blue"
        />
        <Metric label="Pendências" value="12" detail="3 vencem hoje" color="amber" />
        <Metric label="Clientes atendidos" value="186" detail="+14% no mês" color="emerald" />
        <Metric
          label="Faturamento mensal"
          value={info.revenue}
          detail="Meta: R$ 45.000"
          color="violet"
        />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
        <Panel title="Processos prioritários" action="Ver todos">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="pb-3 font-semibold">Serviço / Cliente</th>
                  <th className="pb-3 font-semibold">Placa</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Prazo</th>
                </tr>
              </thead>
              <tbody>
                {processes.slice(0, 4).map((process) => (
                  <tr
                    key={`${process.client}-${process.type}`}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="py-4">
                      <p className="font-semibold text-slate-800">{process.type}</p>
                      <p className="text-xs text-slate-500">{process.client}</p>
                    </td>
                    <td className="font-mono text-xs font-semibold text-slate-600">
                      {process.plate ?? "-"}
                    </td>
                    <td>
                      <StageBadge stage={process.stage} />
                    </td>
                    <td className="text-xs font-medium text-slate-600">
                      {process.deadline ?? "Sem prazo"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
        <Panel title="Resumo da unidade">
          <div className="space-y-5">
            <div className="rounded-lg bg-blue-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                Unidade selecionada
              </p>
              <p className="mt-1 text-lg font-bold text-slate-900">{unit}</p>
              <p className="mt-1 text-sm text-slate-600">Base operacional {info.code} separada</p>
            </div>
            <Progress label="Documentos validados" value="78%" width="78%" />
            <Progress label="Processos no prazo" value="91%" width="91%" />
            <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
              <span className="text-slate-500">Equipe alocada</span>
              <span className="font-bold">{info.team} pessoas</span>
            </div>
          </div>
        </Panel>
      </div>
    </>
  );
}
function Metric({
  label,
  value,
  detail,
  color,
}: {
  label: string;
  value: string;
  detail: string;
  color: string;
}) {
  const colors: Record<string, string> = {
    blue: "bg-blue-600",
    amber: "bg-amber-500",
    emerald: "bg-emerald-500",
    violet: "bg-violet-500",
  };
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <span className={`size-2 rounded-full ${colors[color]}`} />
      </div>
      <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{detail}</p>
    </div>
  );
}
function Panel({
  title,
  action,
  children,
}: {
  title: string;
  action?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 lg:p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-bold text-slate-900">{title}</h2>
        {action && (
          <button className="text-xs font-bold text-blue-600 hover:text-blue-800">{action}</button>
        )}
      </div>
      {children}
    </section>
  );
}
function Progress({ label, value, width }: { label: string; value: string; width: string }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="text-slate-600">{label}</span>
        <span className="font-bold text-slate-800">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-blue-600" style={{ width }} />
      </div>
    </div>
  );
}

function Clients({ search, onSearch }: { search: string; onSearch: (value: string) => void }) {
  const clients = [
    ["Renata Oliveira", "CPF 123.456.789-00", "Transferência em andamento", "Carapicuíba"],
    ["Marcos Ribeiro", "CPF 987.654.321-00", "Licenciamento 2026", "Carapicuíba"],
    ["Juliana Costa", "CNPJ 12.345.678/0001-00", "2 processos ativos", "Jd. D'Abril"],
    ["Paulo Mendes", "CPF 456.789.123-00", "Regularização de débitos", "Conceição"],
  ].filter((client) => client.join(" ").toLowerCase().includes(search.toLowerCase()));
  return (
    <Panel title="Base de clientes" action="+ Novo cliente">
      <div className="mb-5 flex gap-3 md:hidden">
        <Input
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Buscar cliente"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="border-b border-slate-100 text-left text-xs uppercase text-slate-400">
            <tr>
              <th className="pb-3">Cliente</th>
              <th className="pb-3">Documento</th>
              <th className="pb-3">Situação</th>
              <th className="pb-3">Unidade</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {clients.map(([name, document, status, branch]) => (
              <tr key={name} className="border-b border-slate-100">
                <td className="py-4 font-semibold">{name}</td>
                <td className="text-slate-500">{document}</td>
                <td>
                  <Status>{status}</Status>
                </td>
                <td className="text-slate-600">{branch}</td>
                <td>
                  <button aria-label={`Ações de ${name}`}>
                    <MoreHorizontal className="size-5 text-slate-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
function Processes() {
  return (
    <Panel title="Fila de processos" action="+ Novo processo">
      <div className="mb-5 flex flex-wrap gap-3 text-xs text-slate-500">
        <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 font-semibold text-red-700">
          <span className="size-2 rounded-full bg-red-500" /> Prazo vencido
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 font-semibold text-amber-700">
          <span className="size-2 rounded-full bg-amber-500" /> Vence em até 3 dias
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1040px] text-left text-sm">
          <thead className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="pb-3 font-semibold">Cliente / veículo</th>
              <th className="pb-3 font-semibold">Tipo</th>
              <th className="pb-3 font-semibold">Unidade</th>
              <th className="pb-3 font-semibold">Responsável</th>
              <th className="pb-3 font-semibold">Etapa atual</th>
              <th className="pb-3 font-semibold">Prazo / SLA</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {processes.map((process) => (
              <tr
                key={`${process.client}-${process.type}`}
                className={`border-b border-slate-100 last:border-0 ${process.deadlineStatus === "overdue" ? "border-l-2 border-l-red-500" : process.deadlineStatus === "urgent" ? "border-l-2 border-l-amber-500" : ""}`}
              >
                <td className="py-4">
                  <p className="font-semibold text-slate-800">{process.client}</p>
                  <p className="font-mono text-xs font-semibold text-slate-500">
                    {process.plate ?? "Sem veículo relacionado"}
                  </p>
                </td>
                <td className="font-medium text-slate-700">{process.type}</td>
                <td className="text-slate-600">{process.unit}</td>
                <td className="text-slate-600">{process.attendant}</td>
                <td>
                  <StageBadge stage={process.stage} />
                </td>
                <td>
                  {process.deadline ? (
                    <span
                      className={`inline-flex items-center gap-2 font-semibold ${process.deadlineStatus === "overdue" ? "text-red-700" : process.deadlineStatus === "urgent" ? "text-amber-700" : "text-slate-700"}`}
                    >
                      {process.deadlineStatus && (
                        <span
                          className={`size-2 rounded-full ${process.deadlineStatus === "overdue" ? "bg-red-500" : "bg-amber-500"}`}
                        />
                      )}
                      {process.deadline}
                    </span>
                  ) : (
                    <span className="text-slate-400">Sem prazo</span>
                  )}
                </td>
                <td>
                  <button aria-label={`Ações do processo de ${process.client}`}>
                    <MoreHorizontal className="size-5 text-slate-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
function StageBadge({ stage }: { stage: ProcessStage }) {
  const styles: Record<ProcessStage, string> = {
    Aberto: "bg-slate-100 text-slate-700",
    "Documentos pendentes": "bg-amber-50 text-amber-700",
    "Protocolado no órgão": "bg-blue-50 text-blue-700",
    "Aguardando análise": "bg-violet-50 text-violet-700",
    "Pendência a resolver": "bg-red-50 text-red-700",
    Concluído: "bg-emerald-50 text-emerald-700",
  };

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${styles[stage]}`}>
      {stage}
    </span>
  );
}
function Documents({ documents, onAdd }: { documents: string[]; onAdd: (name: string) => void }) {
  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.5fr]">
      <section className="grid min-h-64 place-items-center rounded-lg border-2 border-dashed border-blue-200 bg-blue-50/40 p-6 text-center">
        <div>
          <div className="mx-auto grid size-12 place-items-center rounded-full bg-blue-100 text-blue-600">
            <Upload className="size-5" />
          </div>
          <h2 className="mt-4 font-bold">Anexar documentos</h2>
          <p className="mt-1 max-w-xs text-sm text-slate-500">PDF, JPG ou PNG de até 20 MB.</p>
          <label className="mt-5 inline-flex h-9 cursor-pointer items-center gap-2 rounded-md bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-700">
            <Plus className="size-4" /> Selecionar arquivo
            <input
              type="file"
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) onAdd(file.name);
              }}
            />
          </label>
        </div>
      </section>
      <Panel title="Documentos recentes" action="Ver biblioteca">
        <div className="space-y-2">
          {documents.map((document) => (
            <div
              key={document}
              className="flex items-center justify-between rounded-md border border-slate-100 p-3"
            >
              <div className="flex items-center gap-3">
                <FileText className="size-5 text-blue-600" />
                <div>
                  <p className="text-sm font-semibold">{document}</p>
                  <p className="text-xs text-slate-500">Enviado hoje</p>
                </div>
              </div>
              <button>
                <MoreHorizontal className="size-5 text-slate-400" />
              </button>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
function Units({ unit }: { unit: Unit }) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {(Object.entries(unitInfo) as [Unit, (typeof unitInfo)[Unit]][]).map(([name, info]) => (
        <section
          key={name}
          className={`rounded-lg border bg-white p-6 ${name === unit ? "border-blue-500 ring-1 ring-blue-500" : "border-slate-200"}`}
        >
          <div className="flex items-start justify-between">
            <div className="grid size-11 place-items-center rounded-md bg-blue-50 font-bold text-blue-700">
              {info.code}
            </div>
            {name === unit && <span className="text-xs font-bold text-blue-600">ATIVA</span>}
          </div>
          <h2 className="mt-5 text-lg font-bold">{name}</h2>
          <p className="mt-1 text-sm text-slate-500">Banco operacional individual</p>
          <dl className="mt-6 space-y-3 border-t border-slate-100 pt-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Processos ativos</dt>
              <dd className="font-bold">{info.processes}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Equipe</dt>
              <dd className="font-bold">{info.team} membros</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Faturamento</dt>
              <dd className="font-bold">{info.revenue}</dd>
            </div>
          </dl>
          <Button variant="outline" className="mt-6 w-full">
            Gerenciar unidade
          </Button>
        </section>
      ))}
    </div>
  );
}
function Team() {
  return (
    <Panel title="Equipe DHG" action="+ Convidar membro">
      <div className="grid gap-3">
        {[
          ["Diego Rodrigues", "Todas as unidades", "Administrador", "DR"],
          ["Camila Santos", "Carapicuíba", "Operacional", "CS"],
          ["Felipe Nunes", "Osasco - Jd. D'Abril", "Operacional", "FN"],
          ["Aline Moreira", "Osasco - Conceição", "Gestor", "AM"],
        ].map(([name, unit, role, initials]) => (
          <div
            key={name}
            className="flex items-center gap-4 rounded-md border border-slate-100 p-4"
          >
            <span className="grid size-10 place-items-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
              {initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{name}</p>
              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                <span>
                  Unidade: <strong className="font-semibold text-slate-700">{unit}</strong>
                </span>
                <span>
                  Papel: <strong className="font-semibold text-slate-700">{role}</strong>
                </span>
              </div>
            </div>
            <span className="size-2 rounded-full bg-emerald-500" />
          </div>
        ))}
      </div>
    </Panel>
  );
}
function Content() {
  return (
    <Panel title="Central de conteúdos" action="+ Novo artigo">
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Licenciamento 2026: prazos e documentos", "Publicado", "12 ago 2026"],
          ["Como fazer transferência digital de veículo", "Em revisão", "15 ago 2026"],
          ["Débitos veiculares: como regularizar", "Rascunho", "-"],
        ].map(([title, status, date]) => (
          <article key={title} className="rounded-md border border-slate-200 p-5">
            <div className="flex justify-between">
              <BookOpen className="size-5 text-blue-600" />
              <Status>{status}</Status>
            </div>
            <h2 className="mt-8 font-bold leading-5">{title}</h2>
            <p className="mt-3 text-xs text-slate-500">Atualizado: {date}</p>
          </article>
        ))}
      </div>
    </Panel>
  );
}
function Integrations() {
  return (
    <>
      <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
        <strong>Configuração necessária.</strong> Conexões oficiais só podem ser ativadas após
        credenciais, homologação e autorização de cada órgão.
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {[
          [
            "DETRAN-SP",
            "Consultas veiculares, débitos e situação de veículos",
            "Aguardando credenciais",
          ],
          ["gov.br", "Autenticação e validação de identidade", "Não configurada"],
          ["CREVSP", "Serviços e registros de despachante", "Aguardando homologação"],
        ].map(([name, description, status]) => (
          <section key={name} className="rounded-lg border border-slate-200 bg-white p-6">
            <div className="flex items-start justify-between">
              <div className="grid size-11 place-items-center rounded-md bg-slate-100">
                <Settings className="size-5 text-slate-600" />
              </div>
              <Status>{status}</Status>
            </div>
            <h2 className="mt-5 text-lg font-bold">{name}</h2>
            <p className="mt-2 min-h-12 text-sm text-slate-500">{description}</p>
            <Button variant="outline" className="mt-6 w-full">
              Configurar integração
            </Button>
          </section>
        ))}
      </div>
    </>
  );
}
