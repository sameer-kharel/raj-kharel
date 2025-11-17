'use client';

import { useEffect, useState, FormEvent, ChangeEvent, ReactNode } from 'react';
import Image from 'next/image'; // Import the Next.js Image component

// --- TYPE DEFINITIONS ---
interface Listing {
  _id: string;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  featuredImage: string; // Add featuredImage to the interface
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
  status: 'active' as 'active' | 'pending',
};

// --- SVG ICONS ---
const Icons = {
  dashboard: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>,
  listings: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>,
  sold: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  add: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>,
  dollar: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
};

// --- MAIN DASHBOARD COMPONENT ---
export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<Stats>({ activeListings: 0, soldProperties: 0, totalValue: 0 });
  const [listings, setListings] = useState<Listing[]>([]);
  const [soldProperties, setSoldProperties] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [listingsRes, soldRes] = await Promise.all([
        fetch('/api/admin/listings'),
        fetch('/api/sold-properties'),
      ]);
      const listingsData: Listing[] = await listingsRes.json();
      const soldData: Listing[] = await soldRes.json();
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => fetchData();

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-screen-xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="mt-2 text-lg text-slate-600">Welcome back! Here’s your real estate overview.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <StatCard label="Active Listings" value={stats.activeListings} icon={Icons.listings} color="blue" />
          <StatCard label="Properties Sold" value={stats.soldProperties} icon={Icons.sold} color="green" />
          <StatCard label="Total Sales Value" value={`$${stats.totalValue.toLocaleString()}`} icon={Icons.dollar} color="purple" />
        </div>

        <div className="flex border-b border-slate-200">
          <TabButton name="Overview" tabId="dashboard" activeTab={activeTab} setActiveTab={setActiveTab} icon={Icons.dashboard} />
          <TabButton name="Manage Listings" tabId="manage" activeTab={activeTab} setActiveTab={setActiveTab} icon={Icons.listings} />
          <TabButton name="Sold Properties" tabId="sold" activeTab={activeTab} setActiveTab={setActiveTab} icon={Icons.sold} />
          <TabButton name="Add New Listing" tabId="add" activeTab={activeTab} setActiveTab={setActiveTab} icon={Icons.add} />
        </div>

        <main className="mt-8">
          {loading ? (
            <div className="text-center p-12 text-slate-500">Loading data...</div>
          ) : (
            <>
              {activeTab === 'dashboard' && <DashboardHomeTab listings={listings} sold={soldProperties} />}
              {activeTab === 'manage' && <ManageListingsTab listings={listings} onRefresh={handleRefresh} />}
              {activeTab === 'sold' && <SoldPropertiesTab soldProperties={soldProperties} />}
              {activeTab === 'add' && <AddListingTab onListingAdded={() => { handleRefresh(); setActiveTab('manage'); }} />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

const StatCard = ({ label, value, icon, color }: { label: string; value: string | number; icon: ReactNode; color: 'blue' | 'green' | 'purple' }) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
  };
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-6">
      <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg ${colors[color]}`}>{icon}</div>
      <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="text-3xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
};

const TabButton = ({ name, tabId, activeTab, setActiveTab, icon }: { name: string, tabId: string, activeTab: string, setActiveTab: (id: string) => void, icon: ReactNode }) => (
  <button
    onClick={() => setActiveTab(tabId)}
    className={`flex items-center gap-2 whitespace-nowrap py-3 px-4 text-sm font-medium transition-colors -mb-px border-b-2 ${
      activeTab === tabId
        ? 'border-blue-600 text-blue-600'
        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
    }`}
  >
    {icon} {name}
  </button>
);

const Panel = ({ title, children }: { title: string, children: ReactNode }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
    <h3 className="font-bold text-lg text-slate-800 p-6 border-b border-slate-200">{title}</h3>
    {children}
  </div>
);

const DashboardHomeTab = ({ listings, sold }: { listings: Listing[], sold: Listing[] }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <Panel title="Recent Active Listings">
      <ul className="divide-y divide-slate-100">
        {listings.slice(0, 5).map(l => <li key={l._id} className="px-6 py-4 flex justify-between"><span>{l.title}</span><span className="text-slate-500">${l.price.toLocaleString()}</span></li>)}
      </ul>
    </Panel>
    <Panel title="Recently Sold">
      <ul className="divide-y divide-slate-100">
        {sold.slice(0, 5).map(s => <li key={s._id} className="px-6 py-4 flex justify-between"><span>{s.title}</span><span className="text-slate-500">${(s.soldPrice || s.price).toLocaleString()}</span></li>)}
      </ul>
    </Panel>
  </div>
);

const ManageListingsTab = ({ listings, onRefresh }: { listings: Listing[], onRefresh: () => void }) => {
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

  return (
    <Panel title="Active Property Listings">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left font-semibold p-4">Image</th>
              <th className="text-left font-semibold p-4">Property</th>
              <th className="text-left font-semibold p-4">Price</th>
              <th className="text-right font-semibold p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {listings.map((listing) => (
              <tr key={listing._id}>
                <td className="p-4">
                  <div className="w-24 h-16 relative rounded-md overflow-hidden">
                    <Image
                      src={listing.featuredImage}
                      alt={listing.title}
                      layout="fill"
                      objectFit="cover"
                      className="bg-slate-100"
                    />
                  </div>
                </td>
                <td className="p-4 align-top">
                  <div className="font-medium text-slate-900">{listing.title}</div>
                  <div className="text-slate-500">{listing.address}</div>
                </td>
                <td className="p-4 align-top text-slate-600">${listing.price.toLocaleString()}</td>
                <td className="p-4 align-top text-right space-x-4">
                  <button onClick={() => handleAction(listing._id, 'sell')} className="font-semibold text-green-600 hover:text-green-700">Mark Sold</button>
                  <button onClick={() => handleAction(listing._id, 'delete')} className="font-semibold text-red-600 hover:text-red-700">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {listings.length === 0 && <p className="text-center p-10 text-slate-500">No active listings found.</p>}
      </div>
    </Panel>
  );
};

const SoldPropertiesTab = ({ soldProperties }: { soldProperties: Listing[] }) => (
  <Panel title="Sold Property History">
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            <th className="text-left font-semibold p-4">Image</th>
            <th className="text-left font-semibold p-4">Property</th>
            <th className="text-left font-semibold p-4">Sold Price</th>
            <th className="text-left font-semibold p-4">Sold Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {soldProperties.map((prop) => (
            <tr key={prop._id}>
              <td className="p-4">
                <div className="w-24 h-16 relative rounded-md overflow-hidden">
                  <Image
                    src={prop.featuredImage}
                    alt={prop.title}
                    layout="fill"
                    objectFit="cover"
                    className="bg-slate-100"
                  />
                </div>
              </td>
              <td className="p-4 align-top">
                <div className="font-medium text-slate-900">{prop.title}</div>
                <div className="text-slate-500">{prop.address}</div>
              </td>
              <td className="p-4 align-top text-slate-600">${(prop.soldPrice || prop.price).toLocaleString()}</td>
              <td className="p-4 align-top text-slate-600">{prop.soldDate ? new Date(prop.soldDate).toLocaleDateString() : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {soldProperties.length === 0 && <p className="text-center p-10 text-slate-500">No sold properties found.</p>}
    </div>
  </Panel>
);

const AddListingTab = ({ onListingAdded }: { onListingAdded: () => void }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState<File | null>(null); // State for the image file
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: ['price', 'bedrooms', 'bathrooms', 'sqft'].includes(name) ? Number(value) : value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      alert('Please select a featured image to upload.');
      return;
    }
    setIsSubmitting(true);

    try {
      // 1. Upload the image first
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

      // 2. Create the listing with the returned image URL
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
      setFormData(initialFormData); // Reset form
      setImageFile(null); // Reset file input
      onListingAdded(); // Refresh data and switch tab

    } catch (error: any) {
      alert(`Error: ${error.message}`);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputField = "w-full px-4 py-2.5 rounded-lg bg-slate-100 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-blue-500/20 focus:ring-2 outline-none transition";

  return (
    <Panel title="Create a New Property Listing">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Property Title" className={inputField} required />
          <input name="address" value={formData.address} onChange={handleChange} placeholder="Full Address" className={inputField} required />
        </div>
        
        {/* Updated Image Input */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Featured Image</label>
          <input type="file" onChange={handleFileChange} accept="image/jpeg, image/png, image/webp" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" required />
          {imageFile && <p className="text-xs text-slate-500 mt-1">Selected: {imageFile.name}</p>}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price ($)" className={inputField} required />
          <input name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange} placeholder="Beds" className={inputField} required />
          <input name="bathrooms" type="number" value={formData.bathrooms} onChange={handleChange} placeholder="Baths" className={inputField} required />
          <input name="sqft" type="number" value={formData.sqft} onChange={handleChange} placeholder="Sq. Ft." className={inputField} required />
        </div>
        <div className="pt-2">
          <button type="submit" disabled={isSubmitting} className="inline-flex justify-center rounded-lg bg-blue-600 px-8 py-3 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
            {isSubmitting ? 'Uploading & Saving...' : 'Save Listing'}
          </button>
        </div>
      </form>
    </Panel>
  );
};