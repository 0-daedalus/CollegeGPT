'use client';
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import UniversityCard from "./universityCard";
import { useRouter } from "next/navigation";
import Link from "next/link";


export async function getPhotoUrl(name){
    
    // let config = {
    //     method: 'get',
    //     url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURI(name)}&inputtype=textquery&fields=photos&key=${API_KEY}`,
    //     headers: {}
    // }
    // const res = await fetch(config.url).catch((err) => console.log(err));
    // const data = await res.json();
    // //console.log(data);
    // const PhotoID = data.candidates[0].photos[0].photo_reference;
    // const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${PhotoID}&key=${API_KEY}`;
    // console.log(photoUrl);
    // return photoUrl
}

export async function getUniversities(token){
    let config = {
        headers: {
        "accept": "application/json",
        "Authorization": `Bearer ${token}`,
        }
    }
    const universities = await axios.get("https://collegegpt-backend.onrender.com/stats/universities", config).catch((err) => console.log(err));
    return universities;
}


const libraries = ["places"];
export function CardWrapper({university, token, service}){
    const [photoUrl, setPhotoUrl] = useState(null);
    const router = useRouter();
    if(!university.imageUrl || university.imageUrl === ''){
        service.findPlaceFromQuery({
            query: university.name,
            fields: ['photos'],
        }, (results, status) => {
            if(status === google.maps.places.PlacesServiceStatus.OK){
                // console.log(results);
                const url = results[0].photos[0].getUrl()
                //console.log(url);
                setPhotoUrl(url);
                university.imageUrl = url;
                let config = {
                    method: 'patch',
                    url: `https://collegegpt-backend.onrender.com/stats/universities/`,
                    headers: {
                        "accept": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    data: {
                        "name": university.name,
                        "imageUrl": url,
                    }
                }
                axios(config).then().catch((err) => console.log(err));
            }
        });
    }   
    return (
        <>
        <div className="card w-full md:w-auto h-full rounded-2xl border-gray-700 bg-zinc-50 border hover:cursor-pointer hover:scale-105 transition-transform">
            {university.imageUrl !== '' && university.imageUrl !== null ?
                <div className="card w-full h-full rounded-2xl border-gray-700 bg-zinc-50 border hover:cursor-pointer hover:scale-105 transition-transform"
                onClick={() => {
                    router.push(`/pages/${university.name}`);
                }}
                >
                    <UniversityCard university={university} />
                </div>
            : null}
        </div>
        </>
    )
}