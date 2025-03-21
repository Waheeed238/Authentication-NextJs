/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Link from "next/link"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"

export default function SignupPage (){
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);

    const [loading, setLoading] = React.useState(false)
    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user);
            console.log("SignUp success", response.data)
            router.push('/login')

        } catch (error:any) {
            console.log("SignUp failed")

            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length && user.username.length > 0){
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "SignUp"}</h1>
            <hr/>
            <label htmlFor="username">Username</label>
            <input 
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="username" 
                type="text"
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="Username"
            />
            <label htmlFor="email">Email</label>
            <input 
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="Email" 
                type="text"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="Email"
            />
            <label htmlFor="password">Password</label>
            <input 
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password" 
                type="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="Password"
            />
            <button onClick={onSignup} className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600">{buttonDisabled ? "No signUp" : "SignUp"}</button>
            <Link href="/login">Visit Login page</Link>
        </div>
    )
}