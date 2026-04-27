import mongoose from 'mongoose';
import { CreateRealEstatePayload } from './real-estate.types';

/**
 * Interface representing a Real Estate property document in MongoDB
 * @interface IRealEstate
 * @extends {mongoose.Document}
 */
export interface IRealEstate
  extends CreateRealEstatePayload, mongoose.Document {
  /** Unique identifier (MongoDB ObjectId) */
  _id: mongoose.Types.ObjectId;
  /** Timestamp when property was created */
  createdAt: Date;
  /** Timestamp when property was last updated */
  updatedAt: Date;
}

/**
 * Mongoose schema definition for Real Estate properties
 * @type {mongoose.Schema<IRealEstate>}
 * @property {String} title - Property title (required)
 * @property {String} description - Detailed description (required)
 * @property {Number} price - Price in USD (required)
 * @property {Object} location - Location object
 * @property {String} location.address - Full street address (required)
 * @property {String} location.city - City name (required)
 * @property {String} location.country - Country name (required)
 * @property {String} location.lng - Longitude coordinate (required)
 * @property {String} location.lat - Latitude coordinate (required)
 * @property {Number} bedrooms - Number of bedrooms (required)
 * @property {Number} bathrooms - Number of bathrooms (required)
 * @property {Number} area - Area in square feet (required)
 * @property {String} propertyType - Type of property (required)
 * @property {String} status - Current status: available/sold/pending (required)
 * @property {String} type - Listing type: buy/rent (required)
 * @property {String[]} images - Array of image URLs (default: [])
 * @property {Number} likes - Number of likes for trending (default: 0)
 * @property {Number} views - Number of views for trending (default: 0)
 * @property {Date} createdAt - Auto-generated creation timestamp
 * @property {Date} updatedAt - Auto-generated update timestamp
 */
const realEstateSchema = new mongoose.Schema<IRealEstate>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      lng: {
        type: String,
        required: true,
      },
      lat: {
        type: String,
        required: true,
      },
    },

    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    propertyType: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    likes: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

/**
 * Real Estate Mongoose Model
 * @type {mongoose.Model<IRealEstate>}
 * @default
 */
const RealEstateModel = mongoose.model<IRealEstate>(
  'RealEstate',
  realEstateSchema,
);
export default RealEstateModel;
