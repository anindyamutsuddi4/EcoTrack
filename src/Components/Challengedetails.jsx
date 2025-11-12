import React, { use, useEffect, useState } from 'react';
import { NavLink, useLoaderData, useLocation } from 'react-router';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

const Challengedetails = () => {
    const challenge = useLoaderData();
    const { user } = use(AuthContext)

    //console.log(challenge)
    const [participants, setParticipants] = useState(challenge.participants);
    const [refresh, setRefresh] = useState(false);
    // Fetch participants when component mounts
    useEffect(() => {
        const fetchParticipants = async () => {
            const res = await fetch(`http://localhost:3000/challenges/${challenge._id}`);
            const data = await res.json();
            setParticipants(data.participants);
        };
        fetchParticipants();
    }, [challenge._id, refresh]);
    //const [value,setvalue]=useState([])
    const [toggle, settoggle] = useState(false)

    useEffect(() => {
            if (!user) return
        const fetchParticipants = async () => {
            const res = await fetch(`http://localhost:3000/myactivities/${user.email}`);
            const data = await res.json();
            //setParticipants(data.participants);
            const y = data.find(x => x.challengeid === challenge._id)
            if (y) {
                settoggle(true)
                return
            }

        };
        fetchParticipants();
    }, [challenge._id, user]);
    // if (!user) {
    //     return (
    //         <div className="min-h-screen flex justify-center items-center">
    //             Loading...
    //         </div>
    //     );
    // }
    const onclick = async () => {
        //setvalue(val)
        if (!toggle) {
            const data = {
                userId: user.email, // e.g., unique user id or email.
                challengeid: challenge._id,
                status: "Not Started",// e.g., &quot;Not Started&quot;, &quot;Ongoing&quot;, &quot;Finished&quot;progress: 0,
                joinDate: new Date()
            }

            await fetch(`http://localhost:3000/challenges/join/${challenge._id}`,
                {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(data),

                }).then(res => res.json())
                .then(
                    data => {
                        console.log('data after user save', data)
                        toast("You successfully joined the challenge")
                    }
                )
            await fetch(`http://localhost:3000/challenges/${challenge._id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ incrementParticipants: true }),

                })

            // .then(res => res.json())
            // .then(
            //     data => {
            //         console.log('data is updated', data)
            //         // toast("You successfully patched the challenge")
            //     }
            // )
            setRefresh(prev => !prev);
            // setParticipants(challenge.participants);
            fetch(`http://localhost:3000/myactivities/${user.email}`,
                {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(data),

                }).then(res => res.json())
                .then(
                    data => {
                        console.log('data after user save', data)
                        // toast("You successfully joined the challenge")
                    }
                )
                 settoggle(true)
        }
    }
const location=useLocation()


    return (
        <div className="min-h-screen bg-[#17483d]  flex justify-center items-start pt-20 px-4 relative">

            {/* Image */}
            <img
                src={challenge?.imageUrl}
                alt={challenge.title}
                className="relative bounce-slow border-2 border-yellow-500 mt-2 z-10 left-70 w-[376px]  h-[376px] object-cover rounded-2xl shadow-2xl  "
            />

            {/* Card */}
            <div className=" bg-[#d3b613] mt-51 max-w-3xl w-full absolute  rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">

                <div className="p-6 md:p-8">

                    <div className="flex flex-col items-start mb-4">
                        <span className="bg-gray-200 text-sm px-4 py-1 rounded-full font-medium text-gray-800 shadow mb-2">
                            {challenge.category}
                        </span>
                        <h1 className="text-2xl md:text-3xl font-bold text-black">
                            {challenge.title}
                        </h1>
                        <span className="text-sm font-semibold text-black mt-1">
                            {challenge.duration} Days
                        </span>
                    </div>


                    <p className="text-black leading-relaxed max-w-110 text-sm md:text-base mb-4">
                        {challenge.description}
                    </p>


                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                        <div className="bg-green-50 p-3 rounded-xl text-center shadow-sm">
                            <h3 className="text-lg font-bold text-green-700">{participants}</h3>
                            <p className="text-xs text-gray-500">Participants</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-xl text-center shadow-sm">
                            <h3 className="text-lg font-bold text-blue-700">{challenge.target}</h3>
                            <p className="text-xs text-gray-500">Target</p>
                        </div>
                        <div className="bg-yellow-50 p-3 rounded-xl text-center shadow-sm">
                            <h3 className="text-lg font-bold text-yellow-700">{challenge.impactMetric}</h3>
                            <p className="text-xs text-gray-500">Impact</p>
                        </div>
                    </div>


                    <div className="mt-6">
                        <div className="flex justify-between text-xs text-black">
                            <span>Start: {challenge.startDate}</span>
                            <span>End: {challenge.endDate}</span>
                        </div>
                        <div className="w-full h-3 bg-gray-100 rounded-full mt-2 overflow-hidden">
                            <div
                                className="h-3 bg-green-500 rounded-full"
                                style={{
                                    width: `${(new Date(challenge.startDate) <= new Date() &&
                                        new Date(challenge.endDate) >= new Date())
                                        ? ((Date.now() - new Date(challenge.startDate)) /
                                            (new Date(challenge.endDate) - new Date(challenge.startDate))) *
                                        100
                                        : 0
                                        }%`,
                                }}
                            ></div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center mt-6">
                        <p className="text-sm text-gray-600">
                            Created by: <span className="font-semibold text-gray-800">{challenge.createdBy}</span>
                        </p>
                        {user?(
                            toggle ? <button onClick={onclick} className="px-5 py-2 bg-[#17483d] text-white text-sm rounded-full shadow transition">
                                Joined
                            </button> :
                          <button onClick={onclick} className="px-5 py-2 bg-[#17483d] text-white text-sm rounded-full shadow transition">
                                Join Challenge
                            </button>
                        ):(<NavLink to='/login' state={location?.pathname||'/'}> <button  className="px-5 py-2 bg-[#17483d] text-white text-sm rounded-full shadow transition">
                                Join Challenge
                            </button></NavLink>)}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Challengedetails;
