import React, { use } from 'react';
import { AuthContext } from './AuthContext';

import { NavLink, useNavigate } from 'react-router';
//import { toast } from 'react-toastify';
//import { useRef } from "react";
import { BsFillPinFill } from "react-icons/bs";
import { RiEditCircleFill } from "react-icons/ri";
import DemoChallengeGraph from './Stats';
import DemoRemainingDaysChart from './statsRemainingDays';
import ImpactDurationChart from './Stats3';
//import useRole from './useRole';
const DashboardHome = () => {
    const { user } = use(AuthContext)
    // const { role } = useRole()
    // const [deleteid, setdeleteid] = useState(0)
    // const modalRef = useRef(null);

    // const axiosSecure = useAxiosSecure()
    const Navigate = useNavigate()
    // // const [filter, setFilter] = useState('all');
    // // const [totalpage, settotalpage] = useState(0)
    // //  const [currentpage, setcurrentpage] = useState(0)
    // const limit = 3
    // const { refetch, data: response = { data: [], totalCount: 0 } } = useQuery({
    //     queryKey: ['users', user?.email],
    //     enabled: !!user?.email,
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/requests/${user.email}?limit=${limit}`)
    //         return res.data
    //     }
    // })

    // const changedata = id => {
    //     const data = { status: "done" }
    //     axiosSecure.patch(`/requests/${id}`, data)
    //         .then(res => {
    //             if (res.data.modifiedCount) {
    //                 //console.log("ok")
    //                 toast('Status is updated successfully')
    //                 refetch()
    //             }
    //         })
    //         .catch(err => console.error(err));
    // }
    // const changedata2 = id => {
    //     const data = { status: "cancelled" }
    //     axiosSecure.patch(`/requests/${id}`, data)
    //         .then(res => {
    //             if (res.data.modifiedCount) {
    //                 //console.log("ok")
    //                 toast('Status is updated successfully')
    //                 refetch()
    //             }
    //         })
    //         .catch(err => console.error(err));
    // }
    // const deleterequest = id => {
    //     axiosSecure.delete(`/requests/${id}`)
    //         .then(res => {
    //             if (res.data.deletedCount) {
    //                 //console.log("ok")
    //                 toast('Request deleted successfully')
    //                 refetch()
    //             }
    //         })
    //         .catch(err => console.error(err));
    // }

    // // console.log(response3)
    // const items = response.data;

    return (

        <section className="text-white bg-primary min-h-screen w-full lg:pb-9 pb-3 flex flex-col justify-center">
            <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:pt-12 pb-16 z-10">
                <div className="relative bg-[#debf0d] backdrop-blur-lg rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/10 overflow-hidden">
                    {/* bg-gradient-to-r from-[#3B6E50] to-[#1F4730] */}
                    {/* Decorative floating elements */}
                    <div className="absolute -top-16 -left-16 w-64 h-64 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl animate-pulse"></div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8 gap-6 text-center sm:text-left relative z-10">

                        {/* Icon */}
                        <div className="flex-shrink-0 mx-auto sm:mx-0">
                            <div className="w-24 h-24 rounded-full bg-green-700/25 ring-4 ring-green-400/60 flex items-center justify-center shadow-xl">
                                <svg className="w-12 animate-pulse h-12 text-green-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 21s-6-4.35-8-7.5A5 5 0 0 1 9 6c1.6 0 2.4.9 3 2 .6-1.1 1.4-2 3-2a5 5 0 0 1 5 7.5C18 16.65 12 21 12 21z" />
                                </svg>
                            </div>
                        </div>

                        {/* Text content */}
                        <div className="flex flex-col items-center sm:items-start">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-white/95">
                                Welcome Back, <span className="text-primary lora">{user?.displayName || "User"}</span>
                            </h1>
                            <p className="mt-4 text-lg sm:text-xl text-white/90 max-w-2xl leading-relaxed">
                                Track your eco-friendly actions, join challenges, and see your impact grow. Every step toward a sustainable future matters!
                            </p>

                            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
                                <button
                                    onClick={() => {
                                        const nextSection = document.getElementById("statssection");
                                        if (nextSection) {
                                            nextSection.scrollIntoView({ behavior: "smooth" });
                                        }
                                    }}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white bg-primary hover:text-primary hover:bg-white lora shadow-lg hover:scale-105 transition-transform"
                                >
                                    Explore Stats
                                </button>
                                <button onClick={() => Navigate(`/dashboard/myactivities/${user?.email}`)} className="inline-flex bg-white text-primary hover:bg-primary hover:text-white items-center gap-2 px-6 py-3 rounded-full border lora border-white/20   shadow transition">
                                    View My Progress
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom glow for premium feel */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-200/15 rounded-full blur-2xl animate-pulse"></div>
                </div>
            </div>

            <div id='statssection' className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-wide">
                    Global Stats
                </h2>
                <p className="mt-2 text-white/70 text-sm sm:text-base">
                    Overview of all challenges and participants worldwide
                </p>
            </div>

            <DemoChallengeGraph></DemoChallengeGraph>
            <DemoRemainingDaysChart></DemoRemainingDaysChart>
            <ImpactDurationChart ></ImpactDurationChart>
        </section>







    );
};

export default DashboardHome;