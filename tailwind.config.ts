// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './frontend/**/*.{js,ts,jsx,tsx,mdx}', // Đảm bảo bao gồm thư mục frontend
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                // Định nghĩa màu sắc tùy chỉnh của bạn
                primary: '#FF9800', // Màu cam chủ đạo
                secondary: '#B61E01', // Màu đỏ phụ đạo
                'gray-light': '#F9FAFB',
                'gray-medium': '#E5E7EB',
                'gray-dark': '#4B5563',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideInRight: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-out forwards',
                'slide-in-right': 'slideInRight 0.3s ease-out forwards',
            },
        },
    },
    plugins: [],
};
export default config;
