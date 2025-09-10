import styles from './footer.module.css';

export default function Footer() {
  return (
    <div >
        <footer className={styles.container} >
              <div className={styles.textFooter}>
                 <p>© 2025 Universo Visual. Imagens fornecidas pela NASA.</p>
               </div>
        </footer>
    </div>

  )
}
;