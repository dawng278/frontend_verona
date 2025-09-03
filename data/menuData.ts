// frontend/data/menuData.ts

// Import ảnh cho categories
// Đảm bảo các file ảnh này tồn tại trong thư mục frontend/assets/images/categories/
import seafoodIcon from '@/assets/images/categories/seafood.png';
import beefIcon from '@/assets/images/categories/beef.png';
import chickenIcon from '@/assets/images/categories/chicken.png';
import porkIcon from '@/assets/images/categories/pork.png';
import vegetarianIcon from '@/assets/images/categories/vegerarian.png';
import drinksIcon from '@/assets/images/categories/drinks.png';

// Import ảnh cho các sản phẩm/combo
// Đảm bảo các file ảnh này tồn tại trong thư mục frontend/assets/images/menu/hotCombo/
//SEAFOOD IMAGES
import oceanMania from '@/assets/images/menu/pizza/Ocean-Mania.png';
import pizzaminSea from '@/assets/images/menu/pizza/Pizzamin-Sea.png';
import seafoodDelight from '@/assets/images/menu/pizza/Seafood-Delight.png';
import seafoodLimePesto from '@/assets/images/menu/pizza/Seafood-Lime-Pesto.png';
import cheesyCrabStickPineapple from '@/assets/images/menu/pizza/Cheesy-Crab-Stick-&-Pineapple.png';
import superToppingOceanMania from '@/assets/images/menu/pizza/Super-Topping-Ocean-Mania.png';
import superToppingPizzaminSea from '@/assets/images/menu/pizza/Super-Topping-Pizzamin-Sea.png';
import superToppingSeafoodLimePesto from '@/assets/images/menu/pizza/Super-Topping-Seafood-Lime-Pesto.png';
//BEEF IMAGES
import baconCheeseburger from '@/assets/images/menu/pizza/Bacon-Cheeseburger.png';
import cheeseVolcanoCheeseburger from '@/assets/images/menu/pizza/Cheese-Volcano-Cheeseburger.png';
import superToppingBaconCheeseburger from '@/assets/images/menu/pizza/Super-Topping-Bacon-Cheeseburger.png';
import meatLovers from '@/assets/images/menu/pizza/Meat-Lovers.png';
//CHICKEN IMAGES
import cheesyChickenBacon from '@/assets/images/menu/pizza/Cheesy-Chicken-Bacon.png';
//PORK IMAGES
import pepperoniFeast from '@/assets/images/menu/pizza/Pepperoni-Feast.png';
import cheeseVolcanoPepperoni from '@/assets/images/menu/pizza/Cheese-Volcano-Pepperoni.png';
import superToppingPepperoni from '@/assets/images/menu/pizza/Super-Topping-Pepperoni.png';
import sausageKidMania from '@/assets/images/menu/pizza/Sausage-Kid-Mania.png';
//VEGETARIAN IMAGES
import cheeseMania from '@/assets/images/menu/pizza/Cheese-Mania.png';
import cheesyMadness from '@/assets/images/menu/pizza/Cheesy-Madness.png';
import extravaganza from '@/assets/images/menu/pizza/Extravaganza.png';
import veggieMania from '@/assets/images/menu/pizza/Veggie-Mania.png';
import cheeseVolcanoExtravaganza from '@/assets/images/menu/pizza/Cheese-Volcano-Extravaganza.png';
//DRINKS IMAGES
import cocaCola from '@/assets/images/menu/drinks/Coca-Cola.png';
import cocaColaLarge from '@/assets/images/menu/drinks/Coca-Cola-Large.png';
import cocaColaZero from '@/assets/images/menu/drinks/Coca-Cola-Zero.png';
import cocaColaZeroLarge from '@/assets/images/menu/drinks/Coca-Cola-Zero-Large.png';
import dasani from '@/assets/images/menu/drinks/Dasani.png';
import dasaniLarge from '@/assets/images/menu/drinks/Dasani-Large.png';
import mirinda from '@/assets/images/menu/drinks/Mirinda.png';
import mirindaLarge from '@/assets/images/menu/drinks/Mirinda-Large.png';
import sprite from '@/assets/images/menu/drinks/Sprite.png';
import spriteLarge from '@/assets/images/menu/drinks/Sprite-Large.png';
import teaplusOolongLemon from '@/assets/images/menu/drinks/Teaplus-Oolong-Lemon.png';
import teaplusOolongPeach from '@/assets/images/menu/drinks/Teaplus-Oolong-Peach.png';

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
    { id: 'seafood', name: 'Hải Sản', icon: seafoodIcon.src }, // .frontend để lấy đường dẫn thực tế từ import
    { id: 'beef', name: 'Thịt', icon: beefIcon.src },
    { id: 'chicken', name: 'Gà', icon: chickenIcon.src },
    { id: 'pork', name: 'Thịt Xông Khói', icon: porkIcon.src },
    { id: 'vegetarian', name: 'Chay', icon: vegetarianIcon.src },
    { id: 'drinks', name: 'Đồ Uống', icon: drinksIcon.src },
];

export const menuItems: MenuItem[] = [
    {
        id: 'oceanmania',
        name: 'Ocean Mania',
        description: 'Pizza hải sản sốt Mayonnaise đặc trưng, với tôm, mực, thanh cua và hành tây.',
        price: 205000,
        image: oceanMania.src,
        category: 'seafood',
    },
    {
        id: 'pizzaminsea',
        name: 'Pizzamin Sea',
        description: 'Hải sản nướng trên nền sốt tiêu đen, phủ dứa và hành tây, hòa quyện với phô mai Mozzarella và Cheddar.',
        price: 235000,
        image: pizzaminSea.src,
        category: 'seafood',
    },
    {
        id: 'seafooddelight',
        name: 'Seafood Delight',
        description: 'Pizza hải sản truyền thống với sốt cà chua, tôm, mực, thanh cua và hành tây.',
        price: 205000,
        image: seafoodDelight.src,
        category: 'seafood',
    },
    {
        id: 'seafoodlimepesto',
        name: 'Seafood Lime Pesto',
        description: 'Hải sản tươi trên nền sốt Pesto chanh thơm lừng, mang đến hương vị Địa Trung Hải.',
        price: 205000,
        image: seafoodLimePesto.src,
        category: 'seafood',
    },
    {
        id: 'cheesycrabstickandpineapple',
        name: 'Cheesy Crab Stick & Pineapple',
        description: 'Thanh cua mềm, dứa chua ngọt và phô mai béo ngậy tạo nên hương vị độc đáo.',
        price: 175000,
        image: cheesyCrabStickPineapple.src,
        category: 'seafood',
    },
    {
        id: 'supertoppingoceanmania',
        name: 'Super Topping Ocean Mania',
        description: 'Gấp đôi topping tôm, mực và thanh cua trên nền sốt Mayonnaise, bùng nổ hương vị hải sản.',
        price: 235000,
        image: superToppingOceanMania.src,
        category: 'seafood',
    },
    {
        id: 'supertoppingpizzaminsea',
        name: 'Super Topping Pizzamin Sea',
        description: 'Phiên bản tăng cường của Pizzamin Sea với nhiều hải sản hơn, ăn kèm dứa và sốt tiêu đen.',
        price: 235000,
        image: superToppingPizzaminSea.src,
        category: 'seafood',
    },
    {
        id: 'supertoppingseafoodlimepesto',
        name: 'Super Topping Seafood Lime Pesto',
        description: 'Thưởng thức gấp đôi hải sản trên nền sốt Pesto chanh thơm, thêm đậm đà và hấp dẫn.',
        price: 242000,
        image: superToppingSeafoodLimePesto.src,
        category: 'seafood',
    },

    // --- BEEF PIZZAS
    {
        id: 'baconcheeseburger',
        name: 'Bacon Cheeseburger',
        description: 'Lấy cảm hứng từ burger bò, pizza này có thịt bò nướng, thịt xông khói, sốt phô mai và rau củ.',
        price: 235000,
        image: baconCheeseburger.src,
        category: 'beef',
    },
    {
        id: 'cheesevolcanocheeseburger',
        name: 'Cheese Volcano Cheeseburger',
        description: 'Pizza núi lửa phô mai với nhân bơ gơ bò Mỹ, sốt phô mai American, thịt xông khói, hành tây và nấm.',
        price: 305000,
        image: cheeseVolcanoCheeseburger.src,
        category: 'beef',
    },
    {
        id: 'supertoppingbaconcheeseburger',
        name: 'Super Topping Bacon Cheeseburger',
        description: 'Phiên bản đặc biệt với gấp đôi thịt bò và thịt xông khói, phô mai và sốt mayonnaise.',
        price: 235000,
        image: superToppingBaconCheeseburger.src,
        category: 'beef',
    },
    {
        id: 'meatlovers',
        name: 'Meat Lovers',
        description: 'Dành cho tín đồ thịt: pepperoni, xúc xích Ý, thịt nguội, thịt heo xông khói, thịt bò và thịt heo.',
        price: 205000,
        image: meatLovers.src,
        category: 'beef',
    },

    // --- CHICKEN PIZZAS
    {
        id: 'cheesychickenbacon',
        name: 'Cheesy Chicken Bacon',
        description: 'Sự kết hợp hoàn hảo của gà nướng, thịt xông khói và sốt Ranch kem béo ngậy.',
        price: 175000,
        image: cheesyChickenBacon.src,
        category: 'chicken',
    },

    // --- PORK PIZZAS
    {
        id: 'pepperonifeast',
        name: 'Pepperoni Feast',
        description: 'Vị pizza truyền thống với sốt cà chua, phô mai Mozzarella và những lát pepperoni cay nhẹ.',
        price: 205000,
        image: pepperoniFeast.src,
        category: 'pork',
    },
    {
        id: 'cheesevolcanopepperoni',
        name: 'Cheese Volcano Pepperoni',
        description: 'Vòng phô mai núi lửa béo ngậy bao quanh pizza pepperoni cổ điển, mang lại trải nghiệm độc đáo.',
        price: 305000,
        image: cheeseVolcanoPepperoni.src,
        category: 'pork',
    },
    {
        id: 'supertoppingpepperoni',
        name: 'Super Topping Pepperoni',
        description: 'Gấp đôi số lượng pepperoni, sốt cà chua và phô mai, đậm đà hơn bao giờ hết.',
        price: 235000,
        image: superToppingPepperoni.src,
        category: 'pork',
    },
    {
        id: 'sausagekidmania',
        name: 'Sausage Kid Mania',
        description: 'Pizza với xúc xích, thịt xông khói, bắp và dứa, kết hợp với hai lớp phô mai béo ngậy.',
        price: 175000,
        image: sausageKidMania.src,
        category: 'pork',
    },

    // --- VEGETARIAN PIZZAS
    {
        id: 'cheesemania',
        name: 'Cheese Mania',
        description: 'Đơn giản và ngon miệng với hai lớp phô mai Mozzarella béo ngậy trên sốt cà chua truyền thống.',
        price: 155000,
        image: cheeseMania.src,
        category: 'vegetarian',
    },
    {
        id: 'cheesymadness',
        name: 'Cheesy Madness',
        description: 'Dành cho người yêu phô mai với sự kết hợp của Cheddar, Mozzarella và Blue Cheese, kèm sốt phô mai đặc biệt.',
        price: 175000,
        image: cheesyMadness.src,
        category: 'vegetarian',
    },
    {
        id: 'extravaganza',
        name: 'Extravaganza',
        description: 'Pizza thập cẩm chay, với nhiều loại rau củ như nấm, hành tây, ớt chuông và ô liu đen.',
        price: 205000,
        image: extravaganza.src,
        category: 'vegetarian',
    },
    {
        id: 'veggiemania',
        name: 'Veggie Mania',
        description: 'Đa dạng các loại rau củ tươi ngon, bao gồm cà chua, hành tây, nấm và ớt chuông.',
        price: 155000,
        image: veggieMania.src,
        category: 'vegetarian',
    },
    {
        id: 'cheesevolcanoextravaganza',
        name: 'Cheese Volcano Extravaganza',
        description: 'Pizza núi lửa phô mai với hỗn hợp thập cẩm của rau củ tươi, đậm đà và ngon miệng.',
        price: 305000,
        image: cheeseVolcanoExtravaganza.src,
        category: 'vegetarian',
    },

    // --- DRINKS
    {
        id: 'cocacola',
        name: 'Coca Cola',
        description: 'Thức uống có gas phổ biến trên toàn thế giới, mang lại cảm giác sảng khoái.',
        price: 19000,
        image: cocaCola.src,
        category: 'drinks',
    },
    {
        id: 'cocacolalarge',
        name: 'Coca Cola (chai lớn)',
        description: 'Chai Coca Cola dung tích lớn, phù hợp cho nhóm bạn.',
        price: 305000,
        image: cocaColaLarge.src,
        category: 'drinks',
    },
    {
        id: 'cocacolazero',
        name: 'Coca Cola Zero',
        description: 'Thức uống không đường, không calo, giữ nguyên hương vị Coca-Cola nguyên bản.',
        price: 19000,
        image: cocaColaZero.src,
        category: 'drinks',
    },
    {
        id: 'cocacolazerolarge',
        name: 'Coca Cola Zero (chai lớn)',
        description: 'Chai Coca Cola Zero dung tích lớn, sảng khoái không lo calo.',
        price: 305000,
        image: cocaColaZeroLarge.src,
        category: 'drinks',
    },
    {
        id: 'dasani',
        name: 'Dasani',
        description: 'Nước tinh khiết Dasani được bổ sung khoáng chất, giúp thanh lọc cơ thể.',
        price: 19000,
        image: dasani.src,
        category: 'drinks',
    },
    {
        id: 'dasanilarge',
        name: 'Dasani (chai lớn)',
        description: 'Chai nước tinh khiết Dasani dung tích lớn, giải khát hiệu quả.',
        price: 305000,
        image: dasaniLarge.src,
        category: 'drinks',
    },
    {
        id: 'mirinda',
        name: 'Mirinda',
        description: 'Nước ngọt có gas hương cam thơm mát, sảng khoái tức thì.',
        price: 19000,
        image: mirinda.src,
        category: 'drinks',
    },
    {
        id: 'mirindalarge',
        name: 'Mirinda (chai lớn)',
        description: 'Chai nước Mirinda dung tích lớn, phù hợp cho bữa ăn gia đình.',
        price: 305000,
        image: mirindaLarge.src,
        category: 'drinks',
    },
    {
        id: 'sprite',
        name: 'Sprite',
        description: 'Nước ngọt có gas vị chanh tự nhiên, sảng khoái bất tận.',
        price: 19000,
        image: sprite.src,
        category: 'drinks',
    },
    {
        id: 'spritelarge',
        name: 'Sprite (chai lớn)',
        description: 'Chai Sprite dung tích lớn, giải khát cực đã cho nhóm bạn.',
        price: 305000,
        image: spriteLarge.src,
        category: 'drinks',
    },
    {
        id: 'teaplusoolonglemon',
        name: 'Trà Teaplus Oolong Chanh',
        description: 'Trà Ô Long kết hợp vị chanh tươi mát, mang đến sự tỉnh táo.',
        price: 19000,
        image: teaplusOolongLemon.src,
        category: 'drinks',
    },
    {
        id: 'teaplusoolongpeach',
        name: 'Trà Teaplus Oolong Đào',
        description: 'Trà Ô Long vị đào ngọt dịu, thanh mát và nhẹ nhàng.',
        price: 19000,
        image: teaplusOolongPeach.src,
        category: 'drinks',
    },
];

