import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Subscriber from '@/models/Subscriber';
import BlogPost from '@/models/BlogPost';
import mongoose from 'mongoose';

// POST - Send newsletter to all subscribers (admin only)
export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { blogPostId } = body;

        if (!blogPostId || !mongoose.Types.ObjectId.isValid(blogPostId)) {
            return NextResponse.json(
                { error: 'Valid blog post ID is required' },
                { status: 400 }
            );
        }

        // Fetch the blog post
        const blogPost = await BlogPost.findById(blogPostId);
        if (!blogPost) {
            return NextResponse.json(
                { error: 'Blog post not found' },
                { status: 404 }
            );
        }

        // Fetch active subscribers
        const subscribers = await Subscriber.find({ isActive: true });

        if (subscribers.length === 0) {
            return NextResponse.json(
                { message: 'No active subscribers found' },
                { status: 200 }
            );
        }

        // TODO: Integrate with email service (Resend, SendGrid, etc.)
        // For now, we'll just return a success message
        // You'll need to add your email service API key to .env.local

        /* Example with Resend:
        const { Resend } = require('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
    
        const emailPromises = subscribers.map(subscriber => {
          return resend.emails.send({
            from: 'Raj Kharel <newsletter@kharelrealty.com>',
            to: subscriber.email,
            subject: blogPost.title,
            html: generateNewsletterHTML(blogPost, subscriber),
          });
        });
    
        await Promise.all(emailPromises);
        */

        console.log(`Would send newsletter "${blogPost.title}" to ${subscribers.length} subscribers`);

        return NextResponse.json({
            message: `Newsletter prepared for ${subscribers.length} subscribers`,
            blogPostTitle: blogPost.title,
            subscriberCount: subscribers.length,
            note: 'Email service not configured. Add RESEND_API_KEY or similar to .env.local to enable sending.',
        });
    } catch (error: any) {
        console.error('[API POST /newsletter/send]', error);
        return NextResponse.json(
            { error: error.message || 'Failed to send newsletter' },
            { status: 500 }
        );
    }
}

// Helper function to generate newsletter HTML (you can customize this)
function generateNewsletterHTML(blogPost: any, subscriber: any): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${blogPost.title}</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0;">Kharel Realty</h1>
        <p style="color: #dbeafe; margin: 10px 0 0 0;">Housing Updates & News</p>
      </div>
      
      <div style="background: white; padding: 30px; border: 1px solid #e2e8f0; border-top: none;">
        ${blogPost.featuredImage ? `<img src="${blogPost.featuredImage}" alt="${blogPost.title}" style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 20px;">` : ''}
        
        <h2 style="color: #1e293b; margin-top: 0;">${blogPost.title}</h2>
        
        <div style="color: #64748b; margin-bottom: 20px;">
          ${new Date(blogPost.publishedAt || blogPost.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
        
        <div style="color: #475569; line-height: 1.8;">
          ${blogPost.content}
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
          <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/blog/${blogPost.slug}" 
             style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600;">
            Read Full Article
          </a>
        </div>
      </div>
      
      <div style="background: #f8fafc; padding: 20px; text-align: center; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 10px 10px;">
        <p style="color: #64748b; font-size: 14px; margin: 0 0 10px 0;">
          You're receiving this because you subscribed to Kharel Realty updates.
        </p>
        <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/unsubscribe?id=${subscriber._id}" 
           style="color: #94a3b8; font-size: 12px; text-decoration: underline;">
          Unsubscribe
        </a>
      </div>
    </body>
    </html>
  `;
}
