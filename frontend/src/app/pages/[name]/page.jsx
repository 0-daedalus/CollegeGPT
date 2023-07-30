'use client'
import React from "react";
import Layout from "@/components/layout";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import '@/app/globals.css'


export default function UniversityPage({params}) {
    const name = decodeURI(params.name);
    const [token, setToken] = useState(null);
    const [uni, setUni] = useState(null);
    const [clicked, setClicked] = useState(false);
    const [roadmap, setRoadmap] = useState(null);
    useEffect(() => {
        const temp = localStorage.getItem("token");
        setToken(temp);
        const getUniversity = async (token) => {
            //console.log(token);
            const config = {
                headers: {
                    "accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            }
            const data = {
                name: name,
            }
            const res = await axios.get(`https://collegegpt-backend.onrender.com/stats/universities/${encodeURI(name)}`, config).catch((err) => console.log(err));
            return res;
        }
        getUniversity(temp).then((res) => {
            setUni(res.data);
            //console.log(res);
        });
    }, []);
    useEffect(() => {
        console.log(clicked);
        if(clicked){
            const config = {
                headers: {
                    "accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            }
            const data = {
                university_name: name,
            }
            axios.post("https://collegegpt-backend.onrender.com/stats/roadmap", data, config).then((res) => {
                console.log(res);
                setRoadmap(res.data);
                setClicked(false);
            }
            ).catch((err) => console.log(err));
        }
    }), [clicked];
    return (
        <>
            <Head>
                    <title>{name}</title>
            </Head>
            <Layout>
                <div className="h-full w-full p-8 flex justify-center">
                    <div className="flex flex-col justify-center items-center gap-4 w-1/2 bg-zinc-50 rounded-xl shadow-lg p-8">
                    {uni && !roadmap ? (
                        <>
                            <Image
                            priority
                            src={uni.imageUrl}
                            className="h-1/2 w-fit"
                            height={400}
                            width={400}
                            unoptimized
                            alt={`${uni.name} photo`}
                            />
                            <h1 className="text-3xl capitalize font-bold">{uni.name}</h1>
                            <h2>{`(${uni.type} school)`}</h2>
                            <h3 className=" text-xl font-semibold self-start">Description: </h3>
                            <h3 className="pl-6 text-lg">{uni.description}</h3>
                            <h3 className=" text-xl font-semibold self-start">Tips: </h3>
                            <h3 className="pl-6 text-lg">{uni.tips}</h3>
                            <button
                            type="button"
                            className=" bg-orange-500 rounded-md text-white h-fit text-lg p-4 mt-8"
                            onClick={() => setClicked(true)}
                            >{clicked ? "Loading..." : "Generate Roadmap"}</button>
                        </>
                        ) : roadmap ? (
                            <>
                                <h2 className="text-xl font-semibold mb-6">{roadmap.introduction}:</h2>
                                <ol
                                className="flex flex-col gap-5"
                                >
                                    {roadmap.steps.map((step, index) => (
                                        <li key={index}>
                                            <div className=" border-2 border-gray-500 border-dashed p-4">
                                                <h3 className="font-semibold">{index+1}: {step.split(':')[0]}:  <span className="font-normal">{step.split(':')[1]}</span></h3>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                                <h2 className="mt-6 font-semibold text-lg text-red-500">{roadmap.conclusion}</h2>
                            </>
                        ) : null}
                    </div>
                </div>
            </Layout>
        </>
    )

}
