// app/promotion/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { promotions } from '@/data/promotionData';
import { Calendar, Tag, ArrowRight, Sparkles } from 'lucide-react';

const PromotionPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative px-6 py-16 sm:py-24 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <div className="flex justify-center mb-6">
                            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                                <Sparkles className="h-5 w-5 text-yellow-300" />
                                <span className="text-white font-medium">Ưu Đãi Giới Hạn</span>
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                            Khuyến Mãi Đặc Biệt
                        </h1>
                        <p className="text-xl leading-8 text-blue-100 max-w-2xl mx-auto">
                            Khám phá những ưu đãi hấp dẫn được thiết kế riêng cho bạn. Đừng bỏ lỡ cơ hội tiết kiệm tuyệt vời này!
                        </p>
                    </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-6 py-16 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    {/* Stats/Info Bar */}
                    <div className="mb-12 flex justify-center">
                        <div className="flex items-center space-x-8 bg-white rounded-2xl shadow-lg border border-gray-100 px-8 py-4">
                            <div className="flex items-center space-x-2">
                                <Tag className="h-5 w-5 text-green-600" />
                                <span className="text-sm font-medium text-gray-700">
                                    {promotions.length} Ưu đãi đang diễn ra
                                </span>
                            </div>
                            <div className="h-4 w-px bg-gray-200"></div>
                            <div className="flex items-center space-x-2">
                                <Calendar className="h-5 w-5 text-blue-600" />
                                <span className="text-sm font-medium text-gray-700">
                                    Cập nhật hàng ngày
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Promotions Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {promotions.map((promo, index) => (
                            <Link
                                key={promo.id}
                                href={`/promotion/${promo.id}`}
                                className="group block transform transition-all duration-300 hover:scale-105"
                            >
                                <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-300">
                                    {/* Sale Badge */}
                                    <div className="absolute top-4 left-4 z-10">
                                        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                            ƯU ĐÃI HOT
                                        </div>
                                    </div>

                                    {/* Image Container */}
                                    <div className="relative h-56 overflow-hidden">
                                        <Image
                                            src={promo.image}
                                            alt={promo.title}
                                            width={600}
                                            height={400}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-3">
                                            <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                                                {promo.title}
                                            </h2>
                                            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 ml-2" />
                                        </div>

                                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                                            {promo.description}
                                        </p>

                                        {/* Action Button */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                                                Khuyến mãi #{index + 1}
                                            </span>
                                            <div className="bg-blue-50 group-hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300">
                                                Xem chi tiết
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <div className="mt-20 text-center">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-12 border border-blue-100">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Đừng Bỏ Lỡ!
                            </h2>
                            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                                Các khuyến mãi mới được thêm thường xuyên. Hãy quay lại để khám phá những ưu đãi và độc quyền mới nhất.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl">
                                    Đăng ký nhận tin
                                </button>
                                <button className="border border-gray-300 hover:border-blue-300 text-gray-700 hover:text-blue-600 px-8 py-3 rounded-full font-semibold transition-all duration-300">
                                    Xem tất cả danh mục
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromotionPage;
