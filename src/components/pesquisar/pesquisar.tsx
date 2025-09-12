"use client";
import { useState } from "react";
import styles from "./pesquisar.module.css";
import Modal from "../modal/modal";

type FotoMars = {
  id: number;
  img_src: string;
  earth_date: string;
  rover: { name: string };
  camera: { name: string; full_name: string };
};

export default function PesquisaApi() {
  const [fotos, setFotos] = useState<FotoMars[]>([]);
  const [termo, setTermo] = useState("");
  const [isOpen, setOpen] = useState(false);

  const handleFechar = () => setOpen(false);

const handleSearch = async () => {
  if (!termo.trim()) {
    window.alert("Por favor, preencha o campo antes de pesquisar!");
    return;
  }

  try {
    const search = termo.trim().toLowerCase();
    const rovers = ["curiosity", "opportunity", "spirit", "perseverance"];
    let fotosEncontradas: FotoMars[] = [];

    for (const rover of rovers) {
      const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&api_key=mnLpM4nFqncWePB6KTGCZvnfh82afjdDXhUS6iwt`;
      const res = await fetch(url);
      const data = await res.json();

      const filtradas = data.photos.filter((foto: FotoMars) => {
        const roverName = foto.rover.name.toLowerCase();
        const cameraName = foto.camera.name.toLowerCase();
        const cameraFullName = foto.camera.full_name.toLowerCase();
        const earthDate = foto.earth_date.toLowerCase();

        return (
          roverName.includes(search) ||
          cameraName.includes(search) ||
          cameraFullName.includes(search) ||
          earthDate.includes(search)
        );
      });

      fotosEncontradas = [...fotosEncontradas, ...filtradas];
    }

    setFotos(fotosEncontradas);
    setOpen(true);
  } catch (error) {
    console.error("Erro ao buscar:", error);
  }
};


  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <input
          type="text"
          className={styles.input}
          value={termo}
          onChange={(e) => setTermo(e.target.value)}
          placeholder="Pesquisar por Rover, Câmera ou Data..."
        />
        <button onClick={handleSearch} className={styles.button}>
          Pesquisar
        </button>
      </div>

      <Modal
        isOpen={isOpen}
        setOpen={setOpen}
        text="Fotos Selecionadas de Marte"
        onClose={handleFechar}
      >
        <div className={styles.resultsGrid}>
          {fotos.length > 0 ? (
            fotos.map((foto) => (
              <div key={foto.id} className={styles.card}>
                <img
                  src={foto.img_src.replace("http://", "https://")}
                  alt={foto.camera.full_name}
                  className={styles.img}
                />
                <div className={styles.meta}>
                  <strong>Rover:</strong> {foto.rover.name}
                  <strong>Câmera:</strong> {foto.camera.full_name}
                  <strong>Data:</strong> {foto.earth_date}
                </div>
              </div>
            ))
          ) : (
            <p className={styles.noResults}>Nenhuma imagem encontrada.</p>
          )}
        </div>
      </Modal>
    </div>
  );
}
