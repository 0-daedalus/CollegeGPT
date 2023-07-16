'use client'
import React from "react";
import InputField from "./inputField";
import { useState } from "react";
import Link from "next/link";
import '../app/globals.css'

export default function Form({handleSubmit}){
    const [sat, setSat] = useState('');
    const [ielts, setIelts] = useState('');
    const [cgpaScale, setCgpaScale] = useState('');
    const [country, setCountry] = useState('');
    const [major, setMajor] = useState('');
    const [cgpa, setCgpa] = useState('');
    
    return (
        <div className="stats-form">
            <form action="" method="post" onSubmit={handleSubmit}>
                <div className="form-fields flex flex-col shadow-lg px-12 pt-8 bg-zinc-50">
                    <h2>Enter your stats:</h2>
                    <div className="form-inputs flex gap-16">
                        <div className="left-inputs flex flex-col gap-4 py-6 mb-8">
                            <InputField forWhat="sat" text="SAT Score" inputText={sat} name="sat_score" placeholder="1600" isRequired={true} onInputChange={setSat} />
                            <InputField forWhat="ielts" text="IELTS Score" inputText={ielts} name="ielts_score" placeholder="9.0" isRequired={true} onInputChange={setIelts} />
                            <InputField forWhat="cgpa-scale" text="CGPA Scale" inputText={cgpaScale} name="cgpa_scale" placeholder="5.00" isRequired={true} onInputChange={setCgpaScale} />
                        </div>
                        <div className="right-inputs flex flex-col gap-4 py-6 mb-8">
                            <InputField forWhat="country" text="Country" inputText={country} name="country" placeholder="Kazakhstan" isRequired={true} onInputChange={setCountry} />
                            <InputField forWhat="major" text="Major" inputText={major} name="major" placeholder="CS" isRequired={true} onInputChange={setMajor} />
                            <InputField forWhat="cgpa" text="CGPA" inputText={cgpa} name="cgpa" placeholder="5.00" isRequired={true} onInputChange={setCgpa} />
                        </div>
                    </div>
                </div>
                <div className="form-submit my-10 pl-12">
                    <button type="submit" className=" capitalize font-bold p-4 text-xl rounded-xl border-green-950 bg-green-600 text-white">Update Stats</button>
                    <span className=" block pl-[5px] my-4">Don't have an account? <Link href="/" className=" no-underline font-bold text-green-600">Create one!</Link> </span>
                </div>
            </form>
        </div>
    )
}