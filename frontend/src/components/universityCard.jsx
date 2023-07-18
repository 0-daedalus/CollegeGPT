import React from "react";
import Image from "next/image";
import { getUniversityData } from "@/lib/utils";

export async function getStaticProps(){
    const university = await getUniversityData();
    return {
        props: {
            university
        }
    }
}

export default function UniversityCard({university}){
    return (
        <div className="card">
            <div className="card-body">
                {university}
            </div>
        </div>
    )
}