"use client";
import React, { use, useEffect, useState } from 'react';
import axios from "axios";
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup Success", response.data);
      router.push("/login");
      setLoading(false);
    } catch(err: any) {
      console.log("Sighup Failed");
      toast.error(err.message);
    }
  }

  useEffect(() => {
    if(!user.email || !user.password || !user.username) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [user])

  return (
    <div className='flex flex-col'>
      <h1>SignUp</h1>
      <div className='flex flex-col gap-2'>
        <div className=''>
          <label htmlFor='username'>Username: </label>
          <input
            className='text-black'
            type='text'
            id='username'
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
            placeholder='Enter Username'
          />
        </div>
        <div className=''>
          <label htmlFor='email'>Email: </label>
          <input
            className='text-black'
            type='email'
            id='email'
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder='Enter Email'
          />
        </div>
        <div className=''>
          <label htmlFor='password'>Password: </label>
          <input
            className='text-black'
            type='password'
            id='password'
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder='Enter Password'
          />
        </div>
      </div>
      <button
        disabled={buttonDisabled}
        onClick={onSignup}
        className={`w-fit`}
      >
        {loading ? "Signing Up..." : "SignUp"}
      </button>
      <Link className='w-fit' href="/login">Goto Login Page</Link>
    </div>
  )
}

export default SignupPage