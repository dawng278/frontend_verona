// types/order.ts
export type OrderStatus =
    | "pending"     // chờ xử lý
    | "paid"        // đã thanh toán
    | "cancelled"   // đã hủy
    | "shipped"     // đã giao hàng
    | "completed"   // hoàn tất
    | "failed"      // thất bại
    | "refunded";   // hoàn tiền

export interface Order {
    _id: string;
    totalAmount: number;
    status: OrderStatus;
    createdAt: string;
}
