import React, { use, useEffect, useState } from 'react';
import Myallchallenges from './Myallchallenges';
import { AuthContext } from './AuthContext';
// import useAxiosSecure from '../useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';
const Myactivities = () => {

  //const [value, setvalue] = useState([])
  const [loading, setLoading] = useState(true);
  const { user } = use(AuthContext)
  //console.log(data.challengeid)
  //console.log(value)
  const [ongoing, setongoing] = useState(0)
  const [finish, setfinish] = useState(0)
  const [data, setData] = useState(null);
  useEffect(() => {
    if (!user?.email) return;

    const fetchUserActivities = async () => {
      try {
        const res = await fetch(
          `https://ecotrack-server-side.vercel.app/myactivities/${user.email}`
        );
        if (!res.ok) {
          setData([]);
          return;
        }

        const json = await res.json();
        setData(Array.isArray(json) ? json : []);

        // const json = await res.json();
        //setData(json);
      } catch (err) {
        console.error(err);
        setData([]);
      }
    };

    fetchUserActivities();
  }, [user?.email]);
  //console.log(data)
  // const axiosSecure = useAxiosSecure();
  // const { refetch, data = [] } = useQuery({
  //   queryKey: ["myactivities", user?.email],
  //   enabled: !!user?.email,
  //   queryFn: async () => {
  //     const res = await axiosSecure.get(`https://ecotrack-server-side.vercel.app/myactivities/${user.email}`);
  //     setLoading(false)
  //     refetch()
  //     return res.data;
  //   },
  // });
  useEffect(() => {
    if (!data) return

    const count = data.filter(x => x.status == "Ongoing").length;
    setongoing(count)
    const count2 = data.filter(x => x.status == "Finished").length;
    setfinish(count2)
    // refetch()
  }, [data])
  //console.log(data)
  //console.log(data.length - ongoing - finish)

  // useEffect(() => {
  //   if (!data) return
  //   const count = data.filter(x => x.status === "Finished").length;
  //   setfinish(count)
  // }, [data])




  useEffect(() => {
    if (!user?.email) return
    if (!data?.length) {
      //setvalue([]);
      setLoading(false);
      return;
    }
    // const fetchChallenges = async () => {
    //   // if (!data || !data.length) {
    //   //   setLoading(false);
    //   //   return;
    //   // }

    //   try {
    //     // const promises = data.map(item =>
    //     //   fetch(`https://ecotrack-server-side.vercel.app/challenges/${item.challengeid}`)
    //     //     .then(res => res.json())
    //     // );
    //     // const results = await Promise.all(promises);
    //     // setvalue(results);

    //     const promises = data.map(item =>
    //       fetch(`https://ecotrack-server-side.vercel.app/challenges/${item.challengeid}`)
    //         .then(res => res.ok ? res.json() : null)
    //     );

    //     const results = (await Promise.all(promises)).filter(Boolean);
    //     setvalue(results);

    //   } catch (err) {
    //     console.error(err);
    //   }
    //   finally {
    //     setLoading(false);
    //   }
    // };

    //fetchChallenges();
  }, [user?.email, data])
  // useEffect(() => {
  //   const ping = () => {
  //     fetch("https://ecotrack-server-side.vercel.app/ping").catch(() => { });
  //   };

  //   ping();
  //   const interval = setInterval(ping, 5 * 60 * 1000);

  //   return () => clearInterval(interval);
  // }, []);

  if (!user?.email || !Array.isArray(data)) {
    return (
      <div className="flex items-center justify-center h-screen" >
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 border-4 border-yellow-400 border-dashed rounded-full animate-spin"></div>
          <p className="text-white mt-4 text-lg">Loading your challenges...</p>
        </div>
      </div >
    );
  }


  return (
    <div>
      {
        loading ? (
          <div className="flex items-center justify-center h-screen" >
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 border-4 border-yellow-400 border-dashed rounded-full animate-spin"></div>
              <p className="text-white mt-4 text-lg">Loading your challenges...</p>
            </div>
          </div >
        ) :

          (
            <div className="bg-[#17483d] pt-20 min-h-screen md:pt-16 pb-16 px-4 lg:px-20">

              <div className='px-10 md:px-20  pb-3 rounded-[100px]'>
                <div className="text-center mb-2 px-2 md:px-4 lg:px-0">
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#f5e12d] lora">
                    My Challenge Collection
                  </h2>
                  <p className="mt-2 mb-10 text-white text-sm md:text-lg">
                    Here are all the challenges I’ve taken so far — track your progress and achievements!
                  </p>
                </div>
                {
                  data.length == 0 ?
                    <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
                      <svg
                        className="w-24 h-24 text-yellow-500 mb-2 animate-bounce"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 17v-4h6v4m2 0a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v8a2 2 0 002 2h10z"
                        />
                      </svg>
                      <h2 className="text-3xl font-bold text-[#b69c9c] mb-7">No Challenges Joined Yet</h2>

                      <a
                        href="/allchallenges"
                        className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300"
                      >
                        Explore Challenges
                      </a>
                    </div> :
                    <div>
                      <div className="max-w-6xl border-b-2 border-gray-600 mx-auto px-4 pb-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:px-7">

                          <div className="relative bg-[#8E988F]
                                rounded-full h-24 flex items-center justify-center shadow-lg
                                transform hover:scale-105 transition-transform duration-300">
                            <span className="text-white font-semibold text-lg">Not Started {data.length - ongoing - finish}</span>
                          </div>

                          <div className="relative bg-[#A2A684]
                                rounded-full h-24 flex items-center justify-center shadow-lg
                                transform hover:scale-105 transition-transform duration-300">
                            <span className="text-white font-semibold text-lg">Ongoing {ongoing}</span>

                          </div>
                          <div className="relative bg-[#966A62]
                                rounded-full h-24 flex items-center justify-center shadow-lg
                                transform hover:scale-105 transition-transform duration-300">
                            <span className="text-white font-semibold text-lg">Finished {finish}</span>

                          </div>

                        </div>
                      </div>

                      <div className="grid mx-auto items-center grid-cols-1 mt-14 h-full md:grid-cols-2 lg:grid-cols-2 gap-11 md:px-4  lg:px-2">
                        {data.map((x, index) => (
                          <Myallchallenges key={index} x={x} />
                        ))}
                      </div>

                    </div>
                }


              </div>


            </div>)
      }</div>
  );
};

export default Myactivities;