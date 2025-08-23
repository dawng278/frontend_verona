"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
// import { createOrder } from "@/lib/api";

export default function CheckoutPage() {
    const { user } = useAuth();
    const { cartItems, totalAmount } = useCart(); // ✅ lấy từ CartContext
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleCheckout = async () => {
        try {
            setLoading(true);
            // Gọi API tạo order
            // const order = await createOrder(user?.id, cartItems, totalAmount);
            // setMessage(`✅ Đặt hàng thành công! Order ID: ${order._id}`);

            // Demo
            setMessage(`✅ Đặt hàng thành công! Tổng: ${totalAmount}k`);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error parsing cart from localStorage', error.message);
            } else {
                console.error('Unknown error', error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold">Trang Thanh Toán</h1>
            <p>Xin chào, {user?.name || "Khách"}!</p>
            <p>
                Giỏ hàng có {cartItems.length} sản phẩm, tổng: {totalAmount}k
            </p>
            <button
                onClick={handleCheckout}
                disabled={loading}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
                {loading ? "Đang xử lý..." : "Thanh toán"}
            </button>
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
}
