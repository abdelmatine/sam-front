
import productsData from './data/products.json';
import categoriesData from './data/categories.json';

export interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  brand: string;
  brandTagline: string;
  imageUrl: string;
  category: string;
  rating: number;
  inStock: boolean;
  isNew?: boolean;
  description: string;
}

export const products: Product[] = productsData as Product[];
export const categories: Category[] = categoriesData as Category[];
