import React from "react";
import Image from "next/image";
import '../app/globals.css'

export default function Footer(){
    return (
        <footer className=" h-20 flex justify-center items-center gap-2 bg-gray-700">
            <a className="block flex items-center gap-2 github-logo" href="https://www.github.com/0-daedalus">
                <Image
                priority
                src="/images/github-svg.svg"
                height={80}
                width={80}
                className=" block h-6 w-6 github-logo "
                alt="Github logo"
                />
                <span className=" text-xs text-white">by 0-deadalus, 2023</span>
            </a>
        </footer>
    )
}