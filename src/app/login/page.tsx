"use client";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Success", response.data);
      router.push("/profile");
      setLoading(false);
    } catch(err: any) {
      console.log("Login Failed");
      toast.error(err.message);
    }
  }

  useEffect(() => {
    if(!user.email || !user.password) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [user])

  return (
    <div className='flex flex-col'>
      <h1>Login</h1>
      <div className='flex flex-col gap-2'>
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
        onClick={onLogin}
        className={`w-fit`}
      >
        {loading ? "Logging In..." : "Login"}
      </button>
    </div>
  )
}

export default LoginPage