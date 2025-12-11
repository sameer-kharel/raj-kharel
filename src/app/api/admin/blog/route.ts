import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

// GET - Fetch all blog posts including drafts (admin only)
export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');
        const status = searchParams.get('status');

        const query: any = {};
        if (category && category !== 'all') {
            query.category = category;
        }
        if (status && status !== 'all') {
            query.status = status;
        }

        const posts = await BlogPost.find(query)
            .sort({ createdAt: -1 })
            .select('-__v');

        return NextResponse.json(posts);
    } catch (error: any) {
        console.error('[API GET /admin/blog]', error);
        return NextResponse.json(
            { error: 'Failed to fetch blog posts' },
            { status: 500 }
        );
    }
}

// POST - Create new blog post (admin only)
export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const {
            title,
            content,
            excerpt,
            featuredImage,
            category,
            instagramUrl,
            instagramEmbedCode,
            status,
            tags,
        } = body;

        // Validate required fields
        if (!title || !content || !excerpt || !featuredImage || !category) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create blog post
        const blogPost = new BlogPost({
            title,
            content,
            excerpt,
            featuredImage,
            category,
            instagramUrl,
            instagramEmbedCode,
            status: status || 'draft',
            tags: tags || [],
            publishedAt: status === 'published' ? new Date() : undefined,
        });

        await blogPost.save();

        return NextResponse.json(blogPost, { status: 201 });
    } catch (error: any) {
        console.error('[API POST /admin/blog]', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create blog post' },
            { status: 500 }
        );
    }
}
