// frontend/components/Products/ProductCategoriesSection.tsx
import React from 'react';
import CategoryHoverCard from './CategoryHoverCard'; // Import component con

// Import tất cả các ảnh
import burger from "@/assets/images/thumbnails/burger.png";
import burgerHover from "@/assets/images/thumbnails/burger-light.png";
import friedChickenBucket from "@/assets/images/thumbnails/fried-chicken.png";
import friedChickenBucketHover from "@/assets/images/thumbnails/fried-chicken-light.png";
import friesBox from "@/assets/images/thumbnails/french-fries.png";
import friesBoxHover from "@/assets/images/thumbnails/french-fries-light.png";
import iceCreamCup from "@/assets/images/thumbnails/ice-cream.png";
import iceCreamCupHover from "@/assets/images/thumbnails/ice-cream-light.png";


// Dữ liệu cho các category
const categoriesData = [
    { name: 'Burger', defaultImg: burger, hoverImg: burgerHover, link: '/menu?category=burger' },
    { name: 'Fried Chicken', defaultImg: friedChickenBucket, hoverImg: friedChickenBucketHover, link: '/menu?category=fried-chicken' },
    { name: 'Fries', defaultImg: friesBox, hoverImg: friesBoxHover, link: '/menu?category=fries' },
    { name: 'Ice Cream', defaultImg: iceCreamCup, hoverImg: iceCreamCupHover, link: '/menu?category=ice-cream' },
];

const ProductCategoriesSection = () => {
    return (
        <section className="container mx-auto px-0 py-12 md:py-16 lg:py-20" aria-labelledby="what-to-eat-heading">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0 border-t border-b border-gray-300"> {/* Thêm border */}
                {/* Các cột sản phẩm */}
                {categoriesData.map((category, index) => (
                    <CategoryHoverCard
                        key={index}
                        name={category.name}
                        defaultImg={category.defaultImg}
                        hoverImg={category.hoverImg}
                        linkTo={category.link}
                    />
                ))}

                {/* Cột cuối cùng: Text "What to eat today?" */}
                <div className="bg-[#FF9800] p-6 flex flex-col justify-center items-start col-span-2 md:col-span-1"> {/* col-span-2 trên mobile và sm */}
                    <h2 id="what-to-eat-heading" className="text-4xl md:text-5xl font-bold text-[#B61E01] mb-2 leading-tight">What to</h2>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#B61E01] mb-4 leading-tight">eat today?</h2>
                    <p className="text-lg md:text-xl text-[#2D0902]">
                        BEKA menu is varied and rich, there are many choices for you, your family and friends.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ProductCategoriesSection;