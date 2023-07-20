import React from "react";
import Image from "next/image";
import axios from "axios";

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

export default async function UniversityCard({University}){
    if(University.imageUrl == ""){
        University.imageUrl = await getPhotoUrl(University.name);
        let config = {
            headers: {
                "accept": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NGE2ODY4OWIxNjNmZjg5NjJlNWFjYmIiLCJleHAiOjE2OTA0ODA2Mzh9.gr0p1KYGT8WezFB6ZJRsX0vlRYs1IXLUv-I2A8qOWgE",
            }
        }
        let data = {
            "name": University.name,
            "imageUrl": University.imageUrl.props.UniversityPhoto,
        }
        await axios.patch(`http://localhost:8000/stats/universities/`, data, config).catch((err) => console.log(err));
    }
    return (
        <div className="card w-full h-full flex justify-center items-center">
            <div className="card-body">
                <Image 
                    src={University.imageUrl != '' ? University.imageUrl : "/images/profile.jpg"}
                    alt={University ? University.name : "University"}
                    width={400}
                    height={400}
                    className="h-4/5 w-fit"
                />
                <h5 className="card-title">{University ? University.name : "University"}</h5>
            </div>
        </div>
    )
}