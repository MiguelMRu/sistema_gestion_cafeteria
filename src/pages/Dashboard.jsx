import { Header } from "../components/Header"
import { Products } from "../components/Products"
import { Filters } from "../components/Filters"
export default function Dashboard() {


  return (
        <>
          <Header page="Lista de productos" />
          <Filters/>
          <Products />
        </>
  )
}