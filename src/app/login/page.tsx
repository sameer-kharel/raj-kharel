'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
    const error = searchParams.get('error');

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            await signIn('google', { callbackUrl });
        } catch (error) {
            console.error('Sign in error:', error);
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <div style={styles.iconWrapper}>
                        <svg
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ color: '#2563eb' }}
                        >
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                    </div>
                    <h1 style={styles.title}>Welcome Back</h1>
                    <p style={styles.subtitle}>
                        Sign in to view properties, book tours, and communicate with your real estate agent
                    </p>
                </div>

                {error && (
                    <div style={styles.error}>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ marginRight: '8px' }}
                        >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        Authentication failed. Please try again.
                    </div>
                )}

                <button
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    style={{
                        ...styles.googleButton,
                        opacity: isLoading ? 0.7 : 1,
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                    }}
                    onMouseEnter={(e) => {
                        if (!isLoading) {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                    }}
                >
                    {isLoading ? (
                        <div style={styles.spinner} />
                    ) : (
                        <>
                            <svg width="24" height="24" viewBox="0 0 24 24" style={{ marginRight: '12px' }}>
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            <span style={styles.buttonText}>Continue with Google</span>
                        </>
                    )}
                </button>

                <div style={styles.divider}>
                    <div style={styles.dividerLine} />
                    <span style={styles.dividerText}>Secure Authentication</span>
                    <div style={styles.dividerLine} />
                </div>

                <div style={styles.features}>
                    <div style={styles.feature}>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span style={styles.featureText}>View exclusive property listings</span>
                    </div>
                    <div style={styles.feature}>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span style={styles.featureText}>Book property tours instantly</span>
                    </div>
                    <div style={styles.feature}>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span style={styles.featureText}>Direct communication with your agent</span>
                    </div>
                    <div style={styles.feature}>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span style={styles.featureText}>Track your home buying progress</span>
                    </div>
                </div>

                <p style={styles.footer}>
                    By signing in, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem',
    },
    card: {
        background: '#ffffff',
        borderRadius: '24px',
        padding: '3rem',
        maxWidth: '480px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    },
    header: {
        textAlign: 'center',
        marginBottom: '2rem',
    },
    iconWrapper: {
        width: '80px',
        height: '80px',
        background: 'linear-gradient(135deg, #e0e7ff 0%, #dbeafe 100%)',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.5rem',
    },
    title: {
        fontSize: '2rem',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '0.5rem',
    },
    subtitle: {
        fontSize: '1rem',
        color: '#6b7280',
        lineHeight: '1.6',
    },
    error: {
        background: '#fef2f2',
        border: '1px solid #fecaca',
        color: '#dc2626',
        padding: '1rem',
        borderRadius: '12px',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        fontSize: '0.9375rem',
    },
    googleButton: {
        width: '100%',
        padding: '1rem 1.5rem',
        background: '#ffffff',
        border: '2px solid #e5e7eb',
        borderRadius: '12px',
        fontSize: '1rem',
        fontWeight: '600',
        color: '#1f2937',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    buttonText: {
        fontSize: '1rem',
        fontWeight: '600',
    },
    spinner: {
        width: '24px',
        height: '24px',
        border: '3px solid #e5e7eb',
        borderTop: '3px solid #2563eb',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    },
    divider: {
        display: 'flex',
        alignItems: 'center',
        margin: '2rem 0',
    },
    dividerLine: {
        flex: 1,
        height: '1px',
        background: '#e5e7eb',
    },
    dividerText: {
        padding: '0 1rem',
        fontSize: '0.875rem',
        color: '#9ca3af',
        fontWeight: '500',
    },
    features: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginBottom: '2rem',
    },
    feature: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
    },
    featureText: {
        fontSize: '0.9375rem',
        color: '#4b5563',
    },
    footer: {
        fontSize: '0.8125rem',
        color: '#9ca3af',
        textAlign: 'center',
        lineHeight: '1.5',
    },
};
