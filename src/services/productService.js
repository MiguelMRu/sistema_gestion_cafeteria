import { supabase } from '../lib/supabase'

// Obtener todos los productos
export const getProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export const getCategories = async () => {
  const {data, error} = await supabase
    .from('products')
    .select('category')
    .not('category', 'is', null) // Opcional: excluir nulls
  
  if (error) throw error
  
  // Obtener valores únicos en el cliente
  const uniqueCategories = [...new Set(data.map(item => item.category))]
  console.log(uniqueCategories);
  return uniqueCategories
}
// Obtener un producto por ID
export const getProductById = async (id) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}

// Crear producto
export const createProduct = async (product) => {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Actualizar producto
export const updateProduct = async (id, product) => {
  const { data, error } = await supabase
    .from('products')
    .update(product)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Eliminar producto
export const deleteProduct = async (id) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)
  
  if (error) throw error
  return true
}

// Buscar productos
export const searchProducts = async (searchTerm) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .ilike('name', `%${searchTerm}%`)
  
  if (error) throw error
  return data
}

// Filtrar por categoría
export const filterByCategory = async (category) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
  
  if (error) throw error
  return data
}