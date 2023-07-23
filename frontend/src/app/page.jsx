import React from "react";
import Image from "next/image";
import Layout from "@/components/layout";
import CardWrapper from "@/components/cardWrapper";
import "@/app/globals.css"
import axios from "axios";

export default async function Home(){
    let config = {
      headers: {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NGE2ODY4OWIxNjNmZjg5NjJlNWFjYmIiLCJleHAiOjE2OTA3NDk4MzZ9.azy7kPraC-zhqWk7LhHGSP9duC0Lei_b3U2Vz8-Rs9g"
      }
    }
    const universities = await axios.get("http://localhost:8000/stats/universities", config).catch((err) => console.log(err));
    
    //const url = await getPhotoUrl();
    //console.log(url.props.UniversityPhoto);
    return (
        <Layout>
            <div className="uniList w-full h-full grid gap-16 p-12">
                {universities.data.map((university, index) => (
                    <CardWrapper  university={university} key={index} />
                ))}
            </div>  
        </Layout>
    )
}