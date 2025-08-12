'use client';

import React from 'react';
import { useCart } from '@/contexts/CartContext';

const CartOverlay = () => {
    const { isCartOpen, toggleCart, cartItems, totalAmount, removeFromCart } = useCart();

    if (!isCartOpen) return null;

    return (
        <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Your Cart</h2>
                <button onClick={toggleCart} className="text-gray-500 hover:text-black">&times;</button>
            </div>

            {cartItems.length === 0 ? (
                <p className="text-center text-gray-500">Cart is empty</p>
            ) : (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id} className="mb-4 flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                            </div>
                            <div>
                                <p>${(item.price * item.quantity).toFixed(2)}</p>
                                <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-600">Remove</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <div className="mt-4 border-t pt-2 font-semibold">
                Total: ${totalAmount.toFixed(2)}
            </div>
        </div>
    );
};

export default CartOverlay;
