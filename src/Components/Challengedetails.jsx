import React, { use, useEffect, useState } from 'react';
import { NavLink, useLoaderData } from 'react-router';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
} from "recharts";
const Challengedetails = () => {
    const challenge = useLoaderData();
    const { user } = use(AuthContext)

    //console.log(challenge)
    const [participants, setParticipants] = useState(challenge.participants);
    const [refresh, setRefresh] = useState(false);
    // Fetch participants when component mounts
    useEffect(() => {
        const fetchParticipants = async () => {
            const res = await fetch(`https://ecotrack-server-side.vercel.app/challenges/${challenge._id}`);
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
            const res = await fetch(`https://ecotrack-server-side.vercel.app/myactivities/${user.email}`);
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
        // setloading(true)
        if (!toggle) {
            const data = {
                userId: user.email, // e.g., unique user id or email.
                challengeid: challenge._id,
                title: challenge.title,
                category: challenge.category,
                description: challenge.description,
                duration: challenge.duration,
                target: challenge.target,
                participants: challenge.participants + 1,
                impactMetric: challenge.impactMetric,
                createdBy: challenge.createdBy,
                startDate: challenge.startDate,
                endDate: challenge.endDate,
                imageUrl: challenge.imageUrl,
                totalImpact: challenge.totalImpact,
                status: "Not Started",// e.g., &quot;Not Started&quot;, &quot;Ongoing&quot;, &quot;Finished&quot;progress: 0,
                joinDate: new Date()
            }

            await fetch(`https://ecotrack-server-side.vercel.app/challenges/join/${challenge._id}`,
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
            await fetch(`https://ecotrack-server-side.vercel.app/challenges/${challenge._id}/join`,
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
            fetch(`https://ecotrack-server-side.vercel.app/myactivities/${user.email}`,
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
            //    .finally(() => setloading(false))
        }
    }

    const statsData = [
        { name: "Participants", value: participants },
        { name: "Total Impact", value: challenge.totalImpact },
        { name: "Days", value: challenge.duration },
    ];

    return (
        <div className="min-h-screen w-full bg-[#17483d]  flex flex-col justify-center items-start pt-20 px-4 ">
            <div className=" mx-auto px-4 mt-12 flex flex-col lg:flex-row items-start gap-8">


                <div className="bg-[#d3b613] lg:max-w-3xl w-full rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
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
                                <h3 className="text-lg font-bold text-yellow-700">{challenge.totalImpact} {challenge.impactMetric}</h3>
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
                                        width: `${new Date(challenge.startDate) <= new Date() &&
                                            new Date(challenge.endDate) >= new Date()
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
                            {user ? (
                                toggle ? (
                                    <button onClick={onclick} className="px-5 py-2 bg-[#17483d] text-white text-sm rounded-full shadow transition">
                                        Joined
                                    </button>
                                ) : (
                                    <button onClick={onclick} className="px-5 py-2 bg-[#17483d] text-white text-sm rounded-full shadow transition">
                                        Join Challenge
                                    </button>
                                )
                            ) : (
                                <NavLink to='/login' state={location?.pathname || '/'}>
                                    <button className="px-5 py-2 bg-[#17483d] text-white text-sm rounded-full shadow transition">
                                        Join Challenge
                                    </button>
                                </NavLink>
                            )}
                        </div>

                    </div>
                </div>


                <img
                    src={challenge?.imageUrl}
                    alt={challenge.title}
                    className="border-2 border-yellow-500 w-full max-w-[376px] aspect-square object-cover rounded-2xl shadow-2xl"
                />

            </div>

            <h2 className="animate-bounce bg-white text-3xl text-center mx-auto  md:text-4xl font-extrabold text-[#2a561e] px-6 py-2 rounded-md   mt-16  inline-block ">
                Statistics
            </h2>

            <div className="lg:max-w-6xl lg:w-4xl mb-6 min-w-[320px] md:min-w-xl lg:mb-14 mx-auto px-2 ">


                <div className=" bg-white rounded-md shadow-xl border border-gray-200 p-3 px-1 md:p-4 lg:p-8">
                    <h2 className="text-xl md:text-2xl font-bold text-black mb-4 pl-3">Challenge Statistics</h2>

                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={statsData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#4ade80" barSize={40} radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>

                    {/* Optional: Start / End Dates below chart */}
                    <div className="flex justify-between text-xs text-gray-700 mt-4">
                        <span>Start: {challenge.startDate}</span>
                        <span>End: {challenge.endDate}</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Challengedetails;
