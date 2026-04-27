import mongoose from 'mongoose';
import { CreateRealEstatePayload } from './real-estate.types';

export interface IRealEstate
  extends CreateRealEstatePayload, mongoose.Document {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

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
      city: { // Added city field
        type: String,
        required: true,
      },
      country: { // Added country field
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
    likes: { // Added likes field for trending
      type: Number,
      default: 0,
    },
    views: { // Added views field for trending
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const RealEstateModel = mongoose.model<IRealEstate>(
  'RealEstate',
  realEstateSchema,
);
export default RealEstateModel;
