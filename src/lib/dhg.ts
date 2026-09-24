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
    description: "Da primeira documentação às atualizações cadastrais, a DHG analisa cada necessidade e orienta você sobre os documentos e etapas aplicáveis ao processo.",
    items: ["Primeiro emplacamento", "Transferência de propriedade, estado ou município", "Licenciamento anual", "Segunda via do CRV e CRLV", "Alteração e atualização cadastral", "Bloqueio e desbloqueio de CRV", "Análise para compra e venda de veículos"],
  },
  "transferencia-de-veiculo": {
    title: "Transferência de Veículo",
    eyebrow: "Compra e venda",
    summary: "Orientação e acompanhamento para transferências de propriedade, estado ou município.",
    description: "A equipe entende as características da transferência, orienta sobre a documentação necessária e acompanha o processo de acordo com o seu caso.",
    items: ["Transferência de propriedade", "Transferência entre municípios", "Transferência entre estados", "Orientação documental", "Acompanhamento do processo"],
  },
  licenciamento: {
    title: "Licenciamento",
    eyebrow: "Regularidade veicular",
    summary: "Suporte para o licenciamento anual e orientação sobre pendências relacionadas.",
    description: "A DHG ajuda a verificar o contexto documental do veículo e orienta você para conduzir o licenciamento e tratar eventuais pendências.",
    items: ["Licenciamento anual", "Orientação sobre documentação", "Verificação de pendências", "Segunda via do CRLV", "Acompanhamento do processo"],
  },
  "debitos-e-regularizacoes": {
    title: "Débitos e Regularizações",
    eyebrow: "Pendências documentais",
    summary: "Orientação para débitos, taxas e processos de regularização documental.",
    description: "Cada pendência exige uma análise cuidadosa. A DHG identifica a necessidade, orienta sobre os próximos passos e acompanha os processos aplicáveis.",
    items: ["Pagamento e parcelamento de débitos", "Débitos online", "Apuração de impostos, taxas e emolumentos", "Pedido de baixa de débitos", "Regularização documental", "Processos relacionados a pendências"],
  },
  cnh: {
    title: "CNH",
    eyebrow: "Documentação do condutor",
    summary: "Suporte para renovação, segunda via e serviços documentais relacionados à habilitação.",
    description: "Conte com orientação para identificar documentos e etapas relacionados à sua CNH, sempre de acordo com a necessidade apresentada.",
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
