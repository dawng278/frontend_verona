'use client';

import { useCart } from '@/contexts/CartContext';

export default function CartOverlay() {
    const { cartItems, isCartOpen, toggleCart, removeFromCart, totalAmount } = useCart();

    if (!isCartOpen) return null; // ⬅️ Không mở thì không hiển thị gì cả

    return (
        <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-4 z-50">
            <button
                className="absolute top-2 right-2 text-gray-600"
                onClick={toggleCart}
            >
                ✕
            </button>
            <h2 className="text-lg font-bold mb-4">Giỏ hàng</h2>

            {cartItems.length === 0 ? (
                <p>Giỏ hàng trống</p>
            ) : (
                <ul className="space-y-2">
                    {cartItems.map((item) => (
                        <li key={item.id} className="flex justify-between">
                            <span>{item.name} x {item.quantity}</span>
                            <span>{item.price * item.quantity}₫</span>
                            <button onClick={() => removeFromCart(item.id)}>🗑</button>
                        </li>
                    ))}
                </ul>
            )}

            <div className="mt-4 border-t pt-2">
                <p className="font-bold">Tổng: {totalAmount}₫</p>
            </div>
        </div>
    );
}
