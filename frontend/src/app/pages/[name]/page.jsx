'use client'
import React from "react";
import Layout from "@/components/layout";
import Head from "next/head";
import { useState, useEffect } from "react";
import axios from "axios";
import '@/app/globals.css'


export default function UniversityPage({params}) {
    const name = decodeURI(params.name);
    const [token, setToken] = useState(null);
    const [uni, setUni] = useState(null);
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
    return (
        <>
            <Head>
                    <title>{name}</title>
            </Head>
            <Layout>
                {uni ? (
                    <div className="flex flex-col justify-center items-center gap-4">
                        <img src={uni.imageUrl} alt="University Image" />
                        <h1>{uni.name}</h1>
                        <h2>{uni.type}</h2>
                        <h3>{uni.description}</h3>
                        <h4>{uni.tips}</h4>
                    </div>
                ) : null}
            </Layout>
        </>
    )

}
