'use client';

import { useState, useEffect, useRef } from "react";
import { X, Package, Calendar, CreditCard, Truck, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import Image from "next/image";
export type OrderStatus =
    | "pending"     // chờ xử lý
    | "paid"        // đã thanh toán
    | "cancelled"   // đã hủy
    | "shipped"     // đã giao hàng
    | "completed"   // hoàn tất
    | "failed"      // thất bại
    | "refunded";   // hoàn tiền

export interface OrderItem {
    productId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

export interface Order {
    _id: string;
    userId: string;
    items: OrderItem[];
    totalAmount: number;
    address: string;
    phone: string;
    paymentMethod: string;
    status: OrderStatus;
    createdAt: string;
}

interface ApiResponse {
    success: boolean;
    orders?: Order[];
    message?: string;
}

interface OrderHistoryOverlayProps {
    onClose: () => void;
    userId: string;
}

const OrderHistoryOverlay = ({ onClose, userId }: OrderHistoryOverlayProps) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEscapeKey);
        return () => document.removeEventListener("keydown", handleEscapeKey);
    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/user/${userId}`
            );

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data: ApiResponse = await res.json();
            if (data.success && data.orders) {
                setOrders(data.orders);
            } else {
                setError(data.message || "Không thể tải lịch sử đơn hàng");
            }
        } catch (err) {
            setError("Lỗi kết nối. Vui lòng thử lại sau.");
            console.error("Error fetching orders:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchOrders();
        }
    }, [userId]);

    const handleCancel = async (orderId: string) => {
        if (!confirm("Bạn có chắc muốn hủy đơn hàng này?")) return;

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}/cancel`,
                { method: "PATCH" }
            );

            const data: ApiResponse = await res.json();
            if (data.success) {
                alert("Đơn hàng đã được hủy!");
                fetchOrders();
            } else {
                alert(data.message || "Hủy đơn thất bại.");
            }
        } catch (err) {
            alert("Lỗi kết nối. Vui lòng thử lại.");
            console.error("Error canceling order:", err);
        }
    };

    const getStatusIcon = (status: OrderStatus) => {
        switch (status) {
            case "pending":
                return <AlertCircle className="text-yellow-600" size={16} />;
            case "paid":
                return <CreditCard className="text-blue-600" size={16} />;
            case "shipped":
                return <Truck className="text-purple-600" size={16} />;
            case "completed":
                return <CheckCircle className="text-green-600" size={16} />;
            case "cancelled":
            case "failed":
                return <XCircle className="text-red-600" size={16} />;
            case "refunded":
                return <Package className="text-indigo-600" size={16} />;
            default:
                return <Package className="text-gray-600" size={16} />;
        }
    };

    const getStatusText = (status: OrderStatus) => {
        switch (status) {
            case "pending":
                return "Chờ xử lý";
            case "paid":
                return "Đã thanh toán";
            case "shipped":
                return "Đang giao";
            case "completed":
                return "Hoàn tất";
            case "cancelled":
                return "Đã hủy";
            case "failed":
                return "Thất bại";
            case "refunded":
                return "Hoàn tiền";
            default:
                return status;
        }
    };

    const getStatusColor = (status: OrderStatus) => {
        switch (status) {
            case "pending":
                return "text-yellow-600 bg-yellow-50";
            case "paid":
                return "text-blue-600 bg-blue-50";
            case "shipped":
                return "text-purple-600 bg-purple-50";
            case "completed":
                return "text-green-600 bg-green-50";
            case "cancelled":
            case "failed":
                return "text-red-600 bg-red-50";
            case "refunded":
                return "text-indigo-600 bg-indigo-50";
            default:
                return "text-gray-600 bg-gray-50";
        }
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatCurrency = (amount: number) => {
        return amount.toLocaleString('vi-VN') + ' đ';
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={handleBackdropClick} />
            <div
                ref={overlayRef}
                className="relative w-full max-w-4xl max-h-[90vh] bg-white shadow-2xl rounded-lg border border-gray-200 overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
                    <h2 className="text-2xl font-bold text-[#5C3A21] flex items-center gap-2">
                        <Package size={24} />
                        Lịch sử đơn hàng
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Đóng"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFA500]"></div>
                            <span className="ml-3 text-gray-600">Đang tải...</span>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <XCircle className="text-red-500 mb-3" size={48} />
                            <p className="text-red-600 text-center">{error}</p>
                            <button
                                onClick={fetchOrders}
                                className="mt-4 px-4 py-2 bg-[#FFA500] text-white rounded-lg hover:bg-orange-600 transition-colors"
                            >
                                Thử lại
                            </button>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <Package className="text-gray-400 mb-3" size={48} />
                            <p className="text-gray-600 text-center">Bạn chưa có đơn hàng nào</p>
                        </div>
                    ) : (
                        <div className="p-6 space-y-4">
                            {orders.map((order) => (
                                <div key={order._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    {/* Order Header */}
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-800">
                                                Đơn hàng #{order._id.slice(-8).toUpperCase()}
                                            </p>
                                            <div className="flex items-center text-sm text-gray-600 mt-1">
                                                <Calendar size={14} className="mr-1" />
                                                {formatDate(order.createdAt)}
                                            </div>
                                        </div>
                                        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            {getStatusText(order.status)}
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    {order.items && order.items.length > 0 && (
                                        <div className="mb-3">
                                            <h4 className="font-medium text-gray-700 mb-2">Sản phẩm:</h4>
                                            <div className="space-y-2">
                                                {order.items.map((item, index) => (
                                                    <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                                                        {item.image && (
                                                            <Image
                                                                src={item.image}
                                                                alt={item.name}
                                                                className="w-12 h-12 object-cover rounded"
                                                            />
                                                        )}
                                                        <div className="flex-1">
                                                            <p className="font-medium text-sm">{item.name}</p>
                                                            <p className="text-xs text-gray-600">
                                                                {formatCurrency(item.price)} × {item.quantity}
                                                            </p>
                                                        </div>
                                                        <p className="font-medium text-sm">
                                                            {formatCurrency(item.price * item.quantity)}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Order Details */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-600">Địa chỉ giao hàng:</p>
                                            <p className="font-medium">{order.address}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Số điện thoại:</p>
                                            <p className="font-medium">{order.phone}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Phương thức thanh toán:</p>
                                            <p className="font-medium">{order.paymentMethod}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Tổng tiền:</p>
                                            <p className="font-bold text-lg text-[#FFA500]">
                                                {formatCurrency(order.totalAmount)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    {["pending", "paid"].includes(order.status) && (
                                        <div className="mt-4 pt-3 border-t border-gray-200">
                                            <button
                                                onClick={() => handleCancel(order._id)}
                                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                                            >
                                                Hủy đơn hàng
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderHistoryOverlay;