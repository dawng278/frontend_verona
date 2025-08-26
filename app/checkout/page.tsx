'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    CheckCircle,
    CreditCard,
    User,
    MapPin,
    Phone,
    ShieldCheck,
    Lock,
    Truck,
    Clock,
    Gift,
    ArrowLeft,
    Wallet,
    Building2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const { cartItems, totalAmount, clearCart } = useCart();
    const { user } = useAuth();
    const router = useRouter();

    const [name, setName] = useState(user?.name || "");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [payment, setPayment] = useState("");
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [promoCode, setPromoCode] = useState("");
    const [discount, setDiscount] = useState(0);

    // Payment form states
    const [cardNumber, setCardNumber] = useState("");
    const [cardHolder, setCardHolder] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");

    const deliveryFee = 15000;
    const finalTotal = totalAmount + deliveryFee - discount;
    const estimatedDelivery = "25-35 phút";

    // Input validation functions
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numbersOnly = value.replace(/[^0-9]/g, '');
        if (numbersOnly.length <= 11) {
            setPhone(numbersOnly);
        }
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numbersOnly = value.replace(/[^0-9]/g, '');
        const formatted = numbersOnly.replace(/(.{4})/g, '$1 ').trim();
        if (numbersOnly.length <= 16) {
            setCardNumber(formatted);
        }
    };

    const handleCardHolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const lettersOnly = value.replace(/[^a-zA-Z\s]/g, '').toUpperCase();
        setCardHolder(lettersOnly);
    };

    const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numbersOnly = value.replace(/[^0-9]/g, '');
        let formatted = numbersOnly;

        if (numbersOnly.length >= 2) {
            const month = numbersOnly.substring(0, 2);
            const year = numbersOnly.substring(2, 4);

            if (parseInt(month) > 12) {
                formatted = '12' + (year ? '/' + year : '');
            } else if (parseInt(month) === 0) {
                formatted = '01' + (year ? '/' + year : '');
            } else {
                formatted = month + (year ? '/' + year : '');
            }
        }

        if (formatted.length <= 5) {
            setExpiryDate(formatted);
        }
    };

    const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numbersOnly = value.replace(/[^0-9]/g, '');
        if (numbersOnly.length <= 4) {
            setCvv(numbersOnly);
        }
    };

    const handlePromoCode = () => {
        if (promoCode === "SAVE10") {
            setDiscount(totalAmount * 0.1);
        } else if (promoCode === "NEWUSER") {
            setDiscount(25000);
        } else {
            alert("Mã khuyến mãi không hợp lệ");
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const handleSubmit = async () => {
        if (isLoading) return;

        if (!user) {
            alert("Vui lòng đăng nhập trước khi thanh toán.");
            return;
        }
        if (!name || !phone || !address || !payment) {
            alert("Vui lòng điền đầy đủ thông tin và chọn phương thức thanh toán.");
            return;
        }
        if (cartItems.length === 0) {
            alert("Giỏ hàng trống.");
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    userId: user.id,
                    items: cartItems,
                    total: finalTotal,
                    address,
                    phone,
                    paymentMethod: payment,
                    discount,
                    deliveryFee,
                    promoCode: promoCode || null
                }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();

            if (data.success) {
                setSuccess(true);
                clearCart();
                setTimeout(() => {
                    setSuccess(false);
                }, 3000);
            } else {
                alert(data.error || "Thanh toán thất bại");
            }
        } catch (err) {
            console.error("Error creating order:", err);
            alert("Lỗi kết nối. Vui lòng thử lại sau.");
        } finally {
            setIsLoading(false);
        }
    };

    const paymentMethods = [
        {
            id: "bank",
            name: "Thẻ ATM / Ngân hàng nội địa",
            icon: Building2,
            description: "Thanh toán qua thẻ ATM các ngân hàng trong nước",
            popular: true
        },
        {
            id: "visa",
            name: "Thẻ quốc tế (Visa/MasterCard)",
            icon: CreditCard,
            description: "Thanh toán bằng thẻ tín dụng quốc tế",
            popular: false
        },
        {
            id: "wallet",
            name: "Ví điện tử",
            icon: Wallet,
            description: "MoMo, ZaloPay, ShopeePay",
            popular: false
        }
    ];

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
                <Card className="max-w-md w-full text-center">
                    <CardContent className="pt-6">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Truck className="h-10 w-10 text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Giỏ hàng trống</h2>
                        <p className="text-gray-600 mb-6">Thêm sản phẩm vào giỏ hàng để tiến hành thanh toán</p>
                        <Button onClick={() => router.push('/menu')} className="w-full">
                            Khám phá menu
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span className="font-medium">Quay lại</span>
                        </button>

                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-gray-800">Thanh Toán Đơn Hàng</h1>
                        </div>

                        <div className="text-right">
                            <p className="text-sm text-gray-500">Tổng đơn hàng</p>
                            <p className="text-2xl font-bold text-blue-600">{formatPrice(finalTotal)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Forms */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Customer Information */}
                        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center space-x-3 text-xl">
                                    <div className="bg-blue-100 p-2 rounded-xl">
                                        <User className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <span>Thông tin người nhận</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                                            Họ và tên *
                                        </Label>
                                        <Input
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Nguyễn Văn A"
                                            className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                                            Số điện thoại *
                                        </Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                            <Input
                                                id="phone"
                                                type="tel"
                                                value={phone}
                                                onChange={handlePhoneChange}
                                                placeholder="0123456789"
                                                className="h-12 pl-11 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                                                maxLength={11}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address" className="text-sm font-semibold text-gray-700">
                                        Địa chỉ nhận hàng *
                                    </Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input
                                            id="address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder="123 Đường ABC, Quận 1, TP.HCM"
                                            className="h-12 pl-11 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Delivery Info */}
                                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-4">
                                    <div className="flex items-center space-x-3">
                                        <Truck className="h-5 w-5 text-green-600" />
                                        <div>
                                            <p className="font-semibold text-green-800">Giao hàng tận nơi</p>
                                            <p className="text-sm text-green-600">Thời gian dự kiến: {estimatedDelivery}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Payment Methods */}
                        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center space-x-3 text-xl">
                                    <div className="bg-purple-100 p-2 rounded-xl">
                                        <CreditCard className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <span>Phương thức thanh toán</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <RadioGroup value={payment} onValueChange={setPayment} className="space-y-3">
                                    {paymentMethods.map((method) => (
                                        <div key={method.id} className="relative">
                                            <div className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                                                payment === method.id
                                                    ? 'border-blue-500 bg-blue-50 shadow-md'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}>
                                                <div className="flex items-center space-x-4">
                                                    <RadioGroupItem value={method.id} id={method.id} />
                                                    <div className="bg-gray-100 p-2 rounded-lg">
                                                        <method.icon className="h-6 w-6 text-gray-600" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-2">
                                                            <Label htmlFor={method.id} className="font-semibold text-gray-900 cursor-pointer">
                                                                {method.name}
                                                            </Label>
                                                            {method.popular && (
                                                                <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full font-medium">
                                                                    Phổ biến
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-gray-600 mt-1">{method.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </RadioGroup>

                                {/* Card Details */}
                                {(payment === "bank" || payment === "visa") && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 mt-4 space-y-4"
                                    >
                                        <div className="flex items-center space-x-2 mb-4">
                                            <Lock className="h-5 w-5 text-green-600" />
                                            <span className="text-sm font-medium text-gray-700">Thông tin được mã hóa an toàn</span>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <Label className="text-sm font-semibold text-gray-700">Số thẻ</Label>
                                                <Input
                                                    placeholder="1234 5678 9012 3456"
                                                    value={cardNumber}
                                                    onChange={handleCardNumberChange}
                                                    className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl font-mono"
                                                    maxLength={19}
                                                />
                                            </div>
                                            <div>
                                                <Label className="text-sm font-semibold text-gray-700">Tên chủ thẻ</Label>
                                                <Input
                                                    placeholder="NGUYEN VAN A"
                                                    value={cardHolder}
                                                    onChange={handleCardHolderChange}
                                                    className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl uppercase"
                                                />
                                            </div>
                                            {payment === "visa" && (
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <Label className="text-sm font-semibold text-gray-700">Ngày hết hạn</Label>
                                                        <Input
                                                            placeholder="MM/YY"
                                                            value={expiryDate}
                                                            onChange={handleExpiryDateChange}
                                                            className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl font-mono"
                                                            maxLength={5}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label className="text-sm font-semibold text-gray-700">CVV</Label>
                                                        <Input
                                                            placeholder="123"
                                                            value={cvv}
                                                            onChange={handleCvvChange}
                                                            className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl font-mono"
                                                            maxLength={4}
                                                            type="password"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="space-y-6">
                        {/* Order Summary */}
                        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm sticky top-6">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-xl">Đơn hàng của bạn</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Items */}
                                <div className="space-y-3 max-h-60 overflow-y-auto">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                                            <div className="relative w-14 h-14 flex-shrink-0">
                                                <Image
                                                    src={item.image || "/placeholder.png"}
                                                    alt={item.name}
                                                    fill
                                                    className="rounded-lg object-cover"
                                                />
                                                <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                                    {item.quantity}
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-gray-900 text-sm line-clamp-1">{item.name}</p>
                                                <p className="text-blue-600 font-bold">{formatPrice(item.price * item.quantity)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <hr className="border-gray-200" />

                                {/* Promo Code */}
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <Gift className="h-5 w-5 text-green-600" />
                                        <span className="font-semibold text-gray-700">Mã khuyến mãi</span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Input
                                            placeholder="Nhập mã khuyến mãi"
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                            className="flex-1 h-10 border-2 border-gray-200 focus:border-green-500 rounded-lg"
                                        />
                                        <Button
                                            onClick={handlePromoCode}
                                            variant="outline"
                                            className="h-10 px-4 border-2 border-green-200 hover:bg-green-50 text-green-700 font-semibold"
                                        >
                                            Áp dụng
                                        </Button>
                                    </div>
                                    {discount > 0 && (
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                            <p className="text-sm text-green-700 font-medium">
                                                Mã khuyến mãi đã được áp dụng! Tiết kiệm {formatPrice(discount)}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <hr className="border-gray-200" />

                                {/* Price Breakdown */}
                                <div className="space-y-3">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tạm tính</span>
                                        <span className="font-semibold">{formatPrice(totalAmount)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Phí giao hàng</span>
                                        <span className="font-semibold">{formatPrice(deliveryFee)}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Giảm giá</span>
                                            <span className="font-semibold">-{formatPrice(discount)}</span>
                                        </div>
                                    )}
                                    <hr className="border-gray-200" />
                                    <div className="flex justify-between text-xl font-bold text-gray-900">
                                        <span>Tổng cộng</span>
                                        <span className="text-blue-600">{formatPrice(finalTotal)}</span>
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <Button
                                    onClick={handleSubmit}
                                    disabled={isLoading || !name || !phone || !address || !payment}
                                    className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:from-gray-400 disabled:to-gray-500"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center space-x-2">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            <span>Đang xử lý...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center space-x-2">
                                            <ShieldCheck className="h-6 w-6" />
                                            <span>Thanh toán an toàn</span>
                                        </div>
                                    )}
                                </Button>

                                {/* Security Notice */}
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                                    <div className="flex items-center space-x-2">
                                        <ShieldCheck className="h-5 w-5 text-blue-600" />
                                        <p className="text-sm text-blue-700 font-medium">
                                            Thanh toán được bảo mật với công nghệ mã hóa SSL 256-bit
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Delivery Time */}
                        <Card className="shadow-lg border-0 bg-gradient-to-r from-orange-50 to-amber-50">
                            <CardContent className="pt-6">
                                <div className="flex items-center space-x-3">
                                    <Clock className="h-8 w-8 text-orange-600" />
                                    <div>
                                        <p className="font-bold text-orange-800">Giao hàng nhanh</p>
                                        <p className="text-orange-600">{estimatedDelivery}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Success Modal - From original code */}
            {success && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center max-w-md mx-4"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", damping: 15 }}
                    >
                        <div className="bg-green-100 p-4 rounded-full mb-6">
                            <CheckCircle className="text-green-600 w-16 h-16" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                            Đặt hàng thành công!
                        </h2>
                        <p className="text-gray-600 text-center mb-4">
                            Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ với bạn sớm nhất.
                        </p>
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 w-full">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Thời gian giao hàng dự kiến:</span>
                                <span className="font-bold text-blue-600">{estimatedDelivery}</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}