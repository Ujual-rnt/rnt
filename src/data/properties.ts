import { Property } from '../types/property';

export const properties: Property[] = [
  {
    id: 1,
    title: 'Opera House',
    location: 'Urban Nagar, Downtown',
    description: 'Elegant modern house with high ceilings, premium finishes, and a private pool. Experience luxury living with floor-to-ceiling windows offering panoramic views of the surroundings. Perfect for those seeking a contemporary lifestyle with all amenities.',
    image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    gallery: [
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    price: 9599,
    originalPrice: 15999,
    distance: 2.5,
    rating: 4.5,
    reviewCount: 549,
    bedrooms: 5,
    bathrooms: 2,
    area: 2050,
    property_type: 'house'
  },
  {
    id: 2,
    title: 'Modern Loft',
    location: 'Artistic Quarter, Design District',
    description: 'Stylish urban loft with exposed brick walls and industrial finishes. This spacious open-concept living space features 14-foot ceilings, designer fixtures, and a chef\'s kitchen. Located in the heart of the Design District.',
    image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    gallery: [
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    price: 7899,
    originalPrice: 9999,
    distance: 1.8,
    rating: 4.7,
    reviewCount: 328,
    bedrooms: 3,
    bathrooms: 2,
    area: 1850,
    property_type: 'apartment'
  },
  {
    id: 3,
    title: 'Garden Apartment',
    location: 'Green Valley, Nature\'s Edge',
    description: 'Serene garden apartment with a private patio and lush landscaping. Enjoy the tranquility of nature while being minutes away from urban conveniences. Features include hardwood floors, stainless steel appliances, and ample natural light.',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    gallery: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    price: 6499,
    originalPrice: 8999,
    distance: 3.2,
    rating: 4.4,
    reviewCount: 215,
    bedrooms: 2,
    bathrooms: 1,
    area: 1200,
    property_type: 'building'
  }
];