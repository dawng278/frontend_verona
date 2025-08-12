'use client';

import Link from 'next/link';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { Menu, X, ShoppingBag, User } from 'lucide-react';

// Định nghĩa kiểu dữ liệu cho đối tượng người dùng
interface UserType {
    id: string;
    name: string;
    email: string;
}

// Giả định các Context này đã được định nghĩa ở nơi khác
// Trong một ứng dụng thực tế, bạn sẽ import chúng từ các file context của mình.
// Ví dụ về cấu trúc AuthContext và CartContext:
// interface AuthContextType {
//     user: UserType | null;
//     login: (userData: UserType, token: string) => void;
//     logout: () => void;
// }
// const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

// interface CartContextType {
//     items: any[];
//     totalQuantity: number;
//     toggleCart: () => void;
// }
// const CartContext = React.createContext<CartContextType | undefined>(undefined);

// Import LoginForm và RegisterForm (đảm bảo đường dẫn chính xác)
import LoginForm from '../Auth/LoginForm';
import RegisterForm from '../Auth/RegisterForm';

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

const CartOverlay = () => (
    <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-lg z-50 transform translate-x-full transition-transform duration-300 ease-in-out">
        {/* Nội dung giỏ hàng */}
        <div className="p-4">
            <h3 className="text-xl font-bold mb-4">Your Cart</h3>
            <p>Cart is empty.</p>
            {/* Thêm các mục giỏ hàng ở đây */}
        </div>
    </div>
);


const Header = () => {
    // State để quản lý thông tin người dùng (từ token hoặc context)
    const [user, setUser] = useState<UserType | null>(null);
    // State mới để kiểm tra xem đã chạy ở client chưa
    const [isClient, setIsClient] = useState<boolean>(false);

    // Hàm login thực tế (mô phỏng việc lưu token và thông tin người dùng)
    const handleUserLogin = (userData: UserType, token: string) => {
        setUser(userData);
        // Lưu token vào localStorage. Trong production, cân nhắc dùng HTTP-only cookies
        localStorage.setItem('userToken', token);
        console.log('User logged in, token saved:', token);
    };

    // Hàm logout thực tế (mô phỏng việc xóa token và thông tin người dùng)
    const handleUserLogout = () => {
        setUser(null);
        localStorage.removeItem('userToken'); // Xóa token khi đăng xuất
        console.log('User logged out, token removed.');
    };

    // Tải thông tin người dùng từ localStorage khi component mount (chỉ chạy ở client)
    useEffect(() => {
        setIsClient(true); // Đánh dấu là đã ở client

        const storedToken = localStorage.getItem('userToken');
        if (storedToken) {
            try {
                // Giải mã token để lấy thông tin cơ bản (KHÔNG NÊN LÀM VẬY VỚI CÁC TOKEN NHẠY CẢM TRONG PRODUCTION)
                // Trong môi trường production, bạn nên gửi token này đến backend để xác thực
                // và backend sẽ trả về thông tin người dùng đã được xác minh.
                const decodedToken = JSON.parse(atob(storedToken.split('.')[1]));
                if (decodedToken && decodedToken.id) {
                    // Giả định chúng ta có thể lấy tên người dùng từ một API khác hoặc từ token
                    // Để đơn giản, chúng ta chỉ đặt tên là "Người dùng" và email giả định
                    setUser({ id: decodedToken.id, name: 'Người dùng', email: 'user@example.com' });
                }
            } catch (e) {
                console.error("Failed to decode token from localStorage or token is invalid", e);
                localStorage.removeItem('userToken'); // Xóa token lỗi
            }
        }
    }, []);


    const cart = {
        totalQuantity: 0,
        toggleCart: () => console.log('Mock toggle cart'),
    };

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
    const { totalQuantity, toggleCart } = cart;

    // Hàm xử lý khi đăng nhập thành công từ LoginForm
    const handleLoginSuccess = (userData: UserType, token: string) => {
        console.log('Login successful! Closing auth overlay.');
        handleUserLogin(userData, token); // Gọi hàm để lưu thông tin người dùng và token
        setCurrentAuthForm(null); // Đóng overlay
        setShowAccountOverlay(false); // Đảm bảo AccountOverlay không hiển thị ngay lập tức
    };

    // Hàm xử lý khi đăng ký thành công từ RegisterForm
    const handleRegisterSuccess = () => {
        console.log('Registration successful! Switching to login form.');
        setCurrentAuthForm('login'); // Chuyển sang form đăng nhập sau khi đăng ký thành công
    };

    // Hàm xử lý khi người dùng click Logout từ AccountOverlay
    const handleLogoutClick = () => {
        handleUserLogout(); // Gọi hàm logout
        setShowAccountOverlay(false); // Đóng AccountOverlay
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
                        <button onClick={toggleCart} className="relative">
                            <ShoppingBag className="cursor-pointer mt-2 text-gray-700 hover:text-[#B61E01]" />
                            {totalQuantity > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {totalQuantity}
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
                                if (currentUser) { // Nếu đã đăng nhập, hiển thị AccountOverlay
                                    setShowAccountOverlay(!showAccountOverlay);
                                    setCurrentAuthForm(null); // Đảm bảo overlay xác thực đóng
                                } else { // Nếu chưa đăng nhập, hiển thị LoginOverlay
                                    // Nếu form đang hiển thị là login, thì đóng nó. Ngược lại, mở form login.
                                    setCurrentAuthForm(currentAuthForm === 'login' ? null : 'login');
                                    setShowAccountOverlay(false); // Đảm bảo AccountOverlay đóng
                                }
                            }}
                        />
                        {/* Chỉ render AccountOverlay nếu đã đăng nhập và showAccountOverlay là true */}
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
            {currentAuthForm && !currentUser && ( // Chỉ hiển thị nếu có form xác thực và chưa đăng nhập
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
                    <div ref={authOverlayRef}> {/* Thêm ref để xử lý click bên ngoài */}
                        {currentAuthForm === 'login' && (
                            <LoginForm
                                onSuccess={handleLoginSuccess}
                                onSwitchToRegister={() => setCurrentAuthForm('register')} // Chuyển sang RegisterForm
                            />
                        )}
                        {currentAuthForm === 'register' && (
                            <RegisterForm
                                onSuccess={handleRegisterSuccess}
                                onSwitchToLogin={() => setCurrentAuthForm('login')} // Chuyển sang LoginForm
                            />
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
