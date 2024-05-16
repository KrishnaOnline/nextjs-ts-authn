"use client";
import axios from 'axios';
import React, { use, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function UserDataPage({ params }: any) {
	const [user, setUser] = useState({});
	console.log(params.id);
	const getUser = async () => {
		try {
			const response = await axios.post("/api/users/me", params.id);
			console.log(response.data.data);
			setUser(response.data.data);
		} catch(err: any) {
			console.log(err.message);
			toast.error(err.message);
		}
	}

	useEffect(() => {
		getUser();
	}, [])

	return (
		<div>
			<h1>User Details: </h1>
			<p>{user.username}</p>
			<p>{user.email}</p>
		</div>
	)
}

export default UserDataPage