import React, { useState } from 'react';
import { MapPin, ChevronDown, Search } from 'lucide-react';

// Define types for better TypeScript support
type ProvinceKey = 'hochiminh' | 'hanoi' | 'danang' | 'cantho';

interface Location {
    value: string;
    label: string;
}

const FindStoreSection = () => {
    const [province, setProvince] = useState<ProvinceKey | ''>('');
    const [district, setDistrict] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async () => {
        if (!province || !district) return;

        setIsSearching(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSearching(false);

        // Handle search logic here
        console.log('Tìm cửa hàng tại:', { province, district });
    };

    const provinces: Location[] = [
        { value: 'hochiminh', label: 'TP. Hồ Chí Minh' },
        { value: 'hanoi', label: 'Hà Nội' },
        { value: 'danang', label: 'Đà Nẵng' },
        { value: 'cantho', label: 'Cần Thơ' },
    ];

    const districts: Record<ProvinceKey, Location[]> = {
        hochiminh: [
            { value: 'binhthanh', label: 'Quận Bình Thạnh' },
            { value: 'quan1', label: 'Quận 1' },
            { value: 'quan3', label: 'Quận 3' },
            { value: 'quan7', label: 'Quận 7' },
        ],
        hanoi: [
            { value: 'badinh', label: 'Quận Ba Đình' },
            { value: 'hoankien', label: 'Quận Hoàn Kiếm' },
            { value: 'dongda', label: 'Quận Đống Đa' },
        ],
        danang: [
            { value: 'haichau', label: 'Quận Hải Châu' },
            { value: 'thanhkhe', label: 'Quận Thanh Khê' },
        ],
        cantho: [
            { value: 'ninhkieu', label: 'Quận Ninh Kiều' },
            { value: 'cairang', label: 'Quận Cái Răng' },
        ]
    };

    return (
        <div className="w-full bg-gradient-to-r from-orange-500 to-amber-500 py-12 md:py-16 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-1/4 w-32 h-32 bg-white rounded-full -translate-y-16"></div>
                <div className="absolute bottom-0 right-1/3 w-24 h-24 bg-white rounded-full translate-y-12"></div>
            </div>

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <MapPin className="w-8 h-8 text-white mr-3" />
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                            Tìm Cửa Hàng
                        </h2>
                    </div>
                    <p className="text-white/90 text-lg max-w-2xl mx-auto">
                        Xác định cửa hàng gần nhất tại khu vực của bạn và khám phá sản phẩm của chúng tôi
                    </p>
                </div>

                {/* Search Form */}
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-white/20 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
                        {/* Province Select */}
                        <div className="space-y-2">
                            <label className="block text-white/95 text-sm font-semibold mb-3 tracking-wide">
                                📍 Tỉnh/Thành phố
                            </label>
                            <div className="relative group">
                                <select
                                    value={province}
                                    onChange={(e) => {
                                        setProvince(e.target.value as ProvinceKey | '');
                                        setDistrict(''); // Reset district when province changes
                                    }}
                                    className="appearance-none bg-white/95 backdrop-blur-sm border-2 border-white/30 rounded-2xl py-4 px-5 pr-12 w-full text-gray-800 leading-tight focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-200/50 transition-all duration-300 text-base font-medium shadow-lg hover:shadow-xl hover:bg-white group-hover:border-orange-300"
                                    aria-label="Chọn Tỉnh/Thành phố"
                                >
                                    <option value="" className="text-gray-500">Chọn tỉnh/thành phố</option>
                                    {provinces.map((prov) => (
                                        <option key={prov.value} value={prov.value} className="text-gray-800 font-medium">
                                            {prov.label}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 group-hover:scale-110 transition-transform duration-200">
                                    <ChevronDown className="text-gray-600 w-5 h-5" />
                                </div>
                            </div>
                        </div>

                        {/* District Select */}
                        <div className="space-y-2">
                            <label className="block text-white/95 text-sm font-semibold mb-3 tracking-wide">
                                🏘️ Quận/Huyện
                            </label>
                            <div className="relative group">
                                <select
                                    value={district}
                                    onChange={(e) => setDistrict(e.target.value)}
                                    disabled={!province}
                                    className="appearance-none bg-white/95 backdrop-blur-sm border-2 border-white/30 rounded-2xl py-4 px-5 pr-12 w-full text-gray-800 leading-tight focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-200/50 transition-all duration-300 text-base font-medium shadow-lg hover:shadow-xl hover:bg-white group-hover:border-orange-300 disabled:bg-gray-100/80 disabled:text-gray-400 disabled:cursor-not-allowed disabled:border-gray-200"
                                    aria-label="Chọn Quận/Huyện"
                                >
                                    <option value="" className="text-gray-500">
                                        {!province ? "Vui lòng chọn tỉnh/thành phố trước" : "Chọn quận/huyện"}
                                    </option>
                                    {province && districts[province]?.map((dist) => (
                                        <option key={dist.value} value={dist.value} className="text-gray-800 font-medium">
                                            {dist.label}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 group-hover:scale-110 transition-transform duration-200">
                                    <ChevronDown className={`w-5 h-5 transition-colors duration-200 ${!province ? 'text-gray-400' : 'text-gray-600'}`} />
                                </div>
                            </div>
                        </div>

                        {/* Search Button */}
                        <div className="space-y-2">
                            <label className="block text-transparent text-sm font-semibold mb-3 tracking-wide select-none">
                                Tìm kiếm
                            </label>
                            <button
                                type="button"
                                onClick={handleSearch}
                                disabled={!province || !district || isSearching}
                                className="w-full bg-gradient-to-r from-white to-gray-50 text-orange-600 font-bold py-4 px-6 rounded-2xl hover:from-gray-50 hover:to-gray-100 active:from-gray-100 active:to-gray-200 transition-all duration-300 disabled:from-gray-200 disabled:to-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 disabled:translate-y-0 disabled:shadow-md flex items-center justify-center gap-3 border border-white/50"
                                aria-label="Tìm cửa hàng"
                            >
                                {isSearching ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-orange-600 border-t-transparent"></div>
                                        <span>Đang tìm...</span>
                                    </>
                                ) : (
                                    <>
                                        <Search className="w-5 h-5" />
                                        <span>Tìm cửa hàng</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/20">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">25+</div>
                            <div className="text-white/80 text-sm">Cửa hàng</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">4</div>
                            <div className="text-white/80 text-sm">Tỉnh/Thành phố</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">24/7</div>
                            <div className="text-white/80 text-sm">Hỗ trợ</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">★ 5.0</div>
                            <div className="text-white/80 text-sm">Đánh giá</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FindStoreSection;
