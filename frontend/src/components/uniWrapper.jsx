'use client';
import React from "react";
import { useState, useEffect } from "react";
import { getUniversities, CardWrapper } from "./cardWrapper";
import { useLoadScript } from "@react-google-maps/api";
import Link from "next/link";

const libraries = ["places"];
export default function UniWrapper(){
    const [token, setToken] = useState(null);
    const [universities, setUniversities] = useState(null);
    const fetchData = async () => {
        const jwtToken = localStorage.getItem("token")
        const universities = await getUniversities(jwtToken);
        return {jwtToken, universities}
    }

    useEffect(() => {
        fetchData().then((res)=>{
            setToken(res.jwtToken);
            setUniversities(res.universities.data);
        });
    }, []);
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
        libraries: libraries,
    });
    if(!isLoaded) return null;
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    return (
        <>
            {universities ? (
                <>
                    {universities.map((university, index) => (
                        <CardWrapper  university={university} token={token} service={service} key={index} />
                    ))}
                </>
            ) : (
                <div className="h-full w-ful flex flex-col justify-center items-center gap-12">
                    <h1 className="block text-4xl font-bold">Oops! You don't have a university list yet!</h1>
                    <p className="block text-xl">You can generate it <Link href="/pages/profile" className="text-green-600 font-bold">here!</Link></p>
                </div>
            )}
        </>
    )
}