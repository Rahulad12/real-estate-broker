export interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  propertyType: "apartment" | "house" | "villa" | "commercial" | string;
  status: "available" | "sold" | "rented" | string;
  type: "buy" | "rent" | string;
  location: { address: string; lat: string; lng: string };
  createdAt: string;
}

export interface PropertyResponse {
  success: boolean;
  data: Property[];
  message: string;
}