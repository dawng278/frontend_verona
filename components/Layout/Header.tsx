'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, User, ShoppingBag, ChefHat } from 'lucide-react';
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from '@/contexts/CartContext';

import CartOverlay from './CartOverlay';
import NavLinks from './NavLinks';
import AccountDropdown from "./AccountOverlay"; // ✅ Import component dropdown tài khoản

const Header = () => {
    const auth = useAuth();
    const { toggleCart, totalQuantity } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const accountRef = useRef<HTMLDivElement>(null);

    const user = auth?.user ?? null;

    // Hiệu ứng khi cuộn
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Đóng overlay tài khoản nếu click ra ngoài
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
                setIsAccountOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Đóng menu mobile khi click ra ngoài
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        }
        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    // Đóng menu mobile khi đổi route
    useEffect(() => {
        setIsMenuOpen(false);
    }, []);

    return (
        <header
            className={`
                fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out bg-amber-50 shadow-md`}
        >
            <div className="container mx-auto px-4 lg:px-6">
                <div className="flex justify-between items-center h-16 lg:h-18">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center space-x-2 group transition-transform hover:scale-105"
                    >
                        <div className="relative">
                            <ChefHat className="text-[#FFA301] w-8 h-8 lg:w-9 lg:h-9 transition-transform group-hover:rotate-12" />
                            <div className="absolute inset-0 bg-[#FFA301] rounded-full opacity-20 scale-150 group-hover:animate-pulse"></div>
                        </div>
                        <div>
                            <h1 className="text-xl lg:text-2xl font-bold text-[#B61E01] group-hover:text-[#8B1A01] transition-colors">
                                VERONA
                            </h1>
                            <p className="text-xs text-gray-600 -mt-1 hidden sm:block">Cửa Hàng Pizza</p>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center">
                        <div className="flex items-center space-x-1 bg-white/50 rounded-full px-6 py-2 shadow-sm border border-white/20">
                            <NavLinks />
                        </div>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 lg:space-x-3">
                        {/* User Account */}
                        <div className="relative" ref={accountRef}>
                            <button
                                onClick={() => setIsAccountOpen(!isAccountOpen)}
                                className={`
                                    group flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-200
                                    hover:bg-white/80 hover:shadow-md active:scale-95
                                    ${isAccountOpen ? 'bg-white/90 shadow-md' : 'hover:bg-white/60'}
                                `}
                                aria-label={user ? `Menu tài khoản của ${user.name}` : 'Menu tài khoản'}
                            >
                                <div className="relative">
                                    <User className="text-gray-700 group-hover:text-[#B61E01] transition-colors w-5 h-5" />
                                    {user && (
                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                    )}
                                </div>
                                {user ? (
                                    <div className="hidden md:flex flex-col items-start">
                                        <span className="text-sm font-medium text-gray-800 leading-tight">
                                            {user.name.split(' ')[0]}
                                        </span>
                                        <span className="text-xs text-gray-500 leading-tight">Tài khoản</span>
                                    </div>
                                ) : (
                                    <span className="text-sm font-medium text-gray-700 hidden md:inline">Đăng nhập</span>
                                )}
                            </button>

                            {/* ✅ Dùng AccountDropdown thay vì AccountOverlay */}
                            {isAccountOpen && (
                                <AccountDropdown onClose={() => setIsAccountOpen(false)} />
                            )}
                        </div>

                        {/* Cart Icon */}
                        <div className="relative">
                            <button
                                onClick={toggleCart}
                                className="group relative p-3 rounded-full hover:bg-white/80 hover:shadow-md transition-all duration-200 active:scale-95"
                                aria-label={`Giỏ hàng với ${totalQuantity} sản phẩm`}
                            >
                                <ShoppingBag className="text-gray-700 group-hover:text-[#B61E01] transition-colors w-5 h-5" />
                                {totalQuantity > 0 && (
                                    <div className="absolute -top-1 -right-1">
                                        <div className="bg-[#B61E01] text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 shadow-lg animate-bounce">
                                            {totalQuantity > 99 ? '99+' : totalQuantity}
                                        </div>
                                        <div className="absolute inset-0 bg-[#B61E01] rounded-full animate-ping opacity-75"></div>
                                    </div>
                                )}
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-3 rounded-full hover:bg-white/80 hover:shadow-md transition-all duration-200 active:scale-95"
                            aria-label={isMenuOpen ? 'Đóng menu' : 'Mở menu'}
                        >
                            <div className="relative w-5 h-5">
                                <Menu
                                    className={`absolute inset-0 text-gray-700 transition-all duration-300 ${
                                        isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'
                                    }`}
                                    size={20}
                                />
                                <X
                                    className={`absolute inset-0 text-gray-700 transition-all duration-300 ${
                                        isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'
                                    }`}
                                    size={20}
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            <div
                className={`
                    lg:hidden overflow-hidden transition-all duration-300 ease-out
                    ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                `}
            >
                <div
                    ref={mobileMenuRef}
                    className="bg-white/95 backdrop-blur-md shadow-xl border-t border-gray-100 m-2 rounded-2xl"
                >
                    <nav className="p-6 space-y-4">
                        <div className="space-y-3">
                            <NavLinks />
                        </div>

                        {/* Mobile Account Section - ✅ dùng dropdown cho mobile */}
                        <div className="border-t border-gray-200 pt-4">
                            {user ? (
                                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-[#B61E01] rounded-full flex items-center justify-center">
                                            <User className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-800">Xin chào, {user.name}!</span>
                                            <p className="text-sm text-gray-600">Quản lý tài khoản của bạn</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setIsAccountOpen(true);
                                            setIsMenuOpen(false);
                                        }}
                                        className="px-4 py-2 bg-[#B61E01] text-white rounded-full text-sm font-medium hover:bg-[#8B1A01] transition-colors"
                                    >
                                        Tài khoản
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => {
                                        setIsAccountOpen(true);
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full p-4 bg-gradient-to-r from-[#B61E01] to-[#8B1A01] text-white rounded-xl font-medium text-center hover:shadow-lg transition-all duration-200 active:scale-95"
                                >
                                    Đăng nhập / Đăng ký
                                </button>
                            )}
                        </div>
                    </nav>
                </div>
            </div>

            {/* Cart Overlay */}
            <CartOverlay />
        </header>
    );
};

export default Header;
