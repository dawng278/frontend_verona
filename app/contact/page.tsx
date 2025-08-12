// app/contact/page.tsx
'use client'; // Sử dụng form và useState

import React, { useState } from 'react';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Đang gửi...');
        try {
            // Trong một ứng dụng thực tế, bạn sẽ gửi dữ liệu này đến một API route
            // Ví dụ: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
            // For now, simulate a successful submission
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            setStatus('Tin nhắn của bạn đã được gửi thành công!');
            setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
        } catch (error) {
            console.error('Lỗi khi gửi tin nhắn:', error);
            setStatus('Gửi tin nhắn thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <div className="container mx-auto py-16 px-4 min-h-[calc(100vh-200px)]">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Liên Hệ Với Chúng Tôi</h1>

            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
                <p className="text-lg text-gray-700 text-center mb-8">
                    Chúng tôi rất vui được lắng nghe từ bạn! Vui lòng điền vào biểu mẫu dưới đây hoặc liên hệ trực tiếp với chúng tôi.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Thông tin liên hệ</h3>
                        <p className="text-gray-700 mb-2"><strong>Địa chỉ:</strong> 123 Đường ABC, Quận XYZ, TP.HCM</p>
                        <p className="text-gray-700 mb-2"><strong>Điện thoại:</strong> (028) 123 4567</p>
                        <p className="text-gray-700 mb-2"><strong>Email:</strong> info@veronapizza.com</p>
                        <p className="text-gray-700 mb-2"><strong>Giờ mở cửa:</strong> 9:00 AM - 10:00 PM (Hàng ngày)</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Tìm chúng tôi trên bản đồ</h3>
                        {/* Có thể nhúng Google Maps ở đây */}
                        <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                            [Bản đồ Google Maps sẽ được nhúng tại đây]
                        </div>
                    </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-5 text-center">Gửi tin nhắn cho chúng tôi</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Họ và tên</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="subject" className="block text-gray-700 text-sm font-bold mb-2">Chủ đề</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Nội dung tin nhắn</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        ></textarea>
                    </div>
                    {status && (
                        <p className={`text-center font-semibold ${status.includes('thành công') ? 'text-green-600' : 'text-red-600'}`}>
                            {status}
                        </p>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 px-6 rounded-md shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        Gửi Tin Nhắn
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;
