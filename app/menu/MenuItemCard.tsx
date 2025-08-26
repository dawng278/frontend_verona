// Enhanced MenuItemCard Component
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { Plus, Heart, Star, Clock } from 'lucide-react';

interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
}

interface MenuItemCardProps {
    item: MenuItem;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
    const { addToCart, loading: cartLoading } = useCart();
    const [isLiked, setIsLiked] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const formattedPrice = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
    }).format(item.price);

    const handleAddToCartClick = () => {
        addToCart({ ...item, quantity: 1 });
    };

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };

    return (
        <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 hover:transform hover:scale-105 border border-gray-100">
            {/* Image Container */}
            <div className="relative h-56 overflow-hidden bg-gray-100">
                <Image
                    src={item.image}
                    alt={item.name}
                    width={300}
                    height={300}
                    className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    priority={false}
                    loading="lazy"
                />

                {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
                    </div>
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Like button */}
                <button
                    onClick={handleLikeClick}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300"
                >
                    <Heart
                        className={`h-5 w-5 transition-colors duration-300 ${
                            isLiked ? 'text-red-500 fill-current' : 'text-gray-400'
                        }`}
                    />
                </button>

                {/* Popular badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    Popular
                </div>

                {/* Quick info overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center justify-between text-white text-sm">
                        <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-current text-yellow-400" />
                            <span>4.8</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>15min</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors duration-300 line-clamp-2">
                    {item.name}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {item.description || "Deliciously prepared with fresh ingredients and authentic flavors."}
                </p>

                <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-amber-600">
                        {formattedPrice}
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="h-3 w-3 fill-current text-yellow-400" />
                            ))}
                        </div>
                        <span className="ml-1">(124)</span>
                    </div>
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCartClick}
                    disabled={cartLoading}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    aria-label={`Add ${item.name} to cart`}
                >
                    {cartLoading ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Adding...</span>
                        </>
                    ) : (
                        <>
                            <Plus className="h-5 w-5" />
                            <span>Add to Cart</span>
                        </>
                    )}
                </button>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full -translate-y-10 translate-x-10 transition-transform duration-500 group-hover:scale-150"></div>
        </div>
    );
};

export default MenuItemCard;

// Add these CSS animations to your global CSS file
/*
@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out forwards;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
*/