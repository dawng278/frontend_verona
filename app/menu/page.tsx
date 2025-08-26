// app/menu/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import MenuSection from '@/app/menu/MenuSection';
import { menuItems } from '@/data/menuData';
import { ChefHat, Clock, Star, Award } from 'lucide-react';

type ProductType = {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
};

const USE_STATIC_DATA = true;

const MenuPage: React.FC = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState<ProductType[]>([]);
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            setIsLoading(true);

            // Giả lập thời gian tải để UX mượt hơn
            await new Promise(resolve => setTimeout(resolve, 500));

            if (USE_STATIC_DATA) {
                const mappedItems: ProductType[] = menuItems.map((item, index) => ({
                    id: `static-${index}`,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    description: item.description || '',
                    category: item.category || '',
                }));
                setProducts(mappedItems);
                console.log('Sử dụng dữ liệu sản phẩm tĩnh.');
            } else {
                setError("Chức năng tải sản phẩm từ API chưa được triển khai hoàn chỉnh.");
                setProducts([]);
            }

            setIsLoading(false);
        };

        loadProducts();
    }, []);

    const handleAddProductSuccess = (newProduct: ProductType) => {
        setProducts(prevProducts => [...prevProducts, newProduct]);
        setShowAddProductModal(false);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Đang tải thực đơn hấp dẫn...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-amber-600 via-orange-500 to-red-600">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative px-6 py-20 sm:py-24 lg:px-8">
                    <div className="mx-auto max-w-6xl">
                        <div className="text-center mb-12">
                            <div className="flex justify-center mb-6">
                                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">
                                    <ChefHat className="h-6 w-6 text-white" />
                                    <span className="text-white font-semibold">Tươi ngon mỗi ngày</span>
                                </div>
                            </div>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
                                Thực Đơn Của Chúng Tôi
                            </h1>
                            <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
                                Khám phá những món ăn được chế biến công phu, nguyên liệu tuyển chọn và đầy ắp yêu thương.
                            </p>
                        </div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                            <div className="text-center">
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                                    <ChefHat className="h-8 w-8 text-white mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-white">{products.length}+</div>
                                    <div className="text-orange-100 text-sm">Món ăn</div>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                                    <Clock className="h-8 w-8 text-white mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-white">15 phút</div>
                                    <div className="text-orange-100 text-sm">Thời gian chuẩn bị TB</div>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                                    <Star className="h-8 w-8 text-white mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-white">4.9</div>
                                    <div className="text-orange-100 text-sm">Đánh giá khách hàng</div>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                                    <Award className="h-8 w-8 text-white mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-white">100%</div>
                                    <div className="text-orange-100 text-sm">Nguyên liệu tươi mới</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                </div>
            </div>

            {/* Main Content */}
            <main className="relative -mt-12 z-10">
                <MenuSection
                    products={products}
                    user={user}
                    setShowAddProductModal={setShowAddProductModal}
                />
            </main>

            {/* Footer CTA Section */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Không tìm thấy món bạn muốn?
                    </h2>
                    <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                        Đầu bếp của chúng tôi luôn sáng tạo ra những món ăn mới. Liên hệ với chúng tôi để đặt món theo yêu cầu hoặc chế độ ăn đặc biệt.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                            Liên hệ đầu bếp
                        </button>
                        <button className="border border-gray-400 hover:border-white text-gray-300 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300">
                            Xem món đặc biệt
                        </button>
                    </div>
                </div>
            </div>

            {error && (
                <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50">
                    {error}
                </div>
            )}
        </div>
    );
};

export default MenuPage;
