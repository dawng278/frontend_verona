'use client';

import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import LoginForm from "@/components/Auth/LoginForm";
import RegisterForm from "@/components/Auth/RegisterForm";
import CartOverlay from "./CartOverlay";

import { AuthContext } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";


interface UserType {
    id: string;
    name: string;
    email: string;
}

const NavLinks = () => (
    <>
        <Link href="/menu" className="text-gray-700 hover:text-[#B61E01] font-medium transition-colors">Menu</Link>
        <Link href="/service" className="text-gray-700 hover:text-[#B61E01] font-medium transition-colors">Service</Link>
        <Link href="/promotion" className="text-gray-700 hover:text-[#B61E01] font-medium transition-colors">Promotion</Link>
        <Link href="/contact" className="text-gray-700 hover:text-[#B61E01] font-medium transition-colors">Contact</Link>
    </>
);

interface AccountOverlayProps {
    onLogout: () => void;
}

const AccountOverlay: React.FC<AccountOverlayProps> = ({ onLogout }) => (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
        <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
        <button onClick={onLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
    </div>
);


const Header = () => {
    const [user, setUser] = useState<UserType | null>(null);
    const [isClient, setIsClient] = useState<boolean>(false);
    const { toggleCart, totalQuantity } = useCart();

    const handleUserLogin = (userData: UserType, token: string) => {
        setUser(userData);
        localStorage.setItem('userToken', token);
        console.log('User logged in, token saved:', token);
    };

    const handleUserLogout = () => {
        setUser(null);
        localStorage.removeItem('userToken');
        console.log('User logged out, token removed.');
    };

    useEffect(() => {
        setIsClient(true); // Đánh dấu là đã ở client

        const storedToken = localStorage.getItem('userToken');
        if (storedToken) {
            try {
                // Trong môi trường production, bạn nên gửi token này đến backend để xác thực
                // và backend sẽ trả về thông tin người dùng đã được xác minh.
                // Đối với ví dụ này, chúng ta sẽ decode token để lấy thông tin giả định.
                const decodedPayload = JSON.parse(atob(storedToken.split('.')[1]));
                // Giả định payload có 'id' và 'name'. Điều chỉnh tùy theo payload JWT của bạn.
                if (decodedPayload && decodedPayload.id) {
                    // Lấy tên từ payload hoặc đặt tên mặc định
                    const userName = decodedPayload.name || 'Người dùng';
                    setUser({ id: decodedPayload.id, name: userName, email: decodedPayload.email || 'user@example.com' });
                }
            } catch (e) {
                console.error("Failed to decode token from localStorage or token is invalid", e);
                localStorage.removeItem('userToken');
            }
        }
    }, []);

    const accountRef = useRef<HTMLDivElement>(null);
    const authOverlayRef = useRef<HTMLDivElement>(null);

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showAccountOverlay, setShowAccountOverlay] = useState(false);
    const [currentAuthForm, setCurrentAuthForm] = useState<'login' | 'register' | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                accountRef.current &&
                !accountRef.current.contains(event.target as Node)
            ) {
                setShowAccountOverlay(false);
            }
            if (
                authOverlayRef.current &&
                !authOverlayRef.current.contains(event.target as Node)
            ) {
                setCurrentAuthForm(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const currentUser = user;
    const cart = {
        totalQuantity: 0,
        toggleCart: () => console.log('Mock toggle cart'),
    }; // Giả định cart context

    const handleLoginSuccess = (userData: UserType, token: string) => {
        handleUserLogin(userData, token);
        setCurrentAuthForm(null);
        setShowAccountOverlay(false);
    };

    const handleRegisterSuccess = () => {
        setCurrentAuthForm('login');
    };

    const handleLogoutClick = () => {
        handleUserLogout();
        setShowAccountOverlay(false);
    };

    return (
        <header className="bg-amber-50 shadow-md sticky top-0 z-50 font-sans">
            <div className="container mx-auto flex items-center justify-between px-4 py-3">
                <Link href="/" className="text-3xl font-bold text-[#B61E01]">
                    BEKA
                </Link>

                <nav className="hidden md:flex items-center space-x-6">
                    <NavLinks />
                </nav>

                <div className="flex items-center space-x-4 relative">
                    {/* Cart Icon */}
                    <div className="relative">
                        <button onClick={cart.toggleCart} className="relative">
                            <ShoppingBag className="cursor-pointer mt-2 text-gray-700 hover:text-[#B61E01]" />
                            {cart.totalQuantity > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {cart.totalQuantity}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Account Icon và Tên người dùng */}
                    <div ref={accountRef} className="relative flex items-center space-x-1">
                        {/* Chỉ render tên người dùng nếu đã ở client VÀ có người dùng */}
                        {isClient && currentUser && (
                            <span className="text-gray-700 font-medium text-sm hidden sm:block">
                                {currentUser.name}
                            </span>
                        )}
                        <User
                            className="cursor-pointer text-gray-700 hover:text-[#B61E01]"
                            onClick={() => {
                                if (currentUser) {
                                    setShowAccountOverlay(!showAccountOverlay);
                                    setCurrentAuthForm(null);
                                } else {
                                    setCurrentAuthForm(currentAuthForm === 'login' ? null : 'login');
                                    setShowAccountOverlay(false);
                                }
                            }}
                        />
                        {currentUser && showAccountOverlay && <AccountOverlay onLogout={handleLogoutClick} />}
                    </div>

                    {/* Mobile Menu Icon */}
                    <div className="md:hidden">
                        {isMobileMenuOpen ? (
                            <X
                                className="cursor-pointer text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            />
                        ) : (
                            <Menu
                                className="cursor-pointer text-gray-700"
                                onClick={() => setMobileMenuOpen(true)}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            {isMobileMenuOpen && (
                <nav className="md:hidden px-4 pb-4 items-center flex flex-col space-y-2 text-center">
                    <NavLinks />
                </nav>
            )}

            {/* Cart Overlay */}
            <CartOverlay />

            {/* Auth Overlay (Login/Register) */}
            {currentAuthForm && !currentUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
                    <div ref={authOverlayRef}>
                        {currentAuthForm === 'login' && (
                            <LoginForm
                                onSuccess={handleLoginSuccess}
                                onSwitchToRegister={() => setCurrentAuthForm('register')}
                            />
                        )}
                        {currentAuthForm === 'register' && (
                            <RegisterForm
                                onSuccess={handleRegisterSuccess}
                                onSwitchToLogin={() => setCurrentAuthForm('login')}
                            />
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
