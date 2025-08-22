'use client';

import { useCart } from '@/contexts/CartContext';

export default function CartOverlay() {
    const { cartItems, isCartOpen, toggleCart, removeFromCart, totalAmount, increaseQuantity, decreaseQuantity } = useCart();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Overlay nền mờ */}
            <div
                className="absolute inset-0 bg-black bg-opacity-40"
                onClick={toggleCart}
            />

            {/* Giỏ hàng */}
            <div className="relative h-full w-96 bg-[#F4EDD4] shadow-2xl p-4 flex flex-col">
                {/* Nút đóng */}
                <button
                    className="absolute top-3 right-3 text-gray-700 text-2xl hover:text-red-600"
                    onClick={toggleCart}
                >
                    &times;
                </button>

                <h2 className="text-xl font-bold mb-4 text-[#B61E01]">Giỏ hàng</h2>

                {/* Nội dung giỏ hàng */}
                <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                    {cartItems.length === 0 ? (
                        <p className="text-gray-600 text-center mt-10">Giỏ hàng trống</p>
                    ) : (
                        cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center bg-white rounded-lg shadow-sm p-3"
                            >
                                {/* Ảnh sản phẩm */}
                                {item.image && (
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 rounded object-cover mr-3"
                                    />
                                )}

                                {/* Thông tin sản phẩm */}
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800">{item.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {item.price}₫
                                    </p>

                                    {/* Nút tăng giảm số lượng */}
                                    <div className="flex items-center space-x-2 mt-1">
                                        <button
                                            onClick={() => decreaseQuantity(item.id)}
                                            className="w-6 h-6 flex items-center justify-center border rounded text-gray-700 hover:bg-gray-100"
                                        >
                                            -
                                        </button>
                                        <span className="px-2">{item.quantity}</span>
                                        <button
                                            onClick={() => increaseQuantity(item.id)}
                                            className="w-6 h-6 flex items-center justify-center border rounded text-gray-700 hover:bg-gray-100"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Giá + nút xóa */}
                                <div className="flex flex-col items-end">
                                    <span className="font-semibold text-gray-900">
                                        {item.price * item.quantity}₫
                                    </span>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 hover:bg-red-100 rounded-full p-1 mt-2"
                                    >
                                        🗑
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Tổng tiền */}
                <div className="border-t pt-3 mt-4">
                    <p className="text-lg font-bold text-gray-800">
                        Tổng: <span className="text-[#B61E01]">{totalAmount}₫</span>
                    </p>
                    <button className="w-full mt-3 bg-[#FFA301] text-white py-2 rounded-xl font-semibold hover:bg-red-700 transition">
                        Thanh toán
                    </button>
                </div>
            </div>
        </div>
    );
}
