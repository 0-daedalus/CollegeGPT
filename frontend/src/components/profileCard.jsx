import React from "react";
import Image from "next/image";
import "@/app/globals.css"
import Link from "next/link";
import axios from "axios";
import GenerateButton from "./gererateButton";


export async function getProfileData(token){
    const config = {
        headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    }
    // const res = await axios.get("http://localhost:8000/stats/users", config);
    const res = await axios.get("https://collegegpt-backend.onrender.com/stats/users/", config);
    const data = res.data;
    // const reres = await axios.get("http://localhost:8000/stats/users/me", config);
    const reres = await axios.get("https://collegegpt-backend.onrender.com/stats/users/me", config);
    const email = reres.data.email;
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

export function ProfileCard({userData, token}) {
    return userData ? (
        <div className="profileCard flex flex-col justify-center items-center w-full md:w-2/3 lg:w-1/3 mx-auto">
          <div className="flex flex-col justify-center items-start shadow-lg px-6 py-6 md:px-12 md:py-8 gap-6 bg-zinc-50 w-full flex-1">
            <div className="flex flex-row items-center justify-between w-full">
              <div className="profilePic flex justify-center items-center w-32 h-32 md:w-40 md:h-40">
                <Image
                  src="/images/profile.jpg"
                  className="rounded-full h-full w-full"
                  height={160}
                  width={160}
                  alt="Profile Picture"
                />
              </div>
              <div className="profileInfo flex flex-col gap-2 text-left ml-8">
                <span><strong>Email:</strong> {userData.email}</span>
                <span><strong>Preferred major:</strong> {userData.major}</span>
              </div>
            </div>
            <div className="profileInfo flex flex-col gap-2 text-left">
              <span><strong>Country of application:</strong> {userData.country}</span>
              <span><strong>SAT Score:</strong> {userData.sat_score}</span>
              <span><strong>IELTS score:</strong> {userData.ielts_score}</span>
              <span><strong>GPA:</strong> {userData.cgpa}/{userData.cgpa_scale}</span>
            </div>
          </div>
          <div className="buttons my-4 md:my-6">
            <GenerateButton userData={userData} token={token} />
            <button className="bg-orange-500 rounded-md text-white text-base px-4 py-2 md:text-lg md:p-4 font-bold">
              <Link href="/pages/stats">Edit stats</Link>
            </button>
          </div>
        </div>
      ) : (
        <></>
      );
      
      
      
      
}