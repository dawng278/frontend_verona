// app/service/page.tsx
import React from 'react';
import Link from "next/link";

const ServicePage: React.FC = () => {
    return (
        <div className="container mx-auto py-16 px-4 min-h-[calc(100vh-200px)]"> {/* Điều chỉnh min-height cho phù hợp */}
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Dịch Vụ của Chúng Tôi</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {/* Dịch vụ 1 */}
                <div className="bg-white rounded-lg shadow-md p-8 text-center transform transition duration-300 hover:scale-105">
                    <h2 className="text-2xl font-semibold text-primary mb-4">Giao Hàng Siêu Tốc</h2>
                    <p className="text-gray-700 mb-4">
                        Chúng tôi cam kết giao món ăn nóng hổi đến tận cửa nhà bạn trong thời gian nhanh nhất, đảm bảo chất lượng và hương vị.
                    </p>
                    <ul className="text-left text-gray-600 list-disc list-inside">
                        <li>Giao hàng miễn phí cho đơn hàng trên 200.000 VNĐ</li>
                        <li>Theo dõi đơn hàng trực tuyến</li>
                        <li>Thời gian giao hàng trung bình: 30 phút</li>
                    </ul>
                </div>

                {/* Dịch vụ 2 */}
                <div className="bg-white rounded-lg shadow-md p-8 text-center transform transition duration-300 hover:scale-105">
                    <h2 className="text-2xl font-semibold text-primary mb-4">Món Ăn Tươi Ngon</h2>
                    <p className="text-gray-700 mb-4">
                        Tất cả các món ăn của chúng tôi được chế biến từ nguyên liệu tươi ngon nhất, đảm bảo vệ sinh an toàn thực phẩm.
                    </p>
                    <ul className="text-left text-gray-600 list-disc list-inside">
                        <li>Nguyên liệu chọn lọc mỗi ngày</li>
                        <li>Chế biến hợp vệ sinh</li>
                        <li>Đầu bếp chuyên nghiệp</li>
                    </ul>
                </div>

                {/* Dịch vụ 3 */}
                <div className="bg-white rounded-lg shadow-md p-8 text-center transform transition duration-300 hover:scale-105">
                    <h2 className="text-2xl font-semibold text-primary mb-4">Hỗ Trợ Khách Hàng 24/7</h2>
                    <p className="text-gray-700 mb-4">
                        Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của bạn bất cứ lúc nào.
                    </p>
                    <ul className="text-left text-gray-600 list-disc list-inside">
                        <li>Hỗ trợ qua điện thoại và chat</li>
                        <li>Giải quyết vấn đề nhanh chóng</li>
                        <li>Luôn lắng nghe phản hồi</li>
                    </ul>
                </div>
            </div>

            <div className="mt-16 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Bạn có bất kỳ câu hỏi nào?</h2>
                <Link href="/contact" passHref>
                    <button className="bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-full shadow-lg text-xl transition-all duration-300 transform hover:scale-105">
                        Liên Hệ Với Chúng Tôi
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ServicePage;
