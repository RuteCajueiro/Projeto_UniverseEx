import React from "react";
import styles from './header.module.css';

export function Header() {
  
  return (
    <header className={styles.container}>
      <img className={styles.logimg} src="assets/logo.img.png" alt="logo" />
      <h1 className={styles.title}>UniverseEx 🚀</h1>

    </header>
  );
}