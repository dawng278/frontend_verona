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
//HOT COMBO IMAGES
import combo1Img from '@/assets/images/menu/hotCombo/combo1.png';
import combo2Img from '@/assets/images/menu/hotCombo/combo2.png';
import combo3Img from '@/assets/images/menu/hotCombo/combo3.png';
import combo4Img from '@/assets/images/menu/hotCombo/combo4.png';
import combo5Img from '@/assets/images/menu/hotCombo/combo5.png';
//FRIED CHICKEN IMAGES
import friedChicken1pcImg from '@/assets/images/menu/fried-chicken/1pc-fried-chicken.png';
import friedChicken2pcsImg from '@/assets/images/menu/fried-chicken/2pcs-fried-chicken.png';
import friedChicken4pcsImg from '@/assets/images/menu/fried-chicken/4pcs-fried-chicken.png';
import friedChicken6pcsImg from '@/assets/images/menu/fried-chicken/6pcs-fried-chicken.png';
import friedChicken8pcsImg from '@/assets/images/menu/fried-chicken/8pcs-fried-chicken.png';
//BURGER IMAGES
import beefBurgerImg from '@/assets/images/menu/burger/beef-burger.png';
import beefBurgerDrinkImg from '@/assets/images/menu/burger/beef-burger-and-drink.png';
import chickenBurgerImg from '@/assets/images/menu/burger/chicken-burger.png';
import chickenBurgerDrinkImg from '@/assets/images/menu/burger/chicken-burger-and-drink.png';
import doubleBeefBurgerImg from '@/assets/images/menu/burger/double-beef-burger.png';
import hotDogImg from '@/assets/images/menu/burger/hot-dog.png';
//SNACKS IMAGES
import bbqFriesImg from '@/assets/images/menu/snacks/bbq-fries.png';
import cheeseFriesImg from '@/assets/images/menu/snacks/cheese-fries.png';
import largeFriesImg from '@/assets/images/menu/snacks/large-fries.png';
import nuggetImg from '@/assets/images/menu/snacks/nugget.png';
import regularFriesImg from '@/assets/images/menu/snacks/regular-fries.png';
import saladImg from '@/assets/images/menu/snacks/salad.png';
//DESSERST IMAGES
import blueBerryCreamCupImg from '@/assets/images/menu/desserts/blueberry-cream-cup.png';
import cherryCreamCupImg from '@/assets/images/menu/desserts/cherry-cream-cup.png';
import chocolateCreamCupImg from '@/assets/images/menu/desserts/chocolate-cream-cup.png';
import chocolateCreamImg from '@/assets/images/menu/desserts/chocolate-cream.png';
import strawberryCreamCupImg from '@/assets/images/menu/desserts/strawberry-cream-cup.png';
import strawberryCreamImg from '@/assets/images/menu/desserts/strawberry-cream.png';
//DRINKS IMAGES
import sevenUpImg from '@/assets/images/menu/drinks/7up.png';
import cocaColaImg from '@/assets/images/menu/drinks/coca-cola.png';
import pepsiImg from '@/assets/images/menu/drinks/pepsi.png';
import honeyTeaCreamCheeseImg from '@/assets/images/menu/drinks/honey-tea-cream-cheese.png';
import milkTeaCreamCheeseImg from '@/assets/images/menu/drinks/milk-tea-cream-cheese.png';
import milkTeaMatchaCreamCheeseImg from '@/assets/images/menu/drinks/milk-tea-matcha-cream-cheese.png';
import strawberryMilkTeaCreamCheeseImg from '@/assets/images/menu/drinks/strawberry-milk-tea-cream-cheese.png';
// Import ảnh cho các sản phẩm/burger
// Đảm bảo các file ảnh này tồn tại trong thư mục frontend/assets/images/menu/burger/



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
    // 🔥 HOT COMBO
    {
        id: 'combo1',
        name: 'Combo 1',
        description: 'Burger bò, 1 miếng gà rán giòn và Pepsi mát lạnh.',
        price: 129000,
        image: combo1Img.src,
        category: 'hot-combo',
    },
    {
        id: 'combo2',
        name: 'Combo 2',
        description: 'Khoai tây chiên giòn, gà rán và Pepsi.',
        price: 119000,
        image: combo2Img.src,
        category: 'hot-combo',
    },
    {
        id: 'combo3',
        name: 'Combo 3',
        description: '2 burger bò, khoai tây chiên và 2 Pepsi.',
        price: 159000,
        image: combo3Img.src,
        category: 'hot-combo',
    },
    {
        id: 'combo4',
        name: 'Combo 4',
        description: '2 burger, gà rán giòn và Pepsi.',
        price: 149000,
        image: combo4Img.src,
        category: 'hot-combo',
    },
    {
        id: 'combo5',
        name: 'Combo 5',
        description: '2 burger, khoai tây chiên và 2 Pepsi.',
        price: 159000,
        image: combo5Img.src,
        category: 'hot-combo',
    },

    // 🍗 FRIED CHICKEN
    {
        id: 'friedChicken1pc',
        name: 'Gà rán 1 miếng',
        description: 'Gà rán giòn tan, thấm vị đậm đà.',
        price: 39000,
        image: friedChicken1pcImg.src,
        category: 'fried-chicken',
    },
    {
        id: 'friedChicken2pcs',
        name: 'Gà rán 2 miếng',
        description: '2 miếng gà rán giòn hấp dẫn, ăn kèm tuyệt vời.',
        price: 75000,
        image: friedChicken2pcsImg.src,
        category: 'fried-chicken',
    },
    {
        id: 'friedChicken4pcs',
        name: 'Gà rán 4 miếng',
        description: 'Phần 4 miếng gà rán giòn, đủ cho nhóm bạn.',
        price: 145000,
        image: friedChicken4pcsImg.src,
        category: 'fried-chicken',
    },
    {
        id: 'friedChicken6pcs',
        name: 'Gà rán 6 miếng',
        description: '6 miếng gà rán nóng hổi, giòn rụm.',
        price: 210000,
        image: friedChicken6pcsImg.src,
        category: 'fried-chicken',
    },
    {
        id: 'friedChicken8pcs',
        name: 'Gà rán 8 miếng',
        description: '8 miếng gà rán giòn tan, thích hợp cho gia đình.',
        price: 275000,
        image: friedChicken8pcsImg.src,
        category: 'fried-chicken',
    },

    // 🍔 BURGER
    {
        id: 'beefBurger',
        name: 'Burger bò',
        description: 'Burger bò nướng đậm đà, phô mai tan chảy.',
        price: 69000,
        image: beefBurgerImg.src,
        category: 'burger',
    },
    {
        id: 'beefBurgerDrink',
        name: 'Burger bò + nước ngọt',
        description: 'Burger bò ăn kèm Pepsi mát lạnh.',
        price: 89000,
        image: beefBurgerDrinkImg.src,
        category: 'burger',
    },
    {
        id: 'chickenBurger',
        name: 'Burger gà',
        description: 'Burger gà giòn rụm, sốt đặc trưng.',
        price: 65000,
        image: chickenBurgerImg.src,
        category: 'burger',
    },
    {
        id: 'chickenBurgerDrink',
        name: 'Burger gà + nước ngọt',
        description: 'Burger gà giòn ăn kèm Pepsi.',
        price: 85000,
        image: chickenBurgerDrinkImg.src,
        category: 'burger',
    },
    {
        id: 'doubleBeefBurger',
        name: 'Burger bò kép',
        description: '2 lớp thịt bò nướng, gấp đôi hương vị.',
        price: 99000,
        image: doubleBeefBurgerImg.src,
        category: 'burger',
    },
    {
        id: 'hotDog',
        name: 'Hotdog',
        description: 'Xúc xích nướng kẹp bánh mì, thêm sốt đậm đà.',
        price: 55000,
        image: hotDogImg.src,
        category: 'burger',
    },

    // 🍟 SNACKS
    {
        id: 'bbqFries',
        name: 'Khoai tây lắc BBQ',
        description: 'Khoai tây chiên giòn, phủ bột gia vị BBQ.',
        price: 45000,
        image: bbqFriesImg.src,
        category: 'snacks',
    },
    {
        id: 'cheeseFries',
        name: 'Khoai tây phô mai',
        description: 'Khoai tây chiên phủ sốt phô mai béo ngậy.',
        price: 49000,
        image: cheeseFriesImg.src,
        category: 'snacks',
    },
    {
        id: 'largeFries',
        name: 'Khoai tây chiên (Lớn)',
        description: 'Phần khoai tây chiên lớn, giòn thơm.',
        price: 39000,
        image: largeFriesImg.src,
        category: 'snacks',
    },
    {
        id: 'nugget',
        name: 'Gà nugget',
        description: 'Miếng gà nugget giòn rụm, ăn chơi cực đã.',
        price: 45000,
        image: nuggetImg.src,
        category: 'snacks',
    },
    {
        id: 'regularFries',
        name: 'Khoai tây chiên (Vừa)',
        description: 'Khoai tây chiên vừa ăn, nóng giòn.',
        price: 29000,
        image: regularFriesImg.src,
        category: 'snacks',
    },
    {
        id: 'salad',
        name: 'Salad rau trộn',
        description: 'Rau tươi mát, sốt mè rang thơm ngon.',
        price: 35000,
        image: saladImg.src,
        category: 'snacks',
    },

    // 🍰 DESSERTS
    {
        id: 'blueberryCreamCup',
        name: 'Kem việt quất',
        description: 'Kem mát lạnh, topping việt quất thơm ngọt.',
        price: 39000,
        image: blueBerryCreamCupImg.src,
        category: 'desserts',
    },
    {
        id: 'cherryCreamCup',
        name: 'Kem anh đào',
        description: 'Kem hương anh đào chua ngọt hấp dẫn.',
        price: 39000,
        image: cherryCreamCupImg.src,
        category: 'desserts',
    },
    {
        id: 'chocolateCreamCup',
        name: 'Kem socola cốc',
        description: 'Kem socola béo ngậy trong cốc tiện lợi.',
        price: 42000,
        image: chocolateCreamCupImg.src,
        category: 'desserts',
    },
    {
        id: 'chocolateCream',
        name: 'Kem socola que',
        description: 'Kem socola mát lạnh, ngon tuyệt.',
        price: 35000,
        image: chocolateCreamImg.src,
        category: 'desserts',
    },
    {
        id: 'strawberryCreamCup',
        name: 'Kem dâu cốc',
        description: 'Kem dâu tây tươi mát trong cốc.',
        price: 39000,
        image: strawberryCreamCupImg.src,
        category: 'desserts',
    },
    {
        id: 'strawberryCream',
        name: 'Kem dâu que',
        description: 'Kem dâu tây thơm ngon, giải nhiệt tức thì.',
        price: 35000,
        image: strawberryCreamImg.src,
        category: 'desserts',
    },

    // 🥤 DRINKS
    {
        id: 'sevenUp',
        name: '7Up',
        description: 'Nước ngọt có gas vị chanh tươi mát.',
        price: 19000,
        image: sevenUpImg.src,
        category: 'drinks',
    },
    {
        id: 'cocaCola',
        name: 'Coca Cola',
        description: 'Nước ngọt có gas, vị nguyên bản.',
        price: 19000,
        image: cocaColaImg.src,
        category: 'drinks',
    },
    {
        id: 'pepsi',
        name: 'Pepsi',
        description: 'Nước ngọt có gas, vị sảng khoái.',
        price: 19000,
        image: pepsiImg.src,
        category: 'drinks',
    },
    {
        id: 'honeyTeaCreamCheese',
        name: 'Trà mật ong kem cheese',
        description: 'Trà mật ong ngọt dịu, phủ kem cheese béo ngậy.',
        price: 45000,
        image: honeyTeaCreamCheeseImg.src,
        category: 'drinks',
    },
    {
        id: 'milkTeaCreamCheese',
        name: 'Trà sữa kem cheese',
        description: 'Trà sữa đậm vị, phủ kem cheese mặn ngọt.',
        price: 45000,
        image: milkTeaCreamCheeseImg.src,
        category: 'drinks',
    },
    {
        id: 'milkTeaMatchaCreamCheese',
        name: 'Trà sữa matcha kem cheese',
        description: 'Vị matcha thanh mát, phủ lớp kem cheese.',
        price: 49000,
        image: milkTeaMatchaCreamCheeseImg.src,
        category: 'drinks',
    },
    {
        id: 'strawberryMilkTeaCreamCheese',
        name: 'Trà sữa dâu kem cheese',
        description: 'Trà sữa dâu ngọt ngào, thêm lớp kem cheese.',
        price: 49000,
        image: strawberryMilkTeaCreamCheeseImg.src,
        category: 'drinks',
    },
];

