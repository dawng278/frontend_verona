'use client';

import { useState, useRef, useEffect } from "react";
import { User, ShoppingBag } from "lucide-react";
import AccountOverlay from "./AccountOverlay";
import CartOverlay from "./CartOverlay";
import { CartContext } from "@/contexts/CartContext";

const Header = () => {
    const [showAccount, setShowAccount] = useState(false);
    const [showCart, setShowCart] = useState(false);

    const accountRef = useRef<HTMLDivElement>(null);
    const cartRef = useRef<HTMLDivElement>(null);

    // Đóng overlay khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                accountRef.current &&
                !accountRef.current.contains(event.target as Node)
            ) {
                setShowAccount(false);
            }
            if (
                cartRef.current &&
                !cartRef.current.contains(event.target as Node)
            ) {
                setShowCart(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="relative flex justify-between items-center px-6 py-4 shadow">
            <h1 className="text-2xl font-bold">VERONA PIZZA</h1>

            <div className="flex items-center gap-4">
                {/* Icon Account */}
                <div className="relative" ref={accountRef}>
                    <button
                        onClick={() => setShowAccount((prev) => !prev)}
                        className="p-2 rounded-full hover:bg-gray-100"
                    >
                        <User size={24} />
                    </button>
                    {showAccount && <AccountOverlay />}
                </div>

                {/* Icon Cart */}
                <div className="relative" ref={cartRef}>
                    <button
                        onClick={() => setShowCart((prev) => !prev)}
                        className="p-2 rounded-full hover:bg-gray-100"
                    >
                        <ShoppingBag size={24} />
                    </button>
                    {showCart && <CartOverlay />}
                </div>
            </div>
        </header>
    );
};

export default Header;
