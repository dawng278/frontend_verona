import React from 'react';

const FindStoreSection = () => {
    return (
        <div className="w-full bg-[#FF9800] py-8 md:py-12 border border-black flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 px-4">
            <span className="text-white text-lg md:text-xl font-bold tracking-wider whitespace-nowrap">FIND STORE</span>

            <div className="relative w-full md:w-auto max-w-xs sm:max-w-sm lg:max-w-md">
                <select
                    className="appearance-none bg-[#E0E0E0] border border-transparent rounded-md py-3 px-4 w-[450px] text-gray-700 leading-tight focus:outline-none focus:border-blue-500 pr-8 text-base">
                    <option value="">Select Province</option>
                    <option value="hochiminh">Ho Chi Minh City</option>
                    <option value="hanoi">Hanoi</option>
                    {/* Thêm các option khác nếu cần */}
                </select>
                <div
                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/>
                    </svg>
                </div>
            </div>

            <div className="relative w-full md:w-auto max-w-xs sm:max-w-sm lg:max-w-md">
                <select
                    className="appearance-none bg-[#E0E0E0] border border-transparent rounded-md py-3 px-4 w-[450px] text-gray-700 leading-tight focus:outline-none focus:border-blue-500 pr-8 text-base">
                    <option value="">Select District</option>
                    <option value="binhthanh">Binh Thanh District</option>
                    <option value="quan1">District 1</option>
                    {/* Thêm các option khác nếu cần */}
                </select>
                <div
                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/>
                    </svg>
                </div>
            </div>

            <button type="button"
                    className="bg-[#E0E0E0] text-gray-700 font-semibold py-3 px-8 rounded-md
                               hover:bg-gray-300 transition-colors duration-300 w-full md:w-auto max-w-xs sm:max-w-sm">
                Search
            </button>
        </div>
    );
};

export default FindStoreSection;