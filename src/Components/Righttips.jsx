import React from 'react';

const Righttips = ({ x }) => {
    return (
        <div className="flex flex-col md:mx-auto justify-center lg:pl-20  md:flex-row items-center md:gap-10 ml-0 mb-3">


            <div className="w-8 h-8 rounded-full bg-[#f2ce05] hidden md:block lg:block flex-shrink-0 mb-4 md:mb-0"></div>
            <div className="max-w-full md:max-w-[600px] w-full rounded-3xl p-6 shadow-2xl bg-[#874830] border border-[#dbc54a] hover:shadow-3xl hover:scale-[1.03] transition-transform duration-300 ease-in-out relative">

                <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold bg-gradient-to-r from-[#fcdfe4] to-[#fff5f7] text-[#6b4b3a] px-4 py-1 rounded-full shadow-md">
                        {x.category}
                    </span>
                    <span className="text-xs text-[#FDE2C6]">{new Date(x.createdAt).toLocaleDateString()}</span>
                </div>


                <h2 className="text-2xl font-bold text-[#f2ce05] mb-2 tracking-tight drop-shadow-sm">
                    {x.title}
                </h2>

                <p className="text-[#FDE2C6] text-[13px] leading-relaxed mb-4">
                    {x.content}
                </p>

                <div className="flex justify-between items-center border-t border-[#f1cfcf] pt-2">
                    <div className="text-sm text-gray-700">
                        <span className="font-semibold text-[#FDE2C6]">{x.authorName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#FDE2C6] font-semibold text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-6 3 1.5-6.5L0 6h6L10 0l4 6h6l-5.5 5.5L16 18z" />
                        </svg>
                        {x.upvotes}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Righttips;
