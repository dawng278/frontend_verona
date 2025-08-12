// frontend/components/Menu/MenuSection.tsx
'use client'; // Component này sử dụng hooks và tương tác người dùng

import React, { useState } from 'react';
import Image from 'next/image'; // Sử dụng Image của Next.js
import { menuCategories } from '@/data/menuData'; // Import dữ liệu tĩnh từ Canvas menuData.ts
import { useCart } from '@/contexts/CartContext'; // Import useCart
import MenuItemCard from './MenuItemCard'; // Import MenuItemCard

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string; // Đây là ID của category
}

interface MenuSectionProps {
    products: Product[];
    user: { id: string; name: string; email: string; role: 'user' | 'admin' } | null;
    setShowAddProductModal: (show: boolean) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({ products, user, setShowAddProductModal }) => {
    // Sử dụng 'id' của category đầu tiên làm activeTab mặc định
    const [activeTabId, setActiveTabId] = useState(menuCategories[0]?.id || 'hot-combo');

    // Tìm tên hiển thị của tab hiện tại để dùng cho tiêu đề "OUR HOT COMBO"
    const currentActiveTab = menuCategories.find(tab => tab.id === activeTabId);
    const activeTabName = currentActiveTab ? currentActiveTab.name : 'Hot Combo';

    const filteredProducts = products && Array.isArray(products)
        ? products.filter(product => {
            const productCategoryNormalized = product.category ? product.category.toLowerCase() : '';
            const activeTabIdNormalized = activeTabId.toLowerCase();
            return productCategoryNormalized === activeTabIdNormalized;
        })
        : [];

    const titleContainerClass = user && user.role === 'admin'
        ? "flex justify-between items-center mb-8 px-4"
        : "flex justify-center items-center mb-8 px-4";

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Tabs / Category Navigation with Images */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {menuCategories.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTabId(tab.id)}
                            className={`
                                    flex flex-col items-center justify-center
                                    p-3 sm:p-4 rounded-xl border-2
                                    text-lg font-medium transition-all duration-300 transform
                                    hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary

                                    ${activeTabId === tab.id
                                ? 'bg-primary text-white border-primary shadow-md'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary'}
                                    min-w-[80px] h-[90px] sm:min-w-[100px] sm:h-[110px] md:min-w-[120px] md:h-[130px]
                                `}
                        >
                            <Image
                                src={tab.icon}
                                alt={tab.name}
                                width={48} // Kích thước cố định cho Image component
                                height={48} // Kích thước cố định cho Image component
                                className="w-10 h-10 sm:w-12 sm:h-12 mb-1 object-contain"
                            />
                            <span className="text-xs sm:text-sm font-semibold text-center">{tab.name}</span>
                        </button>
                    ))}
                </div>

                {/* Tiêu đề phần sản phẩm và nút Admin */}
                <div className={titleContainerClass}>
                    <h2 className="text-4xl font-extrabold text-[#333] tracking-tight">
                        OUR {activeTabName.toUpperCase()}
                    </h2>
                    {user && user.role === 'admin' && (
                        <button
                            onClick={() => setShowAddProductModal(true)}
                            className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 text-sm md:text-base"
                        >
                            + Add New Product
                        </button>
                    )}
                </div>

                {/* Grid hiển thị sản phẩm */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <MenuItemCard key={product.id} item={product} /> // Truyền product làm prop 'item'
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500 text-lg">Không tìm thấy sản phẩm nào trong danh mục này.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default MenuSection;
