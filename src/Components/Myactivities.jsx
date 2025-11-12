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
        <div className='pt-20 grid lg:grid-cols-3 mx-50 gap-5'>
            {
                value.map((x,index) => (<Myallchallenges key={index} x={x}></Myallchallenges>))
            }
        </div>
    );
};

export default Myactivities;