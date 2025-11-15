import { useEffect, useState } from 'react';
import { getCategories } from '../services/productService.js';
 export function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.map(category => ({ value: category, label: category })));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
    return categories;
}