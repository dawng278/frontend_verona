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
        title: 'Buy 1 Get 1 Free',
        description: 'Order any burger and get another one for free!',
        image: promo1.src,
    },
    {
        id: '2',
        title: 'Free Delivery',
        description: 'Enjoy free delivery for all orders over $20!',
        image: promo2.src,
    },
];
