import styles from '../styles/header.module.css'
import { Link } from 'react-router-dom'

export function Header({ page }) {

    const linkPage = page === 'Crear Producto' ? '/' : '/producto/nuevo'
    const linkName = page === 'Crear Producto' ? 'Volver al Dashboard' : '+ Añadir producto'

    return (
        <header className={styles.header}>
            <hgroup className={styles.hgroup}>
                <img className={styles.logo} src="/logo_app.png" alt="Logo de la cafeteria, taza de cafe combiando con el simbolo de React" />
                <h1 className={styles.title}>Café & Sabor - {page}</h1>
            </hgroup>

            <Link className={styles.link} to={linkPage}>{linkName}</Link>

        </header>


    )
}