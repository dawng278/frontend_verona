"use client";
import { useEffect, useState } from "react";
import { Order, OrderStatus } from "@/types/order";

interface ApiResponse {
    success: boolean;
    orders?: Order[];
    message?: string;
}

export default function OrderHistory({ userId }: { userId: string }) {
    const [orders, setOrders] = useState<Order[]>([]);

    const fetchOrders = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/orders/user/${userId}`
        );
        const data: ApiResponse = await res.json();
        if (data.success && data.orders) setOrders(data.orders);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleCancel = async (id: string) => {
        if (!confirm("Bạn có chắc muốn hủy đơn hàng này?")) return;

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}/cancel`,
            { method: "PATCH" }
        );

        const data: ApiResponse = await res.json();
        if (data.success) {
            alert("Đơn hàng đã được hủy!");
            fetchOrders();
        } else {
            alert(data.message || "Hủy đơn thất bại.");
        }
    };

    const renderStatus = (status: OrderStatus) => {
        switch (status) {
            case "pending":
                return <span className="text-yellow-600 font-semibold">Chờ xử lý</span>;
            case "paid":
                return <span className="text-blue-600 font-semibold">Đã thanh toán</span>;
            case "shipped":
                return <span className="text-purple-600 font-semibold">Đang giao</span>;
            case "completed":
                return <span className="text-green-600 font-semibold">Hoàn tất</span>;
            case "cancelled":
                return <span className="text-red-600 font-semibold">Đã hủy</span>;
            case "failed":
                return <span className="text-gray-600 font-semibold">Thất bại</span>;
            case "refunded":
                return <span className="text-indigo-600 font-semibold">Hoàn tiền</span>;
            default:
                return <span>{status}</span>;
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-xl font-bold mb-4">Lịch sử đơn hàng</h2>
            {orders.map((order) => (
                <div key={order._id} className="p-4 border rounded mb-3">
                    <p><b>Mã đơn:</b> {order._id}</p>
                    <p><b>Ngày:</b> {new Date(order.createdAt).toLocaleString()}</p>
                    <p><b>Tổng tiền:</b> {order.totalAmount.toLocaleString()} đ</p>
                    <p><b>Trạng thái:</b> {renderStatus(order.status)}</p>

                    {["pending", "paid"].includes(order.status) && (
                        <button
                            onClick={() => handleCancel(order._id)}
                            className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
                        >
                            Hủy đơn
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}
