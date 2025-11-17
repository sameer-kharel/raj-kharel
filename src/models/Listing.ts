import mongoose, { Schema, Document } from 'mongoose';

export interface IListing extends Document {
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  featuredImage: string;
  status: 'active' | 'pending' | 'sold';
  soldPrice?: number;
  soldDate?: Date;
  representation?: string;
}

const ListingSchema: Schema = new Schema({
  title: { type: String, required: true },
  address: { type: String, required: true },
  price: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  sqft: { type: Number, required: true },
  featuredImage: { type: String, required: true },
  status: { type: String, enum: ['active', 'pending', 'sold'], default: 'active' },
  soldPrice: { type: Number },
  soldDate: { type: Date },
  representation: { type: String },
}, { timestamps: true });

export default mongoose.models.Listing || mongoose.model<IListing>('Listing', ListingSchema);