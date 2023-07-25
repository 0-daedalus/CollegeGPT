'use client';
import React from "react";
import { useState, useEffect } from "react";
import RegisterForm from "@/components/registerForm";
import LoginForm from "@/components/loginForm";
import "@/app/globals.css"

export default function Home(){
    const [register, setRegister] = useState(false);
    const [login, setLogin] = useState(false);
    const [token, setToken] = useState(null);
    useEffect(() => {
        setToken(localStorage.removeItem("token"));
    }, []);
    const displayRegister = () => {
        setRegister(true);
    }
    const removeRegister = () => {
        setRegister(false);
    }
    const displayLogin = () => {
        setLogin(true);
    }
    const removeLogin = () => {
        setLogin(false);
    }
    return (
        <>
            {register ? <RegisterForm onRemove={removeRegister} /> : null}
            {login ? <LoginForm onRemove={removeLogin} /> : null}
            <div className="w-screen h-screen flex flex-col justify-center items-center gap-14">
                <h1 className="text-6xl font-bold">Welcome to CollegeGPT!</h1>
                <p className="text-2xl">Use the power of AI to choose a college!</p>
                <div className="controls flex gap-8">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-5 rounded" onClick={displayRegister}>Register</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded" onClick={displayLogin}>Login</button>
                </div>
            </div>
        </>
    )
}