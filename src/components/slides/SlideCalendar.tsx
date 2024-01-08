"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Calendar, { Event } from "../Calendar";
import moment from 'moment';

const colours = [
    '#039be5',
    '#7986cb',
    '#33b679',
    '#8e24aa',
    '#e67c73',
    '#f6c026',
    '#f5511d',
    '#039be5',
    '#616161',
    '#3f51b5',
    '#0b8043',
    '#d60000',
];

export default function SlideCalendar() {
    const params = useSearchParams();
    const code = params.get('c');

    const initialized = useRef(false);
    const [state, setState] = useState<'signed-out' | 'signed-in' | 'error'>('signed-out');
    const [items, setItems] = useState<Event[]>([]);

    if (code !== null) {
        useEffect(() => {
            if (initialized.current) {
                return;
            }
            initialized.current = true;
            fetch(`/api/calendar?c=${code}`)
                .then(async (res) => {
                    if (res.ok) {
                        const json = await res.json() as any[];
                        console.log(json);

                        const newItems: Event[] = [];

                        json.forEach((event) => {
                            let start, end;

                            if (event.start.dateTime) {
                                start = new Date(event.start.dateTime);
                            } else if (event.start.date) {
                                start = moment(event.start.date, "YYYY-MM-DD").toDate();
                            }

                            if (event.end.dateTime) {
                                end = new Date(event.end.dateTime);
                            } else if (event.end.date) {
                                end = moment(event.end.date, "YYYY-MM-DD").toDate();
                            }

                            if (start && end) {
                                newItems.push({
                                    title: event.summary,
                                    color: colours[event.colorId ?? 0],
                                    start: start,
                                    end: end,
                                    allDay: start.getHours() === 0 && end.getHours() === 0,
                                });
                            }
                        });

                        console.log(newItems);
                        setItems(newItems);
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
            <Calendar events={items} />
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