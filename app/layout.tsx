// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Hoặc font bạn muốn dùng
import './globals.css';
import Header from '@/components/Layout/Header'; // Sử dụng alias @/frontend
import Footer from '@/components/Layout/Footer'; // Sử dụng alias @/frontend
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';

const inter = Inter({ subsets: ['latin'] }); // Khởi tạo font Inter

export const metadata: Metadata = {
    title: 'Beka - Fast Food Delivery',
    description: 'Your go-to place for delicious fast food delivered fast!',
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <AuthProvider> {/* Cung cấp AuthContext cho toàn bộ ứng dụng */}
            <CartProvider> {/* Cung cấp CartContext cho toàn bộ ứng dụng */}
                <div className="flex flex-col min-h-screen">
                    <Header /> {/* Header của ứng dụng */}
                    <main className="flex-grow">
                        {children} {/* Nội dung của các trang */}
                    </main>
                    <Footer /> {/* Footer của ứng dụng */}
                </div>
            </CartProvider>
        </AuthProvider>
        </body>
        </html>
    );
}
