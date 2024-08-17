import { Link, useLocation, useNavigate } from 'react-router-dom';
import loginImg from '../../assets/images/loginImg.jpg';
import logo from '../../assets/logo.png'
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Fade } from 'react-awesome-reveal';
import { ThemeContext } from '../../provider/ThemeProvider';

const Login = () => {

    const { theme } = useContext(ThemeContext)

    const { signIn, signInWithGoogle, setUser, user, loading } = useContext(AuthContext);

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [navigate, user])

    const from = location.state || '/'

    //* google sign in
    const handleGoogleSignIn = async () => {
        try {
            const userCredential = await signInWithGoogle();
            const user = userCredential.user;
            toast.success(`Signed In as ${user.displayName}`)
            navigate(from, { replace: true })
        }
        catch (err) {
            toast.error(err?.message)
        }

    }

    //* email sign in
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const { email, password } = data
        toast.promise(
            signIn(email, password).then((userCredential) => {
                const user = userCredential.user;
                setUser(user);
                navigate('/');
                return user.displayName; // Return the displayName directly
            }),
            {
                loading: 'Signing in...',
                success: (name) => <b>Signed in as {name}!</b>, // Use the name directly
                error: (err) => <b>{err?.message}</b>,
            }
        );
    }

    if (user || loading) return

    return (
        <Fade>
            <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
                <div className={theme === 'light' ? "flex w-full max-w-sm mx-auto overflow-hidden bg-base-300/30 border border-pink-100 rounded-2xl shadow-2xl lg:max-w-4xl" : "flex w-full max-w-sm mx-auto overflow-hidden bg-base-300/20 border border-gray-600 rounded-2xl shadow-lg lg:max-w-4xl"}>
                    <div className="hidden bg-cover lg:block lg:w-1/2" style={{ backgroundImage: `url(${loginImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                    <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                        <div className="flex justify-center mx-auto">
                            <img className="w-auto h-7 sm:h-8" src={logo} alt="" />
                        </div>

                        <p className="mt-3 text-xl text-center text-accent">
                            Welcome back!
                        </p>

                        <a onClick={handleGoogleSignIn} className="flex items-center justify-center mt-4 transition-colors duration-300 transform border rounded-lg hover:bg-base-300/50 cursor-pointer glass">
                            <div className="px-4 py-2">
                                <svg className="w-6 h-6" viewBox="0 0 40 40">
                                    <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                                    <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                                    <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                                    <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                                </svg>
                            </div>
                            <span className="w-5/6 px-4 py-3 font-bold font-nunito text-center">Continue with Google</span>
                        </a>

                        <div className="flex items-center justify-between mt-4">
                            <span className="w-1/5 border-b lg:w-1/4"></span>

                            <p className="text-xs text-center text-gray-500 uppercase text-current">or login
                                with email</p>

                            <span className="w-1/5 border-b lg:w-1/4"></span>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium" htmlFor="LoggingEmailAddress">Email Address</label>
                                <input id="LoggingEmailAddress" className="block w-full px-4 py-2 bg-base-100/50 border rounded-lg focus:ring-opacity-40 focus:outline-none focus:ring" type="email" {...register("email", { required: true })} />
                                {errors.email && <span className='text-error'>This field is required</span>}
                            </div>

                            <div className="mt-4">
                                <div className="flex justify-between">
                                    <label className="block mb-2 text-sm font-medium" htmlFor="loggingPassword">Password</label>
                                    {/* <a href="#" className="text-xs hover:underline">Forget Password?</a> */}
                                </div>

                                <input id="loggingPassword" className="block w-full px-4 py-2 bg-base-100/50 border rounded-lg 0 focus:ring-opacity-40 focus:outline-none focus:ring " type="password" {...register("password", { required: true })} />
                                {errors.password && <span className='text-error'>This field is required</span>}
                            </div>

                            <div className="mt-6">
                                <button type='submit' className="w-full px-6 py-3 text-sm font-extrabold capitalize glass btn rounded-lg focus:outline-none font-nunito">
                                    Login
                                </button>
                            </div>
                        </form>


                        <div className="flex items-center justify-between mt-4">
                            <span className="w-1/5 border-b md:w-1/4"></span>

                            <Link to='/register' className="text-xs uppercase hover:underline">or Register</Link>

                            <span className="w-1/5 border-b md:w-1/4"></span>
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    );
};

export default Login;