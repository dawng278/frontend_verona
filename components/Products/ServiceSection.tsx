import React from 'react';
import Image from 'next/image';
// Import các hình ảnh minh họa dịch vụ
import kidPartyImg from '@/assets/images/services/kid_party.png'; // Giả định đường dẫn
import kidClubImg from '@/assets/images/services/kid_clubs.png';   // Giả định đường dẫn
import bigServiceOrderImg from '@/assets/images/services/big_service_order.png'; // Giả định đường dẫn
import serviceImg from '@/assets/images/services/service_customer.png'; // Giả định đường dẫn
import bgService from '@/assets/images/backgrounds/bgService.png'; // Ảnh nền của section

const ServiceSection = () => {
    // Dữ liệu cho các thẻ dịch vụ
    const services = [
        {
            id: 1,
            img: kidPartyImg,
            title: 'KID PARTY',
            description: 'Looking for ideas for a special birthday party for your child? Our Kid Party services ensures your child will have much fun and memorable experiences.'
        },
        {
            id: 2,
            img: kidClubImg,
            title: 'KID CLUBS',
            description: 'Let your children experience and discover their talents with fun activities and educational games at Beka Kids Club. Learn more information about Beka Kid Club and join now.'
        },
        {
            id: 3,
            img: bigServiceOrderImg,
            title: 'BIG SERVICE ORDER',
            description: 'To meet the needs of all customers, your family and friends, the special discount program for large orders is created to bring delightful experiences to you. Please contact the nearest store to be served.'
        },
        {
            id: 4,
            img: serviceImg,
            title: 'SERVICE',
            description: 'We’re always here to serve you. For customer support, services feedback, or any other inquiries, don’t hesitate to get in touch. We are devoted to providing the highest quality of services and ensuring pleasant experiences and welcome new talents to our team.'
        }
    ];

    return (
        <div
            // Đảm bảo bgService được import và đường dẫn đúng
            className={`w-full rounded-lg flex flex-col items-center justify-center min-h-[600px] bg-cover bg-no-repeat bg-center p-8`}
            style={{ backgroundImage: `url(${bgService})` }}
        >
            <div className="text-center mb-12 mt-12"> {/* Thêm mt-12 để tạo khoảng trống trên cùng */}
                <h1 className="text-[#B61E01] font-bold text-5xl tracking-wide">SERVICE</h1> {/* Màu đỏ đậm giống các tiêu đề khác */}
                <p className="text-[#2D0902] text-2xl mt-2">ENJOY PERFECT MOMENT</p> {/* Màu nâu đậm và kích thước lớn hơn */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full px-4 max-w-7xl">
                {services.map((service) => (
                    <div
                        key={service.id}
                        className="flex flex-col items-center p-6 rounded-xl text-center bg-orange-50 shadow-lg
                                   transform transition-transform duration-300 hover:scale-105 cursor-pointer h-full" // Thêm h-full để các card có chiều cao đồng đều
                    >
                        <Image
                            src={service.img}
                            alt={service.title}
                            className="w-40 h-40 object-contain mb-4"
                        />
                        <h3 className="text-2xl font-semibold mb-2 text-gray-800 uppercase">{service.title}</h3> {/* uppercase để viết hoa tiêu đề */}
                        <p className="text-gray-600 text-base mb-4 flex-grow">{service.description}</p> {/* flex-grow để mô tả chiếm hết không gian còn lại */}
                        {/* Nút "VIEW MORE" đã được loại bỏ */}
                    </div>
                ))}
            </div>
            <div className="mb-12"></div> {/* Thêm khoảng trống dưới cùng */}
        </div>
    );
};

export default ServiceSection;