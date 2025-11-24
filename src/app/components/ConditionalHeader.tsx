'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function ConditionalHeader() {
    const pathname = usePathname();

    // Don't render header on admin pages
    if (pathname?.startsWith('/admin')) {
        return null;
    }
    if (pathname?.startsWith('/calculators')) {
        return null;
    }

    return <Header />;
}
