import React, { use, useEffect, useState } from "react";
import Somechallenges from "./Somechallenges";
import Challenges from "./Challenges";
import { NavLink } from "react-router";
import { AuthContext } from "./AuthContext";
import Tips from "./Tips";
import Righttips from "./Righttips";
import Events from "./Events";
import SkeletonCard from "./SkeletonCard";


const Home = () => {
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = use(AuthContext)
    useEffect(() => {
        fetch("http://localhost:3000/challenges")
            .then(res => res.json())
            .then(data => setChallenges(data)
                //console.log(challenges)}
            );

    }, []);
    // const [toggle,settoggle]=useState(false)
    const [tips, settips] = useState([])
    useEffect(() => {
        fetch("http://localhost:3000/recentTips")
            .then(res => res.json())
            .then(data => {
                settips(data)
                setLoading(false);
            }
            );
    }, []);
    const [events, setevents] = useState([])
    useEffect(() => {
        fetch("http://localhost:3000/events")
            .then(res => res.json())
            .then(data => setevents(data)
                //console.log(challenges)}
            );
    }, []);
    const [stat, setstat] = useState([])
    useEffect(() => {
        fetch("http://localhost:3000/challenges/69145f6de2bdd25046c0b918")
            .then(res => res.json())
            .then(data => setstat(data)
                //console.log(stat)
            );
    }, []);

    const [stat1, setstat1] = useState([])
    useEffect(() => {
        fetch("http://localhost:3000/challenges/69146057e2bdd25046c0b922")
            .then(res => res.json())
            .then(data => setstat1(data)
                //console.log(stat)
            );
    }, []);

    const [stat2, setstat2] = useState([])
    useEffect(() => {
        fetch("http://localhost:3000/challenges/69145fd2e2bdd25046c0b91b")
            .then(res => res.json())
            .then(data => setstat2(data)
                //console.log(stat)
            );
    }, []);

    // .then(data => {
    //     setstat(data)
    // console.log(stat)}
    //     //console.log(challenges)}
    // );
    // const [stat, setstat] = useState([])

    const slides = [
        {
            img: "/thick-forest-sunlight-scenic-sun-rays-green-forest-nature-pr.jpg",
            title: "Grow a Greener Future",
            desc: "Join sustainability challenges and track your eco-impact.",
        },
        {
            img: "/bc44740d7726b9c02abb61edcac9fe7d.jpg",
            title: "Reduce, Reuse, Recycle",
            desc: "Share eco-friendly tips and inspire your community.",
        },
        {
            img: "/5dfbe3f35b19f0a4672b6219e285b9bd.jpg",
            title: "Act Local, Impact Global",
            desc: "Find and join local green events near you.",
        },
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [slides.length]);

    //  const categories = [
    //     'Energy Conservation',
    //     'Water Conservation',
    //     'Sustainable Transport',
    //     'Green Living',
    //     'Waste Reduction',
    //   ];

    const handleSubmit = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const category = e.target.category.value;
        const description = e.target.description.value;
        const duration = e.target.duration.value;
        const target = e.target.target.value;
        const participants = e.target.participants.value;
        const impactMetric = e.target.impactMetric.value;
        const createdBy = e.target.createdBy.value;
        const startDate = e.target.startDate.value;
        const endDate = e.target.endDate.value;
        const imageUrl = e.target.imageUrl.value;

        const formData = {
            title,
            category,
            description,
            duration,
            target,
            participants,
            impactMetric,
            createdBy,
            startDate,
            endDate,
            imageUrl,
        };
        //console.log('Form Data', formData);
        // Call your API here
        fetch('http://localhost:3000/challenges',
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(formData),

            }).then(res => res.json())
            .then(
                data => {
                    console.log('data after user save', data)
                    e.target.reset()
                }
            )
    };
    return (
        //bg-[#ccc4be]
        //bg-[#17483d] 
        <div className=" bg-[#17483d]  min-h-screen pt-40">
            <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-xl shadow-md">
                <div
                    className="flex transition-transform duration-[2000ms] ease-in-out"
                    style={{ transform: `translateX(-${index * 100}%)` }}
                >
                    {slides.map((slide, i) => (
                        <div key={i} className="min-w-full relative">
                            <img
                                src={slide.img}
                                alt={slide.title}
                                className="w-full h-[450px] object-cover sm:h-[300px]"
                            />
                            <div className="absolute inset-0 bg-black/25 flex flex-col justify-center items-center text-center text-white px-4">
                                <h2 className="text-xl md:text-4xl font-bold mb-2">{slide.title}</h2>
                                <p className="text-base md:text-md">{slide.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center gap-2 mt-4 pb-5">
                {slides.map((_, i) => (
                    <span
                        key={i}
                        className={`h-2 w-2 rounded-full cursor-pointer transition-all ${index === i ? "bg-green-800" : "bg-gray-400"
                            }`}
                        onClick={() => setIndex(i)}
                    ></span>
                ))}
            </div>

            <section className="w-full py-9  flex flex-col items-center text-center">

                <div className="border-t-4 border-[#5C6D66] w-1/4 mb-2"></div>
                <h2 className="text-4xl font-extrabold text-[#5C6D66] mb-7 tracking-tight">
                    Live Community Impact
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-6 md:px-60">
                    <div className="bg-[#5C6D66] text-[#FEFAE0] rounded-2xl shadow-xl py-8 px-4 hover:scale-105 transition-transform duration-300 ease-out">
                        <h3 className="text-lg font-semibold mb-2"> CO₂ Saved</h3>
                        <p className="text-3xl font-extrabold text-[#F2CE05]"> <span className=" font-bold">{stat1.totalImpact}</span> kg</p>
                    </div>
                    <div className="bg-[#FEFAE0] text-[#5C6D66] rounded-2xl shadow-xl py-8 px-4 border border-[#A9B388] hover:scale-105 transition-transform duration-300 ease-out">
                        <h3 className="text-lg font-semibold mb-2">Plastic Reduced</h3>
                        <p className="text-3xl font-extrabold text-[#874830]"><span className=" font-bold">{stat.totalImpact}</span> kg</p>
                    </div>


                    <div className="bg-[#F9EBC7] text-[#5C6D66] rounded-2xl shadow-xl py-8 px-4 border border-[#A9B388] hover:scale-105 transition-transform duration-300 ease-out">
                        <h3 className="text-lg font-semibold mb-2">Water Saved</h3>
                        <p className="text-3xl font-extrabold text-[#874830]"><span className=" font-bold">{stat2.totalImpact}</span> L</p>
                    </div>

                </div>
            </section>



            {/* bg-[#dedad8]  */}
            <div className="bg-[#CCB363] pb-15 mx-3 px-2 lg:mx-35 rounded-[50px] md:rounded-[100px] mt-8">
                <p className="text-5xl  pt-20  font-bold lora text-center">Challenges for you</p>
                <p className="font-md text-center text-gray-600 text-xl pt-2 pb-12">Explore Ongoing Sustainability Challenges and Take Action for a <span className="text-green-900 font-semibold"> Greener </span>
                    Tomorrow...</p>
                <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-10 md:px-26 pt-5">{
                    challenges.map(x => (<Challenges key={x._id} x={x}></Challenges>))
                }</div>
                <NavLink to="/allchallenges">                <button className="mt-10  mx-auto flex justify-center bg-[#17483d] hover:bg-[#0a7f6a] text-white font-medium py-2 px-9 rounded-full transition-colors duration-300">Show All </button>
                </NavLink>
                {
                    user &&
                    <div className=" flex mt-13 justify-center px-6">
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white shadow-lg rounded-2xl p-4 w-full max-w-2xl mx-auto space-y-3"
                        >
                            <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">
                                Create New Challenge
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Title"
                                    className="bg-gray-100 px-2 py-2 rounded-md focus:ring-2 focus:ring-green-500 outline-none text-sm"
                                    required
                                />
                                <select
                                    name="category"
                                    className="bg-gray-100 px-2 py-2 rounded-md focus:ring-2 focus:ring-green-500 outline-none text-sm"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="Energy Conservation">⚡ Energy Conservation</option>
                                    <option value="Water Conservation">💧 Water Conservation</option>
                                    <option value="Sustainable Transport">🚲 Sustainable Transport</option>
                                    <option value="Green Living">🌿 Green Living</option>
                                    <option value="Waste Reduction">♻️ Waste Reduction</option>
                                </select>
                            </div>
                            <textarea
                                name="description"
                                placeholder="Description"
                                rows={2}
                                className="bg-gray-100 px-2 py-2 rounded-md w-full focus:ring-2 focus:ring-green-500 outline-none text-sm"
                                required
                            ></textarea>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                <input
                                    type="number"
                                    name="duration"
                                    placeholder="Duration (days)"
                                    className="bg-gray-100 px-2 py-2 rounded-md focus:ring-2 focus:ring-green-500 outline-none text-sm"
                                    required
                                />
                                <input
                                    type="text"
                                    name="target"
                                    placeholder="Target"
                                    className="bg-gray-100 px-2 py-2 rounded-md focus:ring-2 focus:ring-green-500 outline-none text-sm"
                                    required
                                />
                                <input
                                    type="number"
                                    name="participants"
                                    placeholder="Participants"
                                    className="bg-gray-100 px-2 py-2 rounded-md focus:ring-2 focus:ring-green-500 outline-none text-sm"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <input
                                    type="text"
                                    name="impactMetric"
                                    placeholder="Impact Metric"
                                    className="bg-gray-100 px-2 py-2 rounded-md focus:ring-2 focus:ring-green-500 outline-none text-sm"
                                    required
                                />
                                <input
                                    type="email"
                                    name="createdBy"
                                    placeholder="Created By (email)"
                                    className="bg-gray-100 px-2 py-2 rounded-md focus:ring-2 focus:ring-green-500 outline-none text-sm"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                <input
                                    type="date"
                                    name="startDate"
                                    className="bg-gray-100 px-2 py-2 rounded-md focus:ring-2 focus:ring-green-500 outline-none text-sm"
                                    required
                                />
                                <input
                                    type="date"
                                    name="endDate"
                                    className="bg-gray-100 px-2 py-2 rounded-md focus:ring-2 focus:ring-green-500 outline-none text-sm"
                                    required
                                />
                                <input
                                    type="url"
                                    name="imageUrl"
                                    placeholder="Image URL"
                                    className="bg-gray-100 px-2 py-2 rounded-md focus:ring-2 focus:ring-green-500 outline-none text-sm"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#17483d] mb-1 hover:bg-green-900 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-md text-sm"
                            >
                                Create Challenge
                            </button>
                        </form>
                    </div>}
            </div>
            <div className="bg-[#FBEDC3] pt-15  mt-2 mx-3 px-2 lg:px-0 lg:mx-35 rounded-[50px] lg:rounded-t-[70px] lg:rounded-b-[90px] md:rounded-[100px]">
                <div className="w-full bg-[#FBEDC3] py-3 flex flex-col items-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#874830] mb-4 drop-shadow-md">
                        Some Tips For You
                    </h2>
                    <p className="text-lg md:text-xl text-[#5c4228] text-center max-w-2xl">
                        Discover useful tips and tricks to make your life greener, easier, and more efficient.
                    </p>
                </div>


                {
                    tips.map((x, index) => index % 2 == 0 ?
                        (<Tips key={index} x={x} ></Tips>) :
                        (<Righttips key={index} x={x}></Righttips>))
                }
                <div className="text-center pt-4 mt-14 bg-[#FBEDC3] rounded-xl mx-6 md:mx-20 relative">
                    {/* Top border */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#6B4B3A] rounded-full mt-2"></div>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#6B4B3A] drop-shadow-lg mb-4 mt-6">
                        🌿 Upcoming Green Events
                    </h1>
                    <p className="text-lg md:text-xl text-[#3E3A39]">
                        Join local sustainability activities and make a difference in your community!
                    </p>
                </div>

                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 px-5 md:px-5">
                    { */}

                {<div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2  px-5 md:px-5">{
                    loading
                        ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
                        :
                        events.map(x => <Events key={x._id} x={x}></Events>)
                    //     }
                    // </div>

                } </div>}

                <section className="bg-[#686851] h-full w-full pt-16 py-10 px-6 md:px-20 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#8f917d]/40 to-transparent pointer-events-none"></div>

                    <h2 className="text-4xl font-extrabold text-[#FDF7E4] mb-2 drop-shadow-md">Why Go Green?</h2>
                    <p className="text-[#E8E5D0] text-lg mb-10">Small changes create a big impact. Here’s why it matters:</p>

                    <ul className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
                        <li className="bg-[#F3EEE5] backdrop-blur-lg rounded-xl p-5 border border-[#A9A67E]/30 shadow-md">
                            🌱 <span className="font-semibold text-[#585753]">Save the Planet:</span> Reduce waste, conserve resources.
                        </li>
                        <li className="bg-[#F3EEE5] backdrop-blur-lg rounded-xl p-5 border border-[#A9A67E]/30 shadow-md">
                            💧 <span className="font-semibold text-[#585753]">Protect Nature:</span> Support cleaner air and water.
                        </li>
                        <li className="bg-[#F3EEE5] backdrop-blur-lg rounded-xl p-5 border border-[#A9A67E]/30 shadow-md">
                            ⚡ <span className="font-semibold text-[#585753]">Save Energy:</span> Use smarter, sustainable methods.
                        </li>
                        <li className="bg-[#F3EEE5] backdrop-blur-lg rounded-xl p-5 border border-[#A9A67E]/30 shadow-md">
                            🤝 <span className="font-semibold text-[#585753]">Inspire Others:</span> Lead your community by example.
                        </li>
                    </ul>
                </section>
                <section className="bg-[#686851] rounded-b-[90px] py-16 px-6 md:px-20 text-center relative">
                    <h2 className="text-4xl font-extrabold text-[#F7EFD8] mb-8 drop-shadow-lg">How It Works</h2>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-5xl mx-auto">

                        <div className="flex flex-col items-center bg-[#7B7D66]/60 border border-[#D6CFAF]/30 rounded-2xl p-6 w-full md:w-1/3 shadow-lg hover:scale-105 transition-transform duration-300">
                            <div className="text-3xl mb-3 text-[#F6EFC8]">🫶</div>
                            <h3 className="text-2xl font-semibold text-[#FAF7ED] mb-2">Join a Challenge</h3>
                            <p className="text-[#E8E5D0] text-sm">Choose an eco-friendly challenge and take your first green step.</p>
                        </div>
                        <div className="flex flex-col items-center bg-[#7B7D66]/60 border border-[#D6CFAF]/30 rounded-2xl p-6 w-full md:w-1/3 shadow-lg hover:scale-105 transition-transform duration-300">
                            <div className="text-3xl mb-3 text-[#F6EFC8]">📊</div>
                            <h3 className="text-2xl font-semibold text-[#FAF7ED] mb-2">Track Progress</h3>
                            <p className="text-[#E8E5D0] text-sm">See your impact in real time and celebrate milestones.</p>
                        </div>
                        <div className="flex flex-col items-center bg-[#7B7D66]/60 border border-[#D6CFAF]/30 rounded-2xl p-6 w-full md:w-1/3 shadow-lg hover:scale-105 transition-transform duration-300">
                            <div className="text-3xl mb-3 text-[#F6EFC8]">💬</div>
                            <h3 className="text-2xl font-semibold text-[#FAF7ED] mb-2">Share Tips</h3>
                            <p className="text-[#E8E5D0] text-sm">Spread ideas and inspire others to live sustainably.</p>
                        </div>
                    </div>
                </section>
            </div>




        </div>
    );
};

export default Home;
