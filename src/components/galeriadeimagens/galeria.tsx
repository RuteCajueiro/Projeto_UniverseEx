"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
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
  const [fotos, setFotos] = useState<FotoMars[]>([]);

  useEffect(() => {
    const fetchFotos = async () => {
      try {
        const res = await fetch(
          "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=mnLpM4nFqncWePB6KTGCZvnfh82afjdDXhUS6iwt"
        );
        const data = await res.json();
        setFotos(data.photos.slice(0, 10));
      } catch (err) {
        console.error("Erro ao carregar fotos do Mars Rover:", err);
      }
    };

    fetchFotos();
  }, []);

  return (
    <section className={styles.galeria}>
      <h2>Galeria do Mars Rover</h2>
      <div className={styles.grid}>
        {fotos.length > 0 ? (
          fotos.map((foto) => (
            <div key={foto.id} className={styles.card}>
              <Image
                src={foto.img_src.replace("http://", "https://")}
                alt={`Foto do Rover ${foto.rover.name}`}
                width={400}
                height={300}
                className={styles.imagem}
              />
              <div className={styles.info}>
                <p><strong>Data:</strong> {foto.earth_date}</p>
                <p><strong>Rover:</strong> {foto.rover.name}</p>
                <p><strong>Câmera:</strong> {foto.camera.full_name}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Carregando fotos do Mars Rover...</p>
        )}
      </div>
    </section>
  );
}
