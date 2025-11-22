# Contexto de Base de Datos

## Tabla de Productos

| column_name | data_type                | is_nullable | column_default |
| ----------- | ------------------------ | ----------- | -------------- |
| id          | bigint                   | NO          | null           |
| name        | text                     | NO          | null           |
| category    | text                     | YES         | null           |
| price       | double precision         | YES         | null           |
| description | text                     | YES         | null           |
| image       | text                     | YES         | null           |
| available   | boolean                  | YES         | null           |
| ingredients | json                     | YES         | null           |
| created_at  | timestamp with time zone | YES         | now()          |

## Estructura del Proyecto

- `src/lib/supabase.js`: Inicialización del cliente Supabase.
- `src/store/useProductStore.js`: Estado global con Zustand. Maneja `products`, `loading`, `error` y `filters`.
- `src/services/productService.js`: Capa de servicio para interactuar con Supabase (CRUD).
- `src/components`: Componentes reutilizables.
- `src/pages`: Vistas principales de la aplicación.

## Variables de Entorno Requeridas

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Reglas de Negocio y Lógica

- **Filtrado en Cliente**: La aplicación descarga todos los productos al inicio (`fetchProducts`) y realiza el filtrado (búsqueda, categoría, disponibilidad) en memoria dentro del store de Zustand, en lugar de hacer nuevas peticiones al backend para cada filtro.
- **Categorías**: Se obtienen dinámicamente de los productos existentes (`getCategories` en `productService.js`).

## Guía de Estilo de Commits

- **Idioma**: Español.
- **Formato**: Explicación sencilla y clara de los cambios realizados. Evitar tecnicismos innecesarios si es posible.


## Importante
- Es un proyecto para asentar bases de desarrollo con React.
- No crear nada cuando te pida algo explicame como puedo hacerlo.
- Cada cosa solicitada explicar paso a paso lo que hace.
- Cuando te pida algo presupone que que es para aprender como hacerlo.