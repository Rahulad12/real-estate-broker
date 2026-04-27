export interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: {
    address: string;
    lng: string;
    lat: string;
  };
  bedrooms: number;
  bathrooms: number;
  area: number;
  propertyType: 'house' | 'apartment' | 'land';
  status: 'available' | 'sold' | 'pending';
  type: 'buy' | 'rent';
  images: string[];
  createdAt: string;
  updatedAt: string;
}
