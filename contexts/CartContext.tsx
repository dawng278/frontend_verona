'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext'; // import AuthContext để lấy user

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
    loading: boolean;
    isCartOpen: boolean;
    totalQuantity: number;
    toggleCart: () => void;
    totalAmount: number;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth(); // lấy user hiện tại
    const userId = user?.id || 'guest'; // nếu chưa login, dùng key guest

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load giỏ hàng khi user thay đổi
    useEffect(() => {
        setLoading(true);
        try {
            const storedCart = localStorage.getItem(`cart_${userId}`);
            if (storedCart) {
                const parsedCart = JSON.parse(storedCart);
                if (Array.isArray(parsedCart)) {
                    setCartItems(parsedCart);
                } else {
                    setCartItems([]);
                }
            } else {
                setCartItems([]);
            }
        } catch (error) {
            console.error('Error parsing cart from localStorage', error);
            setCartItems([]);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    // Lưu giỏ hàng khi cartItems thay đổi
    useEffect(() => {
        localStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems));
    }, [cartItems, userId]);

    const addToCart = (item: CartItem) => {
        setCartItems(prev => {
            const existingItem = prev.find(i => i.id === item.id);
            if (existingItem) {
                return prev.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                );
            }
            return [...prev, item];
        });
    };

    const removeFromCart = (id: string) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const toggleCart = () => setIsCartOpen(prev => !prev);

    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const increaseQuantity = (id: string) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (id: string) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                getTotalPrice,
                loading,
                isCartOpen,
                toggleCart,
                totalAmount: getTotalPrice(),
                totalQuantity,
                increaseQuantity,
                decreaseQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
