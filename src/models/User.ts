import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    googleId?: string;
    email?: string;
    phone?: string;
    name: string;
    image?: string;
    role: 'client' | 'admin';
    isPlaceholder: boolean;
    createdAt: Date;
    lastLogin: Date;
}

const UserSchema: Schema = new Schema({
    googleId: { type: String, unique: true, sparse: true },
    email: { type: String, unique: true, sparse: true },
    phone: { type: String },
    name: { type: String, required: true },
    image: { type: String },
    role: { type: String, enum: ['client', 'admin'], default: 'client' },
    isPlaceholder: { type: Boolean, default: false },
    lastLogin: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
