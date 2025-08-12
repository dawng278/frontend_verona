// frontend/data/menuData.ts

// Import ảnh cho categories
// Đảm bảo các file ảnh này tồn tại trong thư mục frontend/assets/images/categories/
import hotComboIcon from '@/assets/images/categories/hot-combo.png';
import friedChickenIcon from '@/assets/images/categories/fried-chicken-light.png';
import burgerIcon from '@/assets/images/categories/burger-menu.png';
import snacksIcon from '@/assets/images/categories/snacks.png';
import dessertsIcon from '@/assets/images/categories/desserts.png';
import drinksIcon from '@/assets/images/categories/drinks.png';

// Import ảnh cho các sản phẩm/combo
// Đảm bảo các file ảnh này tồn tại trong thư mục frontend/assets/images/menu/hotCombo/
import combo1Img from '@/assets/images/menu/hotCombo/combo1.png';
import combo2Img from '@/assets/images/menu/hotCombo/combo2.png';
import combo3Img from '@/assets/images/menu/hotCombo/combo3.png';
import combo4Img from '@/assets/images/menu/hotCombo/combo4.png';
import combo5Img from '@/assets/images/menu/hotCombo/combo5.png';

// Import ảnh cho các sản phẩm/burger
// Đảm bảo các file ảnh này tồn tại trong thư mục frontend/assets/images/menu/burger/
import beefBurgerImg from '../assets/images/menu/burger/beef-burger.png';


interface Category {
    id: string;
    name: string;
    icon: string;
}

interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string; // Đây là ID của category
}

export const menuCategories: Category[] = [
    { id: 'hot-combo', name: 'Hot Combo', icon: hotComboIcon.src }, // .frontend để lấy đường dẫn thực tế từ import
    { id: 'fried-chicken', name: 'Fried Chicken', icon: friedChickenIcon.src },
    { id: 'burger', name: 'Burger', icon: burgerIcon.src },
    { id: 'snacks', name: 'Snacks', icon: snacksIcon.src },
    { id: 'desserts', name: 'Desserts', icon: dessertsIcon.src },
    { id: 'drinks', name: 'Drinks', icon: drinksIcon.src },
];

export const menuItems: MenuItem[] = [
    {
        id: 'combo1',
        name: 'Combo 1',
        description: 'Delicious burger, crispy fried chicken, and refreshing Pepsi.',
        price: 550000,
        image: combo1Img.src, // .frontend để lấy đường dẫn thực tế từ import
        category: 'hot-combo', // ID của category
    },
    {
        id: 'combo2',
        name: 'Combo 2',
        description: 'Golden fries, juicy fried chicken, and cool Pepsi.',
        price: 550000,
        image: combo2Img.src,
        category: 'hot-combo',
    },
    {
        id: 'combo3',
        name: 'Combo 3',
        description: 'Two tasty burgers, golden fries, and two Pepsis.',
        price: 550000,
        image: combo3Img.src,
        category: 'hot-combo',
    },
    {
        id: 'combo4',
        name: 'Combo 4',
        description: 'Two burgers, crispy fried chicken, and Pepsi.',
        price: 550000,
        image: combo4Img.src,
        category: 'hot-combo',
    },
    {
        id: 'combo5',
        name: 'Combo 5',
        description: 'Two burgers, golden fries, and two Pepsis.',
        price: 550000,
        image: combo5Img.src,
        category: 'hot-combo',
    },
    {
        id: 'single-burger',
        name: 'Classic Burger',
        description: 'Our signature beef burger.',
        price: 120000,
        image: beefBurgerImg.src,
        category: 'burger' // ID của category
    },
];
