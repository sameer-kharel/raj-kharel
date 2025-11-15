import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IListing extends Document {
  title: string;
  address: string;
  price: number;
  status: 'active' | 'pending' | 'sold';
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  featuredImage: string;
  representation?: string;
  soldPrice?: number;
  soldDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ListingSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    address: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ['active', 'pending', 'sold'], default: 'active' },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    sqft: { type: Number, required: true },
    featuredImage: { type: String, required: true },
    representation: { type: String },
    soldPrice: { type: Number },
    soldDate: { type: Date },
  },
  { timestamps: true }
);

const Listing = models.Listing || model<IListing>('Listing', ListingSchema);

export default Listing;