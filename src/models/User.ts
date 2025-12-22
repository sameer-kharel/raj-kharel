import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    googleId: string;
    email: string;
    name: string;
    image?: string;
    role: 'client' | 'admin';
    createdAt: Date;
    lastLogin: Date;
}

const UserSchema: Schema = new Schema({
    googleId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String },
    role: { type: String, enum: ['client', 'admin'], default: 'client' },
    lastLogin: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
