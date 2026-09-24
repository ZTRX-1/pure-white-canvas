import logoBlueAsset from "@/assets/dhg-logo-azul.png.asset.json";
import logoWhiteAsset from "@/assets/dhg-logo-branca.png.asset.json";
import carapicuibaAsset from "@/assets/fachada-carapicuiba.png.asset.json";
import jardimConceicaoAsset from "@/assets/fachada-jardim-conceicao.png.asset.json";
import jardimDabrilAsset from "@/assets/fachada-jardim-dabril.png.asset.json";
import type { UnitKey } from "@/lib/dhg";

export const dhgLogos = {
  blue: logoBlueAsset.url,
  white: logoWhiteAsset.url,
} as const;

export const unitImages: Record<UnitKey, string> = {
  carapicuiba: carapicuibaAsset.url,
  "osasco-jardim-dabril": jardimDabrilAsset.url,
  "osasco-jardim-conceicao": jardimConceicaoAsset.url,
};