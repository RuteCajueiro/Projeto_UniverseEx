import "./globals.css";
import { Header } from "../components/header/header";
import Footer from "../components/footer/footerPage";

export const metadata = {
  title: "UniverseEx",
};

export default function Layout({ children }) {
  return (
    <html lang="pt-br">
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
