import React from "react";
import styles from './header.module.css';
import Link from "next/link";
import PesquisaApi from "../pesquisar/pesquisar";

export function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.leftContent}>
        <Link href="/" className={styles.logoLink}>
          <img className={styles.logimg} src="/assets/logo.img.png" alt="logo" />
        </Link>
      </div>
      <nav className={styles.nav}>
        <PesquisaApi />
        <Link href="/" className={styles.navLink}>
          Home
        </Link>
        <Link href="/quemsomos" className={styles.navLink}>
          Quem Somos
        </Link>
      </nav>
    </header>
  );
}