"use client";
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

function VerifyEmailPage() {
  // const router = useRouter();
  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifiyUserEmail = async () => {
    try {
      await axios.post("/api/users/verify-email", {token});
      setIsVerified(true);
    } catch(err: any) {
      setError(true);
      console.log(err.response.data);
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
    // const {query} = router;
    // console.log(query);
    // const urlToken = query.token;
    // setToken(urlToken || "");
  }, [])

  useEffect(() => {
    if(token) {
      verifiyUserEmail();
    }
  }, [token])

  return (
    <div>
      <h1>Verify Email</h1>
      <h2>
        {token ? `${token}` : "No Token Found"}
      </h2>
      {
        isVerified && (
          <div>
            <h2>Verified</h2>
            <Link href="/login">Login</Link>
          </div>
        )
      }
      {
        error && (
          <div>
            <h1>Error Occurred</h1>
          </div>
        )
      }
    </div>
  )
}

export default VerifyEmailPage