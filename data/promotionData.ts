//PROMOTIONS IMAGES
import promo1 from '@/assets/images/promotions/buy-1-get-1.png'
import promo2 from '@/assets/images/promotions/free-delivery.jpg'

// frontend/data/promotionData.ts
export interface Promotion {
    id: string;
    title: string;
    description: string;
    image: string;
}

export const promotions: Promotion[] = [
    {
        id: '1',
        title: 'Mua 1 Tặng 1',
        description: 'Gọi bất kỳ burger nào và nhận thêm một cái miễn phí!',
        image: promo1.src,
    },
    {
        id: '2',
        title: 'Miễn Phí Giao Hàng',
        description: 'Tận hưởng miễn phí giao hàng cho mọi đơn hàng từ 20$ trở lên!',
        image: promo2.src,
    },
];
