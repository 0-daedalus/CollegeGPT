'use client'
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import '../app/globals.css'

export default function Header(){
    const router = useRouter();
    const [token, setToken] = useState(null);
    const [clicked, setClicked] = useState(false);
    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, []);
    useEffect(() => {
        if(clicked){
            localStorage.removeItem("token");
            setClicked(false);
            logOut();
        }
    }, [clicked]);
    const logOut = () => {
        router.push("/");
    }
    const logIn = () => {
        router.push("/");
    }
    let isLoggedIn = token ? true : false;
    return (
        <header className=" h-24 bg-gray-700 flex justify-between items-center">
                <Image 
                priority
                src="/images/logo.png"
                className=" rounded-full ml-5 h-3/4 w-fit"
                height={100}
                width={100}
                alt="CollegeGPT logo"
                />
                {isLoggedIn ? (
                    <ul className="flex w-1/2 justify-around text-white text-2xl"> 
                        <li><Link href="/">HOME</Link></li>
                        <li><Link href="/pages/profile">PROFILE</Link></li>
                        <li><Link href="/" onClick={() => setClicked(true)}>LOG-OUT</Link></li>
                    </ul>
                ) : (
                    <button type="button" className=" bg-green-500 rounded-md text-white h-fit text-lg p-4 mr-8" onClick={logIn}>Log-in</button>
                )}
        </header>
    )
}