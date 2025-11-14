import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from './AuthContext';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase.init';
import DocumentMeta from 'react-document-meta';
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';
const Register = () => {
    const meta = {
        title: "Join EcoTrack"
    }
    const navigate = useNavigate()
    const { signupuser, setuser, updateuser, setloading } = use(AuthContext)
    const [msg, setmsg] = useState("")
    const handlesubmit = (e) => {
        setloading(true)
        const name = e.target.name.value
        const photo = e.target.photourl.value
        e.preventDefault()
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*]).{6,}$/
        if (!regex.test(e.target.password.value)) {
            setmsg(<div className='text-red-700 font-semibold'>Password is invalid</div>)
            toast("Password is invalid")
            return
        }
        signupuser(e.target.email.value, e.target.password.value)
            .then(res => {
                console.log(res.user)
                setmsg(<div className='text-green-700 font-semibold'>Password is valid</div>)
                updateuser({
                    displayName: name,
                    photoURL: photo
                }).then(() => {
                    setuser(
                        { ...res.user, displayName: name, photoURL: photo }
                    )
                    //console.log(user)
                    navigate('/')
                    toast("You have successfully signed up")

                }
                ).catch(error => {
                    console.log(error)
                    setuser(user)
                })
            }
            )
            .catch(error => console.log(error.message))
            .finally(() => setloading(false))
    }

    const { user } = use(AuthContext)
    const handle = () => {
        signInWithPopup(auth, provider)
            .then(res => {
                //console.log(res.user)
                setuser(res.user)
                toast("You have successfully signed up")
                navigate('/')

            }
            )
            .catch(error => console.log(error.message))

    }
    const [watch, setwatch] = useState(false)
    const onwatch = () => {
        setwatch(!watch)
    }
    return (
        <DocumentMeta {...meta}>
            <div className='bg-[#17483d] min-h-screen items-center flex  justify-center pt-22  '>
  <div className="backdrop-blur-xl bg-white/10 shadow-2xl border-2 border-yellow-500 rounded-3xl p-6 lg:pl-1 lg:pr-1 sm:p-10 max-w-sm w-full">
                    <form onSubmit={handlesubmit} >
                        <fieldset className="fieldset  bg-[#fefcfb] border-base-300 shadow-md rounded-2xl w-xs border p-4  mx-auto ">
                            <legend className="fieldset-legend text-2xl text-yellow-500">Sign Up</legend>

                            <label className="label">Name</label>
                            <input type="text" name="name" className="input" placeholder="Name" />

                            <label className="label">PhotoURL</label>
                            <input type="url" name="photourl" className="input" placeholder="PhotoURL" />


                            <label className="label">Email</label>
                            <input required type="email" name="email" className="input" placeholder="Email" />

                            <label className="label">Password</label>
                            <div className='relative'>
                                <input required type={watch ? "text" : "password"} name="password" className="input " placeholder="Password" />
                                <button type="button" onClick={onwatch} className='absolute top-[35%] right-3 z-10' id="togglePassword">
                                    {watch ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            {msg}

                            <button className="btn btn-neutral mt-4 bg-[#17483d]">Sign Up</button>
                            <Link className='text-center' to="/login">Already have ab account?<span className='text-indigo-700 text-center'> Sign in</span></Link>
                            <button onClick={handle} className="border border-gray-400  p-2 rounded-md flex items-center gap-1 text-gray-600 text-[17px]  w-full justify-center hover:bg-gray-200 hover:border-gray-400 hover:text-gray-800 transition-all duration-200">
                                <FcGoogle size={18} />
                                Login with Google
                            </button>


                        </fieldset>

                    </form>
          </div>     

            </div>



        </DocumentMeta>
    );
};

export default Register;