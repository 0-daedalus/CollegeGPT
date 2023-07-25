'use client';
import React from "react";
import { useState, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import axios from "axios";
import UniversityCard from "./universityCard";
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
    const universities = await axios.get("http://localhost:8000/stats/universities", config).catch((err) => console.log(err));
    return universities;
}


const libraries = ["places"];
export function CardWrapper({university, token, service}){
    const [photoUrl, setPhotoUrl] = useState(null);
    if(!university.imageUrl || university.imageUrl === ''){
        service.findPlaceFromQuery({
            query: university.name,
            fields: ['photos'],
        }, (results, status) => {
            if(status === google.maps.places.PlacesServiceStatus.OK){
                // console.log(results);
                const url = results[0].photos[0].getUrl()
                setPhotoUrl(url);
                university.imageUrl = url;
                let config = {
                    method: 'patch',
                    url: `http://localhost:8000/stats/universities/`,
                    headers: {
                        "accept": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    data: {
                        "name": university.name,
                        "imageUrl": url,
                    }
                }
                axios(config).then((res) => console.log(res)).catch((err) => console.log(err));
            }
        });
    }   
    return (
        <>
        {university.imageUrl !== '' && university.imageUrl !== null ?
            <Link href={`/pages/universities/${university.name}`}>
                <div className="card w-full h-full rounded-2xl border-gray-700 bg-zinc-50 border hover:cursor-pointer hover:scale-105 transition-transform">
                    <UniversityCard university={university} />
                </div>
            </Link>
        : null}
        </>
    )
}