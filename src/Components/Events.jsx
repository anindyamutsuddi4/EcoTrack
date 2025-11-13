import React from 'react';

const Events = ({x}) => {
    return (
        // bg-[#A9A135] 
     <div className="max-w-[500px] w-full rounded-3xl p-6 shadow-2xl 
                    bg-[#5C6D66] border border-[#B5AFA2] 
                    hover:shadow-3xl  mx-auto my-6">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-bold bg-[#AFA288] text-[#2C1F18] px-3 py-1 rounded-full shadow-sm">
           {new Date(x.date).toLocaleDateString()}
        </span>
        {/* <span className="text-xs text-[#E4DCCF]">
          {new Date(x.date).toLocaleDateString()}
        </span> */}
      </div>
      <h2 className="text-2xl font-bold text-[#e7b62f] mb-3 tracking-tight drop-shadow-sm">
        {x.title}
      </h2>
      <p className="text-[#E4DCCF] text-sm leading-relaxed mb-4">
        {x.description}
      </p>
      <div className="flex justify-between items-center mb-4 text-sm">
        <span className="font-semibold text-[#F3E0C2]">📍 {x.location}</span>
        <span className="font-medium text-wrap text- text-[#F3E0C2]">Organizer: {x.organizer}</span>
      </div>
      <div className="flex justify-between items-center pt-3 border-t border-[#AFAFAF]">
        <span className="text-sm text-[#F3E0C2] font-semibold">
          Participants: {x.currentParticipants}/{x.maxParticipants}
        </span>
        <button className="bg-[#F5D88B] hover:bg-[#E0C068] text-[#5C6D66] text-sm px-4 py-2 rounded-full shadow-md transition-colors duration-300">
          Join
        </button>
      </div>
    </div>
    );
};

export default Events;