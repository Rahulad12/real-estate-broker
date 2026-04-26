import mongoose from 'mongoose';
import { CreateUserPayload } from '@/types/user.types';

export interface IUser extends CreateUserPayload, mongoose.Document {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: mongoose.Schema<IUser> = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    userName: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, required: true, default: 'user', lowercase: true },
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.model<IUser>('User', userSchema);
export default UserModel;
