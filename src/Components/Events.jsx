import React, { use, useState } from 'react';
import { toast } from 'react-toastify';
//import useAxiosSecure from '../useAxiosSecure';
import { AuthContext } from './AuthContext';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../useAxiosSecure';

const Events = ({ x, refetch }) => {
  const axiosSecure = useAxiosSecure()
  const { user } = use(AuthContext)
  const [joined, setJoined] = useState(false);

  // const [Toggle, settoggle] = useState(false)
  //console.log(data)
  // const checkevent = id => {
  //   return data.find(x => x.id == id)
  // }

  const updateUserevent = async (x) => {

    try {
      // Update challenge status

      const Eventinfo = {
        id: x._id,
        email: user?.email,
        title: x.title,
        description: x.description,
        date: x.date,
        location: x.location,
        organizer: x.organizer,
        currentParticipants: x.currentParticipants + 1,
        maxParticipants: x.maxParticipants,
        image: x.image
      };
      const res = await axiosSecure.post(`/allevents/join/${user?.email}`, Eventinfo);
      await fetch(
        `https://ecotrack-server-side.vercel.app/events/${x._id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          // body: JSON.stringify({ status: selected }),
        }
      );

      if (res.data.insertedId) {
        setJoined(true);
        toast('Event joined successfully!');
        await refetch();
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to join');
    }

    // axiosSecure.patch(`/events/${id}`)
    //   .then(res => {
    //     if (res.data.modifiedCount) {
    //       //console.log("ok")
    //       toast('Status is updated successfully')

    //     }
    //   })
    //   .catch(err => console.error(err));
  }
  const { data = [], isFetching } = useQuery({
    queryKey: ['events', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/allevents/join/${user?.email}`)
      return res.data
    }
  })
  const checkevent = joined || data.some(e => e.id == x._id);
  // const handleevent = () => {
  //   settoggle(true)
  // }
  return (
    // bg-[#A9A135] 
    <div className="max-w-[500px] w-full rounded-3xl p-6 shadow-2xl 
                    bg-[#5C6D66] border border-[#B5AFA2] 
                    hover:shadow-3xl  mx-auto my-6">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-bold bg-[#AFA288] text-[#2C1F18] px-3 py-1 rounded-full shadow-sm">
          {new Date(x.date).toLocaleDateString()}
        </span>
        {/* <span className="text-xs text-[#E4DCCF]">
          {new Date(x.date).toLocaleDateString()}
        </span> */}
      </div>
      <h2 className="text-2xl font-bold text-[#e7b62f] mb-3 tracking-tight drop-shadow-sm">
        {x.title}
      </h2>
      <p className="text-[#E4DCCF] text-sm leading-relaxed mb-4">
        {x.description}
      </p>
      <div className="flex justify-between items-center mb-4 text-sm">
        <span className="font-semibold text-[#F3E0C2]">📍 {x.location}</span>
        <span className="font-medium text-wrap text- text-[#F3E0C2]">Organizer: {x.organizer}</span>
      </div>
      <div className="flex justify-between items-center pt-3 border-t border-[#AFAFAF]">
        <span className="text-sm text-[#F3E0C2] font-semibold">
          Participants: {x.currentParticipants}/{x.maxParticipants}
        </span>
        {
          checkevent ?
            <button className="bg-[#c0a96b] cursor-not-allowed  text-[#5C6D66] text-sm px-4 py-2 rounded-full shadow-md transition-colors duration-300">  Joined  </button>
            : <button disabled={isFetching} onClick={() => {
              updateUserevent(x)

              //settoggle(true)
            }} className="bg-[#F5D88B] hover:bg-[#E0C068] text-[#5C6D66] text-sm px-4 py-2 rounded-full shadow-md transition-colors duration-300"> {isFetching ? 'Joining...' : 'Join'} </button>
        }
        {/* <button onClick={() => {
          updateUserevent(x._id)
          settoggle(true)
        }
        } className="bg-[#F5D88B] hover:bg-[#E0C068] text-[#5C6D66] text-sm px-4 py-2 rounded-full shadow-md transition-colors duration-300">
          {Toggle ? "Joined" : "Join"}
        </button> */}
      </div>
    </div>
  );
};

export default Events;