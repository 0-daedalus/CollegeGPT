import React from "react";
import Image from "next/image";
import "@/app/globals.css"
import Link from "next/link";

export default function ProfileCard({ userData }) {
    return (
        <>
            <div className="profileCard flex flex-col justify-center items-center w-2/6 h-4/5">
                <div className="flex flex-col justify-center items-center shadow-lg px-12 pt-4 bg-zinc-50 w-full flex-1">
                    <div className="profilePic flex justify-start items-center w-full flex-1">
                        <Image
                            src="/images/profile.jpg"
                            className="rounded-full h-3/4 w-fit"
                            height={100}
                            width={100}
                            alt="Profile Picture"
                        />
                        <div className=" flex flex-col justify-center gap-4 items-start ml-8 flex-1 h-full">
                            <span>Email: {userData.email}</span>
                            <span>Country: {userData.country}</span>
                        </div>
                    </div>
                    <div className="profileEntry w-full flex-1 flex items-center">
                        <p>Preferred major: {userData.major}</p>
                    </div>
                    <div className="profileEntry w-full flex-1 flex items-center">
                        <p>SAT Score: {userData.sat_score}</p>
                    </div>
                    <div className="profileEntry w-full flex-1 flex items-center">
                        <p>IELTS score: {userData.ielts_score}</p>
                    </div>
                    <div className="profileEntry w-full flex-1 flex items-center">
                        <p>GPA: {userData.cgpa + "/" + userData.cgpa_scale}</p>
                    </div>
                </div>
                <div className="buttons my-6">
                    <button className="bg-green-500 rounded-md text-white h-fit text-lg p-4 mr-8">Generate List</button>
                    <button className=" bg-orange-500 rounded-md text-white h-fit text-lg p-4 mr-8"><Link href="/pages/stats">Edit stats</Link></button>
                </div>
            </div>
        </>
    )
}