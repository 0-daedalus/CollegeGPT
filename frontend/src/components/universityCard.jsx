import React from "react";
import Image from "next/image";

export default function UniversityCard({UniversityPhoto}){
    //const photoUrl = await getStaticProps();
    //console.log(UniversityPhoto);
    return (
        <div className="card w-full flex justify-center items-center">
            <div className="card-body">
                <Image 
                    src={UniversityPhoto ? UniversityPhoto : "/images/profile.jpg"}
                    alt="Harvard University"
                    width={400}
                    height={400}
                    className="h-4/5 w-fit"
                />
                <h5 className="card-title">Harvard University</h5>
            </div>
        </div>
    )
}