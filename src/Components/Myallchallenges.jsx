import React, { useState } from 'react';

const Myallchallenges = ({ x }) => {
    const [selected, setselected] = useState('Status ⬇️')
    // const [isActive, setIsActive] = useState(false);
    const handleSelect = (value) => {
        setselected(value)
        //setIsActive(prev => !prev); 
    }


    return (

        <div className="relative rounded-xl border-2 border-yellow-500 bg-[#d3b613] text-black w-full h-full  shadow-xl border border-gray-200 hover:shadow-2xl transition duration-300 max-w-sm mx-auto overflow-hidden">
            {/* Image Section */}
            <div className="relative h-52 w-full">
                <img
                    src={x.imageUrl}
                    alt={x.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <span className="absolute top-3 left-3 bg-yellow-400 text-black font-semibold text-xs px-3 py-1 rounded-full shadow">
                    {x.category}
                </span>
                {/* <span className="absolute bottom-3 left-3 bg-white/90 text-gray-800 text-xs px-3 py-1 rounded-full shadow">
          {x.category}
        </span> */}
            </div>
            <div className="p-5 space-y-2">
                <div className='flex justify-between gap-10'>
                    <h2 className="text-xl font-bold ">{x.title}</h2>
                    <div className='rounded-full'> <div className="dropdown  rounded-full flex justify-end gap-2 dropdown-hover">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn  border-none text-black shadow-md hover:scale-105 transition-transform"
                        >
                            {selected}
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content z-[100] menu p-2 shadow-lg bg-base-100 rounded-xl w-60"
                        >
                            <li >
                                <a onClick={() => handleSelect("Not started")}
                                    className="px-5 py-2 text-black rounded-full transition hover:bg-[#17483d] hover:text-white shadow-lg scale-105"
                                >
                                    Not started
                                </a>
                            </li>
                            <li>
                                <a onClick={() => handleSelect("Ongoing")}
                                    className="px-5 py-2 text-black rounded-full transition hover:bg-[#17483d] hover:text-white shadow-lg scale-105">
                                    Ongoing
                                </a>
                            </li>
                            <li>
                                <a onClick={() => handleSelect("Finished")}
                                    className="px-5 py-2 text-black rounded-full transition hover:bg-[#17483d] hover:text-white shadow-lg scale-105" >
                                    Finished
                                </a>
                            </li>

                        </ul>
                    </div>
                    </div>
                </div>
                <p className="text-sm ">{x.description}</p>

                <div className="flex justify-between text-xs  mt-2">
                    <span>Duration: {x.duration} days</span>
                    <span>Target: {x.target}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="bg-green-50 p-2 rounded-xl text-center shadow-sm">
                        <h3 className="text-sm font-bold text-green-700">{x.participants}</h3>
                        <p className="text-xs text-gray-500">Participants</p>
                    </div>
                    <div className="bg-blue-50 p-2 rounded-xl text-center shadow-sm">
                        <h3 className="text-sm font-bold text-blue-700">{x.impactMetric}</h3>
                        <p className="text-xs text-gray-500">Impact</p>
                    </div>

                </div>

                <div className="bg-yellow-50 p-2 rounded-xl text-center shadow-sm">
                    <h3 className="text-sm font-bold text-wrap text-yellow-700">{x.createdBy}</h3>
                    <p className="text-xs text-gray-500">Created By</p>
                </div>
                <div className="flex justify-between items-center mt-3 text-xs ">
                    <span>Start: {x.startDate}</span>
                    <span>End: {x.endDate}</span>
                </div>
            </div>
        </div>


    );
};

export default Myallchallenges;