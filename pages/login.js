import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../actions/authActions';
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from "next-auth/react"
import React, { useState } from 'react'

const LoginPage = () => {
    const router = useRouter()
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        const username = formData.username;
        const password = formData.password;
        dispatch(login(username, password));
    };

    if (typeof window !== 'undefined' && isAuthenticated)
        router.push('/')

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value })


    const { data: session } = useSession()

    const handleSocialLogin = async () => {
        await signIn('google');
    };

    console.log(session)

    if (session) {
        const access_token = session.token.access_token;
        const refresh_token = session.token.refresh_token;
        dispatch({ type: 'LOGIN_SUCCESS', payload: { access_token, refresh_token } });
    }


    return (
        <div className="md:px-24">
            <form onSubmit={handleLogin}>
                <div className={'flex flex-wrap'}>
                    <div className={'p-2 w-full'}>
                        <div className={'relative'}>
                            <label
                                className={
                                    'leading-7 text-sm text-gray-600 dark:text-white'
                                }
                                htmlFor="username"
                            >
                                Userame (*)
                            </label>
                            <input
                                required
                                type="text"
                                onChange={onChange}
                                id="username"
                                name="username"
                                className={
                                    'w-full bg-gray-100 dark:bg-transparent bg-opacity-50 rounded border dark:border-2 border-gray-300 dark:border-white  focus:border-gray-400 focus:bg-white dark:focus:bg-black  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                                }
                            />
                        </div>
                    </div>
                    <div className={'p-2 w-full'}>
                        <div className={'relative'}>
                            <label
                                className={
                                    'leading-7 text-sm text-gray-600 dark:text-white'
                                }
                                htmlFor="url"
                            >
                                Password (*)
                            </label>
                            <input
                                required
                                type="password"
                                id="password"
                                name="password"
                                onChange={onChange}
                                className={
                                    'w-full bg-gray-100 dark:bg-transparent bg-opacity-50 rounded border dark:border-2 border-gray-300 dark:border-white  focus:border-gray-400 focus:bg-white dark:focus:bg-black  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                                }
                            />
                        </div>
                    </div>

                    <div className={'px-2 py-4 w-full'}>
                        <div className={'flex justify-between'}>
                            <button
                                type="submit"
                                className="text-white bg-black border-2 border-black py-1.5 px-4 hover:bg-transparent hover:text-black text-md"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            {!session && (
                <button onClick={() => handleSocialLogin('google')} className="text-white bg-red-500 border-2 border-red-500 py-1.5 px-4 hover:bg-transparent hover:text-red-500 text-md">Login with Google</button>
            )}
            
        </div>
    );
};

export default LoginPage;

