"use client";
import React from "react";
import { useState, useEffect } from "react";
import {ProfileCard, getProfileData} from "./profileCard";
import "@/app/globals.css";

export default function ProfileWrapper() {
    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const fetchData = async () => {
        const jwtToken = localStorage.getItem("token")
        const data = await getProfileData(jwtToken);
        return {jwtToken, data}
    }
    useEffect(() => {
        fetchData().then((res)=>{        
            setToken(res.jwtToken);
            setUserData(res.data);
        })
    }, []);
    return (
        <>
            {token ? (
                <ProfileCard userData={userData} token={token}></ProfileCard>
            ) : null}
        </>
    )
}