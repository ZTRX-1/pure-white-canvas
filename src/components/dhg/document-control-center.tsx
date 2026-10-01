import { useState, type ReactNode } from "react";
import { AlertTriangle, Download, FileText, Plus, Search, Send, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  currentMockDate,
  documentMocks,
  documentTypes,
  type DocumentStatus,
  type ProcessDocument,
} from "@/lib/document-mocks";

const statusStyles: Record<DocumentStatus, string> = {
  Recebido: "bg-slate-100 text-slate-700",
  Pendente: "bg-amber-50 text-amber-800",
  "Em análise": "bg-blue-50 text-blue-700",
  Aprovado: "bg-emerald-50 text-emerald-700",
  Rejeitado: "bg-red-50 text-red-700",
  Vencendo: "bg-amber-100 text-amber-900",
  Vencido: "bg-red-100 text-red-800",
};

type Modal = "add" | "preview" | "replace" | "request" | null;
type DocumentFilters = { search: string; unit: string; status: string; type: string; validity: string };

function StatusBadge({ status }: { status: DocumentStatus }) {
  return (
    <span className={`inline-flex rounded-md px-2 py-1 text-xs font-bold ${statusStyles[status]}`}>
      {status}
    </span>
  );
}

function Validity({ document }: { document: ProcessDocument }) {
  if (!document.expires_at) return <span className="text-slate-400">Sem validade</span>;
  if (document.status === "Vencido")
    return (
      <span className="inline-flex items-center gap-1.5 font-semibold text-red-700">
        <span className="size-2 rounded-full bg-red-500" />
        Vencido há 3 dias
      </span>
    );
  if (document.status === "Vencendo")
    return (
      <span className="inline-flex items-center gap-1.5 font-semibold text-amber-800">
        <AlertTriangle className="size-3.5" />
        Vence em {document.expires_at === "25/09/2026" ? "1 dia" : "5 dias"}
      </span>
    );
  return <span className="text-slate-600">Válido até {document.expires_at}</span>;
}

function Filters({ onChange }: { onChange: (filters: DocumentFilters) => void }) {
  const [filters, setFilters] = useState({
    search: "",
    unit: "Todas",
    status: "Todos",
    type: "Todos",
    validity: "Todos",
  });
  const update = (key: string, value: string) => {
    const next = { ...filters, [key]: value };
    setFilters(next);
    onChange(next);
  };
  return (
    <div className="mb-5 grid gap-3 rounded-lg border border-slate-200 bg-white p-4 lg:grid-cols-[minmax(230px,1.5fr)_repeat(4,minmax(130px,1fr))]">
      <label className="relative block">
        <span className="sr-only">Buscar documento, cliente, placa ou processo</span>
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <Input
          value={filters.search}
          onChange={(event) => update("search", event.target.value)}
          placeholder="Documento, cliente, placa ou processo"
          className="h-10 border-slate-200 pl-9"
        />
      </label>
      <FilterSelect
        label="Unidade"
        value={filters.unit}
        onChange={(value) => update("unit", value)}
        options={["Todas", "Carapicuíba", "Jardim D'Abril", "Jardim Conceição"]}
      />
      <FilterSelect
        label="Status"
        value={filters.status}
        onChange={(value) => update("status", value)}
        options={[
          "Todos",
          "Recebido",
          "Pendente",
          "Em análise",
          "Aprovado",
          "Rejeitado",
          "Vencendo",
          "Vencido",
        ]}
      />
      <FilterSelect
        label="Tipo"
        value={filters.type}
        onChange={(value) => update("type", value)}
        options={["Todos", ...documentTypes]}
      />
      <FilterSelect
        label="Validade"
        value={filters.validity}
        onChange={(value) => update("validity", value)}
        options={["Todos", "Sem validade", "Válidos", "Vencendo em até 30 dias", "Vencidos"]}
      />
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-1 text-xs font-semibold text-slate-500">
      <span>{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

export function DocumentControlCenter() {
  const [documents, setDocuments] = useState(documentMocks);
  const [filtered, setFiltered] = useState(documentMocks);
  const [selected, setSelected] = useState<ProcessDocument | null>(null);
  const [modal, setModal] = useState<Modal>(null);
  const applyFilters = (filters: DocumentFilters) => {
    const search = filters.search.toLowerCase();
    setFiltered(
      documents.filter((document) => {
        const matchesSearch =
          !search ||
          [
            document.file_name,
            document.client,
            document.process,
            document.vehicle,
            document.document_type,
          ]
            .join(" ")
            .toLowerCase()
            .includes(search);
        const matchesUnit = filters.unit === "Todas" || document.unit_id === filters.unit;
        const matchesStatus = filters.status === "Todos" || document.status === filters.status;
        const matchesType = filters.type === "Todos" || document.document_type === filters.type;
        const matchesValidity =
          filters.validity === "Todos" ||
          (filters.validity === "Sem validade" && !document.expires_at) ||
          (filters.validity === "Válidos" &&
            !!document.expires_at &&
            !["Vencendo", "Vencido"].includes(document.status)) ||
          (filters.validity === "Vencendo em até 30 dias" && document.status === "Vencendo") ||
          (filters.validity === "Vencidos" && document.status === "Vencido");
        return matchesSearch && matchesUnit && matchesStatus && matchesType && matchesValidity;
      }),
    );
  };
  const addDocument = () => {
    const document: ProcessDocument = {
      id: `doc-${Date.now()}`,
      process_id: "DHG-00124",
      client_id: "cli-001",
      vehicle_id: "veh-001",
      unit_id: "Carapicuíba",
      client: "João da Silva",
      process: "#DHG-00124",
      process_type: "Transferência de propriedade",
      vehicle: "Honda Civic - ABC1D23",
      document_type: "Outros",
      file_name: "novo-documento.pdf",
      file_type: "PDF",
      file_size: "1,0 MB",
      status: "Recebido",
      received_at: currentMockDate,
      version: 1,
    };
    setDocuments((current) => [document, ...current]);
    setFiltered((current) => [document, ...current]);
    setModal(null);
  };
  const counts = {
    received: documents.filter((document) => document.received_at).length,
    pending: documents.filter((document) => document.status === "Pendente").length,
    expiring: documents.filter((document) => document.status === "Vencendo").length,
    expired: documents.filter((document) => document.status === "Vencido").length,
  };
  return (
    <>
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
            Painel interno
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 lg:text-3xl">
            Documentos
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Gerencie documentos recebidos, pendências e validades dos processos.
          </p>
        </div>
        <Button onClick={() => setModal("add")} className="gap-2 bg-blue-600 hover:bg-blue-700">
          <Plus className="size-4" />
          Adicionar documento
        </Button>
      </div>
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Documentos recebidos" value={counts.received} tone="blue" />
        <Metric label="Documentos pendentes" value={counts.pending} tone="amber" />
        <Metric label="Próximos do vencimento" value={counts.expiring} tone="amber" />
        <Metric label="Vencidos" value={counts.expired} tone="red" />
      </div>
      <Filters onChange={applyFilters} />
      <DocumentList
        documents={filtered}
        onOpen={(document, mode) => {
          setSelected(document);
          setModal(mode);
        }}
      />
      <DocumentSheet
        document={selected}
        open={!!selected && modal === null}
        onOpenChange={(open) => !open && setSelected(null)}
        onPreview={() => setModal("preview")}
        onReplace={() => setModal("replace")}
      />
      <DocumentDialog
        mode={modal}
        document={selected}
        onClose={() => setModal(null)}
        onAdd={addDocument}
      />
    </>
  );
}

function Metric({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "blue" | "amber" | "red";
}) {
  const tones = { blue: "bg-blue-600", amber: "bg-amber-500", red: "bg-red-500" };
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <span className={`size-2 rounded-full ${tones[tone]}`} />
      </div>
      <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function DocumentList({
  documents,
  onOpen,
}: {
  documents: ProcessDocument[];
  onOpen: (document: ProcessDocument, mode: Modal) => void;
}) {
  if (!documents.length)
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <FileText className="mx-auto size-8 text-slate-300" />
        <h2 className="mt-3 font-bold">Nenhum documento encontrado</h2>
        <p className="mt-1 text-sm text-slate-500">
          Ajuste os filtros ou adicione o primeiro documento deste processo.
        </p>
      </div>
    );
  return (
    <section className="rounded-lg border border-slate-200 bg-white">
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[1120px] text-left text-sm">
          <thead className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-5 py-3 font-semibold">Documento</th>
              <th className="px-3 py-3 font-semibold">Cliente / processo</th>
              <th className="px-3 py-3 font-semibold">Veículo</th>
              <th className="px-3 py-3 font-semibold">Tipo</th>
              <th className="px-3 py-3 font-semibold">Status</th>
              <th className="px-3 py-3 font-semibold">Validade</th>
              <th className="px-3 py-3 font-semibold">Recebido em</th>
              <th className="px-3 py-3 font-semibold">Conferido por</th>
              <th className="px-5 py-3 font-semibold">Ação</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((document) => (
              <tr
                key={document.id}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
              >
                <td className="px-5 py-4">
                  <button
                    onClick={() => onOpen(document, null)}
                    className="text-left font-semibold text-slate-800 hover:text-blue-700"
                  >
                    {document.file_name}
                  </button>
                  <p className="mt-0.5 text-xs text-slate-400">
                    v{document.version || 1} · {document.file_type} · {document.file_size}
                  </p>
                </td>
                <td className="px-3 py-4">
                  <p className="font-medium text-slate-700">{document.client}</p>
                  <p className="text-xs text-slate-500">{document.process}</p>
                </td>
                <td className="px-3 py-4 text-slate-600">{document.vehicle ?? "-"}</td>
                <td className="px-3 py-4 text-slate-600">{document.document_type}</td>
                <td className="px-3 py-4">
                  <StatusBadge status={document.status} />
                </td>
                <td className="px-3 py-4 text-xs">
                  <Validity document={document} />
                </td>
                <td className="px-3 py-4 text-slate-600">{document.received_at ?? "-"}</td>
                <td className="px-3 py-4 text-slate-600">{document.reviewed_by ?? "-"}</td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onOpen(document, "preview")}
                      className="text-xs font-bold text-blue-600"
                    >
                      Visualizar
                    </button>
                    <button
                      onClick={() => onOpen(document, "replace")}
                      className="text-xs font-bold text-slate-600"
                    >
                      Substituir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid divide-y divide-slate-100 lg:hidden">
        {documents.map((document) => (
          <button
            key={document.id}
            onClick={() => onOpen(document, null)}
            className="p-4 text-left"
          >
            <div className="flex justify-between gap-3">
              <div>
                <p className="font-semibold">{document.file_name}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {document.client} · {document.process}
                </p>
              </div>
              <StatusBadge status={document.status} />
            </div>
            <div className="mt-3 flex justify-between text-xs">
              <span className="text-slate-500">{document.vehicle ?? document.document_type}</span>
              <Validity document={document} />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function DocumentSheet({
  document,
  open,
  onOpenChange,
  onPreview,
  onReplace,
}: {
  document: ProcessDocument | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPreview: () => void;
  onReplace: () => void;
}) {
  if (!document) return null;
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto p-6 sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{document.document_type}</SheetTitle>
          <SheetDescription>{document.file_name}</SheetDescription>
        </SheetHeader>
        <div className="mt-7 space-y-5 text-sm">
          <Detail label="Cliente" value={document.client} />
          <Detail label="Processo" value={`${document.process} · ${document.process_type}`} />
          <Detail label="Veículo" value={document.vehicle ?? "Não aplicável"} />
          <Detail label="Unidade" value={document.unit_id} />
          <Detail label="Status" value={<StatusBadge status={document.status} />} />
          <Detail label="Recebido em" value={document.received_at ?? "Ainda não recebido"} />
          <Detail label="Validade" value={<Validity document={document} />} />
          <Detail
            label="Conferido por"
            value={
              document.reviewed_by
                ? `${document.reviewed_by} em ${document.reviewed_at}`
                : "Aguardando conferência"
            }
          />
          <Detail label="Observações" value={document.notes ?? "Sem observações."} />
          <div className="border-t border-slate-100 pt-5">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Histórico</p>
            <div className="mt-3 space-y-3 text-slate-600">
              <p>{document.received_at ?? currentMockDate} · Documento anexado ao processo</p>
              {document.reviewed_at && (
                <p>
                  {document.reviewed_at} · Documento conferido por {document.reviewed_by}
                </p>
              )}
              <p>{currentMockDate} · Documento visualizado pela equipe</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-5">
            <Button onClick={onPreview} className="gap-2 bg-blue-600 hover:bg-blue-700">
              <FileText className="size-4" />
              Visualizar documento
            </Button>
            <Button variant="outline" onClick={onReplace}>
              Substituir
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
function Detail({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</p>
      <div className="mt-1 font-medium text-slate-700">{value}</div>
    </div>
  );
}

function DocumentDialog({
  mode,
  document,
  onClose,
  onAdd,
}: {
  mode: Modal;
  document: ProcessDocument | null;
  onClose: () => void;
  onAdd: () => void;
}) {
  const title =
    mode === "add"
      ? "Adicionar documento"
      : mode === "preview"
        ? "Visualizar documento"
        : mode === "replace"
          ? "Substituir documento"
          : mode === "request"
            ? "Solicitar documentos ao cliente"
            : "";
  return (
    <Dialog open={mode !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto border-slate-200 bg-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {mode === "add"
              ? "Simulação local: o arquivo será associado ao processo apenas nesta sessão."
              : document?.file_name}
          </DialogDescription>
        </DialogHeader>
        {mode === "add" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Cliente" value="João da Silva" />
            <Field label="Processo" value="#DHG-00124" />
            <Field label="Veículo" value="Honda Civic - ABC1D23" />
            <Field label="Tipo de documento" value="Outros" select />
            <Field label="Arquivo" value="novo-documento.pdf" />
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <input type="checkbox" /> Possui validade?
            </label>
            <Field label="Data de validade" value="" />
            <label className="grid gap-1 text-sm font-medium text-slate-700 sm:col-span-2">
              Observações
              <textarea
                className="min-h-20 rounded-md border border-slate-200 p-3 font-normal outline-none focus:border-blue-500"
                placeholder="Observações internas"
              />
            </label>
          </div>
        )}
        {mode === "preview" && document && (
          <div className="grid min-h-72 place-items-center rounded-lg border border-slate-200 bg-slate-50 text-center">
            <FileText className="size-12 text-red-500" />
            <div>
              <p className="font-bold">Prévia simulada do arquivo</p>
              <p className="mt-1 text-sm text-slate-500">
                {document.file_name} · {document.file_type} · {document.file_size} · enviado em{" "}
                {document.received_at ?? "-"}
              </p>
            </div>
          </div>
        )}
        {mode === "replace" && document && (
          <div className="space-y-4">
            <div className="rounded-md bg-slate-50 p-4 text-sm">
              <p className="font-semibold">Versão atual: {document.version || 1}</p>
              <p className="mt-1 text-slate-500">
                Recebido em {document.received_at ?? "-"}. A versão anterior permanecerá no
                histórico.
              </p>
            </div>
            <Field
              label="Novo arquivo"
              value={`${document.document_type.toLowerCase()}-atualizado.pdf`}
            />
            <label className="grid gap-1 text-sm font-medium text-slate-700">
              Motivo
              <textarea
                className="min-h-20 rounded-md border border-slate-200 p-3 font-normal outline-none focus:border-blue-500"
                defaultValue="Documento atualizado enviado pelo cliente."
              />
            </label>
          </div>
        )}
        <DialogFooter>
          {mode === "add" ? (
            <Button onClick={onAdd} className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Upload className="size-4" />
              Adicionar documento
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={onClose}>
                Fechar
              </Button>
              {mode === "preview" && (
                <Button onClick={onClose} className="gap-2 bg-blue-600 hover:bg-blue-700">
                  <Download className="size-4" />
                  Baixar
                </Button>
              )}
              {mode === "replace" && (
                <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700">
                  Criar versão {document ? document.version + 1 : 2}
                </Button>
              )}
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
function Field({ label, value, select }: { label: string; value: string; select?: boolean }) {
  return (
    <label className="grid gap-1 text-sm font-medium text-slate-700">
      <span>{label}</span>
      {select ? (
        <select
          defaultValue={value}
          className="h-10 rounded-md border border-slate-200 bg-white px-3 font-normal outline-none focus:border-blue-500"
        >
          {documentTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      ) : (
        <Input defaultValue={value} className="border-slate-200" />
      )}
    </label>
  );
}

export function ProcessDocuments({ processId }: { processId: string }) {
  const documents = documentMocks.filter((document) => document.process_id === processId);
  const [requestOpen, setRequestOpen] = useState(false);
  const pending = documents.filter((document) => document.status === "Pendente").length;
  const approved = documents.filter((document) => document.status === "Aprovado").length;
  const expiring = documents.filter((document) => document.status === "Vencendo").length;
  const process = documents[0];
  if (!process)
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <FileText className="mx-auto size-8 text-slate-300" />
        <h1 className="mt-3 text-xl font-bold">Processo sem documentos</h1>
        <p className="mt-1 text-sm text-slate-500">Este processo ainda não possui documentos.</p>
        <Button className="mt-5 gap-2 bg-blue-600 hover:bg-blue-700">
          <Plus className="size-4" />
          Adicionar primeiro documento
        </Button>
      </div>
    );
  return (
    <>
      <div className="mb-7">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
          Processos / {process.process}
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
          {process.process_type}
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          {process.client}
          {process.vehicle ? ` · ${process.vehicle}` : ""}
        </p>
      </div>
      <div className="mb-5 flex border-b border-slate-200">
        <span className="border-b-2 border-blue-600 px-4 py-3 text-sm font-bold text-blue-700">
          Documentos
        </span>
      </div>
      <section className="rounded-lg border border-slate-200 bg-white p-5 lg:p-6">
        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-bold">Checklist documental</h2>
            <p className="mt-1 text-sm text-slate-500">Estrutura de acompanhamento do processo.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setRequestOpen(true)}>
              Solicitar documentos
            </Button>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Plus className="size-4" />
              Adicionar documento
            </Button>
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {documents.map((document) => (
            <div key={document.id} className="flex items-center justify-between gap-4 py-4">
              <div>
                <p className="font-semibold text-slate-800">{document.document_type}</p>
                <p className="mt-1 text-xs text-slate-500">{document.file_name}</p>
              </div>
              <div className="text-right">
                <StatusBadge status={document.status} />
                <p className="mt-1 text-xs">
                  <Validity document={document} />
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 grid gap-3 border-t border-slate-100 pt-5 text-sm sm:grid-cols-4">
          <p>
            <strong>{documents.length}</strong> documentos
          </p>
          <p>
            <strong>{approved}</strong> aprovados
          </p>
          <p>
            <strong>{pending}</strong> pendente{pending === 1 ? "" : "s"}
          </p>
          <p>
            <strong>{expiring}</strong> próximo do vencimento
          </p>
        </div>
      </section>
      <RequestDialog
        open={requestOpen}
        onClose={() => setRequestOpen(false)}
        client={process.client}
        pending={documents
          .filter((document) => document.status === "Pendente")
          .map((document) => document.document_type)}
      />
    </>
  );
}
function RequestDialog({
  open,
  onClose,
  client,
  pending,
}: {
  open: boolean;
  onClose: () => void;
  client: string;
  pending: string[];
}) {
  const list = pending.length ? pending : ["ATPV-e", "Procuração"];
  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent className="border-slate-200 bg-white">
        <DialogHeader>
          <DialogTitle>Solicitar documentos ao cliente</DialogTitle>
          <DialogDescription>Cliente: {client}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <div>
            {list.map((item) => (
              <label key={item} className="flex gap-2 py-1">
                <input type="checkbox" defaultChecked /> {item}
              </label>
            ))}
          </div>
          <textarea
            readOnly
            className="min-h-44 w-full rounded-md border border-slate-200 bg-slate-50 p-3 leading-6 text-slate-600"
            value={`Olá, ${client}. Para darmos continuidade ao seu processo, precisamos receber os seguintes documentos:\n\n${list.map((item) => `• ${item}`).join("\n")}\n\nAssim que recebermos, daremos continuidade ao atendimento.\n\nDHG Despachante.`}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Copiar mensagem
          </Button>
          <Button onClick={onClose} className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Send className="size-4" />
            Enviar pelo WhatsApp
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
