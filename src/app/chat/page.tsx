'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface Message {
    _id: string;
    sender: {
        _id: string;
        name: string;
        email: string;
        image?: string;
        role: string;
    };
    content: string;
    createdAt: string;
    isRead: boolean;
}

export default function ChatPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [conversationId, setConversationId] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [isOnline, setIsOnline] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const lastMessageCountRef = useRef(0);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login?callbackUrl=/chat');
        } else if (status === 'authenticated') {
            initializeDirectConversation();
        }
    }, [status, router]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Smart polling - increases interval when idle, decreases when active
    useEffect(() => {
        if (conversationId) {
            let pollInterval = 2000; // Start with 2 seconds

            const poll = () => {
                fetchMessages(conversationId, true).then((newMessages) => {
                    if (newMessages && newMessages.length > lastMessageCountRef.current) {
                        // New messages received, poll faster
                        pollInterval = 1000;
                        lastMessageCountRef.current = newMessages.length;
                    } else {
                        // No new messages, slow down polling
                        pollInterval = Math.min(pollInterval + 500, 5000);
                    }
                });
            };

            pollingIntervalRef.current = setInterval(poll, pollInterval);

            return () => {
                if (pollingIntervalRef.current) {
                    clearInterval(pollingIntervalRef.current);
                }
            };
        }
    }, [conversationId]);

    // Check online status
    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const initializeDirectConversation = async () => {
        try {
            const res = await fetch('/api/conversations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({}),
            });

            if (res.ok) {
                const data = await res.json();
                setConversationId(data.conversation._id);
                fetchMessages(data.conversation._id);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error initializing conversation:', error);
            setLoading(false);
        }
    };

    const fetchMessages = async (convId: string, silent = false): Promise<Message[] | null> => {
        try {
            const res = await fetch(`/api/conversations/${convId}/messages`);
            if (res.ok) {
                const data = await res.json();
                const newMessages = data.messages || [];

                if (JSON.stringify(newMessages) !== JSON.stringify(messages)) {
                    setMessages(newMessages);
                    return newMessages;
                }
                return newMessages;
            }
        } catch (error) {
            if (!silent) {
                console.error('Error fetching messages:', error);
            }
        }
        return null;
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !conversationId || sending) return;

        const messageContent = newMessage;
        setNewMessage(''); // Clear input immediately for better UX
        setSending(true);

        try {
            const res = await fetch(`/api/conversations/${conversationId}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: messageContent }),
            });

            if (res.ok) {
                const data = await res.json();
                setMessages([...messages, data.message]);
                // Immediately fetch to update read status
                fetchMessages(conversationId, true);
                lastMessageCountRef.current = messages.length + 1;
            } else {
                setNewMessage(messageContent); // Restore message if failed
                alert('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setNewMessage(messageContent); // Restore message if failed
            alert('Error sending message. Please check your connection.');
        }
        setSending(false);
    };

    const handleTyping = () => {
        setIsTyping(true);

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
        }, 1000);
    };

    if (status === 'loading' || loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.spinner} />
                <p style={styles.loadingText}>Connecting to support...</p>
            </div>
        );
    }

    if (!session) return null;

    return (
        <div style={styles.container}>
            <div style={styles.chatContainer}>
                {/* Chat Header */}
                <div style={styles.header}>
                    <button
                        onClick={() => router.push('/dashboard')}
                        style={styles.backButton}
                        title="Back to Dashboard"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div style={styles.headerInfo}>
                        <div style={styles.adminAvatar}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </div>
                        <div style={{ flex: 1 }}>
                            <h3 style={styles.headerTitle}>Admin Support</h3>
                            <div style={styles.headerSubtitley}>
                                <div style={{
                                    ...styles.statusDot,
                                    background: isOnline ? '#10b981' : '#94a3b8'
                                }} />
                                <p style={styles.headerSubtitle}>
                                    {isOnline ? 'Online • Usually responds within minutes' : 'You are offline'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Messages Area */}
                <div style={styles.messagesArea}>
                    {messages.length === 0 ? (
                        <div style={styles.emptyMessages}>
                            <div style={styles.welcomeIcon}>
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#0084ff" strokeWidth="2">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                    <path d="M8 10h.01M12 10h.01M16 10h.01" />
                                </svg>
                            </div>
                            <h3 style={styles.welcomeTitle}>Hi {session.user?.name?.split(' ')[0]}! 👋</h3>
                            <p style={styles.welcomeText}>
                                Welcome to direct messaging with our admin team. We're here to help you find your perfect home!
                            </p>
                            <p style={styles.welcomeSubtext}>
                                Start a conversation by sending a message below. We'll respond as soon as possible.
                            </p>
                        </div>
                    ) : (
                        <>
                            {messages.map((message, index) => {
                                const isClient = message.sender.role === 'client';
                                const prevMessage = index > 0 ? messages[index - 1] : null;
                                const nextMessage = index < messages.length - 1 ? messages[index + 1] : null;

                                const isGroupStart = !prevMessage || prevMessage.sender._id !== message.sender._id;
                                const isGroupEnd = !nextMessage || nextMessage.sender._id !== message.sender._id;

                                const showTimestamp = isGroupEnd || (
                                    nextMessage &&
                                    (new Date(nextMessage.createdAt).getTime() - new Date(message.createdAt).getTime()) > 300000
                                );

                                return (
                                    <div key={message._id}>
                                        {isGroupStart && (
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: isClient ? 'flex-end' : 'flex-start', // Client Right, Admin Left
                                                marginTop: index > 0 ? '1.5rem' : '0.5rem',
                                                marginBottom: '0.25rem',
                                                paddingLeft: isClient ? '3rem' : '0',
                                                paddingRight: isClient ? '0' : '3rem',
                                            }}>
                                                <span style={{
                                                    fontSize: '0.75rem',
                                                    fontWeight: '600',
                                                    color: '#64748b',
                                                }}>
                                                    {isClient ? 'You' : 'Admin Support'}
                                                </span>
                                            </div>
                                        )}

                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: isClient ? 'flex-end' : 'flex-start', // Client Right, Admin Left
                                                alignItems: 'flex-end',
                                                gap: '0.5rem',
                                                marginBottom: isGroupEnd ? '0.5rem' : '0.125rem',
                                                paddingLeft: '1rem',
                                                paddingRight: '1rem',
                                            }}
                                        >
                                            {/* Admin Avatar on Left */}
                                            {!isClient && (
                                                <>
                                                    {isGroupEnd ? (
                                                        <div style={{
                                                            width: '32px',
                                                            height: '32px',
                                                            borderRadius: '50%',
                                                            background: 'linear-gradient(135deg, #6b7280, #4b5563)',
                                                            color: '#ffffff',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontSize: '0.875rem',
                                                            fontWeight: '600',
                                                            flexShrink: 0,
                                                        }}>
                                                            A
                                                        </div>
                                                    ) : (
                                                        <div style={{ width: '32px', flexShrink: 0 }} />
                                                    )}
                                                </>
                                            )}

                                            <div
                                                style={{
                                                    maxWidth: '65%',
                                                    padding: '0.75rem 1rem',
                                                    borderRadius: '18px',
                                                    background: isClient ? 'linear-gradient(135deg, #0084ff, #0073e6)' : '#e5e7eb', // Client: Blue, Admin: Gray
                                                    color: isClient ? '#ffffff' : '#1f2937',
                                                    wordWrap: 'break-word',
                                                    boxShadow: isClient ? '0 2px 8px rgba(0, 132, 255, 0.25)' : '0 1px 3px rgba(0, 0, 0, 0.1)',
                                                    borderTopLeftRadius: !isClient && isGroupStart ? '18px' : !isClient ? '4px' : '18px',
                                                    borderTopRightRadius: isClient && isGroupStart ? '18px' : isClient ? '4px' : '18px',
                                                    borderBottomLeftRadius: !isClient && isGroupEnd ? '18px' : !isClient ? '4px' : '18px',
                                                    borderBottomRightRadius: isClient && isGroupEnd ? '18px' : isClient ? '4px' : '18px',
                                                    position: 'relative',
                                                }}
                                            >
                                                <div style={{ fontSize: '0.9375rem', lineHeight: '1.5' }}>
                                                    {message.content}
                                                </div>
                                                {isClient && isGroupEnd && (
                                                    <div style={{
                                                        fontSize: '0.6875rem',
                                                        marginTop: '0.25rem',
                                                        color: 'rgba(255, 255, 255, 0.8)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.25rem',
                                                        justifyContent: 'flex-end',
                                                    }}>
                                                        {message.isRead ? '✓✓' : '✓'}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Client Avatar on Right */}
                                            {isClient && (
                                                <>
                                                    {isGroupEnd ? (
                                                        <div style={{
                                                            width: '32px',
                                                            height: '32px',
                                                            borderRadius: '50%',
                                                            background: session.user?.image ? 'transparent' : 'linear-gradient(135deg, #0084ff, #0073e6)',
                                                            color: '#ffffff',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontSize: '0.875rem',
                                                            fontWeight: '600',
                                                            flexShrink: 0,
                                                            overflow: 'hidden',
                                                        }}>
                                                            {session.user?.image ? (
                                                                <Image
                                                                    src={session.user.image}
                                                                    alt="You"
                                                                    width={32}
                                                                    height={32}
                                                                    style={{ borderRadius: '50%' }}
                                                                />
                                                            ) : (
                                                                session.user?.name?.charAt(0) || 'Y'
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div style={{ width: '32px', flexShrink: 0 }} />
                                                    )}
                                                </>
                                            )}
                                        </div>

                                        {showTimestamp && (
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: isClient ? 'flex-end' : 'flex-start', // Timestamp alignment
                                                marginBottom: '0.75rem',
                                                paddingLeft: isClient ? '3rem' : '0',
                                                paddingRight: isClient ? '0' : '3rem',
                                            }}>
                                                <span style={{
                                                    fontSize: '0.6875rem',
                                                    color: '#94a3b8',
                                                }}>
                                                    {new Date(message.createdAt).toLocaleString([], {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} style={styles.messageForm}>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => {
                            setNewMessage(e.target.value);
                            handleTyping();
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage(e as any);
                            }
                        }}
                        placeholder="Type your message..."
                        style={styles.messageInput}
                        disabled={sending}
                        autoFocus
                    />
                    <button
                        type="submit"
                        disabled={sending || !newMessage.trim()}
                        style={{
                            ...styles.sendButton,
                            opacity: sending || !newMessage.trim() ? 0.5 : 1,
                            cursor: sending || !newMessage.trim() ? 'not-allowed' : 'pointer',
                        }}
                        title={sending ? 'Sending...' : 'Send message'}
                    >
                        {sending ? (
                            <div style={styles.miniSpinner} />
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0f2f5 0%, #e4e8ec 100%)',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    chatContainer: {
        maxWidth: '900px',
        width: '100%',
        background: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        height: '92vh',
        overflow: 'hidden',
    },
    loadingContainer: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f0f2f5 0%, #e4e8ec 100%)',
    },
    spinner: {
        width: '48px',
        height: '48px',
        border: '4px solid #e5e7eb',
        borderTop: '4px solid #0084ff',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    },
    miniSpinner: {
        width: '18px',
        height: '18px',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        borderTop: '2px solid #ffffff',
        borderRadius: '50%',
        animation: 'spin 0.6s linear infinite',
    },
    loadingText: {
        marginTop: '1rem',
        fontSize: '1rem',
        color: '#65676b',
        fontWeight: '500',
    },
    header: {
        padding: '1.25rem 1.5rem',
        borderBottom: '1px solid #e4e6eb',
        background: 'linear-gradient(to right, #ffffff, #f8fafc)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    backButton: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: 'none',
        background: '#f0f2f5',
        color: '#65676b',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s',
    },
    headerInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.875rem',
        flex: 1,
    },
    adminAvatar: {
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
    },
    headerTitle: {
        fontSize: '1.125rem',
        fontWeight: '700',
        color: '#050505',
        marginBottom: '0.25rem',
    },
    headerSubtitley: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    headerSubtitle: {
        fontSize: '0.8125rem',
        color: '#65676b',
    },
    statusDot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        flexShrink: 0,
    },
    messagesArea: {
        flex: 1,
        overflowY: 'auto',
        padding: '1.5rem 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
        background: '#f8fafc',
    },
    messageForm: {
        padding: '1.25rem 1.5rem',
        borderTop: '1px solid #e4e6eb',
        display: 'flex',
        gap: '0.875rem',
        background: '#ffffff',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.05)',
    },
    messageInput: {
        flex: 1,
        padding: '0.875rem 1.25rem',
        border: '2px solid #e4e6eb',
        borderRadius: '24px',
        fontSize: '0.9375rem',
        background: '#f8fafc',
        outline: 'none',
        transition: 'all 0.2s',
    },
    sendButton: {
        width: '48px',
        height: '48px',
        padding: '0',
        background: 'linear-gradient(135deg, #0084ff, #0073e6)',
        color: '#ffffff',
        border: 'none',
        borderRadius: '50%',
        fontSize: '0.9375rem',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s',
        boxShadow: '0 2px 8px rgba(0, 132, 255, 0.3)',
    },
    emptyMessages: {
        textAlign: 'center',
        padding: '4rem 2rem',
        color: '#65676b',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    welcomeIcon: {
        marginBottom: '1.5rem',
        opacity: 0.9,
    },
    welcomeTitle: {
        fontSize: '1.75rem',
        fontWeight: '700',
        color: '#050505',
        marginBottom: '0.75rem',
    },
    welcomeText: {
        fontSize: '1.0625rem',
        color: '#65676b',
        marginBottom: '0.5rem',
        maxWidth: '450px',
        lineHeight: '1.6',
    },
    welcomeSubtext: {
        fontSize: '0.9375rem',
        color: '#94a3b8',
        maxWidth: '450px',
        lineHeight: '1.5',
    },
};
