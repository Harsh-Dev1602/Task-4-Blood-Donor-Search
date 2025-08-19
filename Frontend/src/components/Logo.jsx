import React from 'react'
import { BsHeartPulseFill } from "react-icons/bs";

function Logo() {
    return (
        <>

            <div className="flex bg-white p-2 gap-1 rounded-xl flex-col justify-center items-center">
                <BsHeartPulseFill className=" text-red-600 font-bold text-7xl " />
                <h1 className="bg-gradient-to-r from-[#CB0404] via-[#C562AF] to-[#FE5D26] bg-clip-text text-transparent p-2 font-bold text-2xl md:text-4xl text-center">Blood Donor System</h1>
                <span>Join our life-sacing community</span>
            </div>
        </>
    )
}

export default Logo