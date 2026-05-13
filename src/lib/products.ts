
import data from './data/products.json';

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
  imageUrl: string;
  category: string;
  rating: number;
  inStock: boolean;
  isNew?: boolean;
  description: string;
}

export const products: Product[] = data.products as Product[];
export const categories: Category[] = data.categories as Category[];
