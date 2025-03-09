/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import {toast} from "react-hot-toast"

export default function ProfilePage(){
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success("Logout Successful")
            router.push('/login')
        } catch (error:any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data)
        setData(res.data.data._id)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile Page</h1>
            <h2>{data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />
            <button 
            onClick={logout}
                className="w-60 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                Logout
            </button> <br />
            <button 
            onClick={getUserDetails}
                className="w-60 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                User Details
            </button>
        </div>
    )
}