import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from './AuthContext';
import { auth, provider } from '../firebase.init';
import { signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';
import DocumentMeta from 'react-document-meta';
const Login = () => {
    const { user } = use(AuthContext)
    const navigate = useNavigate()
    //  if (!user) {
    //     return (
    //         <div className='flex items-center justify-center h-screen'>
    //             <span className="loading loading-infinity  loading-xl"></span>
    //         </div>
    //     )

    // }
    const meta = {
        title: "Login to EcoTrack"
    }
    // const nav = () => {
    //     if (user) { navigate('/') }
    // }
    const { signinuser, setuser, resetpass } = use(AuthContext)
    const handlelogin = (e) => {
        e.preventDefault()
        signinuser(e.target.email.value, e.target.password.value)
            .then(res => {
                //console.log(res.user)
                setuser(res.user)
                toast("Login successful!")
                navigate(`${location.state ? location.state : "/"}`)
            }
            )
            .catch(error => {
                console.log(error.message)
                //toast('Do registration first')
            }
            )
    }
    const location = useLocation()
    const handle = () => {
        signInWithPopup(auth, provider)
            .then(res => {
                toast("You have successfully signed in")
                setuser(res.user)
                navigate(`${location.state ? location.state : "/"}`)
                if (user) {
                    navigate(`${location.state ? location.state : "/"}`)

                }
            }
            )
            .catch(error => console.log(error.message))

    }

    const handlepass = (e) => {
        e.preventDefault()
        resetpass(e.target.email.value)
            .then(() => {
                toast("Please check your email")
            })
            .catch((error) => {
                console.log(error)
            });

    }
    const [flip, setflip] = useState(false)
    const button = () => {
        setflip(!flip)
    }
    return (
        <DocumentMeta {...meta}>
            <div className='bg-[#17483d] h-screen flex justify-center pt-36 px-4'>

                {flip ? (
                    // Forgot Password Form (unchanged)
                    <div className='items-center flex flex-col w-full max-w-md'>
                        <p className='text-[42px] font-semibold font-sans text-center'>Forgot Your Password?</p>
                        <p className='text-center mb-5'>Reset it here</p>
                        <form onSubmit={handlepass} className='w-full'>
                            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
                                <label className="label">Email</label>
                                <input type="email" required name="email" className="input" placeholder="Email" />
                                <button type="submit" className="btn btn-neutral mt-4 w-full">Reset password</button>
                            </fieldset>
                        </form>
                        <p onClick={button} className='underline text-center cursor-pointer mt-3'>Go Back</p>
                    </div>
                ) : (
                    // Login Form + Demo Card
                    <div className="flex flex-col md:flex-row justify-center items-start gap-6 md:gap-10 w-full max-w-5xl">

                        {/* Login Form (original location & design intact) */}
                        <div className="flex justify-center w-full max-w-[320px] min-h-[750px]">
                            <form onSubmit={handlelogin} className="w-full h-full">
                                <fieldset className="fieldset bg-base-200 border-base-300 shadow-md rounded-box border p-5 sm:p-4 w-full h-full flex flex-col justify-between">
                                    <legend className="fieldset-legend text-xl sm:text-2xl text-yellow-500">Sign In</legend>

                                    {/* Input Fields */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="label text-sm sm:text-base">Email</label>
                                        <input type="email" name="email" className="input input-sm sm:input-md" placeholder="Email" />

                                        <label className="label text-sm sm:text-base">Password</label>
                                        <input required type="password" name="password" className="input input-sm sm:input-md" placeholder="Password" />
                                    </div>

                                    {/* Buttons & Links */}
                                    <div className="flex flex-col gap-2">
                                        <button type="submit" className="btn btn-neutral mt-4 bg-[#17483d] w-full btn-sm sm:btn-md">Sign In</button>

                                        <Link className='text-center block mt-1 text-xs sm:text-sm' to="/register">
                                            Doesn't have an account?<span className='text-indigo-700'> Sign Up</span>
                                        </Link>

                                        <p onClick={button} className='text-center underline text-sm sm:text-sm mt-1 cursor-pointer'>Forgot Password?</p>

                                        <button type="button" onClick={handle} className="border border-gray-400 mt-1 p-2 rounded-md flex items-center gap-1 text-gray-600 text-sm sm:text-[17px] w-full justify-center hover:bg-gray-200 hover:border-gray-400 hover:text-gray-800 transition-all duration-200">
                                            <FcGoogle size={18} />
                                            Login with Google
                                        </button>
                                    </div>
                                </fieldset>
                            </form>
                        </div>




                     <div className="flex justify-center w-full max-w-[400px] mt-6 md:mt-0">
  <div className="bg-white/90 backdrop-blur-md border-2 border-yellow-400 shadow-lg rounded-2xl px-5 py-3 text-center w-full">
    <p className="text-sm font-semibold text-[#17483d] mb-2">Demo Login Credentials</p>
    <div className="flex flex-col sm:flex-row justify-center gap-2 text-xs sm:text-sm">

      {/* Email */}
      <span className="bg-gray-100 px-5 py-2 flex flex-col rounded-md text-gray-700">
        <strong>Email:</strong> demo@ecotrack.com
      </span>

      {/* Password + Copy */}
      <span className="bg-gray-100 px-7 py-2 rounded-md text-gray-700 flex flex-col items-center gap-2 whitespace-nowrap">
        <strong>Password:</strong> 
        <span className="flex items-center gap-4">
          aA123456?* 
          <button
            onClick={() => navigator.clipboard.writeText('aA123456?*')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 text-xs px-2 py-1 rounded transition duration-200"
          >
            Copy
          </button>
        </span>
      </span>

    </div>
  </div>
</div>


                    </div>
                )}

            </div>
        </DocumentMeta>


    );
};

export default Login;