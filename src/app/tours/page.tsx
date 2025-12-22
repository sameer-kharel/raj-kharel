'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

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
    alternateDate?: string;
    alternateTime?: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    confirmedDate?: string;
    confirmedTime?: string;
    clientNotes?: string;
    adminNotes?: string;
}

interface Listing {
    _id: string;
    title: string;
    address: string;
    featuredImage: string;
}

export default function ToursPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [bookings, setBookings] = useState<TourBooking[]>([]);
    const [listings, setListings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [selectedListing, setSelectedListing] = useState<string>('');
    const [formData, setFormData] = useState({
        preferredDate: '',
        preferredTime: '',
        alternateDate: '',
        alternateTime: '',
        clientNotes: '',
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login?callbackUrl=/tours');
        } else if (status === 'authenticated') {
            fetchData();
        }
    }, [status, router]);

    const fetchData = async () => {
        try {
            const [bookingsRes, listingsRes] = await Promise.all([
                fetch('/api/tour-bookings'),
                fetch('/api/listings'),
            ]);

            if (bookingsRes.ok) {
                const data = await bookingsRes.json();
                setBookings(data.bookings || []);
            }

            if (listingsRes.ok) {
                const data = await listingsRes.json();
                setListings(data.listings || []);
            }

            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedListing || !formData.preferredDate || !formData.preferredTime) return;

        setSubmitting(true);
        try {
            const res = await fetch('/api/tour-bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    listingId: selectedListing,
                    ...formData,
                }),
            });

            if (res.ok) {
                const data = await res.json();
                setBookings([data.booking, ...bookings]);
                setShowBookingForm(false);
                setFormData({
                    preferredDate: '',
                    preferredTime: '',
                    alternateDate: '',
                    alternateTime: '',
                    clientNotes: '',
                });
                setSelectedListing('');
            }
        } catch (error) {
            console.error('Error booking tour:', error);
        }
        setSubmitting(false);
    };

    if (status === 'loading' || loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.spinner} />
                <p style={styles.loadingText}>Loading tours...</p>
            </div>
        );
    }

    if (!session) return null;

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'confirmed':
                return styles.statusConfirmed;
            case 'completed':
                return styles.statusCompleted;
            case 'cancelled':
                return styles.statusCancelled;
            default:
                return styles.statusPending;
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.wrapper}>
                <div style={styles.header}>
                    <div>
                        <h1 style={styles.title}>House Tours</h1>
                        <p style={styles.subtitle}>Schedule and manage your property viewings</p>
                    </div>
                    <button
                        onClick={() => setShowBookingForm(!showBookingForm)}
                        style={styles.bookButton}
                    >
                        {showBookingForm ? 'Cancel' : '+ Book a Tour'}
                    </button>
                </div>

                {showBookingForm && (
                    <div style={styles.formCard}>
                        <h2 style={styles.formTitle}>Request a Tour</h2>
                        <form onSubmit={handleSubmit}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Select Property</label>
                                <select
                                    value={selectedListing}
                                    onChange={(e) => setSelectedListing(e.target.value)}
                                    style={styles.select}
                                    required
                                >
                                    <option value="">Choose a property...</option>
                                    {listings.map((listing) => (
                                        <option key={listing._id} value={listing._id}>
                                            {listing.title} - {listing.address}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div style={styles.formRow}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Preferred Date *</label>
                                    <input
                                        type="date"
                                        value={formData.preferredDate}
                                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                                        style={styles.input}
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Preferred Time *</label>
                                    <input
                                        type="time"
                                        value={formData.preferredTime}
                                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                                        style={styles.input}
                                        required
                                    />
                                </div>
                            </div>

                            <div style={styles.formRow}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Alternate Date (Optional)</label>
                                    <input
                                        type="date"
                                        value={formData.alternateDate}
                                        onChange={(e) => setFormData({ ...formData, alternateDate: e.target.value })}
                                        style={styles.input}
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Alternate Time (Optional)</label>
                                    <input
                                        type="time"
                                        value={formData.alternateTime}
                                        onChange={(e) => setFormData({ ...formData, alternateTime: e.target.value })}
                                        style={styles.input}
                                    />
                                </div>
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Notes (Optional)</label>
                                <textarea
                                    value={formData.clientNotes}
                                    onChange={(e) => setFormData({ ...formData, clientNotes: e.target.value })}
                                    style={styles.textarea}
                                    placeholder="Any special requests or questions..."
                                    rows={3}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                style={{
                                    ...styles.submitButton,
                                    opacity: submitting ? 0.7 : 1,
                                }}
                            >
                                {submitting ? 'Submitting...' : 'Request Tour'}
                            </button>
                        </form>
                    </div>
                )}

                <div style={styles.bookingsGrid}>
                    {bookings.length === 0 ? (
                        <div style={styles.emptyState}>
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            <p style={styles.emptyText}>No tour bookings yet</p>
                            <button
                                onClick={() => setShowBookingForm(true)}
                                style={styles.emptyButton}
                            >
                                Book Your First Tour
                            </button>
                        </div>
                    ) : (
                        bookings.map((booking) => (
                            <div key={booking._id} style={styles.bookingCard}>
                                <Image
                                    src={booking.listing.featuredImage}
                                    alt={booking.listing.title}
                                    width={300}
                                    height={200}
                                    style={styles.bookingImage}
                                />
                                <div style={styles.bookingContent}>
                                    <div style={{ ...styles.statusBadge, ...getStatusStyle(booking.status) }}>
                                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                    </div>
                                    <h3 style={styles.bookingTitle}>{booking.listing.title}</h3>
                                    <p style={styles.bookingAddress}>{booking.listing.address}</p>

                                    <div style={styles.bookingDetails}>
                                        <div style={styles.detailItem}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                                <line x1="16" y1="2" x2="16" y2="6" />
                                                <line x1="8" y1="2" x2="8" y2="6" />
                                                <line x1="3" y1="10" x2="21" y2="10" />
                                            </svg>
                                            <span style={styles.detailText}>
                                                {new Date(booking.preferredDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div style={styles.detailItem}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10" />
                                                <polyline points="12 6 12 12 16 14" />
                                            </svg>
                                            <span style={styles.detailText}>{booking.preferredTime}</span>
                                        </div>
                                    </div>

                                    {booking.status === 'confirmed' && booking.confirmedDate && (
                                        <div style={styles.confirmedInfo}>
                                            <p style={styles.confirmedText}>
                                                ✓ Confirmed for {new Date(booking.confirmedDate).toLocaleDateString()} at {booking.confirmedTime}
                                            </p>
                                        </div>
                                    )}

                                    {booking.adminNotes && (
                                        <div style={styles.adminNotes}>
                                            <p style={styles.notesLabel}>Admin Notes:</p>
                                            <p style={styles.notesText}>{booking.adminNotes}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
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
    bookButton: {
        padding: '0.75rem 1.5rem',
        background: '#2563eb',
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '0.9375rem',
        fontWeight: '600',
        cursor: 'pointer',
    },
    formCard: {
        background: '#ffffff',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    },
    formTitle: {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '1.5rem',
    },
    formGroup: {
        marginBottom: '1.25rem',
    },
    formRow: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
    },
    label: {
        display: 'block',
        fontSize: '0.875rem',
        fontWeight: '600',
        color: '#374151',
        marginBottom: '0.5rem',
    },
    input: {
        width: '100%',
        padding: '0.75rem',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        fontSize: '0.9375rem',
    },
    select: {
        width: '100%',
        padding: '0.75rem',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        fontSize: '0.9375rem',
    },
    textarea: {
        width: '100%',
        padding: '0.75rem',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        fontSize: '0.9375rem',
        resize: 'vertical',
    },
    submitButton: {
        width: '100%',
        padding: '0.875rem',
        background: '#2563eb',
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
    },
    bookingsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '1.5rem',
    },
    bookingCard: {
        background: '#ffffff',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    },
    bookingImage: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
    },
    bookingContent: {
        padding: '1.5rem',
    },
    statusBadge: {
        display: 'inline-block',
        padding: '0.375rem 0.75rem',
        borderRadius: '6px',
        fontSize: '0.75rem',
        fontWeight: '600',
        marginBottom: '0.75rem',
    },
    statusPending: {
        background: '#fef3c7',
        color: '#92400e',
    },
    statusConfirmed: {
        background: '#dcfce7',
        color: '#166534',
    },
    statusCompleted: {
        background: '#dbeafe',
        color: '#1e40af',
    },
    statusCancelled: {
        background: '#fee2e2',
        color: '#991b1b',
    },
    bookingTitle: {
        fontSize: '1.125rem',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '0.5rem',
    },
    bookingAddress: {
        fontSize: '0.875rem',
        color: '#6b7280',
        marginBottom: '1rem',
    },
    bookingDetails: {
        display: 'flex',
        gap: '1.5rem',
        marginBottom: '1rem',
    },
    detailItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    detailText: {
        fontSize: '0.875rem',
        color: '#6b7280',
    },
    confirmedInfo: {
        background: '#dcfce7',
        padding: '0.75rem',
        borderRadius: '8px',
        marginBottom: '1rem',
    },
    confirmedText: {
        fontSize: '0.875rem',
        color: '#166534',
        fontWeight: '600',
    },
    adminNotes: {
        background: '#f9fafb',
        padding: '0.75rem',
        borderRadius: '8px',
    },
    notesLabel: {
        fontSize: '0.75rem',
        fontWeight: '600',
        color: '#6b7280',
        marginBottom: '0.25rem',
    },
    notesText: {
        fontSize: '0.875rem',
        color: '#374151',
    },
    emptyState: {
        gridColumn: '1 / -1',
        textAlign: 'center',
        padding: '4rem 2rem',
        color: '#9ca3af',
    },
    emptyText: {
        fontSize: '1.125rem',
        marginTop: '1rem',
        marginBottom: '1.5rem',
    },
    emptyButton: {
        padding: '0.75rem 1.5rem',
        background: '#2563eb',
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '0.9375rem',
        fontWeight: '600',
        cursor: 'pointer',
    },
};
