import { CreateFavoritePayload } from '@/types/favorite.types';
import mongoose from 'mongoose';

export interface IFavorite extends CreateFavoritePayload, mongoose.Document {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const favoriteSchema = new mongoose.Schema<IFavorite>(
  {
    userId: { type: String, required: true },
    realEstateId: { type: String, required: true },
    isFavorite: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const FavoriteModel = mongoose.model<IFavorite>('Favorite', favoriteSchema);
export default FavoriteModel;
