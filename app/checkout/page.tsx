'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext"; // ✅ lấy giỏ hàng
import Image from "next/image";

export default function CheckoutPage() {
    const { cartItems, totalAmount } = useCart();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [payment, setPayment] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = () => {
        if (!name || !phone || !address || !payment) {
            alert("Vui lòng điền đầy đủ thông tin và chọn phương thức thanh toán.");
            return;
        }
        if (cartItems.length === 0) {
            alert("Giỏ hàng trống.");
            return;
        }
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 4000);
    };

    return (
        <div className="flex justify-center items-start min-h-screen bg-gray-50 p-6 pt-24">
            <Card className="w-full max-w-6xl shadow-xl rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center text-gray-800">
                        Thanh Toán Đơn Hàng
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Cột trái - Thông tin khách hàng & thanh toán */}
                    <div className="space-y-6">
                        {/* Thông tin khách hàng */}
                        <div className="grid gap-4">
                            <div>
                                <Label htmlFor="name">Họ và tên</Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Nguyễn Văn A"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="phone">Số điện thoại</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="0123 456 789"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="address">Địa chỉ nhận hàng</Label>
                                <Input
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="123 Đường ABC, Quận 1, TP.HCM"
                                    required
                                />
                            </div>
                        </div>

                        {/* Phương thức thanh toán */}
                        <div className="space-y-3">
                            <Label>Phương thức thanh toán</Label>
                            <RadioGroup value={payment} onValueChange={setPayment} className="space-y-4">
                                <div className="flex items-center space-x-3 border p-3 rounded-lg cursor-pointer hover:bg-gray-50">
                                    <RadioGroupItem value="bank" id="bank" />
                                    <Label htmlFor="bank" className="flex items-center space-x-2 cursor-pointer">
                                        <Image
                                            src="/banks/vietcombank.png"
                                            alt="Vietcombank"
                                            width={10}
                                            height={10}
                                            className="rounded"
                                        />
                                        <span>Thẻ ATM / Ngân hàng nội địa</span>
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-3 border p-3 rounded-lg cursor-pointer hover:bg-gray-50">
                                    <RadioGroupItem value="visa" id="visa" />
                                    <Label htmlFor="visa" className="flex items-center space-x-2 cursor-pointer">
                                        <Image
                                            src="/banks/visa.png"
                                            alt="Visa"
                                            width={10}
                                            height={10}
                                            className="rounded" />
                                        <span>Thẻ quốc tế (Visa/MasterCard)</span>
                                    </Label>
                                </div>
                            </RadioGroup>

                            {/* Nếu chọn ngân hàng hoặc Visa → hiện input nhập thông tin */}
                            {payment === "bank" && (
                                <div className="space-y-3 mt-3">
                                    <Input placeholder="Số thẻ ngân hàng" />
                                    <Input placeholder="Tên chủ thẻ" />
                                </div>
                            )}
                            {payment === "visa" && (
                                <div className="space-y-3 mt-3">
                                    <Input placeholder="Số thẻ Visa/MasterCard" />
                                    <Input placeholder="Tên chủ thẻ" />
                                    <div className="grid grid-cols-2 gap-3">
                                        <Input placeholder="MM/YY" />
                                        <Input placeholder="CVV" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Cột phải - Đơn hàng */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">Đơn hàng của bạn</h2>
                        <div className="divide-y rounded-lg border bg-white">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="relative w-16 h-16">
                                            <Image
                                                src={item.image || "/placeholder.png"}
                                                alt={item.name}
                                                fill
                                                className="rounded object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-gray-500">x{item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="font-semibold">
                                        {(item.price * item.quantity).toLocaleString()} đ
                                    </p>
                                </div>
                            ))}


                            <div className="flex justify-between items-center p-4 font-bold text-lg">
                                <span>Tổng cộng</span>
                                <span>{totalAmount.toLocaleString()} đ</span>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button onClick={handleSubmit} className="px-6 py-2 text-lg">
                                Thanh toán
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Popup thành công */}
            {success && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center"
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                    >
                        <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
                        <p className="text-lg font-semibold text-gray-700">
                            Đặt hàng thành công!
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
