import React, { useEffect, useState } from 'react';
import Challenges from './Challenges';
import { AuthContext } from './AuthContext';
import Challengedescription from './Challengedescription';
import SkeletonCard from './SkeletonCard';

const Allchallenges = () => {
    const [challenges, setChallenges] = useState([]);
    const [filter, setfilter] = useState([])
    const [loading, setLoading] = useState(true);
    const [loadingdescriptions, setLoadingdescriptions] = useState(true);
    const [participantnumber, setparticipantnumber] = useState('');
    //const {setloading}=use(AuthContext)
    useEffect(() => {
        //setloading(true)
        fetch("http://localhost:3000/allchallenges")
            .then(res => res.json())
            .then(data => {
                setChallenges(data)
                setLoading(false);
            })
        //.finally(() => setloading(false))
    }, []);
    const [description, setdescription] = useState([])
    const [filtereddescription, setfiltereddescription] = useState([])
    useEffect(() => {
        //setloading(true)
        fetch("http://localhost:3000/categorydescription")
            .then(res => res.json())
            .then(data => {
                setdescription(data)
                setLoadingdescriptions(false)
            }
            )
        //.finally(() => setloading(false))
    }, []);
    const overallDescription = [
        {
            _id: "overall-1",
            title: "All",
            emoji: "🌍",
            description: `Welcome to EcoTrack! This platform brings together a variety of sustainability challenges to help you take meaningful action for a greener future.  
Energy conservation challenges teach you how to reduce electricity usage and adopt renewable energy solutions in daily life.  
Water conservation focuses on smart usage, rainwater harvesting, and minimizing wastage in homes and workplaces.  

Sustainable transport encourages biking, walking, carpooling, and using public transportation to lower carbon emissions.  

Green living promotes planting trees, using eco-friendly products, and supporting local sustainable businesses.  

Waste reduction guides you through recycling, composting, upcycling, and minimizing single-use plastics.  

Each challenge includes actionable tips and steps you can integrate into your daily routine.  

By participating, you contribute to a cleaner planet and inspire others to adopt sustainable habits.  

Select a category above to learn more and start making a real impact today.  

Every small step counts towards a healthier, greener, and more sustainable world!`
        }
    ];

    const [selected, setselected] = useState('Select one ⬇️')
    const handleSelect = (value) => {
        setselected(value)
        setfilter(challenges.filter(x => x.category == value))
        setfiltereddescription(description.filter(x => x.title == value))
    }
    const [par, setpar] = useState([])
    const handleSelect2 = (value) => {
        setpar(challenges.filter(x => x.participants == value))
        //setfiltereddescription(description.filter(x => x.title == value))
    }
    // const displayedchallenges = filter.length > 0 ? filter : challenges;
    const displayedescription = filter.length > 0 ? filtereddescription : overallDescription;

    const displayedchallenges = challenges.filter(challenge => {
        const Para = par.length > 0 ? par.includes(challenge) : true;
        const Other = filter.length > 0 ? filter.includes(challenge) : true;
        return par.length > 0 ? Para && Other : Other;
    });


    return (
        <div className='bg-[#17483d] max-w-screen'>

            <div className="flex flex-col sm:flex-row justify-end gap-4 mb-5 pt-25 lg:pt-30 lg:pr-10">
                <div className="w-full sm:w-auto flex justify-end pr-10 md:pr-1">
                    <div className="dropdown dropdown-hover">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn border-none text-black shadow-md 
                hover:scale-105 transition-transform
             md:text-sm px-3 py-2 sm:px-4 sm:py-3"
                        >
                            {selected}
                        </div>

                        <ul
                            tabIndex={0}
                            className="dropdown-content z-[100] menu p-2 shadow-lg 
                bg-base-100 rounded-xl w-44 sm:w-60  text-[10px]  md:text-sm"
                        >
                            <li><a onClick={() => handleSelect("Energy Conservation")}>⚡ Energy Conservation</a></li>
                            <li><a onClick={() => handleSelect("Water Conservation")}>💧 Water Conservation</a></li>
                            <li><a onClick={() => handleSelect("Sustainable Transport")}>🚲 Sustainable Transport</a></li>
                            <li><a onClick={() => handleSelect("Green Living")}>🌿 Green Living</a></li>
                            <li><a onClick={() => handleSelect("Waste Reduction")}>♻️ Waste reduction</a></li>
                        </ul>
                    </div>
                </div>
                <div className="join px-21 md:px-1 md:pr-10 flex w-full sm:w-auto">
                    <div className="w-full sm:w-auto">
                        <label className="input validator join-item">
                            <input
                                type="number"
                                placeholder="Participant numbers"
                                required
                                className="text-sm py-2"
                                onChange={(e) => setparticipantnumber(e.target.value)}
                            />
                        </label>
                    </div>

                    <button
                        onClick={() => handleSelect2(participantnumber)}
                        className="btn btn-neutral join-item text-sm px-4"
                    >
                        Search
                    </button>
                </div>

            </div>




            {<div className="max-w-[1350px] bg-white  px-5 py-4 lg:py-8 rounded-2xl lg:px-15 ml-4 mr-4 md:ml-10 md:mr-10 lg:ml-40 lg:mr-130 ">{
                (loading || loadingdescriptions)
                    ? Array.from({ length: 1 }).map((_, i) => <SkeletonCard key={i} />)
                    :
                    displayedescription.map(x => (<Challengedescription key={x._id} x={x}></Challengedescription>))
            }</div>}
            {<div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-10 px-20 lg:px-56 pt-9">{
                loading
                    ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                    :
                    displayedchallenges.map(x => (<Challenges key={x._id} x={x}></Challenges>))
            }
            </div>}
        </div>
    );
};

export default Allchallenges;