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
        image: '/images/promo1.jpg',
    },
    {
        id: '2',
        title: 'Free Delivery',
        description: 'Enjoy free delivery for all orders over $20!',
        image: '/images/promo2.jpg',
    },
];
