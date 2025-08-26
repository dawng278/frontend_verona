// app/contact/page.tsx
'use client';

import React, { useState } from 'react';
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Send,
    MessageCircle,
    CheckCircle,
    AlertCircle,
    Facebook,
    Instagram,
    Twitter,
    Youtube
} from 'lucide-react';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear status when user starts typing
        if (status) setStatus(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus('Đang gửi...');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });

            // Clear success message after 5 seconds
            setTimeout(() => setStatus(null), 5000);
        } catch (error) {
            console.error('Lỗi khi gửi tin nhắn:', error);
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: MapPin,
            title: "Địa chỉ",
            content: "123 Đường ABC, Quận XYZ, TP.HCM",
            color: "text-blue-600",
            bgColor: "bg-blue-100"
        },
        {
            icon: Phone,
            title: "Điện thoại",
            content: "(028) 123 4567",
            color: "text-green-600",
            bgColor: "bg-green-100"
        },
        {
            icon: Mail,
            title: "Email",
            content: "info@beka.com",
            color: "text-purple-600",
            bgColor: "bg-purple-100"
        },
        {
            icon: Clock,
            title: "Giờ mở cửa",
            content: "9:00 AM - 10:00 PM (Hàng ngày)",
            color: "text-orange-600",
            bgColor: "bg-orange-100"
        }
    ];

    const socialLinks = [
        { icon: Facebook, href: "#", color: "text-blue-600 hover:text-blue-700" },
        { icon: Instagram, href: "#", color: "text-pink-600 hover:text-pink-700" },
        { icon: Twitter, href: "#", color: "text-sky-500 hover:text-sky-600" },
        { icon: Youtube, href: "#", color: "text-red-600 hover:text-red-700" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative px-6 py-20 sm:py-24 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <div className="flex justify-center mb-6">
                            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                                <MessageCircle className="h-5 w-5 text-white" />
                                <span className="text-white font-medium">Get In Touch</span>
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                            Liên Hệ Với Chúng Tôi
                        </h1>
                        <p className="text-xl leading-8 text-blue-100 max-w-2xl mx-auto">
                            Chúng tôi rất vui được lắng nghe từ bạn! Hãy liên hệ với chúng tôi để được hỗ trợ tốt nhất.
                        </p>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative -mt-12 z-10 px-6 pb-16 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    {/* Contact Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {contactInfo.map((info, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
                            >
                                <div className={`${info.bgColor} ${info.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 mx-auto`}>
                                    <info.icon className="h-7 w-7" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
                                    {info.title}
                                </h3>
                                <p className="text-gray-600 text-center text-sm leading-relaxed">
                                    {info.content}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-gray-100">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    Gửi Tin Nhắn
                                </h2>
                                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">
                                            Họ và tên *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                            placeholder="Nhập họ và tên của bạn"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                            placeholder="your@email.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-gray-700 text-sm font-semibold mb-2">
                                        Chủ đề *
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                        placeholder="Chủ đề tin nhắn"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-gray-700 text-sm font-semibold mb-2">
                                        Nội dung tin nhắn *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none"
                                        placeholder="Nhập nội dung tin nhắn của bạn..."
                                        required
                                    ></textarea>
                                </div>

                                {/* Status Messages */}
                                {status === 'success' && (
                                    <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-center space-x-3">
                                        <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                                        <div>
                                            <p className="text-green-800 font-semibold">Thành công!</p>
                                            <p className="text-green-700 text-sm">Tin nhắn của bạn đã được gửi thành công.</p>
                                        </div>
                                    </div>
                                )}

                                {status === 'error' && (
                                    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center space-x-3">
                                        <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
                                        <div>
                                            <p className="text-red-800 font-semibold">Lỗi!</p>
                                            <p className="text-red-700 text-sm">Gửi tin nhắn thất bại. Vui lòng thử lại.</p>
                                        </div>
                                    </div>
                                )}

                                {status === 'Đang gửi...' && (
                                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex items-center space-x-3">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                                        <p className="text-blue-800 font-semibold">Đang gửi tin nhắn...</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            <span>Đang gửi...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-5 w-5" />
                                            <span>Gửi Tin Nhắn</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Map and Additional Info */}
                        <div className="space-y-8">
                            {/* Map Section */}
                            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                                <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-500">
                                    <h3 className="text-2xl font-bold text-white mb-2">Tìm Chúng Tôi</h3>
                                    <p className="text-blue-100">Ghé thăm cửa hàng của chúng tôi</p>
                                </div>
                                <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                                    {/* Placeholder for Google Maps */}
                                    <div className="text-center">
                                        <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                        <p className="text-gray-600 font-medium">Google Maps Integration</p>
                                        <p className="text-gray-500 text-sm">Bản đồ sẽ được hiển thị tại đây</p>
                                    </div>
                                    {/* Decorative elements */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/30 rounded-full -translate-y-16 translate-x-16"></div>
                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-200/30 rounded-full translate-y-12 -translate-x-12"></div>
                                </div>
                            </div>

                            {/* Social Media & Additional Info */}
                            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                    Kết Nối Với Chúng Tôi
                                </h3>

                                {/* Social Links */}
                                <div className="flex justify-center space-x-6 mb-8">
                                    {socialLinks.map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.href}
                                            className={`${social.color} w-12 h-12 rounded-full border-2 border-current flex items-center justify-center hover:bg-current hover:text-white transition-all duration-300 transform hover:scale-110`}
                                        >
                                            <social.icon className="h-6 w-6" />
                                        </a>
                                    ))}
                                </div>

                                {/* Quick Tips */}
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                        <MessageCircle className="h-5 w-5 text-blue-600 mr-2" />
                                        Mẹo Liên Hệ Nhanh
                                    </h4>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        <li className="flex items-center">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                                            Gọi điện trực tiếp để được hỗ trợ nhanh nhất
                                        </li>
                                        <li className="flex items-center">
                                            <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                                            Email để gửi yêu cầu chi tiết
                                        </li>
                                        <li className="flex items-center">
                                            <div className="w-2 h-2 bg-pink-400 rounded-full mr-3"></div>
                                            Theo dõi social media để cập nhật tin tức
                                        </li>
                                    </ul>
                                </div>

                                {/* FAQ Quick Links */}
                                <div className="mt-6">
                                    <h4 className="text-lg font-bold text-gray-900 mb-4">Câu Hỏi Thường Gặp</h4>
                                    <div className="space-y-2">
                                        <button className="w-full text-left p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300 text-sm">
                                            💰 Thông tin về giá cả và khuyến mãi
                                        </button>
                                        <button className="w-full text-left p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300 text-sm">
                                            🚚 Chính sách giao hàng và đổi trả
                                        </button>
                                        <button className="w-full text-left p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300 text-sm">
                                            👥 Tuyển dụng và cơ hội nghề nghiệp
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom CTA Section */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Sẵn Sàng Bắt Đầu Cuộc Trò Chuyện?
                    </h2>
                    <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                        Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7. Đừng ngần ngại liên hệ bất cứ lúc nào!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                            Gọi Ngay (028) 123 4567
                        </button>
                        <button className="border border-gray-400 hover:border-white text-gray-300 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300">
                            Xem Thêm Dịch Vụ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;