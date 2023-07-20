'use client'
import React from "react";
import Image from "next/image";
import axios from "axios";


export default function UniversityCard({university}){
    const handleClick = () => {
        console.log("Clicked!");
        return (
            <div className="absolute top-0 left-0 w-screen h-screen blur bg-black"></div>
        )
    }

    return (
        <div className="card-body flex flex-col justify-center items-center py-6" onClick={handleClick}>
            <Image 
                src={university.imageUrl != '' ? university.imageUrl : "/images/profile.jpg"}
                alt={university ? university.name : "University"}
                width={400}
                height={400}
                className="h-4/5 w-auto"
            />
            <h5 className="card-title my-4">{university ? university.name : "University"}</h5>
            <p className="w-4/5">{university ? university.description : "Description"}</p>
        </div>
    )
}