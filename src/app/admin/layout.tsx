'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard' },
    { href: '/admin/listings', label: 'Manage Listings' },
    { href: '/admin/listings/new', label: 'Add New Listing' },
    { href: '/admin/sold-properties', label: 'Sold Properties' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r bg-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 text-2xl font-bold">Admin Panel</div>
        <nav className="px-3">
          <ul className="list-none space-y-2 p-0">
            {navItems.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`block rounded-lg px-4 py-2.5 transition-colors ${
                    pathname === href ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="transition-all lg:ml-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white/80 px-6 backdrop-blur">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
            Menu
          </button>
          <div />
          <Link href="/" className="font-semibold text-blue-600">
            View Site
          </Link>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}