'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Flame, Star, Clock, MapPin, Phone } from 'lucide-react';
import banner from "@/assets/images/thumbnails/banner.png";
import backgroundTexture from "@/assets/images/backgrounds/background.png";
import largeSpicyBeefBurger from "@/assets/images/thumbnails/signature.png";
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
            {/* Background with Parallax Effect */}
            <div
                className="absolute inset-0 w-full h-full"
                style={{
                    transform: `translateY(${scrollY * 0.5}px)`,
                }}
            >
                <Image
                    src={backgroundTexture}
                    alt="Nền"
                    className="w-full h-full object-cover opacity-60"
                    fill
                    priority={true}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 via-orange-50/60 to-red-50/40"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 pt-20">
                {/* Hero Banner */}
                <div className="relative mb-12 overflow-hidden ">
                    <Image
                        src={banner}
                        alt="Ảnh Banner"
                        className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t to-transparent"></div>
                </div>

                {/* Hero Section */}
                <div className="container mx-auto px-4 py-16 lg:py-24">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

                        {/* Left Section: Enhanced Text Content */}
                        <div className={`
                            text-center lg:text-left lg:w-1/2 space-y-8
                            transform transition-all duration-1000 ease-out
                            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
                        `}>
                            {/* Badge */}
                            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                                <Flame className="w-4 h-4" />
                                <span>MÓN MỚI</span>
                            </div>

                            {/* Main Heading */}
                            <div className="space-y-4">
                                <h1 className="text-4xl md:text-5xl lg:text-7xl text-[#B61E01] font-['DM_Serif_Text'] font-bold leading-tight">
                                    Món Ăn Mới
                                    <span className="block bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                                        Cay Nóng Hấp Dẫn
                                    </span>
                                </h1>

                                {/* Rating Display */}
                                <div className="flex items-center justify-center lg:justify-start space-x-2 text-yellow-500">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-current" />
                                    ))}
                                    <span className="text-gray-600 ml-2">4.9 (2.1k đánh giá)</span>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-[#2D0902] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                Một món ăn mới chinh phục vị giác của bạn với hương vị
                                <span className="font-semibold text-red-600"> cay nồng bùng nổ</span>, được chế biến tinh tế để mang lại sự phấn khích tột độ.
                                Đây thật sự là một thử thách cho những tín đồ yêu thích vị cay.
                            </p>

                            {/* Features */}
                            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
                                <div className="flex items-center space-x-2 text-gray-700">
                                    <Clock className="w-5 h-5 text-green-600" />
                                    <span className="text-sm">Giao hàng 15 phút</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-700">
                                    <MapPin className="w-5 h-5 text-blue-600" />
                                    <span className="text-sm">Tươi ngon & Địa phương</span>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                                <button className="group relative px-8 py-4 bg-gradient-to-r from-[#B61E01] to-red-600 text-white text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
                                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                    <div className="relative flex items-center space-x-2">
                                        <span>Đặt Ngay</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </button>

                                <button className="flex items-center space-x-2 px-6 py-4 border-2 border-gray-800 text-gray-800 rounded-2xl hover:bg-gray-800 hover:text-white transition-all duration-300">
                                    <Phone className="w-5 h-5" />
                                    <span className="font-semibold">Gọi Ngay</span>
                                </button>
                            </div>

                            {/* Social Proof */}
                            <div className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-gray-600 pt-4">
                                <div className="text-center">
                                    <div className="font-bold text-2xl text-[#B61E01]">50K+</div>
                                    <div>Khách Hàng Hài Lòng</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-2xl text-[#B61E01]">25+</div>
                                    <div>Chi Nhánh</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-2xl text-[#B61E01]">5★</div>
                                    <div>Đánh Giá</div>
                                </div>
                            </div>
                        </div>

                        {/* Main Product Image */}
                        <div className="relative overflow-hidden rounded-2xl">
                            <Image
                                src={largeSpicyBeefBurger}
                                alt="Burger Bò Cay Đặc Biệt"
                                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
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

                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-xl mx-4">
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
