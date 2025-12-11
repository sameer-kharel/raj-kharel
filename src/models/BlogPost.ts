import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    featuredImage: string;
    category: 'Housing Update' | 'Local News' | 'Incentive' | 'Instagram Post';
    instagramUrl?: string;
    instagramEmbedCode?: string;
    status: 'draft' | 'published';
    publishedAt?: Date;
    author: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
            sparse: true, // Allow null/undefined temporarily
        },
        content: {
            type: String,
            required: true,
        },
        excerpt: {
            type: String,
            required: true,
            maxlength: 300,
        },
        featuredImage: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            enum: ['Housing Update', 'Local News', 'Incentive', 'Instagram Post'],
            required: true,
        },
        instagramUrl: {
            type: String,
            trim: true,
        },
        instagramEmbedCode: {
            type: String,
        },
        status: {
            type: String,
            enum: ['draft', 'published'],
            default: 'draft',
        },
        publishedAt: {
            type: Date,
        },
        author: {
            type: String,
            default: 'Raj Kharel',
        },
        tags: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

// Create slug from title before saving
BlogPostSchema.pre('save', function (next) {
    if (!this.slug || this.isModified('title')) {
        // Generate slug from title
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        // Add timestamp if slug might not be unique
        if (this.isNew) {
            this.slug = `${this.slug}-${Date.now()}`;
        }
    }
    next();
});

export default mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);

