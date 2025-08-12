// app/promotion/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { promotions } from '@/data/promotionData';

const PromotionPage = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Current Promotions</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {promotions.map((promo) => (
                    <Link key={promo.id} href={`/promotion/${promo.id}`} className="block border rounded-lg overflow-hidden hover:shadow-lg transition">
                        <Image src={promo.image} alt={promo.title} width={600} height={400} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h2 className="text-2xl font-semibold">{promo.title}</h2>
                            <p className="text-gray-600 mt-2">{promo.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default PromotionPage;
