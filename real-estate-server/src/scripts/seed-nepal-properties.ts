import mongoose from 'mongoose';
import RealEstateModel from '../modules/real-estate/real-estate.schema';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/real-estate-broker';

// Nepal-only property data
const nepalProperties = [
  {
    title: "Modern Apartment in Thamel",
    description: "A beautiful modern apartment in the heart of Thamel, Kathmandu. Close to tourist attractions, restaurants, and shops.",
    price: 25000000, // 25 million NPR
    location: {
      address: "Thamel, Kathmandu",
      city: "Kathmandu",
      country: "Nepal",
      lng: "85.3106",
      lat: "27.7172"
    },
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    propertyType: "apartment",
    status: "available",
    type: "rent",
    images: [
      "https://images.unsplash.com/photo-1522708326358-7fa998b9e186?w=800",
      "https://images.unsplash.com/photo-1502672260266-1db3635b3f1f?w=800"
    ],
    likes: 45,
    views: 320
  },
  {
    title: "Luxury Villa in Pokhara Lakeside",
    description: "Stunning villa with panoramic views of Phewa Lake and Annapurna mountain range.",
    price: 85000000, // 85 million NPR
    location: {
      address: "Lakeside, Pokhara",
      city: "Pokhara",
      country: "Nepal",
      lng: "83.9856",
      lat: "28.2096"
    },
    bedrooms: 4,
    bathrooms: 3,
    area: 3500,
    propertyType: "villa",
    status: "available",
    type: "buy",
    images: [
      "https://images.unsplash.com/photo-1613496327481-7089a1e8a4d8?w=800",
      "https://images.unsplash.com/photo-1512917774081-8c1c6ecfb5?w=800"
    ],
    likes: 120,
    views: 890
  },
  {
    title: "Cozy House in Lalitpur",
    description: "Charming house in Jawalakhel area, perfect for families. Near Patan Durbar Square.",
    price: 35000000, // 35 million NPR
    location: {
      address: "Jawalakhel, Lalitpur",
      city: "Lalitpur",
      country: "Nepal",
      lng: "85.3240",
      lat: "27.6588"
    },
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    propertyType: "house",
    status: "available",
    type: "buy",
    images: [
      "https://images.unsplash.com/photo-1564013799919-7c5adc295845?w=800"
    ],
    likes: 67,
    views: 450
  },
  {
    title: "Commercial Space in New Road",
    description: "Prime commercial property in New Road, Kathmandu. Perfect for retail or office.",
    price: 120000000, // 120 million NPR
    location: {
      address: "New Road, Kathmandu",
      city: "Kathmandu",
      country: "Nepal",
      lng: "85.3114",
      lat: "27.7052"
    },
    bedrooms: 0,
    bathrooms: 2,
    area: 2500,
    propertyType: "commercial",
    status: "available",
    type: "buy",
    images: [
      "https://images.unsplash.com/photo-1486406146926-555b9c6c4a7?w=800"
    ],
    likes: 34,
    views: 280
  },
  {
    title: "Budget Apartment in Baneshwor",
    description: "Affordable apartment near Kathmandu University and medical colleges.",
    price: 15000000, // 15 million NPR
    location: {
      address: "Baneshwor, Kathmandu",
      city: "Kathmandu",
      country: "Nepal",
      lng: "85.3423",
      lat: "27.6868"
    },
    bedrooms: 1,
    bathrooms: 1,
    area: 650,
    propertyType: "apartment",
    status: "available",
    type: "rent",
    images: [
      "https://images.unsplash.com/photo-1522708326358-7fa998b9e186?w=800"
    ],
    likes: 89,
    views: 620
  },
  {
    title: "Heritage House in Bhaktapur Durbar Square",
    description: "Traditional Newari house near Bhaktapur Durbar Square. Cultural heritage at its finest.",
    price: 45000000, // 45 million NPR
    location: {
      address: "Durbar Square, Bhaktapur",
      city: "Bhaktapur",
      country: "Nepal",
      lng: "85.4298",
      lat: "27.6710"
    },
    bedrooms: 4,
    bathrooms: 3,
    area: 2200,
    propertyType: "house",
    status: "available",
    type: "buy",
    images: [
      "https://images.unsplash.com/photo-1564013799919-7c5adc295845?w=800"
    ],
    likes: 156,
    views: 1100
  },
  {
    title: "Lakeside Studio Apartment",
    description: "Cozy studio apartment in Lakeside, Pokhara. Perfect for tourists and expats.",
    price: 18000000, // 18 million NPR
    location: {
      address: "Lakeside-6, Pokhara",
      city: "Pokhara",
      country: "Nepal",
      lng: "83.9596",
      lat: "28.2216"
    },
    bedrooms: 1,
    bathrooms: 1,
    area: 550,
    propertyType: "apartment",
    status: "available",
    type: "rent",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1db3635b3f1f?w=800"
    ],
    likes: 203,
    views: 1450
  },
  {
    title: "Modern Family House in Budhanilkantha",
    description: "Spacious modern house in peaceful Budhanilkantha area with mountain views.",
    price: 65000000, // 65 million NPR
    location: {
      address: "Budhanilkantha, Kathmandu",
      city: "Kathmandu",
      country: "Nepal",
      lng: "85.3517",
      lat: "27.7653"
    },
    bedrooms: 5,
    bathrooms: 4,
    area: 3200,
    propertyType: "house",
    status: "available",
    type: "buy",
    images: [
      "https://images.unsplash.com/photo-1613496327481-7089a1e8a4d8?w=800"
    ],
    likes: 92,
    views: 580
  },
  {
    title: "Commercial Office in Biratnagar",
    description: "Modern office space in Biratnagar business district.",
    price: 40000000, // 40 million NPR
    location: {
      address: "Main Road, Biratnagar",
      city: "Biratnagar",
      country: "Nepal",
      lng: "87.2718",
      lat: "26.4525"
    },
    bedrooms: 0,
    bathrooms: 2,
    area: 1800,
    propertyType: "commercial",
    status: "available",
    type: "rent",
    images: [
      "https://images.unsplash.com/photo-1486406146926-555b9c6c4a7?w=800"
    ],
    likes: 28,
    views: 195
  },
  {
    title: "Riverside Villa in Kurintar",
    description: "Beautiful villa near Trishuli River, perfect for weekend getaways and family vacations.",
    price: 55000000, // 55 million NPR
    location: {
      address: "Kurintar, Chitwan",
      city: "Chitwan",
      country: "Nepal",
      lng: "84.8274",
      lat: "27.8589"
    },
    bedrooms: 3,
    bathrooms: 2,
    area: 2400,
    propertyType: "villa",
    status: "available",
    type: "buy",
    images: [
      "https://images.unsplash.com/photo-1512917774081-8c1c6ecfb5?w=800"
    ],
    likes: 78,
    views: 420
  },
  {
    title: "Student Hostel in Kirtipur",
    description: "Affordable rooms near Kirtipur Campus, TU. Perfect for students.",
    price: 8000000, // 8 million NPR
    location: {
      address: "Kirtipur, Kathmandu",
      city: "Kathmandu",
      country: "Nepal",
      lng: "85.2839",
      lat: "27.6784"
    },
    bedrooms: 1,
    bathrooms: 1,
    area: 400,
    propertyType: "apartment",
    status: "available",
    type: "rent",
    images: [
      "https://images.unsplash.com/photo-1522708326358-7fa998b9e186?w=800"
    ],
    likes: 145,
    views: 980
  },
  {
    title: "Luxury Apartment in Lazimpat",
    description: "High-end apartment in Lazimpat with modern amenities and security.",
    price: 40000000, // 40 million NPR
    location: {
      address: "Lazimpat, Kathmandu",
      city: "Kathmandu",
      country: "Nepal",
      lng: "85.3178",
      lat: "27.7269"
    },
    bedrooms: 3,
    bathrooms: 2,
    area: 1600,
    propertyType: "apartment",
    status: "available",
    type: "rent",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1db3635b3f1f?w=800"
    ],
    likes: 112,
    views: 750
  },
  {
    title: "Heritage Home in Patan",
    description: "Traditional Newari architecture house in Patan, near Patan Museum.",
    price: 38000000, // 38 million NPR
    location: {
      address: "Mangal Bazar, Patan",
      city: "Lalitpur",
      country: "Nepal",
      lng: "85.3184",
      lat: "27.6732"
    },
    bedrooms: 3,
    bathrooms: 2,
    area: 1900,
    propertyType: "house",
    status: "available",
    type: "buy",
    images: [
      "https://images.unsplash.com/photo-1564013799919-7c5adc295845?w=800"
    ],
    likes: 134,
    views: 890
  },
  {
    title: "Mountain View Resort in Nagarkot",
    description: "Resort property with stunning Himalayan views. Perfect for hospitality business.",
    price: 95000000, // 95 million NPR
    location: {
      address: "Nagarkot, Bhaktapur",
      city: "Bhaktapur",
      country: "Nepal",
      lng: "85.5279",
      lat: "27.7177"
    },
    bedrooms: 6,
    bathrooms: 5,
    area: 5000,
    propertyType: "villa",
    status: "available",
    type: "buy",
    images: [
      "https://images.unsplash.com/photo-1512917774081-8c1c6ecfb5?w=800"
    ],
    likes: 189,
    views: 1250
  },
  {
    title: "Budget Room in Swayambhu",
    description: "Affordable room near Swayambhunath Stupa. Great for spiritual seekers.",
    price: 10000000, // 10 million NPR
    location: {
      address: "Swayambhu, Kathmandu",
      city: "Kathmandu",
      country: "Nepal",
      lng: "85.2906",
      lat: "27.7144"
    },
    bedrooms: 1,
    bathrooms: 1,
    area: 500,
    propertyType: "apartment",
    status: "available",
    type: "rent",
    images: [
      "https://images.unsplash.com/photo-1522708326358-7fa998b9e186?w=800"
    ],
    likes: 167,
    views: 1100
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    

    // Clean existing data
    await RealEstateModel.deleteMany({});
    

    // Insert Nepal properties
    await RealEstateModel.insertMany(nepalProperties);
    

    // Log property types for verification
    // const cities = [...new Set(result.map((p: any) => p.location.city))];
    
    

    process.exit(0);
  } catch (error) {
    console.error('✗ Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
