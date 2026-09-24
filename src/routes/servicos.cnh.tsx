import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetail } from "@/components/dhg/page-elements";
export const Route = createFileRoute("/servicos/cnh")({
  head: () => ({
    meta: [
      { title: "Serviços para CNH | DHG Despachante" },
      {
        name: "description",
        content: "Orientação para renovação, segunda via e documentação relacionada à CNH.",
      },
      { property: "og:title", content: "CNH | DHG Despachante" },
      {
        property: "og:description",
        content: "Suporte para documentação relacionada à habilitação.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ServiceDetail serviceKey="cnh" />,
});
