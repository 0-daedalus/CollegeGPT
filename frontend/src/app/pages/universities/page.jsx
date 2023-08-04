import React from "react";
import Layout from "@/components/layout";
import UniWrapper from "@/components/uniWrapper";
import "@/app/globals.css"


export default async function Home(){
    return (
        <Layout>
            <div className="uniList w-full p-4 md:p-12">
                <UniWrapper />
            </div>
        </Layout>
    )
}