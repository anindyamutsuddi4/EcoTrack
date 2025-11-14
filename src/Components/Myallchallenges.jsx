import React, { use, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from './AuthContext';


const Myallchallenges = ({ x }) => {
    const [selected, setselected] = useState('Status ⬇️')
    const { user, setloading } = use(AuthContext)
    // const [loading, setloading] = useState(false);
    const [toast1, settoast1] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    // const [isActive, setIsActive] = useState(false);
    const handleSelect = (value) => {
        setselected(value)
        setIsOpen(false);
        //setIsActive(prev => !prev); 
    }
    // const [Status,setStatus]=useState('Status')
    // useEffect(()=>{
    //    const data= fetch(`http://localhost:3000/myactivities/${user}/${x._id}`)
    //     .then(res=>res.json())

    //         //setParticipants(data.participants);
    //        const y=data.filter(x => x.state =="Ongoing")     
    //     setStatus(y)
    // },[])

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await fetch(`http://localhost:3000/myactivities/${user.email}/${x._id}`);
                const data = await res.json();
                if (data.length > 0) {
                    const isOngoing = data.some(item => item.status === "Ongoing");
                    console.log(isOngoing)
                    // if (isOngoing) {
                    //   console.log("This challenge is ongoing!");
                    // }

                    setselected(data[data.length - 1].status);

                } else {
                    setselected("Not started");
                }
            } catch (err) {
                console.error(err);
                //setselected("Not started");
            }
        };
        fetchStatus();

    }, [user.email, x._id]);
    const [Status, setStatus] = useState('Status')

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await fetch(`http://localhost:3000/myactivities/${user.email}/${x._id}`);
                const data = await res.json();
                if (data.length > 0) {
                    const isOngoing = data.some(item => item.status === "Finished");
                    console.log(isOngoing)
                    //setopen(true)
                    // if (isOngoing) {
                    //   console.log("This challenge is ongoing!");
                    // }

                    setStatus(data[data.length - 1].status);

                } else {
                    setStatus("Not started");
                }
            } catch (err) {
                console.error(err);
                //setselected("Not started");
            }
        };
        fetchStatus();
    }, [user.email, x._id]);

    const [total, settotal] = useState(x.totalImpact || 0);

// or inside useEffect if x comes from props async
useEffect(() => {
    settotal(x.totalImpact || 0);
}, [x.totalImpact]);

    const setstatus = async () => {
        // const data = {
        //            // userId: user.email, // e.g., unique user id or email.
        //            // challengeid: challenge._id,
        //             status: selected,// e.g., &quot;Not Started&quot;, &quot;Ongoing&quot;, &quot;Finished&quot;progress: 0,
        //            // joinDate: new Date()
        //         }

        setloading(true)
         fetch(`http://localhost:3000/myactivities/${user.email}/${x._id}`,
            {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ status: selected }),

            })
        try {
            await fetch(`http://localhost:3000/${x._id}/update`,
                {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ totalImpact: total }),

                })
            toast("You have successfully updated your challenge status");
            settoast1(true)
        }
        catch (err) {
            console.error(err);
        }
        try {
            const res = await fetch(`http://localhost:3000/myactivities/${user.email}/${x._id}`);
            const data = await res.json();
            const found = data.find(item => item.status == selected);
            if (found) {
//toast("Same")
                return;
            } else {
                if (
                    selected == "Finished"
                ) {
                    toast("Congratulations for finishing the challenge");
                }
                else {
                    if (toast1 == true) {
                        toast("You have successfully updated your challenge status");
                    }
                }
            }
        } catch (err) {
            console.error(err);
        }
        finally { setloading(false) }
        //console.log(user.email)
        //setStatus(selected)
        //setloading(false)
    }


    return (


        <div className="relative mx-auto rounded-xl border-2 border-yellow-500 bg-[#debf0d] text-black h-full  shadow-xl  hover:shadow-2xl transition duration-300 max-w-[490px] lg:w-90 w-full overflow-hidden">
            <div className="relative h-52 w-full">
                <img
                    src={x.imageUrl}
                    alt={x.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <span className="absolute top-3 left-3 bg-yellow-400 text-black font-semibold text-xs px-3 py-1 rounded-full shadow">
                    {x.category}
                </span>
                {/* <span className="absolute bottom-3 left-3 bg-white/90 text-gray-800 text-xs px-3 py-1 rounded-full shadow">
          {x.category}
        </span> */}
            </div>
            <div className="px-5 p-5  space-y-2">
                <div className='flex justify-between gap-10'>
                    <h2 className="text-xl font-bold ">{x.title}</h2>
                    <div className='rounded-full'> <div className="dropdown  rounded-full flex justify-end gap-2 dropdown-hover">
                        <div
                            tabIndex={0}
                            role="button"
                            onClick={() => setIsOpen(!isOpen)}
                            className="btn  border-none text-black shadow-md hover:scale-105 transition-transform"
                        >
                            {selected || Status} ⬇️
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content z-[100] menu p-2 shadow-lg bg-base-100 rounded-xl w-60"
                        >
                            <li >
                                <a onClick={() => {
                                    handleSelect("Not started")
                                }

                                }
                                    className="px-5 py-2 text-black rounded-full transition hover:bg-[#17483d] hover:text-white shadow-lg scale-105 "
                                >
                                    Not started
                                </a>
                            </li>
                            <li>
                                <a onClick={() => handleSelect("Ongoing")}
                                    className="px-5 py-2 text-black rounded-full transition hover:bg-[#17483d] hover:text-white shadow-lg scale-105">
                                    Ongoing
                                </a>
                            </li>
                            <li>
                                <a onClick={() => handleSelect("Finished")}
                                    className="px-5 py-2 text-black rounded-full transition hover:bg-[#17483d] hover:text-white shadow-lg scale-105" >
                                    Finished
                                </a>
                            </li>

                        </ul>
                    </div>
                    </div>


                </div>
                <p className="text-sm h-100%">{x.description}</p>

                <div className="flex justify-between text-xs  mt-2">
                    <span>Duration: {x.duration} days</span>
                    <span>Target: {x.target}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="bg-green-50 p-2 rounded-xl flex flex-col justify-center text-center shadow-sm">
                        <h3 className=" text-lg font-bold text-green-700">{x.participants}</h3>
                        <p className="text-xs text-gray-500">Participants</p>
                    </div>
                    <div className="bg-[#e7e9de] p-2 rounded-xl text-center shadow-sm">
                        <h3 className="text-sm font-bold text-blue-700">

                            <div className="join px-21 md:px-1 md:pr-10 flex w-full sm:w-auto">
                            </div>


                            <div className="w-full sm:w-auto">
                                <label className="input validator join-item">
                                    <input
                                        type="number"
                                        placeholder={`${x.totalImpact} ${x.impactMetric}  `}
                                        required
                                        className="text-sm py-1"
                                        onChange={(e) => settotal(Number(e.target.value))}
                                    />
                                </label>
                            </div>
                            {/* {x.impactMetric} */}
                        </h3>
                        <p className="text-xs text-gray-500">Impact</p>
                    </div>

                </div>

                {/* <div className="bg-yellow-50 p-2 rounded-xl text-center shadow-sm">
                    <h3 className="text-sm font-bold text-wrap text-yellow-700">{x.createdBy}</h3>
                    <p className="text-xs text-gray-500">Created By</p>
                </div> */}
                <div className="flex justify-between items-center mt-3 text-xs ">
                    <span>Start: {x.startDate}</span>
                    <span>End: {x.endDate}</span>
                </div>
                <button onClick={setstatus}

                    className='w-full text-[18px] bg-[#17483d] rounded-full px-2 py-3 text-white'>Update status</button>
            </div>
        </div>


    );
};

export default Myallchallenges;