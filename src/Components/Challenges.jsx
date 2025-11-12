import React from 'react';
import { NavLink } from 'react-router';

const Challenges = ({ x }) => {
    return (
        <div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-500 ease-in-out hover:scale-98  cursor-pointer flex flex-col">
        
                <div className="h-45 sm:h-66 ">
                    <img
                        src={x.imageUrl}
                        alt={x.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="p-4 flex flex-col ">
                
                    <span className=" bg-[#8fd2c5] text-gray-800 text-xs font-semibold px-2 py-1 rounded-full mb-2">
                        {x.category}
                    </span>

                
                    <h3 className="text-md sm:text-lg font-bold text-gray-900 mb-1">
                        {x.title}
                    </h3>

                    <p className="text-sm text-gray-700 flex-1">
                        <span className="font-semibold">{x.impactMetric}</span>
                    </p>
                    <NavLink className="h-full" to={`challenges/${x._id}`}>
                        <button className="mt-3 w-full bg-[#17483d] hover:bg-[#0a7f6a] text-white font-medium py-2 px-3 rounded-full transition-colors duration-300">

                            Watch details

                        </button> </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Challenges;