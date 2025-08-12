// app/menu/page.tsx
'use client'; // Component này sử dụng hooks và tương tác người dùng

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import MenuSection from '@/app/menu/MenuSection';
import { menuItems } from '@/data/menuData'; // Import dữ liệu tĩnh

type ProductType = {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
};

// ***** CẤU HÌNH QUAN TRỌNG: CHUYỂN ĐỔI GIỮA DỮ LIỆU TĨNH VÀ DỮ LIỆU ĐỘNG *****
const USE_STATIC_DATA = true; // Đặt true để dùng dữ liệu tĩnh, false để dùng API

const MenuPage: React.FC = () => {
    const { user } = useAuth(); // Lấy user từ context

    const [products, setProducts] = useState<ProductType[]>([]); // State để lưu trữ sản phẩm
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (USE_STATIC_DATA) {
            const mappedItems: ProductType[] = menuItems.map((item, index) => ({
                id: `static-${index}`, // hoặc dùng uuid nếu muốn
                name: item.name,
                price: item.price,
                image: item.image,
                description: item.description || '',  // fallback nếu thiếu
                category: item.category || '',        // fallback nếu thiếu
            }));
            setProducts(mappedItems);
            console.log('Sử dụng dữ liệu sản phẩm tĩnh.');
        } else {
            // Logic lấy dữ liệu từ API (chưa triển khai API route ở đây)
            // Bạn sẽ cần tạo API route /api/products để lấy dữ liệu từ MongoDB
            const fetchProducts = async () => {
                try {
                    // const res = await axios.get('/api/products'); // Sử dụng đường dẫn API tương đối
                    // setProducts(res.data.data); // Hoặc res.data tùy cấu trúc API của bạn
                    // console.log('Đã tải sản phẩm từ API:', res.data.data);
                    setError("Chức năng tải sản phẩm từ API chưa được triển khai hoàn chỉnh.");
                    setProducts([]); // Đảm bảo rỗng nếu API chưa hoạt động
                } catch (err) {
                    console.error('Lỗi khi tải sản phẩm từ API:', err);
                    setError('Không thể tải sản phẩm. Vui lòng thử lại sau.');
                    setProducts([]);
                }
            };
            fetchProducts();
        }
    }, []); // Dependency rỗng để chỉ chạy một lần khi component mount

    const handleAddProductSuccess = (newProduct: ProductType) => {
        setProducts(prevProducts => [...prevProducts, newProduct]);
        setShowAddProductModal(false);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow">
                {/* Truyền user và hàm setShowAddProductModal xuống MenuSection */}
                <MenuSection
                    products={products}
                    user={user}
                    setShowAddProductModal={setShowAddProductModal}
                />
            </main>

        </div>
    );
};

export default MenuPage;
