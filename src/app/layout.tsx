
import "./globals.css";
import { Header } from "../components/header/header";
import Carrossel from "../components/carrossel/carrosselImagens";
import Footer from "../components/footer/footerPage";
import Filtro from "../components/filtro/filtroApi";
import Galeriadeimagens from "../components/galeriadeimagens/galeria";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`antialiased`}
      >
        <Header />
        <Filtro />
        <Galeriadeimagens />
        <Carrossel />
        {children}
        <Footer />

      
      </body>
    </html>
  );
}
