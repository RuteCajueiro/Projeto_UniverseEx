"use client";
import React from "react";
import styles from "./modal.module.css";

export default function Modal({ isOpen, setOpen, text, onClose, children }) {
  if (!isOpen) return null;

  const fecharModal = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  return (
    <div className={styles.modalstyle}>
      <div className={styles.container}>
        <div className={styles.conteudo}>
          <div className={styles.text}>{text}</div>

          <button 
            onClick={fecharModal}  className={styles.closeButton}> X </button>

          {children}
        </div>
      </div>
    </div>
  );
}
