// frontend/components/Layout/NavLinks.tsx
'use client';

import Link from 'next/link';

const NavLinks = () => {
    return (
        <ul className="flex space-x-6 text-xl text-gray-800">
            <li><Link href="/menu" className="hover:text-[#B61E01]">Menu</Link></li>
            <li><Link href="/service" className="hover:text-[#B61E01]">Service</Link></li>
            <li><Link href="/promotion" className="hover:text-[#B61E01]">Promotion</Link></li>
            <li><Link href="/contact" className="hover:text-[#B61E01]">Contact</Link></li>
        </ul>
    );
};

export default NavLinks;
