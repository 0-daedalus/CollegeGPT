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
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NGE2ODY4OWIxNjNmZjg5NjJlNWFjYmIiLCJleHAiOjE2OTA0ODA2Mzh9.gr0p1KYGT8WezFB6ZJRsX0vlRYs1IXLUv-I2A8qOWgE"
      }
    }
    const universities = await axios.get("http://localhost:8000/stats/universities", config).catch((err) => console.log(err));
    
    //const url = await getPhotoUrl();
    //console.log(url.props.UniversityPhoto);
    return (
        <Layout>
            <div className="uniList w-full h-full grid gap-16 p-12">
                {universities.data.map((university) => (
                    <CardWrapper  university={university} />
                ))}
            </div>  
            {/* <UniversityCard UniversityPhoto={url.props.UniversityPhoto}></UniversityCard> */}
        </Layout>
    )
}