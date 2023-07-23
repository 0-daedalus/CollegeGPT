import React from "react";
import axios from "axios";
import UniversityCard from "./universityCard";
import Link from "next/link";

async function getPhotoUrl(name){
    const API_KEY = process.env.GOOGLE_MAPS_KEY;
    let config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURI(name)}&inputtype=textquery&fields=photos&key=${API_KEY}`,
        headers: { }
    }
    const res = await fetch(config.url).catch((err) => console.log(err));
    const data = await res.json();
    const PhotoID = data.candidates[0].photos[0].photo_reference;
    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${PhotoID}&key=${API_KEY}`;
    return photoUrl
}

export default async function CardWrapper({university, children}){
    if(university.imageUrl == ""){
        university.imageUrl = await getPhotoUrl(university.name);
        let config = {
            headers: {
                "accept": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NGE2ODY4OWIxNjNmZjg5NjJlNWFjYmIiLCJleHAiOjE2OTA3NDk4MzZ9.azy7kPraC-zhqWk7LhHGSP9duC0Lei_b3U2Vz8-Rs9g",
            }
        }
        let data = {
            "name": university.name,
            "imageUrl": university.imageUrl,
        }
        await axios.patch(`http://localhost:8000/stats/universities/`, data, config).catch((err) => console.log(err));
    }

    return (
        <Link href={`/pages/universities/${university.name}`}>
            <div className="card w-full h-full rounded-2xl border-gray-700 bg-zinc-50 border hover:cursor-pointer hover:scale-105 transition-transform">
                <UniversityCard university={university} />
            </div>
        </Link>
    )
}