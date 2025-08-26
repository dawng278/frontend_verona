'use client';

import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import {
    X,
    ShoppingBag,
    Plus,
    Minus,
    Trash2,
    ShoppingCart,
    CreditCard,
    Tag,
    Gift
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function CartOverlay() {
    const {
        cartItems,
        isCartOpen,
        toggleCart,
        removeFromCart,
        totalAmount,
        increaseQuantity,
        decreaseQuantity
    } = useCart();
    const router = useRouter();
    const [isAnimating, setIsAnimating] = useState(false);
    const [removingItems, setRemovingItems] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (isCartOpen) {
            setIsAnimating(true);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isCartOpen]);

    const handleCheckout = () => {
        toggleCart();
        router.push('/checkout');
    };

    const handleRemoveItem = (itemId: string) => {
        setRemovingItems(prev => new Set(prev).add(itemId));
        setTimeout(() => {
            removeFromCart(itemId);
            setRemovingItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(itemId);
                return newSet;
            });
        }, 300);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const estimatedDelivery = "15-25 phút";
    const deliveryFee = 15000;
    const finalTotal = totalAmount + deliveryFee;

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Animated Overlay */}
            <div
                className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                    isAnimating ? 'bg-opacity-50' : 'bg-opacity-0'
                }`}
                onClick={toggleCart}
            />

            {/* Cart Sidebar */}
            <div
                className={`relative h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
                    isAnimating ? 'translate-x-0' : 'translate-x-full'
                } flex flex-col`}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

                    <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                                <ShoppingBag className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">Giỏ hàng</h2>
                                <p className="text-orange-100 text-sm">
                                    {totalItems} món • {formatPrice(totalAmount)}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={toggleCart}
                            className="bg-white/20 backdrop-blur-sm p-2 rounded-xl hover:bg-white/30 transition-colors duration-200"
                        >
                            <X className="h-6 w-6 text-white" />
                        </button>
                    </div>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center p-8">
                            <div className="bg-gray-100 p-8 rounded-full mb-6">
                                <ShoppingCart className="h-16 w-16 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Giỏ hàng trống</h3>
                            <p className="text-gray-600 mb-6">Thêm món ngon để bắt đầu đặt hàng</p>
                            <button
                                onClick={toggleCart}
                                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105"
                            >
                                Khám phá menu
                            </button>
                        </div>
                    ) : (
                        <div className="p-4 space-y-4">
                            {cartItems.map((item, index) => (
                                <div
                                    key={item.id}
                                    className={`group bg-white rounded-2xl border-2 border-gray-100 p-4 hover:border-orange-200 hover:shadow-lg transition-all duration-300 ${
                                        removingItems.has(item.id) ? 'opacity-50 scale-95 transform' : ''
                                    }`}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="flex items-center space-x-4">
                                        {/* Product Image */}
                                        {item.image && (
                                            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </div>
                                        )}

                                        {/* Product Info */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1">
                                                {item.name}
                                            </h4>
                                            <p className="text-amber-600 font-semibold text-lg mb-3">
                                                {formatPrice(item.price)}
                                            </p>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center bg-gray-50 rounded-xl p-1">
                                                    <button
                                                        onClick={() => decreaseQuantity(item.id)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-md transition-all duration-200 text-gray-600 hover:text-orange-500"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </button>
                                                    <span className="px-4 py-1 font-bold text-gray-900 min-w-[3rem] text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => increaseQuantity(item.id)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-md transition-all duration-200 text-gray-600 hover:text-orange-500"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => handleRemoveItem(item.id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 transform hover:scale-110"
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Item Total */}
                                        <div className="text-right">
                                            <div className="text-xl font-bold text-gray-900">
                                                {formatPrice(item.price * item.quantity)}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                {item.quantity} × {formatPrice(item.price)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Promo Code Section */}
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-100 rounded-2xl p-4 mt-6">
                                <div className="flex items-center space-x-3 mb-3">
                                    <Gift className="h-5 w-5 text-green-600" />
                                    <span className="font-semibold text-green-800">Mã khuyến mãi</span>
                                </div>
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        placeholder="Nhập mã khuyến mãi"
                                        className="flex-1 px-3 py-2 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 text-sm"
                                    />
                                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-200">
                                        Áp dụng
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="border-t border-gray-200 bg-white">
                        {/* Delivery Info */}
                        <div className="px-4 py-3 bg-blue-50 border-b border-blue-100">
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-blue-700 font-medium">Thời gian giao hàng</span>
                                </div>
                                <span className="text-blue-600 font-semibold">{estimatedDelivery}</span>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="p-4 space-y-3">
                            <div className="flex items-center justify-between text-gray-600">
                                <span>Tạm tính ({totalItems} món)</span>
                                <span className="font-semibold">{formatPrice(totalAmount)}</span>
                            </div>
                            <div className="flex items-center justify-between text-gray-600">
                                <span>Phí giao hàng</span>
                                <span className="font-semibold">{formatPrice(deliveryFee)}</span>
                            </div>
                            <div className="h-px bg-gray-200"></div>
                            <div className="flex items-center justify-between text-lg font-bold text-gray-900">
                                <span>Tổng cộng</span>
                                <span className="text-orange-600">{formatPrice(finalTotal)}</span>
                            </div>

                            {/* Checkout Button */}
                            <button
                                onClick={handleCheckout}
                                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 mt-4"
                            >
                                <CreditCard className="h-6 w-6" />
                                <span>Tiến hành thanh toán</span>
                            </button>

                            {/* Continue Shopping */}
                            <button
                                onClick={toggleCart}
                                className="w-full border-2 border-gray-200 hover:border-orange-300 text-gray-700 hover:text-orange-600 py-3 rounded-2xl font-semibold transition-all duration-300 mt-2"
                            >
                                Tiếp tục mua sắm
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Add these CSS styles to your global CSS file for additional animations
/*
.line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.animate-slide-in {
    animation: slideInRight 0.3s ease-out;
}

@keyframes fadeInUp {
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
    animation: fadeInUp 0.4s ease-out forwards;
}
*/