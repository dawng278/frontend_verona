'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Pizza from '@/assets/images/thumbnails/pizza.png'
import { ArrowRight, Flame, Star, Clock, MapPin, Phone } from 'lucide-react';
import ProductCategoriesSection from '@/components/Products/ProductCategoriesSection';
import ServiceSection from '@/components/Products/ServiceSection';
import FindStoreSection from '@/components/common/FindStoreSection';

const HomePage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        setIsVisible(true);

        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative w-full min-h-screen overflow-hidden">
            {/* Pizza-themed Background */}
            <div
                className="absolute inset-0 w-full h-full"
                style={{
                    transform: `translateY(${scrollY * 0.5}px)`,
                }}
            >
                {/* Pizza-themed gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-red-50 to-yellow-50"></div>

                {/* Pizza pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                    <div className="w-full h-full"
                         style={{
                             backgroundImage: `radial-gradient(circle at 25% 25%, #ff6b35 2px, transparent 2px),
                                             radial-gradient(circle at 75% 75%, #ffbe0b 2px, transparent 2px),
                                             radial-gradient(circle at 50% 50%, #fb8500 3px, transparent 3px)`,
                             backgroundSize: '100px 100px, 80px 80px, 60px 60px'
                         }}>
                    </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/90 via-red-50/70 to-yellow-50/60"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10">
                {/* Hero Section */}
                <div className="container mx-auto px-4 py-16 lg:py-24">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

                        {/* Left Section: Pizza Content */}
                        <div className={`
                            text-center lg:text-left lg:w-1/2 space-y-8
                            transform transition-all duration-1000 ease-out
                            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
                        `}>
                            {/* Badge */}
                            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                                <Flame className="w-4 h-4" />
                                <span>PIZZA MỚI</span>
                            </div>

                            {/* Main Heading */}
                            <div className="space-y-4">
                                <h1 className="text-4xl md:text-5xl lg:text-7xl text-[#D2001C] font-['DM_Serif_Text'] font-bold leading-tight">
                                    Pizza Artisan
                                    <span className="block bg-gradient-to-r from-orange-600 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                                        Hương Vị Ý Chính Hiệu
                                    </span>
                                </h1>

                                {/* Rating Display */}
                                <div className="flex items-center justify-center lg:justify-start space-x-2 text-yellow-500">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-current" />
                                    ))}
                                    <span className="text-gray-600 ml-2">4.9 (3.2k đánh giá)</span>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-[#2D0902] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                Thưởng thức pizza được làm thủ công với
                                <span className="font-semibold text-red-600"> đế bánh mỏng giòn</span>, phô mai mozzarella tươi ngon và những nguyên liệu cao cấp được nhập khẩu trực tiếp từ Ý.
                                Mỗi chiếc pizza là một tác phẩm nghệ thuật ẩm thực.
                            </p>

                            {/* Features */}
                            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
                                <div className="flex items-center space-x-2 text-gray-700">
                                    <Clock className="w-5 h-5 text-green-600" />
                                    <span className="text-sm">Nướng tươi 20 phút</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-700">
                                    <MapPin className="w-5 h-5 text-blue-600" />
                                    <span className="text-sm">Nguyên liệu từ Ý</span>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                                <button className="group relative px-8 py-4 bg-gradient-to-r from-[#D2001C] to-orange-600 text-white text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
                                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                    <div className="relative flex items-center space-x-2">
                                        <span>Đặt Pizza Ngay</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </button>

                                <button className="flex items-center space-x-2 px-6 py-4 border-2 border-gray-800 text-gray-800 rounded-2xl hover:bg-gray-800 hover:text-white transition-all duration-300">
                                    <Phone className="w-5 h-5" />
                                    <span className="font-semibold">Gọi Đặt Bàn</span>
                                </button>
                            </div>

                            {/* Social Proof */}
                            <div className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-gray-600 pt-4">
                                <div className="text-center">
                                    <div className="font-bold text-2xl text-[#D2001C]">75K+</div>
                                    <div>Pizza Đã Bán</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-2xl text-[#D2001C]">35+</div>
                                    <div>Chi Nhánh</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-2xl text-[#D2001C]">5★</div>
                                    <div>Đánh Giá</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Section: Pizza Image */}
                        <div className={`
                            lg:w-1/2 relative
                            transform transition-all duration-1200 ease-out delay-300
                            ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'}
                        `}>
                            <div className="relative w-full max-w-lg mx-auto">
                                {/* Background decoration circle */}
                                <div className="absolute inset-0  transform scale-110 animate-pulse"></div>

                                {/* Main pizza image container */}
                                <div className="relative overflow-hidden ">
                                    <Image
                                        src={Pizza}
                                        alt="Pizza Đặc Biệt"
                                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                                        priority
                                    />

                                    {/* Badge overlay */}
                                    <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                        HOT
                                    </div>
                                </div>

                                {/* Floating decorative elements */}
                                <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-full opacity-80 animate-bounce delay-100 flex items-center justify-center text-white text-xl">
                                    🍅
                                </div>
                                <div className="absolute -bottom-6 -left-6 w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full opacity-80 animate-bounce delay-300 flex items-center justify-center text-white text-lg">
                                    🌿
                                </div>
                                <div className="absolute top-1/2 -right-8 w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full opacity-80 animate-bounce delay-500 flex items-center justify-center text-white text-sm">
                                    🧀
                                </div>

                                {/* Steam effect */}
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                                    <div className="flex space-x-1">
                                        <div className="w-1 h-6 bg-white/60 rounded-full animate-pulse"></div>
                                        <div className="w-1 h-8 bg-white/40 rounded-full animate-pulse delay-150"></div>
                                        <div className="w-1 h-6 bg-white/60 rounded-full animate-pulse delay-300"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Sections with Better Spacing */}
                <div className="space-y-16">
                    <div className="bg-white/80 backdrop-blur-sm rounded-t-3xl shadow-xl">
                        <div className="px-4 py-16">
                            <ProductCategoriesSection />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl shadow-xl mx-4">
                        <div className="px-4 py-16">
                            <ServiceSection />
                        </div>
                    </div>

                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl mx-4 mb-16">
                        <div className="px-4 py-16">
                            <FindStoreSection />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;