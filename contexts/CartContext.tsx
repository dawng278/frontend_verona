'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image?: string;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    totalQuantity: number;
    totalAmount: number;
    isCartOpen: boolean;
    toggleCart: () => void;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    loading: boolean;
}

export const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const toggleCart = () => {
        setIsCartOpen((prev) => !prev);
    };

    const addToCart = (item: CartItem) => {
        setLoading(true);
        setCartItems((prev) => {
            const existing = prev.find((p) => p.id === item.id);
            if (existing) {
                return prev.map((p) =>
                    p.id === item.id ? { ...p, quantity: p.quantity + item.quantity } : p
                );
            }
            return [...prev, item];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (id: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalAmount = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                totalQuantity,
                totalAmount,
                isCartOpen,
                toggleCart,
                addToCart,
                removeFromCart,
                clearCart,
                loading,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
