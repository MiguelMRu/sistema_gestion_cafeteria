import { Header } from "../components/Header"
import { Products } from "../components/Products"
import { Filters } from "../components/Filters"
import { useProductStore } from "../store/useProductStore";
import { useEffect } from "react";
export default function Dashboard() {

  const fetchProducts = useProductStore((state) => state.fetchProducts);

  //Cargamos los productos de forma inicial
    useEffect(() => {
        fetchProducts(); 
    }, [fetchProducts]);


  return (
        <>
          <Header page="Lista de productos" />
          <Filters/>
          <Products />
        </>
  )
}