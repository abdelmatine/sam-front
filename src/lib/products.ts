
import data from './data/products.json';

export interface Product {
  id: string;
  name: string;
  price: number;
  brand: string;
  imageUrl: string;
  category: 'respiratory' | 'oxygen' | 'accessories' | 'monitoring' | 'others' | 'all';
  rating: number;
  inStock: boolean;
  isNew?: boolean;
  description: string;
}

export const products: Product[] = data.products as Product[];
