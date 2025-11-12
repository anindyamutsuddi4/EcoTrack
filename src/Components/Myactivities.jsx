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
            setvalue(results); // now value is an array of challenge objects
        } catch (err) {
            console.error(err);
        }
    };

    fetchChallenges();
}, [data]);
    return (
       <div className="bg-[#17483d] pt-20  md:pt-38 pb-16 px-4 lg:px-50">
  <div className="text-center mb-8 px-2 md:px-4 lg:px-0">
    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white lora">
      My Challenge Collection
    </h2>
    <p className="mt-2 mb-15 text-gray-300 text-sm md:text-lg">
      Here are all the challenges I’ve taken so far — track your progress and achievements!
    </p>
  </div>


  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 px-2 md:px-4 lg:px-0">
    {value.map((x, index) => (
      <Myallchallenges key={index} x={x} />
    ))}
  </div>
</div>

    );
};

export default Myactivities;