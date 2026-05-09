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
    name: 'SAM AirSense 10 AutoSet',
    price: 899,
    brand: 'SAM Médicale',
    imageUrl: 'https://picsum.photos/seed/med-cpap1/600/600',
    category: 'respiratory',
    rating: 4.8,
    inStock: true,
    isNew: true,
    description: 'Le SAM AirSense 10 AutoSet est un dispositif de thérapie à pression auto-ajustable haut de gamme. Il intègre un humidificateur et une connectivité sans fil avancée pour un suivi clinique précis à domicile.'
  },
  {
    id: '2',
    name: 'SimplyGo Mini Portable',
    price: 2450,
    brand: 'Philips Respironics',
    imageUrl: 'https://picsum.photos/seed/med-oxy1/600/600',
    category: 'oxygen',
    rating: 4.9,
    inStock: true,
    description: 'Le SimplyGo Mini est le concentrateur d\'oxygène portable le plus petit et le plus léger développé par Philips. Conçu pour les patients actifs, il allie fiabilité clinique et portabilité extrême.'
  },
  {
    id: '3',
    name: 'Masque Nasal SAM SoftFit',
    price: 109,
    brand: 'SAM Médicale',
    imageUrl: 'https://picsum.photos/seed/med-mask1/600/600',
    category: 'accessories',
    rating: 4.5,
    inStock: true,
    description: 'Le masque nasal SAM SoftFit utilise une silicone de grade chirurgical pour un confort optimal. Sa conception légère offre une liberté de mouvement maximale pendant le sommeil.'
  },
  {
    id: '4',
    name: 'Oxymètre Clinique Pro-V',
    price: 45,
    brand: 'Wellue',
    imageUrl: 'https://picsum.photos/seed/med-oxim1/600/600',
    category: 'monitoring',
    rating: 4.7,
    inStock: true,
    description: 'Oxymètre de pouls haute précision pour la mesure de la saturation en oxygène du sang et de la fréquence cardiaque. Indispensable pour le suivi respiratoire quotidien.'
  },
  {
    id: '5',
    name: 'Nébuliseur SAM Kids-Care',
    price: 65,
    brand: 'SAM Médicale',
    imageUrl: 'https://picsum.photos/seed/med-nebu1/600/600',
    category: 'others',
    rating: 4.6,
    inStock: true,
    description: 'Un nébuliseur conçu spécifiquement pour les enfants, rendant le traitement moins intimidant grâce à son fonctionnement ultra-silencieux et sa diffusion efficace.'
  }
];