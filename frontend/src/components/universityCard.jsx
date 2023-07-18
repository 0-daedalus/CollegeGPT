import React from "react";
import Image from "next/image";

export default function UniversityCard({UniversityPhoto}){
    //const photoUrl = await getStaticProps();
    //console.log(UniversityPhoto);
    return (
        <div className="card">
            <div className="card-body">
                <Image 
                    src={UniversityPhoto}
                    alt="Harvard University"
                    width={400}
                    height={400}
                    className="h-4/5 w-fit"
                />
            </div>
        </div>
    )
}