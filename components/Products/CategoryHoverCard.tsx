// frontend/components/Products/CategoryHoverCard.tsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';

interface CategoryHoverCardProps {
    name: string;
    defaultImg: StaticImageData;
    hoverImg: StaticImageData;
    linkTo: string;
}

const CategoryHoverCard: React.FC<CategoryHoverCardProps> = ({
                                                                 name,
                                                                 defaultImg,
                                                                 hoverImg,
                                                                 linkTo,
                                                             }) => {
    // Sử dụng state để quản lý trạng thái hover
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link
            href={linkTo} // Next.js Link sử dụng `href` thay vì `to`
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative flex flex-col items-center justify-between
                       bg-[#F4EDD3] border-r border-gray-300 overflow-hidden
                       transition-colors duration-300 ease-in-out hover:bg-[#FF9800]
                       focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-500 focus-visible:ring-opacity-75"
            aria-label={`View ${name} category`}
        >
            {/* Nội dung bên trong card, bao gồm ảnh */}
            <div className="relative w-full flex items-center justify-center
                            min-h-[180px] md:min-h-[250px] lg:min-h-[500px]
                            p-4 md:p-6 lg:p-8">
                {/* Ảnh mặc định */}
                <Image
                    src={defaultImg}
                    alt={`${name} category thumbnail`}
                    // Sử dụng lớp CSS để điều khiển opacity dựa trên trạng thái hover
                    className={`absolute inset-0 w-full h-full object-contain
                               transform scale-90
                               transition-all duration-300 ease-in-out
                               ${isHovered ? 'opacity-0' : 'opacity-100'}`}
                    fill // Sử dụng `fill` để ảnh tự động lấp đầy div cha
                    loading="lazy"
                />
                {/* Ảnh hover */}
                <Image
                    src={hoverImg}
                    alt={`${name} category thumbnail on hover`}
                    // Sử dụng lớp CSS để điều khiển opacity và scale dựa trên trạng thái hover
                    className={`absolute inset-0 w-full h-full object-contain
                               transform transition-all duration-300 ease-in-out
                               ${isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
                    fill // Sử dụng `fill` để ảnh tự động lấp đầy div cha
                    loading="lazy"
                />
            </div>

            {/* Tên category dưới ảnh */}
            <h3 className="w-full bg-white text-xs md:text-xl font-bold text-gray-800 uppercase text-center
                           py-4 px-4 border-t border-gray-300
                           transition-colors duration-300 ease-in-out group-hover:text-red-800">
                {name}
            </h3>
        </Link>
    );
};

export default CategoryHoverCard;
