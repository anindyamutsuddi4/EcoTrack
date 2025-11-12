import React, { useEffect, useState } from 'react';
import Challenges from './Challenges';
import { AuthContext } from './AuthContext';

const Allchallenges = () => {
    const [challenges, setChallenges] = useState([]);
    //const {setloading}=use(AuthContext)
    useEffect(() => {
        //setloading(true)
        fetch("http://localhost:3000/allchallenges")
            .then(res => res.json())
            .then(data => setChallenges(data))
        //.finally(() => setloading(false))
    }, []);
    return (
        <div className='bg-[#17483d]'>
            {<div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-20 lg:px-56 pt-30">{
                challenges.map(x => (<Challenges key={x._id} x={x}></Challenges>))
            }</div>}
        </div>
    );
};

export default Allchallenges;