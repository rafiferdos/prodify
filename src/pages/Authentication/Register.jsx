import { Link, useLocation, useNavigate } from 'react-router-dom';
import registerImg from '../../assets/registerImg.jpg';
import { AuthContext } from '../../provider/AuthProvider';
import { useContext, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';


const Register = () => {

    const { createUser, setUser, updateUserProfile, user, loading } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state || '/'

    //* create user
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {

        const { full_name, email, password, photo_url } = data
        try {
            toast.promise(
                createUser(email, password).then(async (userCredential) => {
                    const user = userCredential.user;
                    await updateUserProfile(full_name, photo_url);
                    setUser({ ...user, photoURL: photo_url, displayName: full_name });
                    navigate('/');
                    return full_name
                }),
                {
                    loading: 'Creating user...',
                    success: (name) => <b>User created as {name}!</b>,
                    error: <b>Could not create user.</b>,
                }
            );
        }
        catch (err) {
            toast.error(err?.message)
        }
    }

    if (user || loading) return

    return (
        <>
            <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
                <div className="flex flex-row-reverse w-full max-w-sm mx-auto overflow-hidden bg-base-300/30 rounded-2xl shadow-2xl lg:max-w-4xl border-gray-300 border">
                    <div className="hidden bg-cover lg:block lg:w-1/2" style={{ backgroundImage: `url(${registerImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                    <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                        <div className="flex justify-center mx-auto">
                            {/* <img className="w-auto h-7 sm:h-8" src={logo} alt="" /> */}
                        </div>

                        <p className="mt-3 text-xl text-center text-accent">
                            Hey there!
                        </p>

                        <div className="flex items-center justify-between mt-4">
                            <span className="w-1/5 border-b lg:w-1/4"></span>
                            <p className="text-xs text-center text-gray-500 uppercase text-current">create with email</p>
                            <span className="w-1/5 border-b lg:w-1/4"></span>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium" htmlFor="full_name">Full Name</label>
                                <input id="full_name" className="block w-full px-4 py-2 bg-base-100/50 border rounded-lg focus:ring-opacity-40 focus:outline-none focus:ring" type="text" {...register("full_name", { required: true })} />
                                {errors.full_name && <span className='text-error'>This field is required</span>}
                            </div>

                            <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium" htmlFor="LoggingEmailAddress">Email Address</label>
                                <input id="LoggingEmailAddress" className="block w-full px-4 py-2 bg-base-100/50 border rounded-lg focus:ring-opacity-40 focus:outline-none focus:ring" type="email" {...register("email", { required: true })} />
                                {errors.email && <span className='text-error'>This field is required</span>}
                            </div>

                            <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium" htmlFor="photoURL">Photo URL</label>
                                <input id="photoURL" className="block w-full px-4 py-2 bg-base-100/50 border rounded-lg focus:ring-opacity-40 focus:outline-none focus:ring" type="text" {...register("photo_url")} />
                            </div>

                            <div className="mt-4">
                                <div className="flex justify-between">
                                    <label className="block mb-2 text-sm font-medium" htmlFor="loggingPassword">Password</label>
                                </div>

                                <input id="loggingPassword" className="block w-full px-4 py-2 bg-base-100/50 border rounded-lg 0 focus:ring-opacity-40 focus:outline-none focus:ring " type="password" {...register("password", { required: true })} />
                                {errors.password && <span className='text-error'>This field is required</span>}
                            </div>

                            <div className="mt-6">
                                <button type='submit' className="w-full px-6 py-3 text-sm capitalize glass btn rounded-lg focus:outline-none font-nunito">
                                    Register
                                </button>
                            </div>
                        </form>

                        <div className="flex items-center justify-between mt-4">
                            <span className="w-1/5 border-b md:w-1/4"></span>

                            <Link to='/login' className="text-xs uppercase hover:underline">or login</Link>

                            <span className="w-1/5 border-b md:w-1/4"></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;