import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import mongoose from 'mongoose';

// Helper function to extract ID from URL
function getIdFromReq(req: NextRequest): string | null {
    try {
        const url = new URL(req.url);
        const pathParts = url.pathname.split('/');
        const id = pathParts[pathParts.length - 1];
        return id;
    } catch (error) {
        console.error('Failed to parse ID from request URL', error);
        return null;
    }
}

// PATCH - Update blog post (admin only)
export async function PATCH(req: NextRequest) {
    try {
        const id = getIdFromReq(req);
        if (!id) {
            return NextResponse.json(
                { error: 'Could not determine blog post ID from URL' },
                { status: 400 }
            );
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: 'Invalid blog post ID format' },
                { status: 400 }
            );
        }

        await connectDB();
        const body = await req.json();

        // If changing status to published and no publishedAt date, set it
        if (body.status === 'published' && !body.publishedAt) {
            body.publishedAt = new Date();
        }

        const updatedPost = await BlogPost.findByIdAndUpdate(id, body, {
            new: true,
        });

        if (!updatedPost) {
            return NextResponse.json(
                { error: 'Blog post not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedPost);
    } catch (error: any) {
        console.error('[API PATCH /admin/blog/[id]]', error);
        return NextResponse.json(
            { error: 'Failed to update blog post' },
            { status: 500 }
        );
    }
}

// DELETE - Delete blog post (admin only)
export async function DELETE(req: NextRequest) {
    try {
        const id = getIdFromReq(req);
        if (!id) {
            return NextResponse.json(
                { error: 'Could not determine blog post ID from URL' },
                { status: 400 }
            );
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: 'Invalid blog post ID format' },
                { status: 400 }
            );
        }

        await connectDB();
        const deletedPost = await BlogPost.findByIdAndDelete(id);

        if (!deletedPost) {
            return NextResponse.json(
                { error: 'Blog post not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Blog post deleted successfully' });
    } catch (error: any) {
        console.error('[API DELETE /admin/blog/[id]]', error);
        return NextResponse.json(
            { error: 'Failed to delete blog post' },
            { status: 500 }
        );
    }
}
