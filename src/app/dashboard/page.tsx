'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Conversation {
    _id: string;
    listing: {
        _id: string;
        title: string;
        address: string;
        featuredImage: string;
    } | null;
    lastMessageAt: string;
    clientUnreadCount: number;
}

interface TourBooking {
    _id: string;
    listing: {
        _id: string;
        title: string;
        address: string;
        featuredImage: string;
    };
    preferredDate: string;
    preferredTime: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

interface DocumentSubmission {
    _id: string;
    documentType: string;
    fileName: string;
    status: 'pending' | 'verified' | 'rejected';
    createdAt: string;
}

interface Checklist {
    tourCompleted: boolean;
    documentsSubmitted: boolean;
    documentsVerified: boolean;
    advancePaymentMade: boolean;
    offerMade: boolean;
    offerAccepted: boolean;
    customItems?: Array<{ label: string; completed: boolean }>;
}

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [tourBookings, setTourBookings] = useState<TourBooking[]>([]);
    const [documents, setDocuments] = useState<DocumentSubmission[]>([]);
    const [checklist, setChecklist] = useState<Checklist | null>(null);
    const [sellingChecklist, setSellingChecklist] = useState<Checklist | null>(null);
    const [selectedListing, setSelectedListing] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login?callbackUrl=/dashboard');
        } else if (status === 'authenticated') {
            fetchDashboardData();
        }
    }, [status, router]);

    const fetchDashboardData = async () => {
        try {
            const [convRes, toursRes, docsRes] = await Promise.all([
                fetch('/api/conversations'),
                fetch('/api/tour-bookings'),
                fetch('/api/documents'),
            ]);

            if (convRes.ok) {
                const convData = await convRes.json();
                const conversations = convData.conversations || [];
                setConversations(conversations);

                // Fetch checklist for the first conversation's listing (Buying) - only if issued
                if (conversations.length > 0 && conversations[0].listing) {
                    const listingId = conversations[0].listing._id;
                    setSelectedListing(listingId);

                    const checkRes = await fetch(`/api/checklists?listingId=${listingId}`);
                    if (checkRes.ok) {
                        const checkData = await checkRes.json();
                        // Only set checklist if it's issued
                        if (checkData.checklist && checkData.checklist.isIssued) {
                            setChecklist(checkData.checklist);
                        }
                    }
                }

                // Fetch Selling Checklist explicitly - only if issued
                const sellingRes = await fetch('/api/checklists?type=selling');
                if (sellingRes.ok) {
                    const sellingData = await sellingRes.json();
                    // Only set if issued and has items
                    if (sellingData.checklist && sellingData.checklist.isIssued && sellingData.checklist.customItems.length > 0) {
                        setSellingChecklist(sellingData.checklist);
                    }
                }
            }

            if (toursRes.ok) {
                const toursData = await toursRes.json();
                setTourBookings(toursData.bookings || []);
            }

            if (docsRes.ok) {
                const docsData = await docsRes.json();
                setDocuments(docsData.documents || []);
            }

            setLoading(false);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setLoading(false);
        }
    };

    if (status === 'loading' || loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.spinner} />
                <p style={styles.loadingText}>Loading your dashboard...</p>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    const getProgressPercentage = () => {
        if (!checklist && !sellingChecklist) return 0;

        // Use selling checklist if available, otherwise buying
        const targetChecklist = sellingChecklist || checklist;
        if (!targetChecklist) return 0;

        if (targetChecklist.customItems && targetChecklist.customItems.length > 0) {
            const total = targetChecklist.customItems.length;
            const completed = targetChecklist.customItems.filter((i: any) => i.completed).length;
            return Math.round((completed / total) * 100);
        }

        const items = [
            targetChecklist.tourCompleted,
            targetChecklist.documentsSubmitted,
            targetChecklist.documentsVerified,
            targetChecklist.advancePaymentMade,
            targetChecklist.offerMade,
            targetChecklist.offerAccepted,
        ];
        const completed = items.filter(Boolean).length;
        return Math.round((completed / items.length) * 100);
    };

    return (
        <div style={styles.container}>
            <div style={styles.wrapper}>
                {/* Header */}
                <div style={styles.header}>
                    <div>
                        <h1 style={styles.title}>Welcome back, {session.user?.name?.split(' ')[0]}!</h1>
                        <p style={styles.subtitle}>Track your real estate journey</p>
                    </div>
                    {session.user?.image && (
                        <Image
                            src={session.user.image}
                            alt={session.user.name || 'User'}
                            width={64}
                            height={64}
                            style={styles.avatar}
                        />
                    )}
                </div>

                {/* Quick Stats */}
                <div style={styles.statsGrid}>
                    <div style={styles.statCard}>
                        <div style={{ ...styles.statIcon, background: '#dbeafe' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                        </div>
                        <div>
                            <p style={styles.statLabel}>Active Conversations</p>
                            <p style={styles.statValue}>{conversations.length}</p>
                        </div>
                    </div>

                    <div style={styles.statCard}>
                        <div style={{ ...styles.statIcon, background: '#dcfce7' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                        </div>
                        <div>
                            <p style={styles.statLabel}>Upcoming Tours</p>
                            <p style={styles.statValue}>
                                {tourBookings.filter(t => t.status === 'confirmed').length}
                            </p>
                        </div>
                    </div>

                    <div style={styles.statCard}>
                        <div style={{ ...styles.statIcon, background: '#fef3c7' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ca8a04" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                            </svg>
                        </div>
                        <div>
                            <p style={styles.statLabel}>Documents</p>
                            <p style={styles.statValue}>{documents.length}</p>
                        </div>
                    </div>

                    <div style={styles.statCard}>
                        <div style={{ ...styles.statIcon, background: '#e9d5ff' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2">
                                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                            </svg>
                        </div>
                        <div>
                            <p style={styles.statLabel}>Progress</p>
                            <p style={styles.statValue}>{getProgressPercentage()}%</p>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div style={styles.contentGrid}>
                    {/* Recent Conversations */}
                    <div style={styles.panel}>
                        <div style={styles.panelHeader}>
                            <h2 style={styles.panelTitle}>Recent Conversations</h2>
                            <Link href="/chat" style={styles.viewAllLink}>
                                View All →
                            </Link>
                        </div>
                        <div style={styles.panelContent}>
                            {conversations.length === 0 ? (
                                <div style={styles.emptyState}>
                                    <p>No conversations yet</p>
                                    <Link href="/listings" style={styles.ctaButton}>
                                        Browse Listings
                                    </Link>
                                </div>
                            ) : (
                                conversations
                                    .slice(0, 3)
                                    .map((conv) => (
                                        <Link
                                            key={conv._id}
                                            href={`/chat?conversation=${conv._id}`}
                                            style={styles.conversationItem}
                                        >
                                            <Image
                                                src={conv.listing?.featuredImage || '/placeholder-property.jpg'}
                                                alt={conv.listing?.title || 'Chat'}
                                                width={60}
                                                height={60}
                                                style={styles.conversationImage}
                                            />
                                            <div style={{ flex: 1 }}>
                                                <p style={styles.conversationTitle}>{conv.listing?.title || 'Direct Message'}</p>
                                                <p style={styles.conversationAddress}>{conv.listing?.address || 'Private Chat'}</p>
                                            </div>
                                            {conv.clientUnreadCount > 0 && (
                                                <div style={styles.badge}>{conv.clientUnreadCount}</div>
                                            )}
                                        </Link>
                                    ))
                            )}
                        </div>
                    </div>

                    {/* Upcoming Tours */}
                    <div style={styles.panel}>
                        <div style={styles.panelHeader}>
                            <h2 style={styles.panelTitle}>Upcoming Tours</h2>
                            <Link href="/tours" style={styles.viewAllLink}>
                                View All →
                            </Link>
                        </div>
                        <div style={styles.panelContent}>
                            {tourBookings.filter(t => t.status === 'confirmed').length === 0 ? (
                                <div style={styles.emptyState}>
                                    <p>No upcoming tours</p>
                                    <Link href="/tours" style={styles.ctaButton}>
                                        Book a Tour
                                    </Link>
                                </div>
                            ) : (
                                tourBookings
                                    .filter(t => t.status === 'confirmed')
                                    .slice(0, 3)
                                    .map((tour) => (
                                        <div key={tour._id} style={styles.tourItem}>
                                            <div style={styles.tourDate}>
                                                <p style={styles.tourDay}>
                                                    {new Date(tour.preferredDate).getDate()}
                                                </p>
                                                <p style={styles.tourMonth}>
                                                    {new Date(tour.preferredDate).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                    })}
                                                </p>
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <p style={styles.tourTitle}>{tour.listing.title}</p>
                                                <p style={styles.tourTime}>{tour.preferredTime}</p>
                                            </div>
                                            <div style={{ ...styles.statusBadge, ...styles.statusConfirmed }}>
                                                Confirmed
                                            </div>
                                        </div>
                                    ))
                            )}
                        </div>
                    </div>

                    {/* Progress Checklist (Selling or Buying) */}
                    <div style={styles.panel}>
                        <div style={styles.panelHeader}>
                            <h2 style={styles.panelTitle}>{sellingChecklist ? 'Selling Your Home' : 'Home Buying Progress'}</h2>
                            <span style={styles.progressBadge}>{getProgressPercentage()}% Complete</span>
                        </div>
                        <div style={styles.panelContent}>
                            {sellingChecklist ? (
                                <div style={styles.checklistContainer}>
                                    {sellingChecklist.customItems?.map((item: any, index: number) => (
                                        <div key={index} style={styles.checklistItem}>
                                            <div style={item.completed ? styles.checkboxChecked : styles.checkboxUnchecked}>
                                                {item.completed && (
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                                        <polyline points="20 6 9 17 4 12" />
                                                    </svg>
                                                )}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <p style={styles.checklistLabel}>{item.label}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : checklist ? (
                                <div style={styles.checklistContainer}>
                                    <div style={styles.checklistItem}>
                                        <div style={checklist.tourCompleted ? styles.checkboxChecked : styles.checkboxUnchecked}>
                                            {checklist.tourCompleted && (
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            )}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <p style={styles.checklistLabel}>Property Tour Completed</p>
                                            <p style={styles.checklistDesc}>Schedule and complete a property viewing</p>
                                        </div>
                                    </div>

                                    <div style={styles.checklistItem}>
                                        <div style={checklist.documentsSubmitted ? styles.checkboxChecked : styles.checkboxUnchecked}>
                                            {checklist.documentsSubmitted && (
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            )}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <p style={styles.checklistLabel}>Documents Submitted</p>
                                            <p style={styles.checklistDesc}>Upload required documents for verification</p>
                                        </div>
                                    </div>

                                    <div style={styles.checklistItem}>
                                        <div style={checklist.documentsVerified ? styles.checkboxChecked : styles.checkboxUnchecked}>
                                            {checklist.documentsVerified && (
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            )}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <p style={styles.checklistLabel}>Documents Verified</p>
                                            <p style={styles.checklistDesc}>Waiting for admin to verify your documents</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div style={styles.emptyState}>
                                    <p>No checklist issued yet</p>
                                    <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: '#9ca3af' }}>
                                        Your agent will create a personalized checklist for you
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div style={styles.actionsGrid}>
                    <Link href="/listings" style={styles.actionCard}>
                        <div style={{ ...styles.actionIcon, background: '#dbeafe' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            </svg>
                        </div>
                        <h3 style={styles.actionTitle}>Browse Listings</h3>
                        <p style={styles.actionDescription}>Explore available properties</p>
                    </Link>

                    <Link href="/tours" style={styles.actionCard}>
                        <div style={{ ...styles.actionIcon, background: '#dcfce7' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                            </svg>
                        </div>
                        <h3 style={styles.actionTitle}>Book a Tour</h3>
                        <p style={styles.actionDescription}>Schedule property viewings</p>
                    </Link>

                    <Link href="/documents" style={styles.actionCard}>
                        <div style={{ ...styles.actionIcon, background: '#fef3c7' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ca8a04" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                            </svg>
                        </div>
                        <h3 style={styles.actionTitle}>Upload Documents</h3>
                        <p style={styles.actionDescription}>Submit required paperwork</p>
                    </Link>

                    <Link href="/chat" style={styles.actionCard}>
                        <div style={{ ...styles.actionIcon, background: '#e9d5ff' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                        </div>
                        <h3 style={styles.actionTitle}>Messages</h3>
                        <p style={styles.actionDescription}>Chat with your agent</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        padding: '2rem 1rem',
    },
    wrapper: {
        maxWidth: '1200px',
        margin: '0 auto',
    },
    loadingContainer: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    },
    spinner: {
        width: '48px',
        height: '48px',
        border: '4px solid #e5e7eb',
        borderTop: '4px solid #2563eb',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    },
    loadingText: {
        marginTop: '1rem',
        fontSize: '1rem',
        color: '#6b7280',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
    },
    title: {
        fontSize: '2rem',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '0.25rem',
    },
    subtitle: {
        fontSize: '1rem',
        color: '#6b7280',
    },
    avatar: {
        borderRadius: '50%',
        border: '3px solid #ffffff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem',
    },
    statCard: {
        background: '#ffffff',
        borderRadius: '16px',
        padding: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    },
    statIcon: {
        width: '56px',
        height: '56px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    statLabel: {
        fontSize: '0.875rem',
        color: '#6b7280',
        marginBottom: '0.25rem',
    },
    statValue: {
        fontSize: '1.75rem',
        fontWeight: '700',
        color: '#1f2937',
    },
    contentGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem',
    },
    panel: {
        background: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
    },
    panelHeader: {
        padding: '1.5rem',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    panelTitle: {
        fontSize: '1.25rem',
        fontWeight: '700',
        color: '#1f2937',
    },
    viewAllLink: {
        fontSize: '0.875rem',
        color: '#2563eb',
        textDecoration: 'none',
        fontWeight: '600',
    },
    panelContent: {
        padding: '1.5rem',
    },
    emptyState: {
        textAlign: 'center',
        padding: '2rem 1rem',
        color: '#9ca3af',
    },
    ctaButton: {
        display: 'inline-block',
        marginTop: '1rem',
        padding: '0.75rem 1.5rem',
        background: '#2563eb',
        color: '#ffffff',
        borderRadius: '8px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '0.875rem',
    },
    conversationItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        borderRadius: '12px',
        marginBottom: '0.75rem',
        textDecoration: 'none',
        transition: 'background 0.2s',
        background: '#f9fafb',
    },
    conversationImage: {
        borderRadius: '8px',
        objectFit: 'cover',
    },
    conversationTitle: {
        fontSize: '1rem',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '0.25rem',
    },
    conversationAddress: {
        fontSize: '0.875rem',
        color: '#6b7280',
    },
    badge: {
        background: '#2563eb',
        color: '#ffffff',
        borderRadius: '12px',
        padding: '0.25rem 0.625rem',
        fontSize: '0.75rem',
        fontWeight: '700',
    },
    tourItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        borderRadius: '12px',
        marginBottom: '0.75rem',
        background: '#f9fafb',
    },
    tourDate: {
        width: '60px',
        height: '60px',
        background: '#2563eb',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
    },
    tourDay: {
        fontSize: '1.5rem',
        fontWeight: '700',
        lineHeight: 1,
    },
    tourMonth: {
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        marginTop: '0.25rem',
    },
    tourTitle: {
        fontSize: '1rem',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '0.25rem',
    },
    tourTime: {
        fontSize: '0.875rem',
        color: '#6b7280',
    },
    statusBadge: {
        padding: '0.375rem 0.75rem',
        borderRadius: '6px',
        fontSize: '0.75rem',
        fontWeight: '600',
    },
    statusConfirmed: {
        background: '#dcfce7',
        color: '#16a34a',
    },
    actionsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
    },
    actionCard: {
        background: '#ffffff',
        borderRadius: '16px',
        padding: '1.5rem',
        textDecoration: 'none',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        transition: 'transform 0.2s, box-shadow 0.2s',
    },
    actionIcon: {
        width: '56px',
        height: '56px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1rem',
    },
    actionTitle: {
        fontSize: '1.125rem',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '0.5rem',
    },
    actionDescription: {
        fontSize: '0.875rem',
        color: '#6b7280',
    },
    progressBadge: {
        padding: '0.375rem 0.75rem',
        background: '#e9d5ff',
        color: '#9333ea',
        borderRadius: '12px',
        fontSize: '0.75rem',
        fontWeight: '700',
    },
    checklistContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
    },
    checklistItem: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        padding: '0.75rem',
        background: '#f9fafb',
        borderRadius: '8px',
    },
    checkboxUnchecked: {
        width: '24px',
        height: '24px',
        borderRadius: '6px',
        border: '2px solid #d1d5db',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: {
        width: '24px',
        height: '24px',
        borderRadius: '6px',
        background: '#2563eb',
        border: '2px solid #2563eb',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checklistLabel: {
        fontSize: '0.9375rem',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '0.125rem',
    },
    checklistDesc: {
        fontSize: '0.8125rem',
        color: '#6b7280',
    },
};
