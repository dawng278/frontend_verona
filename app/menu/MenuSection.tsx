// Enhanced MenuSection Component
// frontend/components/Menu/MenuSection.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { menuCategories } from '@/data/menuData';
import { useCart } from '@/contexts/CartContext';
import MenuItemCard from './MenuItemCard';
import { Plus, Filter } from 'lucide-react';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
}

interface MenuSectionProps {
    products: Product[];
    user: { id: string; name: string; email: string; role: 'user' | 'admin' } | null;
    setShowAddProductModal: (show: boolean) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({ products, user, setShowAddProductModal }) => {
    const [activeTabId, setActiveTabId] = useState(menuCategories[0]?.id || 'hot-combo');
    const [isTransitioning, setIsTransitioning] = useState(false);

    const currentActiveTab = menuCategories.find(tab => tab.id === activeTabId);
    const activeTabName = currentActiveTab ? currentActiveTab.name : 'Hot Combo';

    const filteredProducts = products && Array.isArray(products)
        ? products.filter(product => {
            const productCategoryNormalized = product.category ? product.category.toLowerCase() : '';
            const activeTabIdNormalized = activeTabId.toLowerCase();
            return productCategoryNormalized === activeTabIdNormalized;
        })
        : [];

    const handleTabChange = (newTabId: string) => {
        if (newTabId === activeTabId) return;

        setIsTransitioning(true);
        setTimeout(() => {
            setActiveTabId(newTabId);
            setIsTransitioning(false);
        }, 150);
    };

    return (
        <section className="py-16 bg-white relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-50/30 to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Category Navigation */}
                <div className="mb-12">
                    <div className="flex items-center justify-center mb-8">
                        <div className="flex items-center space-x-2 bg-amber-100 rounded-full px-4 py-2">
                            <Filter className="h-4 w-4 text-amber-600" />
                            <span className="text-amber-700 font-medium text-sm">Choose Category</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
                        {menuCategories.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
                                className={`
                                    group relative flex flex-col items-center justify-center
                                    p-4 lg:p-6 rounded-2xl transition-all duration-300
                                    min-w-[100px] min-h-[120px] lg:min-w-[130px] lg:min-h-[140px]
                                    ${activeTabId === tab.id
                                    ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-xl scale-105 transform'
                                    : 'bg-white text-gray-700 shadow-lg hover:shadow-xl hover:scale-105 border border-gray-100 hover:border-amber-200'}
                                `}
                            >
                                {/* Active indicator */}
                                {activeTabId === tab.id && (
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white">
                                        <div className="w-full h-full bg-green-500 rounded-full animate-pulse"></div>
                                    </div>
                                )}

                                <div className="relative mb-3">
                                    <Image
                                        src={tab.icon}
                                        alt={tab.name}
                                        width={56}
                                        height={56}
                                        className="w-12 h-12 lg:w-14 lg:h-14 object-contain transition-transform duration-300 group-hover:scale-110"
                                    />
                                    {activeTabId !== tab.id && (
                                        <div className="absolute inset-0 bg-gradient-to-t from-amber-100/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    )}
                                </div>

                                <span className="text-sm lg:text-base font-bold text-center leading-tight">
                                    {tab.name}
                                </span>

                                {activeTabId === tab.id && (
                                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 w-3 h-3 bg-white rounded-full shadow-md"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center mb-6">
                        {user && user.role === 'admin' ? (
                            <div className="flex items-center space-x-6">
                                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                                    OUR <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                                        {activeTabName.toUpperCase()}
                                    </span>
                                </h2>
                                <button
                                    onClick={() => setShowAddProductModal(true)}
                                    className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                                >
                                    <Plus className="h-5 w-5" />
                                    <span>Add Product</span>
                                </button>
                            </div>
                        ) : (
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                                OUR <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                                    {activeTabName.toUpperCase()}
                                </span>
                            </h2>
                        )}
                    </div>
                    <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Freshly prepared with premium ingredients and served with passion
                    </p>
                </div>

                {/* Products Grid */}
                <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                            {filteredProducts.map((product, index) => (
                                <div
                                    key={product.id}
                                    className="animate-fade-in-up"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <MenuItemCard item={product} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                                <Filter className="h-12 w-12 text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Items Found</h3>
                            <p className="text-gray-600 mb-6">
                                We couldn't find any items in this category. Try selecting a different category.
                            </p>
                            <button
                                onClick={() => setActiveTabId(menuCategories[0]?.id || 'hot-combo')}
                                className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-300"
                            >
                                View All Categories
                            </button>
                        </div>
                    )}
                </div>

                {/* Product Count */}
                {filteredProducts.length > 0 && (
                    <div className="text-center mt-12">
                        <div className="inline-flex items-center space-x-2 bg-amber-50 rounded-full px-4 py-2">
                            <span className="text-amber-700 font-medium">
                                Showing {filteredProducts.length} delicious {filteredProducts.length === 1 ? 'item' : 'items'}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default MenuSection;