import vehicleImage from "@/assets/dhg-veiculo.jpg";
import { unitImages } from "@/lib/dhg-media";

export const posts = [
  {
    category: "Veículos",
    title: "Transferência de veículo: entenda como a orientação profissional ajuda",
    text: "Cada transferência possui características próprias. Saiba por que analisar a documentação antes de iniciar o processo.",
    to: "/servicos/transferencia-de-veiculo",
    image: vehicleImage,
    alt: "Profissional prestando assessoria para documentação de veículo",
  },
  {
    category: "Regularidade",
    title: "Licenciamento: documentos e pendências merecem atenção",
    text: "Uma visão geral sobre a importância de verificar o contexto documental do veículo antes de conduzir o licenciamento.",
    to: "/servicos/licenciamento",
    image: unitImages.carapicuiba,
    alt: "Fachada real da unidade DHG em Carapicuíba",
  },
  {
    category: "Empresas",
    title: "Organização documental também faz parte da operação",
    text: "Como o acompanhamento de documentos, vencimentos e protocolos contribui para rotinas empresariais mais organizadas.",
    to: "/empresas",
    image: unitImages["osasco-jardim-conceicao"],
    alt: "Fachada real da unidade DHG no Jardim Conceição",
  },
] as const;