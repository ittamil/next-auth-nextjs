import ProtectedRoute from '../components/ProtectedRoute';
import { logout } from '../actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { useSession, signOut } from "next-auth/react"
import React, { useState } from 'react'

const Home = () => {
  const dispatch = useDispatch();
  const access_token = useSelector((state) => state.auth.access_token)
  const handleLogout = () => {
    dispatch(logout());
    signOut();
  };
  const { data: session } = useSession()
  const [message, setMessage] = useState('')

  const handleCheck = async () => {
    const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/checking`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${access_token}`
      },
    });

    const res = await apiRes.json();

    setMessage(res.data)
  };

  return (
    <ProtectedRoute>
      <div className="md:px-24">
        {session && (
          <div>
            <p>Welcome,</p>
          </div>
        )}
        {JSON.stringify(message)}
        <button onClick={handleCheck} className='my-3 w-full bg-blue-500 dark:bg-transparent bg-opacity-50 rounded border dark:border-2 border-gray-300 dark:border-white  focus:border-gray-400 focus:bg-white dark:focus:bg-black  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'>Connect</button>
        <button onClick={handleLogout} className='w-full bg-gray-100 dark:bg-transparent bg-opacity-50 rounded border dark:border-2 border-gray-300 dark:border-white  focus:border-gray-400 focus:bg-white dark:focus:bg-black  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'>Logout</button>
      </div>
    </ProtectedRoute>
  );
};

export default Home;
