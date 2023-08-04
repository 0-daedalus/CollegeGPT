'use client'
import React from "react";
import InputField from "./inputField";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import '../app/globals.css'

export default function Form(){
    const [sat, setSat] = useState('');
    const [ielts, setIelts] = useState('');
    const [cgpaScale, setCgpaScale] = useState('');
    const [country, setCountry] = useState('');
    const [major, setMajor] = useState('');
    const [cgpa, setCgpa] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [token, setToken] = useState(null);
    const router = useRouter();
    const fetchToken = async () => {
        const token = localStorage.getItem("token");
        return token;
    }
    const fetchStats = async (token) => {
        let config = {
            method: "get",
            url: "https://collegegpt-backend.onrender.com/stats/users",
            headers: {
                "accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        }
        const res = await axios(config);
        return res;
    }
    useEffect(() => {
        fetchToken().then((res) => {
            setToken(res);
            //console.log(res);
            fetchStats(res).then((res1) => {
                //console.log(res1);
                setSat(res1.data.sat_score);
                setIelts(res1.data.ielts_score);
                setCgpaScale(res1.data.GPA_scale);
                setCountry(res1.data.country);
                setMajor(res1.data.majors);
                setCgpa(res1.data.CGPA);
        }
        ).catch((err) => console.log(err));
        })
    }, []);
    const handleSubmit = async () => {
        //if(submitted){
            const stats = {
                sat: sat,
                ielts: ielts,
                cgpaScale: cgpaScale,
                country: country,
                major: major,
                cgpa: cgpa,
            }
            console.log(stats);
            updateStats(stats, token).then((res) => {
                setTimeout(() => {
                    router.push("/pages/profile");
                }, 2000);

            }).catch((err) => console.log(err));
            
        //}
        //else console.log("not submitted");
    }
    
    return (
        <div className="stats-form">
          <form action="" method="post">
            <div className="form-fields shadow-lg px-6 md:px-12 pt-6 md:pt-8 pb-4 md:pb-6 bg-zinc-50">
              <h2 className="text-xl md:text-2xl mb-2">Enter your stats:</h2>
              <div className="form-inputs md:flex md:gap-16">
                <div className="left-inputs flex flex-col gap-3 md:py-4 mb-4 md:mb-8">
                  <InputField
                    forWhat="sat"
                    text="SAT Score"
                    inputText={sat}
                    name="sat_score"
                    placeholder="1600"
                    isRequired={true}
                    onInputChange={setSat}
                  />
                  <InputField
                    forWhat="ielts"
                    text="IELTS Score"
                    inputText={ielts}
                    name="ielts_score"
                    placeholder="9.0"
                    isRequired={true}
                    onInputChange={setIelts}
                  />
                  <InputField
                    forWhat="cgpa-scale"
                    text="CGPA Scale"
                    inputText={cgpaScale}
                    name="cgpa_scale"
                    placeholder="5.00"
                    isRequired={true}
                    onInputChange={setCgpaScale}
                  />
                </div>
                <div className="right-inputs flex flex-col gap-3 md:py-4 mb-4 md:mb-8">
                  <InputField
                    forWhat="country"
                    text="Country of application"
                    inputText={country}
                    name="country"
                    placeholder="Kazakhstan"
                    isRequired={true}
                    onInputChange={setCountry}
                  />
                  <InputField
                    forWhat="major"
                    text="Major"
                    inputText={major}
                    name="major"
                    placeholder="CS"
                    isRequired={true}
                    onInputChange={setMajor}
                  />
                  <InputField
                    forWhat="cgpa"
                    text="CGPA"
                    inputText={cgpa}
                    name="cgpa"
                    placeholder="5.00"
                    isRequired={true}
                    onInputChange={setCgpa}
                  />
                </div>
              </div>
            </div>
            <div className="form-submit mt-4 md:mt-6 pl-6 md:pl-12">
              <button
                type="submit"
                className="capitalize font-bold py-2 md:py-4 px-6 md:px-8 text-base md:text-lg rounded-xl border-green-950 bg-green-600 text-white"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                Update Stats
              </button>
              <span className="block pl-[5px] mt-3 md:my-4">
                Don't have an account?{" "}
                <Link
                  href="/"
                  className="no-underline font-bold text-green-600"
                >
                  Create one!
                </Link>{" "}
              </span>
            </div>
          </form>
        </div>
      );
      
}

export async function updateStats(stats, token){
    let config = {
        method: "patch",
        //url: "http://localhost:8000/stats/user_stats/",
        url: "https://collegegpt-backend.onrender.com/stats/user_stats/",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    }
    let payload = {
        country: stats.country === '' ? null : stats.country,
        majors: stats.major === '' ? null : stats.major,
        sat_score: stats.sat === '' ? null : stats.sat,
        ielts_score: stats.ielts === '' ? null : stats.ielts,
        CGPA: stats.cgpa === '' ? null : stats.cgpa,
        GPA_scale: stats.cgpaScale === '' ? null : stats.cgpaScale,
    }
    //console.log(payload);
    config.data = payload;
    axios(config).then((res) => {
        return res;
        
    }).catch((err) => console.log(err));

}