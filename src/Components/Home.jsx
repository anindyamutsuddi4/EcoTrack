import React, { use, useEffect, useState } from "react";
import Somechallenges from "./Somechallenges";
import Challenges from "./Challenges";
import { NavLink } from "react-router";
import { AuthContext } from "./AuthContext";
import Tips from "./Tips";
import Righttips from "./Righttips";


const Home = () => {
    const [challenges, setChallenges] = useState([]);
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
            .then(data => settips(data)
                //console.log(challenges)}
            );
    }, []);

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
            <div className="bg-[#FBEDC3] pt-15 pb-10 mt-2 mx-3 px-2 lg:mx-35 rounded-[50px] md:rounded-[100px]">
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
            </div>

        </div>
    );
};

export default Home;
