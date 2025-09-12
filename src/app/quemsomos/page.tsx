'use client';

import CarrosselImagens from '@/components/carrossel/carrosselImagens';
import styles from './quemsomos.module.css';

export default function Page() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Quem Somos</h1>
        <div className={styles.content}>
          <section className={styles.section}>
            <h2>Nossa Missão</h2>
            <p>
              Somos apaixonados por exploração espacial e nossa missão é trazer as maravilhas 
              de Marte para mais perto de você.
            </p>
          </section>

          <section className={styles.section}>
            <h2>O Que Fazemos</h2>
            <p>
              Disponibilizamos uma plataforma intuitiva para explorar as fotografias mais 
              recentes de Marte.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Nossa Visão</h2>
            <p>
              Acreditamos que o conhecimento sobre o espaço deve ser acessível a todos.
            </p>
          </section>

          <CarrosselImagens/>
        </div>
      </main>
    </div>
  );
}
