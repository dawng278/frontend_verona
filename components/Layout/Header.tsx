'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, User, ShoppingBag } from 'lucide-react';
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from '@/contexts/CartContext';

import CartOverlay from './CartOverlay';
import NavLinks from './NavLinks';
import AccountOverlay from "@/components/Layout/AccountOverlay";

const Header = () => {
    const auth = useAuth();
    const { toggleCart, totalQuantity } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const accountRef = useRef<HTMLDivElement>(null);

    const user = auth?.user ?? null;

    // Close account overlay if clicked outside
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

    // Close mobile menu when clicking outside
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

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, []);

    return (
        <header className="bg-[#F4EDD4] shadow-md fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-2xl font-bold text-[#B61E01] hover:text-[#8B1A01] transition-colors"
                >
                    Verona Pizza
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-6">
                    <NavLinks />
                </nav>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    {/* User Account */}
                    <div className="relative" ref={accountRef}>
                        <button
                            onClick={() => setIsAccountOpen(!isAccountOpen)}
                            className="flex items-center space-x-2 px-2 py-1 rounded-lg hover:bg-[#E6D5B8] transition-colors"
                            aria-label={user ? `Account menu for ${user.name}` : 'Account menu'}
                        >
                            <User className="text-gray-700 hover:text-[#B61E01] transition-colors" size={20} />
                            {user ? (
                                <span className="text-gray-700 font-medium hidden sm:inline">
                                    {user.name}
                                </span>
                            ) : (
                                <span className="text-gray-700 hidden sm:inline">Account</span>
                            )}
                        </button>

                        {/* Account Dropdown */}
                        {isAccountOpen && (
                            <AccountOverlay onClose={() => setIsAccountOpen(false)} />
                        )}
                    </div>

                    {/* Cart Icon */}
                    <div className="relative">
                        <button
                            onClick={toggleCart}
                            className="relative p-2 rounded-lg hover:bg-[#E6D5B8] transition-colors"
                            aria-label={`Shopping cart with ${totalQuantity} items`}
                        >
                            <ShoppingBag className="text-gray-700 hover:text-[#B61E01] transition-colors" size={20} />
                            {totalQuantity > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[#B61E01] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                                    {totalQuantity > 99 ? '99+' : totalQuantity}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-[#E6D5B8] transition-colors"
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    >
                        {isMenuOpen ? (
                            <X className="text-gray-700" size={20} />
                        ) : (
                            <Menu className="text-gray-700" size={20} />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isMenuOpen && (
                <div
                    ref={mobileMenuRef}
                    className="md:hidden bg-white shadow-lg border-t border-gray-200 animate-in slide-in-from-top-2 duration-200"
                >
                    <nav className="p-4 space-y-4">
                        <NavLinks />

                        {/* Mobile Account Section */}
                        <div className="border-t border-gray-200 pt-4 mt-4">
                            {user ? (
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700 font-medium">Hi, {user.name}!</span>
                                    <button
                                        onClick={() => {
                                            setIsAccountOpen(true);
                                            setIsMenuOpen(false);
                                        }}
                                        className="text-[#B61E01] font-medium"
                                    >
                                        Account
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => {
                                        setIsAccountOpen(true);
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full text-left text-[#B61E01] font-medium"
                                >
                                    Sign In / Register
                                </button>
                            )}
                        </div>
                    </nav>
                </div>
            )}

            {/* Cart Overlay */}
            <CartOverlay />
        </header>
    );
};

export default Header;