// frontend/components/Layout/Footer.tsx

import Link from 'next/link';
import { Facebook, Instagram, Phone, Mail } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-gray-300 py-12 mt-auto">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
                    {/* Cột 1: Thông tin công ty */}
                    <div className="w-full md:w-1/3 text-center md:text-left">
                        <h3 className="text-2xl font-bold text-yellow-500 mb-2">BEKA</h3>
                        <p className="text-sm leading-relaxed">
                            Thưởng thức những chiếc pizza ngon nhất được làm từ nguyên liệu tươi ngon, chuẩn vị Ý. Verona Pizza - Nơi hương vị gặp gỡ đam mê!
                        </p>
                    </div>

                    {/* Cột 2: Các liên kết nhanh */}
                    <div className="w-full md:w-1/4 text-center md:text-left">
                        <h4 className="text-lg font-semibold text-white mb-4">Liên kết nhanh</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="hover:text-yellow-500 transition-colors duration-200">
                                    Menu
                                </Link>
                            </li>
                            <li>
                                <Link href="/menu" className="hover:text-yellow-500 transition-colors duration-200">
                                    Dịch vụ
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-yellow-500 transition-colors duration-200">
                                    Về chúng tôi
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-yellow-500 transition-colors duration-200">
                                    Liên hệ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Cột 3: Thông tin liên hệ */}
                    <div className="w-full md:w-1/3 text-center md:text-left">
                        <h4 className="text-lg font-semibold text-white mb-4">Thông tin liên hệ</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center justify-center md:justify-start space-x-2">
                                <Phone size={18} className="text-yellow-500" />
                                <span>+84 987 654 321</span>
                            </li>
                            <li className="flex items-center justify-center md:justify-start space-x-2">
                                <Mail size={18} className="text-yellow-500" />
                                <span>info@beka.com</span>
                            </li>
                            <li className="flex items-center justify-center md:justify-start space-x-2">
                                <p>123 Đường B, Quận C, Thành phố D, Việt Nam</p>
                            </li>
                        </ul>
                        {/* Social Media Links */}
                        <div className="flex justify-center md:justify-start space-x-4 mt-6">
                            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-500 transition-colors duration-200">
                                <Facebook size={24} />
                            </Link>
                            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-500 transition-colors duration-200">
                                <Instagram size={24} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bản quyền */}
                <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                    <p className="text-sm text-gray-500">
                        &copy; {currentYear} BEKA. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
