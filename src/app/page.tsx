
import CarrosselImagens from "@/components/carrossel/carrosselImagens";
import FooterPage from "@/components/footer/footerPage";
import GaleriaMars from "@/components/galeriadeimagens/galeria";
import { Header } from "@/components/header/header";
import FiltroApi from "@/components/filtro/filtroApi";
import PesquisaApi from "@/components/pesquisar/pesquisar";


export default function Home() {
  return (
    <main>
      <FiltroApi />
      <GaleriaMars />
    </main>
  );
}
