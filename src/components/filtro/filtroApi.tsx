"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./filtro.module.css";
import Modal from "../modal/modal";
import modalStyles from "../modal/modal.module.css";

type FotoMars = {
  id: number;
  img_src: string;
  earth_date: string;
  rover: { name: string };
  camera: { name: string; full_name: string };
};

export default function FiltroApi() {
  const router = useRouter();

  const [rovers, setRovers] = useState<string[]>([]);
  const [cameras, setCameras] = useState<string[]>([]);
  const [selectedRover, setSelectedRover] = useState<string>("");
  const [selectedCamera, setSelectedCamera] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [fotos, setFotos] = useState<FotoMars[]>([]);
  const [isOpen, setOpen] = useState(false);

  const handleFechar = () => {
    setOpen(false);
  
  };

  useEffect(() => {
    const carregarRovers = async () => {
      const data = await buscarRovers();
      if (data) {
        const nomes = data.map((r: { name: string }) => r.name);
        setRovers(nomes);
        setSelectedRover(nomes[0]);
      }
    };
    carregarRovers();
  }, []);

  const buscarCamerasDoRover = async (roverName: string) => {
    try {
      const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName.toLowerCase()}?api_key=mnLpM4nFqncWePB6KTGCZvnfh82afjdDXhUS6iwt`;
      const res = await fetch(url);
      const data = await res.json();
      return data.rover.cameras.map((camera: { name: string }) => camera.name);
    } catch (err) {
      console.error("Erro ao buscar câmeras:", err);
      return [];
    }
  };

  useEffect(() => {
    if (selectedRover) {
      const carregarCameras = async () => {
        const camerasDisponiveis = await buscarCamerasDoRover(selectedRover);
        setCameras(camerasDisponiveis);
        setSelectedCamera("");
      };
      carregarCameras();
    }
  }, [selectedRover]);

  const buscarFotos = async () => {
    try {
      let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${selectedRover.toLowerCase()}/photos?api_key=mnLpM4nFqncWePB6KTGCZvnfh82afjdDXhUS6iwt`;
      if (selectedDate) url += `&earth_date=${selectedDate}`;
      if (selectedCamera) url += `&camera=${selectedCamera}`;

      const res = await fetch(url);
      const data = await res.json();
      setFotos(data.photos.slice(0, 10));
    } catch (err) {
      console.error("Erro ao buscar fotos:", err);
    }
  };

  const buscarRovers = async () => {
    try {
      let url = `https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=mnLpM4nFqncWePB6KTGCZvnfh82afjdDXhUS6iwt`;
      const res = await fetch(url);
      const data = await res.json();
      return data.rovers;
    } catch (err) {
      console.error("Erro ao buscar rovers:", err);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Filtrar Imagens do Mars Rover</h2>

      <div className={styles.filtros}>
        <div className={styles.inputGroup}>
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

        <div className={styles.inputGroup}>
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

        <div className={styles.inputGroup}>
          <label>Data (Terrestre):</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

       <button
                onClick={async () => {
                  
                  if (!selectedRover && !selectedCamera && !selectedDate) {
                    window.alert("Por favor, selecione ao menos um filtro antes de buscar!");
                    return;
                  }

                  await buscarFotos();
                  setOpen(true);
                }}
                className={styles.button}
              >
                  Buscar Fotos
       </button>


        <Modal
          isOpen={isOpen}
          setOpen={setOpen}
          text="Fotos Selecionadas de Marte"
          onClose={handleFechar}
        >
          <div className={modalStyles.modalGaleria}>
            {fotos.length > 0 ? (
              fotos.map((foto) => (
                <div key={foto.id} className={modalStyles.modalCard}>
                  <img
                    src={foto.img_src.replace("http://", "https://")}
                    alt={`Foto do Rover ${foto.rover.name}`}
                    className={modalStyles.modalImagem}
                  />
                  <div className={modalStyles.modalInfo}>
                    <p>
                      <strong>Data:</strong> {foto.earth_date}
                    </p>
                    <p>
                      <strong>Rover:</strong> {foto.rover.name}
                    </p>
                    <p>
                      <strong>Câmera:</strong> {foto.camera.full_name}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>Nenhum registro fotográfico disponível para os critérios selecionados.</p>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
}