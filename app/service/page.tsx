'use client';

import React, { useState } from 'react';
import {
    Truck,
    Clock,
    Shield,
    Star,
    Phone,
    MessageCircle,
    ChefHat,
    Leaf,
    Heart,
    Award,
    MapPin,
    Users,
    CheckCircle,
    ArrowRight
} from 'lucide-react';

const ServicePage = () => {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [hoveredStat, setHoveredStat] = useState<number | null>(null);

    const services = [
        {
            id: 1,
            icon: Truck,
            title: "Giao Hàng Siêu Tốc",
            description: "Chúng tôi cam kết giao món ăn nóng hổi đến tận cửa nhà bạn trong thời gian nhanh nhất, đảm bảo chất lượng và hương vị.",
            features: [
                "Giao hàng miễn phí cho đơn hàng trên 200.000 VNĐ",
                "Theo dõi đơn hàng trực tuyến",
                "Thời gian giao hàng trung bình: 30 phút"
            ],
            color: "from-blue-500 to-cyan-400",
            bgColor: "bg-blue-50",
            hoverBg: "hover:bg-blue-100"
        },
        {
            id: 2,
            icon: ChefHat,
            title: "Món Ăn Tươi Ngon",
            description: "Tất cả các món ăn của chúng tôi được chế biến từ nguyên liệu tươi ngon nhất, đảm bảo vệ sinh an toàn thực phẩm.",
            features: [
                "Nguyên liệu chọn lọc mỗi ngày",
                "Chế biến hợp vệ sinh",
                "Đầu bếp chuyên nghiệp"
            ],
            color: "from-orange-500 to-red-400",
            bgColor: "bg-orange-50",
            hoverBg: "hover:bg-orange-100"
        },
        {
            id: 3,
            icon: Phone,
            title: "Hỗ Trợ Khách Hàng 24/7",
            description: "Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của bạn bất cứ lúc nào.",
            features: [
                "Hỗ trợ qua điện thoại và chat",
                "Giải quyết vấn đề nhanh chóng",
                "Luôn lắng nghe phản hồi"
            ],
            color: "from-green-500 to-emerald-400",
            bgColor: "bg-green-50",
            hoverBg: "hover:bg-green-100"
        }
    ];

    const stats = [
        { icon: Users, number: "50K+", label: "Khách Hàng Hài Lòng", color: "from-purple-500 to-pink-400" },
        { icon: Award, number: "99.8%", label: "Đánh Giá Tích Cực", color: "from-blue-500 to-cyan-400" },
        { icon: Clock, number: "25 phút", label: "Thời Gian Giao Hàng", color: "from-green-500 to-emerald-400" },
        { icon: MapPin, number: "100+", label: "Khu Vực Phục Vụ", color: "from-orange-500 to-red-400" }
    ];

    const additionalServices = [
        {
            icon: Leaf,
            title: "Thực Phẩm Organic",
            description: "Cam kết sử dụng nguyên liệu hữu cơ, tự nhiên",
            color: "from-green-500 to-emerald-400"
        },
        {
            icon: Shield,
            title: "Bảo Đảm Chất Lượng",
            description: "Hoàn tiền 100% nếu không hài lòng",
            color: "from-blue-500 to-cyan-400"
        },
        {
            icon: Heart,
            title: "Chế Độ Ăn Đặc Biệt",
            description: "Phục vụ các nhu cầu ăn kiêng đặc biệt",
            color: "from-pink-500 to-rose-400"
        },
        {
            icon: MessageCircle,
            title: "Tư Vấn Dinh Dưỡng",
            description: "Chuyên gia dinh dưỡng hỗ trợ miễn phí",
            color: "from-purple-500 to-indigo-400"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
            {/* Hero Section */}
            <div className="relative py-20 px-4 animate-fade-in">
                <div className="container mx-auto text-center">
                    <div className="inline-block p-4 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mb-6 animate-bounce">
                        <Star className="w-8 h-8 text-white" />
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent animate-slide-up">
                        Dịch Vụ Đỉnh Cao
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed animate-slide-up-delay">
                        Trải nghiệm những dịch vụ tuyệt vời nhất với công nghệ hiện đại và đội ngũ chuyên nghiệp
                    </p>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-10 left-10 animate-float">
                    <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-20"></div>
                </div>
                <div className="absolute top-32 right-20 animate-float-delay">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-30"></div>
                </div>
                <div className="absolute bottom-10 left-1/4 animate-pulse">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-25"></div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="py-16 px-4 bg-white/50 backdrop-blur-sm">
                <div className="container mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className={`text-center transform transition-all duration-500 hover:scale-110 cursor-pointer animate-slide-up`}
                                style={{ animationDelay: `${index * 0.2}s` }}
                                onMouseEnter={() => setHoveredStat(index)}
                                onMouseLeave={() => setHoveredStat(null)}
                            >
                                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-full mb-4 shadow-lg transition-all duration-300 ${hoveredStat === index ? 'shadow-2xl transform rotate-12' : ''}`}>
                                    <stat.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-3xl font-bold text-gray-800 mb-2 transition-colors duration-300">{stat.number}</h3>
                                <p className="text-gray-600">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Services Section */}
            <div className="py-20 px-4">
                <div className="container mx-auto">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-16 animate-slide-up">
                        Dịch Vụ Chính
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                className={`group relative overflow-hidden rounded-2xl shadow-xl transform transition-all duration-700 ${service.bgColor} ${service.hoverBg} hover:shadow-2xl hover:-translate-y-3 hover:scale-105 cursor-pointer animate-slide-up`}
                                style={{ animationDelay: `${index * 0.3}s` }}
                                onMouseEnter={() => setHoveredCard(service.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                {/* Gradient Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 transition-all duration-700 group-hover:opacity-20`}></div>

                                {/* Shine Effect */}
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>

                                <div className="relative p-8 z-10">
                                    {/* Icon */}
                                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl mb-6 shadow-lg transition-all duration-500 ${hoveredCard === service.id ? 'transform rotate-360 scale-110' : ''}`}>
                                        <service.icon className="w-8 h-8 text-white" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors duration-300">{service.title}</h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{service.description}</p>

                                    {/* Features List */}
                                    <ul className="space-y-3">
                                        {service.features.map((feature, featureIndex) => (
                                            <li
                                                key={featureIndex}
                                                className="flex items-start space-x-3 opacity-0 animate-slide-in"
                                                style={{ animationDelay: `${(index * 0.3) + (featureIndex * 0.1) + 0.5}s`, animationFillMode: 'forwards' }}
                                            >
                                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                <span className="text-gray-700 group-hover:text-gray-800 transition-colors duration-300">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Bottom Accent */}
                                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Additional Services */}
            <div className="py-20 px-4 bg-gradient-to-r from-gray-50 to-white">
                <div className="container mx-auto">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-16 animate-slide-up">
                        Dịch Vụ Bổ Sung
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {additionalServices.map((service, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 transform hover:-translate-y-2 hover:scale-105 cursor-pointer animate-slide-up"
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${service.color} rounded-lg mb-4 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300`}>
                                    <service.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300">{service.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{service.description}</p>

                                {/* Hover indicator */}
                                <div className={`mt-4 w-0 h-0.5 bg-gradient-to-r ${service.color} group-hover:w-full transition-all duration-500`}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 px-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-48 -translate-y-48 animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48 animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32 animate-float opacity-5"></div>
                </div>

                <div className="container mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-slide-up">
                        Bạn có bất kỳ câu hỏi nào?
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-slide-up-delay">
                        Đừng ngần ngại liên hệ với chúng tôi. Chúng tôi luôn sẵn sàng hỗ trợ bạn!
                    </p>
                    <button className="group inline-flex items-center space-x-3 bg-white text-orange-500 font-bold py-4 px-8 rounded-full shadow-xl text-xl transition-all duration-500 hover:shadow-2xl hover:scale-110 transform hover:-translate-y-1 animate-slide-up-delay-2 overflow-hidden relative">
                        {/* Button shine effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-orange-100 to-transparent"></div>

                        <span className="relative z-10">Liên Hệ Với Chúng Tôi</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                    </button>
                </div>
            </div>

            {/* Custom CSS animations */}
            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slide-in {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }

                @keyframes rotate-360 {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .animate-fade-in {
                    animation: fade-in 1s ease-out;
                }

                .animate-slide-up {
                    animation: slide-up 0.8s ease-out;
                }

                .animate-slide-up-delay {
                    animation: slide-up 0.8s ease-out 0.3s both;
                }

                .animate-slide-up-delay-2 {
                    animation: slide-up 0.8s ease-out 0.6s both;
                }

                .animate-slide-in {
                    animation: slide-in 0.6s ease-out both;
                }

                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }

                .animate-float-delay {
                    animation: float 6s ease-in-out infinite 2s;
                }

                .rotate-360 {
                    animation: rotate-360 0.6s ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default ServicePage;