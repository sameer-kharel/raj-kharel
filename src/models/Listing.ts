import mongoose, { Schema, Document } from 'mongoose';

export interface IListingImage {
  url: string;
  caption?: string; // e.g., "kitchen", "dining room"
  featured?: boolean;
}

export interface IListing extends Document {
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  images: IListingImage[]; // Array of image objects
  description: string; // General description of the listing
  features: string[]; // Array of features, e.g., "Hardwood floors", "Central AC"
  status: 'active' | 'pending' | 'sold';
  soldPrice?: number;
  soldDate?: Date;
  representation?: string;
}

const ListingImageSchema: Schema = new Schema({
  url: { type: String, required: true },
  caption: { type: String },
  featured: { type: Boolean, default: false },
});

const ListingSchema: Schema = new Schema({
  title: { type: String, required: true },
  address: { type: String, required: true },
  price: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  sqft: { type: Number, required: true },
  images: { type: [ListingImageSchema], default: [] }, // Array of image subdocuments
  description: { type: String, required: true },
  features: { type: [String], default: [] }, // Array of strings
  status: { type: String, enum: ['active', 'pending', 'sold'], default: 'active' },
  soldPrice: { type: Number },
  soldDate: { type: Date },
  representation: { type: String },
}, { timestamps: true });

export default mongoose.models.Listing || mongoose.model<IListing>('Listing', ListingSchema);