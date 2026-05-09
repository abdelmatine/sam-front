export interface Product {
  id: string;
  name: string;
  price: number;
  brand: string;
  imageUrl: string;
  category: 'respiratory' | 'oxygen' | 'accessories' | 'monitoring' | 'others';
  rating: number;
  inStock: boolean;
  isNew?: boolean;
  description: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'AirSense 10 AutoSet CPAP',
    price: 899,
    brand: 'ResMed',
    imageUrl: 'https://picsum.photos/seed/p1/600/600',
    category: 'respiratory',
    rating: 4.8,
    inStock: true,
    isNew: true,
    description: 'The AirSense 10 AutoSet is a premium auto-adjusting pressure therapy device. It features an integrated humidifier and built-in wireless connectivity.'
  },
  {
    id: '2',
    name: 'SimplyGo Mini Oxygen Concentrator',
    price: 2450,
    brand: 'Philips Respironics',
    imageUrl: 'https://picsum.photos/seed/p2/600/600',
    category: 'oxygen',
    rating: 4.9,
    inStock: true,
    description: 'The SimplyGo Mini is the smallest and lightest portable oxygen concentrator developed by Philips Respironics, built for today’s active patients.'
  },
  {
    id: '3',
    name: 'DreamWear Silicone Nasal Mask',
    price: 109,
    brand: 'Philips',
    imageUrl: 'https://picsum.photos/seed/p3/600/600',
    category: 'accessories',
    rating: 4.5,
    inStock: true,
    description: 'The DreamWear Silicone Nasal Mask features a lightweight, open-face design that provides freedom of movement and a clear field of vision.'
  },
  {
    id: '4',
    name: 'Premium Finger Pulse Oximeter',
    price: 45,
    brand: 'Wellue',
    imageUrl: 'https://picsum.photos/seed/p4/600/600',
    category: 'monitoring',
    rating: 4.7,
    inStock: true,
    description: 'Highly accurate pulse oximeter for measuring blood oxygen saturation levels and pulse rate, designed for clinical and home use.'
  },
  {
    id: '5',
    name: 'Nebulizer Machine for Kids',
    price: 65,
    brand: 'Omron',
    imageUrl: 'https://picsum.photos/seed/p5/600/600',
    category: 'others',
    rating: 4.6,
    inStock: true,
    description: 'A kid-friendly nebulizer designed to make respiratory treatment less intimidating for children, featuring quiet operation and efficient medication delivery.'
  }
];
