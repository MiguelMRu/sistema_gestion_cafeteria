import '../styles/header.css'

export function Header({ page }) {

    return(
        <header>
            <img src="/logo_app.png" alt="Logo de la cafeteria, taza de cafe combiando con el simbolo de React"/>
            <h1>Café & Sabor - {page}</h1>

        </header>


    )
}