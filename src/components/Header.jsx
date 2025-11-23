import '../styles/header.css'
import { Link } from 'react-router-dom'

export function Header({ page }) {

    const linkPage = page === 'Crear Producto' ? '/' : '/producto/nuevo'
    const linkName = page === 'Crear Producto' ? 'Volver al Dashboard' : '+ Añadir producto'

    return (
        <header>
            <hgroup>
                <img src="/logo_app.png" alt="Logo de la cafeteria, taza de cafe combiando con el simbolo de React" />
                <h1>Café & Sabor - {page}</h1>
            </hgroup>

            <Link to={linkPage}>{linkName}</Link>

        </header>


    )
}