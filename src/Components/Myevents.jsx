import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
import { AuthContext } from './AuthContext';
import useAxiosSecure from '../useAxiosSecure';
import { toast } from 'react-toastify';

const Myevents = () => {
    const { user } = use(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { refetch, data = [] } = useQuery({
        queryKey: ['events', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/allevents/join/${user?.email}`)
            return res.data
        }
    })
    //console.log(data)
    const deleteevent = async x => {
        const res = await fetch(
            `https://ecotrack-server-side.vercel.app/allevents/join/${user?.email}/${x._id}`,
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                // body: JSON.stringify({ status: selected }),
            }
        );
        const data = await res.json();
        await fetch(`https://ecotrack-server-side.vercel.app/deletedevents/${x.id}`,
            {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                // body: JSON.stringify({ status: selected }),
            }
        );
        // console.log(id, data)
        toast.error(data.message || "Failed to delete event");
        await refetch()

    }
    return (
        <div className="bg-[#17483d] max-w-screen min-h-screen w-full  overflow-x-hidden">
            <div className="relative flex flex-col items-center justify-center text-center py-16 px-4 sm:px-6 md:px-10">
               
                <div className="absolute -top-20 -left-20 w-60 sm:w-72 h-60 sm:h-72 bg-gradient-to-r from-[#a3e635] to-[#4ade80] rounded-full filter blur-3xl opacity-40 animate-pulse"></div>
                <div className="absolute -bottom-20 -right-20 w-80 sm:w-96 h-80 sm:h-96 bg-gradient-to-r from-[#22c55e] via-[#10b981] to-[#059669] rounded-full filter blur-2xl opacity-30 animate-pulse"></div>

           
                <h1 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] mb-4">
                    Your Joined Events
                </h1>

          
                <p className="relative text-sm sm:text-base md:text-lg lg:text-xl text-green-200/90 max-w-3xl px-2 sm:px-0">
                    Discover all the events you’ve joined in one elegant space. Stay connected, revisit details, and never miss an opportunity to engage.
                </p>
            </div>

            <div className="mx-auto w-full flex justify-center px-2 sm:px-4 lg:px-0">
                {
                    data.length == 0 ?
                        <div><div className="w-full flex justify-center items-center min-h-[200px] sm:min-h-[250px]">
                            <div className="flex flex-col items-center justify-center gap-4 p-6 sm:p-8 md:p-10 bg-[#638a65] rounded-2xl shadow-xl border border-white/20 w-full max-w-md text-center">

                                {/* Icon */}
                                <svg
                                    className="w-16 h-16 sm:w-20 sm:h-20 text-green-100 opacity-80"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12h6m-3-3v6m2 5H7a2 2 0 01-2-2V7a2 2 0 012-2h5l5 5v7a2 2 0 01-2 2z"
                                    />
                                </svg>

                                {/* Heading */}
                                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                                    No Events Found
                                </h2>

                                {/* Subtext */}
                                <p className="text-sm sm:text-base text-green-200/80">
                                    You haven’t joined any events yet. Explore events and start participating to see them here.
                                </p>

                                {/* Action Button
                                    <button className="mt-3 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-[#a3e635] to-[#4ade80] text-[#17483d] font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                        Browse Events
                                    </button> */}
                            </div>
                        </div>
                        </div> :
                        <ul className="flex border border-amber-400 flex-col lg:mx-50 mx-10 px-4 lg:px-7 w-full max-w-6xl bg-base-100 rounded-box shadow-md lg:pb-5 mb-7">

                            {/* List Title */}
                            <li className="p-4 pb-2 px-6  lg:pb-6 my-auto text-xs sm:text-sm opacity-60 tracking-wide">
                                All the events you’ve joined
                            </li>


                            <div>
                                {data.map((x, i) => (
                                    <li
                                        key={i}
                                        className="relative lg:mb-6 mb-2 flex flex-col sm:flex-row items-center sm:items-start gap-4 p-3 md:p-4 bg-[#638a65] rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 w-full"
                                    >
                                        {/* Index */}
                                        <div className="text-4xl font-thin tabular-nums flex-shrink-0">{i + 1}</div>

                                        {/* Event Image */}
                                        <div className="flex-shrink-0">
                                            <img
                                                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border-2 border-white/60 shadow"
                                                src={x.image}
                                                alt={x.title}
                                            />
                                        </div>

                                        {/* Event Info */}
                                        <div className="flex-1 flex flex-col justify-center gap-1 text-white truncate w-full">
                                            <div className="text-md sm:text-lg font-bold truncate">{x.title}</div>
                                            <div className="text-xs sm:text-sm uppercase font-semibold opacity-70 flex flex-col lg:flex-row gap-4">
                                                <span className="truncate">{x.description}</span>
                                                <span className="truncate">
                                                    <span className="font-semibold text-[#0a410d]">Organizer:</span> {x.organizer}
                                                </span>
                                            </div>


                                            <div className="flex flex-wrap gap-2 sm:gap-6 text-xs sm:text-sm text-green-100/90 truncate">
                                                <span>
                                                    <span className="font-semibold text-[#0a410d]">Date:</span> {x.date} •
                                                </span>
                                                <span>
                                                    <span className="font-semibold text-[#0a410d]">Location:</span> {x.location} •
                                                </span>
                                                {/* Participants can be uncommented if needed */}
                                                {/* <span><span className="font-semibold">Participants:</span> {x.currentParticipants}</span> */}
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <button onClick={() => deleteevent(x)} className="btn btn-square btn-ghost text-white hover:bg-white/10 mt-2 sm:mt-0 ml-auto flex-shrink-0">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-5 h-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4" />
                                            </svg>
                                        </button>

                                    </li>
                                ))}
                            </div>


                        </ul>}
            </div>
        </div>

    );
};

export default Myevents;