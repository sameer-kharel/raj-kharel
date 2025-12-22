'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Type definitions
interface User {
    _id: string;
    email: string;
    name?: string;
    image?: string;
    role: 'client' | 'admin';
    createdAt?: string;
}

interface DocumentSubmission {
    _id: string;
    client: User;
    listing?: {
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

interface Checklist {
    _id: string;
    client: User;
    listing?: {
        _id: string;
        title: string;
        address: string;
    };
    type?: 'buying' | 'selling' | 'general';
    tourCompleted: boolean;
    documentsSubmitted: boolean;
    documentsVerified: boolean;
    offerMade: boolean;
    offerAccepted: boolean;
    customItems: Array<{ label: string; completed: boolean }>;
    isIssued?: boolean;
}

interface Conversation {
    _id: string;
    client: User;
    listing?: {
        _id: string;
        title: string;
        address: string;
    };
    adminUnreadCount: number;
    lastMessageAt: string;
}

interface Message {
    _id: string;
    sender: {
        _id: string;
        name: string;
        role: string;
        email?: string;
    };
    senderRole: 'admin' | 'client';
    content: string;
    isRead?: boolean;
    createdAt: string;
}

interface Listing {
    _id: string;
    title: string;
    address: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    featuredImage: string;
    description: string;
    features: string[];
    status: 'active' | 'pending' | 'sold';
    soldPrice?: number;
    soldDate?: string;
}

interface TourBooking {
    _id: string;
    client: User;
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
    createdAt: string;
}

// Shared styles
const styles = {
    panel: {
        background: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        border: '1px solid #e2e8f0',
        overflow: 'hidden' as const,
    },
    panelHeader: {
        padding: '1.5rem 2rem',
        borderBottom: '1px solid #e2e8f0',
        background: '#f8fafc',
    },
    panelTitle: {
        fontSize: '1.25rem',
        fontWeight: '700',
        color: '#0f172a',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse' as const,
    },
    tableHead: {
        background: '#f8fafc',
    },
    th: {
        padding: '1rem 1.5rem',
        textAlign: 'left' as const,
        fontSize: '0.875rem',
        fontWeight: '700',
        color: '#475569',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.05em',
    },
    td: {
        padding: '1.25rem 1.5rem',
        borderTop: '1px solid #f1f5f9',
        verticalAlign: 'top' as const,
    },
    actionButton: {
        padding: '0.5rem 1rem',
        fontSize: '0.875rem',
        fontWeight: '600',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        marginLeft: '0.5rem',
    },
    buttonSold: {
        background: '#dcfce7',
        color: '#15803d',
    },
    buttonDelete: {
        background: '#fee2e2',
        color: '#dc2626',
    },
    emptyState: {
        textAlign: 'center' as const,
        padding: '3rem 1rem',
        color: '#94a3b8',
        fontSize: '1rem',
    },
    input: {
        width: '100%',
        padding: '0.75rem 1rem',
        fontSize: '0.9375rem',
        border: '2px solid #e2e8f0',
        borderRadius: '8px',
        background: '#ffffff',
        transition: 'all 0.2s ease',
        fontFamily: 'inherit',
    },
    label: {
        display: 'block',
        fontSize: '0.875rem',
        fontWeight: '600',
        color: '#334155',
        marginBottom: '0.5rem',
    },
};

const Panel = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={styles.panel}>
        <div style={styles.panelHeader}>
            <h3 style={styles.panelTitle}>{title}</h3>
        </div>
        {children}
    </div>
);

const ChecklistItem = ({ label, completed }: { label: string; completed: boolean }) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.625rem',
        background: '#ffffff',
        borderRadius: '6px',
        border: '1px solid #e2e8f0'
    }}>
        <div style={{
            width: '18px',
            height: '18px',
            borderRadius: '4px',
            background: completed ? '#10b981' : '#e2e8f0',
            border: completed ? '2px solid #10b981' : '2px solid #cbd5e1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
        }}>
            {completed && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            )}
        </div>
        <span style={{ fontSize: '0.8125rem', color: completed ? '#0f172a' : '#64748b', fontWeight: completed ? '600' : '400' }}>
            {label}
        </span>
    </div>
);

// Documents Tab Component
export const DocumentsTab = () => {
    const [documents, setDocuments] = useState<DocumentSubmission[]>([]);
    const [loading, setLoading] = useState(true);
    const [groupBy, setGroupBy] = useState<'all' | 'client'>('client');

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const res = await fetch('/api/documents');
            if (res.ok) {
                const data = await res.json();
                setDocuments(data.documents || []);
            }
        } catch (error) {
            console.error('Error fetching documents:', error);
        }
        setLoading(false);
    };

    const handleVerify = async (docId: string) => {
        if (!confirm('Verify this document?')) return;
        try {
            const res = await fetch('/api/documents', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ documentId: docId, status: 'verified' }),
            });
            if (res.ok) {
                alert('Document verified successfully');
                fetchDocuments();
            }
        } catch (error) {
            alert('Failed to verify document');
            console.error(error);
        }
    };

    const handleReject = async (docId: string) => {
        const reason = prompt('Enter rejection reason:');
        if (!reason) return;
        try {
            const res = await fetch('/api/documents', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ documentId: docId, status: 'rejected', rejectionReason: reason }),
            });
            if (res.ok) {
                alert('Document rejected');
                fetchDocuments();
            }
        } catch (error) {
            alert('Failed to reject document');
            console.error(error);
        }
    };

    const groupedDocs = groupBy === 'client'
        ? documents.reduce((acc, doc) => {
            const clientId = doc.client._id;
            if (!acc[clientId]) acc[clientId] = [];
            acc[clientId].push(doc);
            return acc;
        }, {} as Record<string, DocumentSubmission[]>)
        : { all: documents };

    return (
        <Panel title="Client Documents">
            <div style={{ padding: '1.5rem 2rem' }}>
                <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={() => setGroupBy('client')}
                        style={{
                            padding: '0.5rem 1rem',
                            background: groupBy === 'client' ? '#2563eb' : '#f1f5f9',
                            color: groupBy === 'client' ? 'white' : '#64748b',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '600',
                        }}
                    >
                        Group by Client
                    </button>
                    <button
                        onClick={() => setGroupBy('all')}
                        style={{
                            padding: '0.5rem 1rem',
                            background: groupBy === 'all' ? '#2563eb' : '#f1f5f9',
                            color: groupBy === 'all' ? 'white' : '#64748b',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '600',
                        }}
                    >
                        Show All
                    </button>
                </div>

                {loading ? (
                    <div style={styles.emptyState}>Loading documents...</div>
                ) : documents.length === 0 ? (
                    <div style={styles.emptyState}>No documents uploaded yet</div>
                ) : (
                    Object.entries(groupedDocs).map(([key, docs]) => (
                        <div key={key} style={{ marginBottom: '2rem' }}>
                            {groupBy === 'client' && docs[0] && (
                                <h4 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#0f172a', marginBottom: '1rem' }}>
                                    {docs[0].client.name || docs[0].client.email}
                                </h4>
                            )}
                            <table style={styles.table}>
                                <thead style={styles.tableHead}>
                                    <tr>
                                        {groupBy !== 'client' && <th style={styles.th}>Client</th>}
                                        <th style={styles.th}>Document Type</th>
                                        <th style={styles.th}>Property</th>
                                        <th style={styles.th}>File</th>
                                        <th style={styles.th}>Status</th>
                                        <th style={{ ...styles.th, textAlign: 'right' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {docs.map((doc) => (
                                        <tr key={doc._id}>
                                            {groupBy !== 'client' && (
                                                <td style={styles.td}>
                                                    <div style={{ fontWeight: '600', color: '#0f172a' }}>{doc.client.name || 'N/A'}</div>
                                                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>{doc.client.email}</div>
                                                </td>
                                            )}
                                            <td style={styles.td}>
                                                <span style={{
                                                    padding: '0.25rem 0.5rem',
                                                    background: '#f1f5f9',
                                                    borderRadius: '4px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '700',
                                                    color: '#475569',
                                                    textTransform: 'uppercase'
                                                }}>
                                                    {doc.documentType.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td style={styles.td}>
                                                <div style={{ fontWeight: '600', color: '#0f172a' }}>{doc.listing?.title || 'General'}</div>
                                                {doc.listing?.address && <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{doc.listing.address}</div>}
                                            </td>
                                            <td style={styles.td}>
                                                <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>
                                                    {doc.fileName}
                                                </a>
                                            </td>
                                            <td style={styles.td}>
                                                <span style={{
                                                    padding: '0.375rem 0.75rem',
                                                    borderRadius: '6px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '600',
                                                    background: doc.status === 'verified' ? '#dcfce7' : doc.status === 'rejected' ? '#fee2e2' : '#fef3c7',
                                                    color: doc.status === 'verified' ? '#166534' : doc.status === 'rejected' ? '#991b1b' : '#92400e',
                                                }}>
                                                    {doc.status.toUpperCase()}
                                                </span>
                                            </td>
                                            <td style={{ ...styles.td, textAlign: 'right' }}>
                                                {doc.status === 'pending' && (
                                                    <>
                                                        <button onClick={() => handleVerify(doc._id)} style={{ ...styles.actionButton, ...styles.buttonSold }}>Verify</button>
                                                        <button onClick={() => handleReject(doc._id)} style={{ ...styles.actionButton, ...styles.buttonDelete }}>Reject</button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))
                )}
            </div>
        </Panel>
    );
};

// Checklists Tab Component
export const ChecklistsTab = () => {
    const [checklists, setChecklists] = useState<Checklist[]>([]);
    const [clients, setClients] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [selectedClient, setSelectedClient] = useState('');
    const [customItems, setCustomItems] = useState<Array<{ label: string; completed: boolean }>>([]);
    const [newItemLabel, setNewItemLabel] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [checklistsRes, clientsRes] = await Promise.all([
                fetch('/api/checklists'),
                fetch('/api/users'),
            ]);

            if (checklistsRes.ok) {
                const data = await checklistsRes.json();
                setChecklists(data.checklists || []);
            }

            if (clientsRes.ok) {
                const data = await clientsRes.json();
                setClients(data.users?.filter((u: User) => u.role === 'client') || []);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };

    const handleAddItem = () => {
        if (!newItemLabel.trim()) return;
        setCustomItems([...customItems, { label: newItemLabel, completed: false }]);
        setNewItemLabel('');
    };

    const handleRemoveItem = (index: number) => {
        setCustomItems(customItems.filter((_, i) => i !== index));
    };

    const handleCreateChecklist = async (issueNow: boolean) => {
        if (!selectedClient) {
            alert('Please select a client');
            return;
        }

        try {
            const res = await fetch('/api/checklists', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    clientId: selectedClient,
                    type: 'general',
                    customItems,
                    issueNow,
                }),
            });

            if (res.ok) {
                alert(`Checklist ${issueNow ? 'created and issued' : 'created as draft'} successfully`);
                setShowCreateForm(false);
                setSelectedClient('');
                setCustomItems([]);
                fetchData();
            } else {
                alert('Failed to create checklist');
            }
        } catch (error) {
            alert('Error creating checklist');
            console.error(error);
        }
    };

    const handleIssueChecklist = async (checklistId: string) => {
        if (!confirm('Issue this checklist to the client?')) return;

        try {
            const checklist = checklists.find(c => c._id === checklistId);
            if (!checklist) return;

            const res = await fetch('/api/checklists', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    clientId: checklist.client._id,
                    type: checklist.type,
                    updates: { isIssued: true },
                }),
            });

            if (res.ok) {
                alert('Checklist issued successfully');
                fetchData();
            }
        } catch (error) {
            alert('Failed to issue checklist');
            console.error(error);
        }
    };

    return (
        <Panel title="Client Checklists">
            <div style={{ padding: '1.5rem 2rem' }}>
                <button
                    onClick={() => setShowCreateForm(!showCreateForm)}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: '#2563eb',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        marginBottom: '1.5rem',
                    }}
                >
                    {showCreateForm ? 'Cancel' : '+ Create New Checklist'}
                </button>

                {showCreateForm && (
                    <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1rem' }}>Create New Checklist</h4>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={styles.label}>Select Client</label>
                            <select value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)} style={styles.input}>
                                <option value="">Choose a client...</option>
                                {clients.map((client) => (
                                    <option key={client._id} value={client._id}>
                                        {client.name || client.email}
                                    </option>
                                ))}
                            </select>
                        </div>



                        <div style={{ marginBottom: '1rem' }}>
                            <label style={styles.label}>Checklist Items</label>
                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                <input
                                    type="text"
                                    value={newItemLabel}
                                    onChange={(e) => setNewItemLabel(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                                    placeholder="Enter item label..."
                                    style={{ ...styles.input, marginBottom: 0 }}
                                />
                                <button
                                    onClick={handleAddItem}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        background: '#10b981',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                    }}
                                >
                                    Add
                                </button>
                            </div>

                            {customItems.map((item, index) => (
                                <div key={index} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <span style={{ flex: 1, padding: '0.5rem', background: 'white', borderRadius: '6px' }}>{item.label}</span>
                                    <button
                                        onClick={() => handleRemoveItem(index)}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            background: '#fee2e2',
                                            color: '#dc2626',
                                            border: 'none',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            fontWeight: '600',
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button
                                onClick={() => handleCreateChecklist(false)}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: '#64748b',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                }}
                            >
                                Save as Draft
                            </button>
                            <button
                                onClick={() => handleCreateChecklist(true)}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: '#2563eb',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                }}
                            >
                                Create & Issue Now
                            </button>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div style={styles.emptyState}>Loading checklists...</div>
                ) : checklists.length === 0 ? (
                    <div style={styles.emptyState}>No checklists created yet</div>
                ) : (
                    <table style={styles.table}>
                        <thead style={styles.tableHead}>
                            <tr>
                                <th style={styles.th}>Client</th>
                                <th style={styles.th}>Type</th>
                                <th style={styles.th}>Items</th>
                                <th style={styles.th}>Progress</th>
                                <th style={styles.th}>Status</th>
                                <th style={{ ...styles.th, textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {checklists.map((checklist) => {
                                const total = checklist.customItems.length;
                                const completed = checklist.customItems.filter(i => i.completed).length;
                                const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

                                return (
                                    <tr key={checklist._id}>
                                        <td style={styles.td}>
                                            <div style={{ fontWeight: '600', color: '#0f172a' }}>{checklist.client.name || 'N/A'}</div>
                                            <div style={{ fontSize: '0.875rem', color: '#64748b' }}>{checklist.client.email}</div>
                                        </td>
                                        <td style={styles.td}>{checklist.type?.toUpperCase() || 'GENERAL'}</td>
                                        <td style={styles.td}>{total} items</td>
                                        <td style={styles.td}>{progress}%</td>
                                        <td style={styles.td}>
                                            <span style={{
                                                padding: '0.375rem 0.75rem',
                                                borderRadius: '6px',
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                                background: checklist.isIssued ? '#dcfce7' : '#fef3c7',
                                                color: checklist.isIssued ? '#166534' : '#92400e',
                                            }}>
                                                {checklist.isIssued ? 'ISSUED' : 'DRAFT'}
                                            </span>
                                        </td>
                                        <td style={{ ...styles.td, textAlign: 'right' }}>
                                            {!checklist.isIssued && (
                                                <button onClick={() => handleIssueChecklist(checklist._id)} style={{ ...styles.actionButton, ...styles.buttonSold }}>
                                                    Issue to Client
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </Panel>
    );
};



// Conversations Tab Component
export const ConversationsTab = () => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [checklist, setChecklist] = useState<Checklist | null>(null);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        fetchConversations();
    }, []);

    // Real-time polling for messages
    useEffect(() => {
        if (selectedConv) {
            // Poll for new messages every 2 seconds
            pollingIntervalRef.current = setInterval(() => {
                fetchMessages(selectedConv._id, true);
            }, 2000);

            // Also poll for conversation updates
            const convPolling = setInterval(() => {
                fetchConversations(true);
            }, 3000);

            return () => {
                if (pollingIntervalRef.current) {
                    clearInterval(pollingIntervalRef.current);
                }
                clearInterval(convPolling);
            };
        }
    }, [selectedConv]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const fetchConversations = async (silent = false) => {
        if (!silent) setLoading(true);
        try {
            const res = await fetch('/api/conversations');
            if (res.ok) {
                const data = await res.json();
                setConversations(data.conversations || []);
            }
        } catch (error) {
            if (!silent) console.error('Error fetching conversations:', error);
        }
        if (!silent) setLoading(false);
    };

    const fetchMessages = async (convId: string, silent = false) => {
        try {
            const res = await fetch(`/api/conversations/${convId}/messages`);
            if (res.ok) {
                const data = await res.json();
                const newMessages = data.messages || [];

                // Only update if messages have changed
                if (JSON.stringify(newMessages) !== JSON.stringify(messages)) {
                    setMessages(newMessages);
                }
            }
        } catch (error) {
            if (!silent) console.error('Error fetching messages:', error);
        }
    };

    const fetchChecklist = async (conv: Conversation) => {
        if (!conv.listing) {
            setChecklist(null);
            return;
        }

        try {
            const res = await fetch(`/api/checklists?clientId=${conv.client._id}&listingId=${conv.listing._id}`);
            if (res.ok) {
                const data = await res.json();
                setChecklist(data.checklist);
            }
        } catch (error) {
            console.error('Error fetching checklist:', error);
        }
    };

    const handleSelectConversation = (conv: Conversation) => {
        setSelectedConv(conv);
        fetchMessages(conv._id);
        fetchChecklist(conv);
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedConv || sending) return;

        setSending(true);
        try {
            const res = await fetch(`/api/conversations/${selectedConv._id}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: newMessage }),
            });

            if (res.ok) {
                const data = await res.json();
                setMessages([...messages, data.message]);
                setNewMessage('');
                fetchMessages(selectedConv._id, true);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
        setSending(false);
    };

    const handleDeleteMessage = async (messageId: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return;
        try {
            const res = await fetch(`/api/messages/${messageId}`, { method: 'DELETE' });
            if (res.ok) {
                setMessages((prev) => prev.filter((m) => m._id !== messageId));
                fetchConversations(true);
            }
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    if (loading) return <div style={styles.emptyState}>Loading conversations...</div>;

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: selectedConv ? '320px 1fr 280px' : '1fr',
            gap: 0,
            background: '#ffffff',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            height: '80vh'
        }}>
            {/* Conversations List */}
            <div style={{
                borderRight: selectedConv ? '1px solid #e4e6eb' : 'none',
                display: 'flex',
                flexDirection: 'column',
                background: '#ffffff'
            }}>
                <div style={{
                    padding: '1.25rem 1rem',
                    borderBottom: '1px solid #e4e6eb',
                    background: '#ffffff'
                }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#050505', margin: 0 }}>
                        Clients
                    </h3>
                    <p style={{ fontSize: '0.75rem', color: '#65676b', margin: '0.25rem 0 0 0' }}>
                        {conversations.length} conversation{conversations.length !== 1 ? 's' : ''}
                    </p>
                </div>
                <div style={{ flex: 1, overflowY: 'auto' }}>
                    {conversations.map((conv) => (
                        <div
                            key={conv._id}
                            onClick={() => handleSelectConversation(conv)}
                            style={{
                                padding: '0.75rem 1rem',
                                borderBottom: '1px solid #f0f2f5',
                                cursor: 'pointer',
                                background: selectedConv?._id === conv._id ? '#e7f3ff' : 'transparent',
                                transition: 'background 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}
                        >
                            <div style={{
                                width: '46px',
                                height: '46px',
                                borderRadius: '50%',
                                background: conv.listing ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' : 'linear-gradient(135deg, #10b981, #059669)',
                                color: '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.125rem',
                                fontWeight: '600',
                                flexShrink: 0
                            }}>
                                {conv.client.name?.charAt(0) || 'C'}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', alignItems: 'center' }}>
                                    <span style={{ fontWeight: '600', color: '#050505', fontSize: '0.9375rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {conv.client.name || conv.client.email}
                                    </span>
                                    {conv.adminUnreadCount > 0 && (
                                        <span style={{
                                            background: '#0084ff',
                                            color: 'white',
                                            borderRadius: '50%',
                                            minWidth: '18px',
                                            height: '18px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '0.6875rem',
                                            fontWeight: '700',
                                            padding: '0 0.25rem',
                                            marginLeft: '0.5rem'
                                        }}>
                                            {conv.adminUnreadCount}
                                        </span>
                                    )}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#65676b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {conv.listing ? conv.listing.title : '💬 Direct Message'}
                                </div>
                            </div>
                        </div>
                    ))}
                    {conversations.length === 0 && <div style={styles.emptyState}>No conversations yet</div>}
                </div>
            </div>

            {/* Messages Area */}
            {selectedConv && (
                <>
                    <div style={{ display: 'flex', flexDirection: 'column', background: '#ffffff' }}>
                        {/* Header */}
                        <div style={{
                            padding: '1.25rem 1.5rem',
                            borderBottom: '1px solid #e4e6eb',
                            background: 'linear-gradient(to right, #ffffff, #f8fafc)',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    background: selectedConv.listing ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' : 'linear-gradient(135deg, #10b981, #059669)',
                                    color: '#ffffff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.125rem',
                                    fontWeight: '700',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                                    flexShrink: 0
                                }}>
                                    {selectedConv.client.name?.charAt(0) || selectedConv.client.email?.charAt(0) || 'C'}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                        <h3 style={{ fontSize: '1.0625rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                                            {selectedConv.client.name || 'Client'}
                                        </h3>
                                        <span style={{
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '4px',
                                            background: selectedConv.listing ? '#dbeafe' : '#dcfce7',
                                            color: selectedConv.listing ? '#1e40af' : '#15803d'
                                        }}>
                                            {selectedConv.listing ? 'Property' : 'Direct'}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
                                        <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: 0, fontWeight: '500' }}>
                                            📧 {selectedConv.client.email}
                                        </p>
                                        {selectedConv.listing && (
                                            <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>
                                                🏠 {selectedConv.listing.title}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div style={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: '1rem',
                            background: '#f0f2f5',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.25rem'
                        }}>
                            {messages.length === 0 ? (
                                <div style={{
                                    textAlign: 'center',
                                    padding: '3rem 2rem',
                                    color: '#65676b',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#050505', marginBottom: '0.75rem' }}>
                                        Start a Conversation
                                    </h3>
                                    <p style={{ fontSize: '1rem', color: '#65676b' }}>
                                        Send a message below to start the conversation.
                                    </p>
                                </div>
                            ) : (
                                messages.map((msg, index) => {
                                    const isAdmin = msg.senderRole === 'admin';
                                    const prevMessage = index > 0 ? messages[index - 1] : null;
                                    const isGroupStart = !prevMessage || prevMessage.sender._id !== msg.sender._id;
                                    const showAvatar = index === 0 || messages[index - 1].sender._id !== msg.sender._id;
                                    const nextMessage = index < messages.length - 1 ? messages[index + 1] : null;
                                    const isGroupEnd = !nextMessage || nextMessage.sender._id !== msg.sender._id;

                                    return (
                                        <div key={msg._id}>
                                            {isGroupStart && (
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: isAdmin ? 'flex-end' : 'flex-start',
                                                    marginTop: index > 0 ? '1.25rem' : '0.5rem',
                                                    marginBottom: '0.375rem',
                                                }}>
                                                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0f172a' }}>
                                                        {isAdmin ? 'You (Admin)' : (msg.sender?.name || 'Client')}
                                                    </span>
                                                </div>
                                            )}

                                            <div style={{
                                                display: 'flex',
                                                justifyContent: isAdmin ? 'flex-end' : 'flex-start',
                                                alignItems: 'flex-end',
                                                gap: '0.5rem',
                                                marginBottom: '0.125rem'
                                            }}>
                                                {!isAdmin && showAvatar && (
                                                    <div style={{
                                                        width: '32px',
                                                        height: '32px',
                                                        borderRadius: '50%',
                                                        background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                                                        color: '#ffffff',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontSize: '0.875rem',
                                                        fontWeight: '700',
                                                        flexShrink: 0
                                                    }}>
                                                        {msg.sender?.name?.charAt(0) || 'C'}
                                                    </div>
                                                )}
                                                {!isAdmin && !showAvatar && <div style={{ width: '32px', flexShrink: 0 }} />}

                                                <div style={{
                                                    maxWidth: '64%',
                                                    padding: '0.75rem 1rem',
                                                    borderRadius: '18px',
                                                    background: isAdmin ? 'linear-gradient(135deg, #0084ff, #0073e6)' : '#ffffff',
                                                    color: isAdmin ? '#ffffff' : '#1e293b',
                                                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                                    borderBottomLeftRadius: !isAdmin && isGroupEnd ? '4px' : '18px',
                                                    borderBottomRightRadius: isAdmin && isGroupEnd ? '4px' : '18px',
                                                }}>
                                                    <div style={{ fontSize: '0.9375rem' }}>{msg.content}</div>
                                                    <div style={{ fontSize: '0.6875rem', marginTop: '0.25rem', opacity: 0.7 }}>
                                                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </div>
                                                </div>

                                                {isAdmin && (
                                                    <button
                                                        onClick={() => handleDeleteMessage(msg._id)}
                                                        style={{
                                                            background: 'none',
                                                            border: 'none',
                                                            color: '#ff4d4f',
                                                            cursor: 'pointer',
                                                            padding: '4px',
                                                            opacity: 0.5
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSendMessage} style={{
                            padding: '1rem 1.5rem',
                            borderTop: '1px solid #e4e6eb',
                            display: 'flex',
                            gap: '0.75rem',
                            background: '#ffffff'
                        }}>
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type your reply..."
                                style={{
                                    flex: 1,
                                    padding: '0.625rem 1rem',
                                    border: '1px solid #e4e6eb',
                                    borderRadius: '20px',
                                    background: '#f0f2f5',
                                    outline: 'none'
                                }}
                                disabled={sending}
                            />
                            <button
                                type="submit"
                                disabled={sending || !newMessage.trim()}
                                style={{
                                    background: '#0084ff',
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: '20px',
                                    padding: '0 1.25rem',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                Send
                            </button>
                        </form>
                    </div>

                    {/* Checklist Sidebar */}
                    <div style={{
                        borderLeft: '1px solid #e4e6eb',
                        display: 'flex',
                        flexDirection: 'column',
                        background: '#f8fafc'
                    }}>
                        <div style={{ padding: '1.25rem 1rem', borderBottom: '1px solid #e4e6eb', background: '#ffffff' }}>
                            <h3 style={{ fontSize: '0.875rem', fontWeight: '700', color: '#050505', margin: 0, textTransform: 'uppercase' }}>
                                Progress
                            </h3>
                        </div>
                        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
                            {checklist ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <ChecklistItem label="Tour Completed" completed={checklist.tourCompleted} />
                                    <ChecklistItem label="Documents Submitted" completed={checklist.documentsSubmitted} />
                                    <ChecklistItem label="Documents Verified" completed={checklist.documentsVerified} />
                                    <ChecklistItem label="Offer Made" completed={checklist.offerMade} />
                                    <ChecklistItem label="Offer Accepted" completed={checklist.offerAccepted} />
                                    {checklist.customItems?.map((item, idx) => (
                                        <ChecklistItem key={idx} label={item.label} completed={item.completed} />
                                    ))}
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#94a3b8', fontSize: '0.875rem' }}>
                                    No checklist available
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

// Clients Tab Component
export const ClientsTab = () => {
    const [clients, setClients] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/users');
            if (res.ok) {
                const data = await res.json();
                // Filter to show only clients
                setClients(data.users?.filter((u: User) => u.role === 'client') || []);
            }
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
        setLoading(false);
    };

    if (loading) return <div style={styles.emptyState}>Loading clients...</div>;

    return (
        <Panel title="Registered Clients">
            <div style={{ overflowX: 'auto' }}>
                <table style={styles.table}>
                    <thead style={styles.tableHead}>
                        <tr>
                            <th style={styles.th}>Client Name</th>
                            <th style={styles.th}>Email Address</th>
                            <th style={styles.th}>Member Since</th>
                            <th style={styles.th}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client) => (
                            <tr key={client._id}>
                                <td style={styles.td}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        {client.image && (
                                            <Image
                                                src={client.image}
                                                alt={client.name || ''}
                                                width={32}
                                                height={32}
                                                style={{ borderRadius: '50%' }}
                                            />
                                        )}
                                        <div style={{ fontWeight: '600', color: '#0f172a' }}>{client.name || 'Anonymous'}</div>
                                    </div>
                                </td>
                                <td style={styles.td}>{client.email}</td>
                                <td style={styles.td}>
                                    {client.createdAt ? new Date(client.createdAt).toLocaleDateString() : 'N/A'}
                                </td>
                                <td style={styles.td}>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.75rem',
                                        fontWeight: '600',
                                        background: '#dcfce7',
                                        color: '#166534'
                                    }}>
                                        Active
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {clients.length === 0 && <div style={styles.emptyState}>No clients registered yet</div>}
            </div>
        </Panel>
    );
};

// Tour Bookings Tab Component
export const TourBookingsTab = () => {
    const [bookings, setBookings] = useState<TourBooking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/tour-bookings');
                if (res.ok) {
                    const data = await res.json();
                    setBookings(data.bookings || []);
                }
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
            setLoading(false);
        };
        fetchBookings();
    }, []);

    if (loading) return <div style={styles.emptyState}>Loading tour bookings...</div>;

    return (
        <Panel title="Tour Booking Requests">
            <div style={{ overflowX: 'auto' }}>
                <table style={styles.table}>
                    <thead style={styles.tableHead}>
                        <tr>
                            <th style={styles.th}>Client</th>
                            <th style={styles.th}>Property</th>
                            <th style={styles.th}>Preferred Date/Time</th>
                            <th style={styles.th}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td style={styles.td}>
                                    <div style={{ fontWeight: '600', color: '#0f172a' }}>{booking.client.name}</div>
                                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>{booking.client.email}</div>
                                </td>
                                <td style={styles.td}>
                                    <div style={{ fontWeight: '600', color: '#0f172a' }}>{booking.listing.title}</div>
                                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>{booking.listing.address}</div>
                                </td>
                                <td style={styles.td}>
                                    <div>{new Date(booking.preferredDate).toLocaleDateString()}</div>
                                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>{booking.preferredTime}</div>
                                </td>
                                <td style={styles.td}>
                                    <span style={{ padding: '0.375rem 0.75rem', borderRadius: '12px', fontSize: '0.8125rem', fontWeight: '600', background: booking.status === 'confirmed' ? '#dcfce7' : '#fef3c7', color: booking.status === 'confirmed' ? '#166534' : '#92400e' }}>
                                        {booking.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {bookings.length === 0 && <div style={styles.emptyState}>No tour bookings yet</div>}
            </div>
        </Panel>
    );
};
