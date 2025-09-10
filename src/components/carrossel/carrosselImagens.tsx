"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import styles from "./carrosselImagens.module.css";

export default function CarrosselImagens() {
  const carrosselSlide = useRef<HTMLDivElement>(null);
  const [imagens, setImagens] = useState<string[]>([]);
  const [slideAtual, setSlideAtual] = useState(0);

  // 🔹 Buscar imagens do Mars Rover
  useEffect(() => {
    const fetchImagens = async () => {
      try {
        const res = await fetch(
          "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=mnLpM4nFqncWePB6KTGCZvnfh82afjdDXhUS6iwt"
        );
        const data = await res.json();

        // Pegar apenas as primeiras 7 imagens e trocar http -> https
        const urls = data.photos
          .slice(0, 7)
          .map((photo: any) => photo.img_src.replace("http://", "https://"));

        setImagens(urls);
      } catch (err) {
        console.error("Erro ao carregar imagens do Mars Rover:", err);
      }
    };

    fetchImagens();
  }, []);

  const totalSlides = imagens.length;

  const mudarSlide = (direcao: number) => {
    if (totalSlides === 0) return;
    let novoSlide = slideAtual + direcao;
    if (novoSlide < 0) novoSlide = totalSlides - 1;
    if (novoSlide >= totalSlides) novoSlide = 0;
    setSlideAtual(novoSlide);
    if (carrosselSlide.current) {
      carrosselSlide.current.style.transform = `translateX(-${novoSlide * 100}%)`;
    }
  };

  return (
    <div className={styles["carrossel-container"]}>
      <div
        className={styles["carrossel-slide"]}
        ref={carrosselSlide}
        style={{ width: `${totalSlides * 100}%` }}
      >
        {imagens.length > 0 ? (
          imagens.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Foto de Marte ${index + 1}`}
              width={600}
              height={400}
            />
          ))
        ) : (
          <p>Carregando imagens do Mars Rover...</p>
        )}
      </div>

      <button
        className={`${styles.botao} ${styles.anterior}`}
        onClick={() => mudarSlide(-1)}
      >
        &#10094;
      </button>
      <button
        className={`${styles.botao} ${styles.proximo}`}
        onClick={() => mudarSlide(1)}
      >
        &#10095;
      </button>
    </div>
  );
}
