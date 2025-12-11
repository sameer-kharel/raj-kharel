import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

// Helper function to extract slug from URL
function getSlugFromReq(req: NextRequest): string | null {
    try {
        const url = new URL(req.url);
        const pathParts = url.pathname.split('/');
        const slug = pathParts[pathParts.length - 1];
        return slug;
    } catch (error) {
        console.error('Failed to parse slug from request URL', error);
        return null;
    }
}

// GET - Fetch single blog post by slug
export async function GET(req: NextRequest) {
    try {
        const slug = getSlugFromReq(req);
        if (!slug) {
            return NextResponse.json(
                { error: 'Could not determine slug from URL' },
                { status: 400 }
            );
        }

        await connectDB();

        const post = await BlogPost.findOne({ slug, status: 'published' }).select('-__v');

        if (!post) {
            return NextResponse.json(
                { error: 'Blog post not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(post);
    } catch (error: any) {
        console.error('[API GET /blog/[slug]]', error);
        return NextResponse.json(
            { error: 'Failed to fetch blog post' },
            { status: 500 }
        );
    }
}
