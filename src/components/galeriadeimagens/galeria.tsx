"use client";
import React, { useEffect, useState } from "react";
import styles from "./galeria.module.css"; 

type FotoMars = {
  id: number;
  img_src: string;
  earth_date: string;
  rover: {
    name: string;
  };
  camera: {
    full_name: string;
  };
};

export default function GaleriaMars() {
  const [todasFotos, setTodasFotos] = useState<FotoMars[]>([]);
  const [pagina, setPagina] = useState(1);
  const [carregando, setCarregando] = useState(false);
  const fotosPorPagina = 8;

  const fetchFotos = async () => {
    try {
      setCarregando(true);
   
      const sols = [1000, 2000, 3000, 4000];
      const todasPromises = sols.map(sol => 
        fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=mnLpM4nFqncWePB6KTGCZvnfh82afjdDXhUS6iwt`)
          .then(res => res.json())
      );

      const todosResultados = await Promise.all(todasPromises);
   
      const fotosUnicas = new Map();
      todosResultados.forEach(resultado => {
        resultado.photos.forEach((foto: FotoMars) => {
          if (!fotosUnicas.has(foto.id)) {
            fotosUnicas.set(foto.id, foto);
          }
        });
      });

      const fotosArray = Array.from(fotosUnicas.values());
      const fotosEmbaralhadas = fotosArray.sort(() => Math.random() - 0.5);
      
      setTodasFotos(fotosEmbaralhadas);
    } catch (err) {
      console.error("Erro ao carregar fotos do Mars Rover:", err);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    fetchFotos();
  }, []);

  const totalPaginas = Math.ceil(todasFotos.length / fotosPorPagina);
  const inicio = (pagina - 1) * fotosPorPagina;
  const fim = inicio + fotosPorPagina;
  const fotosPaginaAtual = todasFotos.slice(inicio, fim);

  const irParaPagina = (novaPagina: number) => {
    setPagina(novaPagina);
  };

  return (
    <section className={styles.galeria}>
      <h2>Galeria do Mars Rover</h2>
      <div className={styles.grid}>
        {carregando ? (
          <p>Carregando fotos do Mars Rover...</p>
        ) : fotosPaginaAtual.length > 0 ? (
          <div className={styles.gridContainer}>
            {fotosPaginaAtual.map((foto: FotoMars) => (
              <div key={foto.id} className={styles.card}>
                <img
                  src={foto.img_src.replace("http://", "https://")}
                  alt={`Foto do Rover ${foto.rover.name}`}
                  className={styles.imagem}
                  loading="lazy"
                />
                <div className={styles.info}>
                  <p><strong>Data:</strong> {foto.earth_date}</p>
                  <p><strong>Rover:</strong> {foto.rover.name}</p>
                  <p><strong>Câmera:</strong> {foto.camera.full_name}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Nenhuma foto encontrada.</p>
        )}
      </div>
      {!carregando && totalPaginas > 1 && (
        <div className={styles.paginacao}>
          <button 
            onClick={() => irParaPagina(pagina - 1)} 
            disabled={pagina === 1}
            className={styles.botaoPaginacao}
          >
            Anterior
          </button>
          <span className={styles.numeroPagina}>
            Página {pagina} de {totalPaginas}
          </span>
          <button 
            onClick={() => irParaPagina(pagina + 1)} 
            disabled={pagina === totalPaginas}
            className={styles.botaoPaginacao}
          >
            Próxima
          </button>
        </div>
      )}
    </section>
  );
}
