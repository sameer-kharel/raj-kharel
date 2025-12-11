'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface BlogPost {
    _id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    featuredImage: string;
    category: 'Housing Update' | 'Local News' | 'Incentive' | 'Instagram Post';
    instagramUrl?: string;
    status: 'draft' | 'published';
    publishedAt?: string;
    author: string;
    tags: string[];
    createdAt: string;
}

export default function BlogPostPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [subscribing, setSubscribing] = useState(false);
    const [subscribeMessage, setSubscribeMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        if (slug) {
            fetchPost();
        }
    }, [slug]);

    const fetchPost = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/blog/${slug}`);
            if (res.ok) {
                setPost(await res.json());
            }
        } catch (error) {
            console.error('Failed to fetch blog post:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubscribing(true);
        setSubscribeMessage(null);
        try {
            const res = await fetch('/api/subscribers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (res.ok) {
                setSubscribeMessage({ type: 'success', text: '🎉 Thanks for subscribing! You\'ll receive our latest updates.' });
                setEmail('');
            } else {
                setSubscribeMessage({ type: 'error', text: data.error || 'Failed to subscribe. Please try again.' });
            }
        } catch (error) {
            setSubscribeMessage({ type: 'error', text: 'Failed to subscribe. Please try again.' });
        } finally {
            setSubscribing(false);
        }
    };

    if (loading) {
        return (
            <section style={{
                background: 'linear-gradient(180deg, #f8fafc 0%, #e8f0f7 100%)',
                minHeight: '100vh',
                padding: '120px 24px 60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <div style={{ fontSize: '18px', color: '#64748b' }}>Loading...</div>
            </section>
        );
    }

    if (!post) {
        return (
            <section style={{
                background: 'linear-gradient(180deg, #f8fafc 0%, #e8f0f7 100%)',
                minHeight: '100vh',
                padding: '120px 24px 60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
                        Post Not Found
                    </h1>
                    <Link href="/blog" style={{
                        display: 'inline-block',
                        padding: '12px 24px',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                        color: 'white',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: '600',
                    }}>
                        Back to Blog
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section style={{
            background: 'linear-gradient(180deg, #f8fafc 0%, #e8f0f7 100%)',
            minHeight: '100vh',
            padding: '120px 24px 60px',
        }}>
            <style>{`
        .post-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #64748b;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 32px;
          transition: all 0.3s;
        }

        .back-link:hover {
          color: #3b82f6;
          transform: translateX(-4px);
        }

        .post-header {
          background: white;
          border-radius: 24px;
          padding: 48px;
          margin-bottom: 32px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
        }

        .post-category-badge {
          display: inline-block;
          padding: 8px 16px;
          background: #dbeafe;
          color: #1e40af;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .post-title {
          font-size: clamp(28px, 5vw, 42px);
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .post-meta {
          display: flex;
          gap: 24px;
          color: #64748b;
          font-size: 14px;
          padding-top: 20px;
          border-top: 1px solid #f1f5f9;
        }

        .post-featured-image {
          position: relative;
          width: 100%;
          height: 500px;
          border-radius: 24px;
          overflow: hidden;
          margin-bottom: 32px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
        }

        .post-content-wrapper {
          background: white;
          border-radius: 24px;
          padding: 48px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
          margin-bottom: 32px;
        }

        .post-content {
          font-size: 17px;
          line-height: 1.8;
          color: #334155;
        }

        .post-content p {
          margin-bottom: 20px;
        }

        .newsletter-cta {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border-radius: 24px;
          padding: 48px;
          text-align: center;
          color: white;
          box-shadow: 0 20px 50px rgba(59, 130, 246, 0.2);
        }

        .newsletter-title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .newsletter-subtitle {
          font-size: 16px;
          opacity: 0.9;
          margin-bottom: 24px;
        }

        .newsletter-form {
          display: flex;
          gap: 12px;
          max-width: 500px;
          margin: 0 auto;
        }

        .newsletter-input {
          flex: 1;
          padding: 14px 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 12px;
          font-size: 15px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .newsletter-input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        .newsletter-input:focus {
          outline: none;
          border-color: white;
          background: rgba(255, 255, 255, 0.2);
        }

        .newsletter-btn {
          padding: 14px 32px;
          background: #1e293b;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
        }

        .newsletter-btn:hover {
          background: #0f172a;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }

        .newsletter-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .subscribe-message {
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 14px;
          margin-top: 12px;
          text-align: center;
          animation: slideIn 0.3s ease-out;
        }

        .subscribe-message.success {
          background: rgba(255, 255, 255, 0.3);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.5);
        }

        .subscribe-message.error {
          background: rgba(220, 38, 38, 0.2);
          color: white;
          border: 1px solid rgba(220, 38, 38, 0.5);
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .post-header,
          .post-content-wrapper,
          .newsletter-cta {
            padding: 32px 24px;
          }

          .post-featured-image {
            height: 300px;
          }

          .newsletter-form {
            flex-direction: column;
          }
        }
      `}</style>

            <div className="post-container">
                {/* Back Link */}
                <Link href="/blog" className="back-link">
                    ← Back to Blog
                </Link>

                {/* Post Header */}
                <div className="post-header">
                    <span className="post-category-badge">{post.category}</span>
                    <h1 className="post-title">{post.title}</h1>
                    <div className="post-meta">
                        <span>By {post.author}</span>
                        <span>•</span>
                        <span>
                            {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </span>
                    </div>
                </div>

                {/* Featured Image */}
                {post.featuredImage && (
                    <div className="post-featured-image">
                        <Image
                            src={post.featuredImage}
                            alt={post.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            priority
                        />
                    </div>
                )}

                {/* Post Content */}
                <div className="post-content-wrapper">
                    <div className="post-content">
                        {post.content.split('\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>

                    {/* Instagram Embed */}
                    {post.category === 'Instagram Post' && post.instagramUrl && (
                        <div style={{ marginTop: '32px', textAlign: 'center' }}>
                            <a
                                href={post.instagramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-block',
                                    padding: '14px 28px',
                                    background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                                    color: 'white',
                                    borderRadius: '12px',
                                    textDecoration: 'none',
                                    fontWeight: '600',
                                    transition: 'all 0.3s',
                                }}
                            >
                                View on Instagram →
                            </a>
                        </div>
                    )}
                </div>

                {/* Newsletter CTA */}
                <div className="newsletter-cta">
                    <h3 className="newsletter-title">Stay Updated</h3>
                    <p className="newsletter-subtitle">
                        Subscribe to get the latest housing updates and exclusive offers
                    </p>
                    <form onSubmit={handleSubscribe} className="newsletter-form">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="newsletter-input"
                            required
                        />
                        <button
                            type="submit"
                            className="newsletter-btn"
                            disabled={subscribing}
                        >
                            {subscribing ? 'Subscribing...' : 'Subscribe'}
                        </button>
                    </form>
                    {subscribeMessage && (
                        <div className={`subscribe-message ${subscribeMessage.type}`}>
                            {subscribeMessage.text}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
