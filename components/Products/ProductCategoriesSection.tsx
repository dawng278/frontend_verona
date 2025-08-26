import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronRight, Sparkles } from 'lucide-react';

// Type definitions
interface Category {
    name: string;
    defaultImg: string;
    hoverImg: string;
    link: string;
    description: string;
    color: string;
}

interface CategoryCardProps {
    category: Category;
}

// Mock background image - replace with your actual import
const bgCategories = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZGVmcz4KPGF0YWRpYWxHcmFkaWVudCBpZD0iYmciIGN4PSI5NjAiIGN5PSI1NDAiIHI9IjgwMCI+CjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNGRkY3RUQiLz4KPHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiNGRkY0RTYiLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjRkRFNjhBIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjE5MjAiIGhlaWdodD0iMTA4MCIgZmlsbD0idXJsKCNiZykiLz4KPC9zdmc+";

// Using data URLs for placeholder images (no external domains needed)
const mockImages = {
    burger: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkY5ODAwIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSI4MCIgZm9udC1mYW1pbHk9IkFyaWFsIj7wn42UPC90ZXh0Pgo8L3N2Zz4=",
    burgerHover: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkY1NzIyIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSI4MCIgZm9udC1mYW1pbHk9IkFyaWFsIj7wn42UPC90ZXh0Pgo8L3N2Zz4=",
    friedChicken: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjQ0MzM2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSI4MCIgZm9udC1mYW1pbHk9IkFyaWFsIj7wn42XPC90ZXh0Pgo8L3N2Zz4=",
    friedChickenHover: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRDMyRjJGIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSI4MCIgZm9udC1mYW1pbHk9IkFyaWFsIj7wn42XPC90ZXh0Pgo8L3N2Zz4=",
    fries: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZDMTA3Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSI4MCIgZm9udC1mYW1pbHk9IkFyaWFsIj7wn42fPC90ZXh0Pgo8L3N2Zz4=",
    friesHover: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkY4RjAwIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSI4MCIgZm9udC1mYW1pbHk9IkFyaWFsIj7wn42fPC90ZXh0Pgo8L3N2Zz4=",
    iceCream: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRTkxRTYzIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSI4MCIgZm9udC1mYW1pbHk9IkFyaWFsIj7wn42mPC90ZXh0Pgo8L3N2Zz4=",
    iceCreamHover: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjQzIxODVCIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSI4MCIgZm9udC1mYW1pbHk9IkFyaWFsIj7wn42mPC90ZXh0Pgo8L3N2Zz4=",
};

// Enhanced category data
const categoriesData: Category[] = [
    {
        name: 'Burger',
        defaultImg: mockImages.burger,
        hoverImg: mockImages.burgerHover,
        link: '/menu?category=burger',
        description: 'Ngon mọng & Hấp dẫn',
        color: 'from-amber-400 to-orange-500'
    },
    {
        name: 'Gà Rán',
        defaultImg: mockImages.friedChicken,
        hoverImg: mockImages.friedChickenHover,
        link: '/menu?category=fried-chicken',
        description: 'Giòn tan & Vàng ruộm',
        color: 'from-red-400 to-pink-500'
    },
    {
        name: 'Khoai Tây Chiên',
        defaultImg: mockImages.fries,
        hoverImg: mockImages.friesHover,
        link: '/menu?category=fries',
        description: 'Giòn rụm & Hoàn hảo',
        color: 'from-yellow-400 to-orange-400'
    },
    {
        name: 'Kem',
        defaultImg: mockImages.iceCream,
        hoverImg: mockImages.iceCreamHover,
        link: '/menu?category=ice-cream',
        description: 'Mát lạnh & Béo ngậy',
        color: 'from-pink-400 to-purple-500'
    },
];

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div
            className="group relative overflow-hidden bg-white border border-gray-100 hover:border-gray-200 rounded-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

            {/* Content */}
            <div className="relative p-6 lg:p-8 h-full flex flex-col items-center text-center">
                {/* Image container */}
                <div className="relative w-24 h-24 lg:w-32 lg:h-32 mb-4 lg:mb-6">
                    <Image
                        src={isHovered ? category.hoverImg : category.defaultImg}
                        alt={category.name}
                        width={128}
                        height={128}
                        className={`w-full h-full object-cover rounded-full transition-all duration-500 transform group-hover:scale-110 ${
                            imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={() => setImageLoaded(true)}
                        priority={true}
                        unoptimized={true}
                    />

                    {!imageLoaded && (
                        <div className="absolute inset-0 bg-gray-200 rounded-full animate-pulse" />
                    )}

                    <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                    </div>
                </div>

                <div className="flex-grow">
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                        {category.name}
                    </h3>
                    <p className="text-sm lg:text-base text-gray-500 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                        {category.description}
                    </p>
                </div>

                <button className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 hover:bg-orange-600">
                    Khám Phá
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
            </div>
        </div>
    );
};

const ProductCategoriesSection = () => {
    return (
        <section
            className="relative py-16 lg:py-24 overflow-hidden"
            style={{
                backgroundImage: `url(${bgCategories})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="absolute inset-0">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-200/30 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12 lg:mb-16">
                    <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <Sparkles className="w-4 h-4" />
                        Danh Mục Thực Đơn
                    </div>
                    <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
                        Hôm nay ăn gì{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                            nào?
                        </span>
                    </h2>
                    <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Thực đơn BEKA đa dạng và phong phú, với nhiều lựa chọn hấp dẫn dành cho bạn, gia đình và bạn bè.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {categoriesData.map((category, index) => (
                        <div
                            key={index}
                            className="animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <CategoryCard category={category} />
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-12 lg:mt-16">
                    <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-lg font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        Xem Toàn Bộ Thực Đơn
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                }
            `}</style>
        </section>
    );
};

export default ProductCategoriesSection;
