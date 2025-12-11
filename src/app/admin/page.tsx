'use client';

import { useEffect, useState, FormEvent, ChangeEvent, ReactNode } from 'react';
import Image from 'next/image';

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

interface Stats {
  activeListings: number;
  soldProperties: number;
  totalValue: number;
}

const initialFormData = {
  title: '',
  address: '',
  price: 0,
  bedrooms: 0,
  bathrooms: 0,
  sqft: 0,
  featuredImage: '',
  description: '',
  features: [] as string[],
  status: 'active' as 'active' | 'pending',
};



const styles = {
  container: {
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  wrapper: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '2.5rem 1.5rem',
  },
  header: {
    marginBottom: '3rem',
    paddingBottom: '1.5rem',
    borderBottom: '2px solid #e2e8f0',
  },
  headerTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: '0.5rem',
    letterSpacing: '-0.025em',
  },
  headerSubtitle: {
    fontSize: '1.125rem',
    color: '#64748b',
    fontWeight: '400',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2.5rem',
  },
  statCard: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '1.75rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
    border: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
    transition: 'all 0.3s ease',
  },
  statCardHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
  },
  iconWrapper: {
    width: '60px',
    height: '60px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  statLabel: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#64748b',
    marginBottom: '0.25rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },
  statValue: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#0f172a',
  },
  tabsContainer: {
    display: 'flex',
    borderBottom: '2px solid #e2e8f0',
    marginBottom: '2rem',
    gap: '0.5rem',
    flexWrap: 'wrap' as const,
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.875rem 1.25rem',
    fontSize: '0.9375rem',
    fontWeight: '600',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    borderBottomWidth: '3px',
    borderBottomStyle: 'solid' as const,
    borderBottomColor: 'transparent',
    marginBottom: '-2px',
    color: '#64748b',
  },
  tabActive: {
    color: '#2563eb',
    borderBottomColor: '#2563eb',
  },
  tabHover: {
    color: '#1e293b',
    background: '#f8fafc',
  },
  panel: {
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
    border: '1px solid #e2e8f0',
    overflow: 'hidden',
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
  propertyImage: {
    width: '100px',
    height: '70px',
    borderRadius: '8px',
    overflow: 'hidden',
    position: 'relative' as const,
    background: '#f1f5f9',
  },
  propertyTitle: {
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: '0.25rem',
    fontSize: '0.9375rem',
  },
  propertyAddress: {
    color: '#64748b',
    fontSize: '0.875rem',
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
  buttonEdit: {
    background: '#dbeafe',
    color: '#1e40af',
  },
  buttonSold: {
    background: '#dcfce7',
    color: '#15803d',
  },
  buttonDelete: {
    background: '#fee2e2',
    color: '#dc2626',
  },
  form: {
    padding: '2rem',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.25rem',
    marginBottom: '1.5rem',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#334155',
    marginBottom: '0.5rem',
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
  inputFocus: {
    borderColor: '#2563eb',
    outline: 'none',
    boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)',
  },
  textarea: {
    minHeight: '120px',
    resize: 'vertical' as const,
  },
  submitButton: {
    padding: '0.875rem 2rem',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#ffffff',
    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.3)',
  },
  submitButtonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.4)',
  },
  featureTag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: '#dbeafe',
    color: '#1e40af',
    borderRadius: '20px',
    fontSize: '0.875rem',
    fontWeight: '500',
    margin: '0.25rem',
  },
  emptyState: {
    textAlign: 'center' as const,
    padding: '3rem 1rem',
    color: '#94a3b8',
    fontSize: '1rem',
  },
  loginContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#ffffff',
    padding: '1rem',
  },
  loginCard: {
    background: '#ffffff',
    borderRadius: '24px',
    padding: '3.5rem 3rem',
    boxShadow: '0 0 1px rgba(0, 0, 0, 0.05), 0 20px 40px rgba(0, 0, 0, 0.08)',
    maxWidth: '460px',
    width: '100%',
    border: '1px solid #e2e8f0',
  },
  loginTitle: {
    fontSize: '2.25rem',
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: '0.75rem',
    textAlign: 'center' as const,
    letterSpacing: '-0.025em',
  },
  loginSubtitle: {
    fontSize: '1rem',
    color: '#64748b',
    textAlign: 'center' as const,
    marginBottom: '2.5rem',
    lineHeight: '1.6',
  },
  loginInput: {
    width: '100%',
    padding: '1rem 1.25rem',
    fontSize: '1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    background: '#f8fafc',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
    marginBottom: '1.5rem',
    boxSizing: 'border-box' as const,
  },
  loginButton: {
    width: '100%',
    padding: '1rem 1.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#ffffff',
    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
  },
  loginError: {
    background: '#fef2f2',
    color: '#dc2626',
    padding: '0.875rem 1.25rem',
    borderRadius: '10px',
    fontSize: '0.9375rem',
    marginBottom: '1.25rem',
    textAlign: 'center' as const,
    border: '1px solid #fecaca',
  },
  logoutButton: {
    padding: '0.625rem 1.25rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#dc2626',
    background: '#fee2e2',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
};

const Icons = {
  dashboard: <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  listings: <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>,
  sold: <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  add: <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>,
  dollar: <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
};

const LoginButton = ({ children, ...props }: { children: ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      {...props}
      style={{
        ...styles.loginButton,
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: isHovered
          ? '0 8px 20px rgba(37, 99, 235, 0.4)'
          : '0 4px 12px rgba(37, 99, 235, 0.3)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
};

const LoginInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <input
      {...props}
      style={{
        ...styles.loginInput,
        borderColor: isFocused ? '#2563eb' : '#e2e8f0',
        boxShadow: isFocused ? '0 0 0 3px rgba(37, 99, 235, 0.1)' : 'none',
      }}
      onFocus={(e) => {
        setIsFocused(true);
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        setIsFocused(false);
        props.onBlur?.(e);
      }}
    />
  );
};

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<Stats>({ activeListings: 0, soldProperties: 0, totalValue: 0 });
  const [listings, setListings] = useState<Listing[]>([]);
  const [soldProperties, setSoldProperties] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  // Check if user is already authenticated on mount
  useEffect(() => {
    const authStatus = sessionStorage.getItem('adminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [listingsRes, soldRes] = await Promise.all([
        fetch('/api/admin/listings'),
        fetch('/api/sold-properties'),
      ]);

      let listingsData: Listing[] = [];
      let soldData: Listing[] = [];

      // Check if responses are ok and parse JSON
      if (listingsRes.ok) {
        try {
          listingsData = await listingsRes.json();
        } catch (e) {
          console.error("Failed to parse listings data:", e);
        }
      }

      if (soldRes.ok) {
        try {
          soldData = await soldRes.json();
        } catch (e) {
          console.error("Failed to parse sold properties data:", e);
        }
      }

      setListings(listingsData);
      setSoldProperties(soldData);
      const totalValue = soldData.reduce((sum, prop) => sum + (prop.soldPrice || prop.price), 0);
      setStats({
        activeListings: listingsData.length,
        soldProperties: soldData.length,
        totalValue,
      });
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      // Set empty data on error
      setListings([]);
      setSoldProperties([]);
      setStats({ activeListings: 0, soldProperties: 0, totalValue: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleRefresh = () => fetchData();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError('');

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('adminAuthenticated', 'true');
        setPassword('');
      } else {
        setLoginError('Incorrect password. Please try again.');
        setPassword('');
      }
    } catch (error) {
      setLoginError('Authentication failed. Please try again.');
      setPassword('');
      console.error('Login error:', error);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuthenticated');
    setActiveTab('dashboard');
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div style={styles.loginContainer}>
        <div style={styles.loginCard}>
          <h1 style={styles.loginTitle}>Admin Access</h1>
          <p style={styles.loginSubtitle}>Enter your password to access the admin dashboard</p>

          <form onSubmit={handleLogin}>
            {loginError && <div style={styles.loginError}>{loginError}</div>}

            <LoginInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              autoFocus
              required
            />

            <LoginButton type="submit">
              Login to Dashboard
            </LoginButton>
          </form>


        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <header style={styles.header}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={styles.headerTitle}>Admin Dashboard</h1>
              <p style={styles.headerSubtitle}>Manage your real estate portfolio with ease</p>
            </div>
            <button onClick={handleLogout} style={styles.logoutButton}>
              Logout
            </button>
          </div>
        </header>

        <div style={styles.statsGrid}>
          <StatCard label="Active Listings" value={stats.activeListings} icon={Icons.listings} color="#3b82f6" />
          <StatCard label="Properties Sold" value={stats.soldProperties} icon={Icons.sold} color="#10b981" />
          <StatCard label="Total Sales Value" value={`$${stats.totalValue.toLocaleString()}`} icon={Icons.dollar} color="#8b5cf6" />
        </div>

        <div style={styles.tabsContainer}>
          <TabButton name="Overview" tabId="dashboard" activeTab={activeTab} setActiveTab={setActiveTab} icon={Icons.dashboard} />
          <TabButton name="Manage Listings" tabId="manage" activeTab={activeTab} setActiveTab={setActiveTab} icon={Icons.listings} />
          <TabButton name="Sold Properties" tabId="sold" activeTab={activeTab} setActiveTab={setActiveTab} icon={Icons.sold} />
          <TabButton name="Add New Listing" tabId="add" activeTab={activeTab} setActiveTab={setActiveTab} icon={Icons.add} />
        </div>

        <main>
          {loading ? (
            <div style={styles.emptyState}>Loading data...</div>
          ) : (
            <>
              {activeTab === 'dashboard' && <DashboardHomeTab listings={listings} sold={soldProperties} />}
              {activeTab === 'manage' && <ManageListingsTab listings={listings} onRefresh={handleRefresh} />}
              {activeTab === 'sold' && <SoldPropertiesTab soldProperties={soldProperties} onRefresh={handleRefresh} />}
              {activeTab === 'add' && <AddListingTab onListingAdded={() => { handleRefresh(); setActiveTab('manage'); }} />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

const StatCard = ({ label, value, icon, color }: { label: string; value: string | number; icon: ReactNode; color: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.statCard,
        ...(isHovered ? styles.statCardHover : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ ...styles.iconWrapper, background: `${color}15`, color }}>{icon}</div>
      <div>
        <p style={styles.statLabel}>{label}</p>
        <p style={styles.statValue}>{value}</p>
      </div>
    </div>
  );
};

const TabButton = ({ name, tabId, activeTab, setActiveTab, icon }: { name: string, tabId: string, activeTab: string, setActiveTab: (id: string) => void, icon: ReactNode }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = activeTab === tabId;

  return (
    <button
      onClick={() => setActiveTab(tabId)}
      style={{
        ...styles.tab,
        ...(isActive ? styles.tabActive : {}),
        ...(isHovered && !isActive ? styles.tabHover : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon} {name}
    </button>
  );
};

const Panel = ({ title, children }: { title: string, children: ReactNode }) => (
  <div style={styles.panel}>
    <div style={styles.panelHeader}>
      <h3 style={styles.panelTitle}>{title}</h3>
    </div>
    {children}
  </div>
);

const DashboardHomeTab = ({ listings, sold }: { listings: Listing[], sold: Listing[] }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
    <Panel title="Recent Active Listings">
      <div>
        {listings.slice(0, 5).map(l => (
          <div key={l._id} style={{ padding: '1.25rem 2rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '500', color: '#0f172a' }}>{l.title}</span>
            <span style={{ color: '#64748b', fontWeight: '600' }}>${l.price.toLocaleString()}</span>
          </div>
        ))}
        {listings.length === 0 && <div style={styles.emptyState}>No active listings</div>}
      </div>
    </Panel>
    <Panel title="Recently Sold">
      <div>
        {sold.slice(0, 5).map(s => (
          <div key={s._id} style={{ padding: '1.25rem 2rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '500', color: '#0f172a' }}>{s.title}</span>
            <span style={{ color: '#64748b', fontWeight: '600' }}>${(s.soldPrice || s.price).toLocaleString()}</span>
          </div>
        ))}
        {sold.length === 0 && <div style={styles.emptyState}>No sold properties</div>}
      </div>
    </Panel>
  </div>
);

const ManageListingsTab = ({ listings, onRefresh }: { listings: Listing[], onRefresh: () => void }) => {
  const [editingListing, setEditingListing] = useState<Listing | null>(null);

  const handleAction = async (id: string, action: 'sell' | 'delete') => {
    const confirmMessage = action === 'sell' ? 'Mark this property as sold?' : 'Permanently delete this listing?';
    if (!confirm(confirmMessage)) return;
    try {
      const res = await fetch(`/api/admin/listings/${id}`, {
        method: action === 'delete' ? 'DELETE' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: action === 'sell' ? JSON.stringify({ status: 'sold' }) : null,
      });
      if (!res.ok) throw new Error(await res.text());
      alert(`Listing successfully ${action === 'sell' ? 'sold' : 'deleted'}.`);
      onRefresh();
    } catch (error) {
      alert(`Failed to ${action} listing.`);
      console.error(error);
    }
  };

  const handleEditComplete = () => {
    setEditingListing(null);
    onRefresh();
  };

  return (
    <Panel title="Active Property Listings">
      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead style={styles.tableHead}>
            <tr>
              <th style={styles.th}>Image</th>
              <th style={styles.th}>Property</th>
              <th style={styles.th}>Price</th>
              <th style={{ ...styles.th, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => (
              <tr key={listing._id}>
                <td style={styles.td}>
                  <div style={styles.propertyImage}>
                    <Image src={listing.featuredImage} alt={listing.title} fill style={{ objectFit: 'cover' }} sizes="100px" />
                  </div>
                </td>
                <td style={styles.td}>
                  <div style={styles.propertyTitle}>{listing.title}</div>
                  <div style={styles.propertyAddress}>{listing.address}</div>
                </td>
                <td style={styles.td}><span style={{ fontWeight: '600', color: '#0f172a' }}>${listing.price.toLocaleString()}</span></td>
                <td style={{ ...styles.td, textAlign: 'right' }}>
                  <button onClick={() => setEditingListing(listing)} style={{ ...styles.actionButton, ...styles.buttonEdit }}>Edit</button>
                  <button onClick={() => handleAction(listing._id, 'sell')} style={{ ...styles.actionButton, ...styles.buttonSold }}>Mark Sold</button>
                  <button onClick={() => handleAction(listing._id, 'delete')} style={{ ...styles.actionButton, ...styles.buttonDelete }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {listings.length === 0 && <div style={styles.emptyState}>No active listings found</div>}
      </div>
      {editingListing && <EditListingModal listing={editingListing} onClose={() => setEditingListing(null)} onSave={handleEditComplete} />}
    </Panel>
  );
};

const SoldPropertiesTab = ({ soldProperties, onRefresh }: { soldProperties: Listing[], onRefresh: () => void }) => {
  const [editingProperty, setEditingProperty] = useState<Listing | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently delete this sold property?')) return;
    try {
      const res = await fetch(`/api/admin/listings/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error(await res.text());
      alert('Sold property successfully deleted.');
      onRefresh();
    } catch (error) {
      alert('Failed to delete sold property.');
      console.error(error);
    }
  };

  const handleEditComplete = () => {
    setEditingProperty(null);
    onRefresh();
  };

  return (
    <Panel title="Sold Property History">
      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead style={styles.tableHead}>
            <tr>
              <th style={styles.th}>Image</th>
              <th style={styles.th}>Property</th>
              <th style={styles.th}>Sold Price</th>
              <th style={styles.th}>Sold Date</th>
              <th style={{ ...styles.th, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {soldProperties.map((prop) => (
              <tr key={prop._id}>
                <td style={styles.td}>
                  <div style={styles.propertyImage}>
                    <Image src={prop.featuredImage} alt={prop.title} fill style={{ objectFit: 'cover' }} sizes="100px" />
                  </div>
                </td>
                <td style={styles.td}>
                  <div style={styles.propertyTitle}>{prop.title}</div>
                  <div style={styles.propertyAddress}>{prop.address}</div>
                </td>
                <td style={styles.td}><span style={{ fontWeight: '600', color: '#0f172a' }}>${(prop.soldPrice || prop.price).toLocaleString()}</span></td>
                <td style={styles.td}><span style={{ color: '#64748b' }}>{prop.soldDate ? new Date(prop.soldDate).toLocaleDateString() : 'N/A'}</span></td>
                <td style={{ ...styles.td, textAlign: 'right' }}>
                  <button onClick={() => setEditingProperty(prop)} style={{ ...styles.actionButton, ...styles.buttonEdit }}>Edit</button>
                  <button onClick={() => handleDelete(prop._id)} style={{ ...styles.actionButton, ...styles.buttonDelete }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {soldProperties.length === 0 && <div style={styles.emptyState}>No sold properties found</div>}
      </div>
      {editingProperty && <EditListingModal listing={editingProperty} onClose={() => setEditingProperty(null)} onSave={handleEditComplete} />}
    </Panel>
  );
};

const EditListingModal = ({ listing, onClose, onSave }: { listing: Listing, onClose: () => void, onSave: () => void }) => {
  const [formData, setFormData] = useState({
    title: listing.title,
    address: listing.address,
    price: listing.price,
    bedrooms: listing.bedrooms,
    bathrooms: listing.bathrooms,
    sqft: listing.sqft,
    description: listing.description,
    features: listing.features,
    soldPrice: listing.soldPrice || 0,
    soldDate: listing.soldDate ? new Date(listing.soldDate).toISOString().split('T')[0] : '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [featureInput, setFeatureInput] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: ['price', 'bedrooms', 'bathrooms', 'sqft', 'soldPrice'].includes(name) ? Number(value) : value }));
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData(prev => ({ ...prev, features: [...prev.features, featureInput.trim()] }));
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const updateData: any = {
        title: formData.title,
        address: formData.address,
        price: formData.price,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        sqft: formData.sqft,
        description: formData.description,
        features: formData.features,
      };

      // Include sold data if it's a sold property
      if (listing.status === 'sold') {
        if (formData.soldPrice > 0) updateData.soldPrice = formData.soldPrice;
        if (formData.soldDate) updateData.soldDate = formData.soldDate;
      }

      const res = await fetch(`/api/admin/listings/${listing._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to update listing');
      }

      alert('Listing updated successfully!');
      onSave();
    } catch (error: any) {
      alert(`Error: ${error.message}`);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        maxWidth: '800px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      }}>
        <div style={{
          padding: '1.5rem 2rem',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          background: 'white',
          zIndex: 1,
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a' }}>Edit Listing</h3>
          <button onClick={onClose} style={{
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#64748b',
            padding: '0',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>×</button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Property Title</label>
              <input name="title" value={formData.title} onChange={handleChange} style={styles.input} required />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Address</label>
              <input name="address" value={formData.address} onChange={handleChange} style={styles.input} required />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} style={{ ...styles.input, ...styles.textarea }} required />
          </div>

          <div style={{ ...styles.formGrid, gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Price ($)</label>
              <input name="price" type="number" value={formData.price} onChange={handleChange} style={styles.input} required />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Bedrooms</label>
              <input name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange} style={styles.input} required />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Bathrooms</label>
              <input name="bathrooms" type="number" value={formData.bathrooms} onChange={handleChange} style={styles.input} required />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Sq. Ft.</label>
              <input name="sqft" type="number" value={formData.sqft} onChange={handleChange} style={styles.input} required />
            </div>
          </div>

          {listing.status === 'sold' && (
            <div style={{ ...styles.formGrid, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Sold Price ($)</label>
                <input name="soldPrice" type="number" value={formData.soldPrice} onChange={handleChange} style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Sold Date</label>
                <input name="soldDate" type="date" value={formData.soldDate} onChange={handleChange} style={styles.input} />
              </div>
            </div>
          )}

          <div style={styles.formGroup}>
            <label style={styles.label}>Features</label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                placeholder="Add a feature (e.g., Pool, Garage)"
                style={{ ...styles.input, flex: 1 }}
              />
              <button type="button" onClick={handleAddFeature} style={{ ...styles.actionButton, background: '#475569', color: '#fff', padding: '0.75rem 1.5rem' }}>
                Add
              </button>
            </div>
            {formData.features.length > 0 && (
              <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {formData.features.map((feature, index) => (
                  <span key={index} style={styles.featureTag}>
                    {feature}
                    <button type="button" onClick={() => handleRemoveFeature(index)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem', lineHeight: 1 }}>
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div style={{ paddingTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} style={{
              padding: '0.875rem 2rem',
              fontSize: '1rem',
              fontWeight: '600',
              color: '#64748b',
              background: '#f1f5f9',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}>
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} style={{ ...styles.submitButton, opacity: isSubmitting ? 0.6 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AddListingTab = ({ onListingAdded }: { onListingAdded: () => void }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [featureInput, setFeatureInput] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: ['price', 'bedrooms', 'bathrooms', 'sqft'].includes(name) ? Number(value) : value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData(prev => ({ ...prev, features: [...prev.features, featureInput.trim()] }));
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      alert('Please select a featured image to upload.');
      return;
    }
    setIsSubmitting(true);

    try {
      const imageUploadFormData = new FormData();
      imageUploadFormData.append('image', imageFile);

      const imageRes = await fetch('/api/upload', {
        method: 'POST',
        body: imageUploadFormData,
      });

      const imageUploadResult = await imageRes.json();
      if (!imageRes.ok) {
        throw new Error(imageUploadResult.error || 'Failed to upload image.');
      }
      const imageUrl = imageUploadResult.url;

      const finalListingData = { ...formData, featuredImage: imageUrl };

      const listingRes = await fetch('/api/admin/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalListingData),
      });

      if (!listingRes.ok) {
        const errorData = await listingRes.json();
        throw new Error(errorData.error || 'Failed to create listing');
      }

      alert('Listing created successfully!');
      setFormData(initialFormData);
      setImageFile(null);
      setFeatureInput('');
      onListingAdded();

    } catch (error: any) {
      alert(`Error: ${error.message}`);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Panel title="Create a New Property Listing">
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGrid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Property Title</label>
            <input name="title" value={formData.title} onChange={handleChange} style={styles.input} required />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Address</label>
            <input name="address" value={formData.address} onChange={handleChange} style={styles.input} required />
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} style={{ ...styles.input, ...styles.textarea }} required />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Featured Image</label>
          <input type="file" onChange={handleFileChange} accept="image/jpeg, image/png, image/webp" style={{ ...styles.input, padding: '0.5rem' }} required />
          {imageFile && <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.5rem' }}>Selected: {imageFile.name}</p>}
        </div>

        <div style={{ ...styles.formGrid, gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Price ($)</label>
            <input name="price" type="number" value={formData.price} onChange={handleChange} style={styles.input} required />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Bedrooms</label>
            <input name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange} style={styles.input} required />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Bathrooms</label>
            <input name="bathrooms" type="number" value={formData.bathrooms} onChange={handleChange} style={styles.input} required />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Sq. Ft.</label>
            <input name="sqft" type="number" value={formData.sqft} onChange={handleChange} style={styles.input} required />
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Features</label>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <input
              type="text"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
              placeholder="Add a feature (e.g., Pool, Garage)"
              style={{ ...styles.input, flex: 1 }}
            />
            <button type="button" onClick={handleAddFeature} style={{ ...styles.actionButton, background: '#475569', color: '#fff', padding: '0.75rem 1.5rem' }}>
              Add
            </button>
          </div>
          {formData.features.length > 0 && (
            <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {formData.features.map((feature, index) => (
                <span key={index} style={styles.featureTag}>
                  {feature}
                  <button type="button" onClick={() => handleRemoveFeature(index)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem', lineHeight: 1 }}>
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div style={{ paddingTop: '1rem' }}>
          <button type="submit" disabled={isSubmitting} style={{ ...styles.submitButton, opacity: isSubmitting ? 0.6 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
            {isSubmitting ? 'Uploading & Saving...' : 'Save Listing'}
          </button>
        </div>
      </form>
    </Panel>
  );
};