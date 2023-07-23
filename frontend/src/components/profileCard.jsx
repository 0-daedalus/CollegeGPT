import React from "react";
import Image from "next/image";
import "@/app/globals.css"
import Link from "next/link";
import axios from "axios";
import GenerateButton from "./gererateButton";


async function getProfileData(){
    const config = {
        headers: {
            "accept": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NGE2ODY4OWIxNjNmZjg5NjJlNWFjYmIiLCJleHAiOjE2OTA3NDk4MzZ9.azy7kPraC-zhqWk7LhHGSP9duC0Lei_b3U2Vz8-Rs9g",
        }
    }
    const res = await axios.get("http://localhost:8000/stats/users", config).catch((err) => console.log(err));
    const data = await res.data;
    const reres = await axios.get("http://localhost:8000/auth/users/me", config).catch((err) => console.log(err));
    const email = await reres.data.email;
    return {
        email: email,
        country: data.country,
        major: data.majors,
        sat_score: data.sat_score,
        ielts_score: data.ielts_score,
        cgpa: data.CGPA,
        cgpa_scale: data.GPA_scale,
    }

}

export default async function ProfileCard() {
    const userData = await getProfileData();
    return (
        <>
            <div className="profileCard flex flex-col justify-center items-center w-2/6 min-h-max">
                <div className="flex flex-col justify-center items-center shadow-lg px-12 py-8 gap-8 bg-zinc-50 w-full flex-1">
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
                    <GenerateButton userData={userData} />
                    <button className=" bg-orange-500 rounded-md text-white h-fit text-lg p-4 mr-8 font-bold"><Link href="/pages/stats">Edit stats</Link></button>
                </div>
            </div>
        </>
    )
}