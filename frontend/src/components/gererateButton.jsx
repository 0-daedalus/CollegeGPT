'use client'
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { LoopCircleLoading } from "react-loadingg";

export default function GenerateButton({userData}){
    const [load, setLoad] = useState(false);
    const [res, setRes] = useState(null);
    const [clicked, setClicked] = useState(false);
    useEffect( () => {
        if(clicked){
            setLoad(true);
            const payload = {
                "country": userData.country,
                "majors": userData.major,
                "sat_score": userData.sat_score,
                "ielts_score": userData.ielts_score,
                "CGPA": userData.cgpa,
                "GPA_scale": userData.cgpa_scale,
            }
            const config = {
                headers: {
                    "accept": "application/json",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NGE3ZTM0MTA2NjU3NTI5NDBjYzVkOTgiLCJleHAiOjE2OTA1NzQ0NDV9.Kzyf5t-CiCNLzd1Jl06ZA9kNmsEAd79Xja1FR4roVRU",
                }
            }
            axios.patch("http://localhost:8000/stats/user_stats", payload, config).then(() => {
                const data = {
                    "overwrite": false,
                }
                axios.post("http://localhost:8000/stats/universities", data, config).then((result) => {
                    setRes(result);
                    setLoad(false);
                    console.log(result);
                }).catch((err) => console.log(err));
            }).catch((err) => console.log(err));
        }
    }, [clicked]);
    return (
        <>
            {clicked ? 
            <>
            <div className="absolute top-0 left-0 w-screen h-screen blur-md backdrop-blur-sm"></div>
            <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] h-3/5 w-2/5 bg-zinc-50 border-[0.5rem]
            border-gray-600 rounded-3xl flex justify-center items-center">
                <LoopCircleLoading color="#463b55" />
            </div>
            </>
            : null}
            <button className="bg-green-500 rounded-md text-white h-fit text-lg p-4 mr-8" onClick={() => setClicked(true)}>{load ? "Loading..." : "Generate List"}</button>
        </>
    )
}