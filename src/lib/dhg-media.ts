import logoBlue from "@/assets/dhg-logo-azul.png";
import logoWhite from "@/assets/dhg-logo-branca.png";
import carapicuiba from "@/assets/fachada-carapicuiba.png";
import jardimConceicao from "@/assets/fachada-jardim-conceicao.png";
import jardimDabril from "@/assets/fachada-jardim-dabril.png";
import type { UnitKey } from "@/lib/dhg";

export const dhgLogos = {
  blue: logoBlue,
  white: logoWhite,
} as const;

export const unitImages: Record<UnitKey, string> = {
  carapicuiba,
  "osasco-jardim-dabril": jardimDabril,
  "osasco-jardim-conceicao": jardimConceicao,
};
