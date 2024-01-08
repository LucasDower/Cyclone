"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Calendar() {
    const params = useSearchParams();
    const code = params.get('c');

    const initialized = useRef(false);
    const [state, setState] = useState<'signed-out' | 'signed-in' | 'error'>('signed-out');
    const [items, setItems] = useState([]);

    if (code !== null) {
        useEffect(() => {
            if (initialized.current) {
                return;
            }
            initialized.current = true;
            fetch(`/api/calendar?c=${code}`)
                .then(async (res) => {
                    if (res.ok) {
                        const json = await res.json();
                        console.log(json);
                        setItems(json);
                        setState('signed-in');
                    } else {
                        console.error(res.statusText);
                        setState('error');
                    }
                })
                .catch(err => {
                    console.error(err);
                    setState('error');
                })
        }, []);
    }

    if (state === 'signed-in') {
        return (
            <div className="flex flex-col flex-grow min-h-screen items-center justify-center bg-black">
                <p className="text-white text-[250px]" >{items.length}</p>
            </div>
        );
    } else if (state === 'signed-out') {
        return (
            <div className="flex flex-col flex-grow min-h-screen items-center justify-center bg-black">
                <Link className="border-2 rounded-lg px-4 py-2" href={`/api/auth`} prefetch={false}>
                    Continue with Google
                </Link>
            </div>
        );
    } else {
        return (
            <div className="flex flex-col flex-grow min-h-screen items-center justify-center bg-black">
                Something went wrong...
            </div>
        );
    }
}