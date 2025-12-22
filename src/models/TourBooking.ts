import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ITourBooking extends Document {
    client: Types.ObjectId;
    listing: Types.ObjectId;
    preferredDate: Date;
    preferredTime: string;
    alternateDate?: Date;
    alternateTime?: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    confirmedDate?: Date;
    confirmedTime?: string;
    adminNotes?: string;
    clientNotes?: string;
    completedAt?: Date;
}

const TourBookingSchema: Schema = new Schema({
    client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    listing: { type: Schema.Types.ObjectId, ref: 'Listing', required: true },
    preferredDate: { type: Date, required: true },
    preferredTime: { type: String, required: true },
    alternateDate: { type: Date },
    alternateTime: { type: String },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    },
    confirmedDate: { type: Date },
    confirmedTime: { type: String },
    adminNotes: { type: String },
    clientNotes: { type: String },
    completedAt: { type: Date },
}, { timestamps: true });

// Index for faster queries
TourBookingSchema.index({ client: 1, status: 1 });
TourBookingSchema.index({ listing: 1, status: 1 });

export default mongoose.models.TourBooking || mongoose.model<ITourBooking>('TourBooking', TourBookingSchema);
