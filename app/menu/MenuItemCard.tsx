'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';

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

    const formattedPrice = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
    }).format(item.price);

    // ✅ Sửa lỗi thiếu quantity bằng cách thêm vào object
    const handleAddToCartClick = () => {
        addToCart({ ...item, quantity: 1 }); // Thêm quantity để phù hợp kiểu CartItem
    };

    return (
        <div className="relative bg-white rounded-lg shadow-lg overflow-hidden
                        flex flex-col items-center text-center p-4 md:p-6 lg:p-8
                        transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl z-10">
            {/* Ảnh sản phẩm */}
            <div className="w-full h-48 md:h-48 lg:h-48 flex items-center justify-center mb-4">
                <Image
                    src={item.image}
                    alt={item.name}
                    width={200}
                    height={200}
                    className="max-w-full max-h-full object-contain"
                    priority={false}
                    loading="lazy"
                />
            </div>

            {/* Tên sản phẩm */}
            <h3 className="text-xl md:text-xl font-bold text-gray-800 mb-2 uppercase">
                {item.name}
            </h3>

            {/* Giá sản phẩm */}
            <p className="text-xl md:text-xl font-extrabold text-secondary mb-4">
                {formattedPrice}
            </p>

            {/* Nút "Add to Cart" */}
            <button
                onClick={handleAddToCartClick}
                className="w-full bg-primary text-white text-lg md:text-xl font-bold uppercase
                           py-3 px-6 rounded-full shadow-md
                           hover:bg-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-500 focus-visible:ring-opacity-75
                           transition-colors duration-200
                           disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={`Add ${item.name} to cart`}
                disabled={cartLoading}
            >
                {cartLoading ? 'Adding...' : 'Add to Cart'}
            </button>
        </div>
    );
};

export default MenuItemCard;
