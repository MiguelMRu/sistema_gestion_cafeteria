import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import DetalleProducto from '../pages/DetailProduct';
import FormularioProducto from '../pages/CreateProduct';
import NotFound from '../pages/NotFound';

/*
  AppRouter - Configuración de rutas de la aplicación
  
  Este componente maneja toda la navegación de la aplicación
 */
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal - Dashboard Admin */}
        <Route path="/" element={<Dashboard />} />

        {/* Ruta para crear un nuevo producto */}
        <Route path="/producto/nuevo" element={<FormularioProducto />} />

        {/* Ruta dinámica - Detalle de un producto específico */}
        <Route path="/producto/:id" element={<DetalleProducto />} />



        {/* Ruta 404 - Para URLs que no existen */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;