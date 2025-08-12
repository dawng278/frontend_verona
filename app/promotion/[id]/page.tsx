// app/promotion/[id]/page.tsx
import { promotions } from '@/data/promotionData';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function PromotionDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const promotion = promotions.find((p) => p.id === id);

    if (!promotion) return notFound();

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{promotion.title}</h1>
            <Image src={promotion.image} alt={promotion.title} width={800} height={400} className="w-full rounded" />
            <p className="mt-4 text-lg text-gray-700">{promotion.description}</p>
        </div>
    );
}


export async function generateStaticParams() {
    return promotions.map((promotion) => ({
        id: promotion.id,
    }));
}
