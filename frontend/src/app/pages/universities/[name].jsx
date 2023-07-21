import React from "react";
import Layout from "@/components/layout";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import '@/app/globals.css'


export default function UniversityPage() {
    const router = useRouter();
    const { name } = router.query;
    return (
        <Layout>
            <Head>
                <title>{name}</title>
            </Head>
            <h1>Hello world!</h1>
        </Layout>
    )

}
