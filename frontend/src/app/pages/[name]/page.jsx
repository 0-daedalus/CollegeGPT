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
    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, []);
    return (
        <>
            <Head>
                    <title>{name}</title>
            </Head>
            <Layout>
                <h1>Hello {decodeURI(params.name)}!</h1>
            </Layout>
        </>
    )

}
