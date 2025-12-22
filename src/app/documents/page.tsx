'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Document {
    _id: string;
    listing: {
        _id: string;
        title: string;
        address: string;
    };
    documentType: string;
    fileName: string;
    fileUrl: string;
    fileSize: number;
    status: 'pending' | 'verified' | 'rejected';
    rejectionReason?: string;
    createdAt: string;
}

interface Listing {
    _id: string;
    title: string;
    address: string;
}

export default function DocumentsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [documents, setDocuments] = useState<Document[]>([]);
    const [listings, setListings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [selectedListing, setSelectedListing] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [notes, setNotes] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login?callbackUrl=/documents');
        } else if (status === 'authenticated') {
            fetchData();
        }
    }, [status, router]);

    const fetchData = async () => {
        try {
            const [docsRes, listingsRes] = await Promise.all([
                fetch('/api/documents'),
                fetch('/api/listings'),
            ]);

            if (docsRes.ok) {
                const data = await docsRes.json();
                setDocuments(data.documents || []);
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);

        if (selectedFile && selectedFile.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePreview(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setFilePreview(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !documentType) return;

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            if (selectedListing) formData.append('listingId', selectedListing);
            formData.append('documentType', documentType);
            formData.append('notes', notes);

            const res = await fetch('/api/documents', {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                setDocuments([data.document, ...documents]);
                setShowUploadForm(false);
                setFile(null);
                setFilePreview(null);
                setSelectedListing('');
                setDocumentType('');
                setNotes('');
            }
        } catch (error) {
            console.error('Error uploading document:', error);
        }
        setUploading(false);
    };

    if (status === 'loading' || loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.spinner} />
                <p style={styles.loadingText}>Loading documents...</p>
            </div>
        );
    }

    if (!session) return null;

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'verified':
                return styles.statusVerified;
            case 'rejected':
                return styles.statusRejected;
            default:
                return styles.statusPending;
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const formatDocumentType = (type: string) => {
        return type.split('_').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    return (
        <div style={styles.container}>
            <div style={styles.wrapper}>
                {/* Back Button */}
                <button
                    onClick={() => router.push('/dashboard')}
                    style={styles.backToDashboard}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    <span>Back to Dashboard</span>
                </button>

                <div style={styles.topSection}>
                    <div>
                        <h1 style={styles.title}>Documents</h1>
                        <p style={styles.subtitle}>Upload and manage your real estate documents</p>
                    </div>
                    <button
                        onClick={() => setShowUploadForm(!showUploadForm)}
                        style={styles.uploadButtonPremium}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            {showUploadForm ? (
                                <path d="M18 6L6 18M6 6l12 12" />
                            ) : (
                                <path d="M12 5v14M5 12h14" />
                            )}
                        </svg>
                        <span>{showUploadForm ? 'Cancel Upload' : 'Upload New'}</span>
                    </button>
                </div>

                {showUploadForm && (
                    <div style={styles.formCard}>
                        <h2 style={styles.formTitle}>Upload Document</h2>
                        <form onSubmit={handleSubmit}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Property (Optional)</label>
                                <select
                                    value={selectedListing}
                                    onChange={(e) => setSelectedListing(e.target.value)}
                                    style={styles.select}
                                >
                                    <option value="">General Document (No specific property)</option>
                                    {listings.map((listing) => (
                                        <option key={listing._id} value={listing._id}>
                                            {listing.title} - {listing.address}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Document Type</label>
                                <select
                                    value={documentType}
                                    onChange={(e) => setDocumentType(e.target.value)}
                                    style={styles.select}
                                    required
                                >
                                    <option value="">Select document type...</option>
                                    <option value="id_proof">ID Proof</option>
                                    <option value="income_proof">Income Proof</option>
                                    <option value="pre_approval">Pre-Approval Letter</option>
                                    <option value="bank_statement">Bank Statement</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>File</label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    style={styles.fileInput}
                                    required
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                />
                                {filePreview && (
                                    <div style={{ marginTop: '1rem', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                                        <img src={filePreview} alt="Preview" style={{ maxWidth: '100%', display: 'block' }} />
                                    </div>
                                )}
                                <p style={styles.fileHint}>
                                    Accepted formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                                </p>
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Notes (Optional)</label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    style={styles.textarea}
                                    placeholder="Any additional information..."
                                    rows={3}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={uploading}
                                style={{
                                    ...styles.submitButton,
                                    opacity: uploading ? 0.7 : 1,
                                }}
                            >
                                {uploading ? 'Uploading...' : 'Upload Document'}
                            </button>
                        </form>
                    </div>
                )}

                <div style={styles.documentsGrid}>
                    {documents.length === 0 ? (
                        <div style={styles.emptyState}>
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                            </svg>
                            <p style={styles.emptyText}>No documents uploaded yet</p>
                            <button
                                onClick={() => setShowUploadForm(true)}
                                style={styles.emptyButton}
                            >
                                Upload Your First Document
                            </button>
                        </div>
                    ) : (
                        documents.map((doc) => (
                            <div key={doc._id} style={styles.documentCard}>
                                <div style={styles.documentHeader}>
                                    <div style={styles.documentIcon}>
                                        {doc.fileUrl.match(/\.(jpg|jpeg|png|webp|gif)$/i) ? (
                                            <div style={{ width: '100%', height: '100%', position: 'relative', borderRadius: '12px', overflow: 'hidden' }}>
                                                <Image
                                                    src={doc.fileUrl}
                                                    alt={doc.fileName}
                                                    fill
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            </div>
                                        ) : (
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                <polyline points="14 2 14 8 20 8" />
                                            </svg>
                                        )}
                                    </div>
                                    <div style={{ ...styles.statusBadge, ...getStatusStyle(doc.status) }}>
                                        {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                                    </div>
                                </div>

                                <h3 style={styles.documentTitle}>{formatDocumentType(doc.documentType)}</h3>
                                {doc.listing ? (
                                    <>
                                        <p style={styles.documentProperty}>{doc.listing.title}</p>
                                        <p style={styles.documentAddress}>{doc.listing.address}</p>
                                    </>
                                ) : (
                                    <p style={styles.documentProperty}>General Document</p>
                                )}

                                <div style={styles.documentDetails}>
                                    <div style={styles.detailRow}>
                                        <span style={styles.detailLabel}>File:</span>
                                        <span style={styles.detailValue}>{doc.fileName}</span>
                                    </div>
                                    <div style={styles.detailRow}>
                                        <span style={styles.detailLabel}>Size:</span>
                                        <span style={styles.detailValue}>{formatFileSize(doc.fileSize)}</span>
                                    </div>
                                    <div style={styles.detailRow}>
                                        <span style={styles.detailLabel}>Uploaded:</span>
                                        <span style={styles.detailValue}>
                                            {new Date(doc.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                {doc.status === 'rejected' && doc.rejectionReason && (
                                    <div style={styles.rejectionReason}>
                                        <p style={styles.rejectionLabel}>Rejection Reason:</p>
                                        <p style={styles.rejectionText}>{doc.rejectionReason}</p>
                                    </div>
                                )}

                                <a
                                    href={doc.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={styles.viewButton}
                                >
                                    View Document →
                                </a>
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
    backToDashboard: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.875rem 1.5rem',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '16px',
        color: '#1e293b',
        textDecoration: 'none',
        fontSize: '0.9375rem',
        fontWeight: '700',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
        marginBottom: '2rem',
        cursor: 'pointer',
    },
    topSection: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '3rem',
    },
    uploadButtonPremium: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '1rem 2rem',
        background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
        color: '#ffffff',
        border: 'none',
        borderRadius: '16px',
        fontSize: '1rem',
        fontWeight: '700',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 8px 20px rgba(37, 99, 235, 0.25)',
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
    label: {
        display: 'block',
        fontSize: '0.875rem',
        fontWeight: '600',
        color: '#374151',
        marginBottom: '0.5rem',
    },
    select: {
        width: '100%',
        padding: '0.75rem',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        fontSize: '0.9375rem',
    },
    fileInput: {
        width: '100%',
        padding: '0.75rem',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        fontSize: '0.9375rem',
    },
    fileHint: {
        fontSize: '0.75rem',
        color: '#9ca3af',
        marginTop: '0.5rem',
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
    documentsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.5rem',
    },
    documentCard: {
        background: '#ffffff',
        borderRadius: '16px',
        padding: '1.5rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    },
    documentHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1rem',
    },
    documentIcon: {
        width: '56px',
        height: '56px',
        background: '#eff6ff',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusBadge: {
        padding: '0.375rem 0.75rem',
        borderRadius: '6px',
        fontSize: '0.75rem',
        fontWeight: '600',
    },
    statusPending: {
        background: '#fef3c7',
        color: '#92400e',
    },
    statusVerified: {
        background: '#dcfce7',
        color: '#166534',
    },
    statusRejected: {
        background: '#fee2e2',
        color: '#991b1b',
    },
    documentTitle: {
        fontSize: '1.125rem',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '0.5rem',
    },
    documentProperty: {
        fontSize: '0.9375rem',
        color: '#374151',
        marginBottom: '0.25rem',
    },
    documentAddress: {
        fontSize: '0.8125rem',
        color: '#6b7280',
        marginBottom: '1rem',
    },
    documentDetails: {
        background: '#f9fafb',
        padding: '0.75rem',
        borderRadius: '8px',
        marginBottom: '1rem',
    },
    detailRow: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '0.5rem',
    },
    detailLabel: {
        fontSize: '0.8125rem',
        color: '#6b7280',
        fontWeight: '600',
    },
    detailValue: {
        fontSize: '0.8125rem',
        color: '#374151',
    },
    rejectionReason: {
        background: '#fee2e2',
        padding: '0.75rem',
        borderRadius: '8px',
        marginBottom: '1rem',
    },
    rejectionLabel: {
        fontSize: '0.75rem',
        fontWeight: '600',
        color: '#991b1b',
        marginBottom: '0.25rem',
    },
    rejectionText: {
        fontSize: '0.8125rem',
        color: '#7f1d1d',
    },
    viewButton: {
        display: 'block',
        width: '100%',
        padding: '0.75rem',
        background: '#2563eb',
        color: '#ffffff',
        textAlign: 'center',
        borderRadius: '8px',
        textDecoration: 'none',
        fontSize: '0.9375rem',
        fontWeight: '600',
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
