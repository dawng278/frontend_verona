'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, LogIn, ShoppingBag } from 'lucide-react';
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from '@/contexts/CartContext';

import AccountOverlay from './AccountOverlay';
import CartOverlay from './CartOverlay';
import NavLinks from './NavLinks';

const Header = () => {
    const auth = useAuth();
    const { toggleCart, totalQuantity } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // ✅ fallback an toàn nếu context null
    const user = auth?.user ?? null;

    return (
        <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-[#B61E01]">
                    Verona Pizza
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-6">
                    <NavLinks />
                </nav>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    {/* User Account */}
                    <div className="relative">
                        {user ? (
                            <button className="flex items-center space-x-2">
                                <LogIn className="cursor-pointer text-gray-700 hover:text-[#B61E01]" />
                                <span className="text-gray-700">{user.name}</span>
                            </button>
                        ) : (
                            // ✅ Hiển thị thẳng overlay Login/Register khi chưa đăng nhập
                            <AccountOverlay />
                        )}
                    </div>

                    {/* Cart Icon */}
                    <div className="relative">
                        <button onClick={toggleCart} className="relative">
                            <ShoppingBag className="cursor-pointer mt-2 text-gray-700 hover:text-[#B61E01]" />
                            {totalQuantity > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {totalQuantity}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-gray-700 hover:text-[#B61E01]"
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isMenuOpen && (
                <nav className="md:hidden bg-white shadow-md p-4 space-y-4">
                    <NavLinks />
                </nav>
            )}

            {/* Cart Overlay */}
            <CartOverlay />
        </header>
    );
};

export default Header;
