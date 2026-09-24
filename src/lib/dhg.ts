export const whatsapp = (phone: string, message: string) =>
  `https://wa.me/55${phone}?text=${encodeURIComponent(message)}`;

export const mainPhone = "11947836048";
export const mainWhatsapp = whatsapp(mainPhone, "Olá, DHG! Gostaria de informações sobre um serviço de documentação.");

export type ServiceKey = "documentacao-veicular" | "transferencia-de-veiculo" | "licenciamento" | "debitos-e-regularizacoes" | "cnh";

export const services = {
  "documentacao-veicular": {
    title: "Documentação Veicular",
    eyebrow: "Soluções para o seu veículo",
    summary: "Assessoria para conduzir processos documentais do seu veículo com orientação clara em cada etapa.",
    description: "Da primeira documentação às atualizações cadastrais, a DHG reúne em um só atendimento as orientações para emplacamento, licenciamento, segundas vias e alterações relacionadas ao veículo.",
    note: "A documentação necessária é definida conforme o veículo e o processo solicitado durante o atendimento.",
    items: ["Primeiro emplacamento", "Transferência de propriedade, estado ou município", "Licenciamento anual", "Segunda via do CRV e CRLV", "Alteração e atualização cadastral", "Bloqueio e desbloqueio de CRV", "Análise para compra e venda de veículos"],
  },
  "transferencia-de-veiculo": {
    title: "Transferência de Veículo",
    eyebrow: "Compra e venda",
    summary: "Orientação e acompanhamento para transferências de propriedade, estado ou município.",
    description: "Na compra, venda ou mudança de localidade, a equipe identifica o tipo de transferência, orienta a preparação dos documentos e acompanha as etapas aplicáveis à movimentação do veículo.",
    note: "Propriedade, município e estado envolvem procedimentos distintos; por isso, a análise começa pelo contexto da transferência.",
    items: ["Transferência de propriedade", "Transferência entre municípios", "Transferência entre estados", "Orientação documental", "Acompanhamento do processo"],
  },
  licenciamento: {
    title: "Licenciamento",
    eyebrow: "Regularidade veicular",
    summary: "Suporte para o licenciamento anual e orientação sobre pendências relacionadas.",
    description: "Para o licenciamento anual, a DHG ajuda a verificar a situação documental do veículo, identificar pendências relacionadas e orientar a emissão ou segunda via do CRLV.",
    note: "A verificação prévia ajuda a identificar o que precisa ser tratado antes da conclusão do licenciamento.",
    items: ["Licenciamento anual", "Orientação sobre documentação", "Verificação de pendências", "Segunda via do CRLV", "Acompanhamento do processo"],
  },
  "debitos-e-regularizacoes": {
    title: "Débitos e Regularizações",
    eyebrow: "Pendências documentais",
    summary: "Orientação para débitos, taxas e processos de regularização documental.",
    description: "A DHG analisa débitos, taxas e outras pendências documentais para indicar as possibilidades aplicáveis de pagamento, parcelamento, baixa ou regularização.",
    note: "Cada pendência possui origem e tratamento próprios. A equipe confirma os próximos passos após analisar a situação apresentada.",
    items: ["Pagamento e parcelamento de débitos", "Débitos online", "Apuração de impostos, taxas e emolumentos", "Pedido de baixa de débitos", "Regularização documental", "Processos relacionados a pendências"],
  },
  cnh: {
    title: "CNH",
    eyebrow: "Documentação do condutor",
    summary: "Suporte para renovação, segunda via e serviços documentais relacionados à habilitação.",
    description: "Para renovação, segunda via e demais demandas documentais ligadas à habilitação, a DHG orienta sobre os documentos e as etapas correspondentes ao serviço solicitado.",
    note: "O atendimento começa pela identificação da demanda relacionada à CNH para orientar o procedimento adequado.",
    items: ["Renovação de CNH", "Segunda via da CNH", "Orientação documental", "Serviços documentais relacionados"],
  },
} as const;

export type UnitKey = "carapicuiba" | "osasco-jardim-dabril" | "osasco-jardim-conceicao";
export const units: Record<UnitKey, { city: string; area: string; name: string; address: string; zip: string; phone: string; phoneHref: string; secondary?: string; rating: string }> = {
  carapicuiba: { city: "Carapicuíba", area: "Parque Santa Teresa", name: "DHG Despachante Carapicuíba", address: "R. Itajubá, 81 — Parque Santa Teresa", zip: "Carapicuíba - SP, CEP 06341-160", phone: "(11) 94783-6048", phoneHref: "11947836048", secondary: "(11) 4207-3543", rating: "5,0" },
  "osasco-jardim-dabril": { city: "Osasco", area: "Jardim D'Abril", name: "DHG Despachante JD D'Abril Osasco", address: "Av. Prestes Maia, 817 — Jardim D'Abril", zip: "Osasco - SP, CEP 06040-014", phone: "(11) 93245-5781", phoneHref: "11932455781", rating: "5,0" },
  "osasco-jardim-conceicao": { city: "Osasco", area: "Jardim Conceição", name: "DHG Despachante JD Conceição Osasco", address: "R. Pernambucana, 113 — Conceição", zip: "Osasco - SP, CEP 06140-040", phone: "(11) 97991-0132", phoneHref: "11979910132", rating: "5,0" },
};

export const mapUrl = (unit: (typeof units)[UnitKey]) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${unit.address}, ${unit.zip}`)}`;
