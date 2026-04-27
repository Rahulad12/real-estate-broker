import { CreateFavoritePayload } from './favorite.types';
import mongoose from 'mongoose';

export interface IFavorite
  extends mongoose.Document, Omit<CreateFavoritePayload, 'realEstateId'> {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  realEstateId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const favoriteSchema = new mongoose.Schema<IFavorite>(
  {
    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    realEstateId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'RealEstate',
    },
    isFavorite: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const FavoriteModel = mongoose.model<IFavorite>('Favorite', favoriteSchema);
export default FavoriteModel;
