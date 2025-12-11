'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

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

interface Incentive {
  _id: string;
  title: string;
  description: string;
  type: 'charity' | 'discount' | 'bonus' | 'other';
  amount?: number;
  isActive: boolean;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [incentives, setIncentives] = useState<Incentive[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const categoryParam = selectedCategory !== 'all' ? `?category=${selectedCategory}` : '';
      const [postsRes, incentivesRes] = await Promise.all([
        fetch(`/api/blog${categoryParam}`),
        fetch('/api/incentives'),
      ]);

      if (postsRes.ok) {
        const data = await postsRes.json();
        setPosts(data.posts || []);
      }
      if (incentivesRes.ok) {
        setIncentives(await incentivesRes.json());
      }
    } catch (error) {
      console.error('Failed to fetch blog data:', error);
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

  const categories = ['all', 'Housing Update', 'Local News', 'Incentive', 'Instagram Post'];

  return (
    <section style={{
      background: 'linear-gradient(180deg, #f8fafc 0%, #e8f0f7 50%, #f1f5f9 100%)',
      minHeight: '100vh',
      padding: '120px 24px 60px',
    }}>
      <style>{`
        .blog-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .blog-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .blog-title {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 16px;
          letter-spacing: -0.5px;
        }

        .blog-subtitle {
          font-size: 18px;
          color: #64748b;
          max-width: 600px;
          margin: 0 auto;
        }

        .category-tabs {
          display: flex;
          gap: 12px;
          margin-bottom: 40px;
          overflow-x: auto;
          padding-bottom: 8px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .category-tab {
          padding: 10px 24px;
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 24px;
          font-size: 14px;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          transition: all 0.3s;
          white-space: nowrap;
        }

        .category-tab:hover {
          border-color: #3b82f6;
          color: #3b82f6;
        }

        .category-tab.active {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          border-color: #3b82f6;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 40px;
          margin-bottom: 60px;
        }

        .posts-section {
          display: grid;
          gap: 32px;
        }

        .post-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
          transition: all 0.4s;
          border: 1px solid rgba(59, 130, 246, 0.05);
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 24px;
        }

        .post-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 50px rgba(59, 130, 246, 0.12);
        }

        .post-image {
          position: relative;
          height: 250px;
          overflow: hidden;
        }

        .post-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }

        .post-card:hover .post-image img {
          transform: scale(1.05);
        }

        .post-content {
          padding: 24px 24px 24px 0;
          display: flex;
          flex-direction: column;
        }

        .post-category {
          display: inline-block;
          padding: 6px 14px;
          background: #dbeafe;
          color: #1e40af;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 12px;
          width: fit-content;
        }

        .post-title {
          font-size: 24px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .post-excerpt {
          color: #64748b;
          font-size: 15px;
          line-height: 1.6;
          margin-bottom: 16px;
          flex: 1;
        }

        .post-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid #f1f5f9;
        }

        .post-author {
          font-size: 14px;
          color: #64748b;
        }

        .post-date {
          font-size: 14px;
          color: #94a3b8;
        }

        .read-more {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s;
        }

        .read-more:hover {
          transform: translateX(4px);
          box-shadow: 0 6px 16px rgba(59, 130, 246, 0.3);
        }

        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .sidebar-card {
          background: white;
          border-radius: 20px;
          padding: 28px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(59, 130, 246, 0.05);
        }

        .sidebar-title {
          font-size: 20px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 16px;
        }

        .newsletter-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .newsletter-input {
          padding: 12px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.3s;
        }

        .newsletter-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .newsletter-btn {
          padding: 12px 24px;
          background: #1e293b;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .newsletter-btn:hover {
          background: #0f172a;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
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
          animation: slideIn 0.3s ease-out;
        }

        .subscribe-message.success {
          background: #dcfce7;
          color: #15803d;
          border: 1px solid #86efac;
        }

        .subscribe-message.error {
          background: #fee2e2;
          color: #dc2626;
          border: 1px solid #fca5a5;
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

        .incentive-card {
          padding: 20px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          border-radius: 16px;
          margin-bottom: 16px;
        }

        .incentive-title {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .incentive-amount {
          font-size: 32px;
          font-weight: 900;
          margin-bottom: 12px;
        }

        .incentive-description {
          font-size: 14px;
          line-height: 1.6;
          opacity: 0.95;
        }

        .no-posts {
          text-align: center;
          padding: 80px 20px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
        }

        .no-posts-text {
          font-size: 18px;
          color: #64748b;
        }

        @media (max-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr;
          }

          .post-card {
            grid-template-columns: 1fr;
          }

          .post-image {
            height: 300px;
          }

          .post-content {
            padding: 24px;
          }
        }

        @media (max-width: 640px) {
          .category-tabs {
            justify-content: flex-start;
          }

          .post-title {
            font-size: 20px;
          }
        }
      `}</style>

      <div className="blog-container">
        {/* Header */}
        <div className="blog-header">
          <h1 className="blog-title">Kharel Housing Updates & News</h1>
          <p className="blog-subtitle">
            Stay informed about the latest housing market trends, local area news, and exclusive client offers
          </p>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'All Posts' : category}
            </button>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="content-grid">
          {/* Posts Section */}
          <div className="posts-section">
            {loading ? (
              <div className="no-posts">
                <p className="no-posts-text">Loading posts...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="no-posts">
                <p className="no-posts-text">No posts found. Check back soon!</p>
              </div>
            ) : (
              posts.map((post) => (
                <motion.div
                  key={post._id}
                  className="post-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="post-image">
                    {post.featuredImage && (
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    )}
                  </div>
                  <div className="post-content">
                    <span className="post-category">{post.category}</span>
                    <h2 className="post-title">{post.title}</h2>
                    <p className="post-excerpt">{post.excerpt}</p>
                    <div className="post-meta">
                      <span className="post-author">By {post.author}</span>
                      <span className="post-date">
                        {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <div style={{ marginTop: '16px' }}>
                      <Link href={`/blog/${post.slug}`} className="read-more">
                        Read Full Article →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            {/* Newsletter Signup */}
            <div className="sidebar-card">
              <h3 className="sidebar-title">Subscribe to Newsletter</h3>
              <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>
                Get the latest housing updates and exclusive offers delivered to your inbox.
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

            {/* Active Incentives */}
            {incentives.length > 0 && (
              <div className="sidebar-card">
                <h3 className="sidebar-title">Current Offers</h3>
                {incentives.map((incentive) => (
                  <div key={incentive._id} className="incentive-card">
                    <div className="incentive-title">{incentive.title}</div>
                    {incentive.amount && (
                      <div className="incentive-amount">${incentive.amount}</div>
                    )}
                    <div className="incentive-description">{incentive.description}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
