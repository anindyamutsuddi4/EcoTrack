import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import Myallchallenges from './Myallchallenges';

const Myactivities = () => {
  const [value, setvalue] = useState([])
  const data = useLoaderData()
  console.log(data.challengeid)
  console.log(value)
  // useEffect(() => {
  //     // const fetchData = async () => {
  //     //     const data2 = await fetch('http://localhost:3000/allchallenges')
  //     //         .then(res => res.json())

  //     //     const val = data2.filter(x => x._id && x._id.$oid === data.challengeid)
  //     //     setvalue(val)
  //     // }
  //     // fetchData();
  //   // wrap in array for map


  // }, [data?.challengeid])
  const [ongoing, setongoing] = useState(0)
  useEffect(() => {
    if (!data) return
    const count = data.filter(x => x.status === "Ongoing").length;
    setongoing(count)
  }, [data])
    const [finish, setfinish] = useState(0)
  useEffect(() => {
    if (!data) return
    const count = data.filter(x => x.status === "Finished").length;
    setfinish(count)
  }, [data])
  useEffect(() => {
    const fetchChallenges = async () => {
      if (!data || !data.length) return;

      try {
        // Fetch all challenges the user has
        const promises = data.map(item =>
          fetch(`http://localhost:3000/challenges/${item.challengeid}`)
            .then(res => res.json())
        );

        const results = await Promise.all(promises);
        setvalue(results);
      } catch (err) {
        console.error(err);
      }
    };

    fetchChallenges();
  }, [data]);
  return (
    <div className="bg-[#17483d] pt-20  md:pt-33 pb-16 px-4 lg:px-30">



      <div className='px-10 md:px-20  pb-3 rounded-[100px]'>
        <div className="text-center mb-2 px-2 md:px-4 lg:px-0">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#f5e12d] lora">
            My Challenge Collection
          </h2>
          <p className="mt-2 mb-10 text-white text-sm md:text-lg">
            Here are all the challenges I’ve taken so far — track your progress and achievements!
          </p>
        </div>

        <div className="max-w-6xl border-b-2 border-gray-600 mx-auto px-4 pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Card 1 */}
            <div className="relative bg-[#8E988F]
                                rounded-full h-24 flex items-center justify-center shadow-lg
                                transform hover:scale-105 transition-transform duration-300">
              <span className="text-white font-semibold text-lg">Not Started {value.length-ongoing-finish}</span>
            </div>

            {/* Card 2 */}
            <div className="relative bg-[#A2A684]
                                rounded-full h-24 flex items-center justify-center shadow-lg
                                transform hover:scale-105 transition-transform duration-300">
              <span className="text-white font-semibold text-lg">Ongoing {ongoing}</span>

            </div>
            {/* Card 3 */}
            <div className="relative bg-[#966A62]
                                rounded-full h-24 flex items-center justify-center shadow-lg
                                transform hover:scale-105 transition-transform duration-300">
              <span className="text-white font-semibold text-lg">Finished {finish}</span>

            </div>

          </div>
        </div>

        <div className="grid grid-cols-1 mt-14 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 md:px-4 lg:px-0">
          {value.map((x, index) => (
            <Myallchallenges key={index} x={x} />
          ))}
        </div>
      </div>


    </div>

  );
};

export default Myactivities;