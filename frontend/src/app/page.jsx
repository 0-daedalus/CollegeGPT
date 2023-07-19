import React from "react";
import Image from "next/image";
import Layout from "@/components/layout";
import UniversityCard from "@/components/universityCard";
import "@/app/globals.css"

async function getPhotoUrl(){
    const API_KEY = process.env.GOOGLE_MAPS_KEY;
    let config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Harvard%20University&inputtype=textquery&fields=photos&key=${API_KEY}`,
        headers: { }
    }
    const res = await fetch(config.url).catch((err) => console.log(err));
    const data = await res.json();
    const PhotoID = data.candidates[0].photos[0].photo_reference;
    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${PhotoID}&key=${API_KEY}`;
    return {
        props: {
            UniversityPhoto: photoUrl,
        },
    };
}

export default async function Home({Universities}){
    //const url = await getPhotoUrl();
    //console.log(url.props.UniversityPhoto);
    return (
        <Layout>
            <div className="uniList w-full h-full grid gap-16">
                <UniversityCard></UniversityCard>
                <UniversityCard></UniversityCard>
                <UniversityCard></UniversityCard>
                <UniversityCard></UniversityCard>
                <UniversityCard></UniversityCard>
                <UniversityCard></UniversityCard>
                <UniversityCard></UniversityCard>
                <UniversityCard></UniversityCard>
                <UniversityCard></UniversityCard>
                <UniversityCard></UniversityCard>
                <UniversityCard></UniversityCard>
                <UniversityCard></UniversityCard>
                <UniversityCard></UniversityCard>
                <UniversityCard></UniversityCard>
                <UniversityCard></UniversityCard>
            </div>
            {/* <UniversityCard UniversityPhoto={url.props.UniversityPhoto}></UniversityCard> */}
        </Layout>
    )
}