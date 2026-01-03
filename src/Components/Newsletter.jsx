import React, { useState } from "react";
import { GiElectric, GiPalmTree, GiRecycle, GiTrophyCup, GiWaterDrop, GiCarWheel } from "react-icons/gi";
import { useNavigate } from "react-router";

const newsletterData = [
    {
        title: "Save Energy",
        desc: `Reduce <strong>energy consumption</strong> and embrace <strong>renewable solutions</strong> for a cleaner future. Turn off unused lights, unplug devices, and prioritize <strong>energy-efficient appliances</strong>. Encourage your community to adopt <strong>solar panels</strong>, <strong>wind turbines</strong>, or <strong>sustainable energy grids</strong>. Small consistent actions can dramatically reduce your <strong>carbon footprint</strong>. Implementing <strong>behavioral changes</strong> at home and work reinforces sustainable habits. Educate peers about <strong>green energy</strong> to inspire collective action. Remember, conserving electricity preserves <strong>natural resources</strong> and combats <strong>climate change</strong>. Track your energy usage with apps or smart meters to maintain accountability.`,
        icon: <GiElectric size={50} className="text-yellow-500" />,
        vocab: [
            { word: "Carbon Footprint", meaning: "The total greenhouse gases emitted by an individual, organization, or product." },
            { word: "Renewable Solutions", meaning: "Energy sources that replenish naturally like solar, wind, or hydro." },
            { word: "Behavioral Changes", meaning: "Intentional actions to improve sustainability habits." }
        ]
    },
    {
        title: "Plant Trees",
        desc: `Engage in <strong>reforestation efforts</strong> to enhance air quality and biodiversity. Participate in <strong>community tree drives</strong> or adopt a tree near your home. Trees <strong>sequester carbon</strong>, provide shade, and stabilize soil. Diverse tree planting ensures <strong>ecosystem resilience</strong> and supports wildlife. Promote awareness about <strong>afforestation</strong> in local schools and organizations. Caring for trees improves <strong>microclimate regulation</strong> and mitigates urban heat. Document growth and create stories to inspire more people to join. Ultimately, every tree contributes to a <strong>healthier planet</strong>.`,
        icon: <GiPalmTree size={50} className="text-green-700" />,
        vocab: [
            { word: "Reforestation", meaning: "The process of planting trees to restore a forest." },
            { word: "Sequester Carbon", meaning: "Capture and store carbon dioxide from the atmosphere." },
            { word: "Afforestation", meaning: "Planting trees in areas that were not previously forested." }
        ]
    },
    {
        title: "Reduce Plastic",
        desc: `Minimize <strong>plastic waste</strong> by choosing sustainable alternatives. Carry <strong>reusable bags</strong>, bottles, and containers. Avoid <strong>single-use plastics</strong> that harm oceans and landfills. Engage in <strong>community cleanups</strong> to remove litter and educate others. Support brands that prioritize <strong>biodegradable packaging</strong>. Recycling and <strong>repurposing</strong> materials can drastically reduce environmental impact. Raise awareness about <strong>microplastics</strong> and their effect on wildlife. Every conscious choice contributes to <strong>environmental preservation</strong> and cleaner surroundings.`,
        icon: <GiRecycle size={50} className="text-blue-500" />,
        vocab: [
            { word: "Biodegradable", meaning: "Capable of being decomposed by natural processes." },
            { word: "Microplastics", meaning: "Tiny plastic particles harmful to aquatic life and ecosystems." },
            { word: "Repurposing", meaning: "Reusing an item for a different, sustainable purpose." }
        ]
    },
    {
        title: "Take Challenges",
        desc: `Participate in <strong>eco-challenges</strong> to motivate yourself and your community. Examples include <strong>zero-waste weeks</strong>, <strong>tree planting contests</strong>, or <strong>plastic-free days</strong>. Challenges foster <strong>accountability</strong> and create a <strong>culture of sustainability</strong>. Document progress and share results to inspire collective action. Encourage friends, family, and colleagues to adopt <strong>green habits</strong>. Celebrate achievements to reinforce positive behavior. Small challenges lead to <strong>cumulative environmental benefits</strong>, creating measurable impact. Your participation demonstrates <strong>environmental leadership</strong> in practice.`,
        icon: <GiTrophyCup size={50} className="text-purple-500" />,
        vocab: [
            { word: "Eco-Challenges", meaning: "Organized tasks promoting environmentally friendly habits." },
            { word: "Accountability", meaning: "Being responsible for actions and outcomes." },
            { word: "Cumulative Benefits", meaning: "Accumulated positive impact over time." }
        ]
    },
    {
        title: "Water Conservation",
        desc: `Use <strong>water resources</strong> wisely to protect this essential element. Fix leaks, install <strong>low-flow devices</strong>, and avoid unnecessary wastage. Collect <strong>rainwater</strong> and reuse <strong>greywater</strong> when possible. Promote <strong>sustainable irrigation</strong> and <strong>landscape planning</strong> to optimize water use. Educate the community about <strong>aquifer depletion</strong> and water scarcity. Every liter saved contributes to <strong>ecosystem balance</strong>. Incorporate <strong>water-smart habits</strong> in daily life. Protecting water ensures future generations have access to clean, safe water.`,
        icon: <GiWaterDrop size={50} className="text-cyan-500" />,
        vocab: [
            { word: "Greywater", meaning: "Relatively clean wastewater from sinks, showers, or washing machines reused for irrigation." },
            { word: "Aquifer Depletion", meaning: "The reduction of underground water reserves." },
            { word: "Low-flow Devices", meaning: "Faucets or showers designed to use less water." }
        ]
    },
    {
        title: "Clean Transportation",
        desc: `Adopt <strong>sustainable transportation</strong> methods to reduce emissions. Walk, cycle, or use <strong>public transport</strong> whenever possible. Carpooling decreases <strong>carbon output</strong> and traffic congestion. Support infrastructure for <strong>electric vehicles</strong> and <strong>green mobility</strong>. Reduce dependence on fossil fuels to protect air quality. Advocate for <strong>urban planning</strong> that prioritizes pedestrians and cyclists. Encourage community engagement in <strong>transportation sustainability programs</strong>. Cleaner commuting options improve <strong>public health</strong> and environmental well-being.`,
        icon: <GiCarWheel size={50} className="text-gray-700" />,
        vocab: [
            { word: "Sustainable Transportation", meaning: "Transport methods that minimize environmental impact." },
            { word: "Carbon Output", meaning: "The amount of CO2 produced by vehicles or activities." },
            { word: "Green Mobility", meaning: "Transportation practices that are eco-friendly and efficient." }
        ]
    },
];

const ITEMS_PER_PAGE = 2;

const GreenNewsletter = () => {
    const [page, setPage] = useState(0);
    const Navigate = useNavigate()
    const totalPages = Math.ceil(newsletterData.length / ITEMS_PER_PAGE);

    const currentItems = newsletterData.slice(
        page * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );

    return (
        //f8f4ea
        <section
            id="newletter"
            className="bg-[#17483d]  px-6 md:px-35 py-16"
        >

            <div className="bg-[#f1e6d0]  rounded-[50px] lg:rounded-[70px] shadow-2xl">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center">

                    <h2 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-8 tracking-wide">
                        Green Newsletter
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 mb-5">
                        {currentItems.map((item, idx) => (
                            <div
                                key={idx}
                                //bg-[#ddcca9]
                              
                                className="  bg-gradient-to-r from-[#b1c466] to-[#44633b] shadow-3xl rounded-sm p-6 md:p-6 border-green-700 hover:shadow-3xl transform transition hover:-translate-y-1 text-left"
                            >
                                <div className="flex items-center mb-4 space-x-2">
                                    <h3 className="text-2xl font-bold text-white -rotate-1">
                                        {item.title}
                                    </h3>
                                </div>

                                <p
                                    className="text-white text-justify leading-relaxed border-t border-gray-600 pt-2"
                                    dangerouslySetInnerHTML={{ __html: item.desc }}
                                />

                                <div className="mt-5 text-left">
                                    <span className="text-sm text-white uppercase tracking-wider font-semibold">
                                        Vocabulary / Premium Words:
                                    </span>
                                    <ul className="text-sm text-white mt-1 list-disc list-inside">
                                        {item.vocab.map((v, i) => (
                                            <li key={i}>
                                                <strong>{v.word}:</strong> {v.meaning}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* PAGINATION — UNCHANGED */}
                    <div className="flex justify-center items-center gap-3 flex-wrap">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i)}
                                className={`px-3 py-1 rounded-full font-semibold transition ${page === i
                                    ? "bg-green-800 text-white shadow-lg"
                                    : "bg-green-100 text-green-900 hover:bg-green-300"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                    <section className="py-20 ">
                        <div className="max-w-4xl mx-auto px-6">

                            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#17483d] mb-4">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-center text-gray-600 mb-12">
                                Everything you need to know before getting started
                            </p>

                            <div className="space-y-5">
                                {[
                                    {
                                        q: "What is EcoTrack?",
                                        a: "EcoTrack is a platform that helps you participate in real-world eco challenges and track your environmental impact.",
                                    },
                                    {
                                        q: "Is EcoTrack free to use?",
                                        a: "Yes, EcoTrack is completely free for users who want to join challenges and read articles.",
                                    },
                                    {
                                        q: "How do eco challenges work?",
                                        a: "You join a challenge, complete eco-friendly actions, and submit proof to earn points and impact stats.",
                                    },
                                    {
                                        q: "Can I track my progress?",
                                        a: "Absolutely. Your dashboard shows completed challenges, points, and environmental impact.",
                                    },
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition"
                                    >
                                        <h3 className="font-semibold text-lg text-[#17483d] mb-2">
                                            {item.q}
                                        </h3>
                                        <p className="text-gray-600">{item.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="max-w-5xl mx-auto md:mt-10 px-6 text-center">

                            <h2 className="text-3xl md:text-5xl font-extrabold text-primary mb-6">
                                Ready to Make a Real Impact?
                            </h2>

                            <p className="text-[#408360] text-base md:text-lg max-w-2xl mx-auto mb-10">
                                Join EcoTrack today and turn your everyday actions into meaningful change for the planet.
                            </p>

                            <button
                                onClick={() =>
                                    Navigate('/allchallenges')


                                }
                                className="px-10 py-4 rounded-full bg-primary
                 text-white font-bold text-lg shadow-xl
                 hover:scale-105 hover:shadow-2xl transition-all duration-300"
                            >
                                Join EcoTrack
                            </button>
                        </div>
                    </section>
                </div>

            </div>

        </section>

    );
};

export default GreenNewsletter;
