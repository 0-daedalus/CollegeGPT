import React from "react";
import Image from "next/image";
import '../app/globals.css'

export default function Header({hasAuth}){
    return (
        <header className=" h-[10%] bg-gray-700 flex justify-between items-center">
                <Image 
                priority
                src="/images/logo.png"
                className=" rounded-full ml-5 h-3/4 w-fit"
                height={100}
                width={100}
                alt="CollegeGPT logo"
                />
                {hasAuth ? (
                    <ul className="flex w-1/2 justify-around text-white text-2xl"> 
                        <li>HOME</li>
                        <li>PROFILE</li>
                        <li>VIYTI</li>
                    </ul>
                ) : (
                    <button type="button" className=" bg-green-500 rounded-md text-white h-fit text-lg p-4 mr-8">Log-in</button>
                )}
        </header>
    )
}