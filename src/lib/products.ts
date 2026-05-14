import productsData from './data/products.json';
import categoriesData from './data/categories.json';
import brandsData from './data/brands.json';

export interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  description: string;
}

export interface Brand {
  id: string;
  name: string;
  description: string;
  origin: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  brandId: string;
  imageUrl: string;
  category: string;
  rating: number;
  inStock: boolean;
  isNew?: boolean;
  description: string;
}

export const products: Product[] = productsData as any[];
export const categories: Category[] = categoriesData as Category[];
export const brands: Brand[] = brandsData as Brand[];

export const getBrandById = (id: string) => brands.find(b => b.id === id);