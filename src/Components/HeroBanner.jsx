import { useEffect, useState } from "react";

const slides = [
    {
        title: "Protect Our Planet",
        desc: "Join EcoTrack challenges to restore nature and protect the Earth for future generations.",
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    },
    {
        title: "Greener Actions Matter",
        desc: "Small sustainable steps create a massive environmental impact.",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
    {
        title: "Clean Air, Clean Future",
        desc: "Reduce pollution and build a breathable world together.",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    },
    {
        title: "Save Wildlife",
        desc: "Protect forests and wildlife through real-world eco challenges.",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    },
    {
        title: "Sustainable Living",
        desc: "Adopt habits that help the Earth thrive naturally.",
        image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff",
    },
    {
        title: "Act for Climate",
        desc: "Be part of the solution against climate change.",
        image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
    },
    {
        title: "Nature Needs You",
        desc: "Every action counts when it comes to saving our planet.",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b",
    },
];

export default function EcoHeroSlider() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="w-full min-h-screen flex items-center bg-gradient-to-r from-[#FFF3C4] via-[#FFD6C9] to-[#FFC1B6]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#17483d] mb-4 sm:mb-5 leading-tight">
                {slides[index].title}
            </h1>

            <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
                {slides[index].desc}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <button
                    onClick={() => {
                        document
                            .getElementById("eco-challenges")
                            ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-6 py-3 rounded-full bg-[#17483d] text-white font-semibold hover:opacity-90 transition"
                >
                    Join Eco Challenges
                </button>

                <button
                    onClick={() => {
                        document
                            .getElementById("newletter")
                            ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-6 py-3 rounded-full bg-white text-[#17483d] font-semibold shadow hover:shadow-md transition"
                >
                    Read Articles
                </button>
            </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
            <img
                src={slides[index].image}
                alt=""
                className="w-full h-[260px] sm:h-[340px] md:h-[420px] lg:h-[480px] object-cover rounded-3xl shadow-2xl transition-all duration-700"
            />
        </div>
    </div>

    {/* SLIDER INDICATORS */}
    <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
            <span
                key={i}
                className={`h-1.5 w-6 rounded-full transition-all ${
                    i === index ? "bg-[#17483d]" : "bg-[#17483d]/30"
                }`}
            />
        ))}
    </div>
</section>

    );
}
