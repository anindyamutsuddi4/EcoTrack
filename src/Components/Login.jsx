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
            <div className='bg-[#17483d] h-screen flex justify-center pt-36  '>
                {
                    flip ?
                        (<div className='items-center  flex flex-col'>
                            <p className='text-[42px] font-semibold font-sans text-center'>Forgot Your Password?</p>
                            <p className='text-center mb-5'>Reset it here</p>
                            <form onSubmit={handlepass}>
                                <fieldset className="fieldset  bg-base-200 border-base-300 rounded-box w-xs border p-4">

                                    <label className="label">Email</label>
                                    <input type="email" required name="email" className="input" placeholder="Email" />

                                    <button type="submit" className="btn btn-neutral mt-4">Reset password</button>
                                </fieldset>
                            </form>
                            <p onClick={button} className='underline text-center'>Go Back</p>
                        </div>)


                        : <form onSubmit={handlelogin}>
                            <fieldset className="fieldset bg-base-200  border-base-300 shadow-md rounded-box w-xs border p-4  mx-auto ">
                                <legend className="fieldset-legend text-2xl ">Sign In</legend>

                                {/* <label className="label">Name</label>
                    <input type="text" name="name" className="input" placeholder="Name" />

                    <label className="label">PhotoURL</label>
                    <input type="" name="photourl" className="input" placeholder="PhotoURL" />
 */}

                                <label className="label">Email</label>
                                <input type="email" name="email" className="input" placeholder="Email" />

                                <label className="label">Password</label>
                                <input required type="password" name="password" className="input" placeholder="Password" />

                                <button type="submit" className="btn btn-neutral mt-4">Sign In</button>
                                <Link className='text-center' to="/register">Doesn't have an account?<span className='text-indigo-700 text-center'> Sign Up</span></Link>
                                <p onClick={button} className='text-center underline'>Forgot Password?</p>
                                <button type="button" onClick={handle} className="border border-gray-400 mb-4 p-2 rounded-md flex items-center gap-1 text-gray-600 text-[17px]  w-full justify-center hover:bg-gray-200 hover:border-gray-400 hover:text-gray-800 transition-all duration-200">
                                    <FcGoogle size={18} />
                                    Login with Google
                                </button>


                            </fieldset>

                        </form>
                }

            </div>
        </DocumentMeta>
    );
};

export default Login;