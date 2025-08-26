import React from 'react';
import CategoryHoverCard from '../components/Products/CategoryHoverCard';

// Import ảnh từ frontend/assets (dùng StaticImageData)
import burger from '@/assets/images/thumbnails/burger.png';
import burgerHover from '@/assets/images/thumbnails/burger-light.png';
import friedChickenBucket from '@/assets/images/thumbnails/fried-chicken.png';
import friedChickenBucketHover from '@/assets/images/thumbnails/fried-chicken-light.png';
import friesBox from '@/assets/images/thumbnails/french-fries.png';
import friesBoxHover from '@/assets/images/thumbnails/french-fries-light.png';
import iceCreamCup from '@/assets/images/thumbnails/ice-cream.png';
import iceCreamCupHover from '@/assets/images/thumbnails/ice-cream-light.png';

// VẪN CẦN categoriesData
const categoriesData = [
    {
        name: 'Burger',
        defaultImg: burger,
        hoverImg: burgerHover,
        link: '/menu?category=burger',
    },
    {
        name: 'Gà Rán',
        defaultImg: friedChickenBucket,
        hoverImg: friedChickenBucketHover,
        link: '/menu?category=fried-chicken',
    },
    {
        name: 'Khoai tây chiên',
        defaultImg: friesBox,
        hoverImg: friesBoxHover,
        link: '/menu?category=fries',
    },
    {
        name: 'Kem',
        defaultImg: iceCreamCup,
        hoverImg: iceCreamCupHover,
        link: '/menu?category=ice-cream',
    },
];

const ProductCategoriesSection = () => {
    return (
        <section className="...">
        <div className="...">
            {/* Duyệt qua danh sách categories để render */}
    {categoriesData.map((category) => (
        <CategoryHoverCard
            key={category.name}
        name={category.name}
        defaultImg={category.defaultImg}
        hoverImg={category.hoverImg}
        linkTo={category.link}
        />
    ))}

    {/* Phần "What to eat today?" */}
    <div className="...">
        {/* ... */}
        </div>
        </div>
        </section>
);
};

export default ProductCategoriesSection;
