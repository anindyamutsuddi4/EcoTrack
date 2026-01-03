import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { ImQuotesLeft } from "react-icons/im";
const blogData = [
  {
    name: "Alice Johnson",
    image: "https://i.ibb.co.com/DHWZHfy2/e708e33c36a0a8c4268ae2dc08e8d161.jpg",
    desc: "I started my journey by reducing household energy consumption. I switched to LED lights, installed solar panels, and motivated my neighbors to adopt greener routines. My challenge was to cut my carbon footprint by 50% within a year, and I succeeded while inspiring others along the way.",
  },
  {
    name: "Mark Thompson",
    image: "https://i.ibb.co.com/v4nZTPyT/1c1a15778b7c6e6bb64ac2950735ab7b.jpg",
    desc: "I began planting trees in my local community park. I faced challenges organizing volunteers and sourcing seedlings, but I turned it into a successful monthly tree-planting event, restoring over 200 trees in my neighborhood.",
  },
  {
    name: "Sophia Lee",
    image: "https://i.ibb.co.com/MxB6J3yZ/9fe0ed38736df417df4691947be72269.jpg",
    desc: "I embraced a zero-waste lifestyle. I eliminated single-use plastics, composted organic waste, and created DIY recycling solutions. My challenge was a 30-day plastic-free journey that became a popular community initiative.",
  },
  {
    name: "Daniel Kim",
    image: "https://i.ibb.co.com/twWjP8xq/6948e7201a731b0234150ce146dd68a7.jpg",
    desc: "I took part in city-wide eco-challenges, promoting bike commuting and clean transportation. I tracked my weekly carbon savings and shared tips with colleagues, motivating over 50 people to reduce car usage.",
  },
  {
    name: "Olivia Brown",
    image: "https://i.ibb.co.com/hxBk4kJM/4dc9e8782546ee29fb5218fd19c51bb7.jpg",
    desc: "I focused on water conservation in my apartment building. I installed water-saving devices, ran awareness workshops, and challenged residents to cut water usage by 25%, achieving remarkable results in just six months.",
  },
  {
    name: "Liam Smith",
    image: "https://i.ibb.co.com/93SVgMds/67f648a615b6c8bfb39dea98e5a45c59.jpg",
    desc: "I launched a neighborhood recycling challenge. I set up collection points for plastic, paper, and electronics, and created friendly competitions between streets. My challenge journey educated hundreds and significantly reduced local waste.",
  },
];

const BlogsCarousel = () => {
  const settings = {
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 3,
    infinite: true,
    speed: 500,
    swipeToSlide: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, centerMode: true },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, centerMode: true },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, centerMode: true },
      },
    ],
  };

  return (
    <section className="bg-[#f1e6d0] py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center mt-5 mb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-2">
          🌿 Activist's Blog
        </h2>
        <p className="text-lg md:text-xl text-green-800">
          Explore challenges, share your experiences with us, and make the world better.
        </p>
      </div>

      <Slider {...settings}>
        {blogData.map((blog, idx) => (
          <div key={idx} className="px-1">
            <div className="relative bg-[#17483d] rounded-3xl shadow-2xl overflow-hidden transition-transform duration-500 transform hover:scale-105 w-[85%] mx-auto h-[500px]">
              
          
              <img
                src={blog.image}
                alt={blog.name}
                className="w-full h-[45%] object-cover transition-transform duration-500"
              />

              
              <div className="p-4 md:p-6 text-left h-[55%] flex flex-col justify-center">
               
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-center text-white mb-2">
                  {blog.name}
                </h3>
                <p className="text-white   gap-2 leading-relaxed text-sm md:text-[14px] text-justify">
                <span><ImQuotesLeft /> </span> {blog.desc}
                </p>
              </div>

            </div>
          </div>
        ))}
      </Slider>

  
      <style jsx global>{`
        .slick-slide {
          transition: transform 0.5s, filter 0.5s, opacity 0.5s;
          filter: blur(2px);
          opacity: 0.7;
          transform: scale(0.9);
        }
        .slick-center {
          filter: blur(0px) !important;
          opacity: 1 !important;
          transform: scale(1) !important;
        }
        .slick-slide:not(.slick-center) img {
          transform: scale(1.00);
        }
      `}</style>
    </section>
  );
};

export default BlogsCarousel;
