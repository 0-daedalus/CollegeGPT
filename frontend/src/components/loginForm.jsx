"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "@/app/globals.css"

export default function LoginForm({onRemove}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const router = useRouter();
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        let config = {
            headers: {
                "accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
        let data = {
            "username": email,
            "password": password
        }
        axios.post("https://collegegpt-backend.onrender.com/auth/users/tokens", data, config).then((res) => {
            console.log(res);
            setIsProcessing(false);
            setLoggedIn(true);
            localStorage.setItem("token", res.data.access_token);
            setTimeout(() => {
                router.push("/pages/profile");
            }, 1000);
        }).catch((err) => {
            alert(err.response.data.detail);
            onRemove();
        })
    }
    return (
        <>
            <div className="absolute top-0 left-0 h-screen w-screen backdrop-blur" onClick={onRemove}></div>
            <form className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 max-w-md bg-white p-8 border-2 border-gray-500 rounded-md">
                <h2 className="text-2xl font-bold pb-4">Login:</h2>
                {loggedIn ? (
                    <p className="text-green-500 text-xl font-bold">Successfully Logged in!</p>
                ) : isProcessing ? (
                    <p className="text-blue-500 text-xl font-bold">Processing...</p>
                ) : (
                <>
                    <div className="flex flex-col gap-1 mb-3">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        value={email}
                        htmlFor="email"
                        id="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-base border-gray-700 border-2 rounded-md pl-2 py-1"
                        required
                    />
                    </div>
                    <div className="flex flex-col gap-1 mb-3">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        value={password}
                        htmlFor="password"
                        id="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="text-base border-gray-700 border-2 rounded-md pl-2 py-1"
                        required
                    />
                    </div>
                    <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-2 px-4 rounded"
                    onClick={handleSubmit}
                    >
                    Login
                    </button>
                </>
                )}
            </form>
        </>
    )
}