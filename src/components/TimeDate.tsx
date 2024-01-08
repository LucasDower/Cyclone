"use client";

import { useEffect, useState } from "react";

const days: string[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
]

const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export default function TimeDate() {
    const [time, setTime] = useState("00:00");
    const [date, setDate] = useState("Monday 1 January");

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setTime(now.getHours() + ':' + now.getMinutes().toString().padStart(2, '0'))
            setDate(days[now.getDay()-1] + ' ' + now.getDate() + ' ' + months[now.getMonth()])
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="flex flex-col flex-grow min-h-screen items-center justify-center bg-black leading-[0.85]">
            <p className="text-white text-[250px]" >{time}</p>
            <p className="text-gray-400 text-[50px] pt-4" >{date}</p>
        </div>
    )
}