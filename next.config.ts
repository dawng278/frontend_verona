// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // Cấu hình cho Next.js
    // Ví dụ: cho phép tải ảnh từ các domain cụ thể nếu bạn dùng ảnh bên ngoài
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'via.placeholder.com', // Ví dụ: cho phép ảnh placeholder
            },
            // Thêm các domain khác nếu bạn tải ảnh từ CDN hoặc dịch vụ bên ngoài
        ],
    },
    // Thêm các cấu hình khác nếu cần
};

export default nextConfig;
