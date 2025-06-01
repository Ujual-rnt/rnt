export interface Property {
  id: number;
  title: string;
  location: string;
  description: string;
  image: string;
  gallery?: string[];
  price: number;
  originalPrice: number;
  distance: number;
  rating: number;
  reviewCount: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  property_type: 'pg' | 'house' | 'apartment' | 'building';
}