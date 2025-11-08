import '../styles/header.css'
import { Link } from 'react-router-dom'

export function Header({ page }) {

    const linkPage = page === 'Crear Producto' ? '/' : '/producto/nuevo'
    const linkName = page === 'Crear Producto' ? 'Volver al Dashboard' : '+ Crear Producto'

    return(
        <header>
            <img src="/logo_app.png" alt="Logo de la cafeteria, taza de cafe combiando con el simbolo de React"/>
            <h1>Café & Sabor - {page}</h1>

            <Link to={linkPage}>{linkName}</Link>

        </header>


    )
}