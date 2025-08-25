import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Star, Sparkles, Heart, Users, Phone, Gift } from 'lucide-react';

// Mock background image - replace with your actual import
const bgService = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZGVmcz4KPGF0YWRpYWxHcmFkaWVudCBpZD0iYmciIGN4PSI5NjAiIGN5PSI1NDAiIHI9IjgwMCI+CjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNGRkY3RUQiLz4KPHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiNGRkY0RTYiLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjRkRFNjhBIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjE5MjAiIGhlaWdodD0iMTA4MCIgZmlsbD0idXJsKCNiZykiLz4KPC9zdmc+";

// Mock service images - replace with your actual imports
// Using data URLs like ProductCategories (no external domains needed)
const mockServiceImages = {
    kidParty: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkY5ODAwIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSI4MCIgZm9udC1mYW1pbHk9IkFyaWFsIj7wn46JPC90ZXh0Pgo8L3N2Zz4=",
    kidClub: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjOUMzNEZGIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSI4MCIgZm9udC1mYW1pbHk9IkFyaWFsIj7wn5K5PC90ZXh0Pgo8L3N2Zz4=",
    bigService: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMDU5NjY5Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSI4MCIgZm9udC1mYW1pbHk9IkFyaWFsIj7wn46BPC90ZXh0Pgo8L3N2Zz4=",
    service: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjREMxOTE3Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSI4MCIgZm9udC1mYW1pbHk9IkFyaWFsIj7wn5SnPC90ZXh0Pgo8L3N2Zz4="
};

// Service data with enhanced information
const services = [
    {
        id: 1,
        img: mockServiceImages.kidParty,
        title: 'KID PARTY',
        subtitle: 'Special Birthday Celebrations',
        description: 'Looking for ideas for a special birthday party for your child? Our Kid Party services ensures your child will have much fun and memorable experiences.',
        icon: Gift,
        color: 'from-orange-400 to-red-500',
        bgColor: 'bg-orange-50',
        hoverBg: 'hover:bg-orange-100',
        features: ['Custom Decorations', 'Fun Activities', 'Birthday Cake', 'Photo Memories']
    },
    {
        id: 2,
        img: mockServiceImages.kidClub,
        title: 'KID CLUBS',
        subtitle: 'Educational Fun Activities',
        description: 'Let your children experience and discover their talents with fun activities and educational games at Beka Kids Club. Learn more information about Beka Kid Club and join now.',
        icon: Users,
        color: 'from-purple-400 to-pink-500',
        bgColor: 'bg-purple-50',
        hoverBg: 'hover:bg-purple-100',
        features: ['Educational Games', 'Talent Discovery', 'Social Skills', 'Creative Activities']
    },
    {
        id: 3,
        img: mockServiceImages.bigService,
        title: 'BIG SERVICE ORDER',
        subtitle: 'Special Group Discounts',
        description: 'To meet the needs of all customers, your family and friends, the special discount program for large orders is created to bring delightful experiences to you.',
        icon: Star,
        color: 'from-teal-400 to-cyan-500',
        bgColor: 'bg-teal-50',
        hoverBg: 'hover:bg-teal-100',
        features: ['Group Discounts', 'Family Packages', 'Custom Menus', 'Priority Service']
    },
    {
        id: 4,
        img: mockServiceImages.service,
        title: 'CUSTOMER SERVICE',
        subtitle: '24/7 Support Available',
        description: 'We\'re always here to serve you. For customer support, services feedback, or any other inquiries, don\'t hesitate to get in touch. We are devoted to providing the highest quality of services.',
        icon: Phone,
        color: 'from-rose-400 to-red-500',
        bgColor: 'bg-rose-50',
        hoverBg: 'hover:bg-rose-100',
        features: ['24/7 Support', 'Quality Service', 'Feedback Welcome', 'Quick Response']
    }
];

interface ServiceCardProps {
    service: typeof services[0];
    index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const IconComponent = service.icon;

    return (
        <div
            className={`group relative overflow-hidden rounded-2xl ${service.bgColor} ${service.hoverBg} border border-white/50 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer h-full animate-fade-in-up`}
            style={{ animationDelay: `${index * 150}ms` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

            {/* Floating icon */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                <div className={`p-2 rounded-full bg-gradient-to-r ${service.color} text-white shadow-lg`}>
                    <IconComponent className="w-4 h-4" />
                </div>
            </div>

            <div className="relative p-8 h-full flex flex-col">
                {/* Image container */}
                <div className="relative w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                    <div className={`absolute inset-0 bg-gradient-to-r ${service.color} rounded-full opacity-20 blur-xl transition-all duration-500`} />
                    <Image
                        src={service.img}
                        alt={service.title}
                        width={80}
                        height={80}
                        className="relative z-10 w-full h-full object-contain rounded-xl"
                        unoptimized
                    />
                </div>

                {/* Content */}
                <div className="text-center flex-grow">
                    <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                        {service.title}
                    </h3>
                    <p className="text-sm font-medium text-gray-600 mb-4 opacity-75 group-hover:opacity-100 transition-opacity duration-300">
                        {service.subtitle}
                    </p>
                    <p className="text-gray-700 text-base mb-6 leading-relaxed">
                        {service.description}
                    </p>
                </div>

                {/* Features list */}
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center text-xs text-gray-600">
                                <div className={`w-1.5 h-1.5 bg-gradient-to-r ${service.color} rounded-full mr-2`} />
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Button */}
                <button className={`w-full mt-4 py-3 bg-gradient-to-r ${service.color} text-white rounded-xl font-semibold opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 hover:shadow-lg flex items-center justify-center gap-2`}>
                    Learn More
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
            </div>
        </div>
    );
};

const ServiceSection = () => {
    return (
        <section
            className="relative min-h-screen py-20 overflow-hidden"
            style={{
                backgroundImage: `url(${bgService})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Background overlays */}
            <div className="absolute inset-0 " />
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-orange-600 px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg">
                        <Sparkles className="w-4 h-4" />
                        Our Services
                    </div>

                    <h1 className="text-6xl lg:text-7xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
              SERVICE
            </span>
                    </h1>

                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
                        <Heart className="w-6 h-6 text-red-500" />
                        <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full" />
                    </div>

                    <p className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-4">
                        ENJOY PERFECT MOMENT
                    </p>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover our premium services designed to create unforgettable experiences for you and your loved ones
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            index={index}
                        />
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-lg font-semibold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
                        <Phone className="w-5 h-5" />
                        Contact Us Today
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </div>

            <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
        </section>
    );
};

export default ServiceSection;