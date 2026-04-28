import mongoose, { Schema, Document } from 'mongoose';

export interface IScheduling extends Document {
  property: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  agent?: mongoose.Types.ObjectId;
  requestedDate: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const schedulingSchema = new Schema<IScheduling>(
  {
    property: {
      type: Schema.Types.ObjectId,
      ref: 'RealEstate',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    agent: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    requestedDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled', 'rescheduled'],
      default: 'pending',
    },
    adminNotes: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const SchedulingModel = mongoose.model<IScheduling>('Scheduling', schedulingSchema);
export default SchedulingModel;
