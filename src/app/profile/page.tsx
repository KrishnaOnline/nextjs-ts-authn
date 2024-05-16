"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function ProfilePage() {
	const router = useRouter();
	const [data, setData] = useState(null);
	const getUserData = async () => {
		try {
			const response = await axios.post("/api/users/me");
			console.log(response.data.data);
			setData(response.data.data);
		} catch(err: any) {
			console.log(err.message);
			toast.error(err.message);
		}
	};
	const logout = async () => {
		try {
			await axios.get("/api/users/logout");
			toast.success("Logged Out Successfully");
			router.push("/login");
		} catch (err: any) {
			console.log(err.message);
			toast.error(err.message);
		}
	};
	useEffect(() => {
		getUserData();
	}, [])

	return (
		<div>
			<h1>Profile Page</h1>
			<div>
				<h1>User ID:</h1>
				<h2>
					{
						!data ? "No Data Found" : <Link href={`/profile/${data?._id}`}>{data?._id}</Link>
					}
				</h2>
				<button
					onClick={logout}
				>
					Logout
				</button>
			</div>
		</div>
	);
}

export default ProfilePage;
