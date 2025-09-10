"use client";
import { useEffect, useState } from "react";
import styles from "./filtro.module.css";

type FotoMars = {
  id: number;
  img_src: string;
  earth_date: string;
  rover: { name: string };
  camera: { name: string; full_name: string };
};

export default function FiltroApi() {
  const rovers = ["Curiosity", "Opportunity", "Spirit"];
  const [cameras, setCameras] = useState<string[]>([]);
  const [selectedRover, setSelectedRover] = useState<string>(rovers[0]);
  const [selectedCamera, setSelectedCamera] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [fotos, setFotos] = useState<FotoMars[]>([]);

  // Atualiza as câmeras disponíveis quando mudar o rover
  useEffect(() => {
    const roverCameras: { [key: string]: string[] } = {
      Curiosity: ["FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHLI", "MARDI", "NAVCAM"],
      Opportunity: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
      Spirit: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
    };
    setCameras(roverCameras[selectedRover]);
    setSelectedCamera(""); // resetar câmera
  }, [selectedRover]);

  // Buscar fotos com base nos filtros
  const buscarFotos = async () => {
    try {
      let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${selectedRover.toLowerCase()}/photos?api_key=mnLpM4nFqncWePB6KTGCZvnfh82afjdDXhUS6iwt`;
      if (selectedDate) url += `&earth_date=${selectedDate}`;
      if (selectedCamera) url += `&camera=${selectedCamera}`;

      const res = await fetch(url);
      const data = await res.json();
      setFotos(data.photos.slice(0, 10)); // pega as 10 primeiras fotos
    } catch (err) {
      console.error("Erro ao buscar fotos:", err);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Filtrar Imagens do Mars Rover</h2>

      <div className={styles.filtros}>
        {/* Selecionar Rover */}
        <div>
          <label>Rover:</label>
          <select
            value={selectedRover}
            onChange={(e) => setSelectedRover(e.target.value)}
          >
            {rovers.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Selecionar Câmera */}
        <div>
          <label>Câmera:</label>
          <select
            value={selectedCamera}
            onChange={(e) => setSelectedCamera(e.target.value)}
          >
            <option value="">Todas</option>
            {cameras.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Selecionar Data */}
        <div>
          <label>Data (Terrestre):</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <button onClick={buscarFotos}>Buscar Fotos</button>
      </div>

      <div className={styles.galeria}>
        {fotos.length > 0 ? (
          fotos.map((foto) => (
            <div key={foto.id} className={styles.card}>
              <img
                src={foto.img_src.replace("http://", "https://")}
                alt={`Foto do Rover ${foto.rover.name}`}
                className={styles.imagem}
              />
              <div className={styles.info}>
                <p  className={styles.textColor}><strong>Data:</strong> {foto.earth_date}</p>
                <p className={styles.textColor}><strong>Rover:</strong> {foto.rover.name}</p>
                <p className={styles.textColor}><strong>Câmera:</strong> {foto.camera.full_name}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhuma foto encontrada.</p>
        )}
      </div>
    </div>
  );
}
