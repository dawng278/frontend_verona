import { promotions } from '@/data/promotionData';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Tag, Share2, Heart, Clock } from 'lucide-react';

export default async function PromotionDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const promotion = promotions.find((p) => p.id === id);

    if (!promotion) return notFound();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            {/* Navigation */}
            <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <Link
                        href="/promotion"
                        className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Promotions
                    </Link>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                            LIMITED TIME
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm">Valid until supplies last</span>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        {promotion.title}
                    </h1>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                            Claim Offer Now
                        </button>
                        <button className="flex items-center space-x-2 border border-gray-300 hover:border-blue-300 text-gray-700 hover:text-blue-600 px-6 py-3 rounded-full font-semibold transition-all duration-300">
                            <Share2 className="h-4 w-4" />
                            <span>Share</span>
                        </button>
                        <button className="flex items-center space-x-2 border border-gray-300 hover:border-red-300 text-gray-700 hover:text-red-600 px-6 py-3 rounded-full font-semibold transition-all duration-300">
                            <Heart className="h-4 w-4" />
                            <span>Save</span>
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Image Section */}
                    <div className="lg:col-span-2">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src={promotion.image}
                                alt={promotion.title}
                                width={800}
                                height={500}
                                className="w-full h-96 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>

                        <div className="mt-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Promotion</h2>
                            <div className="prose prose-lg max-w-none">
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    {promotion.description}
                                </p>
                                <p className="text-gray-600 mt-6">
                                    This exclusive offer provides exceptional value and is available for a limited time only.
                                    Don&#39;t miss out on this opportunity to save while enjoying premium quality products and services.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sticky top-24">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Info</h3>

                            <div className="space-y-6">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-blue-100 p-2 rounded-lg">
                                        <Tag className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Category</p>
                                        <p className="text-sm text-gray-600">Special Offer</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="bg-green-100 p-2 rounded-lg">
                                        <Clock className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Duration</p>
                                        <p className="text-sm text-gray-600">Limited Time</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h4 className="font-semibold text-gray-900 mb-3">Terms & Conditions</h4>
                                <ul className="text-sm text-gray-600 space-y-2">
                                    <li>• Valid while supplies last</li>
                                    <li>• Cannot be combined with other offers</li>
                                    <li>• Subject to availability</li>
                                    <li>• Terms may apply</li>
                                </ul>
                            </div>

                            <div className="mt-6">
                                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                                    Get This Deal
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Promotions */}
                <div className="mt-20">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">More Great Deals</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {promotions
                            .filter(p => p.id !== promotion.id)
                            .slice(0, 3)
                            .map((promo) => (
                                <Link
                                    key={promo.id}
                                    href={`/promotion/${promo.id}`}
                                    className="group block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
                                >
                                    <Image
                                        src={promo.image}
                                        alt={promo.title}
                                        width={300}
                                        height={200}
                                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                                            {promo.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                            {promo.description}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    return promotions.map((promotion) => ({
        id: promotion.id,
    }));
}