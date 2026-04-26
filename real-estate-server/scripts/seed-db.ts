import mongoose from 'mongoose';
import UserModel from '../src/model/user.schema';
import RealEstateModel from '../src/model/real-estate.schema';
import FavoriteModel from '../src/model/favorite-schema';
import bcryptjs from 'bcryptjs'; // For hashing passwords
import dotenv from 'dotenv';
dotenv.config();

// --- Mock Data Generation Functions ---

// Mock User Data
const generateMockUsers = async (count: number) => {
  const users = [];
  const password = await bcryptjs.hash('password123', 10); // Hash a common password

  for (let i = 1; i <= count; i++) {
    users.push({
      email: `user${i}@example.com`,
      password: password,
      userName: `user${i}`,
      firstName: `User${i}FirstName`,
      lastName: `User${i}LastName`,
      role: i % 3 === 0 ? 'admin' : 'user', // Some users are admins
    });
  }
  return users;
};

// Mock Real Estate Data
const generateMockRealEstates = async (count: number) => { // Removed userIds as it was unused here
  const realEstates = [];
  const propertyTypes = ['House', 'Apartment', 'Condo', 'Land'];
  const statuses = ['For Sale', 'For Rent', 'Sold', 'Rented'];
  const addresses = [
    { address: '123 Main St', lng: '-74.0060', lat: '40.7128' },
    { address: '456 Oak Ave', lng: '-73.9856', lat: '40.7484' },
    { address: '789 Pine Ln', lng: '-73.9654', lat: '40.7831' },
    { address: '101 Maple Dr', lng: '-73.9550', lat: '40.7700' },
  ];

  for (let i = 1; i <= count; i++) {
    realEstates.push({
      title: `Beautiful ${propertyTypes[Math.floor(Math.random() * propertyTypes.length)]} in City ${i}`,
      description: `A lovely property with ${Math.floor(Math.random() * 5) + 1} bedrooms and ${Math.floor(Math.random() * 5) + 1} bathrooms. Located in a prime area.`,
      price: Math.floor(Math.random() * 500000) + 100000, // Price between 100,000 and 600,000
      location: addresses[Math.floor(Math.random() * addresses.length)],
      bedrooms: Math.floor(Math.random() * 5) + 1,
      bathrooms: Math.floor(Math.random() * 5) + 1,
      area: Math.floor(Math.random() * 3000) + 500, // Area between 500 and 3500 sq ft
      propertyType: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      type: Math.random() > 0.5 ? 'For Sale' : 'For Rent', // Distribute between Sale/Rent
    });
  }
  return realEstates;
};

// Mock Favorite Data
const generateMockFavorites = async (count: number, userIds: mongoose.Types.ObjectId[], realEstateIds: mongoose.Types.ObjectId[]) => {
  const favorites = [];
  const uniqueFavorites = new Set<string>(); // To avoid duplicate user-realEstate pairs

  // Ensure we don't try to create more favorites than possible unique pairs
  const maxPossibleFavorites = userIds.length * realEstateIds.length;
  const actualCount = Math.min(count, maxPossibleFavorites);

  while (favorites.length < actualCount && uniqueFavorites.size < maxPossibleFavorites) {
    const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
    const randomRealEstateId = realEstateIds[Math.floor(Math.random() * realEstateIds.length)];
    const favoriteKey = `${randomUserId}-${randomRealEstateId}`;

    if (!uniqueFavorites.has(favoriteKey)) {
      favorites.push({
        userId: randomUserId,
        realEstateId: randomRealEstateId,
        isFavorite: Math.random() > 0.3, // 70% chance of being a favorite
      });
      uniqueFavorites.add(favoriteKey);
    }
  }
  return favorites;
};

// --- Database Connection and Seeding ---

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/real-estate'; // Default DB name

const seedDatabase = async () => {
  try {
    
    await mongoose.connect(MONGODB_URI);
    

    // Clear existing data (optional, but good for repeatable seeding)
    
    await UserModel.deleteMany({});
    await RealEstateModel.deleteMany({});
    await FavoriteModel.deleteMany({});
    

    // Generate and insert mock data
    
    const mockUsers = await generateMockUsers(10); // 10 users
    const insertedUsers = await UserModel.insertMany(mockUsers);
    const userIds = insertedUsers.map((user) => user._id);
    

    
    const mockRealEstates = await generateMockRealEstates(20); // 20 real estates
    const insertedRealEstates = await RealEstateModel.insertMany(mockRealEstates);
    const realEstateIds = insertedRealEstates.map((estate) => estate._id);
    

    
    const mockFavorites = await generateMockFavorites(30, userIds, realEstateIds); // Max 30 favorites
    const insertedFavorites = await FavoriteModel.insertMany(mockFavorites);
    

    
  } catch (error) {
    console.error('Error during database seeding:', error);
  } finally {
    await mongoose.disconnect();
    
  }
};

seedDatabase();
