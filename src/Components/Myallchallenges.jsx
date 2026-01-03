import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from './AuthContext';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../useAxiosSecure';

const Myallchallenges = ({ x }) => {
    //console.log(x._id)
    const { user, setloading } = React.useContext(AuthContext);
    const [selected, setSelected] = useState(x.status || 'Not started');
    const [total, setTotal] = useState(x.totalImpact || 0);
    useEffect(() => {
        if (x.status !== undefined && x.status !== null) {
            setSelected(x.status);
        }

    }, [x.status]);
    // const axiosSecure = useAxiosSecure();
    // const { data = [] } = useQuery({
    //     queryKey: ["allchallenges"],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get("/allchallenges");
    //         return res.data;
    //     },
    // });
    const updateStatus = async () => {
        if (!user?.email) return;
        setloading(true);
        try {
            // Update challenge status
            const res = await fetch(
                `https://ecotrack-server-side.vercel.app/myactivities/${user.email}/${x._id}`,
                {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: selected }),
                }
            );
            const data = await res.json()
            // Update totalImpact
            const res2 = await fetch(`https://ecotrack-server-side.vercel.app/${x.challengeid}/update/${x._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ totalImpact: total }),
            });
            const data2 = await res2.json()
            //console.log(data)
            if (data.modifiedCount || (data2.challenge.modifiedCount > 0 || data2.myactivity.modifiedCount > 0)) {
                toast('Challenge status updated successfully!');
                setloading(false)
            }
        } catch (err) {
            console.log(err);
            toast.error('Failed to update status');
        } finally {
            setloading(false);
        }
    };


    return (
        <div className="relative mx-auto rounded-xl border-2 border-yellow-500 bg-[#debf0d] text-black shadow-xl hover:shadow-2xl transition duration-300 max-w-[490px] lg:w-90 w-full overflow-hidden">
            <div className="relative h-52 w-full">
                <img src={x.imageUrl} alt={x.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <span className="absolute top-3 left-3 bg-yellow-400 text-black font-semibold text-xs px-3 py-1 rounded-full shadow">
                    {x.category}
                </span>
            </div>

            <div className="px-5 p-5 space-y-2">
                <div className="flex justify-between gap-10">
                    <h2 className="text-xl font-bold">{x.title}</h2>
                    <div className="dropdown dropdown-hover">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn border-none text-black shadow-md hover:scale-105 transition-transform"
                        >
                            {selected} ⬇️
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content z-[100] menu p-2 shadow-lg bg-base-100 rounded-xl w-60"
                        >
                            {['Not started', 'Ongoing', 'Finished'].map(status => (
                                <li key={status}>
                                    <button
                                        onClick={() => setSelected(status)}
                                        className="px-5 py-2 text-black rounded-full transition hover:bg-[#17483d] hover:text-white shadow-lg scale-105"
                                    >
                                        {status}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <p className="text-sm">{x.description}</p>
                <div className="flex justify-between text-xs mt-2">
                    <span>Duration: {x.duration} days</span>
                    <span>Target: {x.target}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="bg-green-50 p-2 rounded-xl flex flex-col justify-center text-center shadow-sm">
                        <h3 className="text-lg font-bold text-green-700">{x.participants}</h3>
                        <p className="text-xs text-gray-500">Participants</p>
                    </div>
                    <div className="bg-[#e7e9de] p-2 rounded-xl text-center shadow-sm">
                        <input
                            type="number"
                            value={total}
                            onChange={e => setTotal(Number(e.target.value))}
                            className="text-sm py-1 w-full"
                        />
                        <p className="text-xs text-gray-500">Impact</p>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-3 text-xs">
                    <span>Start: {x.startDate}</span>
                    <span>End: {x.endDate}</span>
                </div>

                <button
                    onClick={updateStatus}
                    className="w-full text-[18px] bg-[#17483d] rounded-full px-2 py-3 text-white"
                >
                    Update Status
                </button>
            </div>
        </div>
    );
};

export default Myallchallenges;
