import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

// GET - Fetch all published blog posts
export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');
        const limit = parseInt(searchParams.get('limit') || '10');
        const skip = parseInt(searchParams.get('skip') || '0');

        const query: any = { status: 'published' };
        if (category && category !== 'all') {
            query.category = category;
        }

        const posts = await BlogPost.find(query)
            .sort({ publishedAt: -1, createdAt: -1 })
            .limit(limit)
            .skip(skip)
            .select('-__v');

        const total = await BlogPost.countDocuments(query);

        return NextResponse.json({
            posts,
            total,
            hasMore: skip + limit < total,
        });
    } catch (error: any) {
        console.error('[API GET /blog]', error);
        return NextResponse.json(
            { error: 'Failed to fetch blog posts' },
            { status: 500 }
        );
    }
}
